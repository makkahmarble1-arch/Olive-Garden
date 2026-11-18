import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { getMenuCategory, menuCategoryPath } from "@/lib/content";
import { formatNumber, formatPrice } from "@/lib/format";
import type { ProductPageData } from "@/lib/product-pages";
import type { MenuOffering } from "@/lib/types";
import {
  tableCaptionClass,
  tableCellClass,
  tableClass,
  tableHeadCellClass,
  tableHeadClass,
  tableRowClass,
  tableWrapClass,
} from "@/components/menu/table-styles";
import Icon from "./icons";

const dash = (text: string) => text.replace(/(\d)-(\d)/g, "$1–$2");

/** Calculated per-piece and per-guest values from the official serving text ("30 pieces, serves 4-6"). */
function perUnit(offering: MenuOffering): string[] {
  const price = offering.prices[0]?.amount;
  const text = offering.servingSize ?? "";
  const out: string[] = [];
  const pieces = Number(text.match(/(\d+)\s*pieces/i)?.[1]);
  if (pieces && offering.calories !== null) out.push(`${formatNumber(Math.round(offering.calories / pieces))} Cal per piece`);
  if (pieces && price !== undefined) out.push(`${formatPrice(price / pieces)} per piece`);
  const serves = text.match(/serves\s*(\d+)\s*-\s*(\d+)/i);
  if (serves && price !== undefined) out.push(`${formatPrice(price / Number(serves[2]))}–${formatPrice(price / Number(serves[1]))} per guest`);
  return out;
}

/**
 * Serving and customization (docs/product-pages/PRODUCT_PAGE_DESIGN.md §7):
 * what comes with the item, verified customizations (card omitted when none
 * are verified), an optional extra-sauce card, and a sizes table
 * (restaurant order vs catering tray) read from the shared offerings, with
 * labeled calculations.
 */
