# SEO Fix List (Lesson 8.5)

**Audit date:** 2026-11-14.
**Priorities:**
- **P0** blocks launch / harmful
- **P1** before launch or indexing
- **P2** should do
- **P3** optional

**Status (Lesson 8.5.1, 2026-11-14):** the owner approved the corrections. Each item below is marked:
- **RESOLVED**: changed and verified on a production build
- **PENDING (launch)**: a manual pre-launch task
- **OPEN**: needs a further owner decision

Verification: `tsc`, ESLint, build, the full 18-page link/metadata/JSON-LD audit, and rating API success/failure tests (see `COMPLETE_SEO_AUDIT.md` §9).

## P0: Critical

None found.

## P1: Before launch / indexing

| # | Page | Issue | Evidence | Fix |
|---|---|---|---|---|
| P1-1 **RESOLVED** | 12 preview pages | They are not published, so they cannot be indexed and published pages do not link to them | `contentStatus: "preview"` in `content/menu/categories.ts` | Done: all 17 pages are `published` (content status only). All 18 pages return HTTP 200 with `noindex, follow`; the sitemap stays empty while indexing is off |
| P1-2 PENDING (launch) | `/buy-one-take-one`, homepage deals | Promotion status ($6 Take Home / Buy One Take One) is time-sensitive | Checked November 2026 | Manual browser check on olivegarden.com just before launch. Update the data and month only if the check confirms it |
| P1-3 PENDING (launch) | `/soups-salad-and-breadsticks`, `/lunch-menu` | The limited-time lunch combo price and lunch hours may change | Checked November 2026 | Re-check before launch |
| P1-4 PENDING (launch) | `/catering` | "Starting at" prices and delivery rules/minimums | Checked November 2026 | Re-check on the catering site before launch |
| P1-5 PENDING (launch) | `/kids-meal` | The kids age wording and the basis for the Kids Fettuccine Alfredo 440 Cal value | Noted during Batch 4 | Confirm on the official menu or nutrition PDF. Keep the current label until then |
| P1-6 PENDING (launch) | `/non-alcoholic-beverages` | The refill policy is not confirmed by an official source | Page wording is cautious | Verify, or keep the cautious wording ("ask your restaurant") |
| P1-7 PENDING (launch) | All pages | The canonical / Open Graph host comes from `NEXT_PUBLIC_SITE_URL` | Local value is `http://localhost:3000` | At launch, confirm Vercel Production has `https://olivegardenmenuprices.us`, then enable `SITE_INDEXING` (owner approval). Not part of this lesson |

## P2: Should do

| # | Page | Issue | Evidence | Fix |
|---|---|---|---|---|
| P2-1 **RESOLVED** | `/api/ratings` (all pages) | It can return HTTP 500 for a short time when the database cannot be reached during a background refresh. The `connection()` call inside the error branch is not allowed during static revalidation | The server log shows "Dynamic server usage: Route /api/ratings couldn't be rendered statically…" after a Supabase error. It was seen once (500), then 200 on every later request | The visitor impact is small: cards show "Ratings unavailable" for that request. Fixed: `connection()` moved to the start of the handler (route is dynamic). The database is still read about once a minute (`use cache`), and successes are CDN-cached for 60 s. Failures return 200 `available:false` with `no-store`. Tested: 3/3 success and 3/3 database-unreachable (`RATING_SYSTEM.md` §9.6) |
| P2-2 **RESOLVED** | `/gluten-sensitive` vs `/kids-meal` | Near-identical FAQ questions | "Does Olive Garden have / offer gluten-sensitive kids meals?" | Fixed: the gluten page asks "Which Olive Garden soup and salad are gluten-sensitive?"; the detailed kids answer is now on `/kids-meal`. The overlap is no longer flagged |
| P2-3 **RESOLVED** | `/` vs `/gluten-sensitive` | Overlapping gluten FAQ | "gluten-free food?" vs "a gluten-free menu?" | Fixed: the short answer is unchanged (including the no-certification/fryer warning), plus the link "Gluten-sensitive dishes, prices, and precautions" to `/gluten-sensitive`. The wording overlap remains by design (different depth) |
| P2-4 **RESOLVED** | `/appetizers` | Only 2 inbound links | Internal linking audit §2 | Fixed: added to both Related Menus; now 4 inbound pages |
| P2-5 **RESOLVED** | Category pages (Batches 1-4) | Inline text links point to homepage sections instead of the dedicated pages | `/#lunch-menu`, `/#lighter-portions`, `/#catering`, `/#sides-sauces-and-extras`, `/#gluten-sensitive`, `/#kids-meal` (13 links in `category-pages.ts`) | Fixed: all 13 changed to the page URLs; 0 category `/#…` anchors left (4 `/#full-menu` links kept on purpose) |
| P2-6 OPEN (owner photos) | Homepage, `/classic-entrees`, `/gluten-sensitive` | 6 "Photo coming soon" placeholders (4 products) | `MISSING_IMAGES.md` section 00 | The owner supplies photos. Top priority: Grilled Chicken Parmigiana (GS), then 6 oz Sirloin, Herb-Grilled Salmon, Lasagna Combination |

## P3: Optional

| # | Page | Issue | Fix |
|---|---|---|---|
| P3-1 CLOSED | `/sides-sauces-and-extras` | The primary keyword "sides menu" is not in the title or H1 (owner-approved title) | Owner decision 2026-11-14: keep the approved title |
| P3-2 CLOSED | 11 category pages | The primary keyword phrase is not in the meta description | Owner decision 2026-11-14: keep the natural descriptions |
| P3-3 **RESOLVED** | `/desserts`, `/kids-meal` | The to-go FAQ answers use the same template | Fixed: desserts mention the catering half/whole cakes; kids mention the gluten-sensitive meals and the side + drink. The pair (answer similarity 0.89) is no longer flagged by the audit |
| P3-4 OPEN (owner photos) | Several pages | Photos that do not match the dish: Zuppa Toscana (bacon), Chicken & Gnocchi (thick), kids plates (carrots), Side of Meatballs, 2-Liter Soda, Doughnuts, Cappuccino | Consolidated and classified in `MISSING_IMAGES.md` ("Consolidated image replacement manifest") |
| P3-5 | All category pages | Breadcrumb "Menu" item URL is `/#full-menu` | No change needed (approved design) |
| P3-6 **RESOLVED** (2026-11-14) | Unknown URLs | One-segment URLs (`/abc`) return HTTP 200 + `noindex`. Two-segment URLs (`/abc/def`), `/api/nope` and `/design-preview` return 404 | Cause: `/abc` matches `app/[category]`. With Cache Components the static shell streams first, which fixes the status at 200 before `notFound()` runs (Next.js docs: loading.md "Status codes"). `dynamicParams = false` is not allowed with Cache Components. Fixed with `proxy.ts` (owner approval): unknown one-segment URLs now return **HTTP 404** (normal 404 page). Valid pages, `/menu` 308, assets, and the API are unchanged (`LAUNCH_CHECKLIST.md` §1) |

## Notes

- **Premium card rollout:** confirmed by the owner (Lesson 8.5.1). The global design from commit `63ed27d` is final; `CLAUDE.md` and `DESIGN_SYSTEM.md` 4.2 are updated.
- **Test votes:** the owner approved removing the 2 development votes. The SQL is ready (`supabase/maintenance/2026-11-14_remove_two_dev_test_votes.sql`) and was **not** run; the owner runs it in the Supabase SQL Editor. A third vote (Breadsticks, 3 stars) is kept.
