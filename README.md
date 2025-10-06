# NutriPlan - Meal Plan Delivery Service

NutriPlan is a full-stack, production-ready web application built with Next.js 14. It serves as a showcase for a modern meal plan delivery service, featuring user authentication, an interactive meal plan configurator, and seamless payment processing with Stripe.

## Key Features

*   **Modern Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS.
*   **Secure Authentication:** Full auth system using Supabase, including email/password, Google, Facebook, and Apple OAuth.
*   **Interactive Configurator:** A multi-step form that allows users to customize their meal plan and see the price update in real-time.
*   **Payment Processing:** Integration with Stripe Checkout for secure and easy payments.
*   **Robust Backend:** Supabase for database management and Stripe webhooks for reliable order fulfillment.
*   **Modern UI/UX:** A clean, responsive design with a custom design system, glassmorphism effects, and smooth animations.

## 1. Prerequisites

Before you begin, ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v18.x or later)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
*   [Stripe CLI](https://stripe.com/docs/stripe-cli) (for testing webhooks locally)

## 2. Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd nutriplan
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

## 3. Environment Variables Setup

This project requires API keys from Supabase and Stripe.

1.  **Create a `.env.local` file** in the root of the project by copying the example file:
    ```bash
    cp .env.example .env.local
    ```

2.  **Fill in the values** in `.env.local`:

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

    *   **Supabase Keys:** Find these in your Supabase project dashboard under `Project Settings` > `API`.
    *   **Stripe Keys:** Find these in your Stripe dashboard under `Developers` > `API keys`. Use the "Test mode" keys for development.

## 4. Database Setup (Supabase)

You need to create two tables in your Supabase database: `users` and `orders`.

1.  Navigate to the **SQL Editor** in your Supabase dashboard.
2.  Run the following SQL queries:

    ```sql
    -- Create the 'users' table to store public user profiles.
    -- This table extends the built-in 'auth.users' table.
    CREATE TABLE public.users (
      id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
      full_name TEXT,
      avatar_url TEXT,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Create a trigger to automatically insert a new user profile
    -- when a new user signs up in the auth.users table.
    CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS TRIGGER AS $$
    BEGIN
      INSERT INTO public.users (id, full_name, avatar_url)
      VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
      RETURN new;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;

    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

    -- Create the 'orders' table
    CREATE TABLE public.orders (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('pending', 'paid', 'delivered', 'cancelled')),
      total_price BIGINT NOT NULL, -- in smallest currency unit (e.g., kopecks)
      currency TEXT NOT NULL,
      meal_plan_config JSONB NOT NULL,
      stripe_payment_intent_id TEXT
    );

    -- Enable Row Level Security (RLS) for the tables
    ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

    -- Create RLS policies
    -- Users can view their own profile
    CREATE POLICY "Allow individual user access to their own profile" ON public.users FOR SELECT USING (auth.uid() = id);
    -- Users can view their own orders
    CREATE POLICY "Allow individual user access to their own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
    -- Orders can be inserted (this will be done via service_role_key from backend)
    CREATE POLICY "Allow insert for service_role" ON public.orders FOR INSERT WITH CHECK (true);
    ```

## 5. OAuth Setup (Supabase)

To enable OAuth providers (Google, Facebook, Apple):
1.  In your Supabase dashboard, go to `Authentication` > `Providers`.
2.  Enable the providers you want to use.
3.  Follow the official Supabase guides to get the `Client ID` and `Client Secret` for each provider.
4.  For each provider, ensure you add the correct **redirect URI** to your OAuth app configuration:
    `https://<your-supabase-project-url>/auth/v1/callback`

## 6. Running the Development Server

1.  **Start the application:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

2.  **Set up the Stripe Webhook:**
    To test the order fulfillment flow, you need to forward Stripe events to your local server.

    *   Open a **new terminal window**.
    *   Run the Stripe CLI:
        ```bash
        stripe listen --forward-to localhost:3000/api/webhook
        ```
    *   The CLI will output a webhook signing secret (e.g., `whsec_...`). **Copy this secret** and paste it as the `STRIPE_WEBHOOK_SECRET` in your `.env.local` file.
    *   You will need to **restart your Next.js dev server** after updating the `.env.local` file.

## 7. Building for Production

To create a production-ready build of the application, run:
```bash
npm run build
```
This will generate an optimized build in the `.next` directory. You can then start the production server with `npm start`.

## 8. Testing the Payment Flow

1.  Ensure your dev server and Stripe CLI are running.
2.  Sign up or log in to the application.
3.  Go to the `/configurator` page.
4.  Customize your meal plan and click "Proceed to Checkout".
5.  You will be redirected to a Stripe Checkout page. Use one of Stripe's [test card numbers](https://stripe.com/docs/testing#cards) to simulate a payment.
6.  After a successful payment, you will be redirected to the `/success` page.
7.  Check your terminal running the Stripe CLI. You should see a `checkout.session.completed` event (200 OK).
8.  Check the `orders` table in your Supabase dashboard. A new order should have been created.