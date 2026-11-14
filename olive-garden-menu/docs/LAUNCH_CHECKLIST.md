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
- [ ] Replacement photos for 4 products whose incorrect images were removed (priority order in `MISSING_IMAGES.md`, "Consolidated image replacement manifest"; 6 homepage cards show the placeholder until then). Optional replacements are listed there too.
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

- [ ] Remove the 2 development test votes: the owner runs `supabase/maintenance/2026-11-14_remove_two_dev_test_votes.sql` in the Supabase SQL Editor, steps 1-4 (approved again 2026-11-14). It deletes only those 2 votes. A third vote (Breadsticks, 3 stars) appeared on 2026-11-14 and is kept; the owner decides whether it is genuine. The older 2026-11-13 file would now delete nothing, because it requires exactly 2 votes in total.
- [ ] Privacy policy mentions the functional cookie `og_rv` (ratings only) and that votes are stored as one-way hashes.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm run build`: all pass.
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
