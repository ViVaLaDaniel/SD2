import AuthForm from "@/components/auth/AuthForm";
import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";

/**
 * Sign Up Page
 * This page displays the sign-up form.
 * It contains the server action for handling the new user registration process.
 * @returns {JSX.Element} The rendered sign-up page.
 */
export default function SignUpPage() {
  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // email_redirect_to is the URL the user will be redirected to after
        // clicking the confirmation link in the email.
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return { error: `Could not sign up user: ${error.message}` };
    }

    // On successful sign-up, Supabase sends a confirmation email.
    // We inform the user to check their inbox.
    return { message: "Check your email to confirm your account." };
  };

  return <AuthForm mode="signup" action={signUp} />;
}