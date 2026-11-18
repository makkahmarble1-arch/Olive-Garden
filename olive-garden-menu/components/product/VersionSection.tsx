import SectionHeading from "@/components/ui/SectionHeading";
import { formatMonthYear, formatNumber, formatPrice } from "@/lib/format";
import type { ProductPageData } from "@/lib/product-pages";
import type { NutrientAmount, NutrientKey } from "@/lib/types";
import { tableCaptionClass, tableCellClass, tableHeadCellClass, tableHeadClass, tableRowClass, tableWrapClass } from "@/components/menu/table-styles";
import { ALLERGEN_LABELS } from "./AllergenSection";
import VersionSelector, { type VersionView } from "./VersionSelector";

const MACROS: { key: NutrientKey; label: string; unit: string }[] = [
  { key: "totalFat", label: "Fat", unit: "g" },
  { key: "sodium", label: "Sodium", unit: "mg" },
  { key: "totalCarbohydrates", label: "Carbs", unit: "g" },
  { key: "protein", label: "Protein", unit: "g" },
];
const DETAILS: { key: NutrientKey; label: string; unit: string; indent?: boolean }[] = [
  { key: "caloriesFromFat", label: "Calories from fat", unit: "" },
  { key: "saturatedFat", label: "Saturated fat", unit: "g", indent: true },
  { key: "transFat", label: "Trans fat", unit: "g", indent: true },
  { key: "cholesterol", label: "Cholesterol", unit: "mg" },
  { key: "dietaryFiber", label: "Dietary fiber", unit: "g", indent: true },
  { key: "sugars", label: "Sugars", unit: "g", indent: true },
];

/** Printed value: "49 g", "Less than 1 g", or "Not listed" (never shown as zero). */
function printed(value: NutrientAmount | null | undefined, unit: string): string {
  if (value === null || value === undefined) return "Not listed";
  const u = unit ? ` ${unit}` : "";
  return typeof value === "number" ? `${formatNumber(value)}${u}` : `Less than ${formatNumber(value.lessThan)}${u}`;
}

/**
 * "Versions" section of a version-aware menu item page (Phase 4, owner
 * approval 2026-11-18; docs/product-pages/PRODUCT_PAGE_DESIGN.md §4a).
 * An interactive selector for each officially listed version plus a
 * server-rendered comparison table of all versions (works without JavaScript
 * and keeps every value in the HTML). Each version shows only its own
 * official rows; a version without a nutrition row shows calories only.
 */
export default function VersionSection({ data }: { data: ProductPageData }) {
  const { page, primary, versions } = data;
  if (versions.length < 2) return null;
  const unit = page.unitLabel ?? "order";
  const name = primary.displayName;

  const views: VersionView[] = versions.map((v) => {
    const row = v.nutrition?.row;
    const arow = v.allergens?.row;
    const sources = [
      row && v.nutrition ? `U.S. Nutrition Information (${v.nutrition.document.versionCode}), page ${row.page}, “${row.label}”` : "Calories: Olive Garden online menu",
      arow && v.allergens ? `U.S. Allergen Guide, page ${arow.page}, “${arow.label}”` : "Allergens: not listed separately in the guide",
    ].filter(Boolean);
    const checked = v.nutrition?.document.receivedAt ?? v.allergens?.document.receivedAt;
    return {
      key: v.key,
      label: v.label,
      shortLabel: v.shortLabel,
      description: v.description,
      price: formatPrice(v.price),
      calories: formatNumber(v.calories),
      share: Math.round((v.calories / 2000) * 100),
      macros: row ? MACROS.map((m) => ({ label: m.label, value: printed(row.values[m.key], m.unit) })) : null,
      details: row ? DETAILS.map((d) => ({ label: d.label, value: printed(row.values[d.key], d.unit), indent: d.indent })) : [],
      contains: arow ? arow.contains.map((id) => ALLERGEN_LABELS[id]) : [],
      prep: arow ? [arow.prep.friedInSoyOil && "Fried in soy oil", arow.prep.grilled && "Grilled"].filter((x): x is string => Boolean(x)) : [],
      allergensListed: Boolean(arow),
      source: `Official: ${sources.join(" · ")}${checked ? `. Checked ${formatMonthYear(checked)}` : ""}.`,
    };
  });

  return (
    <section aria-labelledby="versions" className="mt-14">
      <SectionHeading
        id="versions"
        title={`${name} Versions`}
        intro={`Olive Garden lists ${versions.length} versions of this dish, each with its own price, calories and allergen marks. Pick one to see its official values.`}
      />
      <VersionSelector versions={views} unit={unit} />

      <h3 className="mt-8 font-display text-xl font-bold text-ink sm:text-2xl">All versions at a glance</h3>
      <div className={`relative mt-4 ${tableWrapClass}`} tabIndex={0} role="region" aria-label={`${name}: all versions`}>
        <table className="w-full min-w-[34rem] border-collapse text-left">
          <caption className={tableCaptionClass}>{name}: price, calories, protein, sodium and allergens per version</caption>
          <thead className={tableHeadClass}>
            <tr>
              <th scope="col" className={tableHeadCellClass}>Version</th>
              <th scope="col" className={`${tableHeadCellClass} text-right`}>Price</th>
              <th scope="col" className={`${tableHeadCellClass} text-right`}>Calories</th>
              <th scope="col" className={`${tableHeadCellClass} text-right`}>Protein</th>
              <th scope="col" className={`${tableHeadCellClass} text-right`}>Sodium</th>
              <th scope="col" className={tableHeadCellClass}>Contains</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {versions.map((v, i) => {
              const row = v.nutrition?.row;
              return (
                <tr key={v.key} className={i === 0 ? "border-t border-line bg-kcal-bg" : tableRowClass}>
                  <th scope="row" className={`${tableCellClass} font-semibold text-ink`}>
                    {v.label}
                    {i === 0 && <span className="ml-2 rounded bg-kcal-text px-1.5 py-0.5 text-[0.7rem] font-semibold whitespace-nowrap text-white">Default</span>}
                  </th>
                  <td className={`${tableCellClass} text-right font-semibold whitespace-nowrap text-brand-dark tabular-nums`}>{formatPrice(v.price)}</td>
                  <td className={`${tableCellClass} text-right whitespace-nowrap tabular-nums`}>{formatNumber(v.calories)}</td>
                  <td className={`${tableCellClass} text-right whitespace-nowrap tabular-nums`}>{row ? printed(row.values.protein, "g") : "Not listed"}</td>
                  <td className={`${tableCellClass} text-right whitespace-nowrap tabular-nums`}>{row ? printed(row.values.sodium, "mg") : "Not listed"}</td>
                  <td className={`${tableCellClass} text-muted`}>
                    {v.allergens ? v.allergens.row.contains.map((id) => ALLERGEN_LABELS[id].toLowerCase()).join(", ") || "None marked" : "Not listed"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs leading-5 text-muted">
        Online pickup prices. Calories and nutrients are per {unit} as served, from Olive Garden’s official U.S. guides. “Default” is the
        version used in the summary at the top of this page and in the nutrition and allergen sections below. Prices may vary by location across the USA.
      </p>
    </section>
  );
}
