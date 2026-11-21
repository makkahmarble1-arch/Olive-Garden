/**
 * Data for the Nutrition & Meal Price Calculator (/nutrition-calculator).
 * docs/tools/NUTRITION_CALCULATOR_DATA_RULES.md.
 *
 * Built at build time from the shared menu data only (offerings, products,
 * item-page versions, official nutrition rows). Nothing is invented:
 * - One calculator item per dish. Offerings of the same dish (regular, lunch,
 *   lighter portion, family-style, catering, gluten-sensitive...) become its
 *   choices; identical offerings in several categories are one choice.
 * - Price = the verified online pickup price of that exact choice.
 * - Calories = the verified value of that exact choice (a range stays a range).
 * - Protein, carbs, fat and sodium only from an official nutrition row that
 *   describes exactly that choice (same calories). Otherwise they are missing,
 *   never zero.
 * - Bundles and combinations are one item with Olive Garden's own total;
 *   their parts are never added again.
 * - Left out: promotion entries ($6 Take Home), items not on the current menu
 *   or marked unavailable, merchandise, and group entries whose choices are
 *   separate items (each of those items is listed itself).
 */
import { getMenuCategory, getMenuProduct, getOfferingImage } from "@/lib/content";
import { allOfferings } from "@/content/menu/detail-items";
import { productPages, isLiveProductPage } from "@/content/menu/product-pages";
import { getNutritionMapping, getNutritionRow } from "@/lib/nutrition-data";
import { productDetailHref } from "@/lib/product-pages";
import type { MenuCategoryId, MenuOffering, NutrientAmount, NutritionGuideRow, PortionType } from "@/lib/types";

/** A nutrient value: a number, or "less than n" as printed in the guide. */
export type CalcAmount = number | { lt: number };

export type CalcNutrition = {
  protein: CalcAmount | null;
  carbs: CalcAmount | null;
  fat: CalcAmount | null;
  sodium: CalcAmount | null;
  /** "U.S. Nutrition Information, p. 8" */
  source: string;
};

export type CalcChoice = {
  /** Unique within the calculator. */
  id: string;
  /** Short label for the version selector, e.g. "Lunch" or "Family-style · Pan with broccoli". */
  label: string;
  /** Serving text from the menu data, e.g. "Serves 4-6". */
  serving: string | null;
  /** Verified price in USD, or null (subtotal then incomplete). */
  price: number | null;
  /** [min, max]; min === max for a single value; null when not listed for this choice. */
  calories: [number, number] | null;
  /** Calories are our calculation from official values (shown as "Calc."). */
  caloriesCalculated: boolean;
  /** Why calories are missing, when they are. */
  caloriesNote: string | null;
  /** Official row for exactly this choice, or null (nutrients then missing). */
  nutrition: CalcNutrition | null;
  /** Bundle or combination: Olive Garden's own total, parts included. */
  bundle: boolean;
  limitedTime: boolean;
  categoryIds: MenuCategoryId[];
};

export type CalcItem = {
  id: string;
  name: string;
  image: { src: string; alt: string; width: number; height: number } | null;
  /** Item page, when one is live. */
  href: string | null;
  categoryIds: MenuCategoryId[];
  /** Extra words for search (official names, category names). */
  keywords: string[];
  choices: CalcChoice[];
};

export type CalcCategory = { id: MenuCategoryId; name: string; count: number };

export type CalculatorData = {
  items: CalcItem[];
  categories: CalcCategory[];
  /** Latest price check of the included values (ISO). */
  lastChecked: string | null;
  stats: {
    items: number;
    choices: number;
    withPrice: number;
    withCalories: number;
    withNutrition: number;
    calorieRanges: number;
    bundles: number;
    excluded: { offeringId: string; reason: string }[];
  };
};

const PORTION_LABEL: Record<PortionType, string> = {
  regular: "Regular",
  lunch: "Lunch",
  "lighter-portion": "Lighter portion",
  "family-style": "Family-style",
  catering: "Catering",
  kids: "Kids",
  side: "Side",
  "to-go": "To go",
  promotion: "Promotion",
};

/** Calories printed per piece while the price is for a whole order or cake: never paired. */
const PER_PIECE_BASIS = /^per (slice|breadstick|piece)\b/i;

function baseLabel(o: MenuOffering): string {
  if (isBundle(o)) return "Bundle";
  if (o.categoryId === "gluten-sensitive") return "Gluten-sensitive";
  if (o.categoryId === "kids-meal") return "Kids";
  return PORTION_LABEL[o.portionType];
}

