import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getCategoryCheckDate, getMenuCategoriesWithPages, getMenuCheckDates, menuCategoryPath } from "@/lib/content";
import { infoPagePath, infoPages } from "@/content/site/info-pages";
import { getPublishedGuides, guidePath } from "@/content/guides";
import { getGuideCheckDate } from "@/lib/category-data";
import { getLiveProductPages, getProductPageData, productPath } from "@/lib/product-pages";
import { nutritionCalculatorPage, toolPath } from "@/content/tools/nutrition-calculator";
import { getCalculatorData } from "@/lib/calculator-data";

/**
 * /sitemap.xml (docs/SEO_ARCHITECTURE.md §4): only indexable, canonical
 * pages: the homepage (the primary full-menu page), PUBLISHED category
 * pages, published guides (/dinner-menu), and published information pages (About, Contact). Never /menu, previews, placeholders, /design-preview, or the API.
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
  const guides = getPublishedGuides().map((guide) => {
    const checked = getGuideCheckDate(guide);
    return { url: `${siteConfig.url}${guidePath(guide)}`, lastModified: checked && checked > guide.contentReviewedAt ? checked : guide.contentReviewedAt };
  });
  // Menu item pages: only owner-approved ("published") ones, never previews.
  const items = getLiveProductPages()
    .filter((page) => page.status === "published")
    .map((page) => {
      const { lastChecked } = getProductPageData(page);
      return { url: `${siteConfig.url}${productPath(page.slug)}`, lastModified: page.contentReviewedAt > lastChecked ? page.contentReviewedAt : lastChecked };
    });
  // Nutrition Calculator: only once the owner has approved it ("published"), never as a preview.
  const tools =
    nutritionCalculatorPage.status === "published"
      ? [(() => {
          const checked = getCalculatorData().lastChecked;
          const reviewed = nutritionCalculatorPage.contentReviewedAt;
          return { url: `${siteConfig.url}${toolPath(nutritionCalculatorPage)}`, lastModified: checked && checked > reviewed ? checked : reviewed };
        })()]
      : [];
  return [home, ...categories, ...guides, ...items, ...tools, ...info];
}
