# Menu PDF: Architecture

**Improvement 8, built 2026-11-21. Waiting for the owner's review** (the homepage section and the PDF are live wherever the homepage is; there is no separate status flag). Tests: `MENU_PDF_TEST_REPORT.md`.

## 1. What it is

- A homepage section, **H2 "Olive Garden Menu PDF with Prices"**, anchor **`/#menu-pdf`**, placed after "How to Order Olive Garden Online" and before the FAQs. There is **no separate article or page** (`/menu-pdf` is a 404).
- A printable **US Letter PDF** of the complete menu at **`/downloads/olive-garden-menu-with-prices.pdf`** (stable file name).

## 2. Files

| File | Role |
|---|---|
| `lib/pdf-writer.ts` | Small synchronous PDF 1.4 writer: Helvetica/Helvetica-Bold (WinAnsi, exact character widths for wrapping), rounded boxes, lines, JPEG images, Flate-compressed pages (Node's built-in `zlib`). No library. |
| `lib/menu-pdf.ts` | Builds the menu PDF from the shared data: `buildMenuPdfSections()` (rows), `renderMenuPdf(sections)` (layout), `getMenuPdf()` (cached result with bytes, page count, size, category pages), `formatFileSize()`. Server only. |
| `lib/menu-pdf-info.ts` | Client-safe constants: file name, PDF path, section id and `/#menu-pdf` link. |
| `app/downloads/olive-garden-menu-with-prices.pdf/route.ts` | `GET` handler returning the PDF. Only synchronous work, so Next.js **prerenders it at build time** (static file on Vercel, listed as `○` in the build output). |
| `components/home/MenuPdfSection.tsx` | Server component: cover preview (HTML copy of the PDF cover with the owner's photo and logo), facts (pages, file size, categories, last checked), notice. |
| `components/home/MenuPdfActions.tsx` | Client component: Download, View online, Print menu, lazy in-page preview. |
| `content/menu-pdf/logo.jpg`, `cover.jpg`, `assets.json` | JPEG copies of two existing owner images (PDF cannot embed WebP). Made by `scripts/menu-pdf-assets.mjs`. |
| `scripts/menu-pdf-assets.mjs` | Re-creates the two JPEG copies with `sharp` (installed by Next.js; no new dependency). Run only when the logo or the homepage hero photo changes. |
| `scripts/test-menu-pdf.cjs` | Automated tests (`npm run test:menu-pdf`). |

Changed for integration: `app/page.tsx` (section between Order Online and FAQ), `lib/navigation.ts` (header "More" → "Menu PDF", footer "Popular Menus" → "Menu PDF", both `/#menu-pdf`), `app/api/search-index/route.ts` (homepage-section entry "Olive Garden Menu PDF with Prices").

## 3. Data and automatic updates

- The PDF uses **the same data and the same display helpers as the homepage cards**: `getAllMenuCategories()`, `getOfferingsForCategory()`, `getCreateYourOwnPasta()`, and `offeringValues` / `offeringOptions` / `availabilityLabel` / `calorieUnitNote` from `lib/menu-display.ts`. Section notes are the homepage `categoryNotes` (else the category summary). So the PDF, homepage, category pages and item pages show the same prices, calories and notes.
- **All 17 categories, in homepage order; all 231 homepage entries plus the 23 Create Your Own Pasta options and its base price (255 rows).** Sizes and versions (options) are listed under each dish with their own price and calories. Missing values show the same notes as the website ("Not on the current online menu", "Not published for the take-home portion"...). "Calc." values show their parts. Nothing is estimated or invented.
- **Deterministic:** no clock or random values; the creation date in the file is the latest price check date. Same data → identical bytes (tested).
- **When it updates:** the route is prerendered during `next build`, so every deployment (and every local `npm run build`) generates a fresh PDF from the current data. In `npm run dev` it is generated on request. No extra build step, no paid service, Vercel compatible.

## 4. PDF layout (US Letter, 612 × 792 pt)

1. **Cover:** owner photo (top), gold rule, dark olive panel, owner logo on a white tile, "Olive Garden Menu with Prices & Calories 2026", chips (categories, entries, "Prices last verified: Month Year"), independent-guide disclaimer box, website address. Photo caption: supplied by the site owner, not an official Olive Garden photo.
2. **Contents:** categories with page numbers (dotted leaders), "How to read the tables" legend.
3. **Menu:** per category a dark olive heading band (gold edge, item count, homepage note), olive table header (Item · Portion / serving · Price · Calories), alternating cream rows, option rows indented with dotted separators. Rows never split; the heading always stays with the table header and at least its first row; continued tables repeat the header ("… (continued)").
4. **Notes & sources** and the full disclaimer.
5. Every page after the cover: header ("Olive Garden Menu Prices · independent menu guide" + section), footer ("Not an official Olive Garden menu. Prices may vary by location across the USA.", website address, "Page n of N").

Keep-visitors-on-site rule (owner decision 2026-11-21, applied 2026-11-22): the PDF does not tell readers to check other sites; allergens point to each dish's page on this site plus "tell your server".

Brand safety: the site's own logo and name only, no Olive Garden logo or styling, "independent guide · not an official Olive Garden menu" on the cover, every page and the last page. Current file: **21 pages, about 123 KB**.

## 5. Download, view, print

- **Download PDF:** link with `download` (same origin) → saves `olive-garden-menu-with-prices.pdf`.
- **View online:** opens the PDF in the browser's own viewer in a new tab (works on phones).
- **Print menu:** on desktop, loads the PDF in a hidden frame and calls the PDF viewer's print, so the **menu document is printed, not the web page**. On touch devices (where frames cannot print PDFs) it opens the PDF so the visitor can use the browser's Print or Share option; a status message says so.
- **Preview the PDF on this page:** desktop and tablets only; the embedded viewer (`<iframe loading="lazy">`) is created **only after a click**, so the homepage never downloads the PDF on load.

## 6. SEO and indexing

- The homepage stays the only full-menu page that targets the menu keywords; the section adds one H2 (homepage now has eight supporting H2s).
- The PDF response sends **`X-Robots-Tag: noindex`** (always) and `Link: <homepage>; rel="canonical"`, so it does not compete with the homepage. It is not in the sitemap. robots.txt and `SITE_INDEXING` are unchanged.
- `/downloads` itself and any other `/downloads/...` path return 404.

## 7. Performance

- Homepage: one small client component; two owner images (lazy, `sizes` 320-360 px); no PDF request until a button is used. The PDF is built at build time (about 0.6 s), not per visitor.
- PDF size is kept small with compressed text streams and two compressed JPEGs (cover 77 KB, logo 4 KB).
