/**
 * Helper functions to read content. Pages, navigation, and (later) the
 * sitemap use these instead of importing content files directly.
 */
import { inventoryTotals, menuCategories, menuCategoryGroups } from "@/content/menu/categories";
import { menuProducts } from "@/content/menu/products";
import { menuOfferings } from "@/content/menu/offerings";
import { referenceLocations } from "@/content/menu/locations";
import { aliasCases } from "@/content/menu/aliases";
import { articles } from "@/content/articles";
import { validateMenuData } from "./menu-validation";
import type {
  Article,
  ArticleCardData,
  MenuCategoryDef,
  MenuCategoryId,
  MenuItem,
  MenuOffering,
  MenuProduct,
  ReferenceLocation,
} from "./types";

/* ---------- Menu data check (stops dev/build if the data is broken) ---------- */

const menuIssues = validateMenuData({
  categories: menuCategories,
  groups: menuCategoryGroups,
  products: menuProducts,
  offerings: menuOfferings,
  locations: referenceLocations,
  aliasCases,
  expected: inventoryTotals,
});

if (menuIssues.length > 0) {
  throw new Error(`Menu data check failed:\n- ${menuIssues.join("\n- ")}`);
}

/* ---------- URLs (one place, so links never get out of sync) ---------- */

/** Main menu hub. */
export const menuPath = "/menu";

/** Category pages use the approved root-level URLs, e.g. /desserts. */
export function menuCategoryPath(slug: string): string {
  return `/${slug}`;
}

export function articlePath(slug: string): string {
  return `/blog/${slug}`;
}

/* ---------- Menu categories ---------- */

/** All 17 categories in inventory order, including placeholders. */
export function getAllMenuCategories(): MenuCategoryDef[] {
  return [...menuCategories].sort((a, b) => a.inventoryOrder - b.inventoryOrder);
}

/** Only categories with approved content and their own page. */
export function getPublishedMenuCategories(): MenuCategoryDef[] {
  return getAllMenuCategories().filter((c) => c.contentStatus === "published");
}

/** The small selection shown on the homepage (the full list lives on /menu). */
export function getFeaturedMenuCategories(): MenuCategoryDef[] {
  return getAllMenuCategories().filter((c) => c.featuredOnHomepage);
}

export function getMenuCategory(slug: string): MenuCategoryDef | undefined {
  return menuCategories.find((c) => c.slug === slug);
}

/** /menu hub groups, with their categories resolved. */
export function getMenuCategoryGroups(): {
  id: string;
  heading: string;
  categories: MenuCategoryDef[];
}[] {
  return menuCategoryGroups.map((group) => ({
    id: group.id,
    heading: group.heading,
    categories: group.categoryIds
      .map((id) => menuCategories.find((c) => c.id === id))
      .filter((c): c is MenuCategoryDef => c !== undefined),
  }));
}

/** Heading of the /menu group a category belongs to (used as a card label). */
export function getMenuCategoryGroupHeading(categoryId: MenuCategoryId): string | undefined {
  return menuCategoryGroups.find((g) => g.categoryIds.includes(categoryId))?.heading;
}

/* ---------- Menu offerings and products ---------- */

/** Offerings of one category, in inventory order. */
export function getOfferingsForCategory(categoryId: MenuCategoryId): MenuOffering[] {
  return menuOfferings
    .filter((o) => o.categoryId === categoryId)
    .sort((a, b) => a.inventoryOrder - b.inventoryOrder);
}

export function getMenuProduct(productId: string): MenuProduct | undefined {
  return menuProducts.find((p) => p.id === productId);
}

/** Every offering of a product (e.g. regular, lunch, family-style, catering). */
export function getOfferingsForProduct(productId: string): MenuOffering[] {
  return menuOfferings.filter((o) => o.productId === productId);
}

export function getReferenceLocation(id: string): ReferenceLocation | undefined {
  return referenceLocations.find((l) => l.id === id);
}

/**
 * Converts an offering into a `MenuTable` row. Uses the first price
 * observation (the reference location). Unverified values stay null,
 * so the table shows "Not verified yet".
 */
export function toMenuTableItem(offering: MenuOffering): MenuItem {
  const price = offering.status === "verified" ? (offering.prices[0] ?? null) : null;
  const location = price ? getReferenceLocation(price.locationId) : undefined;

  return {
    name: offering.displayName,
    description: offering.description,
    price: price?.amount ?? null,
    calories: offering.status === "verified" ? offering.calories : null,
    status: offering.status,
    source: price?.sourceUrl ?? price?.sourceNote ?? offering.caloriesSourceUrl,
    location: location ? `${location.city}, ${location.state}` : null,
    lastChecked: price?.checkedAt ?? offering.verifiedAt,
  };
}

/* ---------- Articles ---------- */

export function getPublishedArticles(): Article[] {
  return articles
    .filter((a) => a.contentStatus === "published")
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function toArticleCard(article: Article): ArticleCardData {
  return {
    title: article.title,
    description: article.description,
    href: articlePath(article.slug),
    date: article.updatedAt ?? article.publishedAt,
  };
}

/** Published articles listed in `relatedSlugs`, as card data. */
export function getRelatedArticleCards(article: Article): ArticleCardData[] {
  return article.relatedSlugs
    .map((slug) => getArticle(slug))
    .filter((a): a is Article => a?.contentStatus === "published")
    .map(toArticleCard);
}
