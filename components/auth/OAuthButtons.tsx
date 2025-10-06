"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";

type OAuthProvider = "google" | "facebook" | "apple";

/**
 * OAuthButtons component
 * Renders buttons for signing in with different OAuth providers (Google, Facebook, Apple).
 * It handles the sign-in flow by calling Supabase's `signInWithOAuth` method.
 * @returns {JSX.Element} The rendered OAuth buttons.
 */
export default function OAuthButtons() {
  const [loading, setLoading] = useState<OAuthProvider | null>(null);

  const handleOAuthSignIn = async (provider: OAuthProvider) => {
    setLoading(provider);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      toast.error(`Error signing in with ${provider}: ${error.message}`);
      setLoading(null);
    }
    // The user will be redirected, so no need to setLoading(null) on success.
  };

  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleOAuthSignIn("google")}
        isLoading={loading === "google"}
        disabled={!!loading}
      >
        <FaGoogle className="mr-2 h-5 w-5" />
        Continue with Google
      </Button>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleOAuthSignIn("facebook")}
        isLoading={loading === "facebook"}
        disabled={!!loading}
      >
        <FaFacebook className="mr-2 h-5 w-5" />
        Continue with Facebook
      </Button>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleOAuthSignIn("apple")}
        isLoading={loading === "apple"}
        disabled={!!loading}
      >
        <FaApple className="mr-2 h-5 w-5" />
        Continue with Apple
      </Button>
    </div>
  );
}