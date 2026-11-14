import { formatMonthYear } from "@/lib/format";
import { siteConfig } from "@/lib/site";

type Source = { label: string; url: string };

type SourceNoteProps = {
  /** The one official source shown publicly (default: the Olive Garden website). */
  officialSource: Source;
  /** Optional second official page, only when an important claim needs it. */
  extraSource?: Source;
  /** Latest real price check (ISO); shown as month and year only. */
  lastChecked: string | null;
};

function SourceLink({ source }: { source: Source }) {
  return (
    <a
      href={source.url}
      rel="nofollow noopener"
      target="_blank"
      className="text-brand-dark underline underline-offset-4 hover:text-brand-darker focus-visible:outline-2 focus-visible:outline-brand-dark"
    >
      {source.label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/**
 * Short "Sources" box at the end of every category page (owner standard
 * 2026-11-13): one official source (plus at most one specific page), the
 * USA price-variation note, month-and-year verification, and the
 * independent-site disclaimer. The full source list and the exact
 * reference restaurant stay in content/menu/category-pages.ts and research/.
 */
export default function SourceNote({ officialSource, extraSource, lastChecked }: SourceNoteProps) {
  return (
    <section aria-labelledby="sources" className="mt-14 max-w-3xl rounded-lg border border-line bg-brand-tint p-5 sm:p-6">
      <h2 id="sources" className="font-display text-xl font-bold text-ink">
        Sources
      </h2>
      <p className="mt-3 text-sm leading-6 text-ink">
        Menu information is based on official Olive Garden resources. Prices and availability may vary by location
        across the {siteConfig.market}. Values marked “Calc.” are our calculations from official values.
      </p>
      <ul className="mt-3 space-y-1.5 text-sm leading-6 text-ink">
        <li>
          <strong className="font-semibold">Official source:</strong> <SourceLink source={officialSource} />
        </li>
        {extraSource && (
          <li>
            <strong className="font-semibold">Also see:</strong> <SourceLink source={extraSource} />
          </li>
        )}
        {lastChecked && (
          <li>
            <strong className="font-semibold">Last verified:</strong>{" "}
            <time dateTime={lastChecked}>{formatMonthYear(lastChecked)}</time>
          </li>
        )}
      </ul>
      <p className="mt-4 text-xs leading-5 text-muted">{siteConfig.disclaimer}</p>
    </section>
  );
}
