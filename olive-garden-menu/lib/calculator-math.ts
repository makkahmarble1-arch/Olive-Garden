/**
 * Meal totals of the Nutrition & Meal Price Calculator (pure functions, used in
 * the browser and by research/tools/calculator-test.cjs).
 * docs/tools/NUTRITION_CALCULATOR_DATA_RULES.md §4-6.
 *
 * Rules:
 * - total = per-serving value x quantity, added up over the meal;
 * - a missing value is never zero: the item is left out, the total is marked
 *   incomplete and the item is named;
 * - "less than n" counts as n and marks the total as an upper bound (≤);
 * - calorie ranges stay ranges (min and max are added separately).
 */
import type { CalcAmount, CalcChoice } from "./calculator-data";

export type MealLine = { name: string; choice: Pick<CalcChoice, "price" | "calories" | "nutrition" | "label">; qty: number };

export type Total = {
  /** Sum of the known values (lower bound for ranges). */
  value: number;
  /** Upper end when at least one value is a range; equals `value` otherwise. */
  max: number;
  /** True when a "less than" value was counted at its upper limit. */
  upperBound: boolean;
  /** Names of the items without a value, with their version (incomplete when not empty). */
  missing: string[];
  /** The same items by dish name only, each once (for short explanations). */
  missingNames: string[];
  /** Number of lines that contributed a value. */
  known: number;
};

export type NutrientKey = "protein" | "carbs" | "fat" | "sodium";

export type MealTotals = {
  /** Total quantity. */
  items: number;
  /** Number of meal lines (different items or versions). */
  lines: number;
  price: Total;
  calories: Total;
  nutrients: Record<NutrientKey, Total>;
};

const empty = (): Total => ({ value: 0, max: 0, upperBound: false, missing: [], missingNames: [], known: 0 });

function markMissing(total: Total, label: string, dish: string) {
  total.missing.push(label);
  if (!total.missingNames.includes(dish)) total.missingNames.push(dish);
}

/** Rounds money and nutrient sums so 0.1 + 0.2 style float noise never shows. */
const round2 = (n: number) => Math.round(n * 100) / 100;

function addAmount(total: Total, amount: CalcAmount | null, qty: number, name: string, dish: string) {
  if (amount === null) {
    markMissing(total, name, dish);
    return;
  }
  const n = typeof amount === "number" ? amount : amount.lt;
  if (typeof amount !== "number") total.upperBound = true;
  total.value = round2(total.value + n * qty);
  total.max = total.value;
  total.known += 1;
}

export function mealTotals(lines: MealLine[]): MealTotals {
  const price = empty();
  const calories = empty();
  const nutrients: Record<NutrientKey, Total> = { protein: empty(), carbs: empty(), fat: empty(), sodium: empty() };
  let items = 0;
  let count = 0;
  for (const line of lines) {
    if (!(line.qty > 0)) continue;
    items += line.qty;
    count += 1;
    const name = `${line.name} (${line.choice.label})`;

    if (line.choice.price === null) markMissing(price, name, line.name);
    else {
      price.value = round2(price.value + line.choice.price * line.qty);
      price.max = price.value;
      price.known += 1;
    }

    if (line.choice.calories === null) markMissing(calories, name, line.name);
    else {
      calories.value += line.choice.calories[0] * line.qty;
      calories.max += line.choice.calories[1] * line.qty;
      calories.known += 1;
    }

    for (const key of Object.keys(nutrients) as NutrientKey[]) {
      addAmount(nutrients[key], line.choice.nutrition ? line.choice.nutrition[key] : null, line.qty, name, line.name);
    }
  }
  return { items, lines: count, price, calories, nutrients };
}

export const isComplete = (t: Total) => t.missing.length === 0;
