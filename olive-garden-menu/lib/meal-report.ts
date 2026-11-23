/**
 * The meal report of the Nutrition & Meal Price Calculator: one formatted
 * summary used by both outputs, the print view and the downloadable PDF
 * (lib/meal-pdf.ts). Same values and rules as the on-screen totals
 * (lib/calculator-math.ts): missing values are named, never zero.
 * docs/tools/NUTRITION_CALCULATOR_ARCHITECTURE.md §7.
 */
import { formatNumber, formatPrice, formatMonthYear } from "./format";
import { isComplete, type MealTotals, type Total } from "./calculator-math";

export const PRICE_DISCLOSURE = "Prices vary by location. Estimated totals exclude taxes, tips, delivery fees, and other charges.";

export type ReportMeta = {
  siteName: string;
  siteUrl: string;
  /** Latest price check (ISO), shown as month and year. */
  lastChecked: string | null;
  locationNotice: string;
  disclaimer: string;
  /** Version code of the official nutrition guide, e.g. "US_101926". */
  guideVersion: string | null;
};

export type ReportInputLine = {
  name: string;
  version: string;
  qty: number;
  price: number | null;
  calories: [number, number] | null;
  hasNutrition: boolean;
  bundle: boolean;
};

export type MealReport = {
  title: string;
  /** "Created November 20, 2026" (the visitor's date; not a verification date). */
  created: string;
  /** ISO date for the file name. */
  createdIso: string;
  rows: { item: string; version: string; qty: string; price: string; calories: string; note: string | null }[];
  /** `coverage`: "Includes 1 of 3 items" when a total leaves items out; `incomplete` for checks and tests. */
  totals: { label: string; value: string; incomplete: boolean; coverage: string | null; note: string | null }[];
  /** Plain-language explanation of partial totals (which items Olive Garden publishes no exact value for). */
  coverageNotes: string[];
  notes: string[];
  footer: string;
};

const cal = (c: [number, number], qty: number) =>
  c[0] === c[1] ? formatNumber(c[0] * qty) : `${formatNumber(c[0] * qty)}–${formatNumber(c[1] * qty)}`;

function totalValue(t: Total, text: string, any: boolean): string {
  if (!any) return "–";
  if (t.known === 0) return "Not listed";
  return `${t.upperBound ? "≤ " : ""}${text}`;
}

export function buildMealReport(lines: ReportInputLine[], totals: MealTotals, meta: ReportMeta, now: Date = new Date()): MealReport {
  const any = totals.items > 0;
  const lineCount = totals.lines;
  const cover = (t: Total) => (any && !isComplete(t) ? `Includes ${t.known} of ${lineCount} ${lineCount === 1 ? "item" : "items"}` : null);
  const missing = (t: Total, what: string) => (any && !isComplete(t) ? `Not included (${what}): ${t.missing.join(", ")}.` : null);
  const calText = totals.calories.max !== totals.calories.value ? `${formatNumber(totals.calories.value)}–${formatNumber(totals.calories.max)}` : formatNumber(totals.calories.value);
  const nutrient = (label: string, t: Total, unit: string) => ({
    label,
    value: totalValue(t, `${formatNumber(t.value)} ${unit}`, any),
    incomplete: any && !isComplete(t),
    coverage: cover(t),
    note: missing(t, `no exact ${label.toLowerCase()} value in Olive Garden's nutrition guide`),
  });
  const nutrientTotals = [totals.nutrients.protein, totals.nutrients.carbs, totals.nutrients.fat, totals.nutrients.sodium];
  const nutrientMissing = [...new Set(nutrientTotals.flatMap((t) => t.missingNames))];
  const sameSet = nutrientTotals.every((t) => t.missing.join("|") === nutrientTotals[0].missing.join("|"));
  const stillCounted = nutrientMissing.every((n) => !totals.price.missingNames.includes(n) && !totals.calories.missingNames.includes(n));
  const coverageNotes: string[] = [];
  if (any && nutrientMissing.length) {
    coverageNotes.push(
      sameSet
        ? `Olive Garden's nutrition guide has no exact protein, carbs, fat or sodium values for ${nutrientMissing.join(", ")}, so ${nutrientMissing.length === 1 ? "it is" : "they are"} left out of those totals.${stillCounted ? ` ${nutrientMissing.length === 1 ? "Its" : "Their"} price and calories are still counted.` : ""}`
        : `Some protein, carbs, fat or sodium values are not published for ${nutrientMissing.join(", ")}; each total shows how many items it includes.`,
    );
  }
  if (any && !isComplete(totals.calories)) coverageNotes.push(`Calories are not listed for ${totals.calories.missingNames.join(", ")} in this size, so the calorie total covers the other items.`);
  if (any && !isComplete(totals.price)) coverageNotes.push(`No verified price for ${totals.price.missingNames.join(", ")}; the subtotal covers the other items.`);
  const createdIso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  return {
    title: "Olive Garden Meal Estimate",
    created: `Created ${now.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} with ${meta.siteName}`,
    createdIso,
    rows: lines
      .filter((l) => l.qty > 0)
      .map((l) => ({
        item: l.name,
        version: l.version,
        qty: String(l.qty),
        price: l.price === null ? "Price not verified" : formatPrice(l.price * l.qty),
        calories: l.calories ? `${cal(l.calories, l.qty)} Cal` : "Not listed",
        note: l.bundle
          ? "Bundle: counted once with Olive Garden's own total; protein, carbs, fat and sodium are not listed for it."
          : l.hasNutrition
            ? null
            : "Calories only: Olive Garden's nutrition guide has no exact protein, carbs, fat or sodium for this version.",
      })),
    totals: [
      {
        label: "Estimated price",
        value: totalValue(totals.price, formatPrice(totals.price.value), any),
        incomplete: any && !isComplete(totals.price),
        coverage: cover(totals.price),
        note: missing(totals.price, "no verified price"),
      },
      {
        label: "Calories",
        value: totalValue(totals.calories, calText, any),
        incomplete: any && !isComplete(totals.calories),
        coverage: cover(totals.calories),
        note: missing(totals.calories, "calories not listed for this size") ?? (totals.calories.max !== totals.calories.value ? "Range: depends on choices." : null),
      },
      nutrient("Protein", totals.nutrients.protein, "g"),
      nutrient("Carbohydrates", totals.nutrients.carbs, "g"),
      nutrient("Total fat", totals.nutrients.fat, "g"),
      nutrient("Sodium", totals.nutrients.sodium, "mg"),
    ],
    coverageNotes,
    notes: [
      PRICE_DISCLOSURE,
      `${meta.lastChecked ? `Prices last verified: ${formatMonthYear(meta.lastChecked)}. ` : ""}${meta.locationNotice} Prices are online pickup prices.`,
      `Nutrition: Olive Garden's official U.S. nutrition information${meta.guideVersion ? ` (${meta.guideVersion})` : ""} and online menu, for the exact version listed. Values marked Calc. on the website are our calculations from official values. A missing value is never counted as zero; "≤" means a "less than" value was counted at its upper limit.`,
      "Bundles and combinations count once, with Olive Garden's own total. This estimate is general information, not medical or dietary advice.",
      "Allergens are not checked here. Each dish's item page on this site lists the allergens Olive Garden marks for it; tell your server about any allergy before ordering.",
    ],
    footer: `${meta.disclaimer} ${meta.siteUrl.replace(/^https?:\/\//, "")}/nutrition-calculator`,
  };
}
