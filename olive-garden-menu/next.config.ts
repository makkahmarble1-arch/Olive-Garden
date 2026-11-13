import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // Owner decision 2026-11-13: the homepage is the only full-menu page, so
  // the old /menu hub permanently redirects there (308 = permanent).
  async redirects() {
    return [{ source: "/menu", destination: "/", permanent: true }];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
