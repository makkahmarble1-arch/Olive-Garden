# Allergen Data Report

**Source:** Olive Garden *Allergen Guide (U.S. Restaurants, excludes Hawaii)*,
footer code **US_101926**, 11 pages (PDF created 2026-09-30), supplied by the
owner on 2026-11-15. **Entered:** 112 rows →
`content/menu/nutrition/allergen-guide.ts` with the PREP marks (fried in soy
oil / grilled; a "●" glyph in the PDF) and the 12 allergen columns exactly as
printed: dairy, eggs, fish, crustacean, mollusk, tree nuts, peanuts, wheat,
gluten, soy, sesame, sulfites. A row with no marks has `contains: []` (the
guide marks none); it is never shown as "allergen-free".

## Official statements kept (page 1, paraphrased on item pages)

- Based on supplier information; does not show items made in a facility with an allergen.
- Shared cooking/prep areas: cross-contact cannot be completely ruled out; no item guaranteed free of any allergen.
- Fryer and grill items are marked because of special cross-contact risk.
- Pastas with and without egg share one pasta cooker.
- Kitchens are not gluten-free; cross-contact with gluten is possible.
- Note on soy: the readable part says the FDA does not consider highly refined
  soybean oil a major food allergen; **the rest of that sentence is cut off in
  the PDF itself**, so the site does not repeat it.
- Guests with a food allergy should notify the server/manager.

Stored in `allergenGuideNotes` (`content/menu/nutrition/documents.ts`).

## Offering statuses (231 offerings)

| Status | Offerings |
|---|---:|
| not-covered | 117 |
| exact | 69 |
| option-dependent | 14 |
| composite | 13 |
| same-item | 12 |
| not-in-guide | 4 |
| multi-row | 1 |
| not-applicable | 1 |

"not-covered" = the guide has no section for catering, family-style, drinks,
wine/beer, Buy One Take One or bundles. "option-dependent" = the guide lists
each version (e.g. Chicken Alfredo grilled vs crispy, Cheese Ravioli marinara
vs meat sauce) and the marks differ by version. Lunch and lighter portions use
the ENTRÉES row of the same dish ("exact"/"same-item"); the guide lists entrées
once, not per portion.

## Fried Mozzarella

Row `a2-fried-mozzarella`, page 2, APPETIZERS: **fried in soy oil; contains
dairy, wheat, gluten, soy.** Not marked: eggs, fish, crustacean, mollusk, tree
nuts, peanuts, sesame, sulfites. Visually verified against the rendered page.

## Offerings with allergen rows

