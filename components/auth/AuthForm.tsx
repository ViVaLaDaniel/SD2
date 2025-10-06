"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { customZodResolver } from "@/lib/customZodResolver";
import * as z from "zod";
import Link from "next/link";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import OAuthButtons from "./OAuthButtons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

// Define the validation schema for sign-in
const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

// Define the validation schema for sign-up
const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

type SignInFormValues = z.infer<typeof signInSchema>;
type SignUpFormValues = z.infer<typeof signUpSchema>;
type FormValues = SignInFormValues | SignUpFormValues;

interface AuthFormProps {
  mode: "signin" | "signup";
  action: (data: FormData) => Promise<{ error?: string; message?: string }>;
}

/**
 * AuthForm component
 * A client component that handles both sign-in and sign-up forms.
 * It uses react-hook-form for validation and manages form state.
 * @param {AuthFormProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered authentication form.
 */
export default function AuthForm({ mode, action }: AuthFormProps) {
  const [isPending, startTransition] = useTransition();

  const isSignUp = mode === "signup";
  const schema = isSignUp ? signUpSchema : signInSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: customZodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    startTransition(async () => {
      const result = await action(formData);
      if (result?.error) {
        toast.error(result.error);
      } else if (result?.message) {
        toast.success(result.message);
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-md glassmorphism">
        <CardHeader>
          <CardTitle>{isSignUp ? "Create an Account" : "Sign In"}</CardTitle>
          <CardDescription>
            {isSignUp
              ? "Enter your details to get started."
              : "Welcome back! Please sign in to your account."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* OAuth Buttons */}
          <OAuthButtons />

          {/* Separator */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-text/60">
                Or continue with
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                {...register("email")}
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Input
                {...register("password")}
                type="password"
                placeholder="Password"
                autoComplete={isSignUp ? "new-password" : "current-password"}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" isLoading={isPending}>
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-text/80">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <Link
              href={isSignUp ? "/auth/signin" : "/auth/signup"}
              className="font-semibold text-primary hover:underline ml-1"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}