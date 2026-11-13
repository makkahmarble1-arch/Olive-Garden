# Menu Inventory Audit

**Date:** 2026-11-12 (updated after owner Decisions 1-4)
**Source of scope:** `docs/MENU_INVENTORY.md` (owner-approved), as imported in `content/menu/` (offerings, products, aliases).
**Purpose:** account for every approved inventory entry before research, and show shared products and portion-based offerings. Nothing is removed or merged.

## 1. Totals

| Measure | Count |
|---|---:|
| Categories | 17 |
| Owner inventory entries | 210 |
| New official items added (Decision 3, 2026-11-12) | 21 |
| **Total offerings** | **231** |
| Canonical products | 146 |
| Products used in 2+ categories | 43 |
| Alias cases | 17 (A1-A17), all decided in `ALIAS_MAPPING.md`; none merged |
| Create Your Own Pasta option records | 23 (owner Decision 2; not counted as offerings) |

Category 8 (Create Your Own Pasta) has **0 inventory entries**. Its 23
customization options (5 pastas, 5 sauce choices, 7 paid toppings, 6 included
first-course choices) are structured records in `menu-research.json`
(`customization.createYourOwnPasta`); the dish itself is
`classic-entrees--create-your-own-pasta`.

## 2. Entries per category

| # | Category | Slug | Entries | Default portion type |
|---:|---|---|---:|---|
| 1 | Family-Style Meals | `/family-style-meals` | 23 | family-style |
| 2 | Appetizers | `/appetizers` | 10 | regular |
| 3 | Classic Entrees | `/classic-entrees` | 28 | regular |
| 4 | Buy One Take One | `/buy-one-take-one` | 7 | promotion |
| 5 | Amazing Alfredos | `/amazing-alfredos` | 5 | regular |
| 6 | Soups, Salad and Breadsticks | `/soups-salad-and-breadsticks` | 6 | regular |
| 7 | Lighter Portions | `/lighter-portions` | 8 | lighter-portion |
| 8 | Create Your Own Pasta | `/create-your-own-pasta` | 0 | regular |
| 9 | Lunch Menu | `/lunch-menu` | 17 | lunch |
| 10 | Desserts | `/desserts` | 7 | regular |
| 11 | Drink Menu | `/drink-menu` | 13 | regular |
| 12 | Sides, Sauces and Extras | `/sides-sauces-and-extras` | 12 | side |
| 13 | Non-Alcoholic Beverages | `/non-alcoholic-beverages` | 14 | regular |
| 14 | Wine & Beer To Go | `/wine-and-beer-to-go` | 20 | to-go |
| 15 | Gluten Sensitive | `/gluten-sensitive` | 10 | regular |
| 16 | Kids Meal | `/kids-meal` | 11 | kids |
| 17 | Catering | `/catering` | 40 | catering |
| | **Total** | | **231** | |

## 3. Every entry

Status before this research round: Appetizers verified (2026-11-11); all others `needs-verification`. "Alias" lists unresolved alias cases (`content/menu/aliases.ts`).

### 1. Family-Style Meals (23)

| # | Offering ID | Inventory name | Product ID | Portion | Also in | Alias |
|---:|---|---|---|---|---|---|
| 1 | `family-style-meals--family-style-lasagna-bundle` | Family-style lasagna Bundle | `family-style-lasagna-bundle` | family-style | classic-entrees | — |
| 2 | `family-style-meals--family-style-lasagna-bundle--large` | Large Family-style lasagna Bundle | `family-style-lasagna-bundle` | family-style | classic-entrees | — |
| 3 | `family-style-meals--famous-house-salad` | Our famous Jumbo house salad | `famous-house-salad` | family-style | soups-salad-and-breadsticks, catering | A4, A5 |
| 4 | `family-style-meals--chicken-alfredo` | Chicken Alfredo | `chicken-alfredo` | family-style | classic-entrees, amazing-alfredos, catering | — |
| 5 | `family-style-meals--chicken-parmigiana` | Chicken Parmigiana | `chicken-parmigiana` | family-style | classic-entrees, buy-one-take-one, lighter-portions, lunch-menu, catering | — |
| 6 | `family-style-meals--fettuccine-alfredo` | Fettuccine Alfredo | `fettuccine-alfredo` | family-style | classic-entrees, buy-one-take-one, amazing-alfredos, lighter-portions, lunch-menu, catering | — |
| 7 | `family-style-meals--shrimp-alfredo` | Shrimp Alfredo | `shrimp-alfredo` | family-style | classic-entrees, amazing-alfredos, catering | — |
| 8 | `family-style-meals--five-cheese-ziti-al-forno` | Five Cheese Ziti Al forno | `five-cheese-ziti-al-forno` | family-style | classic-entrees, buy-one-take-one, lighter-portions, lunch-menu, catering | — |
| 9 | `family-style-meals--spaghetti-with-meat-sauce` | Spaghetti With meat sauce | `spaghetti-with-meat-sauce` | family-style | classic-entrees, buy-one-take-one, catering | — |
| 10 | `family-style-meals--spaghetti-with-marinara-sauce` | Spaghetti with marinara sauce | `spaghetti-with-marinara-sauce` | family-style | catering | A9 |
| 11 | `family-style-meals--chicken-tortelloni-alfredo` | Chicken Tortelloni alfredo | `chicken-tortelloni-alfredo` | family-style | classic-entrees, amazing-alfredos, catering | — |
| 12 | `family-style-meals--lasagna-classico` | Lasagna Classico | `lasagna-classico` | family-style | classic-entrees, buy-one-take-one, lighter-portions, lunch-menu, catering | — |
| 13 | `family-style-meals--chicken-scampi` | Chicken Scampi | `chicken-scampi` | family-style | classic-entrees, catering | — |
| 14 | `family-style-meals--chicken-and-shrimp-carbonara` | Chicken and shrimp carbonara | `chicken-and-shrimp-carbonara` | family-style | classic-entrees, catering | — |
| 15 | `family-style-meals--shrimp-scampi` | Shrimp Scampi | `shrimp-scampi` | family-style | classic-entrees, lunch-menu, catering | — |
| 16 | `family-style-meals--cheese-ravioli-with-meat-or-marinara-sauce` | Cheese Ravioli with meat or marinara sauce | `cheese-ravioli-with-meat-or-marinara-sauce` | family-style | — | A8 |
| 17 | `family-style-meals--homemade-soups--large` | Homemade soups large | `homemade-soups` | family-style | soups-salad-and-breadsticks, catering | — |
| 18 | `family-style-meals--homemade-soups` | Homemade Soups | `homemade-soups` | family-style | soups-salad-and-breadsticks, catering | A17 |
| 19 | `family-style-meals--breadsticks` | Breadsticks | `breadsticks` | family-style | appetizers, soups-salad-and-breadsticks, catering | — |
| 20 | `family-style-meals--large-salad` | Large Salad | `large-salad` | family-style | — | A4 |
| 21 | `family-style-meals--family-style-chicken-alfredo-bundle` | _(new official item, Decision 3)_ | `family-style-chicken-alfredo-bundle` | family-style | — | — |
| 22 | `family-style-meals--family-style-chicken-parmigiana-bundle` | _(new official item, Decision 3)_ | `family-style-chicken-parmigiana-bundle` | family-style | — | — |
| 23 | `family-style-meals--family-style-five-cheese-ziti-al-forno-bundle` | _(new official item, Decision 3)_ | `family-style-five-cheese-ziti-al-forno-bundle` | family-style | — | — |

