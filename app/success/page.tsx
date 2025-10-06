import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { FaCheckCircle } from "react-icons/fa";

interface SuccessPageProps {
  searchParams: {
    session_id?: string;
  };
}

/**
 * Payment Success Page
 * This page is displayed after a user successfully completes a Stripe Checkout session.
 * It verifies the session and shows a confirmation message.
 * @param {SuccessPageProps} props - The properties for the component, including searchParams.
 * @returns {Promise<JSX.Element>} The rendered success page.
 */
export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const sessionId = searchParams?.session_id;

  if (!sessionId) {
    // If there's no session ID, the user probably landed here by mistake.
    redirect("/");
  }

  try {
    // Fetch the session from Stripe to verify it's a valid, successful payment.
    // We expand the line_items to get product details if needed.
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    if (session.payment_status !== "paid") {
      // If payment was not successful, redirect.
      redirect("/configurator?error=payment_failed");
    }

    const customerEmail = session.customer_details?.email;

    return (
      <>
        <Header />
        <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4">
          <Card className="w-full max-w-lg text-center glassmorphism">
            <CardHeader className="items-center">
              <FaCheckCircle className="h-16 w-16 text-primary mb-4" />
              <CardTitle className="text-3xl">Payment Successful!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-text/80">
                Thank you for your order! A confirmation email has been sent to{" "}
                <span className="font-semibold text-text">{customerEmail}</span>.
              </p>
              <p className="text-text/80">
                Your meal plan is now being prepared. You can view your order details and manage your subscription in your profile.
              </p>
              <Button asChild className="mt-4">
                <Link href="/profile">Go to My Profile</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </>
    );
  } catch (error) {
    console.error("Error retrieving Stripe session:", error);
    // If the session ID is invalid or another error occurs, redirect.
    redirect("/configurator?error=invalid_session");
  }
}