# Final Responsive Audit

**Date:** 2026-11-23. Local production build (`next start -p 3100`), one headless Chrome at a time (low memory). Only checks that actually ran are listed. Scripts (scratchpad, not in the repo): `cdp-responsive.mjs`, `cdp-nav.mjs`, `cdp-calc.mjs`, `cdp-menupdf.mjs`.

## 1. Scope

- **Published routes:** 150 = homepage, 17 category pages, `/dinner-menu`, `/hours`, `/nutrition-calculator`, 7 information/legal pages, 122 item pages. There is no separate Specials page: the header "Specials & Deals" menu points to existing pages and homepage sections.
- **Viewports:** 320, 375, 390, 430, 768, 1024, 1280, 1440, 1920 px (phones and tablets with mobile + touch emulation below 1024 px).

| Run | Pages | Widths | Checks |
|---|---|---|---|
| Templates, before fixes | 21 representative pages (home, Catering, Appetizers, Create Your Own Pasta, Wine & Beer, Dinner Menu, Hours, Calculator, 7 info/legal, item pages with versions, bundle, drink versions, pack sizes, kids, placeholder photo) | all 9 | 189 |
| All pages, after fixes | all 150 | 320 and 1280 | 300 |
| Templates, after fixes | same 21 | 375, 390, 430, 768, 1024, 1440, 1920 | 147 |
| Header, search, footer, rating, version selector | home / item page | 320, 390, 768, 1024, 1280, 1920 | 35 tests |
| Nutrition Calculator flows | calculator | 390, 768, 1280 | 60 tests |
| Menu PDF section | home `#menu-pdf` | 390, 768, 1280 | 35 tests |

Automated checks per page: horizontal overflow (and the element causing it), clipped text, text under 11 px, interactive targets under 24 px, broken or distorted images, cumulative layout shift, overlapping fixed/sticky elements, one H1, header and footer present. Screenshots were reviewed for the homepage, Catering, Chicken Alfredo and the calculator at 320/390/768/1280 px; the other pages were checked by the automated checks only (not each page visually).

## 2. Results

- **Horizontal overflow:** none on any page at any width.
- **Clipped text:** none. **Broken images:** none. **Distorted images:** none. **Layout shift:** max CLS 0.002 (templates), 0 (sweep).
- **Fonts:** smallest visible text 11.2 px after the fix (decorative labels such as "Menu item" tags); body text 16-17 px.
- **Header:** hamburger 44 px, opens and closes (Escape), "Full Menu" dropdown expands (18 links), all mobile menu items at least 44 px, no overflow with the menu or search open; desktop dropdowns (Full Menu, Specials & Deals, Hours, More) open and close and stay on screen at 1024, 1280 and 1920 px.
- **Search:** mobile and desktop search focus, suggest (typo "chiken parm" finds Chicken Parmigiana), keyboard ArrowDown highlights a suggestion, clicking a suggestion opens the page.
- **Footer:** 24 links, all at least 24 px high at 320 px.
- **Rating controls:** star buttons visible, named ("Rate n out of 5 stars"), at least 24 px. Not clicked (real database).
- **Version selector:** tabs 52 px, switching works at 320 px without overflow.
- **Calculator:** 60/60 (filters, search, add, quantity, versions, totals, partial totals, bundles, ranges, reset, mobile meal bar, no overflow).
- **Menu PDF section:** 35/35 (download, view, print of the PDF only, lazy preview, phone print/share flow, 44 px buttons). One earlier run failed only because the lazy cover images had not finished loading when checked; the rerun passed.

## 3. Issues found and fixed

| Issue | Where | Fix |
|---|---|---|
| "More" dropdown 63 px off screen at 1024 px (right edge 1087 px) | `components/layout/DesktopNav.tsx` | The last dropdown opens to the left (`right-0`). Verified at 1024/1280/1920. |
| Table captions of horizontally scrolling tables cut off on phones (e.g. "All versions at a glance") | `components/menu/table-styles.ts` | Caption `sticky left-0 max-w-[100cqw]`, wrapper `@container`: the caption wraps inside the visible width and stays in place while the table scrolls. Same look on desktop. |
| Breadcrumb links 20 px high (under the 24 px WCAG 2.2 target size) | `components/navigation/Breadcrumbs.tsx` | `inline-flex min-h-6 items-center` (24 px). |
| 10.4 px text in the Menu PDF cover preview | `components/home/MenuPdfSection.tsx` | 12 px (`text-xs`). |

No approved component was redesigned; colors, fonts, cards, header/footer layout and the calculator UI are unchanged.

## 4. Remaining notes (no change made)

- Links inside table rows (item names in category tables 21 px, category links in item-page size tables 18 px) are under 24 px high, but each is the only target in a taller row, so they meet WCAG 2.2 "target size (minimum)" through its spacing exception. Making them taller would change the approved table design.
- The sticky category bar on the homepage tucks 1 px under the header (header 65 px incl. its border, `--header-h` 64 px). Not visible; `--header-h` left unchanged.
- Not tested: real devices (iPhone/Android), Safari and Firefox.
