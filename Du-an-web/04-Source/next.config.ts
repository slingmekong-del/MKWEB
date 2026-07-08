import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow the higher quality used by the certificate lightbox (default is [75]).
    qualities: [75, 92],
  },
  // Serve the Decap CMS admin (public/admin/index.html) at the clean /admin URL.
  async rewrites() {
    return [{ source: "/admin", destination: "/admin/index.html" }];
  },
};

export default nextConfig;
