# Launch Checklist

**Status:** not launched. Nothing is deployed, nothing is pushed to GitHub, and search indexing is OFF.
Each item needs the owner's approval. Details: `HOMEPAGE_SEO_AUDIT.md`, `PERFORMANCE_AUDIT.md`, `RATING_SYSTEM.md` §9, `SUPABASE_SETUP.md`.

## 1. Decisions the owner still has to make

- [x] Final domain: **https://olivegardenmenuprices.us** (2026-11-13). Never hardcoded; set `NEXT_PUBLIC_SITE_URL` in Vercel Production.
- [x] `/menu` permanently redirects to `/` (308, `next.config.ts`; done 2026-11-13). Old hub page removed; links use `/#full-menu`.
- [x] Mobile performance: **option A** chosen by the owner (2026-11-13): keep as is, measure real users after launch (`PERFORMANCE_AUDIT.md` §3).
- [x] Real HTTP 404 for unknown URLs: `proxy.ts` (owner approval, implemented 2026-11-14; rules in `CLAUDE.md` SEO rules). Tested on a production build:
  - the homepage and 17 category pages: 200
  - `/abc`, `/classic-entrees-x`, `/Lunch-Menu`, `/abc/def`, `/lunch-menu/extra`, `/blog/test`, `/api/nope`: **404** (normal 404 page with the site header and footer, `noindex`)
  - `/menu`: 308 → `/`
  - assets, `_next/static`, `_next/image`, fonts, robots.txt, sitemap.xml, favicon: 200
  - `/api/ratings`: 200
- [ ] After deploying: repeat these status checks on the live domain (Vercel runs `proxy.ts` as Routing Middleware).
- [ ] Any new **dynamic** route (e.g. `/blog/[slug]`) must extend `proxy.ts` before launch, or unknown slugs return 200 + noindex again.
- [ ] Author/About page, contact email, logo, Privacy Policy, final branding: planned for later lessons (owner, 2026-11-13).

## 2. Before deploying

- [x] Category pages: all 17 have complete content and are `published` (owner approval, Lesson 8.5.1, 2026-11-14). Status table: `CATEGORY_DEVELOPMENT_CHECKLIST.md` section F. They stay `noindex` until `SITE_INDEXING=true`.
- [x] ~~Replacement photos for 4 products whose incorrect images were removed~~ Resolved: `MISSING_IMAGES.md` shows 0 products without an image and 0 placeholders (owner photos 2026-11-14); routine replacement requests are superseded by the permanent image instruction of 2026-11-18. Original note: (priority order in `MISSING_IMAGES.md`, "Consolidated image replacement manifest"; 6 homepage cards show the placeholder until then). Optional replacements are listed there too.
- [ ] **Pre-launch fact verification (manual, official sources, in a browser).** Last checked November 2026. Not re-verified since: change a value or a verification date only after a real check.
  - [ ] Buy One Take One: is it still available?
  - [ ] $6 Take Home: which dishes are eligible?
  - [ ] Limited-time soup, salad and breadsticks lunch combo ($9.99)
  - [ ] Lunch prices and lunch hours
  - [ ] Catering "starting at" prices, delivery minimums and delivery requirements
  - [ ] Kids menu age wording ("under 12" vs "12 and under")
  - [ ] Kids Fettuccine Alfredo: the basis of the 440 calories
  - [ ] Non-alcoholic beverage refill policy (currently stated as not verified)
  - [ ] Other limited-time items: Spicy Alfredo, Crispy Shrimp Fritta, Pumpkin Cookie Butter Cheesecake, Never-Ending Pasta Bowl, and any other time-sensitive value

- [x] **Owner decision 2026-11-20: keep the 2 development test votes as they are** (no deletion; `/menu/family-style-lasagna-bundle` shows "1.0 (1)"). Do not ask again; the SQL file stays available if the owner decides otherwise. Original note: remove the 2 development test votes: the owner runs `supabase/maintenance/2026-11-14_remove_two_dev_test_votes.sql` in the Supabase SQL Editor, steps 1-4 (approved again 2026-11-14). It deletes only those 2 votes. A third vote (Breadsticks, 3 stars) appeared on 2026-11-14 and is kept; the owner decides whether it is genuine. The older 2026-11-13 file would now delete nothing, because it requires exactly 2 votes in total.
- [ ] Privacy policy mentions the functional cookie `og_rv` (ratings only) and that votes are stored as one-way hashes.
- [x] `npm run lint`, `npx tsc --noEmit`, `npm run build`: all pass (re-run 2026-11-19 after publishing all 122 item pages; repeat before every push).
- [x] Local commit "Complete homepage, menu data, images, ratings and SEO foundation" (2026-11-13; env files, secrets, and `image-staging/` excluded).
- [ ] Push to GitHub (owner request; `.env.local` stays git-ignored, check `git status`).

