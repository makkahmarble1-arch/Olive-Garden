# Post-Launch Roadmap

**Owner decision 2026-11-22:** launch the existing completed website now. No new articles or features before launch. Everything below is **POST-LAUNCH**: nothing here has a route, a placeholder page, a navigation link or a sitemap entry, and none may be created before the owner starts that item. Each item needs the owner's go-ahead (and, for articles, the owner's SEO instructions) when it starts.

Launch scope (complete, kept as is): homepage (with the Menu PDF section), 17 category pages, Dinner Menu and Hours guides, 122 menu item pages, Nutrition & Meal Price Calculator, 7 information and legal pages. Inventory and checks: `docs/LAUNCH_CHECKLIST.md` §19.

## 1. Articles (not started; no routes exist)

| Item | Status | Notes |
|---|---|---|
| Coupons and promo codes article | POST-LAUNCH, not started | No official coupon source verified (`research/seo/CONTENT_GAPS.md`). Only verified, dated offers; no "kids eat free" or code claims without an official source. |
| Never-Ending Pasta Bowl article | POST-LAUNCH, not started | Only mentioned in menu data/research (official specials link recorded in `content/home/homepage.ts`). Seasonal: verify dates and price when written. Must not compete with `/classic-entrees` or the homepage deals section. |
| Dedicated holiday hours articles (e.g. Thanksgiving, Christmas Eve) | POST-LAUNCH, not started | Mechanism ready: a published guide with `navGroup: "hours"` joins the Hours dropdown (CLAUDE.md "Guide pages: Hours"). Own intent, links to `/hours`; only official closures / "may close early" facts. |
| Blog articles (`/blog/[slug]`) | POST-LAUNCH, not started | Topics and outlines pending (roadmap item 9). A dynamic route must extend `proxy.ts` in the same lesson. |
| Specials & Deals article | POST-LAUNCH, not started | Today the header "Specials & Deals" menu points to existing pages and homepage sections; no separate page exists. |

## 2. Tools

| Item | Status | Notes |
|---|---|---|
| Additional calculators and tools (e.g. party/catering portion planner, budget planner) | POST-LAUNCH, not started | Must reuse `lib/calculator-data.ts` rules (no invented values, missing never zero). |
| Nutrition Calculator: save/share a meal | POST-LAUNCH idea | Would need storage or URL parameters, so the privacy policy and `PRIVACY_DATA_INVENTORY.md` change first. |

## 3. Menu PDF (Improvement 8)

The feature is complete and part of the launch build (homepage section `/#menu-pdf`, PDF built at every deployment). Open:
- Owner visual review of the section and the PDF (requested 2026-11-21; the review server was stopped for low memory before the review).
- Real-device checks after deploying: download, view and print on a phone (Safari/iOS, Android) and a desktop browser.
- Optional later: small food photos per category inside the PDF (would add JPEG copies of owner images; file size grows).

## 4. Content and data upkeep

- Re-check prices, calories and time-sensitive offers (Buy One Take One / $6 Take Home, $9.99 Soup, Salad & Breadsticks lunch, lunch hours, limited-time items) on a schedule; update data and "last verified" dates only after a real check (`LAUNCH_CHECKLIST.md` §2).
- Kids Five Cheese Marinara: the official guide has no kids row; 150 Cal comes from the online menu (owner accepted 2026-11-19). Replace when a guide row appears.
- Separate ratings for the three soups (now the shared `homemade-soups` group): needs a database change and owner approval.
- 2 development test votes stay by owner decision (2026-11-20); the removal SQL is kept in `supabase/maintenance/`.
- Optional photo improvements listed in `docs/MISSING_IMAGES.md` (e.g. 2-Liter Soda photo also shows Fanta and Dr Pepper, kept by owner decision 2026-11-20). Never generated or downloaded.

## 5. Site and business

- Author/founder profile: pending owner confirmation (no person is shown until then).
- Social media links: only with owner-supplied URLs.
- Analytics and ads (GA4, Clarity, AdSense): final integration phase; update `PRIVACY_DATA_INVENTORY.md` and the Privacy Policy first (`GOOGLE_ADSENSE_COMPLIANCE_CHECKLIST.md`).
- Dev-only `minimatch` audit warning: re-check after `eslint-config-next` updates.
