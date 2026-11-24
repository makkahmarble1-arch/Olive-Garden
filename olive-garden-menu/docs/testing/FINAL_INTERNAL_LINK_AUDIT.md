# Final Internal Link Audit

**Date:** 2026-11-23. Local production build, read-only GET requests one at a time (`link-audit.cjs`, scratchpad). Run before and after the responsive fixes; both runs gave the same result.

## 1. Scope

- **Routes crawled:** 150 published routes (homepage, 17 categories, Dinner Menu, Hours, Nutrition Calculator, 7 information/legal pages, 122 item pages).
- **Links found:** 21,001 anchors: 19,956 internal, 736 same-page fragments (`#...`), 157 external, 152 `mailto:`.
- **Unique internal targets:** 160 (each requested once; 151 distinct URLs incl. targets).
- **Also checked from the data:** 61 header/mobile/footer navigation links (`lib/navigation.ts`, the same data feeds the desktop dropdowns and the mobile menu), 157 site-search entries (`/api/search-index`), 121 Nutrition Calculator "Details" links (all items, not only the 24 shown first).

Covered link areas: header and dropdowns, mobile menu, footer, homepage category navigation, menu item cards, category tables, item pages (breadcrumbs, size tables, similar items, Related Menus), FAQs and in-text links, Menu PDF section, calculator, legal and information pages.

## 2. Checks

Every internal link must: return HTTP 200 without a redirect (the only redirect is the intended `/menu` → `/` 308, and no page links to `/menu`); point to a published item page when it is `/menu/...`; have no trailing slash; and, when it has a `#fragment`, find that `id` on the target page. No placeholder hrefs (`""`, `#`, `javascript:`), no `localhost`, no `www.` or `http://` own-site links, no absolute own-site links. External links on article pages: exactly one, `https://www.olivegarden.com/` (owner rule 2026-11-21).

## 3. Results

| Check | Result |
|---|---|
| Broken links (4xx/5xx) | 0 |
| Redirecting links / redirect chains | 0 (`/menu` 308 kept; nothing links to it) |
| Links to unpublished item pages | 0 |
| Missing anchors (`#...` targets) | 0 of 736 same-page + all cross-page fragments |
| Placeholder, localhost, www, http, absolute own-site links | 0 |
| Navigation links (61) | all 200, all anchors found |
| Search entries (157) | all 200, all anchors found |
| Calculator detail links (121) | all 200 |
| External links on the 143 article pages | 1 each, `https://www.olivegarden.com/` |

**Broken links found and fixed: none (0 found).**

## 4. Notes

- Some destinations appear in both the header and the footer (and Lunch Menu also as "Lunch Hours"); this is the approved navigation design, not an error.
- Canonical destinations: every page's canonical is its own URL (live check 2026-11-23: on `https://olivegardenmenuprices.us`).
