import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve the Decap CMS admin (public/admin/index.html) at the clean /admin URL.
  async rewrites() {
    return [{ source: "/admin", destination: "/admin/index.html" }];
  },
};

export default nextConfig;
