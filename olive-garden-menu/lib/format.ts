/** Formatting helpers (US English). */

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeZone: "UTC",
});

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const monthYearFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-11-10" → "November 10, 2026" (articles; not for public verification dates). */
export function formatDate(isoDate: string): string {
  return dateFormatter.format(new Date(isoDate));
}

/**
 * "2026-11-10" → "November 2026". Owner standard (2026-11-13): every public
 * price/menu verification date shows month and year only. Keep the full ISO
 * date in data and in <time dateTime>; never advance the month without a real check.
 */
export function formatMonthYear(isoDate: string): string {
  return monthYearFormatter.format(new Date(isoDate));
}

/** 12.5 → "$12.50" */
export function formatPrice(price: number): string {
  return priceFormatter.format(price);
}

/** 1250 → "1,250" */
export function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}
