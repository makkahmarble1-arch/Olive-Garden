# Homepage SEO Audit

**Date:** 2026-11-13 (Lesson 7.5). **Tested on:** local production build (`next build` + `next start`), indexing switched off.
Related: `SEO_ARCHITECTURE.md` (rules), `PERFORMANCE_AUDIT.md`, `LAUNCH_CHECKLIST.md`.

## 1. Previous lessons verified (browser, 2026-11-13)

| Check | Result |
|---|---|
| 17 menu categories, one H2 each, in the approved order | 17 / 17 |
| Approved offerings on the homepage | 231 / 231 cards (+ 6 Popular Menu Items cards) |
| Food images | 239 images on the page, 0 broken, 0 missing alt, 0 "Photo coming soon"; 144 unique files, all real WebP |
| Menu search | Works ("alfredo" → 30 of 255 searchable items, clear → all 231 cards); live status for screen readers |
| Category navigation | 17 chips, all targets exist; click scrolls to the section and marks it `aria-current` |
| Portion / size selectors | 31 selectors; changing one updates the price (e.g. Chicken Alfredo bundle $66.99 → $74.99) |
| Rating system | Lesson 7.4.6 audit passed; `npm run test:rating-api` 20/20 again on 2026-11-13 |
| Console / hydration errors (clean browser, production build) | 0 |

Unresolved from earlier lessons: 2 development test votes in the real database (cleanup procedure: `RATING_SYSTEM.md` §9.3).

## 2. Metadata (Next.js Metadata API)

| Item | Homepage value |
|---|---|
| `<title>` | Olive Garden Menu with Prices & Calories (2026) (47 characters, absolute, no site suffix) |
| Meta description | Explore the complete Olive Garden menu with updated 2026 prices, calories, lunch specials, family meals, desserts, drinks, and catering options. (144 characters) |
| Canonical | `/` (absolute through `metadataBase` = `NEXT_PUBLIC_SITE_URL`; no domain hardcoded) |
| Open Graph | type website, site name, locale `en_US`, url, title, description, image 1200 × 630 |
| Twitter | `summary_large_image` with the same image and alt text |
| Social image | `public/images/og/olive-garden-menu-prices.jpg` (owner photo of the hero spread, cropped to 1200 × 630, JPEG, 123 KB) |
| Language | `<html lang="en">`, `og:locale en_US`, structured data `inLanguage en-US` |
| Robots | `noindex, follow` while indexing is off; `index, follow` with `SITE_INDEXING=true` (tested) |
| Verification date | Visible "Last checked" in the pricing bar + `WebPage.dateModified` = 2026-11-12 (real last price check) |

Reusable setup: `lib/metadata.ts` → `pageMetadata({ title, description, path, absoluteTitle?, indexable?, image?, type? })` and `robotsFor()`. Used by the homepage, `/menu`, and the category pages; the root layout sets the shared defaults (site name, locale, default image, Twitter card, default robots).

Other pages after the change:

| URL | Title | Robots now | Canonical |
|---|---|---|---|
| `/appetizers` (published) | Olive Garden Appetizers Menu with Prices \| Olive Garden Menu & Prices | noindex (switch off) → index with switch | self |
| `/menu` | (no page) | permanent redirect 308 → `/` (2026-11-13) | n/a |
| `/design-preview` | 404 in production | noindex | none |

## 3. Headings and content

- One H1: "Olive Garden Menu with Prices & Calories 2026".
- 24 H2 = 17 category sections + 7 supporting sections (Popular Menu Items, Lunch Specials & Deals, Hours, Holiday Hours, Nutrition & Dietary Options, How to Order Online, FAQ).
- 0 H3 and no skipped heading levels.
- Content was not rewritten in this lesson. It is the approved original English text, with no repeated paragraphs and a FAQ that matches its markup (8 of 8 questions visible).
- Pricing transparency stays visible: the reference restaurant (Orlando – Millenia Mall, online pickup), the last-checked dates, "prices vary by location", and a "How we check prices" section with sources.

## 4. Indexing architecture

