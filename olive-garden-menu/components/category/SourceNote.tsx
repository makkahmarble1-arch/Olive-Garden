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
  /** First sentence (default: the menu wording). */
  summary?: string;
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
export default function SourceNote({ officialSource, extraSource, lastChecked, summary }: SourceNoteProps) {
  return (
    <section aria-labelledby="sources" className="mt-14 max-w-3xl rounded-lg border border-line bg-brand-tint p-5 sm:p-6">
      <h2 id="sources" className="font-display text-xl font-bold text-ink">
        Sources
      </h2>
      <p className="mt-3 text-sm leading-6 text-ink">
        {summary ?? (
          <>
            Menu information is based on official Olive Garden resources. Prices and availability may vary by location
            across the {siteConfig.market}. Values marked “Calc.” are our calculations from official values.
          </>
        )}
      </p>
      {/*
        Owner decision 2026-11-21: one external link per page, the Olive Garden
        website. Specific documents (nutrition or allergen PDFs, FAQ, locator)
        are named as plain text, never linked.
      */}
      <ul className="mt-3 space-y-1.5 text-sm leading-6 text-ink">
        <li>
          <strong className="font-semibold">Official source:</strong> <SourceLink source={siteConfig.officialSource} />
        </li>
        {(() => {
          const named = [officialSource, extraSource].filter(
            (s): s is Source => Boolean(s) && s!.url !== siteConfig.officialSource.url,
          );
          return named.length > 0 ? (
            <li>
              <strong className="font-semibold">Also checked:</strong> {named.map((s) => s.label).join("; ")}
            </li>
          ) : null;
        })()}
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
