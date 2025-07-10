import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ This disables ESLint checks during `next build`
    ignoreDuringBuilds: true,
  },
  // You can add more config options below
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
