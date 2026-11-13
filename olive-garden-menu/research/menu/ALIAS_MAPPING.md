# Alias Mapping

**Date:** 2026-11-12. **Owner Decision 3:** shared product data and photos only for confirmed identical products or the same dish in another portion. Every inventory entry is kept; prices, calories, portions, and serving sizes stay separate. Uncertain or different items are not merged.

| Case | Decision | Evidence | Offerings (all kept) |
|---|---|---|---|
| A1 | **different** | Rotini Pasta with Marinara is the adult gluten-sensitive entrée ($13.99, 530 cal). Rotini with Marinara is officially the kids gluten-sensitive meal ($7.49, 260 cal). Not merged. | `gluten-sensitive--rotini-pasta-with-marinara`, `gluten-sensitive--rotini-with-marinara` |
| A2 | **different** | Same pattern as A1: adult Rotini Pasta with Meat Sauce ($13.99, 680 cal) vs kids Rotini with Meat Sauce ($7.49, 340 cal). Not merged. | `gluten-sensitive--rotini-pasta-with-meat-sauce`, `gluten-sensitive--rotini-with-meat-sauce` |
| A3 | **identical** | Gluten-sensitive listing and Kids listing are the same kids meal (same description, $9.98, 430 cal). Shared product data and image; both entries kept. | `gluten-sensitive--grilled-chicken-with-rotini-pasta-and-marinara`, `kids-meal--kids-grilled-chicken-with-rotini-pasta-and-marinara` |
| A4 | **different (kept separate)** | Owner Decision 2: map only if identity, description, and serving size match. "Large Salad" has no official listing, description, or serving size (not on the Millenia menu, not in the nutrition PDF), so it cannot be matched to Our Famous Jumbo House Salad (Serves 6, 1,650 cal, 12 breadsticks). Both offerings kept separately; no shared data. | `family-style-meals--famous-house-salad`, `family-style-meals--large-salad` |
| A5 | **different** | Famous House Salad without croutons is a separate gluten-sensitive item ($9.29, 110 cal vs 290 cal). Not merged. | `gluten-sensitive--famous-house-salad-without-croutons`, `family-style-meals--famous-house-salad`, `soups-salad-and-breadsticks--famous-house-salad`, `catering--famous-house-salad` |
| A6 | **same dish, different portion** | Toasted Ravioli (appetizer) is filled with seasoned beef; the catering pan is named Toasted Beef Ravioli. Shared product information and photo; prices and calories kept separate. | `appetizers--toasted-ravioli`, `catering--toasted-beef-ravioli` |
| A7 | **same dish, different portion** | Both are ricotta cheesecake on a shortbread crust with strawberry sauce (700 cal per slice). Dessert slice vs half/whole catering cake. Shared product data and photo; values separate. | `desserts--sicilian-cheesecake-with-strawberry-topping`, `catering--sicilian-cheesecake` |
| A8 | **same dish, different portion** | Cheese Ravioli (entrée, lighter, lunch) and the two "with Marinara or Meat Sauce" pans are the same dish with a sauce choice. The two pan names are identical items (same price and calories). Shared product data; portions separate. | `family-style-meals--cheese-ravioli-with-meat-or-marinara-sauce`, `classic-entrees--cheese-ravioli`, `lighter-portions--cheese-ravioli`, `lunch-menu--cheese-ravioli`, `catering--cheese-ravioli-with-marinara-or-meat-sauce` |
| A9 | **partly resolved** | Spaghetti with Marinara Sauce (pans) and Spaghetti with Marinara (entrée) are the same dish, different portion: shared product data. Lunch "Spaghetti" is a choice of marinara or meat sauce, so it stays its own product. | `family-style-meals--spaghetti-with-marinara-sauce`, `catering--spaghetti-with-marinara-sauce`, `classic-entrees--spaghetti-with-marinara`, `lunch-menu--spaghetti` |
| A10 | **identical (lunch) / same meal (dinner)** | Weekday Lunch Special and Soup, Salad and Breadsticks (Lunch) are the same lunch meal ($9.99, 400-520 cal); hours differ on the two cards (11-2:30 vs 11-3). The dinner version ($13.49) is the same meal at another time and price. Shared product data and image; prices separate. | `soups-salad-and-breadsticks--soup-salad-and-breadsticks`, `lunch-menu--soup-salad-and-breadsticks-lunch`, `soups-salad-and-breadsticks--weekday-lunch-special` |
| A11 | **different** | Meatballs Parmigiana is a baked appetizer with cheese and breadcrumbs. Side of Meatballs and catering Italian Meatballs are plain meatballs in different portions, but the side's count is not stated. Not merged. | `sides-sauces-and-extras--side-of-meatballs`, `catering--italian-meatballs`, `appetizers--meatballs-parmigiana` |
| A12 | **same food, different portion** | Side of Grilled Chicken (130 cal) and catering Grilled Chicken Breasts (6 sliced breasts, 810 cal). Shared product data and photo; values separate. | `sides-sauces-and-extras--side-of-grilled-chicken`, `catering--grilled-chicken-breasts` |
| A13 | **same food, different portion** | Both are parmesan garlic broccoli (side 150 cal; catering tray 610 cal). Shared product data and photo. | `sides-sauces-and-extras--side-of-broccoli`, `catering--broccoli` |
| A14 | **identical** | Each large side sauce and its catering dipping sauce have the same price and calories (alfredo $11.29 / 1,750; marinara, meat, five cheese marinara $9.79 / 290, 600, 800). Shared product data and photo; both entries kept. | `sides-sauces-and-extras--side-of-alfredo-sauce--large`, `catering--alfredo-dipping-sauce`, `sides-sauces-and-extras--side-of-marinara-sauce--large`, `catering--marinara-dipping-sauce`, `sides-sauces-and-extras--side-of-meat-sauce--large`, `catering--meat-dipping-sauce`, `sides-sauces-and-extras--side-of-five-cheese-marinara-sauce--large`, `catering--five-cheese-marinara-dipping-sauce` |
| A15 | **same food, different portion** | Both are lightly breaded chicken tenders (kids meal vs 18-piece catering tray). Shared product data and photo; values separate. | `kids-meal--kids-chicken-fingers`, `catering--chicken-fingers` |
| A16 | **different** | Kids Tomato/Meat Sauce with Choice of Pasta (fettuccine, shells, spaghetti) vs Kids Rotini (gluten-free rotini). Not merged. | `kids-meal--kids-tomato-sauce-pasta`, `kids-meal--kids-rotini-with-marinara`, `kids-meal--kids-meat-sauce-pasta`, `kids-meal--kids-rotini-with-meat-sauce` |
| A17 | **related (option of)** | Zuppa Toscana is one of the four Homemade Soups. The gluten-sensitive Zuppa Toscana entry stays separate; no merge. | `gluten-sensitive--zuppa-toscana`, `family-style-meals--homemade-soups`, `soups-salad-and-breadsticks--homemade-soups`, `catering--homemade-soups` |

