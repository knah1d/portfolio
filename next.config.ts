import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Plain static site: `next build` writes HTML/CSS/JS to out/
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
