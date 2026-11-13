import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/**
 * /robots.txt (docs/SEO_ARCHITECTURE.md §4). Crawling is allowed (pages,
 * CSS, JavaScript, images) so crawlers can see each page's robots meta tag.
 * Only the JSON API is excluded. The sitemap is announced only once
 * indexing is switched on (SITE_INDEXING=true); until then every page is
 * noindex through its metadata.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    ...(siteConfig.indexingEnabled ? { sitemap: `${siteConfig.url}/sitemap.xml` } : {}),
  };
}
