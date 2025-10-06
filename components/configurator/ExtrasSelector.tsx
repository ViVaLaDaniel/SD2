"use client";

import { useMealPlanStore } from "@/lib/store";
import { EXTRAS_PRICES, formatPrice } from "@/lib/constants";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import React from "react";

/**
 * A custom-styled checkbox row for selecting an extra item.
 * @param {object} props - The properties for the component.
 * @param {string} props.id - The unique ID for the checkbox input.
 * @param {string} props.label - The display label for the option.
 * @param {string} props.price - The formatted price of the option.
 * @param {boolean} props.checked - Whether the checkbox is currently checked.
 * @param {(checked: boolean) => void} props.onChange - The callback function to handle state change.
 * @returns {JSX.Element} The rendered checkbox row.
 */
const ExtraCheckbox = ({ id, label, price, checked, onChange }: {
  id: string;
  label: string;
  price: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <div
    data-state={checked ? "checked" : "unchecked"}
    className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-primary/5 data-[state=checked]:border-primary data-[state=checked]:bg-primary/10"
  >
    <label htmlFor={id} className="flex flex-col gap-1 cursor-pointer">
      <span className="font-medium">{label}</span>
      <span className="text-sm text-text/70">+{price} (one-time)</span>
    </label>
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
    />
  </div>
);

/**
 * ExtrasSelector component
 * Allows the user to select additional one-time items for their meal plan.
 * It uses the useMealPlanStore to manage state.
 * @returns {JSX.Element} The rendered extras selector component.
 */
const ExtrasSelector = () => {
  // Access the extras state and the setter function from the store
  const { extras, setExtra } = useMealPlanStore((state) => ({
    extras: state.config.extras,
    setExtra: state.setExtra,
  }));

  return (
    <Card className="glassmorphism">
      <CardHeader>
        <CardTitle>4. Дополнительно (Extras)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <ExtraCheckbox
          id="cutlery"
          label="Столовые приборы (Cutlery)"
          price={formatPrice(EXTRAS_PRICES.cutlery)}
          checked={extras.cutlery}
          onChange={(checked) => setExtra("cutlery", checked)}
        />
        <ExtraCheckbox
          id="detox"
          label="Детокс-напиток (Detox Drink)"
          price={formatPrice(EXTRAS_PRICES.detox)}
          checked={extras.detox}
          onChange={(checked) => setExtra("detox", checked)}
        />
      </CardContent>
    </Card>
  );
};

export default ExtrasSelector;