# Menu Image Manifest (research)

**Date:** 2026-11-12

> **Update 2026-11-13 (Lesson 7.3):** the owner's photos from `image-staging/`
> are integrated (111 unique images, 115 of 146 products). Live status, final
> file names, sizes, alt text, and the photos not used (with reasons) are in
> `docs/IMAGE_MANIFEST.md`. The table below is the original research plan and
> is kept unchanged; some final file names differ where the owner supplied a
> separate photo for a product that was planned to share one.
>
> **Update 2026-11-13 (Lesson 7.3 final):** the owner supplied 25 AI-generated
> images in `image-staging/missing-images/`. All 25 are integrated (11 differ
> from the official dish, used by owner decision). 146 of 146 products now
> have an image. Remaining list: `docs/MISSING_IMAGES.md`.
**Rules:** the owner supplies every food image; none are generated or downloaded. Live list of files in the project: `docs/IMAGE_MANIFEST.md`.
**Convention:** one WebP photo per canonical product in the folder of its main category (`public/images/<category-slug>/<product-id>.webp`), reused by every homepage and category-page offering of that product. Products confirmed as the same dish (see `ALIAS_MAPPING.md`) reuse one photo. Format-specific photos (catering pans, bundles) are optional.

## Summary

| Measure | Count |
|---|---:|
| Canonical products | 146 |
| Products reusing another product's photo | 17 |
| **Unique photos required** | **129** |
| Supplied and usable | 7 |
| Supplied but need replacement | 3 |
| Still needed | 119 |

## Replacement needed (owner Decision 1)

The owner will supply corrected photos. Until then these files are not used.

| File | Menu item | Exact issue |
|---|---|---|
| `public/images/appetizers/calamari.webp` | Calamari | a checkerboard (fake transparency) pattern is baked into the image background. |
| `public/images/appetizers/meatballs-parmigiana.webp` | Meatballs Parmigiana | the photo shows six meatballs, but the official dish has five. |
| `public/images/appetizers/shrimp-fritto-misto.webp` | Shrimp Fritto Misto | the photo appears to include calamari rings; the official dish is shrimp with onions and bell peppers. |

## Unique photos

