import type { NextConfig } from "next";
import { readdirSync } from "node:fs";
import path from "node:path";

/**
 * Top-level URL segments that have their own folder in `app/` (e.g.
 * "design-preview", later "about" or "blog"). Read from the file system at
 * build time, so new pages are picked up automatically: `proxy.ts` uses this
 * list to tell real one-segment URLs from unknown ones (HTTP 404).
 * Skips dynamic folders ("[category]"), private folders ("_x") and parallel
 * routes ("@x"); route groups ("(x)") are opened, as they add no URL segment.
 */
function topLevelAppSegments(dir = path.join(process.cwd(), "app")): string[] {
  const segments: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const name = entry.name;
    if (name.startsWith("(") && name.endsWith(")")) segments.push(...topLevelAppSegments(path.join(dir, name)));
    else if (!/^[[_@]/.test(name)) segments.push(name);
  }
  return segments;
}

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  env: {
    // Comma-separated list for proxy.ts (route folder names only, no secrets).
    APP_TOP_LEVEL_ROUTES: topLevelAppSegments().join(","),
  },
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