## 3. Vercel environment variables (Project > Settings > Environment Variables)

| Variable | Production | Preview | Notes |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://olivegardenmenuprices.us` | the preview URL, or leave unset | No trailing slash |
| `NEXT_PUBLIC_SUPABASE_URL` | yes | yes | |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | yes | yes | publishable key only |
| `SUPABASE_SECRET_KEY` | yes (Sensitive) | only if previews should accept votes | server only |
| `RATING_HASH_SECRET` | yes (Sensitive) | only if previews accept votes | keep it stable |
| `SITE_INDEXING` | `true` **only at launch** | never | turns indexing on |

## 4. Launch day (in this order)

1. [ ] Deploy to Production **without** `SITE_INDEXING`, and check the live site:
   - pages load and the 17 categories are visible
   - images load
   - ratings load; one test vote, then remove it again (`RATING_SYSTEM.md` §5a)
   - `npm run test:rating-api -- https://olivegardenmenuprices.us` gives 20/20
2. [ ] Add `SITE_INDEXING=true` (Production only) and redeploy. Then check:
   - `https://olivegardenmenuprices.us/robots.txt` lists the sitemap
   - `https://olivegardenmenuprices.us/sitemap.xml` lists `/` and the 17 published category pages
   - the homepage source has `<meta name="robots" content="index, follow">` and a canonical on the final domain
3. [ ] Preview deployments: confirm Vercel sends `X-Robots-Tag: noindex`.
4. [ ] Google Search Console: verify the domain, submit `sitemap.xml`, and inspect the homepage URL.
5. [ ] Rich Results Test and Schema.org validator on the homepage (WebSite, Organization, WebPage, FAQPage; no errors).
6. [ ] Share-preview check (for example the Facebook Sharing Debugger or a chat app): the 1200 × 630 image and the title appear.
7. [ ] PageSpeed Insights on the live URL: record the lab results now; field data appears after a few weeks of traffic.

## 5. After launch

- [ ] Keep the Supabase Free project active (it pauses after about a week without activity).
- [ ] Re-check prices/calories on schedule and update the "last checked" dates (they drive `dateModified` and the sitemap `lastmod`).
- [ ] Monitor Search Console (coverage, Core Web Vitals) and real-user performance before any of the performance options in `PERFORMANCE_AUDIT.md` §3.

## 6. Lesson 8.6 final QA (2026-11-14)

Reports: `docs/testing/` (`FINAL_WEBSITE_QA.md` and four detailed reports).

- [x] Local production build: 18/18 pages 200, `noindex`; responsive 320-1920 px (71 loads, 0 overflow); data, search, navigation, and ratings (isolated DB) pass; Lighthouse Accessibility 100; no secrets in bundles; production dependencies: 0 vulnerabilities.
- [x] Fixed: proxy soft 404 for dotted names and `/api` (now 404); star keyboard focus ring; focus kept after voting; double-submit guard.
- [x] Mobile homepage performance: `content-visibility` was tested in Lesson 8.6.1 and rejected (anchor and accessibility regressions). **Option A kept** (`PERFORMANCE_TEST_REPORT.md` section 6). Measure real users after launch.
- [x] Security headers + `poweredByHeader: false` (Lesson 8.6.1, verified locally). After deploying: check the live headers and HSTS. A CSP needs its own review before adding AdSense, GA4, or Clarity.
- [ ] Dev-only `minimatch` warning (7 moderate): `npm audit fix` has no compatible fix (dry run: 0 changes). Re-check after `typescript-eslint` / `eslint-config-next` updates; no forced update.
- [x] Star touch areas widened where cards have room (27-36 px wide, 44 px tall; Lesson 8.6.1).
- [ ] Manual: click the 21 external official links once (olivegarden.com blocks automated checks).
- [ ] After deploying: repeat the HTTP status, rating (`npm run test:rating-api -- <domain>`), and Lighthouse checks on the live site; check once on a real iPhone and Android phone (Safari not tested locally).