| # | Suggested file | Menu item | Status | Used by offerings | Alt text |
|---:|---|---|---|---|---|
| 1 | `public/images/classic-entrees/family-style-lasagna-bundle.webp` | Family-Style Lasagna Bundle | needed | 3: family-style-meals, classic-entrees | pending |
| 2 | `public/images/soups-salad-and-breadsticks/famous-house-salad.webp` | Our Famous Jumbo House Salad | needed | 3: family-style-meals, soups-salad-and-breadsticks, catering | pending |
| 3 | `public/images/classic-entrees/chicken-alfredo.webp` | Chicken Alfredo | needed | 4: family-style-meals, classic-entrees, amazing-alfredos, catering | pending |
| 4 | `public/images/classic-entrees/chicken-parmigiana.webp` | Chicken Parmigiana | needed | 6: family-style-meals, classic-entrees, buy-one-take-one, lighter-portions, lunch-menu, catering | pending |
| 5 | `public/images/classic-entrees/fettuccine-alfredo.webp` | Fettuccine Alfredo | needed | 7: family-style-meals, classic-entrees, buy-one-take-one, amazing-alfredos, lighter-portions, lunch-menu, catering | pending |
| 6 | `public/images/classic-entrees/shrimp-alfredo.webp` | Shrimp Alfredo | needed | 4: family-style-meals, classic-entrees, amazing-alfredos, catering | pending |
| 7 | `public/images/classic-entrees/five-cheese-ziti-al-forno.webp` | Five Cheese Ziti al Forno | needed | 6: family-style-meals, classic-entrees, buy-one-take-one, lighter-portions, lunch-menu, catering | pending |
| 8 | `public/images/classic-entrees/spaghetti-with-meat-sauce.webp` | Spaghetti with Meat Sauce | needed | 4: family-style-meals, classic-entrees, buy-one-take-one, catering | pending |
| 9 | `public/images/classic-entrees/spaghetti-with-marinara.webp` | Spaghetti with Marinara | needed | 3: family-style-meals, classic-entrees, catering | pending |
| 10 | `public/images/classic-entrees/chicken-tortelloni-alfredo.webp` | Chicken Tortelloni Alfredo | needed | 4: family-style-meals, classic-entrees, amazing-alfredos, catering | pending |
| 11 | `public/images/classic-entrees/lasagna-classico.webp` | Lasagna Classico | needed | 6: family-style-meals, classic-entrees, buy-one-take-one, lighter-portions, lunch-menu, catering | pending |
| 12 | `public/images/classic-entrees/chicken-scampi.webp` | Chicken Scampi | needed | 3: family-style-meals, classic-entrees, catering | pending |
| 13 | `public/images/classic-entrees/chicken-and-shrimp-carbonara.webp` | Chicken and Shrimp Carbonara | needed | 3: family-style-meals, classic-entrees, catering | pending |
| 14 | `public/images/classic-entrees/shrimp-scampi.webp` | Shrimp Scampi | needed | 4: family-style-meals, classic-entrees, lunch-menu, catering | pending |
| 15 | `public/images/classic-entrees/cheese-ravioli.webp` | Cheese Ravioli | needed | 5: family-style-meals, classic-entrees, lighter-portions, lunch-menu, catering | pending |
| 16 | `public/images/soups-salad-and-breadsticks/homemade-soups.webp` | Homemade Soups | needed | 5: family-style-meals, soups-salad-and-breadsticks, catering | pending |
| 17 | `public/images/appetizers/breadsticks.webp` | Breadsticks | supplied | 4: family-style-meals, appetizers, soups-salad-and-breadsticks, catering | Golden breadsticks with a garlic and herb topping in a wicker basket lined with a white napkin |
| 18 | `public/images/family-style-meals/large-salad.webp` | Large Salad | needed | 1: family-style-meals | pending |
| 19 | `public/images/appetizers/fried-mozzarella.webp` | Fried Mozzarella | supplied | 2: appetizers, catering | Breaded fried mozzarella sticks on a white plate, one pulled apart to show melted cheese, with a cup of red dipping sauce |
| 20 | `public/images/appetizers/stuffed-ziti-fritta.webp` | Stuffed Ziti Fritta | supplied | 1: appetizers | Breaded fried ziti sticks, two broken open to show pasta and melted cheese, beside a cup of marinara sauce |
| 21 | `public/images/appetizers/dipping-sauces-with-breadsticks.webp` | Dipping Sauces with Breadsticks | supplied | 2: appetizers, soups-salad-and-breadsticks | Breadsticks in a napkin-lined basket beside three cups of dipping sauce: red marinara, white alfredo, and a yellow cheese sauce |
| 22 | `public/images/appetizers/calamari.webp` | Calamari | replacement-needed | 1: appetizers | pending |
| 23 | `public/images/appetizers/meatballs-parmigiana.webp` | Meatballs Parmigiana | replacement-needed | 1: appetizers | pending |
| 24 | `public/images/appetizers/spinach-artichoke-dip.webp` | Spinach-Artichoke Dip | supplied | 2: appetizers, catering | Baked spinach and artichoke dip with browned cheese in a white dish, surrounded by toasted flatbread triangles and bread slices |
| 25 | `public/images/appetizers/lasagna-fritta.webp` | Lasagna Fritta | supplied | 1: appetizers | Fried breaded lasagna pieces topped with red sauce, white sauce drizzle, and grated cheese, one cut open to show the cheese filling |
| 26 | `public/images/appetizers/shrimp-fritto-misto.webp` | Shrimp Fritto Misto | replacement-needed | 1: appetizers | pending |
| 27 | `public/images/appetizers/toasted-ravioli.webp` | Toasted Ravioli | supplied | 2: appetizers, catering | Golden breaded toasted ravioli sprinkled with grated cheese and parsley around a cup of red dipping sauce, one cut open |
| 28 | `public/images/classic-entrees/calabrian-steak-and-shrimp-bucatini.webp` | Calabrian Steak & Shrimp Bucatini | needed | 1: classic-entrees | pending |
| 29 | `public/images/classic-entrees/shrimp-carbonara.webp` | Shrimp Carbonara | needed | 1: classic-entrees | pending |
| 30 | `public/images/classic-entrees/tour-of-italy.webp` | Tour of Italy | needed | 1: classic-entrees | pending |
| 31 | `public/images/classic-entrees/ravioli-carbonara.webp` | Ravioli Carbonara | needed | 1: classic-entrees | pending |
| 32 | `public/images/classic-entrees/spaghetti-and-meatballs.webp` | Spaghetti & Meatballs | needed | 3: classic-entrees, lighter-portions, lunch-menu | pending |
| 33 | `public/images/classic-entrees/stuffed-chicken-marsala.webp` | Stuffed Chicken Marsala | needed | 1: classic-entrees | pending |
| 34 | `public/images/classic-entrees/steak-gorgonzola-alfredo.webp` | Steak Gorgonzola Alfredo | needed | 1: classic-entrees | pending |
| 35 | `public/images/classic-entrees/seafood-alfredo.webp` | Seafood Alfredo | needed | 2: classic-entrees, amazing-alfredos | pending |
| 36 | `public/images/classic-entrees/eggplant-parmigiana.webp` | Eggplant Parmigiana | needed | 3: classic-entrees, lighter-portions, lunch-menu | pending |
| 37 | `public/images/classic-entrees/grilled-chicken-margherita.webp` | Grilled Chicken Margherita | needed | 1: classic-entrees | pending |
| 38 | `public/images/classic-entrees/herb-grilled-salmon.webp` | Herb-Grilled Salmon | needed | 2: classic-entrees, gluten-sensitive | pending |
| 39 | `public/images/classic-entrees/6-oz-sirloin.webp` | 6 oz. Sirloin | needed | 2: classic-entrees, gluten-sensitive | pending |
| 40 | `public/images/classic-entrees/create-your-own-pasta.webp` | Create Your Own Pasta | needed | 1: classic-entrees | pending |
| 41 | `public/images/buy-one-take-one/rigatoni-alla-vodka.webp` | Rigatoni alla Vodka | needed | 1: buy-one-take-one | pending |
| 42 | `public/images/buy-one-take-one/four-cheese-manicotti-with-marinara.webp` | Four-Cheese Manicotti with Marinara | needed | 1: buy-one-take-one | pending |
| 43 | `public/images/soups-salad-and-breadsticks/soup-salad-and-breadsticks.webp` | Soup, Salad & Breadsticks | needed | 3: soups-salad-and-breadsticks, lunch-menu | pending |
| 44 | `public/images/lunch-menu/spaghetti.webp` | Spaghetti | needed | 1: lunch-menu | pending |
| 45 | `public/images/desserts/chocolate-lasagna.webp` | Chocolate Lasagna | needed | 1: desserts | pending |
| 46 | `public/images/desserts/black-tie-mousse-cake.webp` | Black Tie Mousse Cake | needed | 2: desserts, catering | pending |
| 47 | `public/images/desserts/tiramisu.webp` | Tiramisu | needed | 2: desserts, catering | pending |
| 48 | `public/images/desserts/strawberry-cream-cake.webp` | Strawberry Cream Cake | needed | 1: desserts | pending |
| 49 | `public/images/desserts/warm-italian-doughnuts.webp` | Warm Italian Doughnuts | needed | 1: desserts | pending |
| 50 | `public/images/desserts/sicilian-cheesecake-with-strawberry-topping.webp` | Sicilian Cheesecake with Strawberry Topping | needed | 2: desserts, catering | pending |
| 51 | `public/images/drink-menu/gallon-iced-teas-and-raspberry-lemonade.webp` | Gallon Iced Teas & Raspberry Lemonade | needed | 3: drink-menu, non-alcoholic-beverages, catering | pending |
| 52 | `public/images/drink-menu/2-liter-soda.webp` | 2-Liter Soda | needed | 3: drink-menu, non-alcoholic-beverages, catering | pending |
| 53 | `public/images/drink-menu/to-go-fountain-drinks.webp` | To-Go Fountain Drinks | needed | 2: drink-menu, non-alcoholic-beverages | pending |
| 54 | `public/images/drink-menu/raspberry-lemonade.webp` | Raspberry Lemonade | needed | 2: drink-menu, non-alcoholic-beverages | pending |
| 55 | `public/images/drink-menu/classic-lemonade.webp` | Classic Lemonade | needed | 2: drink-menu, non-alcoholic-beverages | pending |
| 56 | `public/images/drink-menu/desert-pear-limonata.webp` | Desert Pear Limonata | needed | 2: drink-menu, non-alcoholic-beverages | pending |
| 57 | `public/images/drink-menu/strawberry-passion-fruit-limonata.webp` | Strawberry-Passion Fruit Limonata | needed | 2: drink-menu, non-alcoholic-beverages | pending |
| 58 | `public/images/drink-menu/mango-passion-fruit-iced-tea.webp` | Mango-Passion Fruit Iced Tea | needed | 2: drink-menu, non-alcoholic-beverages | pending |
| 59 | `public/images/drink-menu/bellini-peach-raspberry-iced-tea.webp` | Bellini Peach-Raspberry Iced Tea | needed | 2: drink-menu, non-alcoholic-beverages | pending |
| 60 | `public/images/drink-menu/fresh-brewed-sweet-iced-tea.webp` | Fresh-Brewed Sweet Iced Tea | needed | 2: drink-menu, non-alcoholic-beverages | pending |
| 61 | `public/images/drink-menu/fresh-brewed-unsweet-iced-tea.webp` | Fresh-Brewed Unsweet Iced Tea | needed | 2: drink-menu, non-alcoholic-beverages | pending |
| 62 | `public/images/drink-menu/cappuccino.webp` | Cappuccino | needed | 2: drink-menu, non-alcoholic-beverages | pending |
| 63 | `public/images/sides-sauces-and-extras/cheese-grater.webp` | Cheese Grater | needed | 1: sides-sauces-and-extras | pending |
| 64 | `public/images/sides-sauces-and-extras/side-of-meatballs.webp` | Side of Meatballs | needed | 1: sides-sauces-and-extras | pending |
| 65 | `public/images/sides-sauces-and-extras/side-of-grilled-chicken.webp` | Side of Grilled Chicken | needed | 2: sides-sauces-and-extras, catering | pending |
| 66 | `public/images/sides-sauces-and-extras/side-of-mashed-potatoes.webp` | Side of Mashed Potatoes | needed | 1: sides-sauces-and-extras | pending |
| 67 | `public/images/sides-sauces-and-extras/side-of-broccoli.webp` | Side of Broccoli | needed | 2: sides-sauces-and-extras, catering | pending |
| 68 | `public/images/sides-sauces-and-extras/side-of-alfredo-sauce.webp` | Side of Alfredo Sauce | needed | 2: sides-sauces-and-extras, catering | pending |
| 69 | `public/images/sides-sauces-and-extras/side-of-marinara-sauce.webp` | Side of Marinara Sauce | needed | 2: sides-sauces-and-extras, catering | pending |
| 70 | `public/images/sides-sauces-and-extras/side-of-meat-sauce.webp` | Side of Meat Sauce | needed | 2: sides-sauces-and-extras, catering | pending |
| 71 | `public/images/sides-sauces-and-extras/side-of-five-cheese-marinara-sauce.webp` | Side of Five Cheese Marinara Sauce | needed | 2: sides-sauces-and-extras, catering | pending |
| 72 | `public/images/non-alcoholic-beverages/lavazza-espresso.webp` | Lavazza Espresso | needed | 1: non-alcoholic-beverages | pending |
| 73 | `public/images/wine-and-beer-to-go/moscato-primo-amore.webp` | Moscato Primo Amore | needed | 1: wine-and-beer-to-go | pending |
| 74 | `public/images/wine-and-beer-to-go/sweet-pink-moscato-blend-confetti.webp` | Sweet Pink Moscato Blend Confetti | needed | 1: wine-and-beer-to-go | pending |
| 75 | `public/images/wine-and-beer-to-go/sweet-red-roscato-rosso-dolce.webp` | Sweet Red Roscato Rosso Dolce | needed | 1: wine-and-beer-to-go | pending |
| 76 | `public/images/wine-and-beer-to-go/red-blend-porta-vita.webp` | Red Blend Porta Vita | needed | 1: wine-and-beer-to-go | pending |
| 77 | `public/images/wine-and-beer-to-go/moscato-castello-del-poggio.webp` | Moscato Castello del Poggio | needed | 1: wine-and-beer-to-go | pending |
| 78 | `public/images/wine-and-beer-to-go/white-zinfandel-sutter-home.webp` | White Zinfandel Sutter Home | needed | 1: wine-and-beer-to-go | pending |
| 79 | `public/images/wine-and-beer-to-go/riesling-chateau-ste-michelle.webp` | Riesling Chateau Ste. Michelle | needed | 1: wine-and-beer-to-go | pending |
| 80 | `public/images/wine-and-beer-to-go/pinot-grigio-cavit.webp` | Pinot Grigio Cavit | needed | 1: wine-and-beer-to-go | pending |
| 81 | `public/images/wine-and-beer-to-go/sauvignon-blanc-starborough.webp` | Sauvignon Blanc Starborough | needed | 1: wine-and-beer-to-go | pending |
| 82 | `public/images/wine-and-beer-to-go/chardonnay-chateau-ste-michelle.webp` | Chardonnay Chateau Ste. Michelle | needed | 1: wine-and-beer-to-go | pending |
| 83 | `public/images/wine-and-beer-to-go/pinot-noir-meiomi.webp` | Pinot Noir Meiomi | needed | 1: wine-and-beer-to-go | pending |
| 84 | `public/images/wine-and-beer-to-go/merlot-beringer.webp` | Merlot Beringer | needed | 1: wine-and-beer-to-go | pending |
| 85 | `public/images/wine-and-beer-to-go/chianti-classico-rocca-delle-macie.webp` | Chianti Classico Rocca delle Macie | needed | 1: wine-and-beer-to-go | pending |
| 86 | `public/images/wine-and-beer-to-go/cabernet-robert-mondavi-private-selection.webp` | Cabernet Robert Mondavi Private Selection | needed | 1: wine-and-beer-to-go | pending |
| 87 | `public/images/wine-and-beer-to-go/budweiser.webp` | Budweiser | needed | 1: wine-and-beer-to-go | pending |
| 88 | `public/images/wine-and-beer-to-go/bud-light.webp` | Bud Light | needed | 1: wine-and-beer-to-go | pending |
| 89 | `public/images/wine-and-beer-to-go/coors-light.webp` | Coors Light | needed | 1: wine-and-beer-to-go | pending |
| 90 | `public/images/wine-and-beer-to-go/michelob-ultra.webp` | Michelob Ultra | needed | 1: wine-and-beer-to-go | pending |
| 91 | `public/images/wine-and-beer-to-go/miller-lite.webp` | Miller Lite | needed | 1: wine-and-beer-to-go | pending |
| 92 | `public/images/gluten-sensitive/zuppa-toscana.webp` | Zuppa Toscana | needed | 1: gluten-sensitive | pending |
| 93 | `public/images/gluten-sensitive/famous-house-salad-without-croutons.webp` | Famous House Salad without Croutons | needed | 1: gluten-sensitive | pending |
| 94 | `public/images/gluten-sensitive/grilled-chicken-parmigiana.webp` | Grilled Chicken Parmigiana | needed | 1: gluten-sensitive | pending |
| 95 | `public/images/gluten-sensitive/rotini-pasta-with-marinara.webp` | Rotini Pasta with Marinara | needed | 1: gluten-sensitive | pending |
| 96 | `public/images/gluten-sensitive/rotini-pasta-with-meat-sauce.webp` | Rotini Pasta with Meat Sauce | needed | 1: gluten-sensitive | pending |
| 97 | `public/images/kids-meal/kids-grilled-chicken-with-rotini-pasta-and-marinara.webp` | Kids Grilled Chicken with Rotini Pasta & Marinara | needed | 2: gluten-sensitive, kids-meal | pending |
| 98 | `public/images/kids-meal/kids-rotini-with-marinara.webp` | Kids Rotini with Marinara | needed | 2: gluten-sensitive, kids-meal | pending |
| 99 | `public/images/kids-meal/kids-rotini-with-meat-sauce.webp` | Kids Rotini with Meat Sauce | needed | 2: gluten-sensitive, kids-meal | pending |
| 100 | `public/images/kids-meal/kids-alfredo-pasta.webp` | Kids Alfredo Pasta | needed | 1: kids-meal | pending |
| 101 | `public/images/kids-meal/kids-pizza.webp` | Kids Pizza | needed | 1: kids-meal | pending |
| 102 | `public/images/kids-meal/kids-chicken-fingers.webp` | Kids Chicken Fingers | needed | 2: kids-meal, catering | pending |
| 103 | `public/images/kids-meal/kids-macaroni-and-cheese.webp` | Kids Macaroni & Cheese | needed | 1: kids-meal | pending |
| 104 | `public/images/kids-meal/kids-meat-sauce-pasta.webp` | Kids Meat Sauce Pasta | needed | 1: kids-meal | pending |
| 105 | `public/images/kids-meal/kids-tomato-sauce-pasta.webp` | Kids Tomato Sauce Pasta | needed | 1: kids-meal | pending |
| 106 | `public/images/kids-meal/kids-five-cheese-marinara-pasta.webp` | Kids Five Cheese Marinara Pasta | needed | 1: kids-meal | pending |
| 107 | `public/images/kids-meal/kids-cheese-ravioli.webp` | Kids Cheese Ravioli | needed | 1: kids-meal | pending |
| 108 | `public/images/catering/chicken-parmigiana-combination.webp` | Chicken Parmigiana Combination | needed | 1: catering | pending |
| 109 | `public/images/catering/lasagna-combination.webp` | Lasagna Combination | needed | 1: catering | pending |
| 110 | `public/images/catering/create-your-own-pasta-station.webp` | Create Your Own Pasta Station | needed | 1: catering | pending |
| 111 | `public/images/catering/italian-meatballs.webp` | Italian Meatballs | needed | 1: catering | pending |
| 112 | `public/images/catering/san-pellegrino-sparkling-1-liter-bottle.webp` | San Pellegrino Sparkling (1-Liter Bottle) | needed | 1: catering | pending |
| 113 | `public/images/catering/acqua-panna-spring-1-liter-bottle.webp` | Acqua Panna Spring (1-Liter Bottle) | needed | 1: catering | pending |
| 114 | `public/images/family-style-meals/family-style-chicken-alfredo-bundle.webp` | Family-Style Chicken Alfredo Bundle | needed | 1: family-style-meals | pending |
| 115 | `public/images/family-style-meals/family-style-chicken-parmigiana-bundle.webp` | Family-Style Chicken Parmigiana Bundle | needed | 1: family-style-meals | pending |
| 116 | `public/images/family-style-meals/family-style-five-cheese-ziti-al-forno-bundle.webp` | Family-Style Five Cheese Ziti al Forno Bundle | needed | 1: family-style-meals | pending |
| 117 | `public/images/classic-entrees/spicy-alfredo-fettuccine.webp` | Spicy Alfredo Fettuccine | needed | 3: classic-entrees, lighter-portions, lunch-menu | pending |
| 118 | `public/images/lunch-menu/chicken-parmigiana-sandwich.webp` | Chicken Parmigiana Sandwich | needed | 1: lunch-menu | pending |
| 119 | `public/images/lunch-menu/eggplant-parmigiana-sandwich.webp` | Eggplant Parmigiana Sandwich | needed | 1: lunch-menu | pending |
| 120 | `public/images/lunch-menu/italian-grilled-chicken-sandwich.webp` | Italian Grilled Chicken Sandwich | needed | 1: lunch-menu | pending |
| 121 | `public/images/lunch-menu/chicken-alfredo-flatbread.webp` | Chicken Alfredo Flatbread | needed | 1: lunch-menu | pending |
| 122 | `public/images/lunch-menu/five-cheese-flatbread.webp` | Five Cheese Flatbread | needed | 1: lunch-menu | pending |
| 123 | `public/images/lunch-menu/classic-pepperoni-flatbread.webp` | Classic Pepperoni Flatbread | needed | 1: lunch-menu | pending |
| 124 | `public/images/desserts/pumpkin-cookie-butter-cheesecake.webp` | Pumpkin Cookie Butter Cheesecake | needed | 2: desserts, catering | pending |
| 125 | `public/images/sides-sauces-and-extras/side-of-crispy-shrimp-fritta.webp` | Side of Crispy Shrimp Fritta | needed | 1: sides-sauces-and-extras | pending |
| 126 | `public/images/sides-sauces-and-extras/side-of-crispy-chicken-fritta.webp` | Side of Crispy Chicken Fritta | needed | 1: sides-sauces-and-extras | pending |
| 127 | `public/images/sides-sauces-and-extras/italian-sausage.webp` | Italian Sausage | needed | 2: sides-sauces-and-extras, catering | pending |
| 128 | `public/images/drink-menu/half-iced-tea-and-half-lemonade.webp` | Half Iced Tea + Half Lemonade | needed | 2: drink-menu, non-alcoholic-beverages | pending |
| 129 | `public/images/wine-and-beer-to-go/heineken-0-0-non-alcoholic.webp` | Heineken 0.0 Non-Alcoholic | needed | 1: wine-and-beer-to-go | pending |