## Shared product data and photos

| Product | Reuses data/photo of | Reason |
|---|---|---|
| `grilled-chicken-with-rotini-pasta-and-marinara` | `kids-grilled-chicken-with-rotini-pasta-and-marinara` | A3 |
| `rotini-with-marinara` | `kids-rotini-with-marinara` | A1 |
| `rotini-with-meat-sauce` | `kids-rotini-with-meat-sauce` | A2 |
| `toasted-beef-ravioli` | `toasted-ravioli` | A6 |
| `sicilian-cheesecake` | `sicilian-cheesecake-with-strawberry-topping` | A7 |
| `cheese-ravioli-with-marinara-or-meat-sauce` | `cheese-ravioli` | A8 |
| `cheese-ravioli-with-meat-or-marinara-sauce` | `cheese-ravioli` | A8 |
| `spaghetti-with-marinara-sauce` | `spaghetti-with-marinara` | A9 |
| `soup-salad-and-breadsticks-lunch` | `soup-salad-and-breadsticks` | A10 |
| `weekday-lunch-special` | `soup-salad-and-breadsticks` | A10 |
| `grilled-chicken-breasts` | `side-of-grilled-chicken` | A12 |
| `broccoli` | `side-of-broccoli` | A13 |
| `alfredo-dipping-sauce` | `side-of-alfredo-sauce` | A14 |
| `five-cheese-marinara-dipping-sauce` | `side-of-five-cheese-marinara-sauce` | A14 |
| `marinara-dipping-sauce` | `side-of-marinara-sauce` | A14 |
| `meat-dipping-sauce` | `side-of-meat-sauce` | A14 |
| `chicken-fingers` | `kids-chicken-fingers` | A15 |

Production data (`content/menu/`) is not changed yet. When approved, these mappings set a shared image/description; the offerings and their values stay separate.
