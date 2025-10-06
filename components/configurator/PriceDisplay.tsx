"use client";

import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import { useMealPlanStore } from "@/lib/store";
import { calculatePrice, formatPrice } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

/**
 * AnimatedNumber component
 * A component that animates a number change smoothly.
 * @param {object} props - The properties for the component.
 * @param {number} props.value - The number value to display and animate.
 * @returns {JSX.Element} The rendered animated number.
 */
function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const controls = animate(displayValue, value, {
      duration: 0.5,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(latest),
    });
    return () => controls.stop();
  }, [value, displayValue]);

  return (
    <motion.span>{formatPrice(Math.round(displayValue))}</motion.span>
  );
}

/**
 * PriceDisplay component
 * Displays the calculated price of the meal plan in real-time.
 * It listens to the meal plan store and animates price changes.
 * @returns {JSX.Element} The rendered price display component.
 */
const PriceDisplay = () => {
  const router = useRouter();
  const config = useMealPlanStore((state) => state.config);
  const [prices, setPrices] = useState({ pricePerDay: 0, totalPrice: 0 });
  const [isLoading, setIsLoading] = useState(false);

  // Recalculate prices whenever the configuration changes
  useEffect(() => {
    const { pricePerDay, totalPrice } = calculatePrice(config);
    setPrices({ pricePerDay, totalPrice });
  }, [config]);

  /**
   * Handles the checkout process by calling the backend API to create a Stripe session.
   */
  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ config }),
      });

      const session = await response.json();
      if (response.ok) {
        // Redirect to Stripe's checkout page
        window.location.href = session.url;
      } else {
        // Show an error message to the user
        toast.error(session.error || "An unexpected error occurred.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to connect to the payment service.");
      setIsLoading(false);
    }
  };

  return (
    <Card className="glassmorphism sticky bottom-4">
      <CardContent className="p-4 flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-sm text-text/80">Price per day</span>
          <span className="text-2xl font-bold text-primary">
            <AnimatedNumber value={prices.pricePerDay} />
          </span>
        </div>
        <div className="text-right">
          <span className="text-sm text-text/80">Total for {config.duration} days</span>
          <p className="text-3xl font-bold text-slate-800">
            <AnimatedNumber value={prices.totalPrice} />
          </p>
        </div>
        <Button size="lg" onClick={handleCheckout} isLoading={isLoading} className="min-w-[180px]">
          Proceed to Checkout
        </Button>
      </CardContent>
    </Card>
  );
};

export default PriceDisplay;