import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  // Keep production output separate so `next build` cannot invalidate Fast Refresh
  // while `next dev` is running in the normal .next directory.
  distDir: process.env.NODE_ENV === "production" ? ".next-build" : ".next",
  images: { formats: ["image/avif", "image/webp"] },
};
export default nextConfig;
