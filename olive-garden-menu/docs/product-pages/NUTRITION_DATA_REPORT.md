# Nutrition Data Report

**Source:** Olive Garden *Nutrition Information (U.S. Restaurants, excludes
Hawaii)*, footer code **US_101926**, 25 pages (PDF created 2026-09-11),
supplied by the owner on 2026-11-15 (`research/official-sources/`, git-ignored).
**Entered:** 303 rows → `content/menu/nutrition/nutrition-guide.ts`
(each row keeps its page, section and printed label). Mapping →
`content/menu/nutrition/offering-map.ts`. Checks → `lib/nutrition-data.ts`.

## Method

1. Text and word positions extracted with PyMuPDF (research tool in
   `research/nutrition-extraction/`, not a project dependency); values assigned
   to columns by the x-position of the printed header.
2. Rows that continue across a page break are joined; "add ..." rows are
   linked to the item above them (`addOnFor`).
3. Visual checks against rendered pages: nutrition p. 2 (incl. Fried
   Mozzarella), allergen pp. 2, 4, 9, 11. Every page yields 12-13 rows (full table).
4. Values: number as printed; `{ lessThan: n }` for "less than n g/mg"; `null`
   only when the cell is empty (none in this PDF). Zero stays 0.
5. Each offering matched by name + section + calories, then reviewed.

## Offering statuses (231 offerings)

| Status | Offerings |
|---|---:|
| exact | 124 |
| variants | 25 |
| generic | 20 |
| composite | 18 |
| same-item | 15 |
| multi-row | 11 |
| not-applicable | 9 |
| not-in-guide | 8 |
| conflict | 1 |

Meaning: see `NutritionMapping` in `lib/types.ts`. Only "exact" and
"same-item" rows are shown as an item's official nutrition.

## Calorie conflicts (owner decision needed; data NOT changed)

| Offering | Our data | Guide | Row | Note |
|---|---:|---:|---|---|
| `sides-sauces-and-extras--side-of-crispy-shrimp-fritta` | 200 | 220 | p. 5 "Crispy Shrimp Fritta" | Guide: 220, but only as a Create Your Own Pasta topping row (no piece count). Ordering pages: side 200 (no piece count), pasta topping 350 for 16 pieces. Owner decision 2026-11-18 (final): keep 200, because the serving size of the guide row could not be confirmed. Not shown as official nutrition. |

**Fried Mozzarella: no conflict.** Our 800 = guide row "Fried Mozzarella",
p. 2, APPETIZERS (one order, as served, without the marinara, which is the
separate "add marinara" row of 35). The catering tray (3,450) = p. 24
"Fried Mozzarella" under CATERING PANS (SERVES 4 - 6).

## Every non-exact offering

