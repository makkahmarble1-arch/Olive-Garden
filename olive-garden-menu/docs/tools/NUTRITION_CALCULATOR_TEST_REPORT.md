# Nutrition & Meal Price Calculator: Test Report

**Date:** 2026-11-20. **Build tested:** local production build (`npm run build` + `next start -p 3100`), one server at a time; the machine had 0.5-1.4 GB of free memory, so every test ran sequentially. Only results that were actually run are listed.

## 1. Summary

| Check | Result |
|---|---|
| TypeScript (`npx tsc --noEmit`) | Clean |
| ESLint (`npm run lint`, whole project) | Clean |
| Production build | Passed: 166 static pages (165 before + `/nutrition-calculator`, prerendered as static) |
| Data build check (`validateCalculatorData`) | 0 issues |
| Automated data and math tests (`npm run test:calculator`) | **21/21 passed** |
| Browser interaction tests (headless Chrome, 390 / 768 / 1280 px) | **60/60 passed** (after 2 fixes, see §5) |
| Page HTML / SEO check | Passed (see §4) |
| Site crawl (150 pages incl. the calculator) | 0 problems, 153 unique internal links, 0 broken; 404 checks OK |
| Item pages HTML/SEO QA | 122/122 OK |
| Browser QA, other pages (home, 17 categories, guides, info pages, calculator) | 28/28, 0 failures, 150 links OK |
| Browser QA, item pages (regression after the header change) | 1 batch of 31 pages: 0 failures, 80 links OK (the other 91 were not re-run; they were 0 failures on 2026-11-19 and only the shared header changed) |
| Production-deployment simulation (`VERCEL_ENV=production` build) | **Passed** (2026-11-20, second attempt; the first was stopped for low memory): `/nutrition-calculator` HTTP 404 with the normal 404 page and no calculator in the HTML; 0 links on `/`, `/classic-entrees`, `/menu/chicken-alfredo`, `/hours`, `/about-us`; 0 search entries (155 entries); not in the sitemap; `/`, item pages and `/kids-meal` still 200. A normal local build was made again afterwards (166 pages). |

## 2. Data and math tests (`scripts/test-calculator.cjs`)

Data rules (against the real menu data): build check 0 issues; promotions / unavailable / not-listed entries excluded; every price and every calorie value exists in the shared data for that dish; nutrition only from a row with the same single calorie value; versions without a row (Spaghetti & Meatballs marinara, Chicken Carbonara, gallon sweet tea) have no borrowed nutrition; version switching values (Chicken Alfredo grilled $21.79 / 1,480 / 79 g protein vs crispy 1,710 / 67 g; Lasagna lunch $12.49 / 500, p. 6; Coke vs Sprite own rows; 2-liter soda exactly 3 versions); identical listings merged (Fettuccine Alfredo in two categories, 2 breadstick sizes); catering pan $74.99 / 6,660; whole cake $73.99 with calories not paired; kids alfredo fettuccine $7.49 / 660 Calc.; bundles ($68.99 / 6,700, no nutrients) and combination ($224 / 23,570-27,100); 15 categories, Buy One Take One not listed.

Math (`mealTotals`): value × quantity sums (2 × Chicken Alfredo + Fettuccine = $61.07, 4,180 Cal, protein 185 g, carbs 236 g, fat 279 g, sodium 5,790 mg); missing nutrients never zero (item named, total incomplete); nothing known → "Not available"; missing price → subtotal incomplete; missing calories → calorie total incomplete; ranges stay ranges (2 × dipping sauces = 1,260-2,100); "less than" counted at its limit and flagged; 3 × $4.99 = $14.97 (no float noise); quantity 0 and empty meal → empty totals.

## 3. Browser tests (`cdp-calc.mjs`, scratchpad)

At 1280 px (desktop), 390 px (phone) and 768 px (tablet): no horizontal overflow, one H1, no broken images, 24 cards at first, every control at least 44 px high, every control has an accessible name, two columns on desktop and one column on phone/tablet, 4 Related Menus cards, 5 FAQs.

Flows at 1280 px and 390 px: category filter (Kids Meal: 11 items, all kids); partial search ("alfred"), typo search ("chiken parm" → Chicken Parmigiana first), no-results message, clear button (empties and keeps focus), Escape clears; add item ($21.79, 1,480 Cal, 79 g, 2,290 mg); live-region announcement; quantity + ($43.58, 2,960 Cal, 158 g); version switch updates the card (crispy 1,710 Cal) and adds a separate line ($65.37, 4,670 Cal, 225 g); missing nutrients (Budweiser: totals "Incomplete", item named, protein unchanged, calories and price still added: 4,820 Cal, $71.66); bundle counts once ($140.65, 11,520 Cal, explanation shown); calorie range stays a range (12,150–12,570); missing calories (whole cake) named under the calorie total; mobile meal bar visible with totals and no overflow; remove; reset (empty meal, 0 items). No browser console errors.