### 2. Appetizers (10)

| # | Offering ID | Inventory name | Product ID | Portion | Also in | Alias |
|---:|---|---|---|---|---|---|
| 1 | `appetizers--breadsticks` | Breadsticks | `breadsticks` | regular | family-style-meals, soups-salad-and-breadsticks, catering | — |
| 2 | `appetizers--fried-mozzarella` | Fried Mozzarella | `fried-mozzarella` | regular | catering | — |
| 3 | `appetizers--stuffed-ziti-fritta` | Stuffed Ziti Fritta | `stuffed-ziti-fritta` | regular | — | — |
| 4 | `appetizers--dipping-sauces-with-breadsticks` | Dipping Sauces with breadsticks | `dipping-sauces-with-breadsticks` | regular | soups-salad-and-breadsticks | — |
| 5 | `appetizers--calamari` | Calamari | `calamari` | regular | — | — |
| 6 | `appetizers--meatballs-parmigiana` | Meatballs Parmigiana | `meatballs-parmigiana` | regular | — | A11 |
| 7 | `appetizers--spinach-artichoke-dip` | Spinach-Artichoke Dip | `spinach-artichoke-dip` | regular | catering | — |
| 8 | `appetizers--lasagna-fritta` | Lasagna Fritta | `lasagna-fritta` | regular | — | — |
| 9 | `appetizers--shrimp-fritto-misto` | Shrimp Fritto Misto | `shrimp-fritto-misto` | regular | — | — |
| 10 | `appetizers--toasted-ravioli` | Toasted Ravioli | `toasted-ravioli` | regular | — | A6 |

### 3. Classic Entrees (28)

| # | Offering ID | Inventory name | Product ID | Portion | Also in | Alias |
|---:|---|---|---|---|---|---|
| 1 | `classic-entrees--family-style-lasagna-bundle` | Family-style lasagna Bundle | `family-style-lasagna-bundle` | regular | family-style-meals | — |
| 2 | `classic-entrees--chicken-alfredo` | Chicken Alfredo | `chicken-alfredo` | regular | family-style-meals, amazing-alfredos, catering | — |
| 3 | `classic-entrees--chicken-parmigiana` | Chicken Parmigiana | `chicken-parmigiana` | regular | family-style-meals, buy-one-take-one, lighter-portions, lunch-menu, catering | — |
| 4 | `classic-entrees--fettuccine-alfredo` | Fettuccine Alfredo | `fettuccine-alfredo` | regular | family-style-meals, buy-one-take-one, amazing-alfredos, lighter-portions, lunch-menu, catering | — |
| 5 | `classic-entrees--shrimp-alfredo` | Shrimp Alfredo | `shrimp-alfredo` | regular | family-style-meals, amazing-alfredos, catering | — |
| 6 | `classic-entrees--five-cheese-ziti-al-forno` | Five cheese ziti al forno | `five-cheese-ziti-al-forno` | regular | family-style-meals, buy-one-take-one, lighter-portions, lunch-menu, catering | — |
| 7 | `classic-entrees--spaghetti-with-meat-sauce` | Spaghetti With meat sauce | `spaghetti-with-meat-sauce` | regular | family-style-meals, buy-one-take-one, catering | — |
| 8 | `classic-entrees--chicken-tortelloni-alfredo` | Chicken Tortelloni alfredo | `chicken-tortelloni-alfredo` | regular | family-style-meals, amazing-alfredos, catering | — |
| 9 | `classic-entrees--lasagna-classico` | Lasagna Classico | `lasagna-classico` | regular | family-style-meals, buy-one-take-one, lighter-portions, lunch-menu, catering | — |
| 10 | `classic-entrees--chicken-scampi` | Chicken Scampi | `chicken-scampi` | regular | family-style-meals, catering | — |
| 11 | `classic-entrees--chicken-and-shrimp-carbonara` | Chicken and shrimp carbonara | `chicken-and-shrimp-carbonara` | regular | family-style-meals, catering | — |
| 12 | `classic-entrees--shrimp-scampi` | Shrimp Scampi | `shrimp-scampi` | regular | family-style-meals, lunch-menu, catering | — |
| 13 | `classic-entrees--calabrian-steak-and-shrimp-bucatini` | Calabrian steak & shrimp bucatini | `calabrian-steak-and-shrimp-bucatini` | regular | — | — |
| 14 | `classic-entrees--shrimp-carbonara` | Shrimp Carbonara | `shrimp-carbonara` | regular | — | — |
| 15 | `classic-entrees--tour-of-italy` | Tour of italy | `tour-of-italy` | regular | — | — |
| 16 | `classic-entrees--ravioli-carbonara` | Ravioli Carbonara | `ravioli-carbonara` | regular | — | — |
| 17 | `classic-entrees--spaghetti-and-meatballs` | Spaghetti & Meatballs | `spaghetti-and-meatballs` | regular | lighter-portions, lunch-menu | — |
| 18 | `classic-entrees--spaghetti-with-marinara` | Spaghetti with Marinara | `spaghetti-with-marinara` | regular | — | A9 |
| 19 | `classic-entrees--stuffed-chicken-marsala` | Stuffed Chicken Marsala | `stuffed-chicken-marsala` | regular | — | — |
| 20 | `classic-entrees--steak-gorgonzola-alfredo` | Steak Gorgonzola Alfredo | `steak-gorgonzola-alfredo` | regular | — | — |
| 21 | `classic-entrees--seafood-alfredo` | Seafood Alfredo | `seafood-alfredo` | regular | amazing-alfredos | — |
| 22 | `classic-entrees--cheese-ravioli` | Cheese Ravioli | `cheese-ravioli` | regular | lighter-portions, lunch-menu | A8 |
| 23 | `classic-entrees--eggplant-parmigiana` | Eggplant Parmigiana | `eggplant-parmigiana` | regular | lighter-portions, lunch-menu | — |
| 24 | `classic-entrees--grilled-chicken-margherita` | Grilled Chicken Margherita | `grilled-chicken-margherita` | regular | — | — |
| 25 | `classic-entrees--herb-grilled-salmon` | Herb-Grilled Salmon | `herb-grilled-salmon` | regular | gluten-sensitive | — |
| 26 | `classic-entrees--6-oz-sirloin` | 6 oz.sirloin | `6-oz-sirloin` | regular | gluten-sensitive | — |
| 27 | `classic-entrees--create-your-own-pasta` | Create your own Pasta | `create-your-own-pasta` | regular | — | — |
| 28 | `classic-entrees--spicy-alfredo-fettuccine` | _(new official item, Decision 3)_ | `spicy-alfredo-fettuccine` | regular | lighter-portions, lunch-menu | — |

### 4. Buy One Take One (7)

