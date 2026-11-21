# Nutrition & Meal Price Calculator: Architecture

**Improvement 7, built 2026-11-20. Status: `published` (owner approval 2026-11-20). Indexing stays off until `SITE_INDEXING=true`.** Data rules: `NUTRITION_CALCULATOR_DATA_RULES.md`. Tests: `NUTRITION_CALCULATOR_TEST_REPORT.md`.

## 1. Files

| File | Role |
|---|---|
| `app/nutrition-calculator/page.tsx` | Static route. Server component: metadata, hero, the calculator, explanation cards, FAQ, Sources, Related Menus, JSON-LD. Runs the data build check. `notFound()` when the tool is not live. |
| `content/tools/nutrition-calculator.ts` | Page text (title, description, H1, intro, guide cards, FAQs, related menus), `status`, `ownerApprovedAt`, `isToolPageLive()`, `toolPath()`. |
| `lib/calculator-data.ts` | Builds the calculator items from the shared menu data at build time: `getCalculatorData()`, `validateCalculatorData()`. Server only. |
| `lib/calculator-math.ts` | Pure meal-total functions (`mealTotals`, `isComplete`): used in the browser and by the tests. |
| `components/calculator/NutritionCalculator.tsx` | The only client component (`"use client"`): search, category filter, version selector, meal list, quantities, totals, reset, mobile summary bar. |
| `scripts/test-calculator.cjs` | Automated data and math tests (`npm run test:calculator`). No dependency. |

Changed for integration (no redesign): `lib/navigation.ts` (header "More" dropdown + footer "Explore More" link while live), `app/api/search-index/route.ts` (one "Tool" entry while live), `app/sitemap.ts` (added only when `published`).

## 2. Data flow

1. At build time the page calls `getCalculatorData()`. It reads only shared data: `allOfferings` (231 menu offerings + the detail-only soup records), the item pages (`content/menu/product-pages/`, for officially listed versions and same-dish listings), and the official nutrition rows (`lib/nutrition-data.ts`).
2. `validateCalculatorData()` runs on the result; any issue fails the build.
3. The prepared list (126 items, 219 portions and versions, about 120 KB of JSON before compression) is passed as props to `<NutritionCalculator>`, so it is part of the static page. There are **no API requests, no database, no cookies and no storage**: the meal exists only in the open tab.
4. In the browser the component filters (category, search) and adds up the selected lines with `mealTotals()`.

## 3. Reused pieces

- Data: offerings, products, images (`getOfferingImage`), item-page versions, official nutrition rows, item-page links (`productDetailHref`).
- Search: `buildIndex` / `searchIndex` from `lib/site-search.ts` (partial words and small typos, same as the header search).
- Components: `Container`, `Breadcrumbs` (+ BreadcrumbList), `FAQSection` (+ FAQPage), `SourceNote`, `RelatedCategories` with `resolveRelatedMenus`, `RichText`, `JsonLd`, the item-page `Icon` set, `next/image`.
- Formatting: `formatPrice`, `formatNumber`, `formatMonthYear` (month and year only).

## 4. Visibility and publishing

Same rule as menu item pages:
- `preview` (now): reachable at `/nutrition-calculator` and linked from the header, footer and search only in local development, local `next start` and Vercel preview deployments. On the production deployment (`PRODUCTION_DEPLOYMENT=1`) the page calls `notFound()` (HTTP 404) and every link and search entry is hidden. `noindex`.
- `published`: after the owner's review, set `status: "published"` and `ownerApprovedAt` in `content/tools/nutrition-calculator.ts`. The page then goes live everywhere and enters the sitemap; it is indexed only when `SITE_INDEXING=true`.
- `proxy.ts` needs no change: a top-level folder with a `page` file is allowed automatically.

## 5. Performance

- One client component; everything else is server-rendered. No new npm dependencies.
- 24 item cards render at first (then "Show more"), so only about 24 thumbnails load. Thumbnails are `next/image` at 80 px (`sizes="80px"`), lazy-loaded, in fixed-size boxes (no layout shift). The page has no `priority` image.
- Totals are recomputed in memory on every change (a few hundred numbers at most).

## 6. Accessibility

Labels on the search field and category select; `aria-label` on every Add, Remove and quantity button naming the item and version; a polite live region announces additions, removals and the result count; Escape clears the search; all buttons and selects are at least 44 px high; meaning is never carried by color alone.

## 7. Download PDF and Print (owner request 2026-11-20)

Shown under the totals of **Your Meal** once the meal has an item. Both use one report, `buildMealReport()` (`lib/meal-report.ts`), so they always match the screen: item, portion/version, quantity, price and calories per line (with the bundle and "no official nutrients" notes), the six totals with "Incomplete" and the named missing items, the price disclosure, "Prices last verified: Month Year" and the USA location notice, the nutrition source (US_101926), the not-medical-advice and allergen notes, and the site disclaimer.

- **Download PDF:** `buildMealPdf()` (`lib/meal-pdf.ts`) writes a real PDF 1.4 file in the browser (US Letter, standard Helvetica, olive header band, striped item table, amber "INCOMPLETE" totals, page numbers; long meals continue on more pages). No library, no server request, nothing stored. File name `olive-garden-meal-estimate-YYYY-MM-DD.pdf`. Text is converted to plain ASCII (for example "–" → "-", "≤" → "<=").
- **Print:** mounts a print-only report (`#meal-print`, a direct child of `<body>`) and opens the browser's print dialog, where visitors can also choose "Save as PDF". `app/globals.css` hides every other part of the page while the report exists; it is removed after printing, so printing the page normally (Ctrl+P) is unchanged.
- No privacy-policy change: nothing is sent, stored or tracked; the file is created on the visitor's device.

## 8. Future changes

- When menu data changes, the calculator updates on the next build; run `npm run test:calculator` (some tests check named examples, such as Chicken Alfredo $21.79 / 1,480 Cal, and must be updated together with the data).
- A new official nutrition PDF: re-run `research/nutrition-extraction/`, then the tests.
- Not built (would need owner approval): saving or sharing a meal (storage or URL parameters would need a privacy-policy update), allergen filtering (deliberately left out: no allergy-safety claims), taxes or delivery fees.
