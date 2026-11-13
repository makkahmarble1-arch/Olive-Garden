import type { CSSProperties } from "react";

/**
 * Golden rating stars drawn with CSS (classes `og-star` / `og-star-btn` in
 * app/globals.css): an 18 px outlined star plus a golden fill whose width
 * is the CSS variable --fill. One element per star instead of span + svg +
 * path keeps the homepage DOM small (about 1,200 stars). Same look as the
 * approved design: outlined when unrated, filled (also partly, e.g. 4.3)
 * for real ratings.
 */

/** Star size in px (owner request: about 18 px). Must match app/globals.css. */
export const STAR_SIZE = 18;

/** Inline style for one star: fill 0-1 (0 = outline only). */
export function starFillStyle(fill: number): CSSProperties | undefined {
  const amount = Math.max(0, Math.min(1, fill));
  return amount > 0 ? ({ "--fill": `${Math.round(amount * 100)}%` } as CSSProperties) : undefined;
}

/**
 * Five stars, display only (hidden from screen readers: the text next to
 * them says the rating). No hooks, so it also works in server components.
 */
export default function StarRating({ value }: { value: number }) {
  return (
    <span aria-hidden="true" className="inline-flex shrink-0 items-center gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className="og-star" style={starFillStyle(value - i)} />
      ))}
    </span>
  );
}
