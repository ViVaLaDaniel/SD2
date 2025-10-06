"use client";

import { useMealPlanStore } from "@/lib/store";
import { MEALS_OPTIONS } from "@/lib/constants";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

/**
 * MealsSelector component
 * Allows the user to select the number of meals per day for their plan.
 * It uses the useMealPlanStore to manage state.
 * @returns {JSX.Element} The rendered meals selector component.
 */
const MealsSelector = () => {
  // Access the mealsPerDay state and the setter function from the store
  const { mealsPerDay, setMealsPerDay } = useMealPlanStore((state) => ({
    mealsPerDay: state.config.mealsPerDay,
    setMealsPerDay: state.setMealsPerDay,
  }));

  return (
    <Card className="glassmorphism">
      <CardHeader>
        <CardTitle>2. Количество приемов пищи (Meals per day)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {MEALS_OPTIONS.map((option) => (
            <Button
              key={option}
              variant={mealsPerDay === option ? "default" : "outline"}
              onClick={() => setMealsPerDay(option)}
              className="flex flex-col h-auto py-3"
            >
              <span className="text-lg font-bold">{option}</span>
              <span className="text-xs">приема</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MealsSelector;