## 7. About Us and Contact Us (Lesson 9.5, 2026-11-14)

- [x] `/about-us` and `/contact-us` built, linked in the footer, `noindex` (status `preview`), and tested.
- [x] Site name changed to **Olive Garden Menu Prices** (`lib/site.ts`).
- [ ] Owner: confirm authorization and accuracy for the proposed founder (Katherine Salom, Founder & Editor) and supply the approved biography (`docs/PUBLISHER_IDENTITY.md` §4). Then About Us → `published`.
- [x] Resend configured locally (sending-only key, verified sending domain `mail.olivegardenmenuprices.us`). One end-to-end test email was received in the Inbox and Reply-To was checked (owner, 2026-11-14). Contact Us is `published` and the email is shown (Lesson 9.5.4).
- [ ] Before deploying: add `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` to Vercel (Production, Sensitive). After deploying: send one labeled test from the live site and confirm it arrives.
- [x] Privacy Policy, Terms and Conditions, and Disclaimer published (Lesson 9.6), and linked in the footer of every page. The Privacy Policy covers the rating cookie and hashes, the contact form (Resend, Hostinger mailbox), hosting, and planned AdSense/analytics.

## 8. Legal and privacy (Lesson 9.6, 2026-11-14)

- [x] Retention decided and published (2026-11-14): contact emails up to 12 months (with exceptions); ratings without fixed expiration (deletion on request or for moderation).
- [ ] Owner: set a **monthly calendar reminder** for the mailbox review that deletes contact messages older than 12 months (`PRIVACY_DATA_INVENTORY.md` §5). The first deletions are due November 2027.
- [x] Professional legal review: declined by the owner for now (2026-11-14). No governing law added.
- [x] Legal pages show complete effective and updated dates (menu pages keep month-and-year).
- [ ] After deploying to Vercel: confirm the hosting wording and regions in the Privacy Policy.
- [ ] Before AdSense or analytics: follow `GOOGLE_ADSENSE_COMPLIANCE_CHECKLIST.md` §3-4. Planned CMP: Google's "Privacy & messaging"; verify its certification and the current requirements first; then the policy update, `ads.txt`, and the CSP review. No script is added before that.

## 9. Editorial pages (Lesson 9.7, 2026-11-14)

- [x] `/editorial-policy` and `/how-we-check-prices` published (`noindex` until launch), linked in the footer and from About, Contact, Disclaimer, and the homepage price bar. Tested: HTTP 200, proxy allows them, metadata, `WebPage` + `BreadcrumbList`, responsive 320-1920 px, 25 internal link targets with 0 broken.
- [ ] When menu data is re-checked, the "last verified" month on `/how-we-check-prices` updates automatically from the data; review the page text only if the method changes.

## 10. Lesson 9.8 compliance audit (2026-11-14)

Reports:
- `docs/GOOGLE_PUBLISHER_POLICY_AUDIT.md`
- `docs/PRE_LAUNCH_COMPLIANCE_REPORT.md`
- `docs/ADSENSE_ACTIVATION_PLAN.md`

**Launch blockers:**
- [x] About Us: founder section replaced by the Editorial Desk; page published (2026-11-14).
- [x] GS Grilled Chicken Parmigiana photo replaced with a rotini photo (2026-11-14; minor: the chicken looks breaded).
- [ ] Manual re-check of time-sensitive facts (§2) and the vote cleanup SQL (§2).
- [x] Legal/trademark review: declined by the owner for now (2026-11-14). Keep the brand-safety safeguards (`PUBLISHER_IDENTITY.md`); no legal clearance is claimed.

**Verified in this audit (local production build):**
- [x] 25/25 pages 200, one H1, valid JSON-LD, unique metadata, 0 broken links, `noindex` + empty sitemap, 404/308 handling, security headers, no secrets in bundles, no ad or analytics scripts.
- [x] Footer: 7 information links on all pages at 320-1440 px.
- [x] Lighthouse Accessibility 100 on the information pages.

**AdSense:** follow `ADSENSE_ACTIVATION_PLAN.md` only after launch. No publisher id, `ads.txt`, CMP, or ad script before then.

- [x] Footer "Menu categories" row with all 17 category pages (owner decision 2026-11-14; tested 16/16).

