# Item pages: final review (2026-11-18)

**Update 2026-11-19 (after publishing all 122 pages, pre-Improvement-7 check):** `tsc` clean, ESLint clean, production build OK on the first attempt (165 static pages), build check 0 issues, nutrition data check 0 issues. HTML/SEO QA 122/122. Crawl of 149 pages (home, 17 categories, guides, info pages, 122 item pages): 0 problems, 152 unique internal links, 0 broken; 404 checks OK (unknown item, unknown page, wrong case, `/.env`, `/api`, deeper path, `/design-preview`). Headless-Chrome QA at 390/1280 px: 122/122 item pages and 27/27 other pages, 0 failures (version switch, rating widget, related items, no overflow). Search: 155 entries, all 122 item pages; sample queries (incl. typo "chiken parm") return the right page first. Owner decisions 2026-11-20: keep the 2 development test votes as they are (lasagna bundle shows 1.0 (1)); keep the 2-liter soda photo (it also shows Fanta and Dr Pepper, which are not offered); the remaining pre-launch manual checks stay on the launch checklist.

**Update 2026-11-19 (complete coverage round):** 45 new preview pages (122 in total). Tests: `tsc` clean, ESLint clean, production build OK (165 static pages; a first attempt failed from low memory and passed on retry), build check 0 issues, HTML/SEO QA 122/122, headless-Chrome QA of the 45 new pages at 390/1280 px in 3 batches: 0 failures, 174 internal links OK, `/api/ratings` 200. Fixes from the visual check: calorie ranges in hero/quick facts/nutrition, nutrition intro no longer says "official guide" when no row exists, soup sizes priced per half gallon/gallon (not "per pan"), duplicate lasagna size card removed.

**Scope:** 77 pages: 1 published (Fried Mozzarella) and 76 preview.

**Update 2026-11-18:** the owner confirmed the visual approval ("haan"). All 76 pages are now `published`, with `ownerApprovedAt: "2026-11-18"` and `visualReview: "done"`. The re-run after publishing passed: build check 0 issues, HTML QA 77/77, browser QA 0 failures, production simulation 77/77.

## Tests run (local `next start`, production build)

| Test | Result |
|---|---|
| TypeScript (`tsc --noEmit`) | Clean |
| ESLint (`npm run lint`) | 0 errors, 0 warnings |
| Production build | Pass, 120 static pages |
| Product page build check (`validateProductPages`) | 0 issues. Prices, calories, version rows, nutrient numbers in text and meta descriptions all match the shared data |
| HTML QA, all 77 pages | Checked: HTTP 200, one H1, self-canonical, `noindex`, unique titles, description length, allowed JSON-LD only (WebPage, BreadcrumbList, FAQPage), no reference-location or "AI" wording, Related Menus. **0 problems** |
| Browser QA, headless Chrome at 390 px and 1280 px, all 77 pages | Checked: no horizontal overflow, no broken images (lazy images scrolled into view), hero photo loaded or labeled placeholder, price and calorie badges, rating widget and summary, nutrition table, allergen card, 3+ similar items, 3+ FAQs, 4 Related Menus, version tabs switch the panel, hero links at least 44 px. **0 failures** |
| Internal links found on item pages | 96 unique; all HTTP 200 (or 308 for `/menu`) |
| Site search (index + ranking) | All 77 pages in the index. Typical queries return the item page first (calamari, chicken alfredo, tiramisu, lemonade, gluten free chicken parm, calabrian, kids pizza, alfredo sauce, "capuccino" typo) |
| Homepage / category integration | Homepage links all 77 pages; category cards and price tables link through `productDetailHref` |
| Ratings | `GET /api/ratings` 200; no votes cast, rating data untouched |
| 404 / redirects | Unknown `/menu/<slug>` 404, `/menu` 308 |
| Production simulation (earlier today, `VERCEL_ENV=production`) | Only the published page is live, linked and searchable |

## Fixes made in this review

1. **Quick-facts "other size" cards** said "$12.49 per tray" for lunch and lighter plates. They now name the size and use the right unit: Lunch size "weekday lunch", Lighter portion "per plate", Family size "per pan", Catering size "per tray". The published Fried Mozzarella card is unchanged ("per tray").
2. **Entrée unit:** classic entrées now count "per entrée" in the nutrition box, quick facts and FAQ, matching the hero (was "per order").

## Representative screenshots

