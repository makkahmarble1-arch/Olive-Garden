# Menu Item Page Architecture (`/menu/[slug]`)

Created 2026-11-15. First sample: `/menu/fried-mozzarella` (status `published` since 2026-11-18, owner-approved).

## 1. Files

| Part | File |
|---|---|
| Route | `app/menu/[slug]/page.tsx` (`generateStaticParams`, `generateMetadata`, `notFound()`) |
| Page content (one file per item) | `content/menu/product-pages/<slug>.ts` (`ProductPageContent`) |
| Registry + live slugs | `content/menu/product-pages/index.ts` (data only; also read by `proxy.ts`) |
| Official nutrition / allergen rows | `content/menu/nutrition/` + `lib/nutrition-data.ts` (`NUTRITION_ALLERGEN_DATA.md`) |
| Helpers + build check | `lib/product-pages.ts` (`productPath`, `getLiveProductPage(s)`, `productDetailHref`, `getProductPageData`, `validateProductPages`) |
| Types | `lib/types.ts` → "Individual menu item pages" |
| Layout | `components/product/ProductPageLayout.tsx` |
| Sections | `components/product/` `ProductHero`, `QuickFacts`, `NutritionSection`, `AllergenSection`, `ServingSection`, `PairingSection`, `icons` |
| Reused | `Breadcrumbs`, `MenuItemCard`, `FAQSection`, `SourceNote`, `RelatedCategories`, `JsonLd`, `SectionHeading`, `RatingSummary`, table styles |
| 404s | `proxy.ts` (matcher `/menu/:slug`) |
| Search | `app/api/search-index/route.ts` (kind "Menu item") |
| Sitemap | `app/sitemap.ts` (published item pages only) |
| Card / table links | `components/menu/MenuItemCard.tsx`, `components/menu/MenuTable.tsx` |

## 2. Status and visibility

| Status | Renders | Linked (cards, tables, search) | Robots | Sitemap |
|---|---|---|---|---|
| `draft` | No (HTTP 404) | No | — | No |
| `preview` | Local dev, local `next start`, Vercel previews: yes. **Production deployment: no (HTTP 404)** | Same as "Renders" | `noindex, follow` | No |
| `published` | Yes | Yes | index only when `SITE_INDEXING=true` | Yes |

"Production deployment" = `VERCEL_ENV=production`, turned into the build
flag `PRODUCTION_DEPLOYMENT` in `next.config.ts` and read by
`isLiveProductPage()` (`content/menu/product-pages/index.ts`), so the proxy,
the page, menu links and the search index agree. Verified locally with
`VERCEL_ENV=production` (page 404, 0 links, 0 search entries).

Publishing (owner decision 2026-11-15) needs `ownerApprovedAt`, every
checklist item `done` (including `visualReview`), and official nutrition and
allergen records (build check). `/menu` keeps its permanent redirect to `/`.
`generateStaticParams` returns every non-draft page (Cache Components needs at
least one); a page that is not live renders the 404 page.

## 3. Routing and HTTP status

- `generateStaticParams` returns live slugs, so live pages are static HTML.
- With Cache Components the shell streams before `notFound()` runs, so the
  status would be 200. `proxy.ts` therefore rewrites every `/menu/<slug>`
  that is not live to the internal 404 path before rendering (real 404).
  Tested: `/menu/fried-mozzarella` 200; `/menu/calamari`, `/menu/xyz`,
  `/menu/Fried-Mozzarella`, `/menu/fried-mozzarella/extra` 404; `/menu` 308 → `/`.

- `params` is read inside `<Suspense>` (Next.js 16 instant navigation; fixes the
  dev "URL data during prerendering" insight of 2026-11-18). The fallback has
  the hero's size, so nothing shifts; live pages are fully prerendered.

## 4. Page order

1. Breadcrumbs `Home / Menu / {Category} / {Item}` (+ BreadcrumbList)
2. Hero (H1, rating, price + calorie badges, summary, serving, category link, section links, last verified)
3. Quick facts cards (H2 visually hidden)
3a. Versions (H2): selector + "all versions" table, only for version-aware items (Phase 4, owner approval 2026-11-18)
4. About (H2) + "Good to know" panel
5. Nutrition facts (H2): calorie spotlight, verified table, missing-values note, comparison chart (H3)
6. Ingredients and allergens (H2): ingredients, allergen card, dietary notes, safety notice
7. Serving size, sauce and sizes (H2): included sauce, customization, extra sauce, sizes table
8. What to pair with (H2, editorial)
9. Similar {Category} (H2, approved menu cards)
10. FAQs (H2 + FAQPage) · 11. Sources · 12. Related Menus (exactly 4)