## 11. Header redesign (2026-11-15, not committed yet)

- [x] Two-row premium header with logo icon, global search, dropdown navigation, mobile menu, and sticky shadow (`DESIGN_SYSTEM.md` 4.4).
- [x] Tested on a production build:
  - layout at 320/375/390/768/1024/1440/1920 px
  - dropdowns: click, hover, keyboard, Escape, click-outside
  - search: 14 queries including typos, keyboard, clear, no results, mobile
  - sticky header and anchors; active page
  - Lighthouse Accessibility 100, CLS 0
  - 25 pages 200, 0 broken links
  - result: 64/64 browser checks
- [ ] Future articles to add to the navigation when written: **Dinner Menu** (hidden now) and a dedicated **Hours** article (Hours points to homepage sections now). Add them in `lib/navigation.ts` and the search index.
- [x] Simpler favicon (2026-11-15): menu book + olive leaf on dark olive, no text (`app/icon.svg`, `favicon.ico` 16/32/48, `apple-icon.png`).
- [ ] Owner review of the header before committing.

## 12. Footer redesign (2026-11-15, not committed yet)

- [x] Four-column dark olive footer: brand + email, Popular Menus, Explore More, Important Links, independence disclaimer, copyright bar with Back to top (`DESIGN_SYSTEM.md` 4.5).
- [x] It replaces the old footer, including its "Menu categories" row (all 17 categories stay reachable through the header Full Menu dropdown) and "Official resources" links (not part of the approved design).
- [x] Tested on a production build:
  - link labels and URLs exactly as approved, no Dinner Menu
  - colors, dividers, logo and email
  - layout at 320/340/375/390/430/768/820/1024/1280/1440/1920 px, no overflow, all targets 44 px+
  - keyboard order through all 21 footer controls, visible focus
  - Back to top: keyboard, focus to the header logo, instant jump with reduced motion
  - favicon links in the head (ico, svg, apple) all 200
  - no console errors
  - result: 35/35 checks
- [x] 25 pages: HTTP 200, one H1, footer disclaimer on every page, 0 broken internal links.
- [x] **Dinner Menu** published (2026-11-15) and added to the header, mobile menu, footer, and search (see §13).
- [x] **Hours** published (2026-11-15) and added to the header Hours dropdown, mobile menu, footer, and search (see §15).
- [ ] Owner review of the header and footer before committing.

## 13. Dinner Menu guide (2026-11-15, not committed yet)

- [x] Research: `research/seo/dinner-menu/` (keyword research, SERP analysis, content outline, fact verification).
- [x] `/dinner-menu` built as a guide page (`content/guides/dinner-menu.ts`): shared data only, no new products, prices, or ratings.
- [x] Integrated:
  - header (desktop and mobile)
  - footer "Popular Menus"
  - site search
  - sitemap (once indexing is on)
  - proxy allows it automatically
- [x] Metadata: title and H1 "Olive Garden Dinner Menu with Prices 2026", unique description, self-canonical, Open Graph, `WebPage` + `BreadcrumbList` + `FAQPage`; `noindex` until `SITE_INDEXING=true`.
- [x] Tested: see the report of 2026-11-15 (26 pages 200, links, responsive, search, navigation).
- [ ] Before launch, re-check the official FAQ, location hours, and specials in a normal browser. olivegarden.com blocked automated checks on 2026-11-15.
- [ ] Optional: People Also Ask research in Chrome (not available this time).
- [ ] Owner review of the Dinner Menu page before committing.

## 14. Related Menus and dinner links (2026-11-15, owner-approved, not committed yet)

- [x] Owner approved: `/dinner-menu` published (content status; indexing still off), and contextual links to it from Lunch Menu ("lunch vs dinner") and Classic Entrees ("budget dinner entrées").
- [x] Related Menus: exactly 4 most relevant cards on all 18 articles (17 categories + Dinner Menu), one row on desktop, 2 x 2 on tablets, stacked on phones. `/dinner-menu` is a card on Appetizers, Classic Entrees, Soup/Salad/Breadsticks, Lighter Portions, Lunch, Desserts, Drink Menu, and Wine & Beer.
- [x] Tested: 18 articles at 1440 px (4 cards, one row, no self-link, all links 200), 768/390/320 px layouts, 26 pages 200, 0 broken links.
- [ ] Re-check the official FAQ, hours, and specials in a normal browser before launch (owner-approved step, still to do).