| # | Offering ID | Inventory name | Product ID | Portion | Also in | Alias |
|---:|---|---|---|---|---|---|
| 1 | `buy-one-take-one--chicken-parmigiana` | Chicken Parmigiana | `chicken-parmigiana` | promotion | family-style-meals, classic-entrees, lighter-portions, lunch-menu, catering | — |
| 2 | `buy-one-take-one--fettuccine-alfredo` | Fettuccine Alfredo | `fettuccine-alfredo` | promotion | family-style-meals, classic-entrees, amazing-alfredos, lighter-portions, lunch-menu, catering | — |
| 3 | `buy-one-take-one--five-cheese-ziti-al-forno` | Five cheese ziti al forno | `five-cheese-ziti-al-forno` | promotion | family-style-meals, classic-entrees, lighter-portions, lunch-menu, catering | — |
| 4 | `buy-one-take-one--spaghetti-with-meat-sauce` | Spaghetti With meat sauce | `spaghetti-with-meat-sauce` | promotion | family-style-meals, classic-entrees, catering | — |
| 5 | `buy-one-take-one--lasagna-classico` | Lasagna Classico | `lasagna-classico` | promotion | family-style-meals, classic-entrees, lighter-portions, lunch-menu, catering | — |
| 6 | `buy-one-take-one--rigatoni-alla-vodka` | Rigatoni alla Vodka | `rigatoni-alla-vodka` | promotion | — | — |
| 7 | `buy-one-take-one--four-cheese-manicotti-with-marinara` | Four-cheese manicotti with marinara | `four-cheese-manicotti-with-marinara` | promotion | — | — |

### 5. Amazing Alfredos (5)

| # | Offering ID | Inventory name | Product ID | Portion | Also in | Alias |
|---:|---|---|---|---|---|---|
| 1 | `amazing-alfredos--chicken-alfredo` | Chicken Alfredo | `chicken-alfredo` | regular | family-style-meals, classic-entrees, catering | — |
| 2 | `amazing-alfredos--fettuccine-alfredo` | Fettuccine Alfredo | `fettuccine-alfredo` | regular | family-style-meals, classic-entrees, buy-one-take-one, lighter-portions, lunch-menu, catering | — |
| 3 | `amazing-alfredos--shrimp-alfredo` | Shrimp Alfredo | `shrimp-alfredo` | regular | family-style-meals, classic-entrees, catering | — |
| 4 | `amazing-alfredos--chicken-tortelloni-alfredo` | Chicken Tortelloni alfredo | `chicken-tortelloni-alfredo` | regular | family-style-meals, classic-entrees, catering | — |
| 5 | `amazing-alfredos--seafood-alfredo` | Seafood Alfredo | `seafood-alfredo` | regular | classic-entrees | — |

### 6. Soups, Salad and Breadsticks (6)

| # | Offering ID | Inventory name | Product ID | Portion | Also in | Alias |
|---:|---|---|---|---|---|---|
| 1 | `soups-salad-and-breadsticks--famous-house-salad` | Our famous Jumbo house salad | `famous-house-salad` | regular | family-style-meals, catering | A5 |
| 2 | `soups-salad-and-breadsticks--homemade-soups` | Homemade Soups | `homemade-soups` | regular | family-style-meals, catering | A17 |
| 3 | `soups-salad-and-breadsticks--breadsticks` | Breadsticks | `breadsticks` | regular | family-style-meals, appetizers, catering | — |
| 4 | `soups-salad-and-breadsticks--dipping-sauces-with-breadsticks` | Dipping sauces with breadsticks | `dipping-sauces-with-breadsticks` | regular | appetizers | — |
| 5 | `soups-salad-and-breadsticks--weekday-lunch-special` | Weekday lunch special | `weekday-lunch-special` | regular | — | A10 |
| 6 | `soups-salad-and-breadsticks--soup-salad-and-breadsticks` | Soup, salad & breadsticks | `soup-salad-and-breadsticks` | regular | — | A10 |

### 7. Lighter Portions (8)

| # | Offering ID | Inventory name | Product ID | Portion | Also in | Alias |
|---:|---|---|---|---|---|---|
| 1 | `lighter-portions--chicken-parmigiana` | Chicken Parmigiana | `chicken-parmigiana` | lighter-portion | family-style-meals, classic-entrees, buy-one-take-one, lunch-menu, catering | — |
| 2 | `lighter-portions--fettuccine-alfredo` | Fettuccine Alfredo | `fettuccine-alfredo` | lighter-portion | family-style-meals, classic-entrees, buy-one-take-one, amazing-alfredos, lunch-menu, catering | — |
| 3 | `lighter-portions--five-cheese-ziti-al-forno` | Five cheese ziti al forno | `five-cheese-ziti-al-forno` | lighter-portion | family-style-meals, classic-entrees, buy-one-take-one, lunch-menu, catering | — |
| 4 | `lighter-portions--lasagna-classico` | Lasagna Classico | `lasagna-classico` | lighter-portion | family-style-meals, classic-entrees, buy-one-take-one, lunch-menu, catering | — |
| 5 | `lighter-portions--spaghetti-and-meatballs` | Spaghetti & Meatballs | `spaghetti-and-meatballs` | lighter-portion | classic-entrees, lunch-menu | — |
| 6 | `lighter-portions--cheese-ravioli` | Cheese Ravioli | `cheese-ravioli` | lighter-portion | classic-entrees, lunch-menu | A8 |
| 7 | `lighter-portions--eggplant-parmigiana` | Eggplant Parmigiana | `eggplant-parmigiana` | lighter-portion | classic-entrees, lunch-menu | — |
| 8 | `lighter-portions--spicy-alfredo-fettuccine` | _(new official item, Decision 3)_ | `spicy-alfredo-fettuccine` | lighter-portion | classic-entrees, lunch-menu | — |

### 8. Create Your Own Pasta (0)

No inventory entries.

### 9. Lunch Menu (17)

| # | Offering ID | Inventory name | Product ID | Portion | Also in | Alias |
|---:|---|---|---|---|---|---|
| 1 | `lunch-menu--chicken-parmigiana` | Chicken Parmigiana | `chicken-parmigiana` | lunch | family-style-meals, classic-entrees, buy-one-take-one, lighter-portions, catering | — |
| 2 | `lunch-menu--fettuccine-alfredo` | Fettuccine Alfredo | `fettuccine-alfredo` | lunch | family-style-meals, classic-entrees, buy-one-take-one, amazing-alfredos, lighter-portions, catering | — |
| 3 | `lunch-menu--five-cheese-ziti-al-forno` | Five cheese ziti al forno | `five-cheese-ziti-al-forno` | lunch | family-style-meals, classic-entrees, buy-one-take-one, lighter-portions, catering | — |
| 4 | `lunch-menu--lasagna-classico` | Lasagna Classico | `lasagna-classico` | lunch | family-style-meals, classic-entrees, buy-one-take-one, lighter-portions, catering | — |
| 5 | `lunch-menu--shrimp-scampi` | Shrimp scampi | `shrimp-scampi` | lunch | family-style-meals, classic-entrees, catering | — |
| 6 | `lunch-menu--spaghetti-and-meatballs` | Spaghetti & Meatballs | `spaghetti-and-meatballs` | lunch | classic-entrees, lighter-portions | — |
| 7 | `lunch-menu--cheese-ravioli` | Cheese ravioli | `cheese-ravioli` | lunch | classic-entrees, lighter-portions | A8 |
| 8 | `lunch-menu--eggplant-parmigiana` | Eggplant parmigiana | `eggplant-parmigiana` | lunch | classic-entrees, lighter-portions | — |
| 9 | `lunch-menu--spaghetti` | Spaghetti | `spaghetti` | lunch | — | A9 |
| 10 | `lunch-menu--soup-salad-and-breadsticks-lunch` | Soup, salad and breadsticks | Lunch | `soup-salad-and-breadsticks-lunch` | lunch | — | A10 |
| 11 | `lunch-menu--spicy-alfredo-fettuccine` | _(new official item, Decision 3)_ | `spicy-alfredo-fettuccine` | lunch | classic-entrees, lighter-portions | — |
| 12 | `lunch-menu--chicken-parmigiana-sandwich` | _(new official item, Decision 3)_ | `chicken-parmigiana-sandwich` | lunch | — | — |
| 13 | `lunch-menu--eggplant-parmigiana-sandwich` | _(new official item, Decision 3)_ | `eggplant-parmigiana-sandwich` | lunch | — | — |
| 14 | `lunch-menu--italian-grilled-chicken-sandwich` | _(new official item, Decision 3)_ | `italian-grilled-chicken-sandwich` | lunch | — | — |
| 15 | `lunch-menu--chicken-alfredo-flatbread` | _(new official item, Decision 3)_ | `chicken-alfredo-flatbread` | lunch | — | — |
| 16 | `lunch-menu--five-cheese-flatbread` | _(new official item, Decision 3)_ | `five-cheese-flatbread` | lunch | — | — |
| 17 | `lunch-menu--classic-pepperoni-flatbread` | _(new official item, Decision 3)_ | `classic-pepperoni-flatbread` | lunch | — | — |

