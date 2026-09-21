import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});
const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    // Trim first-load JS: barrel imports resolve to per-module ESM.
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  // BRAWUKA-524 · /career is the legacy compat alias of /resume. Browsers
  // inherit the request fragment across 308 (RFC 9110 §10.2.2), so deep
  // links map 1:1: /career#wise → /resume#wise, etc. Hash never reaches the
  // server — no extra routing code needed client-side.
  redirects: async () => [
    {
      source: "/career",
      destination: "/resume",
      permanent: true,
    },
    {
      // Next's trailingSlash redirect /career/ → /career runs first, so this
      // edge fires on the merged platform where both rules coexist.
      source: "/career/",
      destination: "/resume",
      permanent: true,
    },
  ],
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
      ],
    },
  ],
};
export default bundleAnalyzer(nextConfig);
