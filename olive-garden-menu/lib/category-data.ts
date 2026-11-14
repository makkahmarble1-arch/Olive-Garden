/**
 * Server-side data for category pages (docs/CATEGORY_PAGE_ARCHITECTURE.md).
 * Everything is read from the shared production menu data (content/menu/),
 * so a price or calorie change updates the homepage AND every category page.
 * Pages never type prices or calories into their own content.
 */
import {
  getCategoryCheckDate,
  getCategoryPageContent,
  getCreateYourOwnPasta,
  getMenuCategory,
  menuCategoryPath,
  getMenuProduct,
  getOffering,
  getOfferingsForCategory,
  getReferenceLocation,
  toMenuTableItem,
} from "@/lib/content";
import { referenceLocations } from "@/content/menu/locations";
import { formatNumber, formatPrice } from "@/lib/format";
import type {
  CategoryPageContent,
  ComparisonColumn,
  ComparisonRow,
  ComparisonTableSpec,
  CustomizationOption,
  MenuCategoryDef,
  MenuItem,
  MenuOffering,
  OptionTableSpec,
  PastaBuildSpec,
  ServingPlanSpec,
  ReferenceLocation,
} from "@/lib/types";

/** How prices were collected (owner decision 5, docs/MENU_RESEARCH_PLAN.md). */
export const REFERENCE_ORDER_TYPE = "Online pickup";

export type CategoryFacts = {
  offerings: MenuOffering[];
  rows: MenuItem[];
  itemCount: number;
  /** What itemCount counts ("items", or "build options" for Create Your Own Pasta). */
  countLabel: string;
  /** Latest real price check date in this category (ISO), or null. */
  lastChecked: string | null;
  location: ReferenceLocation;
  orderType: string;
};

export function getCategoryFacts(category: MenuCategoryDef, content?: CategoryPageContent): CategoryFacts {
  const own = getOfferingsForCategory(category.id);
  // A category without its own offerings may show offerings listed elsewhere (tableOfferingIds).
  const offerings =
    own.length === 0 && content?.tableOfferingIds
      ? content.tableOfferingIds.map((id) => {
          const o = getOffering(id);
          if (!o) throw new Error(`Category "${category.id}": unknown table offering "${id}".`);
          return o;
        })
      : own;
  const rows = offerings.map(toMenuTableItem);
  const locationId = offerings.flatMap((o) => o.prices.map((p) => p.locationId))[0];
  const isPastaBuilder = category.id === "create-your-own-pasta";
  return {
    offerings,
    rows,
    itemCount: isPastaBuilder ? getCreateYourOwnPasta().options.length : offerings.length,
    countLabel: isPastaBuilder ? "build options" : "items",
    lastChecked: getCategoryCheckDate(category.id),
    location: (locationId && getReferenceLocation(locationId)) || referenceLocations[0],
    orderType: REFERENCE_ORDER_TYPE,
  };
}

/** 3-5 photo cards: the page's chosen offerings, or the first 5 with an image. */
export function getFeaturedOfferings(content: CategoryPageContent, offerings: MenuOffering[]): MenuOffering[] {
  const hasImage = (o: MenuOffering) => Boolean(o.image ?? getMenuProduct(o.productId)?.image);
  // [] = deliberately no photo cards (e.g. promotion pages); undefined = default.
  if (content.featuredOfferingIds !== undefined) {
    return content.featuredOfferingIds
      .map((id) => offerings.find((o) => o.id === id))
      .filter((o): o is MenuOffering => Boolean(o && hasImage(o)));
  }
  return offerings.filter(hasImage).slice(0, 5);
}

/* ---------- Related Menus ---------- */

/**
 * Related menus that can be linked right now (owner standard 2026-11-13):
 * the target has a finished page (published; preview targets only from
 * another preview page), it is not this page, and the card shows the
 * target's real article title (`menuTitle`). Planned entries for pages not
 * finished yet stay in the content and appear automatically later.
 */