## Products that reuse another photo

| Product | Uses photo of |
|---|---|
| `spaghetti-with-marinara-sauce` | `spaghetti-with-marinara` |
| `cheese-ravioli-with-meat-or-marinara-sauce` | `cheese-ravioli` |
| `weekday-lunch-special` | `soup-salad-and-breadsticks` |
| `soup-salad-and-breadsticks-lunch` | `soup-salad-and-breadsticks` |
| `grilled-chicken-with-rotini-pasta-and-marinara` | `kids-grilled-chicken-with-rotini-pasta-and-marinara` |
| `rotini-with-marinara` | `kids-rotini-with-marinara` |
| `rotini-with-meat-sauce` | `kids-rotini-with-meat-sauce` |
| `cheese-ravioli-with-marinara-or-meat-sauce` | `cheese-ravioli` |
| `toasted-beef-ravioli` | `toasted-ravioli` |
| `alfredo-dipping-sauce` | `side-of-alfredo-sauce` |
| `five-cheese-marinara-dipping-sauce` | `side-of-five-cheese-marinara-sauce` |
| `marinara-dipping-sauce` | `side-of-marinara-sauce` |
| `meat-dipping-sauce` | `side-of-meat-sauce` |
| `grilled-chicken-breasts` | `side-of-grilled-chicken` |
| `chicken-fingers` | `kids-chicken-fingers` |
| `broccoli` | `side-of-broccoli` |
| `sicilian-cheesecake` | `sicilian-cheesecake-with-strawberry-topping` |

