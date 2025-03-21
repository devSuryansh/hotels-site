import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ], // Allow images from Unsplash
  },
};

export default nextConfig;
