# Performance Audit (homepage)

**Date:** 2026-11-13 (Lesson 7.5).
**Method:** local production build (`next build` + `next start`) on the owner's Windows PC. Tools:

- Lighthouse 12.8.2 in headless Edge (run from a temporary folder, not a project dependency)
- Chrome DevTools Protocol scripts: interaction timing with the Event Timing API and 4× CPU throttling, DOM counts, layout checks

These are **lab results** on one machine. They are not field data, and they do **not** prove that Core Web Vitals pass for real visitors. Field data (CrUX / Search Console) exists only after launch with real traffic.

## 1. Results

Lighthouse mobile uses a simulated mid-range phone, slow 4G, and 4× CPU throttling. Mobile results varied a lot between runs on this PC, so ranges are shown.

| Metric (target) | Before Lesson 7.5 | After Lesson 7.5 |
|---|---|---|
| Mobile performance score | 56 | 59–68 (5 runs) |
| Mobile FCP | 2.8 s | 1.6–2.1 s |
| Mobile LCP (≤ 2.5 s) | 4.0 s | 2.6–3.7 s (lab, **not met**) |
| Mobile TBT (lab proxy for responsiveness) | 1.56 s | 1.8–5.5 s (very noisy on this PC) |
| CLS (≤ 0.1) | 0 | 0 |
| Desktop performance score | 85 | 84–86 |
| Desktop LCP | 0.7 s | 0.7 s |
| Desktop TBT | 350 ms | 310–360 ms |
| Accessibility / Best practices | 100 / 100 | 100 / 100 |
| SEO (Lighthouse) | 69 | 69, only because indexing is intentionally off ("Page is blocked from indexing") |
| DOM elements | 11,069 | 7,431 |
| Homepage HTML (raw / gzip) | 2.51 MB / 133 KB | 1.80 MB / 124 KB |
| Server response (TTFB) | about 0.03–0.05 s | about 0.03–0.05 s (static page) |

**Interaction latency** (INP proxy). Measured on a 390 px phone emulation with 4× CPU throttling, using the Event Timing API (events of 16 ms or more):

| Interaction | Before | After |
|---|---|---|
| Typing in menu search | up to 360 ms per key | < 16 ms per key (none recorded) |
| Clearing the search | 1,088 ms | < 16 ms |
| Category chip tap | 56–128 ms | 56 ms |
| Size selector (keyboard) | 376 ms | 368 ms (214 ms of it waiting for a busy main thread, 44 ms handler) |
| Star rating arrow keys | up to 416 ms | 128–288 ms (mostly input delay while the page is busy) |

INP target (≤ 200 ms) is met for search and navigation in this lab setup. Selector and star key presses can still exceed 200 ms on a throttled phone when they happen while the page is busy (images loading or rendering).

## 2. Optimizations made

1. **Rating stars drawn with CSS** (`og-star`, `og-star-btn` in `app/globals.css`).
   - Before, each star was a button plus a span, an svg, and a path (about 1,200 stars on the page). Now it is one element per star.
   - The DOM dropped from 11,069 to 7,431 elements, and HTML from 2.16 MB to 1.80 MB.
   - The look is unchanged: 18 px gold stars, outline or full or partial fill, a 24 × 44 px touch area, and a visible focus ring. They also stay visible in Windows high-contrast mode.
2. **Shorter star markup** (Lesson 7.4.6): the long utility class lists became two CSS classes (2.51 MB → 2.16 MB HTML).
3. **Menu search off the keystroke.** The text field updates immediately. Filtering, which re-lays out the whole page, now runs in a separate task: 150 ms after the last key while typing, or at once on Clear/Escape. The status text always shows a count that matches its own query.
4. **Browser cache fix for ratings** (Lesson 7.4.6): `fetch("/api/ratings", { cache: "no-cache" })`.
5. **Metadata and preload:** the hero image keeps `preload` (LCP element; Lighthouse "LCP request discovery": priority hinted, discoverable, eager). There is one social image and no extra requests.

Checked and already fine (no change needed):

- **Server Components:** all menu content is server-rendered. Client components are only CategoryNav, MenuSearch, OptionPicker, RatingSummary, and BackToTop (about 26 KB of our own client code).
- **Data:** no raw research data reaches the browser; `research/` is never imported by pages.
- **Fonts:** Geist and Fraunces via `next/font` (self-hosted, preloaded, 29 + 36 KB woff2).
- **Images:** next/image with WebP, `srcSet`/`sizes`, lazy loading below the fold, and reserved dimensions.
- **Ratings:** one batched `/api/ratings` request per page (server cache about 1 minute, about 0.01–0.04 s). A database failure never blocks the menu (tested in Lesson 7.4.6).
- **Production caching:**
  - Homepage and category pages: static, revalidate 1 day.
  - `/api/ratings`: `s-maxage=60, stale-while-revalidate`.
  - Vote API: `no-store`.

## 3. Why mobile lab scores stay limited (decision for the owner)

The approved architecture puts **all 231 menu items** (plus 6 popular cards, the Create Your Own Pasta table, 7 supporting sections, and 237 interactive rating rows) on one server-rendered page. On a throttled phone, the remaining time is spent on:

- parsing about 1.8 MB of HTML, including about 750 KB of React Server Component data (needed for hydration)
- styling and laying out about 7,400 elements
- hydrating that tree

None of this can be removed without changing what the page contains or how its interactive parts work.

Options (not implemented; each needs owner approval):

| Option | Effect | Trade-off |
|---|---|---|
| A. Keep as is | Content-complete homepage; desktop is fast; mobile lab LCP about 3 s | Mobile lab scores in the 60s |
| B. One page-level rating controller instead of 237 small React rating components (same look; stars rendered as plain HTML, one click handler) | Less hydration work and fewer re-renders | Larger rewrite of the rating UI; needs full re-testing |
| C. `content-visibility: auto` on the category sections (CSS only) | The browser skips layout/paint for off-screen sections | Jump links and the scroll position can land slightly wrong until a section has been seen; needs careful testing |
| D. Show the first items per category with "Show all" (rest still in the HTML) | Less initial layout | Changes the approved "every item visible" homepage |

**Owner decision (2026-11-13): option A.** Keep the current architecture for launch. After launch, measure real users (Vercel Speed Insights free tier, or Search Console Core Web Vitals) before reconsidering B or C.

## 4. How to re-measure

1. `npm run build` and then `npx next start -p 3200`.
2. Lighthouse in Chrome DevTools: Mobile, Performance, Incognito, run 3 times and compare the median.
3. After launch, use PageSpeed Insights on the live URL: its "field data" section is the real Core Web Vitals.
