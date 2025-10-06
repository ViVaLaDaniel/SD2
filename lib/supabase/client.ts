import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/lib/database.types";

/**
 * Creates a Supabase client for client-side (browser) usage.
 * This client is used in client components for interacting with Supabase.
 *
 * It reads the Supabase URL and anonymous key from public environment variables.
 * These variables must be prefixed with NEXT_PUBLIC_.
 *
 * @returns {SupabaseClient} An instance of the Supabase client.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}