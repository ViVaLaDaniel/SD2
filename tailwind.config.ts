import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#10B981", // Fresh Green
        secondary: "#059669", // Emerald
        background: "#FAFAF9", // Warm White
        text: "#1E293B", // Slate
        accent: "#F59E0B", // Amber
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        lg: "12px",
      },
      boxShadow: {
        'subtle': '0 4px 12px rgba(0, 0, 0, 0.05)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;