| Offering | Status | Row | Prep | Contains |
|---|---|---|---|---|
| `appetizers--breadsticks` | same-item | p2 "Breadstick with garlic topping" | — | wheat, gluten, soy |
| `appetizers--fried-mozzarella` | exact | p2 "Fried Mozzarella" | fried in soy oil | dairy, wheat, gluten, soy |
| `appetizers--stuffed-ziti-fritta` | exact | p2 "Stuffed Ziti Fritta" | fried in soy oil | dairy, eggs, wheat, gluten, soy |
| `appetizers--calamari` | exact | p2 "Calamari" | fried in soy oil | dairy, eggs, mollusk, wheat, gluten, soy |
| `appetizers--meatballs-parmigiana` | exact | p2 "Meatballs Parmigiana" | — | dairy, eggs, wheat, gluten, soy |
| `appetizers--spinach-artichoke-dip` | exact | p2 "Spinach-Artichoke Dip with flatbread crisps" | fried in soy oil | dairy, wheat, gluten |
| `appetizers--lasagna-fritta` | exact | p2 "Lasagna Fritta" | fried in soy oil | dairy, eggs, wheat, gluten, soy |
| `appetizers--shrimp-fritto-misto` | exact | p2 "Shrimp Fritto Misto" | fried in soy oil | dairy, eggs, crustacean, wheat, gluten, soy, sulfites |
| `appetizers--toasted-ravioli` | exact | p2 "Toasted Ravioli" | fried in soy oil | dairy, eggs, wheat, gluten, soy |
| `classic-entrees--chicken-parmigiana` | exact | p6 "Chicken Parmigiana" | fried in soy oil | dairy, wheat, gluten, soy |
| `classic-entrees--fettuccine-alfredo` | exact | p6 "Fettuccine Alfredo" | — | dairy, wheat, gluten |
| `classic-entrees--shrimp-alfredo` | exact | p7 "Shrimp Alfredo" | — | dairy, crustacean, wheat, gluten, sulfites |
| `classic-entrees--five-cheese-ziti-al-forno` | exact | p6 "Five Cheese Ziti al Forno" | — | dairy, wheat, gluten, soy |
| `classic-entrees--spaghetti-with-meat-sauce` | exact | p7 "Spaghetti with Meat Sauce" | — | wheat, gluten, soy |
| `classic-entrees--lasagna-classico` | exact | p6 "Lasagna Classico" | — | dairy, wheat, gluten, soy |
| `classic-entrees--chicken-scampi` | exact | p6 "Chicken Scampi" | — | dairy, wheat, gluten, soy, sulfites |
| `classic-entrees--shrimp-scampi` | exact | p7 "Shrimp Scampi" | — | dairy, crustacean, wheat, gluten, soy, sulfites |
| `classic-entrees--shrimp-carbonara` | exact | p7 "Shrimp Carbonara" | — | dairy, crustacean, wheat, gluten, sulfites |
| `classic-entrees--tour-of-italy` | exact | p8 "Tour of Italy" | fried in soy oil | dairy, wheat, gluten, soy |
| `classic-entrees--ravioli-carbonara` | exact | p6 "Ravioli Carbonara" | — | dairy, eggs, wheat, gluten, soy |
| `classic-entrees--spaghetti-with-marinara` | exact | p7 "Spaghetti with Marinara Sauce" | — | wheat, gluten, soy |
| `classic-entrees--stuffed-chicken-marsala` | exact | p7 "Stuffed Chicken Marsala" | grilled | dairy, wheat, gluten, soy, sulfites |
| `classic-entrees--steak-gorgonzola-alfredo` | exact | p7 "Steak Gorgonzola Alfredo" | grilled | dairy, wheat, gluten, sulfites |
| `classic-entrees--seafood-alfredo` | exact | p7 "Seafood Alfredo" | — | dairy, crustacean, mollusk, wheat, gluten, sulfites |
| `classic-entrees--eggplant-parmigiana` | exact | p6 "Eggplant Parmigiana" | fried in soy oil | dairy, wheat, gluten, soy |
| `classic-entrees--grilled-chicken-margherita` | exact | p6 "Grilled Chicken Margherita" | grilled | dairy, wheat, gluten, soy, sulfites |
| `classic-entrees--herb-grilled-salmon` | exact | p6 "Herb-Grilled Salmon" | grilled | dairy, fish |
| `classic-entrees--6-oz-sirloin` | exact | p8 "6 oz. Sirloin" | grilled | dairy, wheat, gluten |
| `classic-entrees--spicy-alfredo-fettuccine` | exact | p5 "Spicy Alfredo Fettuccine" | — | dairy, wheat, gluten |
| `amazing-alfredos--fettuccine-alfredo` | exact | p6 "Fettuccine Alfredo" | — | dairy, wheat, gluten |
| `amazing-alfredos--shrimp-alfredo` | exact | p7 "Shrimp Alfredo" | — | dairy, crustacean, wheat, gluten, sulfites |
| `amazing-alfredos--seafood-alfredo` | exact | p7 "Seafood Alfredo" | — | dairy, crustacean, mollusk, wheat, gluten, sulfites |
| `soups-salad-and-breadsticks--famous-house-salad` | same-item | p2 "Salad with Signature Italian Dressing" | — | dairy, eggs, wheat, gluten, sulfites |
| `soups-salad-and-breadsticks--breadsticks` | same-item | p2 "Breadstick with garlic topping" | — | wheat, gluten, soy |
| `lighter-portions--chicken-parmigiana` | exact | p6 "Chicken Parmigiana" | fried in soy oil | dairy, wheat, gluten, soy |
| `lighter-portions--fettuccine-alfredo` | exact | p6 "Fettuccine Alfredo" | — | dairy, wheat, gluten |
| `lighter-portions--five-cheese-ziti-al-forno` | exact | p6 "Five Cheese Ziti al Forno" | — | dairy, wheat, gluten, soy |
| `lighter-portions--lasagna-classico` | exact | p6 "Lasagna Classico" | — | dairy, wheat, gluten, soy |
| `lighter-portions--eggplant-parmigiana` | exact | p6 "Eggplant Parmigiana" | fried in soy oil | dairy, wheat, gluten, soy |
| `lighter-portions--spicy-alfredo-fettuccine` | same-item | p5 "Spicy Alfredo Fettuccine" | — | dairy, wheat, gluten |
| `lunch-menu--chicken-parmigiana` | exact | p6 "Chicken Parmigiana" | fried in soy oil | dairy, wheat, gluten, soy |
| `lunch-menu--fettuccine-alfredo` | exact | p6 "Fettuccine Alfredo" | — | dairy, wheat, gluten |
| `lunch-menu--five-cheese-ziti-al-forno` | exact | p6 "Five Cheese Ziti al Forno" | — | dairy, wheat, gluten, soy |
| `lunch-menu--lasagna-classico` | exact | p6 "Lasagna Classico" | — | dairy, wheat, gluten, soy |
| `lunch-menu--shrimp-scampi` | exact | p7 "Shrimp Scampi" | — | dairy, crustacean, wheat, gluten, soy, sulfites |
| `lunch-menu--eggplant-parmigiana` | exact | p6 "Eggplant Parmigiana" | fried in soy oil | dairy, wheat, gluten, soy |
| `lunch-menu--spicy-alfredo-fettuccine` | same-item | p5 "Spicy Alfredo Fettuccine" | — | dairy, wheat, gluten |
| `lunch-menu--eggplant-parmigiana-sandwich` | exact | p8 "Eggplant Parmigiana Sandwich (with fries)" | fried in soy oil | dairy, wheat, gluten, soy, sulfites |
| `lunch-menu--italian-grilled-chicken-sandwich` | exact | p8 "Italian Grilled Chicken Sandwich (with fries)" | fried in soy oil, grilled | dairy, eggs, wheat, gluten, sulfites |
| `lunch-menu--chicken-alfredo-flatbread` | exact | p8 "Chicken Alfredo Flatbread" | — | dairy, wheat, gluten, sulfites |
| `lunch-menu--five-cheese-flatbread` | exact | p8 "Five Cheese Flatbread" | — | dairy, wheat, gluten, soy, sulfites |
| `lunch-menu--classic-pepperoni-flatbread` | exact | p8 "Classic Pepperoni Flatbread" | — | dairy, wheat, gluten, soy, sulfites |
| `desserts--chocolate-lasagna` | exact | p11 "Chocolate Lasagna" | — | dairy, eggs, wheat, gluten, soy |
| `desserts--black-tie-mousse-cake` | exact | p10 "Black Tie Mousse Cake" | — | dairy, eggs, wheat, gluten, soy |
| `desserts--tiramisu` | exact | p11 "Tiramisu" | — | dairy, eggs, wheat, gluten, soy |
| `desserts--strawberry-cream-cake` | exact | p11 "Strawberry Cream Cake" | — | dairy, eggs, wheat, gluten |
| `desserts--warm-italian-doughnuts` | exact | p11 "Warm Italian Doughnuts" | fried in soy oil | dairy, wheat, gluten, soy |
| `desserts--sicilian-cheesecake-with-strawberry-topping` | exact | p11 "Sicilian Cheesecake with Strawberry Topping" | — | dairy, eggs, wheat, gluten, soy |
| `desserts--pumpkin-cookie-butter-cheesecake` | exact | p11 "Pumpkin Cookie Butter Cheesecake" | — | dairy, eggs, wheat, gluten, soy |
| `sides-sauces-and-extras--side-of-meatballs` | exact | p9 "Meatballs (with marinara)" | — | dairy, eggs, wheat, gluten, soy |
| `sides-sauces-and-extras--side-of-grilled-chicken` | same-item | p4 "Grilled Chicken" | grilled | none marked |
| `sides-sauces-and-extras--side-of-mashed-potatoes` | exact | p9 "Mashed Potatoes" | — | dairy |
| `sides-sauces-and-extras--side-of-broccoli` | exact | p9 "Parmesan Garlic Broccoli" | — | dairy |
| `sides-sauces-and-extras--side-of-alfredo-sauce--large` | same-item | p4 "Alfredo Sauce" | — | dairy, wheat, gluten |
| `sides-sauces-and-extras--side-of-marinara-sauce--large` | same-item | p4 "Marinara" | — | soy |
| `sides-sauces-and-extras--side-of-meat-sauce--large` | same-item | p4 "Meat Sauce" | — | soy |
| `sides-sauces-and-extras--side-of-five-cheese-marinara-sauce--large` | same-item | p4 "Five Cheese Marinara Sauce" | — | dairy, wheat, gluten, soy |
| `sides-sauces-and-extras--side-of-crispy-shrimp-fritta` | same-item | p4 "Crispy Shrimp Fritta" | fried in soy oil | dairy, crustacean, wheat, gluten, sulfites |
| `sides-sauces-and-extras--side-of-crispy-chicken-fritta` | same-item | p4 "Crispy Chicken Fritta" | fried in soy oil | dairy, wheat, gluten |
| `sides-sauces-and-extras--italian-sausage` | exact | p9 "Italian Sausage (with marinara)" | — | soy |
| `gluten-sensitive--herb-grilled-salmon` | exact | p10 "Herb-Grilled Salmon" | grilled | dairy, fish |
| `gluten-sensitive--zuppa-toscana` | exact | p10 "Zuppa Toscana Soup" | — | dairy |
| `gluten-sensitive--famous-house-salad-without-croutons` | exact | p9 "Famous House Salad without Croutons" | — | dairy, eggs, sulfites |
| `gluten-sensitive--grilled-chicken-parmigiana` | exact | p10 "Grilled Chicken Parmigiana with Rotini & Marinara" | grilled | dairy, eggs, soy |
| `gluten-sensitive--6-oz-sirloin` | exact | p10 "6 oz. Sirloin" | grilled | dairy |
| `gluten-sensitive--rotini-pasta-with-marinara` | exact | p10 "Rotini Pasta with Marinara" | — | eggs, soy |
| `gluten-sensitive--rotini-pasta-with-meat-sauce` | exact | p10 "Rotini Pasta with Meat Sauce" | — | eggs, soy |
| `kids-meal--kids-pizza` | exact | p8 "Cheese Pizza" | — | dairy, wheat, gluten |
| `kids-meal--kids-chicken-fingers` | exact | p9 "Chicken Fingers" | fried in soy oil | wheat, gluten |
| `kids-meal--kids-macaroni-and-cheese` | exact | p9 "Macaroni & Cheese" | — | dairy, wheat, gluten |
| `kids-meal--kids-cheese-ravioli` | exact | p8 "Cheese Ravioli" | — | dairy, eggs, wheat, gluten |
