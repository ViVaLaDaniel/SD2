import { MealPlanConfig } from "@/types";

// Base price for the meal plan per day in the smallest currency unit (e.g., kopecks for RUB)
// Let's assume a base price of 800 RUB per day.
export const BASE_PRICE_PER_DAY = 80000; // 800.00 RUB

// Price modifiers for calorie options (in smallest currency unit)
export const CALORIE_MODIFIERS = {
  1500: 0, // Base
  1800: 20000, // +200 RUB
  2200: 40000, // +400 RUB
};

// Price modifiers for meals per day options (in smallest currency unit)
export const MEALS_MODIFIERS = {
  3: 0, // Base
  4: 30000, // +300 RUB
  5: 50000, // +500 RUB
};

// Prices for extra options (one-time cost, in smallest currency unit)
export const EXTRAS_PRICES = {
  cutlery: 5000, // +50 RUB
  detox: 20000, // +200 RUB
};

// Available options for the configurator
export const CALORIE_OPTIONS: MealPlanConfig['calories'][] = [1500, 1800, 2200];
export const MEALS_OPTIONS: MealPlanConfig['mealsPerDay'][] = [3, 4, 5];
export const DURATION_OPTIONS: MealPlanConfig['duration'][] = [5, 7, 14, 30];

/**
 * Calculates the price per day and total price based on the meal plan configuration.
 * @param {MealPlanConfig} config - The user's selected meal plan configuration.
 * @returns {{ pricePerDay: number, totalPrice: number }} The calculated prices.
 */
export const calculatePrice = (config: MealPlanConfig) => {
  // Calculate price per day
  const calorieModifier = CALORIE_MODIFIERS[config.calories];
  const mealsModifier = MEALS_MODIFIERS[config.mealsPerDay];
  const pricePerDay = BASE_PRICE_PER_DAY + calorieModifier + mealsModifier;

  // Calculate one-time extras cost
  let extrasTotal = 0;
  if (config.extras.cutlery) {
    extrasTotal += EXTRAS_PRICES.cutlery;
  }
  if (config.extras.detox) {
    extrasTotal += EXTRAS_PRICES.detox;
  }

  // Calculate total price
  const subtotal = pricePerDay * config.duration;
  const totalPrice = subtotal + extrasTotal;

  return {
    pricePerDay,
    totalPrice,
  };
};

/**
 * Formats a price from the smallest currency unit to a human-readable string.
 * @param {number} amount - The amount in the smallest currency unit (e.g., kopecks).
 * @param {string} currency - The currency code (e.g., 'RUB').
 * @returns {string} The formatted price string.
 */
export const formatPrice = (amount: number, currency: string = 'RUB') => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount / 100);
};