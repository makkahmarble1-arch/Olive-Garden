import type { ReferenceLocation } from "@/lib/types";

/**
 * Price benchmark (owner decision, 2026-11-11).
 *
 * Approved reference MARKET: Orlando, Florida.
 * Owner-approved restaurant (2026-11-11): Olive Garden "Orlando - Millenia
 * Mall". Address read on the official location page on 2026-11-11
 * (research/appetizers/sources.md, S1).
 *
 * Every price (`PriceObservation.locationId`) must point to a location in
 * this list. Validation fails otherwise.
 */
export const referenceMarket = {
  city: "Orlando",
  state: "FL",
  country: "US",
  restaurantSelected: true,
} as const;

/** Owner-approved benchmark restaurants. */
export const referenceLocations: ReferenceLocation[] = [
  {
    id: "orlando-fl-millenia-mall",
    name: "Orlando - Millenia Mall",
    streetAddress: "4101 Conroy Road",
    city: "Orlando",
    state: "FL",
    postalCode: "32839",
    officialUrl: "https://www.olivegarden.com/locations/fl/orlando/orlando-millenia-mall/1614",
    approvedAt: "2026-11-11",
  },
];
