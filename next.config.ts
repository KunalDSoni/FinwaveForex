import type { NextConfig } from "next";

// Static export so the site can be served directly by any static host
// (e.g. GitHub Pages). Set NEXT_PUBLIC_BASE_PATH to the repo subpath when
// deploying to a project page, e.g. "/FinwaveForex".
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: basePath || undefined,
};

export default nextConfig;