function why(o: MenuOffering, productHasPage: boolean): string | null {
  if (o.portionType === "promotion") return "Promotion entry (conditional add-on price, no calories)";
  if (o.availability === "not-listed") return "Not on the current online menu";
  if (o.availability === "unavailable") return "Marked currently unavailable";
  const mapping = getNutritionMapping(o.id);
  if (mapping?.status === "not-applicable") return "Not a food or drink item with calories (merchandise or promotion)";
  if (mapping?.status === "multi-row" && !productHasPage) return "Group of separate items (each is listed on its own)";
  if (!o.prices.length && o.calories === null) return "No verified price or calories";
  return null;
}

/** Bundles and combinations: Olive Garden's own total; their parts are never added again. */
function isBundle(o: MenuOffering): boolean {
  return getNutritionMapping(o.id)?.status === "composite" && /bundle|combination/i.test(o.displayName);
}

const amount = (v: NutrientAmount | null): CalcAmount | null => (v === null ? null : typeof v === "number" ? v : { lt: v.lessThan });

function rowNutrition(row: NutritionGuideRow): CalcNutrition {
  return {
    protein: amount(row.values.protein),
    carbs: amount(row.values.totalCarbohydrates),
    fat: amount(row.values.totalFat),
    sodium: amount(row.values.sodium),
    source: `U.S. Nutrition Information, p. ${row.page}`,
  };
}

/** Official row for exactly this choice: one of the offering's mapped rows with the same single calorie value. */
function matchRow(o: MenuOffering, calories: [number, number] | null, rowIds?: (string | null | undefined)[]): CalcNutrition | null {
  if (!calories || calories[0] !== calories[1]) return null;
  const mapping = getNutritionMapping(o.id);
  if (!mapping) return null;
  const usable = ["exact", "same-item", "variants"].includes(mapping.status);
  if (!usable) return null;
  const ids = rowIds ?? [mapping.rowId, ...(mapping.variantRowIds ?? [])];
  for (const id of ids) {
    if (!id) continue;
    const row = getNutritionRow(id);
    if (row && row.values.calories === calories[0]) return rowNutrition(row);
  }
  return null;
}

function latestPrice(o: MenuOffering): { amount: number; checkedAt: string } | null {
  if (!o.prices.length) return null;
  const p = [...o.prices].sort((a, b) => b.checkedAt.localeCompare(a.checkedAt))[0];
  return { amount: p.amount, checkedAt: p.checkedAt };
}

/**
 * One choice before merging. `label` is the option or version name ("Pan with broccoli",
 * "Coke"), or null for a plain listing (then the portion names it). `versionKey` keeps
 * officially different versions apart even when their price and calories match.
 */
type Draft = Omit<CalcChoice, "id" | "categoryIds" | "label"> & {
  label: string | null;
  versionKey: string | null;
  offering: MenuOffering;
  categoryIds: Set<MenuCategoryId>;
  portions: Set<string>;
};

/** Same price, calories and serving as the item page's main listing (e.g. the 2-liter soda under Drinks and Catering). */
function sameAsPrimary(o: MenuOffering, primaryId: string): boolean {
  if (o.id === primaryId) return true;
  const p = allOfferings.find((x) => x.id === primaryId);
  return !!p && p.productId === o.productId && latestPrice(p)?.amount === latestPrice(o)?.amount && p.calories === o.calories && p.caloriesMax === o.caloriesMax;
}

/** Choices of one offering (before merging identical offerings). */
function offeringChoices(o: MenuOffering): Omit<Draft, "categoryIds" | "portions">[] {
  const price = latestPrice(o)?.amount ?? null;
  const bundle = isBundle(o);
  const limitedTime = o.availability === "limited-time";
  const page = productPages.find((p) => isLiveProductPage(p) && p.versions?.length && sameAsPrimary(o, p.primaryOfferingId));

  // Version-aware item page: its officially listed versions, each with its own row.
  if (page?.versions) {
    return page.versions.map((v) => ({
      versionKey: v.key,
      offering: o,
      label: v.shortLabel,
      serving: o.servingSize,
      price: v.price,
      calories: [v.calories, v.calories],
      caloriesCalculated: false,
      caloriesNote: null,
      nutrition: v.nutritionRowId ? rowNutrition(getNutritionRow(v.nutritionRowId)!) : null,
      bundle,
      limitedTime,
    }));
  }

  const options = o.options.filter((x) => !x.unavailable);
  if (options.length > 0) {
    return options.map((x) => {
      const calories: [number, number] | null = x.calories === null ? null : [x.calories, x.caloriesMax ?? x.calories];
      return {
        versionKey: null,
        offering: o,
        label: x.label,
        serving: o.servingSize,
        price: x.price ?? price,
        calories,
        caloriesCalculated: (x.caloriesBasis ?? o.caloriesValueBasis) === "calculated",
        caloriesNote: calories ? null : "Calories are not listed for this size",
        nutrition: bundle ? null : matchRow(o, calories),
        bundle,
        limitedTime,
      };
    });
  }

  const perPiece = o.caloriesBasis !== null && PER_PIECE_BASIS.test(o.caloriesBasis);
  const calories: [number, number] | null = o.calories === null || perPiece ? null : [o.calories, o.caloriesMax ?? o.calories];
  return [
    {
      versionKey: null,
      offering: o,
      label: null,
      serving: o.servingSize,
      price,
      calories,
      caloriesCalculated: o.caloriesValueBasis === "calculated",
      caloriesNote: calories ? null : perPiece ? `Calories are listed ${o.caloriesBasis}, not for this size` : o.caloriesNote ?? "Calories are not listed",
      nutrition: bundle ? null : matchRow(o, calories),
      bundle,
      limitedTime,
    },
  ];
}

