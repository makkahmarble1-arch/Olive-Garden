/**
 * Basic checks for the menu data (no extra packages).
 * lib/content.ts runs these when it loads, so `npm run dev` and
 * `npm run build` stop with a clear message if the data is broken.
 */
import type {
  AliasCase,
  MenuCategoryDef,
  MenuCategoryGroup,
  MenuOffering,
  MenuProduct,
  ReferenceLocation,
} from "./types";

export type MenuData = {
  categories: MenuCategoryDef[];
  groups: MenuCategoryGroup[];
  products: MenuProduct[];
  offerings: MenuOffering[];
  locations: ReferenceLocation[];
  aliasCases: AliasCase[];
  expected: { categories: number; placements: number };
};

/** Top-level routes that a category slug must never take over. */
const RESERVED_SLUGS = [
  "menu",
  "blog",
  "about",
  "contact",
  "disclaimer",
  "privacy-policy",
  "design-preview",
  "images",
  "api",
];

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function findDuplicates(values: string[]): string[] {
  const seen = new Set<string>();
  const dupes = new Set<string>();
  for (const v of values) (seen.has(v) ? dupes : seen).add(v);
  return [...dupes];
}

function isHttpsUrl(value: string | null): boolean {
  return value !== null && /^https:\/\/\S+$/.test(value);
}

