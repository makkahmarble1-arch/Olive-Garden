/**
 * Central official nutrition and allergen data (content/menu/nutrition/).
 * - nutrition-guide.ts / allergen-guide.ts: every official row once, with its PDF page.
 * - offering-map.ts: which row describes each of the 231 offerings, with a status.
 * Any page (item pages now; homepage, category and guide pages later) reads the
 * same rows, so nothing is duplicated. docs/product-pages/NUTRITION_ALLERGEN_DATA.md.
 */
import { officialDocuments } from "@/content/menu/nutrition/documents";
import { nutritionGuideRows } from "@/content/menu/nutrition/nutrition-guide";
import { allergenGuideRows } from "@/content/menu/nutrition/allergen-guide";
import { offeringAllergenMap, offeringNutritionMap } from "@/content/menu/nutrition/offering-map";
import { menuOfferings } from "@/content/menu/offerings";
import type {
  AllergenMapping,
  NutrientAmount,
  NutrientKey,
  NutritionGuideRow,
  NutritionMapping,
  OfferingAllergens,
  OfferingNutrition,
  OfficialDocument,
  OfficialDocumentId,
} from "./types";

const nutritionById = new Map(nutritionGuideRows.map((r) => [r.id, r]));
const allergenById = new Map(allergenGuideRows.map((r) => [r.id, r]));

export function getOfficialDocument(id: OfficialDocumentId): OfficialDocument {
  const doc = officialDocuments.find((d) => d.id === id);
  if (!doc) throw new Error(`Unknown official document "${id}".`);
  return doc;
}

export function getNutritionRow(id: string): NutritionGuideRow | undefined {
  return nutritionById.get(id);
}

export function getNutritionMapping(offeringId: string): NutritionMapping | undefined {
  return offeringNutritionMap[offeringId];
}

export function getAllergenMapping(offeringId: string): AllergenMapping | undefined {
  return offeringAllergenMap[offeringId];
}

/** Rows that can be shown as this offering's official values. */
const SHOWABLE = new Set(["exact", "same-item"]);

/** Official nutrition for an offering, only when its row describes exactly that item. */
export function getOfferingNutrition(offeringId: string): OfferingNutrition | undefined {
  const mapping = offeringNutritionMap[offeringId];
  if (!mapping?.rowId || !SHOWABLE.has(mapping.status)) return undefined;
  const row = nutritionById.get(mapping.rowId);
  if (!row) return undefined;
  const addOns = nutritionGuideRows.filter((r) => r.addOnFor === row.id);
  return { mapping, row, addOns, document: getOfficialDocument("us-nutrition-guide") };
}

/** Official allergen marks for an offering, only when its row describes exactly that item. */
export function getOfferingAllergens(offeringId: string): OfferingAllergens | undefined {
  const mapping = offeringAllergenMap[offeringId];
  if (!mapping?.rowId || !SHOWABLE.has(mapping.status)) return undefined;
  const row = allergenById.get(mapping.rowId);
  if (!row) return undefined;
  return { mapping, row, document: getOfficialDocument("us-allergen-guide") };
}

/** Official nutrition for one version row of an item (version-aware item pages). */
export function getNutritionForRow(rowId: string): OfferingNutrition | undefined {
  const row = nutritionById.get(rowId);
  if (!row) return undefined;
  const addOns = nutritionGuideRows.filter((r) => r.addOnFor === row.id);
  return { mapping: { status: "exact", rowId, note: "Version row" }, row, addOns, document: getOfficialDocument("us-nutrition-guide") };
}

/** Official allergen marks for one version row of an item (version-aware item pages). */
export function getAllergensForRow(rowId: string): OfferingAllergens | undefined {
  const row = allergenById.get(rowId);
  if (!row) return undefined;
  return { mapping: { status: "exact", rowId, note: "Version row" }, row, document: getOfficialDocument("us-allergen-guide") };
}

/** "less than 1" style values compare by their upper bound. */
const upper = (v: NutrientAmount | null): number | null => (v === null ? null : typeof v === "number" ? v : v.lessThan);

