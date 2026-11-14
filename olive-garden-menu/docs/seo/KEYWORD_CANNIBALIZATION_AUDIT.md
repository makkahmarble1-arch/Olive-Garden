# Keyword Cannibalization Audit (Lesson 8.5)

**Audit date:** 2026-11-14.
**Inputs:**
- the primary and secondary keywords in `content/menu/category-pages.ts`
- the rendered titles, H1s and FAQs of the 18 pages
- a word-overlap comparison of every FAQ question pair, with similarity above 0.75 flagged

## 1. Primary keyword map (one intent per URL)

| URL | Primary keyword | Distinct intent |
|---|---|---|
| `/` | olive garden menu with prices | The whole menu in one place |
| `/family-style-meals` | olive garden family style meals | Bundles and pans for a group |
| `/appetizers` | olive garden appetizers menu | Starters |
| `/classic-entrees` | olive garden classic entrees | Full-size entrees and what comes with them |
| `/buy-one-take-one` | olive garden buy one take one | One promotion |
| `/amazing-alfredos` | olive garden alfredo menu | Alfredo dishes only |
| `/soups-salad-and-breadsticks` | olive garden soup salad and breadsticks | Unlimited soup, salad and breadsticks; soups |
| `/lighter-portions` | olive garden lighter portions menu | Smaller portions |
| `/create-your-own-pasta` | olive garden create your own pasta | Build-a-pasta options |
| `/lunch-menu` | olive garden lunch menu | Lunch hours and lunch prices |
| `/desserts` | olive garden dessert menu | Desserts |
| `/drink-menu` | olive garden drink menu | All drinks (hub) |
| `/sides-sauces-and-extras` | olive garden sides menu | Sides and add-ons |
| `/non-alcoholic-beverages` | olive garden non alcoholic drinks | Soft drinks, tea, coffee, gallons |
| `/wine-and-beer-to-go` | olive garden wine and beer menu | Alcohol and to-go rules |
| `/gluten-sensitive` | olive garden gluten free menu | Gluten-sensitive dishes |
| `/kids-meal` | olive garden kids menu | Kids meals |
| `/catering` | olive garden catering menu | Catering trays and packages |

Each primary keyword is unique; the build validation (`lib/category-validation.ts`) enforces this, along with unique titles, H1s, FAQs and `menuTitle`.

## 2. Overlaps reviewed

| Pair | Risk | Why it is acceptable / action |
|---|---|---|
| `/` vs every category page | Low | The homepage targets the whole menu. Category pages target one category with more detail. This is the approved hub-and-spoke model (owner decision 1, 2026-11-12) |
| `/drink-menu` vs `/non-alcoholic-beverages` and `/wine-and-beer-to-go` | Low | Drink Menu is a short overview hub that links to both. The child pages have the detail. Keep it that way: do not add full child tables to the hub |
| `/classic-entrees` vs `/amazing-alfredos` vs `/lighter-portions` | Low | The same dishes appear by design, through shared data. Each page has its own angle: full-size entrees, Alfredo comparison, smaller portions. No paragraphs are copied |
| `/family-style-meals` vs `/catering` | Low-medium | Both are for groups. Family-Style is pickup bundles and pans for a household; Catering is trays and packages for events, with delivery. The FAQs "How many people does a family meal feed?" and "How many people does a catering tray serve?" have different answers. Keep both and link them to each other (already done) |
| `/lunch-menu` vs `/soups-salad-and-breadsticks` | Low-medium | Both mention the lunch soup, salad and breadsticks combo. Lunch Menu covers hours and all lunch prices; Soups covers the unlimited offer and soup details. Keep the combo's full details on one page and link to it from the other |
| `/lunch-menu` vs `/lighter-portions` | Low | The FAQs "lighter vs regular portions" and "lunch vs dinner portions" are different questions |
| Similar title pattern ("Olive Garden … Menu with Prices 2026") | None | Shared formatting with different topic words. Not cannibalization |

## 3. FAQ overlaps found

Most flagged pairs only share the question template ("What … does Olive Garden serve?", "How much is … at Olive Garden?"). They are about different topics and are fine.

Real overlaps:

| # | Pages | Questions | Action (needs owner approval) | Priority |
|---|---|---|---|---|
| 1 | `/` vs `/gluten-sensitive` | "Does Olive Garden have gluten-free food?" vs "Does Olive Garden have a gluten-free menu?" | Keep both. On the homepage, keep the answer short and add a link to `/gluten-sensitive` after it is published. Optionally reword the homepage question to "Are there gluten-sensitive options at Olive Garden?" | P2 |
| 2 | `/gluten-sensitive` vs `/kids-meal` | "Does Olive Garden have gluten-sensitive kids meals?" vs "Does Olive Garden offer gluten-sensitive kids meals?" | Keep the full answer on `/kids-meal`. Replace the gluten page question with another one, for example "Which gluten-sensitive dishes can kids order?", or shorten its answer and link to `/kids-meal` | P2 |
| 3 | `/desserts` vs `/kids-meal` | "Can you order Olive Garden desserts to go?" vs "Can kids meals be ordered to go?" | Different questions, but the answers use the same text (similarity 0.89). Optionally add category-specific details to one answer | P3 |
| 4 | `/drink-menu` vs `/wine-and-beer-to-go` | "Can you order Olive Garden drinks to go?" vs "Can you order Olive Garden wine to go?" | Acceptable, because the hub and child pages have different scope. Keep the drink-menu answer short and link to the wine page (it already does) | P3 |

## 4. Conclusion

**Update (Lesson 8.5.1, 2026-11-14):**
- Rows 1-3 were fixed.
- Row 1: the homepage answer now links to `/gluten-sensitive`.
- Row 2: the gluten page now asks "Which Olive Garden soup and salad are gluten-sensitive?", and the detailed kids answer is on `/kids-meal`.
- Row 3: both answers were made category-specific.
- Row 4 stays as it is (acceptable).

No page competes with another page for its primary keyword. Two FAQ overlaps (rows 1-2) are worth fixing before the pages are indexed. Both are wording changes, so they need owner approval.
