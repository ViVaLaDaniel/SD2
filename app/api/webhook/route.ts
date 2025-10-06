import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { MealPlanConfig } from "@/types";

/**
 * POST handler for Stripe Webhooks.
 * This API route listens for events from Stripe, verifies their authenticity,
 * and handles them accordingly. Specifically, it processes the 'checkout.session.completed'
 * event to create an order in the Supabase database.
 *
 * @param {Request} req - The incoming request object from Stripe.
 * @returns {Promise<NextResponse>} A response to acknowledge receipt of the event.
 */
export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("Stripe webhook secret is not set.");
    return new NextResponse("Webhook secret not configured", { status: 500 });
  }

  let event: Stripe.Event;

  try {
    // Verify the event came from Stripe
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Extract metadata we attached during checkout
    const { userId, calories, mealsPerDay, duration, extras } = session.metadata || {};

    if (!userId) {
      console.error("Webhook Error: Missing userId in session metadata.");
      return new NextResponse("Webhook Error: Missing user ID", { status: 400 });
    }

    try {
      // Create the meal plan configuration object from metadata
      const mealPlanConfig: MealPlanConfig = {
        calories: Number(calories) as 1500 | 1800 | 2200,
        mealsPerDay: Number(mealsPerDay) as 3 | 4 | 5,
        duration: Number(duration) as 5 | 7 | 14 | 30,
        extras: JSON.parse(extras || "{}"),
      };

      // Create a Supabase client to interact with the database
      const supabase = createClient();

      // Insert the new order into the 'orders' table
      const { error } = await supabase.from("orders").insert({
        user_id: userId,
        status: "paid",
        total_price: session.amount_total || 0,
        currency: session.currency || "rub",
        meal_plan_config: mealPlanConfig as any, // Cast to 'any' to match Supabase JSON type
        stripe_payment_intent_id: session.payment_intent as string,
      });

      if (error) {
        console.error("Supabase insert error:", error);
        return new NextResponse(`Database Error: ${error.message}`, { status: 500 });
      }

      console.log(`Successfully created order for user ${userId}`);

    } catch (dbError: any) {
      console.error("Error processing webhook and saving to DB:", dbError);
      return new NextResponse(`Webhook Database Error: ${dbError.message}`, { status: 500 });
    }
  }

  // Acknowledge receipt of the event
  return NextResponse.json({ received: true });
}