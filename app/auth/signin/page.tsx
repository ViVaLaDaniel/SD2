import AuthForm from "@/components/auth/AuthForm";
import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Sign In Page
 * This page displays the sign-in form.
 * It also contains the server action for handling the sign-in process.
 * @returns {JSX.Element} The rendered sign-in page.
 */
export default function SignInPage() {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // We are returning a simple object with an error message.
      // The AuthForm client component will handle displaying this message.
      return { error: `Could not authenticate user: ${error.message}` };
    }

    // On successful sign-in, redirect the user to the configurator.
    return redirect("/configurator");
  };

  return <AuthForm mode="signin" action={signIn} />;
}