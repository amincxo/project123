import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['s2.coinmarketcap.com'],
    // Optional: you can add more image optimization settings
    minimumCacheTTL: 60, // Cache images for 60 seconds
    // formats: ['image/webp'], // Serve webp by default
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;