export function getRelatedMenus(category: MenuCategoryDef, content: CategoryPageContent): { title: string; href: string; text: string }[] {
  const fromPreview = category.contentStatus !== "published";
  return content.related.flatMap((r) => {
    const target = getMenuCategory(r.categoryId);
    const targetContent = getCategoryPageContent(r.categoryId);
    if (!target || !targetContent || target.id === category.id) return [];
    const live = target.contentStatus === "published" || (fromPreview && target.contentStatus === "preview");
    return live ? [{ title: targetContent.menuTitle, href: menuCategoryPath(target.slug), text: r.text }] : [];
  });
}

/* ---------- Comparison tables ---------- */

export type ComparisonCell = {
  text: string;
  /** Set for calculated values: how the number was calculated. */
  calculated?: string;
  /** True when the value is a note (no verified number). */
  isNote?: boolean;
};

export type ResolvedComparison = {
  id: string;
  caption: string;
  headers: string[];
  /** Header of the first (row label) column. Default "Item". */
  firstHeader?: string;
  rows: { label: string; cells: ComparisonCell[] }[];
  hasCalculated: boolean;
  /** What calculated cells are based on (shown in the "Calc." note). Default: prices and serving sizes. */
  calcBasis?: string;
  notes: ComparisonTableSpec["notes"];
};

type RowValues = { price: number | null; calories: number | null; caloriesMax: number | null; offering: MenuOffering };

function rowValues(offering: MenuOffering, optionLabel?: string): RowValues {
  const verified = offering.status === "verified";
  const option = optionLabel ? offering.options.find((o) => o.label === optionLabel) : undefined;
  if (optionLabel && !option) throw new Error(`Comparison: offering "${offering.id}" has no option "${optionLabel}".`);
  return {
    offering,
    price: verified ? (option ? option.price : (offering.prices[0]?.amount ?? null)) : null,
    calories: verified ? (option?.calories ?? offering.calories) : null,
    caloriesMax: verified ? (option ? option.caloriesMax : offering.caloriesMax) : null,
  };
}

const DEFAULT_LABELS: Record<ComparisonColumn["kind"], string> = {
  price: "Price",
  calories: "Calories",
  serving: "Serving size",
  category: "Menu section",
  pricePerServing: "Price per serving",
  priceDifference: "Price difference",
  caloriesDifference: "Calorie difference",
  refDifference: "Difference",
  text: "",
};

const isSingle = (x: RowValues) => x.calories !== null && (x.caloriesMax === null || x.caloriesMax === x.calories);

function caloriesText(v: RowValues): string {
  return v.caloriesMax !== null && v.caloriesMax !== v.calories
    ? `${formatNumber(v.calories as number)}–${formatNumber(v.caloriesMax)}`
    : formatNumber(v.calories as number);
}

/** Signed difference text: "+$1.00" / "−$5.50" / "Same price", optionally with "(−28%)". */
function differenceCell(
  measure: "price" | "calories",
  value: number,
  base: number,
  percent: boolean,
): ComparisonCell {
  const fmt = measure === "price" ? formatPrice : formatNumber;
  const diff = measure === "price" ? Math.round((value - base) * 100) / 100 : value - base;
  const calculated = `${fmt(value)} − ${fmt(base)}`;
  if (diff === 0) return { text: measure === "price" ? "Same price" : "Same", calculated };
  const pct = percent && base !== 0 ? ` (${diff > 0 ? "+" : "−"}${Math.round((Math.abs(diff) / base) * 100)}%)` : "";
  return { text: `${diff > 0 ? "+" : "−"}${fmt(Math.abs(diff))}${pct}`, calculated };
}

/** Values of a row's own offering ("main" or no key) or of one of its refs; undefined if the row has no such ref. */
function refValues(row: ComparisonRow, main: RowValues, key: string | undefined, specId: string): RowValues | undefined {
  if (!key || key === "main") return main;
  const ref = row.refs?.[key];
  if (!ref) return undefined;
  const offering = getOffering(ref.offeringId);
  if (!offering) throw new Error(`Comparison "${specId}": unknown offering "${ref.offeringId}".`);
  return rowValues(offering, ref.option);
}