## 4. Page, SEO and integration

`/nutrition-calculator`: HTTP 200; title "Olive Garden Nutrition Calculator: Meal Calories & Price"; description 154 characters; self-canonical; `noindex, follow` (preview, indexing off); one H1; JSON-LD only WebPage, BreadcrumbList (+ListItem), FAQPage (+Question/Answer), WebSite/Organization references; exact price disclosure present; no reference-location or "AI" wording; footer disclaimer present. Homepage HTML has 3 links to the page (desktop header, mobile menu, footer); search index has 1 "Tool" entry (156 entries); sitemap does not list it (preview and indexing off, as intended). Page HTML is about 367 KB uncompressed (the prepared menu data travels with the static page; no API request).

## 4a. Download PDF and Print (added 2026-11-20 at the owner's request)

- `npm run test:calculator`: **26/26 passed** (5 new: report totals and named missing items match the screen; "Not available" instead of 0; PDF structure valid: header, every xref offset, stream lengths, EOF, ASCII only, content present; long meals continue on more pages with page numbers; special characters converted).
- Browser (`cdp-pdf.mjs`, headless Chrome): **14/14 passed**: buttons hidden for an empty meal and at least 44 px when shown; Download PDF saves `olive-garden-meal-estimate-2026-11-20.pdf`, a valid PDF with the items, $97.07 total and "INCOMPLETE"; the live region announces the download; Print calls the print dialog once (replaced by a no-op in the test), mounts the report as a direct child of `<body>`, hidden on screen; with print media only the report is visible; the report is removed after printing; at 390 px both buttons fit with no overflow; no browser errors.
- Visual check of both files: downloaded PDF (1 page: header band, item table, totals, notes, disclaimer, page number) and the print view saved as PDF (Chrome print, 2 pages for this meal). Small fix: price and calorie cells of the print table no longer wrap.

## 4b. Friendlier partial totals (owner request 2026-11-20)

The amber "Incomplete" pills were replaced by "1 of 3 items" under each total and one "How these totals are counted" note (dish names only, each once). Same rule: missing values are never zero and are always named. Re-tested: `npm run test:calculator` 26/26, browser calculator 60/60, Download PDF / Print 14/14, close-up screenshots at 1280 and 390 px checked.

## 5. Problems found and fixed during testing

1. 2-liter soda: the Drinks and Catering listings did not get the item page's versions, so a fourth "0-790" range choice appeared. Fixed (versions apply to listings with the same price and calories as the main listing).
2. Duplicate choices (lasagna bundle under two categories with different serving text, "Family-style" vs "Catering: Serves up to 6", baked/unbaked breadsticks) and two soup sizes with the same label. Fixed by merging on price + calories + official row + version, and adding the size to repeated labels.
3. "Bundle" tag appeared on kids pastas and other composite items. Fixed: only bundles and combinations.
4. Whole-cake choice showed a "Calories only" tag although calories are not listed. Fixed: "No nutrition listed".
5. Live-region message was set inside a state updater and was not announced. Fixed.
6. Desktop: long meal list pushed the totals below the fold, "Total fat" wrapped, a calorie range wrapped in large type. Fixed: the list scrolls inside the panel on desktop, nutrient tiles 2 × 2, smaller type for ranges.
7. Two test-script issues (two-column check measured a sticky panel; live-region selector picked the header search's status) were corrected in the test, not the page.

## 5a. Publishing (2026-11-20)

Owner approval 2026-11-20 → `status: "published"`. Checks after publishing are listed in §6.

## 6. After publishing (2026-11-20)

- TypeScript clean, `npm run test:calculator` 26/26, production build passed (166 pages, `/nutrition-calculator` static).
- Production-mode check (`PRODUCTION_DEPLOYMENT=1`): the page is live and linked in the header "More" menu and the footer.
- Local server: HTTP 200, one H1, `noindex, follow` (indexing is off), 3 links on the homepage, 1 search entry, not in the sitemap while indexing is off (it joins automatically when `SITE_INDEXING=true`).

## 7. Open

- At launch: confirm the calculator appears in `/sitemap.xml` after `SITE_INDEXING=true`.
- After deploying: check the page once on a real phone.
