import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { FaLeaf, FaTruck, FaSmile } from "react-icons/fa";

/**
 * Landing Page (Home Page)
 * This is the main entry point of the application.
 * It features a hero section and introduces the service.
 * @returns {JSX.Element} The rendered home page.
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/20 via-background to-background text-center py-20 md:py-32">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-text">
              Healthy Eating, Simplified.
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-text/80">
              Delicious, chef-prepared meals, customized to your health goals and delivered fresh to your door.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/configurator">Create Your Plan</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text">How It Works</h2>
              <p className="mt-3 text-lg text-text/70">A simple path to a healthier you in three steps.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 rounded-full p-4 mb-4">
                  <FaLeaf className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Customize Your Plan</h3>
                <p className="text-text/80">
                  Use our interactive configurator to select your calories, number of meals, and duration.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 rounded-full p-4 mb-4">
                  <FaTruck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2. We Cook & Deliver</h3>
                <p className="text-text/80">
                  Our expert chefs prepare your meals using fresh, high-quality ingredients. We deliver them right to your doorstep.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 rounded-full p-4 mb-4">
                  <FaSmile className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Enjoy & Feel Great</h3>
                <p className="text-text/80">
                  No cooking, no cleaning. Just heat, eat, and enjoy the benefits of a healthy, balanced diet.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}