Desktop (1280 px) and mobile (390 px) captures are in `research/products/review-screenshots/`:
- `calamari`: appetizer
- `lasagna-classico`: classic entrée
- `tiramisu`: dessert
- `chicken-alfredo`: version selector
- `grilled-chicken-parmigiana`: gluten-sensitive, placeholder photo

## Ready for publication after the owner's visual approval (63)

calamari, toasted-ravioli, stuffed-ziti-fritta, breadsticks, lasagna-fritta, spinach-artichoke-dip, fettuccine-alfredo, shrimp-alfredo, seafood-alfredo, steak-gorgonzola-alfredo, five-cheese-ziti-al-forno, lasagna-classico, spaghetti-with-meat-sauce, spaghetti-with-marinara, shrimp-carbonara, ravioli-carbonara, tour-of-italy, eggplant-parmigiana, stuffed-chicken-marsala, grilled-chicken-margherita, tiramisu, black-tie-mousse-cake, strawberry-cream-cake, sicilian-cheesecake-with-strawberry-topping, eggplant-parmigiana-sandwich, chicken-alfredo-flatbread, five-cheese-flatbread, classic-pepperoni-flatbread, zuppa-toscana, rotini-pasta-with-marinara, rotini-pasta-with-meat-sauce, kids-pizza, kids-chicken-fingers, kids-cheese-ravioli, meatballs-parmigiana, shrimp-fritto-misto, chicken-parmigiana, chicken-scampi, shrimp-scampi, herb-grilled-salmon, 6-oz-sirloin, spicy-alfredo-fettuccine, chocolate-lasagna, warm-italian-doughnuts, pumpkin-cookie-butter-cheesecake, kids-macaroni-and-cheese, italian-grilled-chicken-sandwich, famous-house-salad, side-of-grilled-chicken, side-of-meatballs, italian-sausage, side-of-crispy-chicken-fritta, side-of-broccoli, side-of-alfredo-sauce, chicken-alfredo, calabrian-steak-and-shrimp-bucatini, cheese-ravioli, lunch-spaghetti, chicken-parmigiana-sandwich, side-of-mashed-potatoes, side-of-marinara-sauce, side-of-meat-sauce, side-of-five-cheese-marinara-sauce

## Owner decisions of 2026-11-18 (publishing with disclosed gaps)

Recorded per page as `acceptedGaps` (date, checklist key, reason). The build check accepts a not-"done" checklist item when publishing only for these listed keys; the visual review always needs real approval.

1. **Gluten-sensitive Grilled Chicken Parmigiana:** publish with a neutral image placeholder (`accurateImage`).
2. **Spaghetti & Meatballs, Chicken Tortelloni Alfredo, Chicken & Shrimp Carbonara:** publish with the verified information. The missing version-specific nutrition is disclosed (`nutritionAndAllergens`).
3. **Nine drinks:** publish with a clear notice that the official allergen guide does not cover them. The notice says this does **not** mean the drink is allergen-free (`nutritionAndAllergens`).
4. Nothing is invented.
5. **Publishing waits for the owner's visual approval.** On approval, add the slugs to `content/menu/product-pages/approvals.ts` and set them to `published` in `registry.ts`. A dry run on 2026-11-18 showed that all 76 preview pages would pass the publish check once approved.

## Pages with owner-accepted gaps (13): ready after visual approval

All 13 pages disclose the gap on the page; no value is invented.

| Page(s) | Blocker |
|---|---|
| grilled-chicken-parmigiana | No accurate photo (both owner photos are materially misleading for a gluten-sensitive dish). Placeholder shown. Publish with the placeholder, or supply a photo of grilled, unbreaded chicken with rotini in marinara. |
| spaghetti-and-meatballs | Dinner marinara version: no official nutrition row (calories only) |
| chicken-tortelloni-alfredo | Shrimp version: not in either official guide (price and calories only) |
| chicken-and-shrimp-carbonara | Chicken-only version: not in either official guide (price and calories only) |
| 9 drinks: classic-lemonade, raspberry-lemonade, sweet-pear-limonata, strawberry-passion-fruit-limonata, mango-passion-fruit-iced-tea, bellini-peach-raspberry-iced-tea, half-iced-tea-and-half-lemonade, cappuccino, lavazza-espresso | Olive Garden's allergen guide does not cover to-go drinks; the pages say so |

**Status after the owner decisions:** all 76 preview pages are ready to publish as soon as the owner confirms the visual approval: the 63 above plus these 13. A publish dry run gave 0 issues.