### 10. Desserts (7)

| # | Offering ID | Inventory name | Product ID | Portion | Also in | Alias |
|---:|---|---|---|---|---|---|
| 1 | `desserts--chocolate-lasagna` | Chocolate lasagna | `chocolate-lasagna` | regular | — | — |
| 2 | `desserts--black-tie-mousse-cake` | Black tie Mousse Cake | `black-tie-mousse-cake` | regular | catering | — |
| 3 | `desserts--tiramisu` | Tiramisu | `tiramisu` | regular | catering | — |
| 4 | `desserts--strawberry-cream-cake` | Strawberry cream cake | `strawberry-cream-cake` | regular | — | — |
| 5 | `desserts--warm-italian-doughnuts` | Warm italian doughnuts | `warm-italian-doughnuts` | regular | — | — |
| 6 | `desserts--sicilian-cheesecake-with-strawberry-topping` | Sicilian cheesecake with strawberry topping | `sicilian-cheesecake-with-strawberry-topping` | regular | — | A7 |
| 7 | `desserts--pumpkin-cookie-butter-cheesecake` | _(new official item, Decision 3)_ | `pumpkin-cookie-butter-cheesecake` | regular | catering | — |

### 11. Drink Menu (13)

| # | Offering ID | Inventory name | Product ID | Portion | Also in | Alias |
|---:|---|---|---|---|---|---|
| 1 | `drink-menu--gallon-iced-teas-and-raspberry-lemonade` | Gallon Iced Teas & Raspberry Lemonade | `gallon-iced-teas-and-raspberry-lemonade` | regular | non-alcoholic-beverages, catering | — |
| 2 | `drink-menu--2-liter-soda` | 2-liter soda | `2-liter-soda` | regular | non-alcoholic-beverages, catering | — |
| 3 | `drink-menu--to-go-fountain-drinks` | To go fountain drinks | `to-go-fountain-drinks` | regular | non-alcoholic-beverages | — |
| 4 | `drink-menu--raspberry-lemonade` | Raspberry lemonade | `raspberry-lemonade` | regular | non-alcoholic-beverages | — |
| 5 | `drink-menu--classic-lemonade` | Classic lemonade | `classic-lemonade` | regular | non-alcoholic-beverages | — |
| 6 | `drink-menu--desert-pear-limonata` | Desert pear limonata | `desert-pear-limonata` | regular | non-alcoholic-beverages | — |
| 7 | `drink-menu--strawberry-passion-fruit-limonata` | Strawberry-passion fruit limonata | `strawberry-passion-fruit-limonata` | regular | non-alcoholic-beverages | — |
| 8 | `drink-menu--mango-passion-fruit-iced-tea` | Mango-passion fruit lced tea | `mango-passion-fruit-iced-tea` | regular | non-alcoholic-beverages | — |
| 9 | `drink-menu--bellini-peach-raspberry-iced-tea` | Bellini peach-raspberry iced tea | `bellini-peach-raspberry-iced-tea` | regular | non-alcoholic-beverages | — |
| 10 | `drink-menu--fresh-brewed-sweet-iced-tea` | Fresh brewed sweet iced tea | `fresh-brewed-sweet-iced-tea` | regular | non-alcoholic-beverages | — |
| 11 | `drink-menu--fresh-brewed-unsweet-iced-tea` | Fresh brewed unsweet iced tea | `fresh-brewed-unsweet-iced-tea` | regular | non-alcoholic-beverages | — |
| 12 | `drink-menu--cappuccino` | Cappuccino | `cappuccino` | regular | non-alcoholic-beverages | — |
| 13 | `drink-menu--half-iced-tea-and-half-lemonade` | _(new official item, Decision 3)_ | `half-iced-tea-and-half-lemonade` | regular | non-alcoholic-beverages | — |

### 12. Sides, Sauces and Extras (12)

| # | Offering ID | Inventory name | Product ID | Portion | Also in | Alias |
|---:|---|---|---|---|---|---|
| 1 | `sides-sauces-and-extras--cheese-grater` | Cheese Grater | `cheese-grater` | side | — | — |
| 2 | `sides-sauces-and-extras--side-of-meatballs` | Side of Meatballs | `side-of-meatballs` | side | — | A11 |
| 3 | `sides-sauces-and-extras--side-of-grilled-chicken` | Side of grilled chicken | `side-of-grilled-chicken` | side | — | A12 |
| 4 | `sides-sauces-and-extras--side-of-mashed-potatoes` | Side of mashed potatoes | `side-of-mashed-potatoes` | side | — | — |
| 5 | `sides-sauces-and-extras--side-of-broccoli` | Side of broccoli | `side-of-broccoli` | side | — | A13 |
| 6 | `sides-sauces-and-extras--side-of-alfredo-sauce--large` | Side of alfredo sauce (large) | `side-of-alfredo-sauce` | side | — | A14 |
| 7 | `sides-sauces-and-extras--side-of-marinara-sauce--large` | Side of marinara sauce (large) | `side-of-marinara-sauce` | side | — | A14 |
| 8 | `sides-sauces-and-extras--side-of-meat-sauce--large` | Side of meat sauce (large) | `side-of-meat-sauce` | side | — | A14 |
| 9 | `sides-sauces-and-extras--side-of-five-cheese-marinara-sauce--large` | Side of five cheese marinara sauce (Large) | `side-of-five-cheese-marinara-sauce` | side | — | A14 |
| 10 | `sides-sauces-and-extras--side-of-crispy-shrimp-fritta` | _(new official item, Decision 3)_ | `side-of-crispy-shrimp-fritta` | side | — | — |
| 11 | `sides-sauces-and-extras--side-of-crispy-chicken-fritta` | _(new official item, Decision 3)_ | `side-of-crispy-chicken-fritta` | side | — | — |
| 12 | `sides-sauces-and-extras--italian-sausage` | _(new official item, Decision 3)_ | `italian-sausage` | side | catering | — |

### 13. Non-Alcoholic Beverages (14)

