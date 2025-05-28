import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Enables static export
  // distDir: 'out', // Optional: Specify output directory
  images: {
    unoptimized: true,
  },
  /* config options here */
};

export default nextConfig;