## Optional format-specific photos

| Offering | Suggested file |
|---|---|
| `family-style-meals--family-style-lasagna-bundle` | `public/images/family-style-meals/family-style-lasagna-bundle--family-style.webp` |
| `family-style-meals--family-style-lasagna-bundle--large` | `public/images/family-style-meals/family-style-lasagna-bundle--family-style.webp` |
| `family-style-meals--famous-house-salad` | `public/images/family-style-meals/famous-house-salad--family-style.webp` |
| `family-style-meals--chicken-alfredo` | `public/images/family-style-meals/chicken-alfredo--family-style.webp` |
| `family-style-meals--chicken-parmigiana` | `public/images/family-style-meals/chicken-parmigiana--family-style.webp` |
| `family-style-meals--fettuccine-alfredo` | `public/images/family-style-meals/fettuccine-alfredo--family-style.webp` |
| `family-style-meals--shrimp-alfredo` | `public/images/family-style-meals/shrimp-alfredo--family-style.webp` |
| `family-style-meals--five-cheese-ziti-al-forno` | `public/images/family-style-meals/five-cheese-ziti-al-forno--family-style.webp` |
| `family-style-meals--spaghetti-with-meat-sauce` | `public/images/family-style-meals/spaghetti-with-meat-sauce--family-style.webp` |
| `family-style-meals--spaghetti-with-marinara-sauce` | `public/images/family-style-meals/spaghetti-with-marinara-sauce--family-style.webp` |
| `family-style-meals--chicken-tortelloni-alfredo` | `public/images/family-style-meals/chicken-tortelloni-alfredo--family-style.webp` |
| `family-style-meals--lasagna-classico` | `public/images/family-style-meals/lasagna-classico--family-style.webp` |
| `family-style-meals--chicken-scampi` | `public/images/family-style-meals/chicken-scampi--family-style.webp` |
| `family-style-meals--chicken-and-shrimp-carbonara` | `public/images/family-style-meals/chicken-and-shrimp-carbonara--family-style.webp` |
| `family-style-meals--shrimp-scampi` | `public/images/family-style-meals/shrimp-scampi--family-style.webp` |
| `family-style-meals--cheese-ravioli-with-meat-or-marinara-sauce` | `public/images/family-style-meals/cheese-ravioli-with-meat-or-marinara-sauce--family-style.webp` |
| `family-style-meals--homemade-soups--large` | `public/images/family-style-meals/homemade-soups--family-style.webp` |
| `family-style-meals--homemade-soups` | `public/images/family-style-meals/homemade-soups--family-style.webp` |
| `family-style-meals--breadsticks` | `public/images/family-style-meals/breadsticks--family-style.webp` |
| `catering--famous-house-salad` | `public/images/catering/famous-house-salad--catering.webp` |
| `catering--chicken-alfredo` | `public/images/catering/chicken-alfredo--catering.webp` |
| `catering--chicken-parmigiana` | `public/images/catering/chicken-parmigiana--catering.webp` |
| `catering--fettuccine-alfredo` | `public/images/catering/fettuccine-alfredo--catering.webp` |
| `catering--shrimp-alfredo` | `public/images/catering/shrimp-alfredo--catering.webp` |
| `catering--five-cheese-ziti-al-forno` | `public/images/catering/five-cheese-ziti-al-forno--catering.webp` |
| `catering--spaghetti-with-meat-sauce` | `public/images/catering/spaghetti-with-meat-sauce--catering.webp` |
| `catering--spaghetti-with-marinara-sauce` | `public/images/catering/spaghetti-with-marinara-sauce--catering.webp` |
| `catering--chicken-tortelloni-alfredo` | `public/images/catering/chicken-tortelloni-alfredo--catering.webp` |
| `catering--lasagna-classico` | `public/images/catering/lasagna-classico--catering.webp` |
| `catering--chicken-scampi` | `public/images/catering/chicken-scampi--catering.webp` |
| `catering--chicken-and-shrimp-carbonara` | `public/images/catering/chicken-and-shrimp-carbonara--catering.webp` |
| `catering--shrimp-scampi` | `public/images/catering/shrimp-scampi--catering.webp` |
| `catering--cheese-ravioli-with-marinara-or-meat-sauce` | `public/images/catering/cheese-ravioli-with-marinara-or-meat-sauce--catering.webp` |
| `catering--homemade-soups--large` | `public/images/catering/homemade-soups--catering.webp` |
| `catering--homemade-soups` | `public/images/catering/homemade-soups--catering.webp` |
| `catering--breadsticks` | `public/images/catering/breadsticks--catering.webp` |
| `catering--fried-mozzarella` | `public/images/catering/fried-mozzarella--catering.webp` |
| `catering--spinach-artichoke-dip` | `public/images/catering/spinach-artichoke-dip--catering.webp` |
| `catering--black-tie-mousse-cake` | `public/images/catering/black-tie-mousse-cake--catering.webp` |
| `catering--tiramisu` | `public/images/catering/tiramisu--catering.webp` |
| `catering--2-liter-soda` | `public/images/catering/2-liter-soda--catering.webp` |
| `catering--toasted-beef-ravioli` | `public/images/catering/toasted-beef-ravioli--catering.webp` |
| `catering--alfredo-dipping-sauce` | `public/images/catering/alfredo-dipping-sauce--catering.webp` |
| `catering--five-cheese-marinara-dipping-sauce` | `public/images/catering/five-cheese-marinara-dipping-sauce--catering.webp` |
| `catering--marinara-dipping-sauce` | `public/images/catering/marinara-dipping-sauce--catering.webp` |
| `catering--meat-dipping-sauce` | `public/images/catering/meat-dipping-sauce--catering.webp` |
| `catering--grilled-chicken-breasts` | `public/images/catering/grilled-chicken-breasts--catering.webp` |
| `catering--chicken-fingers` | `public/images/catering/chicken-fingers--catering.webp` |
| `catering--broccoli` | `public/images/catering/broccoli--catering.webp` |
| `catering--sicilian-cheesecake` | `public/images/catering/sicilian-cheesecake--catering.webp` |
| `catering--gallon-iced-teas-and-raspberry-lemonade` | `public/images/catering/gallon-iced-teas-and-raspberry-lemonade--catering.webp` |
| `catering--pumpkin-cookie-butter-cheesecake` | `public/images/catering/pumpkin-cookie-butter-cheesecake--catering.webp` |
| `catering--italian-sausage` | `public/images/catering/italian-sausage--catering.webp` |