| # | Offering ID | Inventory name | Product ID | Portion | Also in | Alias |
|---:|---|---|---|---|---|---|
| 1 | `non-alcoholic-beverages--gallon-iced-teas-and-raspberry-lemonade` | Gallon iced teas & raspberry lemonade | `gallon-iced-teas-and-raspberry-lemonade` | regular | drink-menu, catering | — |
| 2 | `non-alcoholic-beverages--2-liter-soda` | 2-liter soda | `2-liter-soda` | regular | drink-menu, catering | — |
| 3 | `non-alcoholic-beverages--to-go-fountain-drinks` | To go fountain drinks | `to-go-fountain-drinks` | regular | drink-menu | — |
| 4 | `non-alcoholic-beverages--raspberry-lemonade` | Raspberry lemonade | `raspberry-lemonade` | regular | drink-menu | — |
| 5 | `non-alcoholic-beverages--classic-lemonade` | Classic lemonade | `classic-lemonade` | regular | drink-menu | — |
| 6 | `non-alcoholic-beverages--desert-pear-limonata` | Desert pear limonata | `desert-pear-limonata` | regular | drink-menu | — |
| 7 | `non-alcoholic-beverages--strawberry-passion-fruit-limonata` | Strawberry-passion fruit limonata | `strawberry-passion-fruit-limonata` | regular | drink-menu | — |
| 8 | `non-alcoholic-beverages--mango-passion-fruit-iced-tea` | Mango-passion fruit lced tea | `mango-passion-fruit-iced-tea` | regular | drink-menu | — |
| 9 | `non-alcoholic-beverages--bellini-peach-raspberry-iced-tea` | Bellini peach-raspberry iced tea | `bellini-peach-raspberry-iced-tea` | regular | drink-menu | — |
| 10 | `non-alcoholic-beverages--fresh-brewed-sweet-iced-tea` | Fresh brewed sweet iced tea | `fresh-brewed-sweet-iced-tea` | regular | drink-menu | — |
| 11 | `non-alcoholic-beverages--fresh-brewed-unsweet-iced-tea` | Fresh brewed unsweet iced tea | `fresh-brewed-unsweet-iced-tea` | regular | drink-menu | — |
| 12 | `non-alcoholic-beverages--cappuccino` | Cappuccino | `cappuccino` | regular | drink-menu | — |
| 13 | `non-alcoholic-beverages--lavazza-espresso` | Lavazza espresso | `lavazza-espresso` | regular | — | — |
| 14 | `non-alcoholic-beverages--half-iced-tea-and-half-lemonade` | _(new official item, Decision 3)_ | `half-iced-tea-and-half-lemonade` | regular | drink-menu | — |

### 14. Wine & Beer To Go (20)

| # | Offering ID | Inventory name | Product ID | Portion | Also in | Alias |
|---:|---|---|---|---|---|---|
| 1 | `wine-and-beer-to-go--moscato-primo-amore` | Moscato primo amore | `moscato-primo-amore` | to-go | — | — |
| 2 | `wine-and-beer-to-go--sweet-pink-moscato-blend-confetti` | Sweet pink moscato blend confetti | `sweet-pink-moscato-blend-confetti` | to-go | — | — |
| 3 | `wine-and-beer-to-go--sweet-red-roscato-rosso-dolce` | Sweet red roscato rosso dolce | `sweet-red-roscato-rosso-dolce` | to-go | — | — |
| 4 | `wine-and-beer-to-go--red-blend-porta-vita` | Red blend porta vita | `red-blend-porta-vita` | to-go | — | — |
| 5 | `wine-and-beer-to-go--moscato-castello-del-poggio` | Moscato castello del poggio | `moscato-castello-del-poggio` | to-go | — | — |
| 6 | `wine-and-beer-to-go--white-zinfandel-sutter-home` | White zinfandel sutter home | `white-zinfandel-sutter-home` | to-go | — | — |
| 7 | `wine-and-beer-to-go--riesling-chateau-ste-michelle` | Riesling Chateau Ste. Michelle | `riesling-chateau-ste-michelle` | to-go | — | — |
| 8 | `wine-and-beer-to-go--pinot-grigio-cavit` | Pinot Grigio Cavit | `pinot-grigio-cavit` | to-go | — | — |
| 9 | `wine-and-beer-to-go--sauvignon-blanc-starborough` | Sauvignon Blanc Starborough | `sauvignon-blanc-starborough` | to-go | — | — |
| 10 | `wine-and-beer-to-go--chardonnay-chateau-ste-michelle` | Chardonnay Chateau Ste. Michelle | `chardonnay-chateau-ste-michelle` | to-go | — | — |
| 11 | `wine-and-beer-to-go--pinot-noir-meiomi` | Pinot Noir Meiomi | `pinot-noir-meiomi` | to-go | — | — |
| 12 | `wine-and-beer-to-go--merlot-beringer` | Merlot Beringer | `merlot-beringer` | to-go | — | — |
| 13 | `wine-and-beer-to-go--chianti-classico-rocca-delle-macie` | Chianti Classico Rocca delle Macie | `chianti-classico-rocca-delle-macie` | to-go | — | — |
| 14 | `wine-and-beer-to-go--cabernet-robert-mondavi-private-selection` | Cabernet Robert Mondavi Private Selection | `cabernet-robert-mondavi-private-selection` | to-go | — | — |
| 15 | `wine-and-beer-to-go--budweiser` | Budweiser | `budweiser` | to-go | — | — |
| 16 | `wine-and-beer-to-go--bud-light` | Bud Light | `bud-light` | to-go | — | — |
| 17 | `wine-and-beer-to-go--coors-light` | Coors Light | `coors-light` | to-go | — | — |
| 18 | `wine-and-beer-to-go--michelob-ultra` | Michelob Ultra | `michelob-ultra` | to-go | — | — |
| 19 | `wine-and-beer-to-go--miller-lite` | Miller Lite | `miller-lite` | to-go | — | — |
| 20 | `wine-and-beer-to-go--heineken-0-0-non-alcoholic` | _(new official item, Decision 3)_ | `heineken-0-0-non-alcoholic` | to-go | — | — |

### 15. Gluten Sensitive (10)

| # | Offering ID | Inventory name | Product ID | Portion | Also in | Alias |
|---:|---|---|---|---|---|---|
| 1 | `gluten-sensitive--herb-grilled-salmon` | Herb-Grilled Salmon | `herb-grilled-salmon` | regular | classic-entrees | — |
| 2 | `gluten-sensitive--zuppa-toscana` | Zuppa Toscana | `zuppa-toscana` | regular | — | A17 |
| 3 | `gluten-sensitive--famous-house-salad-without-croutons` | Famous House Salad without croutons | `famous-house-salad-without-croutons` | regular | — | A5 |
| 4 | `gluten-sensitive--grilled-chicken-parmigiana` | Grilled Chicken Parmigiana | `grilled-chicken-parmigiana` | regular | — | — |
| 5 | `gluten-sensitive--6-oz-sirloin` | 6 oz Sirloin (Gluten Sensitive) | `6-oz-sirloin` | regular | classic-entrees | — |
| 6 | `gluten-sensitive--rotini-pasta-with-marinara` | Rotini Pasta with Marinara | `rotini-pasta-with-marinara` | regular | — | A1 |
| 7 | `gluten-sensitive--rotini-pasta-with-meat-sauce` | Rotini Pasta with Meat Sauce | `rotini-pasta-with-meat-sauce` | regular | — | A2 |
| 8 | `gluten-sensitive--grilled-chicken-with-rotini-pasta-and-marinara` | Grilled Chicken with Rotini Pasta & Marinara | `grilled-chicken-with-rotini-pasta-and-marinara` | regular | — | A3 |
| 9 | `gluten-sensitive--rotini-with-marinara` | Rotini with Marinara | `rotini-with-marinara` | regular | — | A1 |
| 10 | `gluten-sensitive--rotini-with-meat-sauce` | Rotini with Meat Sauce | `rotini-with-meat-sauce` | regular | — | A2 |

