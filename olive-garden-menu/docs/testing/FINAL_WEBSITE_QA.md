# Final Website QA (Lesson 8.6)

**Date:** 2026-11-14.
**Build:** local production build (`next build` + `next start -p 3100`).
**Browsers:**
- Microsoft Edge (Chromium), headless with a clean profile and extensions disabled
- Firefox 154, headless screenshots only
- Lighthouse 12.8.2 (in Edge)

**Rating write tests:** run only on an **isolated** build connected to an in-memory PostgreSQL copy of the real migration. No vote was written to the real database, and the real ratings were not changed (they still show 3 votes).

Detailed reports:
- `RESPONSIVE_TEST_REPORT.md`
- `FUNCTIONAL_TEST_REPORT.md`
- `SECURITY_TEST_REPORT.md`
- `PERFORMANCE_TEST_REPORT.md`

**Status values:** Pass · Fail · Not Tested · Pending (needs the owner, a real device, or the live site).

## 1. Summary

| Area | Status | Evidence (short) |
|---|---|---|
| 18 main pages | Pass | 18/18 HTTP 200; all 17 categories `published`; `noindex, follow` on every page; no empty pages, 1,776–15,684 words per page |
| Responsive (320–1920 px) | Pass | 71 page loads at 7 widths: 0 horizontal overflow, 0 overflowing elements, 0 broken images, header sticky, tables scroll inside their own box |
| Approved hero | Pass | Gradient, white H1 with `#d5e78a` highlight (48 px desktop), both CTAs, badge, USA + "Last verified: November 2026" bar, 2 columns at 1440 px (378 px tall), stacked on phones |
| Premium menu cards | Pass | `#fafbf5` card, `#dce5ba` border, 16 px radius; title 16.8 px/700; price 20 px/700; calorie pill 12 px/600 `#fff3e0`/`#9a5700`; description 14 px/**400**; all photos 4:3 |
| Menu data | Pass | 255 homepage cards = 231 offerings + 23 Create Your Own Pasta options + 1 base; 17 sections match the data counts; all 31 size selectors, 84 options show the data price and calories; 15/15 availability labels |
| Menu search | Pass | Exact, partial, case, whitespace, keyword, "&", no-result, clear, Escape, and mobile searches all correct |
| Navigation and links | Pass | 18 internal targets, 0 broken; 17 category jump links, sticky; breadcrumbs; Related Menus; header, mobile menu, and footer |
| External official links | Not Tested | 21 links; olivegarden.com answers every automated request with 403 (bot protection). Check by hand in a browser |
| HTTP status / proxy | Pass (after a fix) | Unknown URLs 404 (including `/.env`, `/api`, `/package.json` after the fix); `/menu` → 308 → `/` (1 hop); assets, `_next`, API OK |
| Rating system | Pass | API end-to-end 16/16, functional 14/14, security rejections 20/20, browser UI checks, outage handling (200 `available:false` / 503 on vote) |
| Accessibility | Pass (after 2 fixes) | Lighthouse Accessibility 100 on all tested pages; keyboard FAQ, skip link, focus rings; star focus ring and focus-after-vote fixed |
| Performance | Pending (mobile homepage) | Desktop: homepage LCP 0.7 s, catering 0.5 s. Mobile lab: category pages LCP 2.0–2.2 s; homepage LCP 3.2–4.3 s (above 2.5 s; matches the approved option A); CLS 0 everywhere |
| Security | Pass | No secrets in client bundles, public files, or git; `.env.local` ignored; production dependencies: 0 vulnerabilities |
| Technical SEO regression | Pass | Unique metadata, one H1, valid JSON-LD (FAQ = visible), canonicals from env, 0 orphans, USA/month-year/no-AI standards |
| Cross-browser and hydration | Pass (Edge) / Partial (Firefox) | 0 console errors or hydration warnings in about 90 Edge page loads; Firefox screenshots render correctly (console not captured). Safari not tested (not available on Windows) |
| Build checks | Pass | `tsc --noEmit`, ESLint, `npm run build` (29 static pages + proxy) |

**Overall:** no P0 issue. The site works and is consistent on all tested widths and pages. The remaining items are a mobile performance decision, owner and launch tasks, and two small accessibility and size choices (section 4).

## 2. Issues fixed in this lesson (small, unambiguous; design unchanged)

| # | Issue | Evidence | Fix | Verified |
|---|---|---|---|---|
| F1 | `proxy.ts` let any one-segment URL containing a dot (`/.env.local`, `/package.json`, `/CLAUDE.md`) and `/api` through to the page renderer. They returned **HTTP 200** with the 404 page (a soft 404). No file content was ever served (checked: no secrets in the HTML) | HTTP test, see `SECURITY_TEST_REPORT.md` | `next.config.ts` now lists only real one-segment URLs from the file system: app folders **with a page/route file**, `public/` top-level files, and app metadata files (robots.txt, sitemap.xml, favicon.ico). `proxy.ts` 404s everything else (Next.js internals starting with `_` pass) | All return 404; valid pages, assets, robots, sitemap, favicon, and API unchanged |
| F2 | Rating stars showed **no keyboard focus ring** (WCAG 2.4.7): the ring was drawn on the masked `::before` star, and the mask clipped it | Screenshot of a focused star: no ring | `app/globals.css`: the ring is drawn on the star button itself (2 px `brand-dark`). It appears only on keyboard focus; the stars look the same otherwise | Computed outline `solid 2px rgb(85,107,18)`, plus a screenshot |
| F3 | After voting with the keyboard, **focus was lost** (the button was `disabled` while saving) | `document.activeElement` was empty after Enter | `RatingSummary.tsx`: `aria-disabled` instead of `disabled` (`choose()` already ignored clicks while saving) | Focus stays on "Rate 4 out of 5 stars" during and after the vote |
| F4 | A very fast triple click could send 3 vote requests before React re-rendered. The server already counted one vote per visitor, so no wrong data resulted | Isolated test: 3 POSTs | A `useRef` guard in `choose()` | Isolated test: 1 POST |

No content, prices, calories, images, design tokens, or page structure were changed.

## 3. Remaining issues

| Priority | Issue | Details | Action |
|---|---|---|---|
| P1 | Homepage mobile LCP above 2.5 s (lab) | Lighthouse mobile: 3.2 / 3.3 / 4.3 s; TBT 1.2–2.2 s; DOM 8,209 elements. Category pages pass (2.0–2.2 s). Same situation as `PERFORMANCE_AUDIT.md` (owner chose option A: keep the full homepage and measure real users) | Owner: keep option A, or approve an optimization (see `PERFORMANCE_TEST_REPORT.md` §5) |
| P1 | Menu search: re-showing all items after clearing a search took about 2.2 s of layout on this PC (unthrottled); typing showed input delays up to 1.3 s | Measured while the PC had only 1.5 GB of free RAM, so the numbers are inflated; selectors, stars, FAQ, and the mobile menu respond in 80–200 ms unthrottled | Pending: measure on a real phone; possible fix `content-visibility: auto` on the menu sections (rendering change, owner approval) |
| P1 (launch) | Time-sensitive facts | Not re-verified in this lesson (`LAUNCH_CHECKLIST.md` §2) | Manual official check before launch |
| P1 (launch) | Development test votes still in the real database | 3 votes (2 test, 1 Breadsticks of unknown origin) | Owner runs `supabase/maintenance/2026-11-14_remove_two_dev_test_votes.sql` |
| P2 | Star buttons are 24 × 44 px | Meets WCAG 2.2 AA (24 px minimum) but not the project's own 44 px rule in width. Wider buttons would change the approved compact star row | Owner decision |
| P2 | No security headers; `X-Powered-By: Next.js` is sent | No CSP, X-Frame-Options, Referrer-Policy, or Permissions-Policy. Vercel adds HSTS | Owner approval for `poweredByHeader: false` and a basic header set |
| P2 | 7 moderate vulnerabilities in **dev-only** packages (ESLint's `minimatch`) | Not shipped to visitors | Owner approval for `npm audit fix` (non-major) |
| P2 | External official links | Could not be checked automatically (403) | Click through once in a browser |
| P3 | Breadcrumb links "Home" and "Menu" are 20 px tall | Inline text links with spacing (WCAG exception) | Optional |
| P3 | Keyboard focus ring on stars spans the full 44 px touch height | It can touch the count text under the stars on narrow cards (keyboard focus only) | Optional styling |

## 4. Owner decisions needed

1. Mobile homepage performance: keep option A, or approve an optimization (for example `content-visibility` on the menu sections, which also speeds up search).
2. Star touch width: keep 24 px (WCAG AA) or widen it.
3. Security headers and `poweredByHeader: false`.
4. `npm audit fix` for dev tools.
5. Breadsticks vote: genuine or test?

## 5. Readiness for Lesson 9

Ready from a QA point of view: no P0, and all core functions pass. Before launch, the P1 launch items (fact re-check, vote cleanup) and the owner's performance decision remain.

## 6. Lesson 8.6.1 approved improvements (2026-11-14)

| Item | Result | Status |
|---|---|---|
| `content-visibility` on homepage menu sections | Measured benefit (search clear 991 -> 93 ms, TBT about halved, LCP unchanged), but regressions: anchor jumps landed off-screen, CLS 0.775 on a cold `/#kids-meal` load, and off-screen headings were missing from the accessibility tree | **Not retained** (option A kept; code removed) |
| Wider star touch areas on menu cards | Container query on the card's rating box. Button width (star icon stays 18 px, height 44 px): 320 px -> 36, 375 px -> 27, 390 px -> 28, 430 px -> 32, 768 px -> 24, 1024 px -> 24 (36 on wide cards), 1440/1920 px -> 32 (36 on wide cards). Capped at 36 px so the row stays compact (44 px spread the stars too far apart). Tables keep 24 px. 0 overlapping buttons and 0 overflow on 8 widths and on `/catering`; Lighthouse `target-size` passes | Pass |
| Security headers + `poweredByHeader: false` | All 4 headers once on pages, API, files, and 404s; `X-Powered-By` gone | Pass |
| Dependency audit | `npm audit fix --dry-run` changes nothing; 7 moderate dev-only (`minimatch` via typescript-eslint) remain; production 0 | Pending (upstream) |

**Regression tests (final build):**

| Area | Result |
|---|---|
| TypeScript, ESLint, `npm run build` | Pass |
| Pages and links | 18/18 pages 200 with `noindex, follow`; 17/17 categories `published`; 0 broken links, 0 orphans; FAQ JSON-LD equals the visible FAQs; no duplicate titles, descriptions, or H1s |
| Responsive | 71 loads, 320-1920 px: 0 overflow, 0 broken images, 0 console errors, header sticky |
| Browser functional suite | 49/50: the only failure is the known test artifact (the Sources text is cut in the test; the content was checked by hand) |
| Anchors and accessibility tree | 15/17: chips, `/#kids-meal`, headings in the accessibility tree, images, and ratings all pass; the 2 find-in-page failures are a headless limitation (the text is found; the page only does not scroll) |
| Proxy | `/abc`, `/abc/def`, `/.env.local`, `/api`, `/api/nope`, `/design-preview` -> 404; `/menu` -> 308 `/`; robots, sitemap (empty), favicon, OG image, `_next/image` -> 200 |
| Rating API | `npm run test:rating-api` 20/20; `/api/ratings` `available: true` with 3 real votes, unchanged. The outage handling code is unchanged since Lesson 8.6 (tested there: 200 `available:false`, vote 503) |
| Secrets | None in client bundles |