| File | Behavior |
|---|---|
| `lib/site.ts` | `indexingEnabled = process.env.SITE_INDEXING === "true"` (default **off**) |
| `app/robots.ts` | `Allow: /`, `Disallow: /api/`; adds `Sitemap:` only when indexing is on. CSS, JS, and images are never blocked |
| `app/sitemap.ts` | Empty while off. When on: `/` (lastmod = last menu check) + **published** category pages (now `/appetizers`, lastmod 2026-11-11). Never `/menu`, previews, placeholders, `/design-preview`, or the API |
| Pages | `pageMetadata({ indexable })` + global switch; `/menu` and preview category pages are `indexable: false` |

Verified with a test build (`SITE_INDEXING=true`, `NEXT_PUBLIC_SITE_URL=https://www.example.com`):

- the robots file listed the sitemap
- the sitemap contained only `/` and `/appetizers`
- both pages were `index, follow`, with canonicals on the test domain
- `/menu` stayed `noindex, follow`

The normal build was restored afterwards (indexing off).

**Update 2026-11-13 (owner decision):** `/menu` now permanently redirects to `/` (HTTP 308, tested: `/menu` → `/`, query string kept). The old hub page was removed. `/appetizers` breadcrumbs and links point to `/#full-menu` (no redirect hop); 0 internal links to `/menu` remain. Production domain: https://olivegardenmenuprices.us (set as `NEXT_PUBLIC_SITE_URL` in Vercel).

**Known Next.js 16 behavior:** with Cache Components, an unknown or placeholder URL such as `/classic-entrees` or `/abc` shows the 404 page with **HTTP 200** plus an automatic `noindex` (streamed response; documented in `node_modules/next/dist/docs/.../loading.md`, "Status codes"). These URLs are never indexed, but crawlers may report "soft 404". A real 404 status needs a Proxy (`proxy.ts`) check of the URL before rendering; see `LAUNCH_CHECKLIST.md`.

## 5. Structured data

Homepage, all checked as valid JSON:

- **One `@graph` block:**
  - `WebSite` (`#website`)
  - `Organization` (`#organization`, the independent publisher, with "Not affiliated with Olive Garden or Darden" in its description)
  - `WebPage` (`#webpage`: name, headline, description, `inLanguage`, `isPartOf`, `publisher`, `primaryImageOfPage`, `dateModified`)
- **A separate `FAQPage` block** for the visible FAQ (8 questions).
- `/appetizers` has `BreadcrumbList` and `FAQPage`.

Deliberately **not** used: `Restaurant`, `Menu`, `MenuItem`, `Product`, `Offer`, `Review`, `AggregateRating`.

- The site is not the restaurant and does not sell anything, so `Menu`/`MenuItem` markup would present it as the official menu (`SEO_ARCHITECTURE.md` §3).
- Visitor ratings are shown on the page only, never as rating markup.
- No rich result is promised. Before launch, run Google's Rich Results Test and the Schema.org validator on the live URL.

## 6. Images

| Check | Result |
|---|---|
| Format | 144 unique food/hero files, all real WebP (file signature checked); social image JPEG for compatibility |
| Responsive | `next/image` with `srcSet` + `sizes` on all 239 images (cards request 256–384 px variants) |
| Alt text | 239 / 239 descriptive |
| Dimensions reserved | width/height on all images, aspect boxes; CLS 0 |
| Loading | Hero: preloaded (`<link rel="preload" as="image">`, eager); the other 238: `loading="lazy"` |
| Paths | 0 broken (every `src` exists in `public/`) |
| Duplicates / mappings | Unchanged from the image audits (`IMAGE_MANIFEST.md`) |

## 7. Accessibility (Lighthouse + manual)

- **Lighthouse accessibility:** 100 on mobile and on desktop, in every run.
- **Layout:** no horizontal overflow at 340, 390, 820, or 1280 px.
- **Touch and keyboard:** star touch targets are 24 × 44 px, with one Tab stop per rating row and keyboard voting.
- **Screen readers:** the search has a label and a live result count, and the size selectors have labels.
- **Contrast:** gold is used only for the star graphics; the rating numbers use the muted text color.

## 8. Remaining SEO items

1. Production domain and `NEXT_PUBLIC_SITE_URL` (pending owner decision).
2. Switch indexing on (`SITE_INDEXING=true`) only at launch, with owner approval.
3. `/menu` → `/` redirect decision.
4. Optional real 404 status for unknown URLs (Proxy).
5. Author or "About" page and logo for `Organization` (pending owner info).
6. Search Console verification and sitemap submission after launch.
