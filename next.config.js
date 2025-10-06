/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // While we don't have external images specified yet,
    // it's good practice to configure domains if we anticipate them.
    // e.g., domains: ['images.unsplash.com'],
  },
};

module.exports = nextConfig;