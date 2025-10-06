import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";
import { calculatePrice } from "@/lib/constants";
import { MealPlanConfig } from "@/types";

/**
 * POST handler for creating a Stripe Checkout Session.
 * This API route receives the meal plan configuration, validates the user,
 * calculates the price, and creates a Stripe session.
 * @param {Request} req - The incoming request object.
 * @returns {Promise<NextResponse>} A response containing the Stripe session URL or an error.
 */
export async function POST(req: Request) {
  try {
    // 1. Authenticate the user
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized. Please sign in to continue." }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 2. Get the meal plan configuration from the request body
    const body = await req.json();
    const config = body.config as MealPlanConfig;

    if (!config) {
      return new NextResponse(JSON.stringify({ error: "Missing meal plan configuration." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 3. Calculate the final price on the server to prevent client-side manipulation
    const { totalPrice } = calculatePrice(config);

    if (totalPrice <= 0) {
        return new NextResponse(JSON.stringify({ error: "Invalid price calculation." }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    // 4. Create a Stripe Checkout Session
    const origin = headers().get("origin") || "http://localhost:3000";
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "rub", // Russian Ruble
            product_data: {
              name: "NutriPlan Meal Subscription",
              description: `Your personalized ${config.duration}-day meal plan.`,
            },
            unit_amount: totalPrice, // Price in smallest currency unit (kopecks)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/configurator?cancelled=true`,
      // We pass the user ID and meal plan config in metadata
      // This will be used by the webhook to fulfill the order.
      metadata: {
        userId: user.id,
        calories: String(config.calories),
        mealsPerDay: String(config.mealsPerDay),
        duration: String(config.duration),
        extras: JSON.stringify(config.extras), // Stringify the extras object
      },
    });

    if (!checkoutSession.url) {
        return new NextResponse(JSON.stringify({ error: "Could not create Stripe session." }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

    // 5. Return the session URL
    return NextResponse.json({ url: checkoutSession.url });

  } catch (error) {
    console.error("[STRIPE_CHECKOUT_ERROR]", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return new NextResponse(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}