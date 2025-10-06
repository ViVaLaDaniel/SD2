import ConfiguratorForm from "@/components/configurator/ConfiguratorForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

/**
 * Configurator Page
 * This is the main page for the meal plan configurator.
 * It's a protected route, so it will check for an authenticated user.
 * It renders the header, the main configurator form, and the footer.
 * @returns {Promise<JSX.Element>} The rendered configurator page.
 */
export default async function ConfiguratorPage() {
  const supabase = createClient();

  // Although middleware protects this page, it's good practice
  // to also check for the user on the page level.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // This should theoretically not be reached if middleware is active,
    // but serves as a fallback.
    redirect("/auth/signin");
  }

  return (
    <>
      <Header />
      <div className="flex-grow container mx-auto px-4 py-12 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text">
            Configure Your Perfect Meal Plan
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-text/80">
            Follow the steps below to customize your plan. The price will update in real-time.
          </p>
        </div>
        <ConfiguratorForm />
      </div>
      <Footer />
    </>
  );
}