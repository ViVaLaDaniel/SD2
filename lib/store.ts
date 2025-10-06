import { create } from 'zustand';
import { MealPlanConfig } from '@/types';

/**
 * Interface for the meal plan configuration store state.
 */
interface MealPlanState {
  config: MealPlanConfig;
  setCalories: (calories: MealPlanConfig['calories']) => void;
  setMealsPerDay: (meals: MealPlanConfig['mealsPerDay']) => void;
  setDuration: (duration: MealPlanConfig['duration']) => void;
  setExtra: (extra: keyof MealPlanConfig['extras'], value: boolean) => void;
  resetConfig: () => void;
}

// Define the initial state for the meal plan configuration
const initialState: MealPlanConfig = {
  calories: 1500,
  mealsPerDay: 3,
  duration: 7,
  extras: {
    cutlery: false,
    detox: false,
  },
};

/**
 * Zustand store for managing the meal plan configuration.
 * This store holds the current configuration and provides actions to update it.
 */
export const useMealPlanStore = create<MealPlanState>((set) => ({
  config: initialState,

  /**
   * Updates the number of calories in the configuration.
   * @param {1500 | 1800 | 2200} calories - The selected calorie amount.
   */
  setCalories: (calories) =>
    set((state) => ({
      config: { ...state.config, calories },
    })),

  /**
   * Updates the number of meals per day in the configuration.
   * @param {3 | 4 | 5} meals - The selected number of meals.
   */
  setMealsPerDay: (meals) =>
    set((state) => ({
      config: { ...state.config, mealsPerDay: meals },
    })),

  /**
   * Updates the duration of the plan in the configuration.
   * @param {5 | 7 | 14 | 30} duration - The selected duration in days.
   */
  setDuration: (duration) =>
    set((state) => ({
      config: { ...state.config, duration },
    })),

  /**
   * Updates an extra option (e.g., cutlery, detox) in the configuration.
   * @param {'cutlery' | 'detox'} extra - The name of the extra to update.
   * @param {boolean} value - The new value for the extra (true or false).
   */
  setExtra: (extra, value) =>
    set((state) => ({
      config: {
        ...state.config,
        extras: { ...state.config.extras, [extra]: value },
      },
    })),

  /**
   * Resets the configuration to its initial state.
   */
  resetConfig: () => set({ config: initialState }),
}));