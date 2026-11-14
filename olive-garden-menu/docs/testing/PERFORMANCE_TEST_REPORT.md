# Performance Test Report (Lesson 8.6)

**Date:** 2026-11-14 · **Build:** local production build on the owner's Windows PC.

All numbers below are **lab measurements**:
- Lighthouse simulates a mid-range phone with slow 4G and 4× CPU throttling.
- Real-user (field) data such as INP does not exist yet, because the site is not live.

During testing the PC had only about **1.5 GB of free RAM** (1.6 GB of memory compression). Throttled interaction timings were therefore very noisy and are reported with that warning.

## 1. Lighthouse 12.8.2 (Edge, headless)

| Page | Device | Perf | A11y | Best pr. | SEO* | FCP | LCP | TBT | CLS | Transfer |
|---|---|---:|---:|---:|---:|---|---|---|---|---|
| `/` run 1 | Mobile | 57 | 100 | 100 | 69 | 2.7 s | 4.3 s | 1,210 ms | 0 | 609 KiB |
| `/` run 2 | Mobile | 65 | 100 | 100 | 69 | 1.7 s | 3.2 s | 1,850 ms | 0 | 609 KiB |
| `/` run 3 | Mobile | 63 | 100 | 100 | 69 | 1.8 s | 3.3 s | 2,160 ms | 0 | 609 KiB |
| `/` | Desktop | 89 | 100 | 100 | 69 | 0.4 s | 0.7 s | 280 ms | 0 | 868 KiB |
| `/catering` | Mobile | 83 | 100 | 100 | 69 | 1.3 s | 2.2 s | 630 ms | 0 | 342 KiB |
| `/kids-meal` | Mobile | 91 | 100 | 100 | 69 | 1.0 s | 2.0 s | 350 ms | 0 | 319 KiB |
| `/catering` | Desktop | 100 | 100 | 100 | 69 | 0.4 s | 0.5 s | 10 ms | 0.001 | 342 KiB |

\*SEO 69 only because of the single failing audit `is-crawlable` ("Page is blocked from indexing"): the intended pre-launch `noindex`.

**Targets:**

| Target | Result |
|---|---|
| LCP ≤ 2.5 s | Category pages meet it (mobile 2.0–2.2 s, desktop 0.5 s). Homepage mobile does **not** (3.2–4.3 s lab), the same as the earlier audit (2.6–3.7 s) |
| CLS ≤ 0.1 | Met everywhere (0–0.001, and 0 in our own load + scroll test on 3 pages) |
| INP ≤ 200 ms | No field data yet. See §3 for lab interaction timings |

## 2. Homepage resources (mobile run 2)

| Resource | Size |
|---|---|
| Document (HTML, compressed) | 134 KiB |
| JavaScript | 149 KiB in 7 files (largest 70 and 46 KiB: React/Next runtime). Lighthouse unused-JS estimate 26 KiB |
| CSS | 10 KiB; no render-blocking resources |
| Images (initial load) | 248 KiB in 13 requests; the rest are lazy-loaded (238 of 239 images are `loading="lazy"`). Lighthouse image-delivery estimate: 38 KiB |
| Fonts | 65 KiB, 2 self-hosted files (`next/font`), `font-display` audit passed |
| DOM | 8,209 elements (7,431 in the earlier audit; the premium card and new content added some) |
| Main-thread work | 6.2 s total (lab, 4× CPU); JS boot-up 1.4 s |
| LCP element | The hero photo: preloaded in `<head>` with `imagesrcset`, not lazy |
| Rating API | One `/api/ratings` GET per page view for all cards; the server reads the database at most about once a minute; CDN cache 60 s |
| Caching | Static pages `s-maxage=86400, stale-while-revalidate`; hashed `_next/static` files are immutable |
| Dependencies | Runtime: `next`, `react`, `react-dom`, `@supabase/supabase-js` (server-side for ratings). No unnecessary client libraries |

## 3. Interaction timings (Event Timing API, homepage at 390 px)

| Interaction | Unthrottled | 4× CPU throttle |
|---|---|---|
| Size selector (ArrowDown) | 160 ms | 528 ms |
| Star rating (ArrowRight) | 80 ms | 928 ms |
| FAQ (Enter) | 200 ms | 1,216 ms |
| Mobile menu (Enter) | 176 ms | 144 ms |
| Search: Escape (clear) | < 16 ms | < 16 ms |
| Search: typing 7 keys, 150 ms apart | up to 2,072 ms (input delay 1,265 ms) | up to 27 s (unreliable) |

**Direct measurement of the search filter (unthrottled):**

| Step | Time |
|---|---|
| Hide items for "a" | 10 ms of script + 98 ms of layout |
| Filter to "alfredo" | 321 ms of layout |
| Show all items again (clear) | **2,186 ms** of layout |

