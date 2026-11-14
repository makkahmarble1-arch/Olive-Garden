# Responsive Test Report (Lesson 8.6)

**Date:** 2026-11-14 · **Tool:** headless Edge with device emulation (touch and mobile mode below 768 px), production build.
**Script:** each page was loaded, scrolled to the bottom (so lazy content renders), and measured.

## 1. Coverage

| Pages | Widths | Loads |
|---|---|---|
| Representative: `/`, `/family-style-meals`, `/classic-entrees`, `/create-your-own-pasta`, `/gluten-sensitive`, `/kids-meal`, `/catering` | 320, 375, 430, 768, 1024, 1440, 1920 | 49 |
| The other 11 category pages | 320 and 1440 | 22 |
| **Total** | | **71** |

## 2. Results

| Check | Result | Status |
|---|---|---|
| Horizontal page overflow (`scrollWidth > clientWidth`) | 0 of 71 | Pass |
| Elements outside the viewport (excluding scrollable table and nav boxes) | 0 | Pass |
| Text clipping | 0 real cases. The script flagged only visually hidden screen-reader text (`sr-only`: "Price:", "Rating for …", "(opens in a new tab)") and the skip link, which is hidden until focused | Pass |
| Broken images | 0 | Pass |
| Image overflow / photo ratio | All card photos 4:3; no overflow | Pass |
| Header | `position: sticky` on all 71 loads | Pass |
| Mobile menu button | Visible below 768 px on every load, hidden at 1024 px and up; 44 × 44 px; opens (`aria-expanded=true`), closes with Escape | Pass |
| Category chip bar (homepage) | Sticky under the header (top 64 px vs header bottom 65 px); scrolls sideways on phones (`overflow-x: auto`) without widening the page | Pass |
| Price tables | Phones: every wide table scrolls inside its own box ("scroll"); 1024 px and up: all tables fit | Pass |
| Card grids | No overflow at any width; Firefox and Edge screenshots match | Pass |
| Rating controls | 5 stars per control; the table copies are hidden on phones (cards show them instead) | Pass |
| FAQ accordions | Open and close with mouse and keyboard; no overflow | Pass |
| Related Menus | Real titles; no overflow at 320 px | Pass |
| Small touch targets (< 24 px) | Only the breadcrumb text links "Home" and "Menu" (38 × 20 px; inline links with spacing) | Pass (P3 note) |
| Console errors / hydration warnings | 0 on all 71 loads | Pass |

**Network "ERR_ABORTED" lines:** these appeared only when the script moved to the next page while the previous page still had requests open. A slower re-run of `/`, `/catering`, and `/desserts` showed none. They come from the test, not from the site.

## 3. Screenshots

These were checked by eye. They are saved in the session scratchpad and are not part of the repository:
- Homepage at 320, 375 (with the menu open), 768, and 1440 px
- `/catering` at 375 px
- `/create-your-own-pasta` at 430 px
- Firefox: homepage at 375 and 1440 px, `/catering` at 375 px, `/kids-meal` at 1440 px

The approved hero, card, and page layouts are unchanged.

## 4. Not tested

- Real phones and tablets (only emulation was used). **Pending:** check once on a real iPhone and Android phone after deployment.
- Safari / WebKit (not available on Windows). **Not Tested.**
- Landscape phone orientation. **Not Tested.**
