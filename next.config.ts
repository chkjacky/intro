import type { NextConfig } from "next";

import { basePath } from "./src/lib/basePath";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : "",
  images: {
    unoptimized: true,
  },
  /* Lets the dev server load over ngrok (e.g. testing on a phone) */
  allowedDevOrigins: ["*.ngrok-free.app", "*.ngrok-free.dev", "*.ngrok.app"],
};

export default nextConfig;
