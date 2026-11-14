import type { NextConfig } from "next";
import { readdirSync } from "node:fs";
import path from "node:path";

const PAGE_FILE = /^(page|route)\.(tsx|ts|jsx|js|mdx)$/;

/**
 * One-segment URLs that really exist, read from the file system at build
 * time (and when `next dev` starts), so new pages are picked up
 * automatically. `proxy.ts` answers every other one-segment URL with HTTP 404.
 * - Routes: top-level `app/` folders that contain a `page` or `route` file
 *   (e.g. "design-preview", later "about"). Dynamic ("[x]"), private ("_x")
 *   and parallel ("@x") folders are skipped; route groups ("(x)") are opened.
 * - Files: files in the top of `public/`, plus the metadata files in the top
 *   of `app/` (favicon.ico, robots.ts -> robots.txt, sitemap.ts -> sitemap.xml, ...).
 */
function topLevelAppRoutes(dir = path.join(process.cwd(), "app")): string[] {
  const routes: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const name = entry.name;
    const full = path.join(dir, name);
    if (name.startsWith("(") && name.endsWith(")")) routes.push(...topLevelAppRoutes(full));
    else if (!/^[[_@]/.test(name) && readdirSync(full).some((file) => PAGE_FILE.test(file))) routes.push(name);
  }
  return routes;
}

const METADATA_ROUTES: Record<string, string> = { robots: "robots.txt", sitemap: "sitemap.xml", manifest: "manifest.webmanifest" };
const METADATA_IMAGES = /^(icon|apple-icon|opengraph-image|twitter-image)\d*$/;

function topLevelFiles(): string[] {
  const files = readdirSync(path.join(process.cwd(), "public"), { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name);
  for (const file of readdirSync(path.join(process.cwd(), "app"))) {
    const base = file.replace(/\.[^.]+$/, "");
    const generated = /\.(tsx|ts|jsx|js)$/.test(file);
    if (file === "favicon.ico") files.push(file);
    else if (METADATA_ROUTES[base]) files.push(METADATA_ROUTES[base]);
    else if (METADATA_IMAGES.test(base)) files.push(generated ? base : file);
  }
  return files;
}

/**
 * Basic security headers for every response (owner approval 2026-11-14,
 * Lesson 8.6.1; docs/testing/SECURITY_TEST_REPORT.md). Deliberately no
 * Content-Security-Policy yet: a CSP needs its own review, especially before
 * Google AdSense / Analytics / Microsoft Clarity are added. The
 * Permissions-Policy only switches off device features this site never uses;
 * it leaves ad-related features (browsing-topics, attribution-reporting,
 * join-ad-interest-group, run-ad-auction) and fullscreen untouched.
 * HSTS is sent by Vercel on HTTPS (check after deployment).
 */
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=(), bluetooth=(), hid=(), midi=()",
  },
];

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
  env: {
    // Comma-separated lists for proxy.ts (route and file names only, no secrets).
    APP_TOP_LEVEL_ROUTES: topLevelAppRoutes().join(","),
    APP_TOP_LEVEL_FILES: topLevelFiles().join(","),
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
