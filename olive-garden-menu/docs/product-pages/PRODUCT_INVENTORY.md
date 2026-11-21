# Product Inventory (menu item pages)

**Generated:** 2026-11-18 from `content/menu/` and the central official data
(`content/menu/nutrition/`, PDFs US_101926). Re-generate after data changes.

## Complete menu coverage round (owner decisions 2026-11-19)

**45 new pages, built as `preview` and published 2026-11-19 after the owner's visual approval.** Total: **122 pages, all `published`** (indexing still off).

- **Soups (3):** Chicken & Gnocchi, Pasta e Fagioli, Minestrone. Detail-only product records in `content/menu/detail-items.ts` (bowl + half gallon + gallon, official rows p. 4 / 21-22); no new homepage cards (the 210 + 21 inventory is unchanged). Rating group: the existing `homemade-soups` (rating data unchanged). Linked from the soups table on `/soups-salad-and-breadsticks` and from search.
- **Wines (14) and beers (6):** bottle/beer price and menu calories; the guide has only generic values by type (disclosed); the allergen guide does not cover them (disclosed, "not allergen-free").
- **Simple drinks (7):** fountain drinks, sweet tea, unsweet tea (no guide row, disclosed), 2-liter soda (3 versions, official p. 25 rows), gallons (7 versions; sweet-tea gallon has no row), San Pellegrino, Acqua Panna.
- **Kids (7):** 4 kids pastas with calculated main-dish calories (pasta + sauce), Kids Rotini with Marinara / Meat Sauce and Kids Grilled Chicken with Rotini (official rows; the gluten-sensitive listings are linked as the same dish).
- **Bundles and combinations (8):** 4 family-style bundles (lasagna with its large size), Chicken Parmigiana and Lasagna Combinations, Create Your Own Pasta Station (official row p. 24), Dipping Sauces with Breadsticks (calculated). "What's Included" section (`components/product/ComponentsSection.tsx`) lists the official parts with links; totals are Olive Garden's own, never re-added.
- **Catering and pan versions (14 + 3 same-dish listings):** covered on existing pages through `equivalentOfferingIds` (sizes table + card links); nothing merged.
- **Kids pasta calories corrected** in `content/menu/offerings/kids-meal.ts`: before, only the sauce was shown. Now pasta + sauce (Calc.): alfredo 610-660, meat sauce 280-330, tomato sauce 250-300, five cheese marinara 320-370. Unresolved: the guide has no kids five cheese marinara row (150 from the online menu is used, documented).

**Coverage after this round (2026-11-19):** 149 products (146 + 3 detail-only soups). 122 have their own page; 17 more are covered on another page (same dish as a catering tray, family pan or gluten-sensitive listing); 27 versions on 10 version-aware pages. 217 of 231 offerings link to an item page.

**Products without an item page (10), each with its reason:**
- `homemade-soups` (group of four choices): every soup has its own page; the group is covered by `/soups-salad-and-breadsticks`.
- `soup-salad-and-breadsticks`, `soup-salad-and-breadsticks-lunch`, `weekday-lunch-special`: the meal is the dedicated category page `/soups-salad-and-breadsticks` (no duplicate page).
- `create-your-own-pasta`: builder covered by the category page `/create-your-own-pasta`.
- `large-salad`, `rigatoni-alla-vodka`, `four-cheese-manicotti-with-marinara`: not on the current online menu.
- `side-of-crispy-shrimp-fritta`: calorie conflict (owner decision: keep 200, mapping `conflict`).
- `cheese-grater`: merchandise, not a menu item.

The tables below are the 2026-11-18 snapshot.

## Item page status (2026-11-18, end of the item-page phase)

