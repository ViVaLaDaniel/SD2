import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatPrice } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { Order } from "@/types";
import { redirect } from "next/navigation";

/**
 * User Profile Page
 * This is a protected route that displays the user's profile information
 * and their order history.
 * @returns {Promise<JSX.Element>} The rendered profile page.
 */
export default async function ProfilePage() {
  const supabase = createClient();

  // Fetch the current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // Redirect to sign-in if no user is authenticated
    redirect("/auth/signin");
  }

  // Fetch the user's order history from the 'orders' table
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .returns<Order[]>();

  if (error) {
    console.error("Error fetching orders:", error);
    // Handle error gracefully, maybe show a message
  }

  return (
    <>
      <Header />
      <div className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-12 md:px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text">My Profile</h1>
            <p className="text-text/70">Welcome back, {user.email}</p>
          </div>

          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>
                Here are the recent meal plans you&apos;ve purchased.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {orders && orders.length > 0 ? (
                <ul className="space-y-4">
                  {orders.map((order) => (
                    <li key={order.id} className="p-4 border rounded-lg flex justify-between items-center">
                      <div>
                        <p className="font-semibold">Order ID: {order.id.substring(0, 8)}</p>
                        <p className="text-sm text-text/70">
                          Date: {new Date(order.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-text/70 capitalize">Status: {order.status}</p>
                      </div>
                      <div className="font-bold text-lg text-primary">
                        {formatPrice(order.total_price, order.currency)}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8">
                  <p className="text-text/70 mb-4">You haven&apos;t placed any orders yet.</p>
                  <Button asChild>
                    <a href="/configurator">Create Your First Plan</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}