/** Returns a list of problems. An empty list means the data is valid. */
export function validateMenuData(data: MenuData): string[] {
  const issues: string[] = [];
  const { categories, groups, products, offerings, locations, aliasCases, expected } = data;

  /* ---------- Categories ---------- */
  if (categories.length !== expected.categories) {
    issues.push(`Expected ${expected.categories} categories, found ${categories.length}.`);
  }
  for (const d of findDuplicates(categories.map((c) => c.id))) issues.push(`Duplicate category id "${d}".`);
  for (const d of findDuplicates(categories.map((c) => c.slug))) issues.push(`Duplicate category slug "${d}".`);
  for (const d of findDuplicates(categories.map((c) => String(c.inventoryOrder)))) {
    issues.push(`Duplicate category inventoryOrder ${d}.`);
  }
  for (const c of categories) {
    if (!SLUG_PATTERN.test(c.slug)) issues.push(`Category "${c.id}": slug "${c.slug}" is not lowercase-hyphenated.`);
    if (RESERVED_SLUGS.includes(c.slug)) issues.push(`Category "${c.id}": slug "${c.slug}" is a reserved route.`);
    if (c.updatedAt !== null && !ISO_DATE.test(c.updatedAt)) issues.push(`Category "${c.id}": updatedAt must be YYYY-MM-DD.`);
    if (c.image && (!c.image.src.startsWith("/images/") || !c.image.alt.trim())) {
      issues.push(`Category "${c.id}": image src must start with /images/ and needs alt text.`);
    }
  }

  /* ---------- Groups (/menu hub) ---------- */
  const categoryIds = new Set<string>(categories.map((c) => c.id));
  const grouped = groups.flatMap((g) => g.categoryIds);
  for (const d of findDuplicates(grouped)) issues.push(`Category "${d}" is in more than one /menu group.`);
  for (const id of grouped) if (!categoryIds.has(id)) issues.push(`Group lists unknown category "${id}".`);
  for (const c of categories) if (!grouped.includes(c.id)) issues.push(`Category "${c.id}" is not in any /menu group.`);

  /* ---------- Offerings ---------- */
  if (offerings.length !== expected.placements) {
    issues.push(`Expected ${expected.placements} offerings (inventory placements), found ${offerings.length}.`);
  }
  for (const d of findDuplicates(offerings.map((o) => o.id))) issues.push(`Duplicate offering id "${d}".`);

  const productIds = new Set(products.map((p) => p.id));
  const locationIds = new Set(locations.map((l) => l.id));

  for (const c of categories) {
    const own = offerings.filter((o) => o.categoryId === c.id);
    if (own.length !== c.inventoryItemCount) {
      issues.push(`Category "${c.id}": inventory lists ${c.inventoryItemCount} entries, data has ${own.length}.`);
    }
  }

  for (const o of offerings) {
    const where = `Offering "${o.id}"`;
    if (!categoryIds.has(o.categoryId)) issues.push(`${where}: unknown category "${o.categoryId}".`);
    if (!productIds.has(o.productId)) issues.push(`${where}: unknown product "${o.productId}".`);
    if (!o.inventoryName.trim() || !o.displayName.trim()) issues.push(`${where}: names must not be empty.`);

    const hasValues = o.prices.length > 0 || o.calories !== null || o.caloriesMax !== null;

    if (o.status !== "verified" && hasValues) {
      issues.push(`${where}: has price/calorie values but status is "${o.status}". Only verified values may be stored.`);
    }

    if (o.status === "verified") {
      if (!hasValues) issues.push(`${where}: "verified" but has no price or calories.`);
      if (o.verifiedAt === null) issues.push(`${where}: "verified" needs verifiedAt.`);
    }
    if (o.verifiedAt !== null && !ISO_DATE.test(o.verifiedAt)) issues.push(`${where}: verifiedAt must be YYYY-MM-DD.`);

    for (const p of o.prices) {
      if (!(p.amount > 0)) issues.push(`${where}: price amount must be greater than 0.`);
      if (!locationIds.has(p.locationId)) {
        issues.push(`${where}: price location "${p.locationId}" is not an approved reference location.`);
      }
      if (!ISO_DATE.test(p.checkedAt)) issues.push(`${where}: price checkedAt must be YYYY-MM-DD.`);
      if (p.sourceUrl !== null && !isHttpsUrl(p.sourceUrl)) issues.push(`${where}: price sourceUrl must be an https URL.`);
      if (p.sourceUrl === null && !p.sourceNote?.trim()) issues.push(`${where}: price needs a sourceUrl or a sourceNote.`);
    }

    if (o.calories !== null) {
      if (!Number.isInteger(o.calories) || o.calories < 0) issues.push(`${where}: calories must be a whole number ≥ 0.`);
      if (!isHttpsUrl(o.caloriesSourceUrl)) issues.push(`${where}: calories need an https caloriesSourceUrl.`);
    }
    if (o.caloriesMax !== null && (o.calories === null || o.caloriesMax < o.calories)) {
      issues.push(`${where}: caloriesMax needs calories and must be ≥ calories.`);
    }

    if (o.image) {
      if (!o.image.src.startsWith("/images/")) issues.push(`${where}: image src must start with /images/.`);
      if (!o.image.alt.trim()) issues.push(`${where}: image needs alt text.`);
    }
  }

  /* ---------- Products ---------- */
  for (const d of findDuplicates(products.map((p) => p.id))) issues.push(`Duplicate product id "${d}".`);
  const usedProducts = new Set(offerings.map((o) => o.productId));
  for (const p of products) {
    if (!SLUG_PATTERN.test(p.id)) issues.push(`Product "${p.id}": id is not lowercase-hyphenated.`);
    if (!usedProducts.has(p.id)) issues.push(`Product "${p.id}" is not used by any offering.`);
    if (p.image && !p.image.src.startsWith("/images/")) issues.push(`Product "${p.id}": image src must start with /images/.`);
  }

  /* ---------- Reference locations ---------- */
  for (const d of findDuplicates(locations.map((l) => l.id))) issues.push(`Duplicate location id "${d}".`);
  for (const l of locations) {
    if (!isHttpsUrl(l.officialUrl)) issues.push(`Location "${l.id}": officialUrl must be an https URL.`);
    if (!ISO_DATE.test(l.approvedAt)) issues.push(`Location "${l.id}": approvedAt must be YYYY-MM-DD.`);
  }

  /* ---------- Alias cases ---------- */
  const offeringIds = new Set(offerings.map((o) => o.id));
  for (const d of findDuplicates(aliasCases.map((a) => a.id))) issues.push(`Duplicate alias case "${d}".`);
  for (const a of aliasCases) {
    for (const id of a.offeringIds) {
      if (!offeringIds.has(id)) issues.push(`Alias case ${a.id}: unknown offering "${id}".`);
    }
  }

  return issues;
}