- **146 unique products:**
  - **77 with their own page, all published** (Fried Mozzarella 2026-11-18, the other 76 after the owner's visual approval on 2026-11-18).
  - **69 covered without a page of their own** (reasons below).
- **8 version-aware pages** (selector; each version with its own official rows where they exist): Chicken Alfredo, Calabrian Steak & Shrimp Bucatini, Spaghetti & Meatballs, Cheese Ravioli, Lunch Spaghetti, Chicken Parmigiana Sandwich, Chicken Tortelloni Alfredo, Chicken & Shrimp Carbonara.
- **Owner decisions 2026-11-18:** the 13 pages with documented gaps may be published with their disclosures (`acceptedGaps`), so all 76 preview pages are ready to publish after the owner's visual approval. Gaps:
  - A version with no official row: Spaghetti & Meatballs (marinara), Shrimp Tortelloni Alfredo, Chicken Carbonara.
  - The 9 drinks: the allergen guide does not cover to-go drinks.
  - Grilled Chicken Parmigiana (gluten-sensitive): photo omitted.

| Category | Products | With own page |
|---|---:|---:|
| Family-Style Meals | 21 | 13 |
| Appetizers | 10 | 9 |
| Classic Entrees | 28 | 26 |
| Buy One Take One | 7 | 5 |
| Amazing Alfredos | 5 | 5 |
| Soups, Salad and Breadsticks | 6 | 2 |
| Lighter Portions | 8 | 8 |
| Create Your Own Pasta | 0 (23 options) | — |
| Lunch Menu | 17 | 16 |
| Desserts | 7 | 7 |
| Drink Menu | 13 | 8 |
| Sides, Sauces and Extras | 12 | 10 |
| Non-Alcoholic Beverages | 14 | 9 |
| Wine & Beer To Go | 20 | 0 |
| Gluten Sensitive | 10 | 6 |
| Kids Meal | 11 | 4 |
| Catering | 39 | 19 |

A product placed in several categories is counted in each. For example, Fettuccine Alfredo appears in 7 categories but has 1 page, and the other placements link to that page.

**Products without their own page (69) and why:**

| Group | Products | Reason |
|---|---|---|
| Bundles, combinations, composites (CYOP, soup-salad-breadsticks meals, dipping-sauce combos) | 11 | No single official row; the category pages already explain them |
| Wines and beers (incl. Heineken 0.0) | 20 | Only generic nutrition rows (per glass/serving type), not the bottle sold |
| Catering-only items (toasted beef ravioli tray, 4 dipping-sauce containers, chicken breasts, fingers, meatballs, broccoli, cheesecake, 2 bottled waters, pasta station) | 13 | Same dish as a restaurant item with a page, or no allergen coverage; the catering page covers them |
| Family-size pans without their own row (spaghetti with marinara pan, cheese ravioli pans) | 3 | Variant rows only, no allergen coverage; covered on family-style/catering pages |
| Multi-flavor or unlisted drinks (gallons, 2-liter, fountain, brewed teas) | 5 | Multi-row or not in the nutrition guide |
| Homemade Soups (four soups as options of one product) | 1 | Per-soup pages would need new product records (owner decision) |
| Kids pasta composites and kids/gluten-sensitive rotini items | 10 | Composite rows, or no allergen row for kids/gluten-sensitive versions (sensitive audience); category pages answer them |
| Famous House Salad without croutons | 1 | Same salad, covered on `/menu/famous-house-salad` |
| Not on the online menu (Large Salad, Rigatoni alla Vodka, Four-Cheese Manicotti) | 3 | No current price or calories |
| Side of Crispy Shrimp Fritta | 1 | Calorie conflict (owner decision: keep 200), no row to show |
| Cheese Grater | 1 | Merchandise, no nutrition |

## Totals

| Measure | Count |
|---|---|
| Unique products (`content/menu/products.ts`) | 146 |
| Offerings (product placements in categories) | 231 |
| Official nutrition rows entered (incl. 18 "add ..." sauce/topping rows) | 303 |
| Official allergen rows entered | 112 |
| Products with verified official nutrition (≥ 1 offering "exact"/"same-item") | 89 |
| Products with verified official allergen marks | 62 |
| Products with both | 61 |
| Products with a calorie conflict | 1 |
| Products with no single official row (bundles, wines/beers, multi-flavor, composites...) | 56 |

"Verified" = an official row that describes exactly that item (same name or
documented same item, same serving, and the same calories as our data;
checked at build time by `lib/nutrition-data.ts`). Unavailable values stay
`null` and are never shown as zero.

## All products

| Product id | Name | Offerings | Nutrition rows | Allergen rows | Conflict | Photo | Eligibility | Categories |
|---|---|---:|---:|---:|---:|---|---|---|
| `family-style-lasagna-bundle` | Family-Style Lasagna Bundle | 3 | 0 | 0 |  | Yes | C: no single official row | family-style-meals, classic-entrees |
| `famous-house-salad` | Our Famous Jumbo House Salad | 3 | 3 | 1 |  | Yes | A: data-ready | family-style-meals, soups-salad-and-breadsticks, catering |
| `chicken-alfredo` | Chicken Alfredo | 4 | 0 | 0 |  | Yes | V: official rows per version | family-style-meals, classic-entrees, amazing-alfredos, catering |
| `chicken-parmigiana` | Chicken Parmigiana | 6 | 5 | 3 |  | Yes | A: data-ready | family-style-meals, classic-entrees, buy-one-take-one, lighter-portions, lunch-menu, catering |
| `fettuccine-alfredo` | Fettuccine Alfredo | 7 | 4 | 4 |  | Yes | A: data-ready | family-style-meals, classic-entrees, buy-one-take-one, amazing-alfredos, lighter-portions, lunch-menu, catering |
| `shrimp-alfredo` | Shrimp Alfredo | 4 | 4 | 2 |  | Yes | A: data-ready | family-style-meals, classic-entrees, amazing-alfredos, catering |
| `five-cheese-ziti-al-forno` | Five Cheese Ziti al Forno | 6 | 5 | 3 |  | Yes | A: data-ready | family-style-meals, classic-entrees, buy-one-take-one, lighter-portions, lunch-menu, catering |
| `spaghetti-with-meat-sauce` | Spaghetti with Meat Sauce | 4 | 1 | 1 |  | Yes | A: data-ready | family-style-meals, classic-entrees, buy-one-take-one, catering |
| `spaghetti-with-marinara-sauce` | Spaghetti with Marinara Sauce | 2 | 0 | 0 |  | Yes | C: no single official row | family-style-meals, catering |
| `chicken-tortelloni-alfredo` | Chicken Tortelloni Alfredo | 4 | 2 | 0 |  | Yes | B: partial official data | family-style-meals, classic-entrees, amazing-alfredos, catering |
| `lasagna-classico` | Lasagna Classico | 6 | 4 | 3 |  | Yes | A: data-ready | family-style-meals, classic-entrees, buy-one-take-one, lighter-portions, lunch-menu, catering |
| `chicken-scampi` | Chicken Scampi | 3 | 3 | 1 |  | Yes | A: data-ready | family-style-meals, classic-entrees, catering |
| `chicken-and-shrimp-carbonara` | Chicken and Shrimp Carbonara | 3 | 2 | 0 |  | Yes | B: partial official data | family-style-meals, classic-entrees, catering |
| `shrimp-scampi` | Shrimp Scampi | 4 | 4 | 2 |  | Yes | A: data-ready | family-style-meals, classic-entrees, lunch-menu, catering |
| `cheese-ravioli-with-meat-or-marinara-sauce` | Cheese Ravioli with Meat or Marinara Sauce | 1 | 0 | 0 |  | Yes | C: no single official row | family-style-meals |
| `homemade-soups` | Homemade Soups | 5 | 0 | 0 |  | Yes | C: no single official row | family-style-meals, soups-salad-and-breadsticks, catering |
| `breadsticks` | Breadsticks | 4 | 4 | 2 |  | Yes | page (preview) | family-style-meals, appetizers, soups-salad-and-breadsticks, catering |
| `large-salad` | Large Salad | 1 | 0 | 0 |  | Yes | not eligible: no verified price/calories | family-style-meals |
| `fried-mozzarella` | Fried Mozzarella | 2 | 2 | 1 |  | Yes | page (published) | appetizers, catering |
| `stuffed-ziti-fritta` | Stuffed Ziti Fritta | 1 | 1 | 1 |  | Yes | page (preview) | appetizers |
| `dipping-sauces-with-breadsticks` | Dipping Sauces with Breadsticks | 2 | 0 | 0 |  | Yes | C: no single official row | appetizers, soups-salad-and-breadsticks |
| `calamari` | Calamari | 1 | 1 | 1 |  | Yes | page (preview) | appetizers |
| `meatballs-parmigiana` | Meatballs Parmigiana | 1 | 1 | 1 |  | Yes | A: data-ready | appetizers |
| `spinach-artichoke-dip` | Spinach-Artichoke Dip | 2 | 2 | 1 |  | Yes | A: data-ready | appetizers, catering |
| `lasagna-fritta` | Lasagna Fritta | 1 | 1 | 1 |  | Yes | A: data-ready | appetizers |
| `shrimp-fritto-misto` | Shrimp Fritto Misto | 1 | 1 | 1 |  | Yes | A: data-ready | appetizers |
| `toasted-ravioli` | Toasted Ravioli | 1 | 1 | 1 |  | Yes | page (preview) | appetizers |
| `calabrian-steak-and-shrimp-bucatini` | Calabrian Steak & Shrimp Bucatini | 1 | 0 | 0 |  | Yes | V: official rows per version | classic-entrees |
| `shrimp-carbonara` | Shrimp Carbonara | 1 | 1 | 1 |  | Yes | A: data-ready | classic-entrees |
| `tour-of-italy` | Tour of Italy | 1 | 1 | 1 |  | Yes | A: data-ready | classic-entrees |
| `ravioli-carbonara` | Ravioli Carbonara | 1 | 1 | 1 |  | Yes | A: data-ready | classic-entrees |
| `spaghetti-and-meatballs` | Spaghetti & Meatballs | 3 | 0 | 0 |  | Yes | V: official rows per version | classic-entrees, lighter-portions, lunch-menu |
| `spaghetti-with-marinara` | Spaghetti with Marinara | 1 | 1 | 1 |  | Yes | A: data-ready | classic-entrees |
| `stuffed-chicken-marsala` | Stuffed Chicken Marsala | 1 | 1 | 1 |  | Yes | A: data-ready | classic-entrees |
| `steak-gorgonzola-alfredo` | Steak Gorgonzola Alfredo | 1 | 1 | 1 |  | Yes | A: data-ready | classic-entrees |
| `seafood-alfredo` | Seafood Alfredo | 2 | 2 | 2 |  | Yes | A: data-ready | classic-entrees, amazing-alfredos |
| `cheese-ravioli` | Cheese Ravioli | 3 | 0 | 0 |  | Yes | V: official rows per version | classic-entrees, lighter-portions, lunch-menu |
| `eggplant-parmigiana` | Eggplant Parmigiana | 3 | 3 | 3 |  | Yes | A: data-ready | classic-entrees, lighter-portions, lunch-menu |
| `grilled-chicken-margherita` | Grilled Chicken Margherita | 1 | 1 | 1 |  | Yes | A: data-ready | classic-entrees |
| `herb-grilled-salmon` | Herb-Grilled Salmon | 2 | 2 | 2 |  | Yes | A: data-ready | classic-entrees, gluten-sensitive |
| `6-oz-sirloin` | 6 oz. Sirloin | 2 | 2 | 2 |  | Yes | A: data-ready | classic-entrees, gluten-sensitive |
| `create-your-own-pasta` | Create Your Own Pasta | 1 | 0 | 0 |  | Yes | C: no single official row | classic-entrees |
| `rigatoni-alla-vodka` | Rigatoni alla Vodka | 1 | 0 | 0 |  | Yes | not eligible: no verified price/calories | buy-one-take-one |
| `four-cheese-manicotti-with-marinara` | Four-Cheese Manicotti with Marinara | 1 | 0 | 0 |  | Yes | not eligible: no verified price/calories | buy-one-take-one |
| `weekday-lunch-special` | Weekday Lunch Special | 1 | 0 | 0 |  | Yes | C: no single official row | soups-salad-and-breadsticks |
| `soup-salad-and-breadsticks` | Soup, Salad & Breadsticks | 1 | 0 | 0 |  | Yes | C: no single official row | soups-salad-and-breadsticks |
| `spaghetti` | Spaghetti | 1 | 0 | 0 |  | Yes | V: official rows per version | lunch-menu |
| `soup-salad-and-breadsticks-lunch` | Soup, Salad and Breadsticks (Lunch) | 1 | 0 | 0 |  | Yes | C: no single official row | lunch-menu |
| `chocolate-lasagna` | Chocolate Lasagna | 1 | 1 | 1 |  | Yes | A: data-ready | desserts |
| `black-tie-mousse-cake` | Black Tie Mousse Cake | 2 | 2 | 1 |  | Yes | A: data-ready | desserts, catering |
| `tiramisu` | Tiramisu | 2 | 2 | 1 |  | Yes | A: data-ready | desserts, catering |
| `strawberry-cream-cake` | Strawberry Cream Cake | 1 | 1 | 1 |  | Yes | A: data-ready | desserts |
| `warm-italian-doughnuts` | Warm Italian Doughnuts | 1 | 1 | 1 |  | Yes | A: data-ready | desserts |
| `sicilian-cheesecake-with-strawberry-topping` | Sicilian Cheesecake with Strawberry Topping | 1 | 1 | 1 |  | Yes | A: data-ready | desserts |
| `gallon-iced-teas-and-raspberry-lemonade` | Gallon Iced Teas & Raspberry Lemonade | 3 | 0 | 0 |  | Yes | C: no single official row | drink-menu, non-alcoholic-beverages, catering |
| `2-liter-soda` | 2-Liter Soda | 3 | 0 | 0 |  | Yes | C: no single official row | drink-menu, non-alcoholic-beverages, catering |
| `to-go-fountain-drinks` | To-Go Fountain Drinks | 2 | 0 | 0 |  | Yes | C: no single official row | drink-menu, non-alcoholic-beverages |
| `raspberry-lemonade` | Raspberry Lemonade | 2 | 2 | 0 |  | Yes | B: partial official data | drink-menu, non-alcoholic-beverages |
| `classic-lemonade` | Classic Lemonade | 2 | 2 | 0 |  | Yes | B: partial official data | drink-menu, non-alcoholic-beverages |
| `desert-pear-limonata` | Desert Pear Limonata | 2 | 2 | 0 |  | Yes | B: partial official data | drink-menu, non-alcoholic-beverages |
| `strawberry-passion-fruit-limonata` | Strawberry-Passion Fruit Limonata | 2 | 2 | 0 |  | Yes | B: partial official data | drink-menu, non-alcoholic-beverages |
| `mango-passion-fruit-iced-tea` | Mango-Passion Fruit Iced Tea | 2 | 2 | 0 |  | Yes | not eligible: not currently available | drink-menu, non-alcoholic-beverages |
| `bellini-peach-raspberry-iced-tea` | Bellini Peach-Raspberry Iced Tea | 2 | 2 | 0 |  | Yes | B: partial official data | drink-menu, non-alcoholic-beverages |
| `fresh-brewed-sweet-iced-tea` | Fresh-Brewed Sweet Iced Tea | 2 | 0 | 0 |  | Yes | C: no single official row | drink-menu, non-alcoholic-beverages |
| `fresh-brewed-unsweet-iced-tea` | Fresh-Brewed Unsweet Iced Tea | 2 | 0 | 0 |  | Yes | C: no single official row | drink-menu, non-alcoholic-beverages |
| `cappuccino` | Cappuccino | 2 | 2 | 0 |  | Yes | B: partial official data | drink-menu, non-alcoholic-beverages |
| `cheese-grater` | Cheese Grater | 1 | 0 | 0 |  | Yes | not eligible: no verified price/calories | sides-sauces-and-extras |
| `side-of-meatballs` | Side of Meatballs | 1 | 1 | 1 |  | Yes | A: data-ready | sides-sauces-and-extras |
| `side-of-grilled-chicken` | Side of Grilled Chicken | 1 | 1 | 1 |  | Yes | A: data-ready | sides-sauces-and-extras |
| `side-of-mashed-potatoes` | Side of Mashed Potatoes | 1 | 1 | 1 |  | Yes | A: data-ready | sides-sauces-and-extras |
| `side-of-broccoli` | Side of Broccoli | 1 | 1 | 1 |  | Yes | A: data-ready | sides-sauces-and-extras |
| `side-of-alfredo-sauce` | Side of Alfredo Sauce | 1 | 1 | 1 |  | Yes | A: data-ready | sides-sauces-and-extras |
| `side-of-marinara-sauce` | Side of Marinara Sauce | 1 | 1 | 1 |  | Yes | A: data-ready | sides-sauces-and-extras |
| `side-of-meat-sauce` | Side of Meat Sauce | 1 | 1 | 1 |  | Yes | A: data-ready | sides-sauces-and-extras |
| `side-of-five-cheese-marinara-sauce` | Side of Five Cheese Marinara Sauce | 1 | 1 | 1 |  | Yes | A: data-ready | sides-sauces-and-extras |
| `lavazza-espresso` | Lavazza Espresso | 1 | 1 | 0 |  | Yes | B: partial official data | non-alcoholic-beverages |
| `moscato-primo-amore` | Moscato Primo Amore | 1 | 0 | 0 |  | Yes | C: no single official row | wine-and-beer-to-go |
| `sweet-pink-moscato-blend-confetti` | Sweet Pink Moscato Blend Confetti | 1 | 0 | 0 |  | Yes | C: no single official row | wine-and-beer-to-go |
| `sweet-red-roscato-rosso-dolce` | Sweet Red Roscato Rosso Dolce | 1 | 0 | 0 |  | Yes | C: no single official row | wine-and-beer-to-go |
| `red-blend-porta-vita` | Red Blend Porta Vita | 1 | 0 | 0 |  | Yes | C: no single official row | wine-and-beer-to-go |
| `moscato-castello-del-poggio` | Moscato Castello del Poggio | 1 | 0 | 0 |  | Yes | C: no single official row | wine-and-beer-to-go |
| `white-zinfandel-sutter-home` | White Zinfandel Sutter Home | 1 | 0 | 0 |  | Yes | C: no single official row | wine-and-beer-to-go |
| `riesling-chateau-ste-michelle` | Riesling Chateau Ste. Michelle | 1 | 0 | 0 |  | Yes | C: no single official row | wine-and-beer-to-go |
| `pinot-grigio-cavit` | Pinot Grigio Cavit | 1 | 0 | 0 |  | Yes | C: no single official row | wine-and-beer-to-go |
| `sauvignon-blanc-starborough` | Sauvignon Blanc Starborough | 1 | 0 | 0 |  | Yes | C: no single official row | wine-and-beer-to-go |
| `chardonnay-chateau-ste-michelle` | Chardonnay Chateau Ste. Michelle | 1 | 0 | 0 |  | Yes | C: no single official row | wine-and-beer-to-go |
| `pinot-noir-meiomi` | Pinot Noir Meiomi | 1 | 0 | 0 |  | Yes | C: no single official row | wine-and-beer-to-go |
| `merlot-beringer` | Merlot Beringer | 1 | 0 | 0 |  | Yes | C: no single official row | wine-and-beer-to-go |
| `chianti-classico-rocca-delle-macie` | Chianti Classico Rocca delle Macie | 1 | 0 | 0 |  | Yes | C: no single official row | wine-and-beer-to-go |
| `cabernet-robert-mondavi-private-selection` | Cabernet Robert Mondavi Private Selection | 1 | 0 | 0 |  | Yes | C: no single official row | wine-and-beer-to-go |
| `budweiser` | Budweiser | 1 | 0 | 0 |  | Yes | C: no single official row | wine-and-beer-to-go |
| `bud-light` | Bud Light | 1 | 0 | 0 |  | Yes | C: no single official row | wine-and-beer-to-go |
| `coors-light` | Coors Light | 1 | 0 | 0 |  | Yes | C: no single official row | wine-and-beer-to-go |
| `michelob-ultra` | Michelob Ultra | 1 | 0 | 0 |  | Yes | C: no single official row | wine-and-beer-to-go |
| `miller-lite` | Miller Lite | 1 | 0 | 0 |  | Yes | C: no single official row | wine-and-beer-to-go |
| `zuppa-toscana` | Zuppa Toscana | 1 | 1 | 1 |  | Yes | A: data-ready | gluten-sensitive |
| `famous-house-salad-without-croutons` | Famous House Salad without Croutons | 1 | 1 | 1 |  | Yes | A: data-ready | gluten-sensitive |
| `grilled-chicken-parmigiana` | Grilled Chicken Parmigiana | 1 | 1 | 1 |  | Yes | A: data-ready | gluten-sensitive |
| `rotini-pasta-with-marinara` | Rotini Pasta with Marinara | 1 | 1 | 1 |  | Yes | A: data-ready | gluten-sensitive |
| `rotini-pasta-with-meat-sauce` | Rotini Pasta with Meat Sauce | 1 | 1 | 1 |  | Yes | A: data-ready | gluten-sensitive |
| `grilled-chicken-with-rotini-pasta-and-marinara` | Grilled Chicken with Rotini Pasta & Marinara | 1 | 1 | 0 |  | Yes | B: partial official data | gluten-sensitive |
| `rotini-with-marinara` | Rotini with Marinara | 1 | 1 | 0 |  | Yes | B: partial official data | gluten-sensitive |
| `rotini-with-meat-sauce` | Rotini with Meat Sauce | 1 | 1 | 0 |  | Yes | B: partial official data | gluten-sensitive |
| `kids-alfredo-pasta` | Kids Alfredo Pasta | 1 | 0 | 0 |  | Yes | C: no single official row | kids-meal |
| `kids-pizza` | Kids Pizza | 1 | 1 | 1 |  | Yes | A: data-ready | kids-meal |
| `kids-chicken-fingers` | Kids Chicken Fingers | 1 | 1 | 1 |  | Yes | A: data-ready | kids-meal |
| `kids-macaroni-and-cheese` | Kids Macaroni & Cheese | 1 | 1 | 1 |  | Yes | A: data-ready | kids-meal |
| `kids-meat-sauce-pasta` | Kids Meat Sauce Pasta | 1 | 0 | 0 |  | Yes | C: no single official row | kids-meal |
| `kids-tomato-sauce-pasta` | Kids Tomato Sauce Pasta | 1 | 0 | 0 |  | Yes | C: no single official row | kids-meal |
| `kids-five-cheese-marinara-pasta` | Kids Five Cheese Marinara Pasta | 1 | 0 | 0 |  | Yes | C: no single official row | kids-meal |
| `kids-cheese-ravioli` | Kids Cheese Ravioli | 1 | 1 | 1 |  | Yes | A: data-ready | kids-meal |
| `kids-grilled-chicken-with-rotini-pasta-and-marinara` | Kids Grilled Chicken with Rotini Pasta & Marinara | 1 | 1 | 0 |  | Yes | B: partial official data | kids-meal |
| `kids-rotini-with-marinara` | Kids Rotini with Marinara | 1 | 1 | 0 |  | Yes | B: partial official data | kids-meal |
| `kids-rotini-with-meat-sauce` | Kids Rotini with Meat Sauce | 1 | 1 | 0 |  | Yes | B: partial official data | kids-meal |
| `cheese-ravioli-with-marinara-or-meat-sauce` | Cheese Ravioli with Marinara or Meat Sauce | 1 | 0 | 0 |  | Yes | C: no single official row | catering |
| `chicken-parmigiana-combination` | Chicken Parmigiana Combination | 1 | 0 | 0 |  | Yes | C: no single official row | catering |
| `lasagna-combination` | Lasagna Combination | 1 | 0 | 0 |  | Yes | C: no single official row | catering |
| `create-your-own-pasta-station` | Create Your Own Pasta Station | 1 | 1 | 0 |  | Yes | B: partial official data | catering |
| `toasted-beef-ravioli` | Toasted Beef Ravioli | 1 | 1 | 0 |  | Yes | B: partial official data | catering |
| `alfredo-dipping-sauce` | Alfredo Dipping Sauce | 1 | 1 | 0 |  | Yes | B: partial official data | catering |
| `five-cheese-marinara-dipping-sauce` | Five Cheese Marinara Dipping Sauce | 1 | 1 | 0 |  | Yes | B: partial official data | catering |
| `marinara-dipping-sauce` | Marinara Dipping Sauce | 1 | 1 | 0 |  | Yes | B: partial official data | catering |
| `meat-dipping-sauce` | Meat Dipping Sauce | 1 | 1 | 0 |  | Yes | B: partial official data | catering |
| `grilled-chicken-breasts` | Grilled Chicken Breasts | 1 | 1 | 0 |  | Yes | B: partial official data | catering |
| `chicken-fingers` | Chicken Fingers | 1 | 1 | 0 |  | Yes | B: partial official data | catering |
| `italian-meatballs` | Italian Meatballs | 1 | 1 | 0 |  | Yes | B: partial official data | catering |
| `broccoli` | Broccoli | 1 | 1 | 0 |  | Yes | B: partial official data | catering |
| `sicilian-cheesecake` | Sicilian Cheesecake | 1 | 1 | 0 |  | Yes | B: partial official data | catering |
| `san-pellegrino-sparkling-1-liter-bottle` | San Pellegrino Sparkling (1-Liter Bottle) | 1 | 0 | 0 |  | Yes | C: no single official row | catering |
| `acqua-panna-spring-1-liter-bottle` | Acqua Panna Spring (1-Liter Bottle) | 1 | 0 | 0 |  | Yes | C: no single official row | catering |
| `family-style-chicken-alfredo-bundle` | Family-Style Chicken Alfredo Bundle | 1 | 0 | 0 |  | Yes | C: no single official row | family-style-meals |
| `family-style-chicken-parmigiana-bundle` | Family-Style Chicken Parmigiana Bundle | 1 | 0 | 0 |  | Yes | C: no single official row | family-style-meals |
| `family-style-five-cheese-ziti-al-forno-bundle` | Family-Style Five Cheese Ziti al Forno Bundle | 1 | 0 | 0 |  | Yes | C: no single official row | family-style-meals |
| `spicy-alfredo-fettuccine` | Spicy Alfredo Fettuccine | 3 | 3 | 3 |  | Yes | A: data-ready (limited time) | classic-entrees, lighter-portions, lunch-menu |
| `chicken-parmigiana-sandwich` | Chicken Parmigiana Sandwich | 1 | 0 | 0 |  | Yes | V: official rows per version | lunch-menu |
| `eggplant-parmigiana-sandwich` | Eggplant Parmigiana Sandwich | 1 | 1 | 1 |  | Yes | A: data-ready | lunch-menu |
| `italian-grilled-chicken-sandwich` | Italian Grilled Chicken Sandwich | 1 | 1 | 1 |  | Yes | A: data-ready | lunch-menu |
| `chicken-alfredo-flatbread` | Chicken Alfredo Flatbread | 1 | 1 | 1 |  | Yes | A: data-ready | lunch-menu |
| `five-cheese-flatbread` | Five Cheese Flatbread | 1 | 1 | 1 |  | Yes | A: data-ready | lunch-menu |
| `classic-pepperoni-flatbread` | Classic Pepperoni Flatbread | 1 | 1 | 1 |  | Yes | A: data-ready | lunch-menu |
| `pumpkin-cookie-butter-cheesecake` | Pumpkin Cookie Butter Cheesecake | 2 | 2 | 1 |  | Yes | A: data-ready (limited time) | desserts, catering |
| `side-of-crispy-shrimp-fritta` | Side of Crispy Shrimp Fritta | 1 | 0 | 1 | 1 | Yes | B: partial official data | sides-sauces-and-extras |
| `side-of-crispy-chicken-fritta` | Side of Crispy Chicken Fritta | 1 | 1 | 1 |  | Yes | A: data-ready | sides-sauces-and-extras |
| `italian-sausage` | Italian Sausage | 2 | 2 | 1 |  | Yes | A: data-ready | sides-sauces-and-extras, catering |
| `half-iced-tea-and-half-lemonade` | Half Iced Tea + Half Lemonade | 2 | 2 | 0 |  | Yes | B: partial official data | drink-menu, non-alcoholic-beverages |
| `heineken-0-0-non-alcoholic` | Heineken 0.0 Non-Alcoholic | 1 | 0 | 0 |  | Yes | C: no single official row | wine-and-beer-to-go |
