# Menu Item Page: Content Eligibility Checklist

An item gets a page only if it passes **all** gates below. Record the result
in the page's `checklist` field (`done` / `partial` / `missing`). A page can
be `preview` with open items (local/testing only, hidden on production). It
can be `published` only when **every gate is `done`**, the official nutrition
and allergen records exist, and `ownerApprovedAt` is set (owner decision
2026-11-15; build check). Never create pages for every product id automatically.

| # | Gate (`checklist` key) | Pass when |
|---|---|---|
| 1 | Verified product information (`verifiedProductInfo`) | Name, current price, calories, serving size and description are official and dated in `content/menu/` and `research/` |
| 2 | Unique search intent (`uniqueSearchIntent`) | The item has its own searches (price, calories, sauce, allergens…) that the category page answers only briefly; no other URL targets it |
| 3 | Nutrition and allergen information (`nutritionAndAllergens`) | Official nutrition guide values and the U.S. allergen guide entries were read and logged. `partial` = calories verified, full macros/allergens pending (shown as "not verified yet", never estimated) |
| 4 | Useful original content (`originalContent`) | Own wording; at least an About section, sizes or sauce details, 3+ item-specific FAQs answered from verified facts; no copied competitor text; no filler |
| 5 | Product imagery (`accurateImage`) | Owner-supplied photo already mapped to the product (`content/menu/products.ts`). **Permanent owner instruction (2026-11-18):** reuse every existing owner-provided image as mapped. There is no repeated image review and no replacement request, and a page is never blocked because of a routine image check. Request a new image only for a new item without any owner photo. Flag only a concrete, materially misleading mismatch (e.g. a gluten-sensitive dish shown with regular pasta). Never generate, download or replace images automatically. |
| 6 | Meaningful internal links (`internalLinks`) | Category, related categories (4), 3-4 similar items with photos, pairings with photos |
| 7 | Owner visual review (`visualReview`) | The owner reviewed the page on phone and desktop and accepted the design |

**Exception (owner decision 2026-11-18):** a gate may stay `partial`/`missing` at publishing only if the owner accepted that disclosed gap (`acceptedGaps` on the page; gate 7, visual review, never).

## Before setting `published`

- [ ] Fact log `research/products/<slug>/FACT_VERIFICATION.md` complete
- [ ] `npm run lint`, `npm run build` pass (content check included)
- [ ] URL 200, a wrong sibling slug 404, `/menu` still 308 → `/`
- [ ] Cards/table links appear; ratings show the same numbers everywhere
- [ ] Search returns the page
- [ ] No horizontal overflow at 320, 375, 390, 768, 1024, 1440, 1920 px
- [ ] Owner approval recorded (date)

## Fried Mozzarella (updated 2026-11-18)

| Gate | State | Note |
|---|---|---|
| 1 | done | $9.79, 800 Cal, marinara 35 Cal, catering 30 pieces / $32.29 / 3,450 Cal (Nov 2026) |
| 2 | done | "olive garden fried mozzarella" (+ price, calories, sauce) |
| 3 | done | Official U.S. guides US_101926 (owner-supplied): nutrition p. 2, allergens p. 2; calories 800 confirmed (2026-11-18) |
| 4 | done | Original About, 6 FAQs, sizes table |
| 5 | done | `/images/appetizers/fried-mozzarella.webp` (owner photo, matches the dish) |
| 6 | done | Appetizers, Catering, Sides, Classic Entrées; 4 similar; 4 pairings |
| 7 | done | Owner approved the design on 2026-11-18 |

**Status:** published 2026-11-18 (`ownerApprovedAt: "2026-11-18"`).

## Phase 1 batch 1 (2026-11-18)

| Gate | Calamari | Toasted Ravioli | Stuffed Ziti Fritta | Breadsticks |
|---|---|---|---|---|
| 1 Verified product info | done | done | done | done (6/12, baked/unbaked options) |
| 2 Unique search intent | done | done | done | done |
| 3 Nutrition + allergens (official rows) | done (p. 2) | done (p. 3 / p. 2) | done (pp. 2-3 / p. 2) | done (p. 3 / p. 2, per breadstick) |
| 4 Original content | done | done | done | done |
| 5 Accurate image | done | done | done | done |
| 6 Internal links | done | done | done | done |
| 7 Owner visual review | **missing** | **missing** | **missing** | **missing** |

Status: `preview` (local/testing only) until the owner approves.