| Offering | Status | Row(s) | Note |
|---|---|---|---|
| `family-style-meals--family-style-lasagna-bundle` | composite | — | Bundle/combination: the guide lists its parts, not the bundle. |
| `family-style-meals--family-style-lasagna-bundle--large` | composite | — | Bundle/combination: the guide lists its parts, not the bundle. |
| `family-style-meals--famous-house-salad` | same-item | p21 "Jumbo Famous House Salad (Serves 6)" (1650) |  |
| `family-style-meals--chicken-alfredo` | variants | p23 "Grilled Chicken Alfredo" (6050); p23 "Grilled Chicken Alfredo with Broccoli" (6660) | Default version shown; other versions (sauce, protein, size) have their own rows. |
| `family-style-meals--fettuccine-alfredo` | variants | p22 "Fettuccine Alfredo" (5010); p22 "Fettuccine Alfredo with Broccoli" (5620) | Default version shown; other versions (sauce, protein, size) have their own rows. |
| `family-style-meals--spaghetti-with-meat-sauce` | variants | p23 "Spaghetti with Meat Sauce" (2840); p23 "Spaghetti with Meat Sauce & Italian Sausage" (4830); p23 "Spaghetti with Meat Sauce & Meatballs" (4550) | Default version shown; other versions (sauce, protein, size) have their own rows. |
| `family-style-meals--spaghetti-with-marinara-sauce` | variants | p23 "Spaghetti with Marinara Sauce" (2270); p23 "Spaghetti with Marinara & Italian Sausage" (4260); p23 "Spaghetti with Marinara Sauce & Meatballs" (3980) | Default version shown; other versions (sauce, protein, size) have their own rows. |
| `family-style-meals--cheese-ravioli-with-meat-or-marinara-sauce` | variants | p22 "Cheese Ravioli with Marinara" (2990); p22 "Cheese Ravioli with Meat sauce" (3510) | Default version shown; other versions (sauce, protein, size) have their own rows. |
| `family-style-meals--homemade-soups--large` | multi-row | — | Several soups; each soup has its own row. |
| `family-style-meals--homemade-soups` | multi-row | — | Several soups; each soup has its own row. |
| `family-style-meals--breadsticks` | same-item | p3 "Breadstick with garlic topping (1 ea.)" (140) | Per breadstick (with garlic topping). |
| `family-style-meals--large-salad` | not-applicable | — | No calories in our data (promotion entry, merchandise, or unpriced placement). |
| `family-style-meals--family-style-chicken-alfredo-bundle` | composite | — | Bundle/combination: the guide lists its parts, not the bundle. |
| `family-style-meals--family-style-chicken-parmigiana-bundle` | composite | — | Bundle/combination: the guide lists its parts, not the bundle. |
| `family-style-meals--family-style-five-cheese-ziti-al-forno-bundle` | composite | — | Bundle/combination: the guide lists its parts, not the bundle. |
| `appetizers--breadsticks` | same-item | p3 "Breadstick with garlic topping (1 ea.)" (140) | Per breadstick (with garlic topping); orders of 6 or 12 are multiples. |
| `appetizers--dipping-sauces-with-breadsticks` | composite | — | Breadsticks + chosen sauce (calculated on the site). |
| `classic-entrees--family-style-lasagna-bundle` | composite | — | Bundle/combination: the guide lists its parts, not the bundle. |
| `classic-entrees--chicken-alfredo` | variants | p8 "Chicken Alfredo (with grilled chicken)" (1480); p8 "Chicken Alfredo (with crispy chicken fritta)" (1710) | Default version shown; other versions (sauce, protein, size) have their own rows. |
| `classic-entrees--chicken-tortelloni-alfredo` | variants | p9 "Chicken Tortelloni Alfredo" (1980) | Default version shown; other versions (sauce, protein, size) have their own rows. |
| `classic-entrees--chicken-and-shrimp-carbonara` | variants | p8 "Chicken & Shrimp Carbonara" (1370) | Default version shown; other versions (sauce, protein, size) have their own rows. |
| `classic-entrees--calabrian-steak-and-shrimp-bucatini` | variants | p8 "Calabrian Shrimp Bucatini" (1040); p8 "Calabrian Steak & Shrimp Bucatini" (1220); p8 "Calabrian Steak Bucatini" (1130) | Default version shown; other versions (sauce, protein, size) have their own rows. |
| `classic-entrees--spaghetti-and-meatballs` | variants | p10 "Spaghetti with Meat Sauce & Meatballs (3)" (1120) | The guide lists the meat-sauce version (1,120); the marinara version (970 in our data) has no row of its own in the dinner section. |
| `classic-entrees--cheese-ravioli` | variants | p8 "Cheese Ravioli with Marinara Sauce" (750); p8 "Cheese Ravioli with Meat Sauce" (860) | Default version shown; other versions (sauce, protein, size) have their own rows. |
| `classic-entrees--create-your-own-pasta` | composite | — | Built from pasta, sauce and topping rows (Create Your Own Pasta section). |
| `buy-one-take-one--chicken-parmigiana` | not-applicable | — | No calories in our data (promotion entry, merchandise, or unpriced placement). |
| `buy-one-take-one--fettuccine-alfredo` | not-applicable | — | No calories in our data (promotion entry, merchandise, or unpriced placement). |
| `buy-one-take-one--five-cheese-ziti-al-forno` | not-applicable | — | No calories in our data (promotion entry, merchandise, or unpriced placement). |
| `buy-one-take-one--spaghetti-with-meat-sauce` | not-applicable | — | No calories in our data (promotion entry, merchandise, or unpriced placement). |
| `buy-one-take-one--lasagna-classico` | not-applicable | — | No calories in our data (promotion entry, merchandise, or unpriced placement). |
| `buy-one-take-one--rigatoni-alla-vodka` | not-applicable | — | No calories in our data (promotion entry, merchandise, or unpriced placement). |
| `buy-one-take-one--four-cheese-manicotti-with-marinara` | not-applicable | — | No calories in our data (promotion entry, merchandise, or unpriced placement). |
| `amazing-alfredos--chicken-alfredo` | variants | p8 "Chicken Alfredo (with grilled chicken)" (1480); p8 "Chicken Alfredo (with crispy chicken fritta)" (1710) | Default version shown; other versions (sauce, protein, size) have their own rows. |
| `amazing-alfredos--chicken-tortelloni-alfredo` | variants | p9 "Chicken Tortelloni Alfredo" (1980) | Default version shown; other versions (sauce, protein, size) have their own rows. |
| `soups-salad-and-breadsticks--homemade-soups` | multi-row | — | Several soups; each soup has its own row. |
| `soups-salad-and-breadsticks--breadsticks` | same-item | p3 "Breadstick with garlic topping (1 ea.)" (140) | Per breadstick (with garlic topping). |
| `soups-salad-and-breadsticks--dipping-sauces-with-breadsticks` | composite | — | Breadsticks + chosen sauce (calculated on the site). |
| `soups-salad-and-breadsticks--weekday-lunch-special` | composite | — | Soup + salad + breadstick; the guide lists the parts. |
| `soups-salad-and-breadsticks--soup-salad-and-breadsticks` | composite | — | Soup + salad + breadstick; the guide lists the parts. |
| `lighter-portions--spaghetti-and-meatballs` | variants | p11 "Spaghetti & Meatballs with Meat Sauce" (800) | The lighter-portions section lists the meat-sauce version (800); the marinara version (690) is listed only under Lunch. |
| `lighter-portions--cheese-ravioli` | variants | p10 "Cheese Ravioli with Marinara Sauce" (440); p10 "Cheese Ravioli with Meat Sauce" (500) | Default version shown; other versions (sauce, protein, size) have their own rows. |
| `lunch-menu--spaghetti-and-meatballs` | variants | p7 "Spaghetti & Meatballs with Marinara" (690); p7 "Spaghetti & Meatballs with Meat Sauce" (800) | Default version shown; other versions (sauce, protein, size) have their own rows. |
| `lunch-menu--cheese-ravioli` | variants | p6 "Cheese Ravioli with Marinara Sauce" (440); p6 "Cheese Ravioli with Meat Sauce" (500) | Default version shown; other versions (sauce, protein, size) have their own rows. |
| `lunch-menu--spaghetti` | variants | p7 "Spaghetti with Marinara" (370); p7 "Spaghetti with Meat Sauce" (480) | Default version shown; other versions (sauce, protein, size) have their own rows. |
| `lunch-menu--soup-salad-and-breadsticks-lunch` | composite | — | Soup + salad + breadstick; the guide lists the parts. |
| `lunch-menu--chicken-parmigiana-sandwich` | variants | p7 "Grilled Chicken Parmigiana Sandwich (with fries)" (840); p7 "Chicken Parmigiana Sandwich (with fries)" (960) | Default version shown; other versions (sauce, protein, size) have their own rows. |
| `drink-menu--gallon-iced-teas-and-raspberry-lemonade` | multi-row | — | Several flavors; the guide lists most gallon flavors separately (sweet tea gallon not listed). |
| `drink-menu--2-liter-soda` | multi-row | — | Several flavors (Coke 790, Diet Coke 0, Sprite 790 on page 25). |
| `drink-menu--to-go-fountain-drinks` | not-in-guide | — | No matching row in the U.S. nutrition guide. |
| `drink-menu--fresh-brewed-sweet-iced-tea` | not-in-guide | — | No matching row in the U.S. nutrition guide. |
| `drink-menu--fresh-brewed-unsweet-iced-tea` | not-in-guide | — | No matching row in the U.S. nutrition guide. |
| `sides-sauces-and-extras--cheese-grater` | not-applicable | — | No calories in our data (promotion entry, merchandise, or unpriced placement). |
| `sides-sauces-and-extras--side-of-alfredo-sauce--large` | same-item | p24 "Alfredo, one pint" (1750) | Large side sauce = one pint (official PDF row). |
| `sides-sauces-and-extras--side-of-marinara-sauce--large` | same-item | p24 "Marinara, one pint" (290) | Large side sauce = one pint (official PDF row). |
| `sides-sauces-and-extras--side-of-meat-sauce--large` | same-item | p24 "Meat sauce, one pint" (600) | Large side sauce = one pint (official PDF row). |
| `sides-sauces-and-extras--side-of-crispy-shrimp-fritta` | conflict | p5 "Crispy Shrimp Fritta" (220) | Guide: 220, but only as a Create Your Own Pasta topping row (no piece count). Ordering pages: side 200 (no piece count), pasta topping 350 for 16 pieces. Owner decision 2026-11-18 (final): keep 200, because the serving size of the guide row could not be confirmed. Not shown as official nutrition. |
| `sides-sauces-and-extras--side-of-crispy-chicken-fritta` | same-item | p5 "Crispy Chicken Fritta" (240) | Create Your Own Pasta topping row; same 240 calories. |
| `non-alcoholic-beverages--gallon-iced-teas-and-raspberry-lemonade` | multi-row | — | Several flavors; see the gallon rows on page 25. |
| `non-alcoholic-beverages--2-liter-soda` | multi-row | — | Several flavors (page 25). |
| `non-alcoholic-beverages--to-go-fountain-drinks` | not-in-guide | — | No matching row in the U.S. nutrition guide. |
| `non-alcoholic-beverages--fresh-brewed-sweet-iced-tea` | not-in-guide | — | No matching row in the U.S. nutrition guide. |
| `non-alcoholic-beverages--fresh-brewed-unsweet-iced-tea` | not-in-guide | — | No matching row in the U.S. nutrition guide. |
| `wine-and-beer-to-go--moscato-primo-amore` | generic | — | The guide gives only generic wine/beer rows (e.g. white/rosé bottle 630, red bottle 660, light bottle 100, regular bottle 150), not brand rows. |
| `wine-and-beer-to-go--sweet-pink-moscato-blend-confetti` | generic | — | The guide gives only generic wine/beer rows (e.g. white/rosé bottle 630, red bottle 660, light bottle 100, regular bottle 150), not brand rows. |
| `wine-and-beer-to-go--sweet-red-roscato-rosso-dolce` | generic | — | The guide gives only generic wine/beer rows (e.g. white/rosé bottle 630, red bottle 660, light bottle 100, regular bottle 150), not brand rows. |
| `wine-and-beer-to-go--red-blend-porta-vita` | generic | — | The guide gives only generic wine/beer rows (e.g. white/rosé bottle 630, red bottle 660, light bottle 100, regular bottle 150), not brand rows. |
| `wine-and-beer-to-go--moscato-castello-del-poggio` | generic | — | The guide gives only generic wine/beer rows (e.g. white/rosé bottle 630, red bottle 660, light bottle 100, regular bottle 150), not brand rows. |
| `wine-and-beer-to-go--white-zinfandel-sutter-home` | generic | — | The guide gives only generic wine/beer rows (e.g. white/rosé bottle 630, red bottle 660, light bottle 100, regular bottle 150), not brand rows. |
| `wine-and-beer-to-go--riesling-chateau-ste-michelle` | generic | — | The guide gives only generic wine/beer rows (e.g. white/rosé bottle 630, red bottle 660, light bottle 100, regular bottle 150), not brand rows. |
| `wine-and-beer-to-go--pinot-grigio-cavit` | generic | — | The guide gives only generic wine/beer rows (e.g. white/rosé bottle 630, red bottle 660, light bottle 100, regular bottle 150), not brand rows. |
| `wine-and-beer-to-go--sauvignon-blanc-starborough` | generic | — | The guide gives only generic wine/beer rows (e.g. white/rosé bottle 630, red bottle 660, light bottle 100, regular bottle 150), not brand rows. |
| `wine-and-beer-to-go--chardonnay-chateau-ste-michelle` | generic | — | The guide gives only generic wine/beer rows (e.g. white/rosé bottle 630, red bottle 660, light bottle 100, regular bottle 150), not brand rows. |
| `wine-and-beer-to-go--pinot-noir-meiomi` | generic | — | The guide gives only generic wine/beer rows (e.g. white/rosé bottle 630, red bottle 660, light bottle 100, regular bottle 150), not brand rows. |
| `wine-and-beer-to-go--merlot-beringer` | generic | — | The guide gives only generic wine/beer rows (e.g. white/rosé bottle 630, red bottle 660, light bottle 100, regular bottle 150), not brand rows. |
| `wine-and-beer-to-go--chianti-classico-rocca-delle-macie` | generic | — | The guide gives only generic wine/beer rows (e.g. white/rosé bottle 630, red bottle 660, light bottle 100, regular bottle 150), not brand rows. |
| `wine-and-beer-to-go--cabernet-robert-mondavi-private-selection` | generic | — | The guide gives only generic wine/beer rows (e.g. white/rosé bottle 630, red bottle 660, light bottle 100, regular bottle 150), not brand rows. |
| `wine-and-beer-to-go--budweiser` | generic | — | The guide gives only generic wine/beer rows (e.g. white/rosé bottle 630, red bottle 660, light bottle 100, regular bottle 150), not brand rows. |
| `wine-and-beer-to-go--bud-light` | generic | — | The guide gives only generic wine/beer rows (e.g. white/rosé bottle 630, red bottle 660, light bottle 100, regular bottle 150), not brand rows. |
| `wine-and-beer-to-go--coors-light` | generic | — | The guide gives only generic wine/beer rows (e.g. white/rosé bottle 630, red bottle 660, light bottle 100, regular bottle 150), not brand rows. |
| `wine-and-beer-to-go--michelob-ultra` | generic | — | The guide gives only generic wine/beer rows (e.g. white/rosé bottle 630, red bottle 660, light bottle 100, regular bottle 150), not brand rows. |
| `wine-and-beer-to-go--miller-lite` | generic | — | The guide gives only generic wine/beer rows (e.g. white/rosé bottle 630, red bottle 660, light bottle 100, regular bottle 150), not brand rows. |
| `wine-and-beer-to-go--heineken-0-0-non-alcoholic` | generic | p18 "Beer - Bottle, Non-Alcoholic" (70) | The guide lists only a generic non-alcoholic bottled beer row. |
| `gluten-sensitive--zuppa-toscana` | same-item | p15 "Zuppa Toscana Soup" (220) |  |
| `kids-meal--kids-alfredo-pasta` | composite | — | Kids pasta + sauce; the guide lists pasta and sauce rows separately. |
| `kids-meal--kids-meat-sauce-pasta` | composite | — | Kids pasta + sauce; the guide lists pasta and sauce rows separately. |
| `kids-meal--kids-tomato-sauce-pasta` | composite | — | Kids pasta + sauce; the guide lists pasta and sauce rows separately. |
| `kids-meal--kids-five-cheese-marinara-pasta` | composite | — | Kids pasta + sauce; the guide lists pasta and sauce rows separately. |
| `catering--chicken-alfredo` | variants | p23 "Grilled Chicken Alfredo" (6050); p23 "Grilled Chicken Alfredo with Broccoli" (6660) | Default version shown; other versions (sauce, protein, size) have their own rows. |
| `catering--fettuccine-alfredo` | variants | p22 "Fettuccine Alfredo" (5010); p22 "Fettuccine Alfredo with Broccoli" (5620) | Default version shown; other versions (sauce, protein, size) have their own rows. |
| `catering--spaghetti-with-meat-sauce` | variants | p23 "Spaghetti with Meat Sauce" (2840); p23 "Spaghetti with Meat Sauce & Italian Sausage" (4830); p23 "Spaghetti with Meat Sauce & Meatballs" (4550) | Default version shown; other versions (sauce, protein, size) have their own rows. |
| `catering--spaghetti-with-marinara-sauce` | variants | p23 "Spaghetti with Marinara Sauce" (2270); p23 "Spaghetti with Marinara & Italian Sausage" (4260); p23 "Spaghetti with Marinara Sauce & Meatballs" (3980) | Default version shown; other versions (sauce, protein, size) have their own rows. |
| `catering--lasagna-classico` | variants | p23 "Lasagna Classico (Serves up to 6)" (3420); p23 "Lasagna Classico (Serves up to 12)" (6470) | Default version shown; other versions (sauce, protein, size) have their own rows. |
| `catering--cheese-ravioli-with-marinara-or-meat-sauce` | variants | p22 "Cheese Ravioli with Marinara" (2990); p22 "Cheese Ravioli with Meat sauce" (3510) | Default version shown; other versions (sauce, protein, size) have their own rows. |
| `catering--homemade-soups--large` | multi-row | — | Several soups; each soup has its own row. |
| `catering--homemade-soups` | multi-row | — | Several soups; each soup has its own row. |
| `catering--breadsticks` | same-item | p3 "Breadstick with garlic topping (1 ea.)" (140) | Per breadstick (with garlic topping). |
| `catering--black-tie-mousse-cake` | same-item | p12 "Black Tie Mousse Cake" (750) | Per slice (the dessert-menu row). |
| `catering--tiramisu` | same-item | p12 "Tiramisu" (470) | Per slice (the dessert-menu row). |
| `catering--2-liter-soda` | multi-row | — | Several flavors (page 25). |
| `catering--chicken-parmigiana-combination` | composite | — | Bundle/combination: the guide lists its parts, not the bundle. |
| `catering--lasagna-combination` | composite | — | Bundle/combination: the guide lists its parts, not the bundle. |
| `catering--broccoli` | same-item | p24 "Parmesan Garlic Broccoli" (610) |  |
| `catering--sicilian-cheesecake` | same-item | p12 "Sicilian Cheesecake with Strawberry Topping" (730) | Per slice (the dessert-menu row). Owner decision 2026-11-18: official 730 replaces the 700 from the catering ordering card. |
| `catering--gallon-iced-teas-and-raspberry-lemonade` | multi-row | — | Several flavors; see the gallon rows on page 25. |
| `catering--san-pellegrino-sparkling-1-liter-bottle` | not-in-guide | — | No matching row in the U.S. nutrition guide. |
| `catering--acqua-panna-spring-1-liter-bottle` | not-in-guide | — | No matching row in the U.S. nutrition guide. |
| `catering--pumpkin-cookie-butter-cheesecake` | same-item | p12 "Pumpkin Cookie Butter Cheesecake" (620) | Per slice (the dessert-menu row). |

## Known limits

- The guide's catering "add marinara" (110) follows Toasted Ravioli on p. 24;
  it is linked to that row only (the guide does not repeat it for Fried Mozzarella).
- Wines/beers: the guide gives generic rows only; brand offerings stay "generic".
- Items not in the guide (fountain drinks, fresh-brewed sweet/unsweet iced tea,
  bottled waters, kids five cheese marinara sauce, bundles) keep their existing
  menu-page calories; no official breakdown exists.
