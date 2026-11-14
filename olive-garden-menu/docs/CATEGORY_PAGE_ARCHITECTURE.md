# Category Page Architecture

**Status:** reusable architecture ready (Lesson 8.2, 2026-11-13). Content for the 17 pages is written later, one page at a time, from owner-approved SEO outlines.
Related: `CATEGORY_CONTENT_STANDARDS.md` (writing rules), `CATEGORY_DEVELOPMENT_CHECKLIST.md` (per-page steps), `SEO_ARCHITECTURE.md`, `DESIGN_SYSTEM.md`, `research/seo/` (keyword research).

## 1. One route, one layout, one data source

```
app/[category]/page.tsx                 route for all 17 approved root URLs (/appetizers, /kids-meal, …)
  └─ components/category/CategoryPageLayout.tsx   fixed section order (below)
       ├─ data: lib/category-data.ts      reads the SHARED menu data (content/menu/)
       └─ text: content/menu/category-pages.ts   one CategoryPageContent entry per page
```

- **Prices, calories, serving sizes, images, and ratings are never typed into a page.** They come from `content/menu/` (products, offerings, options), the same data as the homepage. A data update changes the homepage and every category page at once.
- A page exists only when the category's `contentStatus` (`content/menu/categories.ts`) is `"preview"` or `"published"` **and** it has an entry in `category-pages.ts`. Other paths show the 404 page (HTTP 200 + noindex, a known Next.js 16 behavior; see `HOMEPAGE_SEO_AUDIT.md` §4).
- `/design-preview/category` (development only, 404 in production) shows every building block with placeholder text and real data.

## 2. Page layout (fixed order, no sidebar)

| # | Block | Component | Notes |
|---:|---|---|---|
| 1 | Breadcrumb | `components/navigation/Breadcrumbs` (existing) | Home > Menu (`/#full-menu`) > Category; BreadcrumbList JSON-LD |
| 2 | Hero | `components/category/CategoryHero` | The only H1. Short intro. Facts bar: item count, "Last verified: Month Year" (real data), "Prices: online pickup, USA." + "Prices may vary by location across the USA.", jump link to the table. Never the reference restaurant. Preview notice when unpublished |
| 3 | Price table section (H2) | `components/menu/MenuTable` (existing = **MenuPriceTable**) | Visible H2 from `tableHeading` (outline heading) + optional `tableIntro`; complete category list: price, calories, notes, golden visitor rating (omitted when `showRatings: false`). Olive header with white text, alternating white / light olive rows; stacked rows on phones. `priceNotes` and `nutritionNotes` are listed under the table |
| 3b | Photo cards (3-5, H3 inside the table section) | `components/category/FeaturedItems` → `components/menu/MenuItemCard` (existing) | Same cards as the homepage (price, sizes, rating). Chosen with `featuredOfferingIds`; `[]` = no cards (promotion pages); omitted = the first 5 with an image |
| 4 | Category sections | `components/category/ContentSection` (+ `ComparisonTable`) | H2 per section (the approved outline headings); reuses the article `ContentBlocks` (paragraph, H3 subheading, list, note) plus `{ type: "comparison", id }` blocks |
| 5 | FAQ | `components/category/FAQSection` | Native `<details>` accordion (keyboard, no JavaScript, text in HTML) + FAQPage JSON-LD with the same text |
| 6 | Sources (H2 "Sources") | `components/category/SourceNote` | Short box: "Menu information is based on official Olive Garden resources. Prices and availability may vary by location across the USA." + "Calc." note, **one** official source (`officialSource`: website by default, or the nutrition PDF), optional **one** `extraSource`, "Last verified: Month Year", independent-site disclaimer. The full `sources` list is internal (not rendered) |
| 7 | Related Menus (H2 "Related Menus") | `components/category/RelatedCategories` + `getRelatedMenus()` | Cards with the target page's `menuTitle` and a reason; only live pages (published, or preview when this page is a preview), never itself or a placeholder; + "See the full menu" |
| — | Structured data | inside the layout | `WebPage` (name, headline, description, language, isPartOf WebSite, publisher, dateModified = latest of price check and page review) + BreadcrumbList + FAQPage |

