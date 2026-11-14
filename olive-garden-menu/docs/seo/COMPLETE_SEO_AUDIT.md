# Complete SEO and Content Audit (Lesson 8.5)

**Audit date:** 2026-11-14 · **Corrections:** Lesson 8.5.1, same day (§9) · **Scope:** the homepage and all 17 category pages (18 URLs).
**Method:** the rendered HTML of a local production build (`next build` + `next start`, port 3100) was parsed for every page:
- metadata, headings, links, images, JSON-LD, and visible text
- compared with the content source (`content/menu/category-pages.ts`), the shared menu data, and the saved research (`research/seo/`)

No search volumes, rankings, or keyword-density targets were used; no fresh SERP check was made. Details:
- `PAGE_BY_PAGE_CONTENT_AUDIT.md`
- `KEYWORD_CANNIBALIZATION_AUDIT.md`
- `INTERNAL_LINKING_AUDIT.md`
- prioritized fixes: `SEO_FIX_LIST.md`

## 1. Overall result

| Area | Result |
|---|---|
| Pages | 18/18 return HTTP 200 with their approved content. 5 category pages `published` (Batch 1), 12 `preview` (Batches 2-4, development complete; Batch 4 approved by the owner 2026-11-14). No placeholder pages remain |
| Indexing safeguards | Every page `noindex, follow`; sitemap empty while `SITE_INDEXING` is off; `/menu` → `/` (308); `/design-preview` 404 in production; unknown URLs: HTTP 200 + `noindex` (known Next.js 16 behavior, `HOMEPAGE_SEO_AUDIT.md` §4) |
| Metadata | 18 unique titles, 18 unique descriptions, 18 unique H1s; self-canonicals; Open Graph and Twitter tags on every page (canonical/OG host comes from `NEXT_PUBLIC_SITE_URL`; locally `http://localhost:3000`, production must be `https://olivegardenmenuprices.us`) |
| Headings | One H1 per page; no skipped heading levels on any page |
| Structured data | `WebSite`, `Organization` (the independent publisher), `WebPage`, `BreadcrumbList` (category pages), `FAQPage` (visible FAQs only). No `Restaurant`, `Menu`, `Product`, `Review`, or `AggregateRating`. FAQ JSON-LD matches the visible questions on all 18 pages. No JSON parse errors |
| Links | 18 unique internal targets, all HTTP 200; every in-page `#anchor` exists; no empty anchors; no links to placeholder routes; homepage links to all 17 category pages; no orphan pages |
| Owner standards | 0 public mentions of Orlando/Florida/Millenia/address; 0 full verification dates (month + year only); 0 "AI" mentions; every category page has a short "Sources" box (1-2 official links) and "Related Menus" with real article titles, no self-links |
| Images | 0 images without alt text, 0 broken images; 6 homepage placeholders (4 products whose incorrect photos were removed, `MISSING_IMAGES.md` section 00) |
| Accuracy | Prices and calories come from the shared data on every page (no typed tables). Time-sensitive statements (promotions, limited-time items, hours, catering rules) were checked 2026-11-12/13/14 and need a fresh manual check before launch |

**Critical (P0) issues found: none.** The important items are pre-launch re-verification of time-sensitive facts and the owner's publishing decision for the 12 preview pages (see `SEO_FIX_LIST.md`).

## 2. Page status

| Page | Content status | Audit status |
|---|---|---|
| `/` | Homepage (indexable at launch) | Pass |
| `/family-style-meals`, `/appetizers`, `/classic-entrees`, `/amazing-alfredos` | Published | Pass |
| `/buy-one-take-one` | Published | Needs Improvement (promotion status must be re-verified before launch) |
| `/soups-salad-and-breadsticks`, `/lunch-menu`, `/non-alcoholic-beverages`, `/kids-meal`, `/catering` | Published (8.5.1) | Needs Improvement (time-sensitive or unverified facts to re-check before launch: limited-time lunch combo, lunch hours, refill policy, kids age wording and Kids Alfredo calorie basis, catering prices and delivery rules) |
| `/lighter-portions`, `/create-your-own-pasta`, `/desserts`, `/drink-menu`, `/sides-sauces-and-extras`, `/wine-and-beer-to-go`, `/gluten-sensitive` | Published (8.5.1) | Pass (minor P2/P3 items) |

## 3. Search intent and content quality (summary)

- Every page opens with a direct answer: what is on the menu, the price range, and the key rule (for example lunch hours, gluten-sensitive wording, catering per-person cost).
- Every page has:
  - the complete category table (shared data, prices, calories, ratings)
  - the outline sections
  - comparisons with labeled calculations
  - 5-9 FAQs
- Content is original American English, factual, and dated where things change. No firsthand experience claims, no invented popularity, no health claims.
- Dietary pages:
  - The gluten page uses Olive Garden's own wording: "gluten-sensitive"; "gluten-free" only for the rotini.
  - It shows a cross-contact warning above the table and gives no safety guarantee.
- Repeated text across pages is limited to shared menu-card descriptions (the same item on two menus, for example family and catering pans) and standard notes. No article paragraphs are duplicated between pages.

## 4. Keyword cannibalization (summary)

No harmful cannibalization:
- Each page has its own primary keyword, title, H1, and intent.
- Similar title patterns ("Olive Garden … Menu with Prices 2026") are shared formatting, not shared intent.

Two near-duplicate FAQ questions and one homepage FAQ overlap are listed as P2 in `KEYWORD_CANNIBALIZATION_AUDIT.md`.

## 5. Internal linking (summary)