export default function ServingSection({ data }: { data: ProductPageData }) {
  const { page, primary, sizes, extraSauce } = data;
  const rows = [primary, ...sizes];
  const extraCategory = extraSauce ? getMenuCategory(extraSauce.categoryId) : undefined;
  const hasIncludes = page.includes.length > 0;
  const hasCustom = (page.customizations?.items.length ?? 0) > 0;
  const hasExtra = Boolean(extraSauce && extraSauce.prices[0]);
  const cardCount = [hasIncludes, hasCustom, hasExtra].filter(Boolean).length;
  const gridCols = cardCount >= 3 ? "md:grid-cols-3" : cardCount === 2 ? "md:grid-cols-2" : "md:max-w-md";
  // Size/pack options of the primary offering (e.g. 6 or 12 breadsticks).
  // Version-aware pages show their versions in the Versions section instead.
  const options = data.versions.length > 0 ? [] : primary.options.filter((o) => o.price !== null);
  const unit = page.unitLabel ?? "order";

  return (
    <section aria-labelledby="serving" className="mt-14">
      <SectionHeading id="serving" title={hasIncludes ? "Serving Size, Sauce and Sizes" : "Sizes and Prices"} />

      {cardCount > 0 && (
      <div className={`mt-6 grid gap-5 ${gridCols}`}>
        {hasIncludes && (
        <div className="rounded-3xl border border-card-border bg-header-cream p-5 sm:p-6">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold text-hero-deep">
            <span className="grid size-9 place-items-center rounded-xl bg-hero-highlight">
              <Icon name="cup" />
            </span>
            What comes with it
          </h3>
          <ul className="mt-4 space-y-3">
            {page.includes.map((item) => (
              <li key={item.label} className="text-sm leading-6">
                <span className="flex flex-wrap items-center gap-2 font-semibold text-ink">
                  {item.label}
                  {item.calories !== null && (
                    <span className="rounded-full bg-kcal-bg px-2 py-0.5 text-xs font-semibold text-kcal-text">+{formatNumber(item.calories)} Cal</span>
                  )}
                </span>
                <span className="text-muted">{item.detail}</span>
              </li>
            ))}
          </ul>
        </div>
        )}

        {page.customizations && page.customizations.items.length > 0 && (
          <div className="rounded-3xl border border-card-border bg-white p-5 sm:p-6">
            <h3 className="flex items-center gap-2 font-display text-lg font-bold text-hero-deep">
              <span className="grid size-9 place-items-center rounded-xl bg-brand-tint text-brand-darker">
                <Icon name="spark" />
              </span>
              Customization
            </h3>
            <ul className="mt-4 space-y-2 text-sm leading-6">
              {page.customizations.items.map((c) => (
                <li key={c.label}>
                  <strong className="font-semibold text-ink">{c.label}:</strong> <span className="text-muted">{c.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {extraSauce && extraSauce.prices[0] && (
          <div className="rounded-3xl border border-card-border bg-white p-5 sm:p-6">
            <h3 className="flex items-center gap-2 font-display text-lg font-bold text-hero-deep">
              <span className="grid size-9 place-items-center rounded-xl bg-kcal-bg text-kcal-text">
                <Icon name="plate" />
              </span>
              Want more sauce?
            </h3>
            <p className="mt-4 text-sm leading-6 text-ink">
              <strong className="font-semibold">{extraSauce.displayName}</strong> is sold separately
              {extraCategory ? ` on the ${extraCategory.name.toLowerCase()} menu` : ""}.
            </p>
            <p className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-lg font-bold text-brand-dark tabular-nums">{formatPrice(extraSauce.prices[0].amount)}</span>
              {extraSauce.calories !== null && (
                <span className="rounded-full bg-kcal-bg px-2 py-0.5 text-xs font-semibold text-kcal-text tabular-nums">
                  {formatNumber(extraSauce.calories)} Cal
                </span>
              )}
            </p>
            {extraCategory && (
              <Link
                href={menuCategoryPath(extraCategory.slug)}
                className="mt-2 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-brand-dark underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-brand-dark"
              >
                See {extraCategory.name} <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
        )}
      </div>
      )}

      {options.length > 0 && (
        <div className={`relative mt-6 ${tableWrapClass}`} tabIndex={0} role="region" aria-label={`${primary.displayName} pack sizes`}>
          <table className="w-full border-collapse text-left text-sm">
            <caption className={tableCaptionClass}>{primary.displayName}: pack sizes and prices</caption>
            <thead className={tableHeadClass}>
              <tr>
                <th scope="col" className="px-3 py-3 font-semibold sm:px-4">
                  Option
                </th>
                <th scope="col" className={`px-3 py-3 font-semibold sm:px-4 text-right`}>
                  Price
                </th>
                <th scope="col" className={`px-3 py-3 font-semibold sm:px-4 text-right`}>
                  Calories
                </th>
                <th scope="col" className={`px-3 py-3 font-semibold sm:px-4 text-right`}>
                  <span aria-hidden="true">Each</span>
                  <span className="sr-only">Price per {unit}</span> <span className="font-normal">(Calc.)</span>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {options.map((o) => {
                const count = Number(o.label.match(/^(\d+)\s/)?.[1]);
                return (
                  <tr key={o.label} className={tableRowClass}>
                    <th scope="row" className={`px-3 py-2.5 sm:px-4 sm:py-3 font-semibold text-ink`}>
                      {o.label}
                    </th>
                    <td className={`px-3 py-2.5 sm:px-4 sm:py-3 text-right font-semibold whitespace-nowrap text-brand-dark tabular-nums`}>
                      {formatPrice(o.price as number)}
                    </td>
                    <td className={`px-3 py-2.5 sm:px-4 sm:py-3 text-right tabular-nums`}>
                      {o.calories !== null ? formatNumber(o.calories) : "—"}
                      {o.caloriesBasis === "calculated" && o.caloriesFormula && (
                        <span className="block text-xs text-muted">Calc. {o.caloriesFormula}</span>
                      )}
                    </td>
                    <td className={`px-3 py-2.5 sm:px-4 sm:py-3 text-right text-muted tabular-nums`}>
                      {count ? formatPrice((o.price as number) / count) : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {options.length > 0 && (
        <p className="mt-2 text-xs leading-5 text-muted">
          Online pickup prices. Pack calories are our calculation from Olive Garden’s official value per {unit}.
        </p>
      )}

      {sizes.length > 0 && (
        <div className={`relative mt-6 ${tableWrapClass}`} tabIndex={0} role="region" aria-label={`${primary.displayName} sizes`}>
          <table className={tableClass}>
            <caption className={tableCaptionClass}>
              {primary.displayName}:{" "}
              {sizes.every((s) => s.portionType === "catering") ? "restaurant order vs catering tray" : "sizes and versions"}
            </caption>
            <thead className={tableHeadClass}>
              <tr>
                <th scope="col" className={tableHeadCellClass}>
                  Version
                </th>
                <th scope="col" className={tableHeadCellClass}>
                  Size
                </th>
                <th scope="col" className={`${tableHeadCellClass} text-right`}>
                  Price
                </th>
                <th scope="col" className={`${tableHeadCellClass} text-right`}>
                  Calories
                </th>
                <th scope="col" className={tableHeadCellClass}>
                  Per piece / guest <span className="font-normal">(Calc.)</span>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {rows.map((o) => {
                const cat = getMenuCategory(o.categoryId);
                const calc = perUnit(o);
                return (
                  <tr key={o.id} className={tableRowClass}>
                    <th scope="row" className={`${tableCellClass} font-semibold text-ink`}>
                      {cat ? (
                        <Link href={menuCategoryPath(cat.slug)} className="text-brand-dark underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-brand-dark">
                          {cat.name}
                        </Link>
                      ) : (
                        o.displayName
                      )}
                    </th>
                    <td className={tableCellClass}>{o.servingSize ? dash(o.servingSize) : "Not stated"}</td>
                    <td className={`${tableCellClass} text-right font-semibold whitespace-nowrap text-brand-dark tabular-nums`}>
                      {o.prices[0] ? formatPrice(o.prices[0].amount) : "Not listed"}
                    </td>
                    <td className={`${tableCellClass} text-right whitespace-nowrap tabular-nums`}>
                      {o.calories !== null ? formatNumber(o.calories) : "Not listed"}
                    </td>
                    <td className={`${tableCellClass} text-muted`}>{calc.length > 0 ? calc.join(" · ") : (o.portionType === "regular" && /appetizer/i.test(o.servingSize ?? "")) ? "Piece count not stated" : "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {sizes.length > 0 && (
        <p className="mt-2 text-xs leading-5 text-muted">
          {`Calories are totals for each version as served${page.includes.length > 0 ? ", without dipping sauce" : ""}. “Calc.” values are our calculations from Olive Garden’s official price, calories and serving size.`}
        </p>
      )}
    </section>
  );
}
