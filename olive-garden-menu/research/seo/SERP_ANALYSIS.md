# SERP Analysis (Lesson 8.1)

**Research date:** 2026-11-13 · Google, `hl=en`, `gl=us`, connected Chrome browser.

Supporting files:
- Raw per-query data: `SERP_RAW_LOG.md`.
- Per-page competitor structure: `COMPETITOR_PAGE_LOG.md`.
- Per-category detail: `categories/*.md`.

## 1. Who ranks (page 1, 17 queries)
| Query (topic) | Official Olive Garden results on page 1 | Independent menu sites | Other |
|---|---:|---|---|
| family style meals | 5 (incl. Canada) | olive-gardenmenus.com, theolivemenuguide.com, olivegardenmenus.net | — |
| appetizers menu | 4 (incl. old PDF, Canada) | olive-gardenmenus.com, olivegardenmenus.net, theolivemenuguide.com, olivegardenmenuwith-prices.com | — |
| classic entrees | 5 (incl. 2 old PDFs, Canada) | olivegardenmenus.net, olive-gardenmenus.com, theolivemenuguide.com | grubhub |
| buy one take one | 5 (incl. FY26 PDF) | — | yahoo, nrn, milehighonthecheap, dealsonmeals |
| alfredo menu | 7 | olive-gardenmenus.com (single item) | — |
| soup salad and breadsticks | 6 (incl. Canada) | olive-gardenmenus.com (×2) | — |
| lighter portions | 4 | olive-gardenmenus.com (lunch page), theolivegardenmenuprices.com | people.com, reddit, delish |
| create your own pasta | 8 (all) | — | — |
| lunch menu | 4 (incl. 2 old PDFs, Canada) | olive-gardenmenus.com, olivegardenmenus.net, theolivemenuguide.com | grubhub |
| dessert menu | 3 (incl. Costa Rica) | olive-gardenmenus.com, olivegardenmenus.net, theolivemenuguide.com, olivegardenmenuprice.us | yelp |
| drinks menu (with prices) | 5 (incl. old PDF, Canada) | olivegardenmenus.net, olive-gardenmenus.com (×2) | — |
| sides menu | 3 (incl. Canada) | olive-gardenmenus.com, olivegardenmenus.net (homepages) | seamless, mashed, dineinonline |
| non alcoholic drinks | 6 (incl. CR, Canada, old PDF) | olivegardenmenus.net | quizlet |
| wine and beer menu | 5 (incl. Canada) | olive-gardenmenus.com (×2), olivegardenmenus.net | — |
| gluten free menu | 4 (incl. allergen PDF) | theolivemenuguide.com, olivegardenmenus.net | mamaknowsglutenfree, seasonalcravings |
| kids menu | 4 (incl. Canada) | olivegardenmenus.net, theolivemenuguide.com, olivegardenmenuwith-prices.com | scribd |
| catering menu | 5 (incl. 2019 PDF) | olive-gardenmenus.com, theolivemenuguide.com, olivegardenmenus.net | — |

**An AI Overview appeared on all 17 queries.** Visible answers (prices, lists) are partly taken by the AI Overview. Pages need facts that the overview cannot show reliably: a reference location, a check date, calories with units, comparisons, and rules.

## 2. Patterns observed
1. **Official pages dominate** the narrow topics:
   - Create Your Own Pasta: 8 of 8.
   - Alfredo: 7 of 8.
   - Soup, salad, and breadsticks: 6 of 8.

   Independent pages win mostly on broad "menu with prices" style queries.
2. **Outdated official PDFs (2019-2023) still rank** for several queries. A clearly dated, current page is an advantage.
3. **Non-US official sites** (Canada, Costa Rica) rank for US queries. These pages show different prices, a gap a US-location-referenced page can fill.
4. **Three independent menu networks** appear in almost every SERP:
   - **olive-gardenmenus.com:** cards, short pages, "updated August/November 2026", FAQPage and ItemList schema. Many single-item pages.
   - **olivegardenmenus.net:** tables, item names as H2s, rarely any calories, no check date.
   - **theolivemenuguide.com:** long pages (1,200-2,300 words), prices and calories, FAQ, Article, "note about menu prices". Showed bot verification during this session.
5. **Price accuracy problems** on competitors (spot checks vs our official Millenia online pickup prices, 2026-11-12):

   | Item | Competitor price | Our official price |
   |---|---|---|
   | Chicken Alfredo | $19.99 (one site) / $26.49 (another) | $21.79 |
   | Fettuccine Alfredo | $15.99 | $17.49 |
   | Tiramisu | $8.99 | $9.79 |
   | Soup, Salad & Breadsticks | $10.99 | $13.49 regular, $9.99 lunch offer |

   No competitor names a reference restaurant or order type.
6. **Outdated structure** on competitors:
   - "Lunch Duos" / "Create Your Own Lunch Duo" (lunch).
   - "$52.99–$64.99" family meals.
   - "Buy One Take One from $14.99" (an older campaign).
7. **Wrong terminology:** one competitor calls gluten-sensitive items "gluten-free".
8. **News and forums** rank for changing topics: lighter portions (People, Delish, Reddit) and Buy One Take One (Yahoo, NRN). These topics are time-sensitive and need a dated status.
9. **PAA appeared** for appetizers, soup/salad, non-alcoholic drinks, wine and beer, gluten free, and kids. It was absent for most others.

## 3. Common competitor structure (to differ from, not copy)
- **Typical structure:** H1 "[Category] Menu (With 2026 Prices)", then a list of cards or a table, then an FAQ and "related menus".
- **Long-form variants add:** "best/most popular", "tips", "deals/coupons", "conclusion", "note about prices".
- **Item names as H2s** (one H2 per dish) is common on one network. This creates many thin headings; our approved rule is "no unnecessary H3s" and one table.

## 4. What competitors do well (useful features, not wording)
- Short "updated" label near the H1 (olive-gardenmenus.com).
- Price + calories in the same row (theolivemenuguide.com).
- FAQ blocks matched to PAA-style questions.
- Related-menu links at the end.
- A specialist gluten blog with author expertise and cross-contact detail (mamaknowsglutenfree.com).

## 5. Weaknesses across competitors
- No reference location or order type for prices.
- No exact check date (only "2026" or a month).
- Calories missing on one network, and combined calorie ranges not sourced.
- Delivery-app prices and old PDFs used as sources.
- No portion comparisons (regular vs lighter vs lunch vs family).
- No promotion-status dates (Buy One Take One).
- No headcount planning for catering.
- Opinion rankings presented without data.

## 6. Limitations of this SERP study
- One sample per query, one date, one browser. Results are personalised by location and history.
- The exact query "olive garden drink menu" returned a browser error page twice; a close variant was used.
- Some competitor pages could not be read: theolivemenuguide.com showed bot verification after several visits; olivegardenmenuwith-prices.com, olivegardenmenuprice.us, and dealsonmeals.app redirected on load. CAPTCHAs were not bypassed.
- Page-structure counts are automatic regex counts and approximate.
- No search volume, difficulty, or CPC data.