All links work. Only live pages are linked:
- Published pages may not link to preview pages (owner standard), so several preview pages currently get links only from the homepage and other preview pages.
- This resolves automatically when the owner publishes them (`getRelatedMenus`).
- After publishing, a few inline links in Batch 1 text that point to homepage sections (`/#lunch-menu`, `/#lighter-portions`, `/#catering`, `/#sides-sauces-and-extras`, `/#gluten-sensitive`, `/#kids-meal`) should point to the dedicated pages.

## 5a. Competitor gaps (from the saved research in `research/seo/`, no new SERP check)

| Gap | Our coverage | Action |
|---|---|---|
| Competitors show prices "near me" or by state | The site deliberately shows USA prices from one checked restaurant plus a variation notice (owner standard) | None. This is a deliberate, honest choice |
| Competitors list per-item nutrition beyond calories (fat, sodium, carbs) | Calories only | Optional future content; it needs the official nutrition PDF values and owner approval (no new pages) |
| Competitors publish "secret menu" or hack content | Not covered | Not recommended: unverifiable claims |
| Competitors show hours per location | General hours, with a "check your restaurant" note | None |
| Competitors use "last updated" day dates | Month and year (owner standard) | None |

Our pages are stronger than the researched competitors in: labeled calculations (cost per person, calorie differences), the cross-contact safety wording, genuine visitor ratings, and sources on every page.

## 6. Checks run

| Check | Result |
|---|---|
| `npx tsc --noEmit` | Pass |
| ESLint | Pass |
| `npm run build` | Pass (homepage and all 17 category pages prerendered) |
| Internal link audit (all `href`s on 18 pages + anchors) | Pass, 0 broken |
| Metadata validation (title, description, canonical, robots, OG, Twitter) | Pass; production host to confirm in Vercel |
| Structured data inspection (types, FAQ text vs visible FAQ, parse errors) | Pass |
| Rich Results Test / Search Console | Not run (pages are noindex and not public yet) |
| Fresh official re-verification of prices and promotions | Not possible from code (olivegarden.com blocks automated fetches); manual browser check needed before launch |

## 7. Corrections made in this lesson

None. The only technical defect found (`/api/ratings` can return HTTP 500 during a background refresh when the database is briefly unreachable, `SEO_FIX_LIST.md` P2-1) touches the rating system, so it was reported instead of changed. All recommended changes are in `SEO_FIX_LIST.md` and need owner approval.

## 8. Notes

- The Lesson 8.5 brief says not to roll out the premium menu card globally. The owner had already asked for it ("saare cards pe ye design laga do"), and it was committed and pushed as `63ed27d`. Nothing was changed back in this audit.
- `CONTENT_GAPS.md` site-wide gap 1 (show the reference location and exact check date) was replaced on purpose by the owner's public display standard: USA, and month and year only. The exact data stays internal.

## 9. Lesson 8.5.1: approved corrections (2026-11-14)

The owner approved the corrections. Everything below was verified on a fresh production build (`next build` + `next start`). The full 18-page audit script was run again.

### Completed and verified

| Item | Result |
|---|---|
| Publish all category pages | 17/17 `published`; the "Preview" notice is gone; all 18 pages HTTP 200 with `noindex, follow`; sitemap empty (indexing off) |
| FAQ overlaps (P2-2, P2-3, P3-3) | Gluten page's kids FAQ replaced by a soup/salad FAQ; kids details moved to `/kids-meal`; homepage gluten FAQ links to `/gluten-sensitive`; desserts and kids to-go answers made specific. FAQ JSON-LD = visible FAQs on 18/18 pages; build validation (unique FAQs) passes |
| Internal linking (P2-4, P2-5) | Appetizers added to Family-Style and Classic Entrees Related Menus; 13 category anchors changed to page URLs. 0 broken links, 0 orphans; every category page has 3 or more inbound pages (lowest: `/kids-meal` with 3) |
| Rating API (P2-1) | Fixed and tested (success 3/3, database unreachable 3/3); see `RATING_SYSTEM.md` §9.6 |
| Premium card and hero | Unchanged (no component, style, or token changes); documented as final in `CLAUDE.md` and `DESIGN_SYSTEM.md` 4.1-4.2 |
| Metadata | 18 unique titles, descriptions, and H1s; titles, descriptions, keywords, URLs, and breadcrumbs unchanged |
| Owner standards | 0 Orlando/Millenia, 0 AI mentions, month-year dates; checked on `/`, `/lunch-menu`, `/catering`, `/kids-meal`, `/gluten-sensitive`, `/desserts` |
| Images | One consolidated replacement manifest in `MISSING_IMAGES.md` |
| Checks | `tsc` pass, ESLint pass, `npm run build` pass |

### Unknown URL status (P3-6; resolved later the same day with `proxy.ts`: `/abc` and `/classic-entrees-x` now return 404)

| URL | HTTP | robots |
|---|---|---|
| `/abc`, `/classic-entrees-x` | 200 | `noindex` (404 page content) |
| `/abc/def`, `/api/nope` | 404 | `noindex` |
| `/design-preview` | 404 | `noindex` |
| `/menu` | 308 → `/` | — |
| `/lunch-menu` | 200 | `noindex, follow` (pre-launch) |

**Cause:**
- One-segment paths match `app/[category]/page.tsx`.
- With Cache Components, the prerendered shell is streamed first, which sends the `200` status before `notFound()` runs. Next.js adds `noindex` instead (Next.js docs, `loading.md` "Status codes").
- `dynamicParams = false` cannot be used with Cache Components.

**Recommended fix (owner approval):** a small `proxy.ts` that returns 404 for unknown one-segment paths before rendering.

### Still pending (launch phase)

- The manual official-source re-checks (`LAUNCH_CHECKLIST.md` §2): no fresh verification was done in this lesson, and no dates were changed.
- Owner photos for 4 missing images.
- The owner runs the vote cleanup SQL.
- Production domain and `SITE_INDEXING` at launch.
