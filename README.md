# NutriPlan - Meal Plan Delivery Service

**🚀 Live Deployment Updated: October 2025**

NutriPlan is a full-stack, production-ready web application built with Next.js 14. It serves as a showcase for a modern meal plan delivery service, featuring user authentication, an interactive meal plan configurator, and seamless payment processing with Stripe.

## Key Features

* **Modern Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS.
* **Secure Authentication:** Full auth system using Supabase, including email/password, Google, Facebook, and Apple OAuth.
* **Interactive Configurator:** A multi-step form that allows users to customize their meal plan and see the price update in real-time.
* **Payment Processing:** Integration with Stripe Checkout for secure and easy payments.
* **Robust Backend:** Supabase for database management and Stripe webhooks for reliable order fulfillment.
* **Modern UI/UX:** A clean, responsive design with a custom design system, glassmorphism effects, and smooth animations.

## 1. Prerequisites

Before you begin, ensure you have the following installed:

* [Node.js](https://nodejs.org/) (v18.x or later)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* [Stripe CLI](https://stripe.com/docs/stripe-cli) (for testing webhooks locally)

## 2. Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd nutriplan
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

## 3. Environment Variables Setup

This project requires API keys from Supabase and Stripe.

1. **Create a `.env.local` file** in the root of the project by copying the example file:
   ```bash
   cp .env.example .env.local
   ```

2. **Fill in the values** in `.env.local`:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
   
   # Stripe Configuration
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
   STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
   
   # Stripe Webhook Secret (get this in step 6)
   STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
   ```
   
   * **Supabase Keys:** Find these in your Supabase project dashboard under `Project Settings` > `API`.
   * **Stripe Keys:** Find these in your Stripe dashboard under `Developers` > `API keys`. Use the "Test mode" keys for development.

## 4. Database Setup (Supabase)

You need to create two tables in your Supabase database: `users` and `orders`.

1. Navigate to the **SQL Editor** in your Supabase dashboard.
2. Run the following SQL queries:
   ```sql
