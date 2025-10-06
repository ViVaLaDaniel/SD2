import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

/**
 * Middleware to handle session management and protected routes.
 * It refreshes the user's session on each request and protects specific routes
 * by redirecting unauthenticated users to the sign-in page.
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse>} The response, which may be a redirect or the original request.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Create a Supabase client with middleware-specific cookie handling
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: "", ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  // Refresh the user's session to keep them logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Define protected routes
  const protectedRoutes = ["/profile", "/configurator"];
  const { pathname } = request.nextUrl;

  // If the user is not authenticated and is trying to access a protected route,
  // redirect them to the sign-in page.
  if (!user && protectedRoutes.some(route => pathname.startsWith(route))) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/signin";
    return NextResponse.redirect(url);
  }

  // If the user is authenticated and tries to access auth pages, redirect to configurator
  if (user && (pathname.startsWith('/auth/signin') || pathname.startsWith('/auth/signup'))) {
    const url = request.nextUrl.clone();
    url.pathname = "/configurator";
    return NextResponse.redirect(url);
  }

  // Allow the request to proceed
  return response;
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api (API routes)
     */
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};