import type { ReferenceLocation } from "@/lib/types";

/**
 * Price benchmark (owner decision, 2026-11-11).
 *
 * Approved reference MARKET: Orlando, Florida. The exact restaurant is NOT
 * selected yet. During the research phase, suitable official Olive Garden
 * locations in Orlando are listed, one is recommended, and the owner approves
 * it. Only then is it added to `referenceLocations` below.
 *
 * Every price (`PriceObservation.locationId`) must point to a location in
 * this list. Validation fails otherwise.
 */
export const referenceMarket = {
  city: "Orlando",
  state: "FL",
  country: "US",
  restaurantSelected: false,
} as const;

/** Owner-approved benchmark restaurants. Empty until one is approved. */
export const referenceLocations: ReferenceLocation[] = [];