## 5. Single source of truth

Prices, calories, serving sizes, photos, category and rating key come from
`content/menu/offerings/*` and `products.ts`. The page file stores only
facts that exist nowhere else. The build check fails if:
- an offering id is unknown, belongs to another product, or a card offering
  has no photo / is unverified;
- the text mentions a `$` amount that is not a current price of the item, its
  sizes, or the suggested extra sauce;
- the meta description does not show the current price and calories;
- nutrition values exist without `checkedAt`, or allergens are listed as
  "contains" before verification;
- Related Menus is not exactly 4, similar items not 3-4, or FAQs fewer than 3;
- a page is `published` while a checklist item is `missing`.

## 5a. Images (permanent owner instruction, 2026-11-18)

- **Reuse:** every existing owner-provided menu item image is reused on the item pages through the existing mapping in `content/menu/products.ts`. Preserve all mappings.
- **No routine image review:** do not review images repeatedly, do not ask for replacements, and never block a page because of a routine image check.
- **New items only:** request a new image only when a new menu item has no owner-provided image.
- **Real problems only:** flag only a concrete, materially misleading mismatch.
- **Never automatic:** never generate, download, or replace images automatically.
- This supersedes the earlier mandatory image review per page.

## 5b. Version-aware items (Phase 4, owner approval 2026-11-18)

- **When:** a dish whose versions each have their own official nutrition and allergen row gets **one** page with `versions`. Examples: grilled vs crispy chicken, marinara vs meat sauce, steak / shrimp / both. Genuinely different dishes are never merged.
- **Data:** every version stores its price, calories and its own row ids. The build check verifies that:
  - each version price is a current price (or option price) of the offering;
  - its calories match the offering data and its official row;
  - both rows exist.
- **Default version:** the first version is the default. It drives the hero and the meta description (which must still show the offering's listed price and calories).
- **Missing nutrition row:** a version without a nutrition row (e.g. dinner Spaghetti & Meatballs with marinara) shows calories only. The checklist item `nutritionAndAllergens` is then `partial`, which blocks publishing until the owner decides.
- **`heroImageOmitted`** (internal reason): the hero shows a labeled placeholder instead of a materially misleading owner photo. The shared photo mapping stays unchanged.

## 5c. Publishing with owner-accepted gaps (2026-11-18)

- **`acceptedGaps`** (`{ decidedAt, checklistKeys, reason }`) records an owner decision to publish a page whose gap is disclosed on the page. Examples: a version without an official row, drinks outside the allergen guide, a photo placeholder.
- **What it allows:** when publishing, only the listed checklist keys may stay `partial`/`missing`. `visualReview` can never be accepted this way.
- **Approvals:** owner visual approvals go in `content/menu/product-pages/approvals.ts` (slug → date of the actual approval). The status goes in `registry.ts`. Both are changed only after the owner confirms.

## 6. Ratings

The page uses `RatingSummary` with the product id (`fried-mozzarella`), the
same key as the homepage and category cards (appetizer and catering cards
share it). One `/api/ratings` request per page; votes go through the existing
`POST /api/ratings/vote` with its signed visitor cookie, so a visitor's vote
is per product, not per page location. No database changes.

## 7. Search

Each live item page adds one entry (title = item name, kind "Menu item",
keywords from the page) at the top of the static index, so "fried mozzarella"
returns `/menu/fried-mozzarella` first. Index stays small (no bodies).

## 8. Adding the next item page

1. Pass `PRODUCT_CONTENT_CHECKLIST.md` and write
   `research/products/<slug>/FACT_VERIFICATION.md`.
2. Create `content/menu/product-pages/<slug>.ts` (status `preview`), add it to
   `index.ts`.
3. Run `npm run build` (the check runs automatically), test the URL, an
   invalid sibling URL, the cards, search, and phone widths.
4. Owner approval → status `published`.
