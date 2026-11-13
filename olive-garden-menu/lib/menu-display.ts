/**
 * Turns an offering into ready-to-show text (price, calories, labels) for
 * the homepage menu cards. Pure functions, no React: the same values are
 * used by server components and the small client option picker.
 */
import { formatNumber, formatPrice } from "./format";
import type { MenuOffering, OfferingOption } from "./types";

/** Text for one price + calories combination (the card shows one at a time). */
export type DisplayValues = {
  /** "$21.79", or a note such as "Not on the current online menu". */
  price: string;
  priceIsNote: boolean;
  /** "1,480 cal", "630–1,050 cal", or a note. */
  calories: string;
  caloriesIsNote: boolean;
  /** e.g. "per entrée", "per pan". */
  caloriesUnit: string | null;
  /** Parts of a calculated value ("6 × 140"); null when official. */
  calculatedFrom: string | null;
};

export type DisplayOption = DisplayValues & {
  label: string;
  unavailable: boolean;
};

/** "1,480" or "630–1,050". Also normalizes "70-490" style text to an en dash. */
export function formatCalorieRange(value: number, max: number | null | undefined): string {
  return max != null && max !== value ? `${formatNumber(value)}–${formatNumber(max)}` : formatNumber(value);
}

function dash(text: string): string {
  return text.replace(/(\d)-(\d)/g, "$1–$2");
}

/** Values of the offering itself (used when it has no options). */
export function offeringValues(offering: MenuOffering): DisplayValues {
  const verified = offering.status === "verified";
  const price = verified ? (offering.prices[0]?.amount ?? null) : null;
  const calories = verified ? offering.calories : null;
  return {
    price: price !== null ? formatPrice(price) : (offering.priceNote ?? "Not verified yet"),
    priceIsNote: price === null,
    calories: calories !== null ? `${formatCalorieRange(calories, offering.caloriesMax)} Cal` : (offering.caloriesNote ?? "Not verified yet"),
    caloriesIsNote: calories === null,
    caloriesUnit: calories !== null ? offering.caloriesBasis : null,
    calculatedFrom:
      calories !== null && offering.caloriesValueBasis === "calculated" && offering.caloriesFormula
        ? dash(offering.caloriesFormula)
        : null,
  };
}

/** Values of one option; falls back to the offering's calories when the option has none. */
function optionValues(offering: MenuOffering, option: OfferingOption): DisplayOption {
  const base = offeringValues(offering);
  const hasCalories = option.calories !== null;
  return {
    label: option.label,
    unavailable: option.unavailable === true,
    price: option.price !== null ? formatPrice(option.price) : base.price,
    priceIsNote: option.price === null && base.priceIsNote,
    calories: hasCalories ? `${formatCalorieRange(option.calories as number, option.caloriesMax)} Cal` : base.calories,
    caloriesIsNote: !hasCalories && base.caloriesIsNote,
    caloriesUnit: hasCalories ? option.caloriesUnit : base.caloriesUnit,
    calculatedFrom: hasCalories
      ? option.caloriesBasis === "calculated" && option.caloriesFormula
        ? dash(option.caloriesFormula)
        : null
      : base.calculatedFrom,
  };
}

/** All options of an offering, ready to show (empty when it has none). */
export function offeringOptions(offering: MenuOffering): DisplayOption[] {
  if (offering.status !== "verified") return [];
  return offering.options.map((option) => optionValues(offering, option));
}

/** Short availability label for a card, or null when nothing needs saying. */
export function availabilityLabel(offering: MenuOffering): string | null {
  if (offering.promotion && !offering.promotion.eligible) return "Not part of the current offer";
  switch (offering.availability) {
    case "limited-time":
      return "Limited time";
    case "unavailable":
      return "Currently unavailable";
    case "not-listed":
      return "Not on the current menu";
    default:
      return null;
  }
}

/** Lowercase text without accents, for case- and accent-insensitive search. */
export function searchText(...parts: (string | null | undefined)[]): string {
  return parts
    .filter(Boolean)
    .join(" ")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/* ---------- Compact card text (owner UI review, 2026-11-13) ---------- */

/** Serving texts that repeat what the section already says; not shown as a badge. */
const GENERIC_SERVINGS = new Set([
  "entrée",
  "one drink",
  "one bottle to go",
  "kids meal",
  "single dessert",
  "one appetizer order",
  "one beer to go",
  "side order",
  "one flatbread",
  "one fountain drink",
  "one salad",
  "one espresso",
  "one non-alcoholic beer to go",
  "one serving of soup",
  "one serving",
  "lunch-size portion",
  "lighter portion",
]);

/**
 * Short serving badges from the verified serving text, e.g.
 * "Serves 4-6: pan of Lasagna Classico, ..." -> ["Serves 4-6"]. The details
 * after ":" or ";" are already in the description, except ordering notes
 * such as "allow 2 hours", which are kept. The data itself is not changed.
 */
export function servingBadges(servingSize: string | null): string[] {
  if (!servingSize || /^regular:/i.test(servingSize)) return [];
  const head = servingSize.split(":")[0];
  const [first, ...rest] = head.split(";").map((part) => part.trim()).filter(Boolean);
  const badges: string[] = [];
  if (first && !GENERIC_SERVINGS.has(first.toLowerCase())) badges.push(dash(first));
  for (const part of rest) if (/^allow \d+ hours?$/i.test(part)) badges.push(part.charAt(0).toUpperCase() + part.slice(1));
  return badges;
}

const OBVIOUS_UNITS =
  /^per (entrée|drink|order|dessert|lunch entrée|lighter-portion entrée|side|serving|bottle|beer|salad|flatbread|sandwich with fries|espresso)$/i;

/** Calorie unit worth showing (e.g. "per pan (total)"); null when it only repeats the obvious. */
export function calorieUnitNote(unit: string | null): string | null {
  if (!unit || OBVIOUS_UNITS.test(unit.trim())) return null;
  return dash(unit);
}
