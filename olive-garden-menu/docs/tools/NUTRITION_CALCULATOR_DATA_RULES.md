# Nutrition & Meal Price Calculator: Data Rules

**2026-11-20.** Code: `lib/calculator-data.ts` (items), `lib/calculator-math.ts` (totals). Every rule below is checked by `validateCalculatorData()` (build) or `npm run test:calculator`. The general research rules of `docs/MENU_RESEARCH_PLAN.md` and `docs/product-pages/NUTRITION_ALLERGEN_DATA.md` apply unchanged.

## 1. One item per dish, no duplicate records

- One calculator item per product (`content/menu/products.ts` id). Offerings of the same dish in other categories become its **choices** (portion or version): regular, lunch, lighter portion, kids, gluten-sensitive, side, to go, family-style, catering.
- An offering that an item page lists as the **same dish** under another product record (`equivalentOfferingIds`: catering tray, gluten-sensitive or kids listing) joins that page's item.
- Identical choices (same price, calories, official row and version) listed in several categories are **one choice** that remembers all its categories (e.g. Chicken Alfredo in Classic Entrees and Amazing Alfredos; a family-style pan and the same catering pan; "6 breadsticks, baked" and "6 breadsticks (baked or unbaked)").
- No new records were created; ids, names, prices, calories, images and rows are read from the shared data.

## 2. Choices (portions and versions)

Priority for each offering:
1. **Item page with versions** (version-aware pages): each officially listed version becomes a choice with its own price, calories and official row. This also applies to the same listing in other categories when price and calories match the page's main listing (e.g. the 2-liter soda under Drinks and Catering).
2. **Offering options** (sizes, pans, kids pasta shapes): each option with its own price and calories.
3. Otherwise the offering itself.

Labels name the portion only when the item has more than one portion ("Lunch", "Family-style · Catering: Pan with broccoli"); two plain listings with the same portion get their size ("Bundle: Serves 4-6", "Family-style: Half gallon, serves 6").

## 3. Excluded entries (16 offerings, with reasons)

| Reason | Offerings |
|---|---|
| Promotion entry ($6 Take Home add-on: conditional price, no calories) | 7 Buy One Take One entries |
| Group of separate items (each item is listed on its own) | 5 Homemade Soups group entries (each soup has its own item) |
| Marked currently unavailable | 2 Mango Passion Fruit Iced Tea entries |
| Not on the current online menu | Large Salad |
| Not a food or drink item | Cheese Grater (merchandise) |

Owner decision 2026-11-20: the Buy One Take One / $6 Take Home promotion entries stay out of the calculator (their price depends on buying another entrée).

So the category filter lists **15 of the 17 categories**: Buy One Take One has only promotion entries (its dishes are available through their regular versions), and Create Your Own Pasta has no offerings of its own (the builder is listed under Classic Entrees with its official calorie range).

## 4. Calories

- The verified value of exactly that choice. A range (e.g. a sauce or soup choice, combinations "or more") stays a **range**; totals add the minimums and the maximums separately.
- Calories printed **per slice or per breadstick** are never paired with a whole-cake or whole-order price: such a choice shows "Calories are not listed for this size" (catering cakes) and the calorie total becomes incomplete.
- Calculated values (kids pasta = pasta + sauce, breadstick counts, dipping sauces) keep the "Calc." label.

## 5. Protein, carbohydrates, total fat, sodium

- Only from an official U.S. nutrition guide row (US_101926) that describes **exactly** that choice: the version's own row, or one of the offering's mapped rows (`exact`, `same-item`, `variants`) whose calories equal the choice's single calorie value.
- Never from another version, size or portion, never from a generic row (wines, beers), never for a range, never for a bundle, combination or composite meal.
- Printed "less than n" values are kept: totals count them as n and show "≤".
- Coverage: **150 of 219 choices** have all four nutrients from an official row; 61 more have calories only; 8 have neither calories nor nutrients for that size (they still have a verified price).

## 6. Prices

- The latest verified online pickup price of exactly that choice (reference restaurant, internal only), shown with "Prices last verified: Month Year" and "Prices may vary by location across the USA."
- No discounts, coupons, promotions, taxes, tips or fees. Fixed disclosure on the tool: "Prices vary by location. Estimated totals exclude taxes, tips, delivery fees, and other charges."
- A choice without a verified price (none at the moment; the rule is tested) makes the subtotal **incomplete** and is named.

## 7. Totals (`lib/calculator-math.ts`)

- Total = per-serving value × quantity, summed over the meal (quantity 1-99).
- A missing value is **never zero**: the item is left out of that total and the total says how many items it includes ("1 of 3 items"). One plain-language note, "How these totals are counted", names the dishes Olive Garden's guide has no exact value for and says that their price and calories are still counted. When no item has a value the tile says "Not listed". (Owner request 2026-11-20: friendlier than an "Incomplete" warning on every tile; the meaning is unchanged.)
- Money is rounded to cents after each addition (no floating-point noise).

## 8. Bundles and combinations

- One choice with Olive Garden's **own listed total** (price and calories). Their pans, salads and breadsticks are never added again, and no nutrients are shown for them (composite, no single official row).
- The item card shows a "Bundle" tag; the meal line explains that the bundle counts once.

## 9. Allergens

Not part of the calculator. The page links to Olive Garden's official allergen guide and to each item page (which shows the guide's marks). No allergy-safety claims.
