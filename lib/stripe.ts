import Stripe from 'stripe';

/**
 * This file exports a singleton instance of the Stripe Node.js client.
 *
 * The Stripe client is initialized with the secret key from the environment variables.
 * It's crucial that `STRIPE_SECRET_KEY` is set in your .env file for this to work.
 * This client is intended for server-side use only, as it uses a secret key.
 *
 * The apiVersion is pinned to a specific version to ensure that future
 * breaking changes from Stripe do not affect our application unexpectedly.
 */

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in the environment variables.');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10', // Pin the API version
  typescript: true,
});