/* ---------- Build check (runs on every dev start and build) ---------- */

export function validateNutritionData(): string[] {
  const issues: string[] = [];
  const ids = new Set<string>();
  for (const r of nutritionGuideRows) {
    if (ids.has(r.id)) issues.push(`nutrition row "${r.id}": duplicate id.`);
    ids.add(r.id);
    if (r.addOnFor && !nutritionById.has(r.addOnFor)) issues.push(`nutrition row "${r.id}": unknown parent "${r.addOnFor}".`);
    if (!Number.isFinite(r.values.calories) || r.values.calories < 0) issues.push(`nutrition row "${r.id}": invalid calories.`);
    const v = r.values;
    for (const [key, value] of Object.entries(v) as [NutrientKey, NutrientAmount | null][]) {
      const n = upper(value);
      if (n !== null && (n < 0 || !Number.isFinite(n))) issues.push(`nutrition row "${r.id}": ${key} is not a valid amount.`);
    }
    const over = (part: NutrientKey, whole: NutrientKey) => {
      const a = v[part], b = v[whole];
      return typeof a === "number" && typeof b === "number" && a > b;
    };
    if (over("saturatedFat", "totalFat") || over("transFat", "totalFat")) issues.push(`nutrition row "${r.id}": fat sub-value larger than total fat.`);
    if (over("dietaryFiber", "totalCarbohydrates") || over("sugars", "totalCarbohydrates")) issues.push(`nutrition row "${r.id}": carbohydrate sub-value larger than total.`);
  }

  for (const o of menuOfferings) {
    const nm = offeringNutritionMap[o.id];
    const am = offeringAllergenMap[o.id];
    if (!nm) issues.push(`offering "${o.id}": missing in offeringNutritionMap (every offering needs a status).`);
    if (!am) issues.push(`offering "${o.id}": missing in offeringAllergenMap (every offering needs a status).`);
    if (nm) {
      for (const id of [nm.rowId, ...(nm.variantRowIds ?? [])].filter(Boolean) as string[]) {
        if (!nutritionById.has(id)) issues.push(`offering "${o.id}": unknown nutrition row "${id}".`);
      }
      const row = nm.rowId ? nutritionById.get(nm.rowId) : undefined;
      // Exact/same-item rows must agree with the calories shown on the site; a
      // difference must be recorded as "conflict" (owner decision), never hidden.
      if (row && SHOWABLE.has(nm.status) && o.calories !== null && row.values.calories !== o.calories) {
        issues.push(`offering "${o.id}": official row "${row.id}" has ${row.values.calories} calories but our data shows ${o.calories}; mark it "conflict" and resolve it.`);
      }
      if (["exact", "same-item", "conflict"].includes(nm.status) && !nm.rowId) issues.push(`offering "${o.id}": status "${nm.status}" needs rowId.`);
    }
    if (am?.rowId && !allergenById.has(am.rowId)) issues.push(`offering "${o.id}": unknown allergen row "${am.rowId}".`);
    if (am && ["exact", "same-item"].includes(am.status) && !am.rowId) issues.push(`offering "${o.id}": allergen status "${am.status}" needs rowId.`);
  }
  for (const id of Object.keys(offeringNutritionMap)) if (!menuOfferings.some((o) => o.id === id)) issues.push(`offeringNutritionMap: unknown offering "${id}".`);
  for (const id of Object.keys(offeringAllergenMap)) if (!menuOfferings.some((o) => o.id === id)) issues.push(`offeringAllergenMap: unknown offering "${id}".`);

  for (const d of officialDocuments) {
    if (d.status !== "not-received" && (!d.receivedAt || !d.versionCode)) issues.push(`document "${d.id}": received documents need receivedAt and versionCode.`);
  }
  return issues;
}

const nutritionIssues = validateNutritionData();
if (nutritionIssues.length > 0) {
  throw new Error(`Nutrition/allergen data check failed:\n- ${nutritionIssues.join("\n- ")}`);
}