/** Builds a comparison table from the shared data. Throws on unknown ids (build fails). */
export function resolveComparison(spec: ComparisonTableSpec): ResolvedComparison {
  const values = spec.rows.map((row) => {
    const offering = getOffering(row.offeringId);
    if (!offering) throw new Error(`Comparison "${spec.id}": unknown offering "${row.offeringId}".`);
    return rowValues(offering, row.option);
  });

  let hasCalculated = false;
  const rows = spec.rows.map((row, i) => {
    const v = values[i];
    const cells: ComparisonCell[] = spec.columns.map((col) => {
      switch (col.kind) {
        case "price": {
          const x = refValues(row, v, col.ref, spec.id);
          if (!x) return { text: col.missing ?? "—", isNote: true };
          return x.price !== null ? { text: formatPrice(x.price) } : { text: x.offering.priceNote ?? "Not verified yet", isNote: true };
        }
        case "calories": {
          const x = refValues(row, v, col.ref, spec.id);
          if (!x) return { text: col.missing ?? "—", isNote: true };
          if (x.calories === null) return { text: x.offering.caloriesNote ?? "Not verified yet", isNote: true };
          return { text: caloriesText(x) };
        }
        case "serving":
          return { text: v.offering.servingSize ?? "—", isNote: !v.offering.servingSize };
        case "category":
          return { text: getMenuCategory(v.offering.categoryId)?.name ?? v.offering.categoryId };
        case "pricePerServing": {
          const servings = col.use === "min" ? row.servingsMin : row.servings;
          if (v.price === null || !servings) return { text: "—", isNote: true };
          hasCalculated = true;
          return {
            text: formatPrice(Math.round((v.price / servings) * 100) / 100),
            calculated: `${formatPrice(v.price)} ÷ ${servings}`,
          };
        }
        case "priceDifference": {
          const base = values[col.baseRow];
          if (!base || v.price === null || base.price === null) return { text: "—", isNote: true };
          if (i === col.baseRow) return { text: "—" };
          hasCalculated = true;
          return differenceCell("price", v.price, base.price, false);
        }
        case "caloriesDifference": {
          const base = values[col.baseRow];
          if (!base || !isSingle(v) || !isSingle(base)) return { text: "—", isNote: true };
          if (i === col.baseRow) return { text: "—" };
          hasCalculated = true;
          return differenceCell("calories", v.calories as number, base.calories as number, false);
        }
        case "refDifference": {
          const a = refValues(row, v, col.ref, spec.id);
          const b = refValues(row, v, col.baseRef, spec.id);
          if (!a || !b) return { text: "—", isNote: true };
          if (col.measure === "price") {
            if (a.price === null || b.price === null) return { text: "—", isNote: true };
            hasCalculated = true;
            return differenceCell("price", a.price, b.price, Boolean(col.percent));
          }
          if (a.calories !== null && a.calories === b.calories && a.caloriesMax === b.caloriesMax) {
            hasCalculated = true;
            return { text: "Same", calculated: `${caloriesText(a)} vs ${caloriesText(b)}` };
          }
          if (!isSingle(a) || !isSingle(b)) return { text: "Range (see calories)", isNote: true };
          hasCalculated = true;
          return differenceCell("calories", a.calories as number, b.calories as number, Boolean(col.percent));
        }
        case "text":
          return { text: row.text?.[col.key] ?? "—", isNote: !row.text?.[col.key] };
      }
    });
    return { label: row.label ?? v.offering.displayName, cells };
  });

  return {
    id: spec.id,
    caption: spec.caption,
    headers: spec.columns.map((c) => c.label ?? DEFAULT_LABELS[c.kind]),
    rows,
    hasCalculated,
    // Same-dish comparisons (refDifference) are based on prices and calories.
    ...(spec.columns.some((c) => c.kind === "refDifference") ? { calcBasis: "official prices and calories" } : {}),
    notes: spec.notes,
  };
}

