import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getCategoryCheckDate, getMenuCategoriesWithPages, getMenuCheckDates, menuCategoryPath } from "@/lib/content";
import { infoPagePath, infoPages } from "@/content/site/info-pages";

/**
 * /sitemap.xml (docs/SEO_ARCHITECTURE.md §4): only indexable, canonical
 * pages: the homepage (the primary full-menu page), PUBLISHED category
 * pages, and published information pages (About, Contact). Never /menu, previews, placeholders, /design-preview, or the API.
 * lastModified = the real date the prices were last checked.
 * Empty while indexing is switched off.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.indexingEnabled) return [];

  const home: MetadataRoute.Sitemap[number] = {
    url: `${siteConfig.url}/`,
    lastModified: getMenuCheckDates()?.last,
  };
  const categories = getMenuCategoriesWithPages()
    .filter((category) => category.contentStatus === "published")
    .map((category) => ({
      url: `${siteConfig.url}${menuCategoryPath(category.slug)}`,
      lastModified: getCategoryCheckDate(category.id) ?? undefined,
    }));
  // About / Contact: only once they are complete ("published").
  const info = Object.values(infoPages)
    .filter((page) => page.status === "published")
    .map((page) => ({ url: `${siteConfig.url}${infoPagePath(page)}`, lastModified: page.updatedAt }));
  return [home, ...categories, ...info];
}
