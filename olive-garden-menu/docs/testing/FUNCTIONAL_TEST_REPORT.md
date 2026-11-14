# Functional Test Report (Lesson 8.6)

**Date:** 2026-11-14 · **Build:** local production build. Rating write tests ran on an isolated build (in-memory PostgreSQL with the real migration). No votes were written to the real database.

## 1. Pages and HTTP status (production build, port 3100)

| URL | HTTP | robots |
|---|---|---|
| `/` | 200 | noindex, follow |
| `/family-style-meals`, `/appetizers`, `/classic-entrees`, `/buy-one-take-one`, `/amazing-alfredos`, `/soups-salad-and-breadsticks`, `/lighter-portions`, `/create-your-own-pasta`, `/lunch-menu`, `/desserts`, `/drink-menu`, `/sides-sauces-and-extras`, `/non-alcoholic-beverages`, `/wine-and-beer-to-go`, `/gluten-sensitive`, `/kids-meal`, `/catering` | 200 each (17/17) | noindex, follow |
| `/abc`, `/classic-entrees-x`, `/Lunch-Menu`, `/index.html`, `/api` | 404 | noindex |
| `/abc/def`, `/lunch-menu/extra`, `/blog/test`, `/api/nope`, `/api/ratings/nope`, `/_next/nope`, `/images/nope.webp` | 404 | noindex |
| `/.env.local`, `/.env`, `/package.json`, `/next.config.ts`, `/CLAUDE.md`, `/proxy.ts`, `/.git/config` | 404 (after fix F1; before: 200 soft 404 without file content) | noindex |
| `/design-preview` | 404 (dev only) | noindex |
| `/menu` | 308 → `/` (1 redirect, then 200; no loop) | — |
| `/lunch-menu/` | 308 → `/lunch-menu` | — |
| `/robots.txt`, `/sitemap.xml`, `/favicon.ico` | 200 (sitemap empty: indexing off) | — |
| `/images/...` (OG and hero), `/_next/image?...`, `/_next/static/...` (CSS, JS, woff2 font) | 200 | — |
| `/api/ratings` | 200 | — |
| `/api/ratings/vote` GET / POST to `/api/ratings` | 405 / 405 | — |

All 17 category entries in `content/menu/categories.ts` are `published`. No page is empty: 1,776 to 15,684 words.

## 2. Automated browser checks (Edge, `qa86_func`)

**Result:** 48 passed, 2 failed. Both failures were wrong test expectations, and the behavior was then checked separately:
- **Jump link:** the test clicked while a smooth scroll-to-top was still running. A clean run moved the "Kids Meal" heading to 177 px from the top, below the 136 px sticky bars.
- **Sources box:** the test cut the text at 220 characters. The full text includes "Last verified: November 2026".

| Group | Checks | Status |
|---|---|---|
| Hero | H1 text; gradient; white H1 and `#d5e78a` highlight; CTAs → `#full-menu` and `#lunch-specials-deals` (CTA lands with the section at 144 px); badge; hero image not lazy and preloaded in `<head>`; 2 columns, 378 px tall; verification bar "USA · online pickup prices · Last verified: November 2026 · Prices may vary by location across the USA." | Pass |
| Premium cards | Background, border, radius, title/price/calorie/description sizes and weights (description 400), 4:3 photos | Pass |
| Menu data | 255 cards = 231 offerings + 23 CYOP options + 1 base; 17 sections equal their data counts; 31 selectors / 84 options show the data price + calories (0 mismatches); 15 availability labels = data | Pass |
| Search | "Chicken Alfredo" 10 results (all contain both words); "alfred" 30; "TIRAMISU" 2; "   tiramisu   " 2; "tea" 17 (all contain "tea"); "zzqxv" 0 + message + sections hidden; "" shows all 255; Escape clears; "chicken & shrimp" 3; mobile "lasagna" 12 | Pass |
| Navigation | 17 chips, all targets exist, sticky; mobile menu; breadcrumbs `Home / Menu / Kids Meal` with `aria-current`; Related Menus use real titles (plus "See the full menu →"); footer disclaimer | Pass |
| FAQ | Enter opens, Space closes, visible focus outline (2 px `brand-dark`) | Pass |
| Keyboard | First Tab: visible "Skip to main content" (191 × 48); focus rings on the next 14 controls (the star buttons had none: fixed, see §4) | Pass after fix |
| Tables | `th scope` 31/31, tables labelled | Pass |
| External links | `target=_blank` links have `noopener`/`noreferrer` | Pass |
| Reduced motion | Card image zoom transition off (`transition-property: none`); smooth scrolling only with `no-preference` | Pass |
| CLS (375 px, load + scroll) | `/` 0, `/catering` 0, `/kids-meal` 0 | Pass |

**Catering calculations (sample):** Spaghetti with Marinara pan $47.99 → $8.00 per person for 6 ("Calc. $47.99 ÷ 6") and $12.00 for 4. Both are correct to the cent and labeled as calculations.

**Links:** 18 internal link targets on the 18 pages all return 200. Every in-page anchor exists, there are no orphans, and the fewest inbound links is 3 (`/kids-meal`). The 21 external official links (olivegarden.com, media.olivegarden.com) returned 403 to every automated request (bot protection): **Not Tested**, check by hand. No intentional future links point to missing pages.

## 3. Rating system (isolated test environment)

| Suite | Result |
|---|---|
| API end-to-end: create, update, unchanged; signed HttpOnly SameSite=Strict cookie; tampered or made-up cookie ignored; shared rating keys; summary refresh; separate products; visitor rate limit (429 after 40/h); network limit (120/h); only hashes stored; writes with service_role, reads with anon | 16/16 Pass |
| Functional: averages and rounding, update, 10 repeats = still 5 votes, persistence, alias groups, unrated items have no invented values | 14/14 Pass |
| `npm run test:rating-api` (rejected requests: origin, content type, size, bad JSON, bad ids, ratings 0/6/2.5, unknown product, GET 405, …) | 20/20 Pass |
| Browser UI (390 px): one batched `/api/ratings` GET per page; vote → every card of the same dish shows the new total; `role=status` "Thanks for rating!"; one POST; total persists after reload; keyboard: arrow keys move, Enter votes, focus stays (after fix F3); triple click → 1 POST (after fix F4); 0 console errors | Pass |
| Database outage (mock stopped): `/api/ratings` 3 × 200 `{"available":false}` + `no-store`; vote → 503 `{"ok":false,"error":"unavailable"}`; page 200; no internal errors or keys in responses | Pass |
| Real database (read-only): `/api/ratings` 200, `available: true`, 3 rated dishes (unchanged). The first request after start once returned `available:false` (Supabase cold start) and the next ones succeeded: the 8.5.1 fix works, with no 500 | Pass |

## 4. Fixes made (details in `FINAL_WEBSITE_QA.md` §2)

- F1: proxy soft 404 for dotted names and `/api`
- F2: star keyboard focus ring
- F3: focus kept after voting
- F4: double-submit guard

## 5. Not tested / pending

- Live-site behavior (Vercel CDN, Routing Middleware): **Pending** until deployment.
- Real-phone touch interactions: **Pending**.
- External official links: **Not Tested** (manual).
