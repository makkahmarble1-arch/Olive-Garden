/**
 * Individual menu item pages (/menu/[slug]): path helpers, data resolution
 * and the build-time content check. docs/product-pages/PRODUCT_PAGE_ARCHITECTURE.md.
 *
 * Single source of truth: prices, calories, serving sizes, images, the
 * category and the rating key come from the shared menu data
 * (content/menu/offerings, products.ts). content/menu/product-pages only adds
 * facts that exist nowhere else.
 */
import { isLiveProductPage, productPages } from "@/content/menu/product-pages";
import { productPageRegistry } from "@/content/menu/product-pages/registry";
import { getMenuCategory, getMenuProduct, getOffering, getOfferingImage, menuCategoryPath } from "./content";
import { resolveRelatedMenus } from "./category-data";
import { formatPrice } from "./format";
import { getAllergenMapping, getAllergensForRow, getNutritionForRow, getOfferingAllergens, getOfferingNutrition } from "./nutrition-data";
import type { MenuCategoryDef, MenuOffering, OfferingAllergens, OfferingNutrition, ProductChecklistKey, ProductPageContent, ProductVersion } from "./types";

export function productPath(slug: string): string {
  return `/menu/${slug}`;
}

/** Live page (preview or published) for this slug, or undefined (404). */
export function getLiveProductPage(slug: string): ProductPageContent | undefined {
  return productPages.find((p) => p.slug === slug && isLiveProductPage(p));
}

/** All live pages in this environment (search index; the sitemap uses the published ones). */
export function getLiveProductPages(): ProductPageContent[] {
  return productPages.filter(isLiveProductPage);
}

/** Non-draft pages (prerendered; a page that is not live renders the 404 page). */
export function getRenderableProductPages(): ProductPageContent[] {
  return productPages.filter((p) => p.status !== "draft");
}

/**
 * Detail page URL for a product, only when its page is live. Used by the menu
 * cards: never links to an unfinished page.
 */
export function productDetailHref(productId: string): string | null {
  const page =
    productPages.find((p) => p.productId === productId && isLiveProductPage(p)) ??
    // Same dish under another product record (catering tray, family pan...): link to the page that covers it.
    productPages.find((p) => isLiveProductPage(p) && (p.equivalentOfferingIds ?? []).some((id) => getOffering(id)?.productId === productId));
  return page ? productPath(page.slug) : null;
}

/* ---------- Resolved page data ---------- */

function requireOffering(id: string, where: string): MenuOffering {
  const offering = getOffering(id);
  if (!offering) throw new Error(`Product page ${where}: unknown offering "${id}".`);
  return offering;
}

/** A version with its resolved official rows (version-aware item pages). */
export type ResolvedProductVersion = ProductVersion & {
  nutrition: OfferingNutrition | undefined;
  allergens: OfferingAllergens | undefined;
};

/** Official rows of each version; the first version is the default shown in the hero and sections. */
export function resolveVersions(page: ProductPageContent): ResolvedProductVersion[] {
  return (page.versions ?? []).map((v) => ({
    ...v,
    nutrition: v.nutritionRowId ? getNutritionForRow(v.nutritionRowId) : undefined,
    allergens: v.allergenRowId ? getAllergensForRow(v.allergenRowId) : undefined,
  }));
}

export type ProductPageData = {
  page: ProductPageContent;
  primary: MenuOffering;
  category: MenuCategoryDef;
  price: number;
  calories: number;
  /** Latest real check of the shown prices/calories (ISO). */
  lastChecked: string;
  sizes: MenuOffering[];
  compare: MenuOffering[];
  pairings: { offering: MenuOffering; kind: string; reason: string; href: string; hrefLabel: string }[];
  related: MenuOffering[];
  extraSauce: MenuOffering | null;
  relatedMenus: { title: string; href: string; text: string }[];
  /** Central official rows of the primary offering (content/menu/nutrition/), when they describe exactly this item. */
  nutrition: OfferingNutrition | undefined;
  allergens: OfferingAllergens | undefined;
  /** Officially listed versions (empty for single-version items). The first one is the default. */
  versions: ResolvedProductVersion[];
};