### 16. Kids Meal (11)

| # | Offering ID | Inventory name | Product ID | Portion | Also in | Alias |
|---:|---|---|---|---|---|---|
| 1 | `kids-meal--kids-alfredo-pasta` | Kids Alfredo Pasta | `kids-alfredo-pasta` | kids | — | — |
| 2 | `kids-meal--kids-pizza` | Kids Pizza | `kids-pizza` | kids | — | — |
| 3 | `kids-meal--kids-chicken-fingers` | Kids Chicken Fingers | `kids-chicken-fingers` | kids | — | A15 |
| 4 | `kids-meal--kids-macaroni-and-cheese` | Kids Macaroni & Cheese | `kids-macaroni-and-cheese` | kids | — | — |
| 5 | `kids-meal--kids-meat-sauce-pasta` | Kids Meat Sauce Pasta | `kids-meat-sauce-pasta` | kids | — | A16 |
| 6 | `kids-meal--kids-tomato-sauce-pasta` | Kids Tomato Sauce Pasta | `kids-tomato-sauce-pasta` | kids | — | A16 |
| 7 | `kids-meal--kids-five-cheese-marinara-pasta` | Kids Five Cheese Marinara Pasta | `kids-five-cheese-marinara-pasta` | kids | — | — |
| 8 | `kids-meal--kids-cheese-ravioli` | Kids Cheese Ravioli | `kids-cheese-ravioli` | kids | — | — |
| 9 | `kids-meal--kids-grilled-chicken-with-rotini-pasta-and-marinara` | Kids Grilled Chicken with Rotini Pasta & Marinara | `kids-grilled-chicken-with-rotini-pasta-and-marinara` | kids | — | A3 |
| 10 | `kids-meal--kids-rotini-with-marinara` | Kids Rotini with Marinara | `kids-rotini-with-marinara` | kids | — | A16 |
| 11 | `kids-meal--kids-rotini-with-meat-sauce` | Kids Rotini with Meat Sauce | `kids-rotini-with-meat-sauce` | kids | — | A16 |

### 17. Catering (40)

| # | Offering ID | Inventory name | Product ID | Portion | Also in | Alias |
|---:|---|---|---|---|---|---|
| 1 | `catering--famous-house-salad` | Our Famous Jumbo House Salad | `famous-house-salad` | catering | family-style-meals, soups-salad-and-breadsticks | A5 |
| 2 | `catering--chicken-alfredo` | Chicken Alfredo | `chicken-alfredo` | catering | family-style-meals, classic-entrees, amazing-alfredos | — |
| 3 | `catering--chicken-parmigiana` | Chicken Parmigiana | `chicken-parmigiana` | catering | family-style-meals, classic-entrees, buy-one-take-one, lighter-portions, lunch-menu | — |
| 4 | `catering--fettuccine-alfredo` | Fettuccine Alfredo | `fettuccine-alfredo` | catering | family-style-meals, classic-entrees, buy-one-take-one, amazing-alfredos, lighter-portions, lunch-menu | — |
| 5 | `catering--shrimp-alfredo` | Shrimp Alfredo | `shrimp-alfredo` | catering | family-style-meals, classic-entrees, amazing-alfredos | — |
| 6 | `catering--five-cheese-ziti-al-forno` | Five Cheese Ziti al Forno | `five-cheese-ziti-al-forno` | catering | family-style-meals, classic-entrees, buy-one-take-one, lighter-portions, lunch-menu | — |
| 7 | `catering--spaghetti-with-meat-sauce` | Spaghetti with Meat Sauce | `spaghetti-with-meat-sauce` | catering | family-style-meals, classic-entrees, buy-one-take-one | — |
| 8 | `catering--spaghetti-with-marinara-sauce` | Spaghetti with Marinara Sauce | `spaghetti-with-marinara-sauce` | catering | family-style-meals | A9 |
| 9 | `catering--chicken-tortelloni-alfredo` | Chicken Tortelloni Alfredo | `chicken-tortelloni-alfredo` | catering | family-style-meals, classic-entrees, amazing-alfredos | — |
| 10 | `catering--lasagna-classico` | Lasagna Classico | `lasagna-classico` | catering | family-style-meals, classic-entrees, buy-one-take-one, lighter-portions, lunch-menu | — |
| 11 | `catering--chicken-scampi` | Chicken Scampi | `chicken-scampi` | catering | family-style-meals, classic-entrees | — |
| 12 | `catering--chicken-and-shrimp-carbonara` | Chicken and Shrimp Carbonara | `chicken-and-shrimp-carbonara` | catering | family-style-meals, classic-entrees | — |
| 13 | `catering--shrimp-scampi` | Shrimp Scampi | `shrimp-scampi` | catering | family-style-meals, classic-entrees, lunch-menu | — |
| 14 | `catering--cheese-ravioli-with-marinara-or-meat-sauce` | Cheese Ravioli with Marinara or Meat Sauce | `cheese-ravioli-with-marinara-or-meat-sauce` | catering | — | A8 |
| 15 | `catering--homemade-soups--large` | Homemade Soups Large | `homemade-soups` | catering | family-style-meals, soups-salad-and-breadsticks | — |
| 16 | `catering--homemade-soups` | Homemade Soups | `homemade-soups` | catering | family-style-meals, soups-salad-and-breadsticks | A17 |
| 17 | `catering--breadsticks` | Breadsticks | `breadsticks` | catering | family-style-meals, appetizers, soups-salad-and-breadsticks | — |
| 18 | `catering--fried-mozzarella` | Fried Mozzarella | `fried-mozzarella` | catering | appetizers | — |
| 19 | `catering--spinach-artichoke-dip` | Spinach-Artichoke Dip | `spinach-artichoke-dip` | catering | appetizers | — |
| 20 | `catering--black-tie-mousse-cake` | Black Tie Mousse Cake | `black-tie-mousse-cake` | catering | desserts | — |
| 21 | `catering--tiramisu` | Tiramisu | `tiramisu` | catering | desserts | — |
| 22 | `catering--2-liter-soda` | 2-Liter Soda | `2-liter-soda` | catering | drink-menu, non-alcoholic-beverages | — |
| 23 | `catering--chicken-parmigiana-combination` | Chicken Parmigiana Combination | `chicken-parmigiana-combination` | catering | — | — |
| 24 | `catering--lasagna-combination` | Lasagna Combination | `lasagna-combination` | catering | — | — |
| 25 | `catering--create-your-own-pasta-station` | Create Your Own Pasta Station | `create-your-own-pasta-station` | catering | — | — |
| 26 | `catering--toasted-beef-ravioli` | Toasted Beef Ravioli | `toasted-beef-ravioli` | catering | — | A6 |
| 27 | `catering--alfredo-dipping-sauce` | Alfredo Dipping Sauce | `alfredo-dipping-sauce` | catering | — | A14 |
| 28 | `catering--five-cheese-marinara-dipping-sauce` | Five Cheese Marinara Dipping Sauce | `five-cheese-marinara-dipping-sauce` | catering | — | A14 |
| 29 | `catering--marinara-dipping-sauce` | Marinara Dipping Sauce | `marinara-dipping-sauce` | catering | — | A14 |
| 30 | `catering--meat-dipping-sauce` | Meat Dipping Sauce | `meat-dipping-sauce` | catering | — | A14 |
| 31 | `catering--grilled-chicken-breasts` | Grilled Chicken Breasts | `grilled-chicken-breasts` | catering | — | A12 |
| 32 | `catering--chicken-fingers` | Chicken Fingers | `chicken-fingers` | catering | — | A15 |
| 33 | `catering--italian-meatballs` | Italian Meatballs | `italian-meatballs` | catering | — | A11 |
| 34 | `catering--broccoli` | Broccoli | `broccoli` | catering | — | A13 |
| 35 | `catering--sicilian-cheesecake` | Sicilian Cheesecake | `sicilian-cheesecake` | catering | — | A7 |
| 36 | `catering--gallon-iced-teas-and-raspberry-lemonade` | Gallon Iced Teas & Raspberry Lemonade | `gallon-iced-teas-and-raspberry-lemonade` | catering | drink-menu, non-alcoholic-beverages | — |
| 37 | `catering--san-pellegrino-sparkling-1-liter-bottle` | San Pellegrino Sparkling (1 liter bottle) | `san-pellegrino-sparkling-1-liter-bottle` | catering | — | — |
| 38 | `catering--acqua-panna-spring-1-liter-bottle` | Acqua Panna Spring (1 liter bottle) | `acqua-panna-spring-1-liter-bottle` | catering | — | — |
| 39 | `catering--pumpkin-cookie-butter-cheesecake` | _(new official item, Decision 3)_ | `pumpkin-cookie-butter-cheesecake` | catering | desserts | — |
| 40 | `catering--italian-sausage` | _(new official item, Decision 3)_ | `italian-sausage` | catering | sides-sauces-and-extras | — |