That layout runs after the key press (outside the event), so the Event Timing API shows the clear as < 16 ms. The visitor still sees a frozen page while it runs.

**Assessment:** on this memory-starved PC the throttled numbers are not trustworthy: an idle `setTimeout(0)` already took 284 ms. The unthrottled numbers point to one real hotspot: re-laying out the whole 8,200-element menu when the search hides or shows many items.

**Status:** Pending. Measure on a real phone (Chrome DevTools remote, or PageSpeed Insights after deployment).

## 4. Approved strategy

The owner's option A (`PERFORMANCE_AUDIT.md` §3: keep the complete homepage, measure real users after launch) is kept. Nothing was removed or hidden to improve lab scores.

## 5. Options for the owner (not implemented)

| Option | Effect | Risk |
|---|---|---|
| A. Keep as is | Full homepage; fast desktop and category pages | Mobile homepage lab LCP about 3–4 s; search can stutter on slow phones |
| B. `content-visibility: auto` + `contain-intrinsic-size` on each homepage menu section (CSS only) | The browser skips layout and paint of off-screen sections: faster first render, faster search clear | Small scroll-bar jumps; anchor jumps need testing; Safari support is recent |
| C. Split the homepage menu into collapsed category panels (render on open) | Biggest gain | Changes the approved homepage design and content visibility, so the owner must decide |

**Recommendation:** test option B in a separate lesson, with before/after measurements on a real phone.

## 6. Lesson 8.6.1: `content-visibility` test (2026-11-14)

**Approach (owner-approved test):** `content-visibility: auto` was applied to the 17 homepage menu sections, with a per-section `contain-intrinsic-block-size` estimate (from measured heights: about 545 px per card row). The hero, verification bar, category chips, and search were not touched.

**Conditions:**
- the same production build, served by `next start`
- Edge headless at 390 px, unthrottled CPU for the probes; Lighthouse mobile x3
- the PC had only 1.0-1.4 GB of free RAM, so absolute numbers are noisy

**A/B on one build (CSS override on/off, alternating runs, median of 3):**

| Metric | Off (current) | On | Change |
|---|---|---|---|
| Search: clear to all items painted | 991 ms | 93 ms | about 10x faster |
| Forced full-page relayout | 701 ms | 120 ms | about 6x faster |
| Longest event while typing "alfredo" | 392 ms | 280 ms | -29 % |
| Search results ("alfredo") | 30 | 30 | same |

**Lighthouse mobile, homepage (x3, separate builds):**

| Metric | Before | With content-visibility |
|---|---|---|
| Performance score | 63-67 | 66-67 |
| LCP | 2.50-2.68 s | 2.66 s (no change) |
| TBT | 4.7-6.2 s | 2.2-2.5 s |
| Main-thread work | 12.5-13.8 s | 9.3-10.1 s |
| CLS | 0 | 0 |

**Regressions found (same tests, content-visibility on vs off):**

| Check | Off | On |
|---|---|---|
| Category chip jump to `#catering`, `#desserts` (390 and 1440 px) | heading at 177 px, below the sticky bars | heading **off-screen** (-4,085 to -772 px): the scroll target moved while sections between rendered at their real height |
| Cold load of `/#kids-meal` (1440 px) | heading at 177 px, CLS 0 | heading at 45,319 px, **CLS 0.775** |
| Screen-reader tree: "Catering" heading while off-screen | present | **missing** (Chromium does not compute the skipped subtree) |
| Images load after scrolling, ratings ready, server HTML has all 255 items, controls focusable | Pass | Pass |
| Find-in-page (`window.find`) | text found (headless does not scroll) | text found (headless does not scroll) |

**Decision:** **not retained.**
- It gave a real speed-up: search about 10x faster, TBT about halved, and LCP unchanged.
- But it broke anchor navigation (chips, `/#section` links, CTAs into the menu), caused large layout shifts, and hid off-screen headings from assistive technology. These are functional and accessibility regressions, so the owner's rule applies: keep option A.
- All code was removed: `MenuCategorySection.tsx` and `app/page.tsx` were restored, and the `.og-cv` CSS was deleted.

**Final build (option A, after reverting):**

| Lighthouse (homepage) | LCP | TBT | CLS | Accessibility |
|---|---|---|---|---|
| Mobile (x3) | 2.50 / 2.82 / 2.83 s | 5.1-5.7 s | 0 | 100 |
| Desktop | 0.56 s | 985 ms (this run; 280 ms in Lesson 8.6: noise) | 0 | 100 |

`/catering` mobile: LCP 2.2 s.

**A safer future option** (not done): render-on-demand that keeps anchors exact, for example measuring and pinning each section's real height after the first render, or limiting `content-visibility` to sections far below the menu. Each needs its own test and owner approval.
