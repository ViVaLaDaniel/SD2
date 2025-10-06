/**
 * This file is a placeholder for the auto-generated Supabase types.
 *
 * To generate the actual types from your Supabase schema, you would typically run:
 * `npx supabase gen types typescript --project-id <your-project-id> > types/supabase.ts`
 *
 * For this project, we are defining the types manually based on our planned schema.
 */

import { MealPlanConfig } from ".";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      // The 'users' table will store public profile information,
      // extending the built-in 'auth.users' table.
      users: {
        Row: {
          id: string; // Corresponds to auth.users.id
          updated_at: string | null;
          full_name: string | null;
          avatar_url: string | null;
        };
        Insert: {
          id: string;
          updated_at?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
        };
        Update: {
          id?: string;
          updated_at?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
        };
      };

      // The 'orders' table will store all customer orders.
      orders: {
        Row: {
          id: string;
          user_id: string;
          created_at: string;
          status: "pending" | "paid" | "delivered" | "cancelled";
          total_price: number;
          currency: string;
          meal_plan_config: Json; // Storing the MealPlanConfig as JSONB
          stripe_payment_intent_id: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          created_at?: string;
          status?: "pending" | "paid" | "delivered" | "cancelled";
          total_price: number;
          currency: string;
          meal_plan_config: Json;
          stripe_payment_intent_id?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          created_at?: string;
          status?: "pending" | "paid" | "delivered" | "cancelled";
          total_price?: number;
          currency?: string;
          meal_plan_config?: Json;
          stripe_payment_intent_id?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}