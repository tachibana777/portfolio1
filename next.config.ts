import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  // Keep production output separate so `next build` cannot invalidate Fast Refresh
  // while `next dev` is running in the normal .next directory.
  distDir: process.env.VERCEL === "1" ? ".next" : process.env.NODE_ENV === "production" ? ".next-build" : ".next",
  async redirects() {
    return [
      { source: "/projects/misp-wazuh-ioc-lab", destination: "/projects/wazuh-edr-lab", permanent: true },
      { source: "/projects/misp-wazuh-automated-response-lab", destination: "/projects/wazuh-xdr-lab", permanent: true },
    ];
  },
  images: { formats: ["image/avif", "image/webp"] },
};
export default nextConfig;