## 4. Products in several categories (portion-based offerings)

Each offering keeps its own price, calories, and serving size. Values are never copied between portions.

| Product | Offerings | Categories (portion type) |
|---|---:|---|
| Fettuccine Alfredo (`fettuccine-alfredo`) | 7 | family-style-meals (family-style); classic-entrees (regular); buy-one-take-one (promotion); amazing-alfredos (regular); lighter-portions (lighter-portion); lunch-menu (lunch); catering (catering) |
| Chicken Parmigiana (`chicken-parmigiana`) | 6 | family-style-meals (family-style); classic-entrees (regular); buy-one-take-one (promotion); lighter-portions (lighter-portion); lunch-menu (lunch); catering (catering) |
| Five Cheese Ziti al Forno (`five-cheese-ziti-al-forno`) | 6 | family-style-meals (family-style); classic-entrees (regular); buy-one-take-one (promotion); lighter-portions (lighter-portion); lunch-menu (lunch); catering (catering) |
| Lasagna Classico (`lasagna-classico`) | 6 | family-style-meals (family-style); classic-entrees (regular); buy-one-take-one (promotion); lighter-portions (lighter-portion); lunch-menu (lunch); catering (catering) |
| Homemade Soups (`homemade-soups`) | 5 | family-style-meals (family-style); family-style-meals (family-style); soups-salad-and-breadsticks (regular); catering (catering); catering (catering) |
| Chicken Alfredo (`chicken-alfredo`) | 4 | family-style-meals (family-style); classic-entrees (regular); amazing-alfredos (regular); catering (catering) |
| Shrimp Alfredo (`shrimp-alfredo`) | 4 | family-style-meals (family-style); classic-entrees (regular); amazing-alfredos (regular); catering (catering) |
| Spaghetti with Meat Sauce (`spaghetti-with-meat-sauce`) | 4 | family-style-meals (family-style); classic-entrees (regular); buy-one-take-one (promotion); catering (catering) |
| Chicken Tortelloni Alfredo (`chicken-tortelloni-alfredo`) | 4 | family-style-meals (family-style); classic-entrees (regular); amazing-alfredos (regular); catering (catering) |
| Shrimp Scampi (`shrimp-scampi`) | 4 | family-style-meals (family-style); classic-entrees (regular); lunch-menu (lunch); catering (catering) |
| Breadsticks (`breadsticks`) | 4 | family-style-meals (family-style); appetizers (regular); soups-salad-and-breadsticks (regular); catering (catering) |
| Family-Style Lasagna Bundle (`family-style-lasagna-bundle`) | 3 | family-style-meals (family-style); family-style-meals (family-style); classic-entrees (regular) |
| Our Famous Jumbo House Salad (`famous-house-salad`) | 3 | family-style-meals (family-style); soups-salad-and-breadsticks (regular); catering (catering) |
| Chicken Scampi (`chicken-scampi`) | 3 | family-style-meals (family-style); classic-entrees (regular); catering (catering) |
| Chicken and Shrimp Carbonara (`chicken-and-shrimp-carbonara`) | 3 | family-style-meals (family-style); classic-entrees (regular); catering (catering) |
| Spaghetti & Meatballs (`spaghetti-and-meatballs`) | 3 | classic-entrees (regular); lighter-portions (lighter-portion); lunch-menu (lunch) |
| Cheese Ravioli (`cheese-ravioli`) | 3 | classic-entrees (regular); lighter-portions (lighter-portion); lunch-menu (lunch) |
| Eggplant Parmigiana (`eggplant-parmigiana`) | 3 | classic-entrees (regular); lighter-portions (lighter-portion); lunch-menu (lunch) |
| Gallon Iced Teas & Raspberry Lemonade (`gallon-iced-teas-and-raspberry-lemonade`) | 3 | drink-menu (regular); non-alcoholic-beverages (regular); catering (catering) |
| 2-Liter Soda (`2-liter-soda`) | 3 | drink-menu (regular); non-alcoholic-beverages (regular); catering (catering) |
| Spicy Alfredo Fettuccine (`spicy-alfredo-fettuccine`) | 3 | classic-entrees (regular); lighter-portions (lighter-portion); lunch-menu (lunch) |
| Spaghetti with Marinara Sauce (`spaghetti-with-marinara-sauce`) | 2 | family-style-meals (family-style); catering (catering) |
| Fried Mozzarella (`fried-mozzarella`) | 2 | appetizers (regular); catering (catering) |
| Dipping Sauces with Breadsticks (`dipping-sauces-with-breadsticks`) | 2 | appetizers (regular); soups-salad-and-breadsticks (regular) |
| Spinach-Artichoke Dip (`spinach-artichoke-dip`) | 2 | appetizers (regular); catering (catering) |
| Seafood Alfredo (`seafood-alfredo`) | 2 | classic-entrees (regular); amazing-alfredos (regular) |
| Herb-Grilled Salmon (`herb-grilled-salmon`) | 2 | classic-entrees (regular); gluten-sensitive (regular) |
| 6 oz. Sirloin (`6-oz-sirloin`) | 2 | classic-entrees (regular); gluten-sensitive (regular) |
| Black Tie Mousse Cake (`black-tie-mousse-cake`) | 2 | desserts (regular); catering (catering) |
| Tiramisu (`tiramisu`) | 2 | desserts (regular); catering (catering) |
| To-Go Fountain Drinks (`to-go-fountain-drinks`) | 2 | drink-menu (regular); non-alcoholic-beverages (regular) |
| Raspberry Lemonade (`raspberry-lemonade`) | 2 | drink-menu (regular); non-alcoholic-beverages (regular) |
| Classic Lemonade (`classic-lemonade`) | 2 | drink-menu (regular); non-alcoholic-beverages (regular) |
| Desert Pear Limonata (`desert-pear-limonata`) | 2 | drink-menu (regular); non-alcoholic-beverages (regular) |
| Strawberry-Passion Fruit Limonata (`strawberry-passion-fruit-limonata`) | 2 | drink-menu (regular); non-alcoholic-beverages (regular) |
| Mango-Passion Fruit Iced Tea (`mango-passion-fruit-iced-tea`) | 2 | drink-menu (regular); non-alcoholic-beverages (regular) |
| Bellini Peach-Raspberry Iced Tea (`bellini-peach-raspberry-iced-tea`) | 2 | drink-menu (regular); non-alcoholic-beverages (regular) |
| Fresh-Brewed Sweet Iced Tea (`fresh-brewed-sweet-iced-tea`) | 2 | drink-menu (regular); non-alcoholic-beverages (regular) |
| Fresh-Brewed Unsweet Iced Tea (`fresh-brewed-unsweet-iced-tea`) | 2 | drink-menu (regular); non-alcoholic-beverages (regular) |
| Cappuccino (`cappuccino`) | 2 | drink-menu (regular); non-alcoholic-beverages (regular) |
| Pumpkin Cookie Butter Cheesecake (`pumpkin-cookie-butter-cheesecake`) | 2 | desserts (regular); catering (catering) |
| Italian Sausage (`italian-sausage`) | 2 | sides-sauces-and-extras (side); catering (catering) |
| Half Iced Tea + Half Lemonade (`half-iced-tea-and-half-lemonade`) | 2 | drink-menu (regular); non-alcoholic-beverages (regular) |

