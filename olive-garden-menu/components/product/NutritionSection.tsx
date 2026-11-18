import SectionHeading from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site";
import { formatMonthYear, formatNumber, formatPrice } from "@/lib/format";
import type { ProductPageData } from "@/lib/product-pages";
import type { NutrientAmount, NutrientKey } from "@/lib/types";
import {
  tableCaptionClass,
  tableCellClass,
  tableHeadCellClass,
  tableHeadClass,
  tableRowClass,
  tableWrapClass,
} from "@/components/menu/table-styles";
import Icon, { type IconName } from "./icons";

/** Short-column tables that fit a 320 px phone without sideways scrolling. */
const FIT_TABLE = "w-full border-collapse text-left";

/** Columns of the official guide, in printed order (calories come first, separately). */
const NUTRIENTS: { key: NutrientKey; label: string; unit: "" | "g" | "mg"; indent?: boolean }[] = [
  { key: "caloriesFromFat", label: "Calories from fat", unit: "" },
  { key: "totalFat", label: "Total fat", unit: "g" },
  { key: "saturatedFat", label: "Saturated fat", unit: "g", indent: true },
  { key: "transFat", label: "Trans fat", unit: "g", indent: true },
  { key: "cholesterol", label: "Cholesterol", unit: "mg" },
  { key: "sodium", label: "Sodium", unit: "mg" },
  { key: "totalCarbohydrates", label: "Total carbohydrates", unit: "g" },
  { key: "dietaryFiber", label: "Dietary fiber", unit: "g", indent: true },
  { key: "sugars", label: "Sugars", unit: "g", indent: true },
  { key: "protein", label: "Protein", unit: "g" },
];

/** The four summary cards (colorful tiles, values as printed). */
const MACRO_CARDS: { key: NutrientKey; label: string; unit: "g" | "mg"; icon: IconName; tone: string }[] = [
  { key: "totalFat", label: "Total fat", unit: "g", icon: "spark", tone: "bg-kcal-bg text-kcal-text" },
  { key: "sodium", label: "Sodium", unit: "mg", icon: "info", tone: "bg-brand-tint text-brand-darker" },
  { key: "totalCarbohydrates", label: "Carbs", unit: "g", icon: "leaf", tone: "bg-hero-highlight text-hero-deep" },
  { key: "protein", label: "Protein", unit: "g", icon: "plate", tone: "bg-brand-dark text-white" },
];

/** General daily reference that Olive Garden's own nutrition guide mentions (not personal advice). */
const DAILY_REFERENCE = 2000;

/** "49 g", "Less than 1 g", or "—" when the guide prints nothing (never shown as zero). */
function amount(value: NutrientAmount | null | undefined, unit: string): string {
  if (value === null || value === undefined) return "—";
  const u = unit ? ` ${unit}` : "";
  return typeof value === "number" ? `${formatNumber(value)}${u}` : `Less than ${formatNumber(value.lessThan)}${u}`;
}

/** Table cell: "<1 g" on phones and "Less than 1 g" from sm up (screen readers always hear the full words). */
function Amount({ value, unit }: { value: NutrientAmount | null | undefined; unit: string }) {
  if (value === null || value === undefined) {
    return (
      <>
        <span aria-hidden="true">—</span>
        <span className="sr-only">Not listed</span>
      </>
    );
  }
  if (typeof value === "number") return <>{amount(value, unit)}</>;
  const u = unit ? ` ${unit}` : "";
  return (
    <>
      <span aria-hidden="true" className="sm:hidden">
        &lt;{formatNumber(value.lessThan)}
        {u}
      </span>
      <span className="max-sm:sr-only">{amount(value, unit)}</span>
    </>
  );
}

/** Compact cells so the 3-column table fits a 320 px phone. */
const CELL = "px-3 py-2.5 sm:px-4 sm:py-3";
const HEAD_CELL = "px-3 py-3 font-semibold sm:px-4";

function Basis({ calculated }: { calculated?: boolean }) {
  return calculated ? (
    <span className="rounded bg-brand-tint px-1.5 py-0.5 text-xs font-semibold text-brand-darker">Calc.</span>
  ) : (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-dark">
      <Icon name="check" className="size-3.5" />
      Official
    </span>
  );
}

/**
 * Nutrition section (docs/product-pages/PRODUCT_PAGE_DESIGN.md §5): calorie
 * spotlight (with the official included-sauce row and a labeled calculated
 * total), four macro cards and the complete official nutrition table, with a
 * column per included sauce ("add marinara"). Values come only from the
 * central official row (content/menu/nutrition/); without one, only calories
 * are shown and the missing values are named, never estimated. Ends with a
 * calories/price comparison against similar items.
 */
