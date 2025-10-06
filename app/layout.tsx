import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast"; // Using react-hot-toast for notifications

// Setup the Inter font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "NutriPlan - Your Personal Meal Plan Service",
  description: "Delicious, healthy, and personalized meal plans delivered to your door. Configure your perfect plan and start your journey to a healthier you.",
};

/**
 * RootLayout component
 * This is the main layout for the entire application.
 * It sets up the HTML structure, applies the global font, and wraps children pages.
 * @param {object} props - The properties for the component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The root layout structure.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-background`}>
        {/* Toaster for displaying notifications (e.g., for auth or forms) */}
        <Toaster position="top-center" reverseOrder={false} />
        <main className="min-h-screen flex flex-col">
          {/* Children will be the page content */}
          {children}
        </main>
      </body>
    </html>
  );
}