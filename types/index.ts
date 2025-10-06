/**
 * Represents the configuration of a meal plan selected by the user.
 * This interface is used throughout the configurator and checkout process.
 */
export interface MealPlanConfig {
  calories: 1500 | 1800 | 2200;
  mealsPerDay: 3 | 4 | 5;
  duration: 5 | 7 | 14 | 30;
  extras: {
    cutlery: boolean;
    detox: boolean;
  };
}

/**
 * Represents the calculated price of a meal plan.
 */
export interface PriceDetails {
  basePrice: number;
  calorieModifier: number;
  mealsModifier: number;
  extrasPrice: number;
  pricePerDay: number;
  totalPrice: number;
}

/**
 * Represents a user profile, extending the base user data from Supabase.
 */
export interface UserProfile {
  id: string; // Corresponds to Supabase auth.users.id
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
}

/**
 * Represents an order placed by a user.
 * This will be stored in the 'orders' table in Supabase.
 */
export interface Order {
  id: string; // Unique order ID
  user_id: string;
  created_at: string;
  status: 'pending' | 'paid' | 'delivered' | 'cancelled';
  total_price: number;
  currency: string;
  // The specific meal plan configuration for this order
  meal_plan_config: MealPlanConfig;
  stripe_payment_intent_id?: string;
}