/* ---------- Create Your Own Pasta option tables and example builds ---------- */

function getOption(id: string, where: string): CustomizationOption {
  const option = getCreateYourOwnPasta().options.find((o) => o.id === id);
  if (!option) throw new Error(`${where}: unknown Create Your Own Pasta option "${id}".`);
  return option;
}

function optionCaloriesText(option: CustomizationOption): ComparisonCell {
  if (option.calories === null) return { text: option.caloriesNote ?? "Not listed", isNote: true };
  return { text: `${formatNumber(option.calories)}${option.caloriesUnit ? ` ${option.caloriesUnit}` : ""}` };
}

/** Option table (pasta, sauces, toppings, soups) from the shared Create Your Own Pasta data. */
export function resolveOptionTable(spec: OptionTableSpec): ResolvedComparison {
  const where = `Option table "${spec.id}"`;
  let hasCalculated = false;
  const rows = spec.rows.map((row) => {
    const option = getOption(row.optionId, where);
    const cells: ComparisonCell[] = spec.columns.map((col) => {
      switch (col.kind) {
        case "price":
          return { text: option.priceType === "included" ? "Included" : `+${formatPrice(option.price)}` };
        case "calories":
          return optionCaloriesText(option);
        case "text":
          return { text: row.text?.[col.key] ?? "—", isNote: !row.text?.[col.key] };
        case "caloriesPlus": {
          const parts = [{ option, count: 1 }, ...col.add.map((a) => ({ option: getOption(a.optionId, where), count: a.count ?? 1 }))];
          if (parts.some((p) => p.option.calories === null)) return { text: "—", isNote: true };
          hasCalculated = true;
          const total = parts.reduce((sum, p) => sum + (p.option.calories as number) * p.count, 0);
          return {
            text: formatNumber(total),
            calculated: parts
              .map((p) => (p.count === 1 ? formatNumber(p.option.calories as number) : `${p.count} × ${formatNumber(p.option.calories as number)}`))
              .join(" + "),
          };
        }
      }
    });
    return { label: row.label ?? option.name, cells };
  });
  return {
    id: spec.id,
    caption: spec.caption,
    firstHeader: "Option",
    headers: spec.columns.map((c) => c.label ?? (c.kind === "price" ? "Price" : c.kind === "calories" ? "Calories" : "")),
    rows,
    hasCalculated,
    calcBasis: "official prices and calories",
    notes: spec.notes,
  };
}

/**
 * Example Create Your Own Pasta orders. Price = official base price + paid
 * toppings. Plate calories = pasta + sauce + toppings (the official meal range
 * covers pasta and sauce only, so the base calories are never added twice).
 * Full meal = plate + the included soup or salad + breadsticks.
 */
