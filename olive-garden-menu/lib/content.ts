/**
 * Helper functions to read content. Pages, navigation, and (later) the
 * sitemap use these instead of importing content files directly.
 */
import { inventoryTotals, menuCategories, menuCategoryGroups } from "@/content/menu/categories";
import { menuProducts } from "@/content/menu/products";
import { menuOfferings } from "@/content/menu/offerings";
import { referenceLocations, referenceMarket } from "@/content/menu/locations";
import { aliasCases } from "@/content/menu/aliases";
import { createYourOwnPasta } from "@/content/menu/create-your-own-pasta";
import { categoryPages } from "@/content/menu/category-pages";
import { articles } from "@/content/articles";
import { validateMenuData } from "./menu-validation";
import { validateCategoryPages } from "./category-validation";
import { homepageFaqs } from "@/content/home/homepage";
import type {
  Article,
  ArticleCardData,
  CategoryPageContent,
  CreateYourOwnPasta,
  ImageRef,
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
  createYourOwnPasta,
  expected: inventoryTotals,
});

// A category page needs both a non-placeholder status and written content.
for (const category of menuCategories) {
  const hasContent = categoryPages.some((p) => p.categoryId === category.id);
  if (category.contentStatus !== "placeholder" && !hasContent) {
    menuIssues.push(`${category.id}: status is "${category.contentStatus}" but content/menu/category-pages.ts has no entry.`);
  }
}
for (const page of categoryPages) {
  if (categoryPages.filter((p) => p.categoryId === page.categoryId).length > 1) {
    menuIssues.push(`${page.categoryId}: more than one entry in content/menu/category-pages.ts.`);
  }
}

menuIssues.push(
  ...validateCategoryPages({
    pages: categoryPages,
    offerings: menuOfferings,
    products: menuProducts,
    homepageFaqs,
    pastaOptions: createYourOwnPasta.options,
  }),
);

if (menuIssues.length > 0) {
  throw new Error(`Menu data check failed:\n- ${menuIssues.join("\n- ")}`);
}

/* ---------- URLs (one place, so links never get out of sync) ---------- */

/**
 * The full menu lives on the homepage (owner decision 2026-11-13: /menu
 * permanently redirects to /, see next.config.ts). Links go straight to the
 * full-menu section so they never pass through the redirect.
 */
export const menuPath = "/#full-menu";

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

/** True when the category's page exists ("preview" or "published"). */
export function hasCategoryPage(category: Pick<MenuCategoryDef, "contentStatus">): boolean {
  return category.contentStatus !== "placeholder";
}

/** Categories that have their own page (linked; indexed only when "published"). */
export function getMenuCategoriesWithPages(): MenuCategoryDef[] {
  return getAllMenuCategories().filter(hasCategoryPage);
}

export function getCategoryPageContent(categoryId: MenuCategoryId): CategoryPageContent | undefined {
  return categoryPages.find((p) => p.categoryId === categoryId);
}

/**
 * Link to a category: its own page if it exists, otherwise its section on
 * the homepage full menu (so a link never leads to a 404).
 */
export function menuCategoryHref(category: Pick<MenuCategoryDef, "slug" | "contentStatus">): string {
  return hasCategoryPage(category) ? menuCategoryPath(category.slug) : `/#${category.slug}`;
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

/** Ids of all canonical products (used to load all ratings in one request). */
export function getAllMenuProductIds(): string[] {
  return menuProducts.map((p) => p.id);
}

export function getMenuProduct(productId: string): MenuProduct | undefined {
  return menuProducts.find((p) => p.id === productId);
}

/** Every offering of a product (e.g. regular, lunch, family-style, catering). */
export function getOfferingsForProduct(productId: string): MenuOffering[] {
  return menuOfferings.filter((o) => o.productId === productId);
}

export function getOffering(id: string): MenuOffering | undefined {
  return menuOfferings.find((o) => o.id === id);
}

/** Photo to show for an offering: its own photo, else the shared product photo (or null). */
export function getOfferingImage(offering: MenuOffering): ImageRef | null {
  return offering.image ?? getMenuProduct(offering.productId)?.image ?? null;
}

/** Create Your Own Pasta base price and the 23 official build options. */
export function getCreateYourOwnPasta(): CreateYourOwnPasta {
  return createYourOwnPasta;
}

/** Earliest and latest check dates of all verified values (for "checked on" notes). */
export function getMenuCheckDates(): { first: string; last: string } | null {
  const dates = menuOfferings
    .filter((o) => o.status === "verified")
    .flatMap((o) => [o.verifiedAt, ...o.prices.map((p) => p.checkedAt)])
    .filter((d): d is string => d !== null)
    .sort();
  if (dates.length === 0) return null;
  return { first: dates[0], last: dates[dates.length - 1] };
}

/** Latest check date of one category's verified values. */
export function getCategoryCheckDate(categoryId: MenuCategoryId): string | null {
  if (categoryId === "create-your-own-pasta") return createYourOwnPasta.checkedAt;
  return (
    getOfferingsForCategory(categoryId)
      .filter((o) => o.status === "verified")
      .flatMap((o) => o.prices.map((p) => p.checkedAt))
      .sort()
      .at(-1) ?? null
  );
}

export function getReferenceLocation(id: string): ReferenceLocation | undefined {
  return referenceLocations.find((l) => l.id === id);
}

/** "Orlando, FL": the approved price reference market. */
export function getReferenceMarketLabel(): string {
  return `${referenceMarket.city}, ${referenceMarket.state}`;
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
    productId: offering.productId,
    description: offering.description,
    price: price?.amount ?? null,
    calories: offering.status === "verified" ? offering.calories : null,
    caloriesMax: offering.status === "verified" ? offering.caloriesMax : null,
    status: offering.status,
    source: price?.sourceUrl ?? price?.sourceNote ?? offering.caloriesSourceUrl,
    location: location ? `${location.city}, ${location.state}` : null,
    lastChecked: price?.checkedAt ?? offering.verifiedAt,
    notListed: offering.availability === "not-listed",
    servingSize: offering.status === "verified" ? offering.servingSize : null,
    caloriesBasis: offering.status === "verified" && offering.calories !== null ? offering.caloriesBasis : null,
    priceNote: offering.priceNote,
    caloriesNote: offering.caloriesNote,
    caloriesValueBasis: offering.status === "verified" ? offering.caloriesValueBasis : null,
    caloriesFormula: offering.status === "verified" ? offering.caloriesFormula : null,
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