## 5. Alias cases (original questions; decisions in `ALIAS_MAPPING.md`)

| Case | Offerings | Question |
|---|---|---|
| A1 | `gluten-sensitive--rotini-pasta-with-marinara`, `gluten-sensitive--rotini-with-marinara` | Rotini Pasta with Marinara vs. Rotini with Marinara: same item listed twice, or adult vs. kids version? |
| A2 | `gluten-sensitive--rotini-pasta-with-meat-sauce`, `gluten-sensitive--rotini-with-meat-sauce` | Rotini Pasta with Meat Sauce vs. Rotini with Meat Sauce: same as A1. |
| A3 | `gluten-sensitive--grilled-chicken-with-rotini-pasta-and-marinara`, `kids-meal--kids-grilled-chicken-with-rotini-pasta-and-marinara` | Grilled Chicken with Rotini Pasta & Marinara (Gluten Sensitive) vs. the Kids version: adult vs. kids, or the same item? |
| A4 | `family-style-meals--famous-house-salad`, `family-style-meals--large-salad` | Our Famous Jumbo House Salad vs. Large Salad (both in Family-Style Meals): same product? |
| A5 | `gluten-sensitive--famous-house-salad-without-croutons`, `family-style-meals--famous-house-salad`, `soups-salad-and-breadsticks--famous-house-salad`, `catering--famous-house-salad` | Famous House Salad without Croutons: a variant of the house salad? (Kept as its own offering either way.) |
| A6 | `appetizers--toasted-ravioli`, `catering--toasted-beef-ravioli` | Toasted Ravioli (Appetizers) vs. Toasted Beef Ravioli (Catering): same product? |
| A7 | `desserts--sicilian-cheesecake-with-strawberry-topping`, `catering--sicilian-cheesecake` | Sicilian Cheesecake with Strawberry Topping vs. Sicilian Cheesecake (Catering): same product, different topping or format? |
| A8 | `family-style-meals--cheese-ravioli-with-meat-or-marinara-sauce`, `classic-entrees--cheese-ravioli`, `lighter-portions--cheese-ravioli`, `lunch-menu--cheese-ravioli`, `catering--cheese-ravioli-with-marinara-or-meat-sauce` | Cheese Ravioli and the two 'with meat or marinara sauce' names: one product with a sauce choice? |
| A9 | `family-style-meals--spaghetti-with-marinara-sauce`, `catering--spaghetti-with-marinara-sauce`, `classic-entrees--spaghetti-with-marinara`, `lunch-menu--spaghetti` | Spaghetti with Marinara Sauce / Spaghetti with Marinara / Spaghetti (Lunch): which sauce is the lunch Spaghetti? |
| A10 | `soups-salad-and-breadsticks--soup-salad-and-breadsticks`, `lunch-menu--soup-salad-and-breadsticks-lunch`, `soups-salad-and-breadsticks--weekday-lunch-special` | Soup, Salad & Breadsticks / Soup, Salad and Breadsticks (Lunch) / Weekday Lunch Special: the same offer at different times? |
| A11 | `sides-sauces-and-extras--side-of-meatballs`, `catering--italian-meatballs`, `appetizers--meatballs-parmigiana` | Side of Meatballs / Italian Meatballs (Catering) / Meatballs Parmigiana (Appetizers): related but likely distinct? |
| A12 | `sides-sauces-and-extras--side-of-grilled-chicken`, `catering--grilled-chicken-breasts` | Side of Grilled Chicken vs. Grilled Chicken Breasts (Catering): same product, different portion? |
| A13 | `sides-sauces-and-extras--side-of-broccoli`, `catering--broccoli` | Side of Broccoli vs. Broccoli (Catering): same product, different portion? |
| A14 | `sides-sauces-and-extras--side-of-alfredo-sauce--large`, `catering--alfredo-dipping-sauce`, `sides-sauces-and-extras--side-of-marinara-sauce--large`, `catering--marinara-dipping-sauce`, `sides-sauces-and-extras--side-of-meat-sauce--large`, `catering--meat-dipping-sauce`, `sides-sauces-and-extras--side-of-five-cheese-marinara-sauce--large`, `catering--five-cheese-marinara-dipping-sauce` | Large side sauces vs. catering dipping sauces (alfredo, marinara, meat, five cheese marinara): same sauce, different container size? |
| A15 | `kids-meal--kids-chicken-fingers`, `catering--chicken-fingers` | Kids Chicken Fingers vs. Chicken Fingers (Catering): same product, different portion? |
| A16 | `kids-meal--kids-tomato-sauce-pasta`, `kids-meal--kids-rotini-with-marinara`, `kids-meal--kids-meat-sauce-pasta`, `kids-meal--kids-rotini-with-meat-sauce` | Kids Tomato Sauce Pasta vs. Kids Rotini with Marinara, and Kids Meat Sauce Pasta vs. Kids Rotini with Meat Sauce: regular vs. gluten-sensitive pasta? |
| A17 | `gluten-sensitive--zuppa-toscana`, `family-style-meals--homemade-soups`, `soups-salad-and-breadsticks--homemade-soups`, `catering--homemade-soups` | Zuppa Toscana (Gluten Sensitive) vs. Homemade Soups: is Zuppa Toscana one of the homemade soups? Which soups are offered? |

## 6. Audit result

- All 210 owner inventory entries are present, plus 21 new official items; all 231 have a unique offering ID.
- New items have no `inventoryName` (they are not in docs/MENU_INVENTORY.md); their official name is in menu-research.json.
- No entry was removed, renamed, or merged.
- `inventoryName` values are the owner's exact text.