export default function NutritionSection({ data }: { data: ProductPageData }) {
  const { page, primary, calories, compare, nutrition } = data;
  const name = primary.displayName;
  const row = nutrition?.row;
  const addOns = nutrition?.addOns ?? [];
  const sauceName = (label: string) => label.replace(/^add /i, "").replace(/^./, (c) => c.toUpperCase());
  // "add ..." rows that the page lists as included (sauces served with it) vs optional extras (e.g. add broccoli).
  const isIncluded = (label: string) =>
    page.includes.some((i) => label.toLowerCase().includes(i.label.toLowerCase().replace(/ sauce$/, "")));
  const included = addOns.filter((a) => isIncluded(a.label));
  const colLabel = (label: string) => `+ ${sauceName(label)}${isIncluded(label) ? "" : " (optional)"}`;
  const withAddOns = calories + included.reduce((sum, a) => sum + a.values.calories, 0);
  const share = Math.round((calories / DAILY_REFERENCE) * 100);
  const maxCompare = Math.max(...compare.map((o) => o.calories ?? 0), 1);
  const basis = page.nutrition.servingBasis;
  const unit = page.unitLabel ?? "order";

  return (
    <section aria-labelledby="nutrition" className="mt-14">
      <SectionHeading
        id="nutrition"
        title={`${name} Nutrition Facts`}
        intro={`Values for ${basis.charAt(0).toLowerCase()}${basis.slice(1)}, from Olive Garden’s official U.S. nutrition guide.`}
      />

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* Calorie spotlight */}
        <div className="rounded-3xl border border-kcal-text/15 bg-kcal-bg p-5 sm:p-6 lg:self-start">
          <p className="flex items-center gap-2 text-sm font-semibold tracking-wide text-kcal-text uppercase">
            <Icon name="flame" className="size-5" />
            Calories per {unit}
          </p>
          <p className="mt-2 font-display text-5xl leading-none font-bold text-kcal-text tabular-nums">{formatNumber(calories)}</p>
          <div className="mt-5">
            <div className="h-3 overflow-hidden rounded-full bg-white/80 ring-1 ring-kcal-text/15" aria-hidden="true">
              <div className="h-full rounded-full bg-kcal-bar" style={{ width: `${Math.min(share, 100)}%` }} />
            </div>
            <p className="mt-2 text-sm leading-6 text-ink">
              About <strong className="font-semibold">{share}%</strong> of a {formatNumber(DAILY_REFERENCE)}-calorie day{" "}
              <span className="text-muted">(Calc.)</span>. Olive Garden’s nutrition guide uses 2,000 calories a day for
              general nutrition advice; calorie needs vary.
            </p>
          </div>
          {addOns.length > 0 && (
            <dl className="mt-5 space-y-2 border-t border-kcal-text/15 pt-4 text-sm">
              {addOns.map((a) => (
                <div key={a.id} className="flex items-center justify-between gap-3">
                  <dt className="text-ink">{colLabel(a.label)}</dt>
                  <dd className="font-semibold text-kcal-text tabular-nums">{formatNumber(a.values.calories)} Cal</dd>
                </div>
              ))}
              {included.length > 0 && (
                <div className="flex items-center justify-between gap-3 rounded-xl bg-white/80 px-3 py-2">
                  <dt className="font-semibold text-ink">
                    {included.length > 1 ? "With both sauces" : "With sauce"} <span className="font-normal text-muted">(Calc.)</span>
                  </dt>
                  <dd className="font-bold text-kcal-text tabular-nums">{formatNumber(withAddOns)} Cal</dd>
                </div>
              )}
            </dl>
          )}
        </div>

        <div className="flex min-w-0 flex-col gap-5">
          {row && (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label={`Key nutrients per ${unit}`}>
              {MACRO_CARDS.map((card) => (
                <li key={card.key} className="flex flex-col items-center gap-2 rounded-2xl border border-card-border bg-white p-3.5 text-center shadow-[0_6px_18px_-14px_rgba(40,55,15,0.5)]">
                  <span className={`grid size-9 place-items-center rounded-xl ${card.tone}`}>
                    <Icon name={card.icon} className="size-5" />
                  </span>
                  <span className="font-display text-2xl leading-7 font-bold text-hero-deep tabular-nums">
                    {typeof row.values[card.key] === "number" ? (
                      <>
                        {formatNumber(row.values[card.key] as number)}
                        <span className="ml-0.5 font-sans text-sm font-semibold text-muted">{card.unit}</span>
                      </>
                    ) : (
                      amount(row.values[card.key], card.unit)
                    )}
                  </span>
                  <span className="text-xs font-semibold tracking-wide text-muted uppercase">{card.label}</span>
                </li>
              ))}
            </ul>
          )}

          <div className={`relative ${tableWrapClass}`} tabIndex={0} role="region" aria-label={`${name} nutrition table`}>
            <table className={FIT_TABLE}>
              <caption className={tableCaptionClass}>{name} nutrition facts</caption>
              <thead className={tableHeadClass}>
                <tr>
                  <th scope="col" className={HEAD_CELL}>
                    Nutrient
                  </th>
                  <th scope="col" className={`${HEAD_CELL} text-right`}>
                    One {unit}
                  </th>
                  {row &&
                    addOns.map((a) => (
                      <th key={a.id} scope="col" className={`${HEAD_CELL} text-right`}>
                        {colLabel(a.label)}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className={tableRowClass}>
                  <th scope="row" className={`${CELL} font-semibold text-ink`}>
                    Calories
                  </th>
                  <td className={`${CELL} text-right min-[360px]:whitespace-nowrap font-semibold tabular-nums`}>{formatNumber(calories)}</td>
                  {row &&
                    addOns.map((a) => (
                      <td key={a.id} className={`${CELL} text-right min-[360px]:whitespace-nowrap font-semibold tabular-nums`}>
                        {formatNumber(a.values.calories)}
                      </td>
                    ))}
                </tr>
                {row &&
                  NUTRIENTS.map((n) => (
                    <tr key={n.key} className={tableRowClass}>
                      <th scope="row" className={`${CELL} font-medium text-ink ${n.indent ? "pl-6 sm:pl-8" : ""}`}>
                        {n.label}
                      </th>
                      <td className={`${CELL} text-right min-[360px]:whitespace-nowrap tabular-nums`}><Amount value={row.values[n.key]} unit={n.unit} /></td>
                      {addOns.map((a) => (
                        <td key={a.id} className={`${CELL} text-right min-[360px]:whitespace-nowrap tabular-nums`}>
                          <Amount value={a.values[n.key]} unit={n.unit} />
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {nutrition ? (
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-5 text-muted">
              <Basis />
              <span>
                Olive Garden U.S. Nutrition Information ({nutrition.document.versionCode}), page {nutrition.row.page}, row “
                {nutrition.row.label}”{addOns.length > 0 ? ` and its ${addOns.length > 1 ? "add-on rows" : "add-on row"}` : ""}. Checked{" "}
                {nutrition.document.receivedAt && (
                  <time dateTime={nutrition.document.receivedAt}>{formatMonthYear(nutrition.document.receivedAt)}</time>
                )}
                . “Less than” values are printed that way in the guide.
              </span>
            </p>
          ) : (
            <div role="note" className="flex gap-3 rounded-2xl border border-line bg-brand-tint p-4 text-sm leading-6 text-ink">
              <Icon name="info" className="mt-0.5 size-5 text-brand-dark" />
              <p>
                <strong className="font-semibold">Full breakdown not verified yet.</strong> Fat, sodium, carbohydrates,
                protein and the other values are listed in Olive Garden’s nutrition guide, but we have not entered them
                for this item, so we do not show numbers.{" "}
                <a
                  href={siteConfig.nutritionSource.url}
                  rel="nofollow noopener"
                  target="_blank"
                  className="font-medium text-brand-dark underline underline-offset-4 hover:text-brand-darker focus-visible:outline-2 focus-visible:outline-brand-dark"
                >
                  Open the official nutrition guide (PDF)
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                .
              </p>
            </div>
          )}
          {included.length > 0 && (
            <p className="flex items-center gap-2 text-xs leading-5 text-muted">
              <Basis calculated />
              With-sauce calories are our sum of the official rows.
            </p>
          )}
        </div>
      </div>

      {compare.length > 1 && (
        <div className="mt-8">
          <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">{page.compareHeading ?? "Compared with similar items"}</h3>
          <div className={`relative mt-4 ${tableWrapClass}`} tabIndex={0} role="region" aria-label="Calories and prices of similar items">
            <table className={FIT_TABLE}>
              <caption className="sr-only">Calories and prices per order, from fewest to most calories</caption>
              <thead className={tableHeadClass}>
                <tr>
                  <th scope="col" className={tableHeadCellClass}>
                    Item
                  </th>
                  <th scope="col" className={`${tableHeadCellClass} sm:w-full`}>
                    Calories
                  </th>
                  <th scope="col" className={`${tableHeadCellClass} text-right`}>
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {compare.map((o) => {
                  const self = o.productId === primary.productId;
                  const cal = o.calories ?? 0;
                  return (
                    <tr key={o.id} className={self ? "border-t border-line bg-kcal-bg" : tableRowClass}>
                      <th scope="row" className={`${tableCellClass} font-medium whitespace-nowrap text-ink`}>
                        {o.displayName}
                        {self && <span className="ml-2 rounded bg-kcal-text px-1.5 py-0.5 text-[0.7rem] font-semibold text-white">This item</span>}
                      </th>
                      <td className={tableCellClass}>
                        <span className="flex items-center gap-2">
                          <span aria-hidden="true" className="h-2.5 min-w-[1.5rem] flex-1 overflow-hidden rounded-full bg-line/70">
                            <span
                              className={`block h-full rounded-full ${self ? "bg-kcal-bar" : "bg-brand-dark/70"}`}
                              style={{ width: `${Math.round((cal / maxCompare) * 100)}%` }}
                            />
                          </span>
                          <span className="w-12 text-right font-semibold tabular-nums">{formatNumber(cal)}</span>
                        </span>
                      </td>
                      <td className={`${tableCellClass} text-right tabular-nums`}>{o.prices[0] ? formatPrice(o.prices[0].amount) : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs leading-5 text-muted">
            Calories are per order, without dipping sauces that Olive Garden lists separately. Online pickup prices. {siteConfig.locationNotice}
          </p>
        </div>
      )}
    </section>
  );
}
