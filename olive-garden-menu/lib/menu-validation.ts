/**
 * Basic checks for the menu data (no extra packages).
 * lib/content.ts runs these when it loads, so `npm run dev` and
 * `npm run build` stop with a clear message if the data is broken.
 */
import type {
  AliasCase,
  CreateYourOwnPasta,
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
  createYourOwnPasta: CreateYourOwnPasta;
  /** placements = owner inventory entries; newOfficialItems = approved additions. */
  expected: { categories: number; placements: number; newOfficialItems: number };
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
  const { categories, groups, products, offerings, locations, aliasCases, createYourOwnPasta, expected } = data;

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
  const inventoryEntries = offerings.filter((o) => !o.isNewOfficialItem);
  if (inventoryEntries.length !== expected.placements) {
    issues.push(`Expected ${expected.placements} inventory entries, found ${inventoryEntries.length}.`);
  }
  const newItems = offerings.length - inventoryEntries.length;
  if (newItems !== expected.newOfficialItems) {
    issues.push(`Expected ${expected.newOfficialItems} new official items, found ${newItems}.`);
  }
  for (const d of findDuplicates(offerings.map((o) => o.id))) issues.push(`Duplicate offering id "${d}".`);

  const productIds = new Set(products.map((p) => p.id));
  const locationIds = new Set(locations.map((l) => l.id));

  for (const c of categories) {
    const own = inventoryEntries.filter((o) => o.categoryId === c.id);
    if (own.length !== c.inventoryItemCount) {
      issues.push(`Category "${c.id}": inventory lists ${c.inventoryItemCount} entries, data has ${own.length}.`);
    }
  }

  for (const o of offerings) {
    const where = `Offering "${o.id}"`;
    if (!categoryIds.has(o.categoryId)) issues.push(`${where}: unknown category "${o.categoryId}".`);
    if (!productIds.has(o.productId)) issues.push(`${where}: unknown product "${o.productId}".`);
    if (!o.displayName.trim()) issues.push(`${where}: displayName must not be empty.`);
    if (o.isNewOfficialItem) {
      if (o.inventoryName !== null) issues.push(`${where}: new official items have no inventoryName.`);
    } else if (!o.inventoryName?.trim()) {
      issues.push(`${where}: inventory entries need their exact inventoryName.`);
    }

    const optionValues = o.options.some((opt) => opt.price !== null || opt.calories !== null);
    const hasValues = o.prices.length > 0 || o.calories !== null || o.caloriesMax !== null || optionValues;

    // No empty cells: a missing value needs a visible note.
    if (o.prices.length === 0 && !o.priceNote?.trim()) issues.push(`${where}: no price, so it needs a priceNote.`);
    if (o.calories === null && !o.caloriesNote?.trim()) issues.push(`${where}: no calories, so it needs a caloriesNote.`);

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
    if (o.calories !== null && o.caloriesValueBasis === null) issues.push(`${where}: calories need a caloriesValueBasis.`);
    if (o.caloriesValueBasis === "calculated" && !o.caloriesFormula?.trim()) {
      issues.push(`${where}: calculated calories need a caloriesFormula.`);
    }
    if (o.caloriesValueBasis === "estimated") {
      issues.push(`${where}: estimated values need owner-approved third-party sources (not supported yet).`);
    }

    for (const opt of o.options) {
      const at = `${where}, option "${opt.label}"`;
      if (!opt.label.trim()) issues.push(`${where}: option label must not be empty.`);
      if (opt.price !== null && !(opt.price > 0)) issues.push(`${at}: price must be greater than 0.`);
      if (opt.price !== null && o.prices.length === 0) issues.push(`${at}: option prices need a sourced offering price.`);
      if (opt.calories !== null) {
        if (!Number.isInteger(opt.calories) || opt.calories < 0) issues.push(`${at}: calories must be a whole number ≥ 0.`);
        if (opt.caloriesBasis === null) issues.push(`${at}: calories need a basis.`);
        if (opt.caloriesMax !== null && opt.caloriesMax < opt.calories) issues.push(`${at}: caloriesMax must be ≥ calories.`);
      }
      if (opt.caloriesBasis === "calculated" && !opt.caloriesFormula?.trim()) issues.push(`${at}: calculated calories need a formula.`);
      if (opt.caloriesBasis === "estimated") issues.push(`${at}: estimated values are not supported yet.`);
    }
    for (const extra of o.calorieExtras) {
      if (!extra.label.trim() || !extra.formula.trim()) issues.push(`${where}: calorie extras need a label and a formula.`);
      if (extra.basis !== "calculated") issues.push(`${where}: calorie extras must be calculated values.`);
    }

    if (o.promotion) {
      const promo = o.promotion;
      if (!ISO_DATE.test(promo.checkedAt)) issues.push(`${where}: promotion checkedAt must be YYYY-MM-DD.`);
      if (promo.eligible) {
        if (promo.conditions.length === 0) issues.push(`${where}: an eligible promotion needs its conditions.`);
        if (promo.sourceUrls.length === 0 || !promo.sourceUrls.every((u) => isHttpsUrl(u))) {
          issues.push(`${where}: promotion sources must be https URLs.`);
        }
      } else if (o.prices.length > 0) {
        issues.push(`${where}: not eligible for the promotion, so it must not show a promotional price.`);
      }
    }

    if (o.image) {
      if (!o.image.src.startsWith("/images/")) issues.push(`${where}: image src must start with /images/.`);
      if (!o.image.alt.trim()) issues.push(`${where}: image needs alt text.`);
    }
  }

  /* ---------- Regular price references ---------- */
  const offeringById = new Map(offerings.map((o) => [o.id, o]));
  for (const o of offerings) {
    if (o.regularPriceOfferingId === null) continue;
    const ref = offeringById.get(o.regularPriceOfferingId);
    if (!ref) issues.push(`Offering "${o.id}": unknown regularPriceOfferingId "${o.regularPriceOfferingId}".`);
    else if (ref.prices.length === 0) issues.push(`Offering "${o.id}": its regular price reference has no price.`);
  }

  /* ---------- Create Your Own Pasta options ---------- */
  const cyop = createYourOwnPasta;
  if (!(cyop.basePrice > 0)) issues.push("Create Your Own Pasta: basePrice must be greater than 0.");
  if (cyop.caloriesMax < cyop.caloriesMin) issues.push("Create Your Own Pasta: caloriesMax must be ≥ caloriesMin.");
  if (!isHttpsUrl(cyop.sourceUrl)) issues.push("Create Your Own Pasta: sourceUrl must be an https URL.");
  if (cyop.image && (!cyop.image.src.startsWith("/images/") || !cyop.image.alt.trim())) {
    issues.push("Create Your Own Pasta: image src must start with /images/ and needs alt text.");
  }
  for (const d of findDuplicates(cyop.options.map((o) => o.id))) issues.push(`Duplicate Create Your Own Pasta option "${d}".`);
  for (const opt of cyop.options) {
    const at = `Create Your Own Pasta option "${opt.id}"`;
    if (opt.priceType === "add-on" && !(opt.price > 0)) issues.push(`${at}: add-on price must be greater than 0.`);
    if (opt.priceType === "included" && opt.price !== 0) issues.push(`${at}: included options have price 0.`);
    if (opt.calories === null && !opt.caloriesNote?.trim()) issues.push(`${at}: no calories, so it needs a caloriesNote.`);
    if (!isHttpsUrl(opt.sourceUrl)) issues.push(`${at}: sourceUrl must be an https URL.`);
    if (!ISO_DATE.test(opt.checkedAt)) issues.push(`${at}: checkedAt must be YYYY-MM-DD.`);
  }

  /* ---------- Products ---------- */
  for (const d of findDuplicates(products.map((p) => p.id))) issues.push(`Duplicate product id "${d}".`);
  const usedProducts = new Set(offerings.map((o) => o.productId));
  for (const p of products) {
    if (!SLUG_PATTERN.test(p.id)) issues.push(`Product "${p.id}": id is not lowercase-hyphenated.`);
    if (!usedProducts.has(p.id)) issues.push(`Product "${p.id}" is not used by any offering.`);
    if (p.image && !p.image.src.startsWith("/images/")) issues.push(`Product "${p.id}": image src must start with /images/.`);
    if (p.image && (!p.image.alt.trim() || !(p.image.width > 0) || !(p.image.height > 0))) {
      issues.push(`Product "${p.id}": image needs alt text, width, and height.`);
    }
    if (p.image && p.imageIssue) issues.push(`Product "${p.id}": an image with an open issue must not be used.`);
    if (!p.plannedImageSrc.startsWith("/images/")) issues.push(`Product "${p.id}": plannedImageSrc must start with /images/.`);
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
