import { NextResponse, type NextRequest } from "next/server";
import { menuCategories } from "@/content/menu/categories";

/**
 * Real HTTP 404 for unknown one-segment URLs (owner approval 2026-11-14,
 * docs/seo/SEO_FIX_LIST.md P3-6).
 *
 * Why: every one-segment URL (e.g. /abc) matches app/[category]. With Cache
 * Components the page shell is streamed first, so the status is already 200
 * when the page calls notFound(). This proxy decides BEFORE rendering.
 *
 * A one-segment URL is allowed when it is:
 *   - a category with a page (contentStatus "preview" or "published"; the
 *     same data and rule as app/[category]/page.tsx, no copied list), or
 *   - a top-level folder in app/ (APP_TOP_LEVEL_ROUTES, read from the file
 *     system at build time in next.config.ts), or
 *   - a file name with a dot (robots.txt, sitemap.xml, favicon.ico, ...).
 * Anything else is rewritten to an unmatched internal path, so Next.js
 * serves its normal 404 page with HTTP 404 while the address bar keeps the
 * requested URL. No database access; nothing else is changed.
 *
 * The matcher only runs this for one-segment paths. Deeper paths
 * (/images/..., /_next/..., /api/...) never reach it; unknown deeper URLs
 * already get a real 404 from the router because no nested route matches.
 */
const KNOWN_SEGMENTS = new Set<string>([
  ...menuCategories.filter((c) => c.contentStatus !== "placeholder").map((c) => c.slug),
  ...(process.env.APP_TOP_LEVEL_ROUTES ?? "").split(",").filter(Boolean),
]);

/** Internal path that matches no route (two segments, so not app/[category]). */
const NOT_FOUND_PATH = "/_not-found-page/404";

export function proxy(request: NextRequest) {
  const segment = request.nextUrl.pathname.slice(1);
  if (segment.includes(".") || KNOWN_SEGMENTS.has(segment)) return NextResponse.next();
  return NextResponse.rewrite(new URL(NOT_FOUND_PATH, request.url));
}

export const config = {
  // Exactly one path segment ("/" itself and deeper paths are not matched).
  matcher: "/:segment",
};
