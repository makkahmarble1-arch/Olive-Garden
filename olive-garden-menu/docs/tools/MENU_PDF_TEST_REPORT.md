# Menu PDF: Test Report

**Date:** 2026-11-21. Local production build (`npm run build` + one `next start -p 3100`), tests run one after another (low memory). Only tests that were actually run are listed.

## 1. Summary

| Check | Result |
|---|---|
| TypeScript (`npx tsc --noEmit`) | Clean |
| ESLint (`npm run lint`, whole project) | Clean |
| Production build | Passed: 167 static pages; `/downloads/olive-garden-menu-with-prices.pdf` prerendered as static (`○`) |
| `npm run test:menu-pdf` | **13/13 passed** |
| `npm run test:calculator` (regression) | 26/26 passed |
| Browser tests of the homepage section (headless Chrome, 1280 / 768 / 390 px) | **35/35 passed** |
| Site crawl (150 pages) | 0 problems, 154 unique internal links, 0 broken; 404 checks OK |
| Item pages HTML/SEO QA (regression) | 122/122 OK |
| PDF | **21 pages, 126,010 bytes (123 KB)**, US Letter, 17 categories, 255 rows |

## 2. PDF tests (`scripts/test-menu-pdf.cjs`)

1. Deterministic: building twice gives identical bytes.
2. Valid structure: header, every xref offset, EOF, page count = `/Count`.
3. US Letter (612 × 792 pt) on all 21 pages.
4. All 17 categories in homepage order, each with a heading; contents page numbers ascending.
5. Every homepage entry is in the PDF, in the same order (231 offerings) plus the 23 Create Your Own Pasta options and base price; nothing extra.
6. Prices and calories equal the homepage display values (`offeringValues` / `offeringOptions`) for every row and size (more than 250 values).
7. Every row's name, price and calories are actually drawn in the decompressed page streams.
8. No invented values: missing values are notes; "Calc." rows show their parts; no "estimated" wording except the sentence "Nothing is estimated".
9. All text inside the page (x 20-592, y 18-780).
10. Table content never crosses the footer area (only footer lines below y 50).
11. Independent disclaimer on the cover, "Not an official Olive Garden menu." and "Page n of 21" on every other page, full disclaimer at the end.
12. No reference-restaurant or "AI" wording.
13. Logo and cover photo embedded as JPEG; file under 400 KB.

## 3. Visual check

All 17 categories were opened and checked as rendered pages in four partial PDFs made with the same layout code (the page viewer used for the check opens at most 10 pages per file): cover, contents, every category table, notes. The full 21-page file itself was checked by the automated tests above. Findings fixed during the check: category notes now use the homepage notes (the old internal summaries said "not verified yet"); price column widened so long notes do not wrap into three lines; section headings grow with their note. No clipped tables, no overlapping text; rows are never split; headings stay with their table.

## 4. Browser tests (`cdp-menupdf.mjs`, scratchpad)

At 1280, 768 and 390 px: no horizontal overflow; H2 "Olive Garden Menu PDF with Prices"; Download / View online / Print visible; every control at least 44 px; no PDF frame before a click; pages, file size, categories and "November 2026" shown; USA price notice; both cover images load; in-page preview offered on desktop, hidden on phones.

Actions: Download saves `olive-garden-menu-with-prices.pdf` (the full 126 KB PDF); View online opens the PDF in a new tab; Print (desktop) loads the PDF in a hidden frame and never calls the page's own print; Preview loads the embedded viewer only after the click; Print on a phone (touch emulation) opens the PDF for the browser's Print/Share, with a status message; header and footer link to `/#menu-pdf`; no browser errors.

Server checks: the PDF is served with `Content-Type: application/pdf`, `Content-Disposition: inline; filename="olive-garden-menu-with-prices.pdf"`, `X-Robots-Tag: noindex`, `Link: <homepage>; rel="canonical"`; the served file is byte-identical to the generator output; `/downloads`, `/downloads/other.pdf` and `/menu-pdf` return 404; the sitemap has no PDF; the search index has the "/#menu-pdf" entry; the homepage keeps one H1, and the new H2 sits between "How to Order Olive Garden Online" and "Frequently Asked Questions".

## 5. Homepage performance (local, headless Chrome)

| Viewport | PDF requests on load | Section images | HTML | JS | Requests | LCP | CLS |
|---|---|---|---|---|---|---|---|
| 1280 px | 0 | lazy, lazy | 155 KB | 150 KB | 35 | 2.2 s | 0 |
| 390 px | 0 | lazy, lazy | 155 KB | 142 KB | 20 | 1.6 s | 0 |

No baseline from before this change was measured, so these are absolute values, not a comparison. The section adds one small client component and two lazy images; the PDF is never loaded until a button is used.

## 6. Not tested

- Printing on a real printer and in Safari/iOS (headless Chrome cannot show the print dialog; the print flow was checked up to the dialog call).
- The live Vercel deployment (not deployed: no commit or push).
