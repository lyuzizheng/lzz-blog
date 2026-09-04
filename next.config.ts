import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    // Trim first-load JS: barrel imports resolve to per-module ESM.
    optimizePackageImports: ["lucide-react", "framer-motion", "gsap"],
  },
};

export default nextConfig;
