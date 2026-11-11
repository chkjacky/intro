import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "intro";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  images: {
    unoptimized: true,
  },
  /* Lets the dev server load over ngrok (e.g. testing on a phone) */
  allowedDevOrigins: ["*.ngrok-free.app", "*.ngrok-free.dev", "*.ngrok.app"],
};

export default nextConfig;
