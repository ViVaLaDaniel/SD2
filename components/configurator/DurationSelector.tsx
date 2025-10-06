"use client";

import { useMealPlanStore } from "@/lib/store";
import { DURATION_OPTIONS } from "@/lib/constants";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

/**
 * DurationSelector component
 * Allows the user to select the duration of their meal plan.
 * It uses the useMealPlanStore to manage state.
 * @returns {JSX.Element} The rendered duration selector component.
 */
const DurationSelector = () => {
  // Access the duration state and the setter function from the store
  const { duration, setDuration } = useMealPlanStore((state) => ({
    duration: state.config.duration,
    setDuration: state.setDuration,
  }));

  return (
    <Card className="glassmorphism">
      <CardHeader>
        <CardTitle>3. Продолжительность (Duration)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {DURATION_OPTIONS.map((option) => (
            <Button
              key={option}
              variant={duration === option ? "default" : "outline"}
              onClick={() => setDuration(option)}
              className="flex flex-col h-auto py-3"
            >
              <span className="text-lg font-bold">{option}</span>
              <span className="text-xs">дней</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DurationSelector;