Not duplicated: the breadcrumb, price table, and item cards reuse the existing components. The table look lives in `components/menu/table-styles.ts`, shared by `MenuTable` and `ComparisonTable`.

## 3. Content model (`CategoryPageContent`, `lib/types.ts`)

| Field | Required | Purpose |
|---|---|---|
| `categoryId` | yes | Approved category (slug = id) |
| `primaryKeyword` | yes | Owner-approved primary keyword (`research/seo/KEYWORD_MASTER_MAP.md`); unique across pages |
| `menuTitle` | yes | Public article title used by other pages' "Related Menus" cards, e.g. "Olive Garden Lunch Menu" (starts with "Olive Garden", no year, unique) |
| `secondaryKeywords`, `searchIntent` | no | Planning notes; not rendered |
| `metaTitle`, `metaDescription` | yes | Unique; the site name is added by the title template |
| `h1`, `intro[]` | yes | Search-intent H1; short original intro |
| `contentReviewedAt` | recommended | Date the text was last reviewed (shown in the source note) |
| `tableCaption`, `priceNotes[]` | yes | Table caption; verified extra price details |
| `tableHeading`, `tableIntro[]` | recommended | Visible H2 of the table section and short text before the table |
| `showRatings` | no | `false` hides the rating column and card ratings (promotion pages) |
| `servingPlans[]` | no | Static headcount tables (catering for 10/20/50/100), placed by `{ type: "servingPlan", id }`: units = guests ÷ the smaller official serving number, rounded up; food subtotal and per guest are **Calc.**; tax, delivery, and tips excluded. Not an interactive calculator |
| `gallery` block | no | `{ type: "gallery", label, images[] }`: small photo grid (owner images listed in `IMAGE_MANIFEST.md`), e.g. one photo per soup |
| `noRatingOfferingIds` | no | Table rows shown without a visitor rating (non-food merchandise such as the Cheese Grater); never photo cards |
| `featuredOfferingIds[]`, `featuredHeading` | no | 3-5 photo cards (items of this category with an image) |
| `sections[]` | no | `{ id, heading, blocks[] }`; blocks = paragraph / subheading (H3) / list / note / comparison |
| `comparisons[]` | no | Comparison tables (below), placed by a `comparison` block |
| `nutritionNotes[]`, `sources[]`, `faqs[]`, `related[]` | yes | Notes, the **complete internal** source record (not rendered), visible FAQs, related menus (shown only when live) |
| `officialSource`, `extraSource` | no | Public Sources box: `"website"` (default) or `"nutrition"`; one extra official page only when an important claim needs it (must be in `sources`) |
| `optionTables[]` | no | Tables of Create Your Own Pasta options (`content/menu/create-your-own-pasta.ts`), placed by `{ type: "optionTable", id }`. Columns: price ("Included" / "+$x"), calories, text, `caloriesPlus` (calculated: option + listed options) |
| `pastaBuilds[]` | no | Calculated example pasta orders, placed by `{ type: "pastaBuilds", id }`: price = base + toppings; plate calories = pasta + sauce + toppings (the base range is never added twice); full meal adds the soup/salad and 0-2 breadsticks |
| `tableOfferingIds[]` | no | Only for a category without its own offerings (Create Your Own Pasta): the price table and photo card use these offerings instead (ratings stay shared by product). The hero then counts the 23 build options |

### Comparison tables (`ComparisonTableSpec`)

Rows point to offering ids, and columns are computed from the shared data in `lib/category-data.ts`:

