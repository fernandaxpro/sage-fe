import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: "standalone",
   images: {
    domains: ['alarmexpert.com.au'], 
  },
};

export default nextConfig;
