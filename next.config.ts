import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the project root so a stray package-lock.json higher up (e.g. in the home folder) isn't picked up.
  turbopack: { root: path.join(__dirname) },
};

export default nextConfig;
