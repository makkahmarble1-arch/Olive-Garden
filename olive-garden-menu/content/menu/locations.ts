import type { ReferenceLocation } from "@/lib/types";

/**
 * Price benchmark (owner decision, 2026-11-11).
 *
 * Approved reference MARKET: Orlando, Florida.
 * Owner-approved restaurant (2026-11-11): Olive Garden "Orlando - Millenia
 * Mall", https://www.olivegarden.com/locations/fl/orlando/orlando-millenia-mall/1614
 * It is added to `referenceLocations` below only after its address has been
 * read on that official page (see research/appetizers/RESEARCH_LOG.md).
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