export function getProductPageData(page: ProductPageContent): ProductPageData {
  const primary = requireOffering(page.primaryOfferingId, page.slug);
  const category = getMenuCategory(primary.categoryId);
  if (!category) throw new Error(`Product page ${page.slug}: unknown category.`);
  const versions = resolveVersions(page);
  const base = versions[0];
  const price = base ? base.price : primary.prices[0]?.amount;
  if (price === undefined || primary.calories === null) throw new Error(`Product page ${page.slug}: primary offering needs a verified price and calories.`);
  const sizes = [...(page.sizeOfferingIds ?? []), ...(page.equivalentOfferingIds ?? [])].map((id) => requireOffering(id, page.slug));
  const dates = [primary, ...sizes]
    .flatMap((o) => [o.verifiedAt, ...o.prices.map((p) => p.checkedAt)])
    .filter((d): d is string => d !== null)
    .sort();

  return {
    page,
    primary,
    category,
    price,
    calories: base ? base.calories : primary.calories,
    lastChecked: dates[dates.length - 1],
    sizes,
    compare: (page.compareOfferingIds ?? []).map((id) => requireOffering(id, page.slug)),
    pairings: page.pairings.map(({ offeringId, kind, reason }) => {
      const offering = requireOffering(offeringId, page.slug);
      const detail = productDetailHref(offering.productId);
      const cat = getMenuCategory(offering.categoryId);
      return {
        offering,
        kind,
        reason,
        href: detail ?? menuCategoryPath(offering.categoryId),
        hrefLabel: detail ? "View details" : `See ${cat?.name ?? "menu"}`,
      };
    }),
    related: page.relatedOfferingIds.map((id) => requireOffering(id, page.slug)),
    extraSauce: page.extraSauceOfferingId ? requireOffering(page.extraSauceOfferingId, page.slug) : null,
    relatedMenus: resolveRelatedMenus(page.related, { path: productPath(page.slug), isPreview: page.status !== "published" }),
    nutrition: base ? base.nutrition : getOfferingNutrition(primary.id),
    allergens: base ? base.allergens : getOfferingAllergens(primary.id),
    versions,
  };
}

/* ---------- Content check (runs on every dev start and build) ---------- */

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CHECKLIST_KEYS: ProductChecklistKey[] = [
  "verifiedProductInfo",
  "uniqueSearchIntent",
  "nutritionAndAllergens",
  "originalContent",
  "accurateImage",
  "internalLinks",
  "visualReview",
];

function richTextToString(value: ProductPageContent["about"]["paragraphs"][number]): string {
  return typeof value === "string" ? value : value.map((part) => (typeof part === "string" ? part : part.text)).join("");
}

