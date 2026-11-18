# Dinner Menu: fact verification

**Checked:** 2026-11-15. **Rule:** every public statement comes from official Olive Garden information, either our earlier official research or the shared menu data verified on 2026-11-11 and 2026-11-12. Nothing was taken from third-party sites. The reference restaurant is used internally only, never named on the page.

**Access note:** olivegarden.com returned HTTP 403 to automated requests on 2026-11-15. The bot protection was not bypassed. Prices therefore come from the shared data (checked 2026-11-11/12). The time rules were re-confirmed through an official olivegarden.com/faqs search snippet on 2026-11-15.

## 1. Dinner availability and hours
| Statement on the page | Source | Status |
|---|---|---|
| No separate dinner-only menu; the regular menu is the dinner menu | Official online menu sections (research/menu/, 17 inventory categories; no "dinner" section); location page lists a "Dinner" period, not a dinner menu | Verified |
| Weekdays: lunch until 3 PM, dinner from 3 PM to closing | Official FAQ ("Lunch is served Monday through Friday until 3pm"); location page (Dinner 3:00 PM–close, Mon–Fri), `research/homepage/hours.md` | Verified 2026-11-12; FAQ snippet 2026-11-15 |
| Dinner menu all day on Saturdays, Sundays, and holidays | Official FAQ ("full dinner menu all day on weekends and holidays"); location page | Verified |
| "Some regional variations" | Official FAQ snippet, 2026-11-15 | Verified |
| Closing 10 PM Sun–Thu, 11 PM Fri–Sat at the restaurant we checked | Location page, `research/homepage/hours.md` | Verified (one restaurant; labeled so) |
| Online ordering closes 20 minutes before closing (restaurant we checked) | Location page | Verified (one restaurant; labeled so) |
| Closed Thanksgiving Day and Christmas Day; may close early the day before Thanksgiving and on Christmas Eve | Official FAQ, `research/homepage/holiday-hours.md` | Verified |

## 2. Prices and calories (shared data, `content/menu/offerings/`)
All values are online pickup prices from 2026-11-11 (appetizers) and 2026-11-12 (all others). The tables are generated from the data; the prose numbers below were compared with the data.

| Statement | Data |
|---|---|
| Dinner entrées $13.99–$27.29 (27 classic entrées, without the family bundle) | Spaghetti with Marinara / Meat Sauce / Create Your Own Pasta $13.99; Calabrian Steak Bucatini option $27.29 (re-checked 2026-11-18; was $26.49 on 2026-11-12) |
| Second and third highest: Shrimp Tortelloni Alfredo $25.79, Shrimp Carbonara $24.99 | Chicken Tortelloni Alfredo option; Shrimp Carbonara |
| Lowest calories 490: Shrimp Scampi, Spaghetti with Marinara | Classic entrées |
| Appetizers: 10, $4.99 (breadsticks) to $14.29 (Shrimp Fritto Misto); Fried Mozzarella $9.79, Toasted Ravioli $10.29, Calamari $13.29; most 500–1,280 cal | Appetizers |
| Alfredo: Fettuccine $17.49, Chicken $21.79, Shrimp $22.49, Seafood $23.49, Chicken Tortelloni $23.99 (shrimp $25.79); 1,220–1,980 cal; Spicy Alfredo same price as Fettuccine | Amazing Alfredos, classic entrées |
| Soup, salad & breadsticks $13.49 (regular) vs $9.99 (weekday lunch until 3 PM, limited time), 400–520 cal | Soups, salad & breadsticks |
| Lighter portions: 8, $13.49–$14.49; Chicken Parmigiana $14.49/630 vs $21.29/1,020; Lasagna $14.49/500 vs $19.99/940; Fettuccine $13.49/920 vs $17.49/1,220 | Lighter portions, classic entrées |
| Desserts: 7, $8.99 (Warm Italian Doughnuts) to $10.29 (Black Tie Mousse Cake); Tiramisu 470 lowest; Chocolate Lasagna 980 highest; Pumpkin Cookie Butter Cheesecake limited time | Desserts |
| Drinks to go: single drink or 2-liter $3.69–$5.49; gallon $8.49–$10.49 | Drink menu (Mango-Passion Fruit Iced Tea is "unavailable" and excluded from the overview) |
| Lunch plates cost $2.50–$9.30 less than the dinner plate of the same dish | Lunch menu comparison (calculated, `/lunch-menu`) |
| Dinner Spaghetti & Meatballs has 3 meatballs; lunch 2 | Official nutrition PDF (`OFFICIAL_FACTS_LOG.md`) |
| $6 Take Home: added to any entrée; Fettuccine Alfredo, Five Cheese Ziti al Forno, Spaghetti with Meat Sauce; chilled; no soup, salad, or breadsticks | `research/homepage/deals.md` (official take-home offer page) |
| Never-Ending Pasta Bowl from $14.99, limited time, refills dine-in | `research/homepage/deals.md` (official specials page) |
| No dinner-only special found | All specials listed in `research/homepage/deals.md` (2026-11-12) |
| Birthday dessert when dining in; no rewards program; email club offers | Official FAQ (`deals.md`) |
| Cocktails in the restaurant, prices not published online; wine and beer to go at select restaurants where the law allows, 21+ | `/drink-menu` and `/wine-and-beer-to-go` research |
| Entrées and lighter portions include soup or salad and breadsticks; kids meals and $6 Take Home do not | Official menu (homepage FAQ data) |

## 3. Calculated values (labeled "Calc." on the page)
Calculated by `resolveMealExamples` (`lib/category-data.ts`) from the shared prices:
- $27.98 = 2 × $13.99
- $27.98 = $14.49 + $13.49
- $51.57 = $21.79 + $19.99 + $9.79
- $54.57 = $21.29 + $23.49 + $9.79
- $23.49 = $17.49 + $6.00

## 4. Not published (not verified)
- Dine-in prices (only online pickup was checked).
- A dinner menu for any specific city or state, or price differences by region (only "prices may vary by location across the USA").
- Popularity or best-seller claims.
- Third-party claims seen in the SERP: "2 for $25", "Lunch Duos", and third-party lunch-vs-dinner calories.
- Whether full-size dinner entrées can be ordered during weekday lunch hours (not stated by the official sources we checked).

## 5. Re-check before launch
Re-open the official FAQ, the location hours, and the specials pages in a normal browser. If any price changes, update `content/menu/` (the tables update automatically) and the prose numbers in `content/guides/dinner-menu.ts`.
