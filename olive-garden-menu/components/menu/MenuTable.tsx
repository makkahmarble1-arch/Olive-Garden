import type { MenuItem } from "@/lib/types";
import { formatNumber, formatPrice } from "@/lib/format";
import VerificationBadge from "@/components/ui/VerificationBadge";
import RatingSummary from "@/components/rating/RatingSummary";

type MenuTableProps = {
  /** Visible table title, e.g. "Appetizer Prices and Calories". */
  caption: string;
  items: MenuItem[];
};

/** A value is shown only if it exists AND the item is verified (and still listed). */
function VerifiedValue({
  item,
  value,
  note,
  format,
}: {
  item: MenuItem;
  value: number | null;
  /** Meaningful note shown when there is no value (e.g. "Not published"). */
  note?: string | null;
  format: (n: number) => string;
}) {
  if (value === null && note) {
    return <span className="text-sm whitespace-normal text-muted">{note}</span>;
  }
  if (item.notListed) {
    return <VerificationBadge label="Not currently listed" />;
  }
  if (item.status !== "verified" || value === null) {
    return <VerificationBadge />;
  }
  return <>{format(value)}</>;
}

/** "800", or "70–490" for a range. */
function formatCalories(value: number, max: number | null | undefined): string {
  return max != null && max !== value ? `${formatNumber(value)}–${formatNumber(max)}` : formatNumber(value);
}

/** Small "per breadstick" style note under a shown calorie value. */
function CaloriesBasis({ item }: { item: MenuItem }) {
  if (item.notListed || item.calories === null) return null;
  const calculated = item.caloriesValueBasis === "calculated";
  if (!item.caloriesBasis && !calculated) return null;
  return (
    <span className="block text-xs whitespace-normal text-muted">
      {calculated && (
        <span className="font-semibold text-ink">
          Calculated{item.caloriesFormula ? `: ${item.caloriesFormula}` : ""}
          {item.caloriesBasis ? " · " : ""}
        </span>
      )}
      {item.caloriesBasis}
    </span>
  );
}

/**
 * Accessible, responsive price + calories table.
 * Phones (< 640px) get a stacked list (one card per item) instead of a wide
 * table; from 640px up a real <table> is shown. Only one is visible at a
 * time, so screen readers never read both.
 */
export default function MenuTable({ caption, items }: MenuTableProps) {
  // The rating column appears only when rows are real products.
  const showRatings = items.some((item) => item.productId);
  return (
    <>
      <div className="rounded-lg border border-line sm:hidden">
        <p className="px-4 py-3 font-display text-lg font-bold text-ink">
          {caption}
        </p>
        {items.length === 0 ? (
          <p className="border-t border-line px-4 py-6 text-center text-muted">
            No menu items have been added yet.
          </p>
        ) : (
          <ul>
            {items.map((item, index) => (
              <li
                key={`${item.name}-${index}`}
                className="border-t border-line px-4 py-3"
              >
                <p className="font-medium text-ink">{item.name}</p>
                {item.productId && (
                  <RatingSummary align="start" className="mt-1" productId={item.productId} itemName={item.name} />
                )}
                {item.servingSize && (
                  <p className="mt-0.5 text-sm text-muted">{item.servingSize}</p>
                )}
                {item.description && (
                  <p className="mt-1 text-sm text-muted">{item.description}</p>
                )}
                <dl className="mt-2 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-muted">Price</dt>
                    <dd className="mt-0.5 text-ink tabular-nums">
                      <VerifiedValue
                        item={item}
                        value={item.price}
                        note={item.priceNote}
                        format={formatPrice}
                      />
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted">Calories</dt>
                    <dd className="mt-0.5 text-ink tabular-nums">
                      <VerifiedValue
                        item={item}
                        value={item.calories}
                        note={item.caloriesNote}
                        format={(n) => formatCalories(n, item.caloriesMax)}
                      />
                      <CaloriesBasis item={item} />
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div
        role="region"
        aria-label={caption}
        tabIndex={0}
        className="hidden overflow-x-auto rounded-lg border border-line focus-visible:outline-2 focus-visible:outline-brand-dark sm:block"
      >
        <table className="w-full min-w-[22rem] border-collapse text-left">
          <caption className="px-4 py-3 text-left font-display text-lg font-bold text-ink">
            {caption}
          </caption>
          <thead className="bg-brand-tint text-sm text-ink">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">
                Item
              </th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">
                Price
              </th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">
                Calories
              </th>
              {showRatings && (
                <th scope="col" className="px-4 py-3 font-semibold">
                  Visitor rating
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan={showRatings ? 4 : 3}
                  className="border-t border-line px-4 py-6 text-center text-muted"
                >
                  No menu items have been added yet.
                </td>
              </tr>
            ) : (
              items.map((item, index) => (
                <tr
                  key={`${item.name}-${index}`}
                  className="border-t border-line align-top"
                >
                  <th scope="row" className="px-4 py-3 font-medium text-ink">
                    {item.name}
                    {item.servingSize && (
                      <span className="mt-0.5 block text-sm font-normal text-muted">
                        {item.servingSize}
                      </span>
                    )}
                    {item.description && (
                      <span className="mt-1 block text-sm font-normal text-muted">
                        {item.description}
                      </span>
                    )}
                  </th>
                  <td className="px-4 py-3 text-right whitespace-nowrap text-ink tabular-nums">
                    <VerifiedValue
                      item={item}
                      value={item.price}
                      note={item.priceNote}
                      format={formatPrice}
                    />
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap text-ink tabular-nums">
                    <VerifiedValue
                      item={item}
                      value={item.calories}
                      note={item.caloriesNote}
                      format={(n) => formatCalories(n, item.caloriesMax)}
                    />
                    <CaloriesBasis item={item} />
                  </td>
                  {showRatings && (
                    <td className="min-w-44 px-4 py-3">
                      {item.productId && <RatingSummary align="start" productId={item.productId} itemName={item.name} />}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
