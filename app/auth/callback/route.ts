import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * GET handler for the OAuth callback route.
 * This route is responsible for exchanging an auth code for a user session.
 * It is used after a user signs in with an OAuth provider or confirms their email.
 * @param {NextRequest} request - The incoming request object.
 * @returns {NextResponse} A response that redirects the user.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  // `next` is a query parameter used for redirecting after a successful login.
  // It could be used to redirect the user back to the page they were on before signing in.
  const next = searchParams.get("next") ?? "/configurator";

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // On successful session exchange, redirect to the intended page.
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // If there's an error or no code, redirect to an error page.
  // For simplicity, we'll redirect to the sign-in page with an error message.
  return NextResponse.redirect(`${origin}/auth/signin?message=Could not authenticate user`);
}