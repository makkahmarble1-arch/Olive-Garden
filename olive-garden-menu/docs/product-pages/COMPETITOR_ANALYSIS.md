# Menu Item Pages: Competitor Analysis

**Checked:** 2026-11-15. Observations only; no competitor text, images,
branding, or code were copied.

## 1. Pages inspected

| Site | Page | How |
|---|---|---|
| olive-gardenmenus.com | `/menu/fried-mozzarella` | Page fetch (structure, headings, data fields) |
| olive-gardenmenus.com | `/menu/calamari` | Page fetch (template comparison) |
| Calorie databases (FatSecret, CalorieKing, Eat This Much, Fitbit, MyFoodDiary, Nutrola) | Fried Mozzarella entries | Search results only (to see what nutrition data competitors repeat) |
| olivegarden.com (official) | Item, menu, nutrition PDF | **Blocked from our network on 2026-11-15** ("Not found" / "Access Denied"); see `research/products/fried-mozzarella/FACT_VERIFICATION.md` |

## 2. olive-gardenmenus.com item template

**Layout and UI**
- Breadcrumb (menu > category anchor > item), hero with photo, price, a
  "Vegetarian" tag, an 800-calorie badge, a one-line description and a
  tap-to-rate star widget.
- Then: About (3 paragraphs), a "Quick Facts" key/value table, a one-question
  FAQ, "Nutrition & Dietary Notes", and four "More Appetizers" cards (name,
  price, calories, rating).
- Same template for every item (Calamari is identical in structure).

**URL / metadata / schema**
- URL pattern `/menu/{slug}`, lowercase-hyphenated (one slug does not match
  its display name).
- Title "... Price, Calories & Tips"; the Twitter title/description differ
  from the page's own; no JSON-LD found.

**Weaknesses found**
- **Data accuracy:** price shown as "about"/"est." and lower than the current
  online price we verified; a calorie "range" of 35–670 for Calamari mixes the
  sauce with the dish.
- **Contradictions:** "Served with" is empty in Quick Facts but "soup/salad +
  breadsticks" in the nutrition block (appetizers do not include those).
- **Unsupported labels:** Fried Mozzarella is tagged "Vegetarian", but Olive
  Garden does not mark it (V) on its online menu.
- **Thin nutrition:** calories only; no fat, sodium, carbs, protein, no
  serving basis, no source.
- **No allergens:** only a generic cross-contact line; gluten not mentioned.
- **No sizes:** the 30-piece catering tray is not mentioned.
- **Ratings:** identical high averages on small samples across items (cannot
  be verified as genuine).
- **Clutter:** unrelated CTAs ("Buy Artisan Cheese", "Reserve Tables",
  "Order Italian Food", "Find Recipes"), template leftovers, empty links.
- **One FAQ** only; FAQ not marked up; repeated pairing paragraphs.

## 3. Calorie database pages

- Repeat ~800 calories for a full order, but disagree on macros (one lists
  1,990 mg sodium, others cut off), sampler portions (320 vs 370), and
  "without sauce" (860). None cite an official date.
- **Lesson:** third-party nutrition is inconsistent. We show only official
  values; unverified nutrients are named but not shown as numbers.

## 4. Useful ideas adopted (re-implemented in our own design)

| Idea | Our version |
|---|---|
| `/menu/{slug}` URL | Same clean pattern, with real 404s for unknown slugs |
| Photo + price + calorie badge in the hero | Two-column cream hero, large photo, olive price badge, amber calorie badge |
| Quick facts | Icon cards (price, calories, sauce, serving, category, catering size) |
| "More appetizers" cards | The owner-approved premium menu card with the shared genuine rating |
| Star rating on the item | Our existing Supabase rating, same key as homepage/category cards |

## 5. Improvements over competitors

1. Verified price and calories from the shared data, with month/year and
   the USA price-variation note; no "est." prices.
2. Included sauce with its official calories and a labeled calculated total.
3. Calorie spotlight (share of the 2,000-calorie reference, labeled Calc.)
   and a comparison chart against the other appetizers.
4. Honest nutrition table: official values only, missing nutrients named.
5. Ingredients limited to confirmed components, labeled "partial".
6. Allergen card with the dairy fact, shared-fryer cross-contact facts,
   official guide links, and a safety notice; never "safe" claims.
7. Correct dietary label: "Not marked (V)" instead of a false vegetarian tag.
8. Sizes table: restaurant order vs 30-piece catering tray, with labeled
   per-piece and per-guest calculations.
9. Editorial pairings clearly labeled as not official.
10. Six item-specific FAQs with FAQPage markup matching the visible text.
11. Sources box, no ads, no fake order/cart buttons, no unrelated CTAs.
12. Structured data limited to WebPage, BreadcrumbList, FAQPage (no
    Product/Offer/AggregateRating).

## 6. Not adopted

- "Order" / "Reserve" buttons and affiliate-style CTAs.
- Vegetarian tags not shown by Olive Garden.
- Third-party macro numbers.
- Dine-in "served with soup/salad" claims for appetizers.