## 15. Hours guide (2026-11-15, not committed yet)

- [x] Research: `research/seo/hours/` (keyword research, SERP analysis, content outline, fact verification).
- [x] `/hours` built as a guide page:
  - weekly hours table, lunch and dinner times, a 15-row holiday table (official vs "Not announced"), To Go cutoffs, and how to use the official locator
  - no live "open now" status, no location request, no LocalBusiness or Restaurant schema
- [x] Integrated:
  - header Hours dropdown (desktop and mobile)
  - footer "Explore More"
  - search: the guide, plus "Holiday Hours" pointing to `/hours#holiday-hours`
  - sitemap (once indexing is on)
  - the proxy allows it automatically
  - the Dinner Menu now links to `/hours`
- [x] Ready for future holiday articles: a published guide with `navGroup: "hours"` joins the Hours dropdown. Nothing was created.
- [ ] Before launch, re-check the FAQ and two or three restaurant pages in a normal browser. olivegarden.com blocks automated checks.
- [x] Owner approved (2026-11-15): the homepage Hours and Holiday Hours sections link to `/hours` and `/hours#holiday-hours`.
- [ ] Owner review of the Hours page before committing.

## 16. Menu item pages: Fried Mozzarella sample (2026-11-15, not committed yet)

- [x] Competitor research: `docs/product-pages/COMPETITOR_ANALYSIS.md`.
- [x] Architecture, data structure, design, checklist: `docs/product-pages/`.
- [x] `/menu/[slug]` route; `/menu/fried-mozzarella` **published 2026-11-18** (noindex and sitemap-empty until `SITE_INDEXING=true`).
- [x] Owner decisions 2026-11-15: item pages are permanent architecture; preview pages hidden on the production deployment (tested with `VERCEL_ENV=production`: 404, 0 links, 0 search entries); publishing needs approval + visual review + verified data (build check); indexing stays off.
- [x] Central nutrition/allergen data store (`content/menu/nutrition/`, `lib/nutrition-data.ts`).
- [x] Owner supplied the official U.S. Nutrition Information and Allergen Guide PDFs (US_101926, 2026-11-15, `research/official-sources/`, git-ignored).
- [x] 2026-11-18: all 303 nutrition and 112 allergen rows entered centrally; all 231 offerings mapped with a status; build checks calories against the guide. Reports in `docs/product-pages/`.
- [x] Fried Mozzarella: 800 calories confirmed (same serving, sauce separate); full nutrition + allergens on the page; desktop and mobile (320-1920 px) checked, no page overflow.
- [x] Owner decision 2026-11-18: catering Sicilian Cheesecake 730 (applied; same dessert, per slice).
- [x] Side of Crispy Shrimp Fritta: final owner decision 2026-11-18 = keep 200 (serving size of the guide row not confirmable).
- [x] Owner approved the sample design 2026-11-18 → `ownerApprovedAt: "2026-11-18"`, `visualReview: "done"`; all checks passed (incl. production-deployment mode) → status `published`.
- [x] Unverified customization omitted; no vegetarian suitability claims; price kept as last verified November 2026.
- [x] Phase 1 batch 1 built 2026-11-18 as `preview`: Calamari, Toasted Ravioli, Stuffed Ziti Fritta, Breadsticks (fact logs in `research/products/<slug>/`).
- [x] Owner review of batch 1 → published (superseded: all item pages published 2026-11-18/19).
- [x] ~~Owner supplies replacement photos (Italian Grilled Chicken Sandwich, Side of Meatballs)~~ Superseded by the permanent image instruction (2026-11-18): reuse existing owner photos, no repeated replacement requests.
- [x] Phase 1 batch 2 done (part of the 77 pages published 2026-11-18).
- [ ] Optional: owner supplies the vegetarian/vegan PDF to confirm the vegetarian wording.
- [x] Real HTTP 404 for other `/menu/<slug>` URLs (`proxy.ts`); `/menu` still 308 → `/`.
- [x] Menu cards (homepage, appetizers) and price-table names link to the page; search returns it first.
- [x] Same rating key as the cards (`fried-mozzarella`); no database change.
- [x] Structured data: WebPage, BreadcrumbList, FAQPage only.
- [x] **Re-verify from a U.S. network** (done for Fried Mozzarella 2026-11-18 with the official U.S. PDFs; original note follows) (official site blocked ours on 2026-11-15): price, full nutrition (fat, sodium, carbs, protein…), and the U.S. allergen guide marks; then fill `nutrition.values`, `allergens` and set the checklist to `done`.
- [x] Owner review and approval of the sample page → status `published` (2026-11-18).
- [x] Item-page phase complete (2026-11-18): **77 pages** (1 published, 76 preview); 8 with the Phase 4 version selector (owner-approved layout); inventory and reasons in `docs/product-pages/PRODUCT_INVENTORY.md`; open points in `research/products/PENDING.md`.
- [x] QA 2026-11-18 (local `next start`): all 77 pages HTTP 200, one H1, self-canonical, `noindex`, unique titles, descriptions 70-175 characters, JSON-LD only WebPage/BreadcrumbList/FAQPage, no reference-location or "AI" wording, Related Menus present, version selector + "all versions" table on the 8 version pages, placeholder on the photo-less page; homepage links all 77 pages; search index lists all 77; `GET /api/ratings` 200 (no test votes); unknown `/menu/<slug>` 404, `/menu` 308; sitemap empty while indexing is off.
- [x] Production simulation (`VERCEL_ENV=production` build): only `/menu/fried-mozzarella` is live, linked and searchable; preview pages 404.
- [x] Responsive check in Chrome at desktop and 390 px (version tabs wrap, no horizontal scroll).
- [x] Final review 2026-11-18 (`research/products/FINAL_REVIEW.md`): headless-Chrome QA of all 77 pages at 390 px and 1280 px (0 failures), 96 internal links OK, search ranking OK; 2 small fixes (size-card units, "per entrée"); screenshots in `research/products/review-screenshots/`. 63 pages ready, 13 with documented blockers.
- [x] Owner decisions 2026-11-18: the 13 pages with documented gaps may be published with their disclosures (`acceptedGaps`); publish dry run 0 issues.
- [x] **Owner visual approval 2026-11-18** ("haan"): all 76 preview pages are now `published` (`approvals.ts`, `registry.ts`; 4 standalone page files updated). Build check: 0 issues.
  - QA: 77/77 pages OK, browser QA at 390/1280 px 0 failures, 96 links OK.
  - Production simulation: 77/77 pages HTTP 200, 77 homepage links, 77 search entries, `noindex`, sitemap empty while indexing is off.
