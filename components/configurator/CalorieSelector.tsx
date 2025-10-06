"use client";

import { useMealPlanStore } from "@/lib/store";
import { CALORIE_OPTIONS } from "@/lib/constants";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

/**
 * CalorieSelector component
 * Allows the user to select the daily calorie amount for their meal plan.
 * It uses the useMealPlanStore to manage state.
 * @returns {JSX.Element} The rendered calorie selector component.
 */
const CalorieSelector = () => {
  // Access the calorie state and the setter function from the store
  const { calories, setCalories } = useMealPlanStore((state) => ({
    calories: state.config.calories,
    setCalories: state.setCalories,
  }));

  return (
    <Card className="glassmorphism">
      <CardHeader>
        <CardTitle>1. Калорийность (Calories)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {CALORIE_OPTIONS.map((option) => (
            <Button
              key={option}
              variant={calories === option ? "default" : "outline"}
              onClick={() => setCalories(option)}
              className="flex flex-col h-auto py-3"
            >
              <span className="text-lg font-bold">{option}</span>
              <span className="text-xs">ккал</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CalorieSelector;