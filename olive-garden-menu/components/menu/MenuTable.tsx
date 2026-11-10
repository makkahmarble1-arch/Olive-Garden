import type { MenuItem } from "@/lib/types";
import { formatNumber, formatPrice } from "@/lib/format";
import VerificationBadge from "@/components/ui/VerificationBadge";

type MenuTableProps = {
  /** Visible table title, e.g. "Appetizer Prices and Calories". */
  caption: string;
  items: MenuItem[];
};

/** A value is shown only if it exists AND the item is verified. */
function VerifiedValue({
  item,
  value,
  format,
}: {
  item: MenuItem;
  value: number | null;
  format: (n: number) => string;
}) {
  if (item.status !== "verified" || value === null) {
    return <VerificationBadge />;
  }
  return <>{format(value)}</>;
}

/**
 * Accessible, responsive price + calories table.
 * On narrow screens the table scrolls sideways inside its own box.
 */
export default function MenuTable({ caption, items }: MenuTableProps) {
  return (
    <div
      role="region"
      aria-label={caption}
      tabIndex={0}
      className="overflow-x-auto rounded-lg border border-line focus-visible:outline-2 focus-visible:outline-brand-dark"
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
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={3} className="border-t border-line px-4 py-6 text-center text-muted">
                No menu items have been added yet.
              </td>
            </tr>
          ) : (
            items.map((item, index) => (
              <tr key={`${item.name}-${index}`} className="border-t border-line align-top">
                <th scope="row" className="px-4 py-3 font-medium text-ink">
                  {item.name}
                  {item.description && (
                    <span className="mt-1 block text-sm font-normal text-muted">
                      {item.description}
                    </span>
                  )}
                </th>
                <td className="px-4 py-3 text-right whitespace-nowrap text-ink tabular-nums">
                  <VerifiedValue item={item} value={item.price} format={formatPrice} />
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap text-ink tabular-nums">
                  <VerifiedValue item={item} value={item.calories} format={formatNumber} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