- [x] Complete menu coverage round 2026-11-19: 45 new item pages (soups, wines, beers, drinks, kids, bundles) built as `preview`; QA 122/122, browser QA 0 failures.
- [x] Owner visual approval of the 45 coverage pages (2026-11-19): all 122 item pages `published`.
- [ ] At launch: `SITE_INDEXING=true` (owner approval); then every published item page enters the sitemap automatically.
- [x] Re-checked 2026-11-18 (official site reachable again): Calabrian Bucatini price conflict resolved ($25.29 / $27.29 / $25.29, data updated); Spicy Alfredo and Pumpkin Cookie Butter Cheesecake still on the menu (limited time: re-check periodically).

## 17. Nutrition & Meal Price Calculator (Improvement 7, 2026-11-20, not committed yet)

- [x] `/nutrition-calculator` built as `preview` (docs in `docs/tools/`); integrated in the header "More" dropdown, footer "Explore More" and site search while live; sitemap entry prepared for `published`.
- [x] `npm run test:calculator`, TypeScript, ESLint, production build, browser tests at 390/768/1280 px (results: `docs/tools/NUTRITION_CALCULATOR_TEST_REPORT.md`).
- [x] Owner approval 2026-11-20 ("approve ha"): `status: "published"`, `ownerApprovedAt: "2026-11-20"`. Owner decision: Buy One Take One / $6 Take Home entries stay out of the calculator.
- [ ] At launch: with `SITE_INDEXING=true` the calculator enters the sitemap automatically (check `/sitemap.xml`).
- [x] Production simulation (`VERCEL_ENV=production` build, 2026-11-20): `/nutrition-calculator` HTTP 404, no header/footer/search link, not in the sitemap.
- [ ] After deploying a preview: check the page once on a real phone.
- [ ] When prices or calories are re-checked: re-run `npm run test:calculator` (named examples) and the build.