export function resolvePastaBuilds(spec: PastaBuildSpec): ResolvedComparison {
  const where = `Pasta builds "${spec.id}"`;
  const { basePrice } = getCreateYourOwnPasta();
  const breadstick = getCreateYourOwnPasta().options.find((o) => o.group === "first-course" && o.caloriesUnit === "each");
  const rows = spec.builds.map((build) => {
    const pasta = getOption(build.pasta, where);
    const sauce = getOption(build.sauce, where);
    const toppings = (build.toppings ?? []).map((id) => getOption(id, where));
    const plateParts = [pasta, sauce, ...toppings];
    if (plateParts.some((p) => p.calories === null)) throw new Error(`${where}: "${build.label}" uses an option without calories.`);

    const price = Math.round((basePrice + toppings.reduce((s, t) => s + t.price, 0)) * 100) / 100;
    const priceCell: ComparisonCell =
      toppings.length === 0
        ? { text: formatPrice(price) }
        : { text: formatPrice(price), calculated: [formatPrice(basePrice), ...toppings.map((t) => formatPrice(t.price))].join(" + ") };

    const plate = plateParts.reduce((s, p) => s + (p.calories as number), 0);
    const plateCell: ComparisonCell = { text: formatNumber(plate), calculated: plateParts.map((p) => formatNumber(p.calories as number)).join(" + ") };

    const sticks = build.breadsticks ?? 0;
    let mealCell: ComparisonCell = { text: "—", isNote: true };
    if (build.firstCourse) {
      const first = getOption(build.firstCourse, where);
      if (first.calories === null || (sticks > 0 && (!breadstick || breadstick.calories === null))) {
        throw new Error(`${where}: "${build.label}" needs first-course calories.`);
      }
      const stickCalories = sticks > 0 ? sticks * (breadstick?.calories as number) : 0;
      const meal = plate + (first.calories as number) + stickCalories;
      mealCell = {
        text: formatNumber(meal),
        calculated: [formatNumber(plate), formatNumber(first.calories as number), ...(sticks > 0 ? [`${sticks} × ${formatNumber(breadstick?.calories as number)}`] : [])].join(" + "),
      };
    }

    const plateText = [pasta.name, sauce.name, ...toppings.map((t) => t.name)].join(" + ");
    const firstText = build.firstCourse
      ? `${getOption(build.firstCourse, where).name}${sticks > 0 ? ` + ${sticks} breadstick${sticks > 1 ? "s" : ""}` : ", no breadsticks"}`
      : "Not counted";
    return {
      label: build.label,
      cells: [{ text: plateText }, { text: firstText, isNote: !build.firstCourse }, priceCell, plateCell, mealCell],
    };
  });

  return {
    id: spec.id,
    caption: spec.caption,
    firstHeader: "Example",
    headers: ["Pasta, sauce, and toppings", "Soup or salad", "Price", "Plate calories", "Full meal calories"],
    rows,
    hasCalculated: true,
    calcBasis: "official prices and calories",
    notes: spec.notes,
  };
}

/* ---------- Headcount plans (catering) ---------- */

/**
 * For one guest count: how many units of each plan are needed (rounded up,
 * using the lower official serving number), the food subtotal, and the cost
 * per guest. Taxes, delivery fees, and tips are not included.
 */
export function resolveServingPlan(spec: ServingPlanSpec): ResolvedComparison {
  const rows = spec.plans.map((plan) => {
    const offering = getOffering(plan.offeringId);
    if (!offering) throw new Error(`Serving plan "${spec.id}": unknown offering "${plan.offeringId}".`);
    const v = rowValues(offering, plan.option);
    if (v.price === null) throw new Error(`Serving plan "${spec.id}": "${plan.offeringId}" has no verified price.`);
    const units = Math.ceil(spec.guests / plan.servesPerUnit);
    const total = Math.round(units * v.price * 100) / 100;
    const perGuest = Math.round((total / spec.guests) * 100) / 100;
    const cells: ComparisonCell[] = [
      { text: `${units} × ${formatPrice(v.price)}`, calculated: `${spec.guests} guests ÷ ${plan.servesPerUnit} per unit, rounded up` },
      { text: `${units * plan.servesPerUnit} people`, calculated: `${units} × ${plan.servesPerUnit}` },
      { text: formatPrice(total), calculated: `${units} × ${formatPrice(v.price)}` },
      { text: formatPrice(perGuest), calculated: `${formatPrice(total)} ÷ ${spec.guests}` },
    ];
    return { label: plan.label, cells };
  });
  return {
    id: spec.id,
    caption: spec.caption,
    firstHeader: "Plan",
    headers: ["Units to order", "Feeds at least", "Food subtotal", "Per guest"],
    rows,
    hasCalculated: true,
    calcBasis: "official prices and serving sizes (food only: no tax, delivery fee, or tip)",
    notes: spec.notes,
  };
}
