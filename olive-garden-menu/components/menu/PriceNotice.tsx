import { siteConfig } from "@/lib/site";
import { formatMonthYear } from "@/lib/format";

type PriceNoticeProps = {
  /** ISO date the prices were last checked, or null if not checked yet. */
  lastChecked: string | null;
  /** Market label, e.g. "USA" (never the reference restaurant; owner standard 2026-11-13). */
  location?: string | null;
};

/** Shown next to every price table (see CLAUDE.md content rules). */
export default function PriceNotice({ lastChecked, location }: PriceNoticeProps) {
  return (
    <div role="note" className="rounded-lg border border-brand bg-brand-tint px-4 py-3 text-sm leading-6 text-ink">
      <p>
        <strong className="font-semibold">Prices last verified:</strong>{" "}
        {lastChecked ? (
          <time dateTime={lastChecked}>{formatMonthYear(lastChecked)}</time>
        ) : (
          "Not checked yet"
        )}
        {location && (
          <>
            {" "}
            &middot; <strong className="font-semibold">Location:</strong> {location}
          </>
        )}
      </p>
      <p className="mt-1 text-muted">{siteConfig.priceNotice}</p>
    </div>
  );
}
