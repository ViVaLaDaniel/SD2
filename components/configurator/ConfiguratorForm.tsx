"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import CalorieSelector from "./CalorieSelector";
import MealsSelector from "./MealsSelector";
import DurationSelector from "./DurationSelector";
import ExtrasSelector from "./ExtrasSelector";
import PriceDisplay from "./PriceDisplay";

/**
 * ConfiguratorForm component
 * This is the main component that assembles all the different parts of the
 * meal plan configurator. It also handles notifications for cancelled payments.
 * @returns {JSX.Element} The rendered configurator form.
 */
const ConfiguratorForm = () => {
  const searchParams = useSearchParams();

  // Effect to show notifications based on URL query parameters
  useEffect(() => {
    if (searchParams.get("cancelled")) {
      toast.error("Payment was cancelled. You can try again anytime.");
    }
    if (searchParams.get("error")) {
      toast.error(`An error occurred: ${searchParams.get("error")}`);
    }
  }, [searchParams]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Step 1: Calorie Selector */}
      <CalorieSelector />

      {/* Step 2: Meals Selector */}
      <MealsSelector />

      {/* Step 3: Duration Selector */}
      <DurationSelector />

      {/* Step 4: Extras Selector */}
      <ExtrasSelector />

      {/* Sticky Price Display */}
      <div className="pt-16"> {/* Padding to prevent content from hiding behind the sticky bar */}
        <PriceDisplay />
      </div>
    </div>
  );
};

export default ConfiguratorForm;