| Column `kind` | Value | Label on the page |
|---|---|---|
| `price` | Verified price of the offering, or of `row.option` (a size or variant) | — |
| `calories` | Verified calories (ranges kept) | — |
| `serving` | Official serving size text | — |
| `category` | Menu section name (e.g. Lunch vs Lighter Portions) | — |
| `pricePerServing` | price ÷ `row.servings` (upper number of the official "serves" range); with `use: "min"` price ÷ `row.servingsMin` (lower number) | **Calc.** + formula |
| `priceDifference` | price − price of `baseRow` ("Same price" when equal) | **Calc.** + formula |
| `caloriesDifference` | calories − calories of `baseRow` (single values only) | **Calc.** + formula |
| `refDifference` | Same-row difference between two versions of a dish: `ref` (default: the row's own offering, `"main"`) minus `baseRef`, price or calories, optional `percent`. Equal values or equal ranges show "Same" | **Calc.** + formula |
| `text` | Short verified text per row (`row.text[key]`) | — |

**Same dish in other sizes:** a row can carry `refs` (e.g. `{ regular: {...}, lunch: {...} }`); `price` and `calories` columns with `ref: "regular"` read that offering instead (`missing` = note when a row has no such ref). Used for the regular / lighter / lunch tables.

Unverified values show the item's note or "Not verified yet", never a number. A note under every table with calculated cells explains "Calc. = our calculation from official values".

## 4. SEO behavior

- **Metadata:** `pageMetadata()` (`lib/metadata.ts`) gives title (approved titles are used as written, without the site-name suffix), description, a **self-referencing canonical** (`/<slug>`), Open Graph, and a Twitter card.
- **Indexing:** `indexable` only when `contentStatus === "published"` and the site-wide switch `SITE_INDEXING=true` is on. Preview pages are always `noindex, follow`.
- **Sitemap:** `app/sitemap.ts` lists only published category pages (lastmod = the category's real last check date).
- **Structured data:** `WebPage`, `BreadcrumbList`, and `FAQPage` only for visible FAQs. Never `Menu`, `MenuItem`, `Product`, `Offer`, `Review`, or `AggregateRating` (`SEO_ARCHITECTURE.md` §3).
- **Rendering:** everything is server-rendered. The only client parts are the rating rows and size selectors inside the cards and table.

## 5. Build-time checks (`lib/category-validation.ts`)

These run on every `npm run dev` and `npm run build`; any failure stops the build:

- `primaryKeyword`, `metaTitle`, `h1`, and FAQ questions are unique across category pages. FAQ questions are also checked against the homepage FAQs.
- Titles and H1s may not use the homepage phrase "Olive Garden Menu with Prices" (cannibalization rule).
- Meta description about 70-165 characters.
- `featuredOfferingIds`: 3-5 items, each in this category and with an image (or `[]`). Exception: a page built from `tableOfferingIds` with fewer than 3 rows may feature exactly those rows.
- `tableOfferingIds` only when the category has no offerings of its own; comparison `refs` must point to existing offerings/options, and every ref key used by a column must exist on a row.
- `optionTables` / `pastaBuilds`: placed in a section, known option ids, builds use the right option groups (pasta, sauce, topping, first course) with calories, breadsticks 0-2.
- Section ids: lowercase-hyphenated, unique, and not reserved by the layout (`prices`, `popular`, `nutrition`, `faqs`, `sources`, `related`).
- Comparisons:
  - known offering ids and options
  - placed exactly where a section references them
  - at least 2 rows
  - every row has `servings` when a price-per-serving column is used
  - a `baseRow` that exists
- `contentReviewedAt` is an ISO date.

## 6. Status of the 17 pages (2026-11-13)

| Page | Status |
|---|---|
| `/appetizers` | **Published**, rewritten in Batch 1 (Lesson 8.4, 2026-11-13) from the approved outline |
| `/family-style-meals`, `/classic-entrees`, `/buy-one-take-one`, `/amazing-alfredos` | **Published** (Batch 1, owner approval 2026-11-13). Indexed and listed in the sitemap only when `SITE_INDEXING=true` (launch) |
| `/soups-salad-and-breadsticks`, `/lighter-portions`, `/create-your-own-pasta`, `/lunch-menu` | **Preview** (Batch 2, 2026-11-13): complete content, noindex, not in the sitemap. Owner approval needed to publish |
| `/desserts`, `/drink-menu`, `/sides-sauces-and-extras`, `/non-alcoholic-beverages`, `/wine-and-beer-to-go` | **Preview** (Batch 3, 2026-11-14): complete content, noindex, not in the sitemap. Owner approval needed to publish |
| `/gluten-sensitive`, `/kids-meal`, `/catering` | **Preview** (Batch 4, 2026-11-14): complete content, noindex, not in the sitemap. Owner approval needed to publish |

All 17 category pages now have content (full table: `CATEGORY_DEVELOPMENT_CHECKLIST.md` §F).
