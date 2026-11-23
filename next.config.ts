import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Client vignettes may reference photos hosted anywhere (Drive, CDN, own domain).
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  // Sandbox/preview hosts serve the dev server behind a proxy.
  allowedDevOrigins: ["*.e2b.app", "localhost"],
};

export default nextConfig;