export function validateProductPages(pages: readonly ProductPageContent[]): string[] {
  const issues: string[] = [];
  for (const page of pages) {
    const at = `product page "${page.slug}"`;
    if (!SLUG.test(page.slug)) issues.push(`${at}: slug must be lowercase-hyphenated.`);
    if (pages.filter((p) => p.slug === page.slug).length > 1) issues.push(`${at}: duplicate slug.`);
    if (pages.filter((p) => p.productId === page.productId).length > 1) issues.push(`${at}: more than one page for product "${page.productId}".`);
    if (!getMenuProduct(page.productId)) issues.push(`${at}: unknown product "${page.productId}".`);

    const primary = getOffering(page.primaryOfferingId);
    if (!primary) {
      issues.push(`${at}: unknown primary offering "${page.primaryOfferingId}".`);
      continue;
    }
    if (primary.productId !== page.productId) issues.push(`${at}: primary offering belongs to another product.`);
    if (primary.status !== "verified" || primary.prices.length === 0 || primary.calories === null) {
      issues.push(`${at}: primary offering needs a verified price and calories.`);
    }
    if (!getOfferingImage(primary)) issues.push(`${at}: primary offering needs an approved photo.`);

    for (const id of page.sizeOfferingIds ?? []) {
      const o = getOffering(id);
      if (!o || o.productId !== page.productId) issues.push(`${at}: size "${id}" must be an offering of the same product.`);
    }
    for (const id of page.equivalentOfferingIds ?? []) {
      const o = getOffering(id);
      if (!o) issues.push(`${at}: unknown equivalent offering "${id}".`);
      else if (o.productId === page.productId) issues.push(`${at}: equivalent "${id}" belongs to the page's own product (use sizeOfferingIds).`);
      else if (pages.some((p) => p.productId === o.productId)) issues.push(`${at}: equivalent "${id}" already has its own page.`);
    }
    for (const c of page.components ?? []) {
      if (c.offeringId && !getOffering(c.offeringId)) issues.push(`${at}: component "${c.label}" has unknown offering "${c.offeringId}".`);
    }
    if (!getOfferingNutrition(page.primaryOfferingId) && !page.versions && !page.nutritionUnavailableNote) {
      issues.push(`${at}: no official nutrition row; add nutritionUnavailableNote (disclosure).`);
    }
    if (!getOfferingAllergens(page.primaryOfferingId) && !page.versions && !page.allergenUnavailableNote && getAllergenMapping(page.primaryOfferingId)?.status !== "not-covered") {
      issues.push(`${at}: no official allergen row; add allergenUnavailableNote (disclosure).`);
    }
    if (page.allergenUnavailableNote && /allergen[- ]free|safe for/i.test(page.allergenUnavailableNote.replace(/not mean[^.]*allergen-free/i, ""))) {
      issues.push(`${at}: allergen note must not imply allergen safety.`);
    }
    for (const id of [...page.relatedOfferingIds, ...page.pairings.map((p) => p.offeringId)]) {
      const o = getOffering(id);
      if (!o) issues.push(`${at}: unknown offering "${id}".`);
      else if (o.productId === page.productId) issues.push(`${at}: "${id}" is the page's own product.`);
      else if (!getOfferingImage(o)) issues.push(`${at}: "${id}" has no approved photo.`);
      else if (o.status !== "verified") issues.push(`${at}: "${id}" is not verified.`);
    }
    for (const id of [...(page.compareOfferingIds ?? []), ...(page.extraSauceOfferingId ? [page.extraSauceOfferingId] : [])]) {
      if (!getOffering(id)) issues.push(`${at}: unknown offering "${id}".`);
    }
    if (page.relatedOfferingIds.length < 3 || page.relatedOfferingIds.length > 4) issues.push(`${at}: list 3-4 related items.`);
    if (page.related.length !== 4) issues.push(`${at}: Related Menus must list exactly 4 pages.`);
    if (page.faqs.length < 3) issues.push(`${at}: at least 3 FAQs.`);

    const sourceUrls = page.sources.map((s) => s.url);
    for (const s of [page.officialSource, page.extraSource]) {
      if (s && !sourceUrls.includes(s.url)) issues.push(`${at}: public source "${s.label}" must be listed in sources.`);
    }

    // Publishing (owner decision 2026-11-15) needs: owner approval date, a
    // complete checklist (visual review included), and the official
    // nutrition and allergen rows for the primary offering.
    // Version-aware pages (Phase 4): every version needs its own official rows,
    // and its price and calories must match the shared offering data.
    const versions = resolveVersions(page);
    const offeringPrices = new Set([...primary.prices.map((p) => p.amount), ...primary.options.flatMap((x) => (x.price !== null ? [x.price] : []))]);
    const offeringCalories = new Set([primary.calories, primary.caloriesMax, ...primary.options.map((x) => x.calories)].filter((c): c is number => c !== null));
    if (page.versions) {
      if (versions.length < 2) issues.push(`${at}: a version selector needs at least two versions.`);
      const keys = new Set<string>();
      for (const v of versions) {
        const vat = `${at} version "${v.key}"`;
        if (!SLUG.test(v.key) || keys.has(v.key)) issues.push(`${vat}: key must be unique and lowercase-hyphenated.`);
        keys.add(v.key);
        if (!offeringPrices.has(v.price)) issues.push(`${vat}: price ${formatPrice(v.price)} is not a current price of the offering.`);
        if (!offeringCalories.has(v.calories)) issues.push(`${vat}: ${v.calories} calories do not match the offering data.`);
        if (v.nutritionRowId && !v.nutrition) issues.push(`${vat}: unknown nutrition row "${v.nutritionRowId}".`);
        if (v.nutrition && v.nutrition.row.values.calories !== v.calories) {
          issues.push(`${vat}: official row "${v.nutrition.row.id}" has ${v.nutrition.row.values.calories} calories, not ${v.calories}.`);
        }
        if (v.allergenRowId && !v.allergens) issues.push(`${vat}: unknown allergen row "${v.allergenRowId}".`);
      }
    }
    const hasOfficialRecords = page.versions
      ? versions.length > 0 && versions.every((v) => v.nutrition && v.allergens)
      : Boolean(getOfferingNutrition(page.primaryOfferingId) && getOfferingAllergens(page.primaryOfferingId));

    if (page.status === "published") {
      if (!page.ownerApprovedAt) issues.push(`${at}: set ownerApprovedAt before publishing.`);
      // A not-"done" item is allowed only when the owner explicitly accepted that disclosed gap.
      const accepted = new Set(page.acceptedGaps?.checklistKeys ?? []);
      for (const key of CHECKLIST_KEYS) {
        if (page.checklist[key] !== "done" && !(accepted.has(key) && key !== "visualReview")) {
          issues.push(`${at}: checklist "${key}" is "${page.checklist[key]}"; publishing needs "done" or an owner-accepted gap.`);
        }
      }
      if (!hasOfficialRecords && !accepted.has("nutritionAndAllergens")) {
        issues.push(`${at}: no official nutrition and allergen records for every version (content/menu/nutrition/).`);
      }
    }
    if (page.acceptedGaps && (!/^\d{4}-\d{2}-\d{2}$/.test(page.acceptedGaps.decidedAt) || page.acceptedGaps.checklistKeys.length === 0)) {
      issues.push(`${at}: acceptedGaps needs a decision date and at least one checklist key.`);
    }
    if (page.checklist.nutritionAndAllergens === "done" && !hasOfficialRecords) {
      issues.push(`${at}: checklist "nutritionAndAllergens" can be "done" only when both official records exist.`);
    }

    // Included sauces: calories typed in `includes` must equal the official "add ..." row.
    const nut = page.versions ? versions[0]?.nutrition : getOfferingNutrition(page.primaryOfferingId);
    for (const inc of page.includes) {
      if (inc.calories === null || !nut) continue;
      const word = inc.label.toLowerCase().replace(/ sauce$/, "");
      const addOn = nut.addOns.find((a) => a.label.toLowerCase().includes(word));
      if (addOn && addOn.values.calories !== inc.calories) {
        issues.push(`${at}: "${inc.label}" shows ${inc.calories} calories but the official row "${addOn.id}" says ${addOn.values.calories}.`);
      }
    }

    // Nutrient numbers in FAQs/text ("49 g fat", "1,990 mg sodium") must match the official row.
    if (nut) {
      const text = [page.summary, ...page.about.paragraphs.map(richTextToString), ...page.faqs.map((f) => f.answer)].join(" ");
      const checks: [RegExp, number | { lessThan: number } | null][] = [
        [/([\d,]+(?:\.\d+)?) g (?:of )?fat/g, nut.row.values.totalFat],
        [/([\d,]+(?:\.\d+)?) mg (?:of )?sodium/g, nut.row.values.sodium],
        [/([\d,]+(?:\.\d+)?) g (?:of )?protein/g, nut.row.values.protein],
        [/([\d,]+(?:\.\d+)?) g (?:of )?carbohydrates/g, nut.row.values.totalCarbohydrates],
      ];
      // On version pages a number may belong to any version's official row.
      const keyOf = ["totalFat", "sodium", "protein", "totalCarbohydrates"] as const;
      for (const [i, [re, value]] of checks.entries()) {
        const allowed = new Set([
          ...(typeof value === "number" ? [value] : []),
          ...versions.flatMap((v) => {
            const x = v.nutrition?.row.values[keyOf[i]];
            return typeof x === "number" ? [x] : [];
          }),
        ]);
        for (const m of text.matchAll(re)) {
          if (!allowed.has(Number(m[1].replace(/,/g, "")))) {
            issues.push(`${at}: text says "${m[0]}" but the official row "${nut.row.id}" says ${JSON.stringify(value)}.`);
          }
        }
      }
    }

    // Prose prices must match the shared data (no stale numbers).
    const allowedPrices = new Set(
      [page.primaryOfferingId, ...(page.sizeOfferingIds ?? []), ...(page.extraSauceOfferingId ? [page.extraSauceOfferingId] : [])]
        .flatMap((id) => {
          const o = getOffering(id);
          // Current prices of the offering and of its size options (e.g. 6 or 12 breadsticks).
          return [...(o?.prices.map((p) => formatPrice(p.amount)) ?? []), ...(o?.options.flatMap((x) => (x.price !== null ? [formatPrice(x.price)] : [])) ?? [])];
        }),
    );
    const prose = [
      page.metaDescription,
      page.summary,
      ...page.about.paragraphs.map(richTextToString),
      ...page.faqs.map((f) => f.answer),
    ].join(" ");
    for (const amount of prose.match(/\$\d+(?:\.\d{2})?/g) ?? []) {
      if (!allowedPrices.has(amount)) issues.push(`${at}: text mentions ${amount}, which is not a current price of this item.`);
    }
    const price = primary.prices[0] ? formatPrice(primary.prices[0].amount) : null;
    if (price && !page.metaDescription.includes(price)) issues.push(`${at}: meta description must show the current price ${price}.`);
    if (primary.calories !== null && !page.metaDescription.includes(`${primary.calories.toLocaleString("en-US")} calories`)) {
      issues.push(`${at}: meta description must show the current calories.`);
    }
  }
  return issues;
}

const productIssues = validateProductPages(productPages);
// The light registry (status, read by proxy.ts) and the page list must match exactly.
for (const slug of Object.keys(productPageRegistry)) {
  if (!productPages.some((p) => p.slug === slug)) productIssues.push(`registry: "${slug}" has no page content.`);
}
for (const p of productPages) {
  if (!(p.slug in productPageRegistry)) productIssues.push(`product page "${p.slug}": missing in content/menu/product-pages/registry.ts.`);
}
if (productIssues.length > 0) {
  throw new Error(`Product page check failed:\n- ${productIssues.join("\n- ")}`);
}
