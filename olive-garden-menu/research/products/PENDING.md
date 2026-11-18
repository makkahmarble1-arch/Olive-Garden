# Item pages: open points (combined list)

**Updated:** 2026-11-18, end of the item-page phase.

**Built and published:** 77 pages, all `published` on 2026-11-18 after the owner's visual approval. List: `content/menu/product-pages/registry.ts`.

**Coverage:** every one of the 146 products, with the reason for each product without its own page, is in `docs/product-pages/PRODUCT_INVENTORY.md`. No eligible product is left unbuilt.

## 1. Factual conflicts and checks

Re-checked on the official site on 2026-11-18, after the network block was lifted (Orlando - Millenia Mall, Pickup). Details are in `research/menu/OFFICIAL_FACTS_LOG.md`.

| Item | Status |
|---|---|
| Calabrian Steak & Shrimp Bucatini price | **Resolved.** The item page and the menu card agree: $25.29 (steak & shrimp), $27.29 (steak), $25.29 (shrimp). Data, item page and price-range prose are updated (classic entrées now $13.99 to $27.29). |
| Spicy Alfredo Fettuccine | **Verified still on the menu** (orderable), $17.49, 1,330 calories. No change. |
| Pumpkin Cookie Butter Cheesecake | **Verified still on the menu** (orderable), $9.79, 620 calories. No change. Both are limited-time items, so re-check them periodically. |
| Side of Crispy Shrimp Fritta | Calorie conflict (200 vs guide 220). Owner decision: keep 200; no page. |
| Kids menu age wording ("under 12" vs "12 and under") | Open since the menu research; kids pages use the menu wording "under 12". |

## Owner decisions of 2026-11-18 (publishing with disclosed gaps)

Recorded per page as `acceptedGaps` (date, checklist key, reason). The build check accepts a not-"done" checklist item when publishing only for these listed keys; the visual review always needs real approval.

1. **Gluten-sensitive Grilled Chicken Parmigiana:** publish with a neutral image placeholder (`accurateImage`).
2. **Spaghetti & Meatballs, Chicken Tortelloni Alfredo, Chicken & Shrimp Carbonara:** publish with the verified information. The missing version-specific nutrition is disclosed (`nutritionAndAllergens`).
3. **Nine drinks:** publish with a clear notice that the official allergen guide does not cover them. The notice says this does **not** mean the drink is allergen-free (`nutritionAndAllergens`).
4. Nothing is invented.
5. **Publishing waits for the owner's visual approval.** On approval, add the slugs to `content/menu/product-pages/approvals.ts` and set them to `published` in `registry.ts`. A dry run on 2026-11-18 showed that all 76 preview pages would pass the publish check once approved.

## 2. Pages with a documented gap (accepted by the owner on 2026-11-18; disclosed on the page)

| Page | Gap |
|---|---|
| `/menu/grilled-chicken-parmigiana` (gluten-sensitive) | **No accurate photo.** The mapped photo shows regular spaghetti; the owner's rotini photo shows breaded chicken (the dish is grilled). The page shows a labeled placeholder, and the menu-card mapping is unchanged. Needed: a photo of grilled, unbreaded chicken with rotini in marinara. |
| `/menu/spaghetti-and-meatballs` | The dinner marinara version (970 calories) has no official nutrition row; calories only, disclosed on the page. |
| `/menu/chicken-tortelloni-alfredo` | The Shrimp Tortelloni Alfredo version ($25.79, 1,870 calories) is not in the nutrition or allergen guide; disclosed. |
| `/menu/chicken-and-shrimp-carbonara` | The Chicken Carbonara version ($23.99, 1,510 calories) is not in either guide; disclosed. |
| 9 drink pages | The U.S. allergen guide does not cover to-go drinks; the pages say so. Nutrition is official. |

## 3. Owner actions before publishing

1. ~~Visual approval~~ **Done 2026-11-18:** all 76 pages approved and published.
2. Optional: a photo of grilled, unbreaded chicken with gluten-free rotini for the gluten-sensitive Grilled Chicken Parmigiana; per-soup pages if wanted.
