import { NextResponse, type NextRequest } from "next/server";
import { menuCategories } from "@/content/menu/categories";
import { liveProductSlugs } from "@/content/menu/product-pages/registry";

/**
 * Real HTTP 404 for unknown one-segment URLs (owner approval 2026-11-14,
 * docs/seo/SEO_FIX_LIST.md P3-6; tightened in Lesson 8.6).
 *
 * Why: every one-segment URL (e.g. /abc, /.env, /api) matches app/[category].
 * With Cache Components the page shell is streamed first, so the status is
 * already 200 when the page calls notFound(). This proxy decides BEFORE
 * rendering.
 *
 * A one-segment URL is allowed when it is:
 *   - a category with a page (contentStatus "preview" or "published"; the
 *     same data and rule as app/[category]/page.tsx, no copied list),
 *   - a top-level app/ folder with a page or route file (APP_TOP_LEVEL_ROUTES),
 *   - a real top-level file: public/ files and app/ metadata files such as
 *     robots.txt, sitemap.xml, favicon.ico (APP_TOP_LEVEL_FILES), or
 *   - a Next.js internal path (starts with "_", e.g. dev-only "__nextjs_*").
 * Both lists are read from the file system in next.config.ts at build time
 * (and when `next dev` starts). Anything else is rewritten to an unmatched
 * internal path, so Next.js serves its normal 404 page with HTTP 404 while
 * the address bar keeps the requested URL. No database access.
 *
 * The matcher only runs this for one-segment paths. Deeper paths
 * (/images/..., /_next/..., /api/...) never reach it; unknown deeper URLs
 * already get a real 404 from the router because no nested route matches.
 */
const list = (value: string | undefined) => (value ?? "").split(",").filter(Boolean);

const KNOWN_SEGMENTS = new Set<string>([
  ...menuCategories.filter((c) => c.contentStatus !== "placeholder").map((c) => c.slug),
  ...list(process.env.APP_TOP_LEVEL_ROUTES),
  ...list(process.env.APP_TOP_LEVEL_FILES),
]);

/** Internal path that matches no route (two segments, so not app/[category]). */
const NOT_FOUND_PATH = "/_not-found-page/404";

/**
 * Menu item pages (app/menu/[slug], 2026-11-15): only live product pages
 * (status "preview" or "published" in content/menu/product-pages) exist.
 * Any other /menu/<slug> gets the same real HTTP 404. "/menu" itself is
 * redirected to "/" by next.config.ts before this proxy runs.
 */
const PRODUCT_SLUGS = new Set<string>(liveProductSlugs);
const MENU_ITEM = /^\/menu\/([^/]+)$/;

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const item = MENU_ITEM.exec(path);
  if (item) {
    return PRODUCT_SLUGS.has(item[1]) ? NextResponse.next() : NextResponse.rewrite(new URL(NOT_FOUND_PATH, request.url));
  }
  const segment = path.slice(1);
  if (segment.startsWith("_") || KNOWN_SEGMENTS.has(segment)) return NextResponse.next();
  return NextResponse.rewrite(new URL(NOT_FOUND_PATH, request.url));
}

export const config = {
  // One-segment paths, plus /menu/<slug> (menu item pages). "/" and other deeper paths are not matched.
  matcher: ["/:segment", "/menu/:slug"],
};