/** "Serves 4-6" from "Serves 4-6: pan of ...", else the size in the listing id ("half-gallon" -> "Half gallon"). */
function sizeName(o: MenuOffering, productId: string): string {
  const head = o.servingSize?.split(/[:;]/)[0].trim();
  if (head) return head;
  const suffix = o.id.split(`${o.productId}--`)[1] ?? o.id.split(`${productId}--`)[1];
  if (suffix) return suffix.replace(/-/g, " ").replace(/^./, (c) => c.toUpperCase());
  return o.displayName;
}

function plainImage(o: MenuOffering) {
  const img = getOfferingImage(o);
  return img ? { src: img.src, alt: img.alt, width: img.width, height: img.height } : null;
}

const PORTION_ORDER: PortionType[] = ["regular", "kids", "lunch", "lighter-portion", "side", "to-go", "family-style", "catering", "promotion"];

let cache: CalculatorData | null = null;

export function getCalculatorData(): CalculatorData {
  if (cache) return cache;

  // Same dish under another product record (catering tray, gluten-sensitive listing...): joined to the item page's dish.
  const ownerOf = new Map<string, string>();
  for (const page of productPages) {
    if (!isLiveProductPage(page)) continue;
    for (const id of page.equivalentOfferingIds ?? []) ownerOf.set(id, page.productId);
  }
  const productsWithPage = new Set(productPages.filter(isLiveProductPage).map((p) => p.productId));

  const excluded: CalculatorData["stats"]["excluded"] = [];
  const groups = new Map<string, MenuOffering[]>();
  for (const o of allOfferings) {
    const productId = ownerOf.get(o.id) ?? o.productId;
    const reason = why(o, productsWithPage.has(productId));
    if (reason) {
      excluded.push({ offeringId: o.id, reason });
      continue;
    }
    groups.set(productId, [...(groups.get(productId) ?? []), o]);
  }

  let lastChecked: string | null = null;
  const items: CalcItem[] = [];
  for (const [productId, offerings] of groups) {
    offerings.sort((a, b) => PORTION_ORDER.indexOf(a.portionType) - PORTION_ORDER.indexOf(b.portionType));
    const drafts: Draft[] = [];
    for (const o of offerings) {
      const checked = latestPrice(o)?.checkedAt;
      if (checked && (!lastChecked || checked > lastChecked)) lastChecked = checked;
      for (const c of offeringChoices(o)) {
        // The same choice listed in several categories or wordings (Classic Entrees and Amazing
        // Alfredos; "6 breadsticks, baked" and "6 breadsticks (baked or unbaked)"; a family-style
        // pan and the same catering pan): same price, calories, official row and version -> one choice.
        const same = drafts.find(
          (d) =>
            d.versionKey === c.versionKey &&
            d.price === c.price &&
            JSON.stringify(d.calories) === JSON.stringify(c.calories) &&
            JSON.stringify(d.nutrition) === JSON.stringify(c.nutrition) &&
            (d.label === null || c.label === null || d.label.split(/[\s,(]/)[0] === c.label.split(/[\s,(]/)[0]),
        );
        if (same) {
          same.categoryIds.add(o.categoryId);
          same.portions.add(baseLabel(o));
          // Keep the clearest name: an option name wins over none, the shorter wording over the longer.
          if (c.label !== null && (same.label === null || (c.label.length < same.label.length && !same.versionKey))) same.label = c.label;
          continue;
        }
        drafts.push({ ...c, categoryIds: new Set([o.categoryId]), portions: new Set([baseLabel(o)]) });
      }
    }
    if (drafts.length === 0) continue;

    // Labels: the portion ("Lunch", "Family-style · Catering") plus the option or version name.
    // The portion is named only when the item has other portions too.
    const allPortions = new Set(drafts.flatMap((d) => [...d.portions]));
    const named = drafts.map((d) => {
      const portion = [...d.portions].join(" · ");
      if (d.label === null) return portion;
      return d.portions.size < allPortions.size ? `${portion}: ${d.label}` : d.label;
    });
    // Two plain listings with the same portion name (soup half gallon / gallon, standard / large bundle): add the size.
    const choices: CalcChoice[] = drafts.map((d, i) => {
      let label = named[i];
      if (named.filter((n) => n === label).length > 1) label = `${label}: ${sizeName(d.offering, productId)}`;
      return {
        id: `${productId}~${i}`,
        label,
        serving: d.serving,
        price: d.price,
        calories: d.calories,
        caloriesCalculated: d.caloriesCalculated,
        caloriesNote: d.caloriesNote,
        nutrition: d.nutrition,
        bundle: d.bundle,
        limitedTime: d.limitedTime,
        categoryIds: [...d.categoryIds],
      };
    });

    const main = productPages.find((p) => p.productId === productId && isLiveProductPage(p));
    const primary = (main && allOfferings.find((o) => o.id === main.primaryOfferingId)) ?? offerings[0];
    const categoryIds = [...new Set(choices.flatMap((c) => c.categoryIds))];
    items.push({
      id: productId,
      name: primary.displayName.replace(/\s*\((Serves|Large)[^)]*\)$/i, ""),
      image: plainImage(primary) ?? offerings.map(plainImage).find(Boolean) ?? null,
      href: productDetailHref(productId),
      categoryIds,
      keywords: [...new Set([getMenuProduct(productId)?.name ?? "", ...offerings.map((o) => o.officialName ?? "")].filter(Boolean))].filter(
        (k) => k !== primary.displayName,
      ),
      choices,
    });
  }
  items.sort((a, b) => a.name.localeCompare(b.name));

  const categories: CalcCategory[] = [];
  for (const o of allOfferings) {
    if (categories.some((c) => c.id === o.categoryId)) continue;
    const count = items.filter((i) => i.categoryIds.includes(o.categoryId)).length;
    const cat = getMenuCategory(o.categoryId);
    if (count > 0 && cat) categories.push({ id: o.categoryId, name: cat.name, count });
  }

  const all = items.flatMap((i) => i.choices);
  cache = {
    items,
    categories,
    lastChecked,
    stats: {
      items: items.length,
      choices: all.length,
      withPrice: all.filter((c) => c.price !== null).length,
      withCalories: all.filter((c) => c.calories !== null).length,
      withNutrition: all.filter((c) => c.nutrition !== null).length,
      calorieRanges: all.filter((c) => c.calories && c.calories[0] !== c.calories[1]).length,
      bundles: all.filter((c) => c.bundle).length,
      excluded,
    },
  };
  return cache;
}

/**
 * Build check (runs when the calculator page is built): every choice comes
 * from verified data, nutrition rows match the choice's calories, and no
 * choice is listed twice.
 */
export function validateCalculatorData(data: CalculatorData = getCalculatorData()): string[] {
  const issues: string[] = [];
  const ids = new Set<string>();
  for (const item of data.items) {
    if (!item.choices.length) issues.push(`${item.id}: no choices`);
    const keys = new Set<string>();
    for (const c of item.choices) {
      if (ids.has(c.id)) issues.push(`${c.id}: duplicate id`);
      ids.add(c.id);
      const key = `${c.label}|${c.price}|${JSON.stringify(c.calories)}`;
      if (keys.has(key)) issues.push(`${item.id}: choice "${c.label}" listed twice`);
      keys.add(key);
      if (c.price === null && c.calories === null) issues.push(`${c.id}: no price and no calories`);
      if (c.price !== null && !(c.price > 0)) issues.push(`${c.id}: invalid price ${c.price}`);
      if (c.calories && (c.calories[0] < 0 || c.calories[1] < c.calories[0])) issues.push(`${c.id}: invalid calories`);
      if (c.nutrition && (!c.calories || c.calories[0] !== c.calories[1])) issues.push(`${c.id}: nutrition row without a single calorie value`);
      if (c.bundle && c.nutrition) issues.push(`${c.id}: bundle with a single-item nutrition row`);
    }
  }
  return issues;
}
