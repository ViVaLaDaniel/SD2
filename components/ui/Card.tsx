import React from "react";
import { twMerge } from "tailwind-merge";

/**
 * Card component
 * A simple, styled container for content.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Standard div attributes.
 * @returns {JSX.Element} The rendered card component.
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge(
      "rounded-lg border bg-card text-card-foreground shadow-subtle",
      "glassmorphism", // Apply our custom glassmorphism style
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

/**
 * CardHeader component
 * A header section for the Card component.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Standard div attributes.
 * @returns {JSX.Element} The rendered card header.
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

/**
 * CardTitle component
 * A title element for the CardHeader.
 * @param {React.HTMLAttributes<HTMLHeadingElement>} props - Standard h3 attributes.
 * @returns {JSX.Element} The rendered card title.
 */
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={twMerge(
      "text-2xl font-semibold leading-none tracking-tight text-slate-800",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

/**
 * CardDescription component
 * A description element for the CardHeader.
 * @param {React.HTMLAttributes<HTMLParagraphElement>} props - Standard p attributes.
 * @returns {JSX.Element} The rendered card description.
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={twMerge("text-sm text-text/80", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

/**
 * CardContent component
 * The main content area for the Card.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Standard div attributes.
 * @returns {JSX.Element} The rendered card content.
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={twMerge("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

/**
 * CardFooter component
 * A footer section for the Card.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Standard div attributes.
 * @returns {JSX.Element} The rendered card footer.
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };