import * as React from "react";
import { twMerge } from "tailwind-merge";

// Define props interface for the Input component
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Input component
 * A styled input field for forms.
 * @param {InputProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered input element.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={twMerge(
          "flex h-10 w-full rounded-lg border border-slate-300 bg-background px-3 py-2 text-sm",
          "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };