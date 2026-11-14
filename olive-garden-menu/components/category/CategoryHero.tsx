import { formatMonthYear } from "@/lib/format";
import { siteConfig } from "@/lib/site";

type CategoryHeroProps = {
  /** The page's only H1 (search-intent focused). */
  h1: string;
  intro: string[];
  itemCount: number;
  /** What the count means. Default "items". */
  countLabel?: string;
  lastChecked: string | null;
  orderType: string;
  /** Anchor of the price table (skip link for the facts bar). */
  tableId: string;
  /** Unpublished pages show a clear preview notice. */
  isPreview: boolean;
};

/**
 * Top of every category page: H1, a short original intro, and the facts a
 * visitor needs before trusting a price (item count, month and year of the
 * last check, ordering type, USA + price-variation note). The reference
 * restaurant is never shown publicly (owner standard 2026-11-13). Server component, no images (the
 * photo cards follow the table), so the H1 renders immediately.
 */
export default function CategoryHero({
  h1,
  intro,
  itemCount,
  countLabel = "items",
  lastChecked,
  orderType,
  tableId,
  isPreview,
}: CategoryHeroProps) {
  return (
    <header className="mt-6">
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl leading-tight font-bold text-ink sm:text-4xl lg:text-[2.5rem]">{h1}</h1>
        {intro.map((paragraph) => (
          <p key={paragraph} className="mt-4 text-lg leading-8 text-muted">
            {paragraph}
          </p>
        ))}
      </div>

      <ul
        aria-label="About these prices"
        className="mt-6 flex flex-wrap gap-x-6 gap-y-2 rounded-lg border border-line bg-brand-tint px-4 py-3 text-sm leading-6 text-ink"
      >
        <li>
          <strong className="font-semibold">{itemCount}</strong> {countLabel}
        </li>
        {lastChecked && (
          <li>
            <strong className="font-semibold">Last verified:</strong>{" "}
            <time dateTime={lastChecked}>{formatMonthYear(lastChecked)}</time>
          </li>
        )}
        <li>
          <strong className="font-semibold">Prices:</strong> {orderType.toLowerCase()}, {siteConfig.market}.{" "}
          {siteConfig.locationNotice}
        </li>
        <li>
          <a
            href={`#${tableId}`}
            className="font-medium text-brand-dark underline underline-offset-4 hover:text-brand-darker focus-visible:outline-2 focus-visible:outline-brand-dark"
          >
            Jump to the price table
          </a>
        </li>
      </ul>

      {isPreview && (
        <div
          role="note"
          className="mt-4 max-w-3xl rounded-lg border border-line bg-warning-bg px-4 py-3 text-sm leading-6 text-warning-text"
        >
          <strong className="font-semibold">Preview:</strong> This page is not published yet. Items marked “Not
          verified yet” have not been confirmed against an official source.
        </div>
      )}
    </header>
  );
}
