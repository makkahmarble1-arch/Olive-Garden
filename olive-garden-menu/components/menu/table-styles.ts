/**
 * Shared look of price and comparison tables (docs/DESIGN_SYSTEM.md):
 * olive green header with white text (brand-dark #556b12: 6.0:1 contrast),
 * alternating white / light olive rows, horizontal scroll on small screens.
 */
export const tableWrapClass =
  "overflow-x-auto rounded-lg border border-line focus-visible:outline-2 focus-visible:outline-brand-dark";
export const tableClass = "w-full min-w-[22rem] border-collapse text-left";
export const tableCaptionClass = "px-4 py-3 text-left font-display text-lg font-bold text-ink";
export const tableHeadClass = "bg-brand-dark text-sm text-white";
export const tableHeadCellClass = "px-4 py-3 font-semibold";
/** Row background alternates white / light olive. */
export const tableRowClass = "border-t border-line align-top odd:bg-white even:bg-brand-tint";
export const tableCellClass = "px-4 py-3";
