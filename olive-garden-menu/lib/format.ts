/** Formatting helpers (US English). */

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeZone: "UTC",
});

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

/** "2026-11-10" → "November 10, 2026" */
export function formatDate(isoDate: string): string {
  return dateFormatter.format(new Date(isoDate));
}

/** 12.5 → "$12.50" */
export function formatPrice(price: number): string {
  return priceFormatter.format(price);
}

/** 1250 → "1,250" */
export function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}
