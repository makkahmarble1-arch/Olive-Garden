# Menu Price & Calorie Research Plan (2026, USA)

**Status:** Plan (updated 2026-11-12, owner decision 5). Appetizers are
researched (`research/appetizers/`), entered, and published on `/appetizers`
(2026-11-11). **Lesson 7.1B research is final (2026-11-12):** all 17
categories in `research/menu/` (231 offerings incl. 21 new official items,
226 official prices, PDF cross-check of every category, 0 third-party
estimates; limits in `research/menu/UNVERIFIED_ITEMS.md`). Integrated into
`content/menu/` in Lesson 7.2 (2026-11-12). Verified data feeds both the
homepage (full menu) and the category pages from one shared source.

Conflict rule used in the cross-check: when the ordering-menu calories and
the nutrition PDF differ, the PDF value (rank 2, nutrition documentation) is
used and the menu value is recorded, unless the PDF has no line for that
exact portion (then the menu value is kept and flagged).

## 1. Principles (owner decision, 2026-11-12)

- **Complete menu, no empty cells.** The owner wants a price and a calorie
  value for every item. Values are found in the priority order of §2.
- **Official first, always.** An official value is never overwritten by an
  estimate. An estimate is never presented as official.
- **Every value has a visible basis:**

  | Basis | When | Label on the site |
  |---|---|---|
  | Official | Read on an official Olive Garden page or document | none (plain value) |
  | Calculated | Sum of official component values (e.g. breadsticks + sauce) | "Calculated", parts shown (e.g. "4 × 140 + 70") |
  | Estimated | No official value exists; taken from a credible third-party site | "Estimated", source named in the page's Sources |
  | No credible value | Nothing reliable found | A meaningful note instead of a number (e.g. "Not on the online menu", "Price set by the restaurant") |

  "Not verified yet" is used only while an item's research is unfinished.
- **Never invent unsupported numbers.** No averaging of guesses, no
  rounding away from the source, no copying a value from another portion.
- **Match the exact item.** Same item, portion size, and variation (regular
  vs. lunch vs. family-style vs. catering vs. size options).
- **Prices are location-specific:** online pickup prices of the reference
  restaurant (§3). Calories are national values tied to a source document.
- **Record everything** in `research/<category>/`: source URL, research
  date, basis, and limitations, for every value (official or not).

## 2. Source priority (owner decision, 2026-11-12)

| Rank | Source | Use for | Basis label |
|---:|---|---|---|
| 1 | Official Olive Garden menu and online ordering pages, reference restaurant selected, order type Pickup | Prices, item names, sizes, availability | Official |
| 2 | Official nutrition documentation (nutrition PDF / page), allergen and gluten-sensitive information | Calories, serving basis, dietary statements | Official |
| 3 | Calculation from verified official component values | Totals the official source lists in parts (e.g. Dipping Sauces with Breadsticks) | Calculated |
| 4 | Relevant, credible competitor / third-party menu websites (fallback only) | A price or calorie value no official source provides | Estimated |
| — | In-store printed menu or receipt (owner-collected, photo + date) | Optional extra evidence for official prices | Official |

Rules for rank 4 (third-party estimates):
- Use only when ranks 1-3 give no value for that exact item and portion.
- Cross-check: look for at least two independent sites. If they agree, use
  the value; if they disagree, record all values and the owner decides
  before anything is published.
- Prefer sites that name a date, a location, and the portion. Reject values
  that conflict with themselves on the same page (see
  `research/homepage/competitor-analysis.md` §4 for typical problems).
- Record each site's URL, the date it was read, and what it states.
- Label the value "Estimated" on the site; replace it as soon as an
  official value is found.
- Third-party prices are usually not from the reference restaurant. The
  page says so next to estimated prices (e.g. "Estimated; not checked at
  the Orlando reference restaurant").
- Never copy text, descriptions, or images from these sites; only the number.

Delivery-app prices are often higher than in-store prices; if ever recorded,
they must be labeled as delivery prices and kept separate.

## 3. Reference location (owner decision, 2026-11-11)

**Approved reference market: Orlando, Florida, USA.** All published prices
come from **one** consistent benchmark restaurant, so prices are comparable
across pages.

**Approved restaurant (2026-11-11):** Olive Garden **Orlando - Millenia Mall**,
4101 Conroy Road, Mall of Millenia, Orlando, FL 32839,
https://www.olivegarden.com/locations/fl/orlando/orlando-millenia-mall/1614.
**Price basis:** official online ordering menu with this restaurant selected,
order type **Pickup**. Prices are labeled "online pickup prices"; dine-in
prices are not used. The steps below are kept as the record of how it was chosen.

Selection steps (at the start of the research phase, before any price is entered):
1. Identify official Olive Garden locations in Orlando from the official
   restaurant locator.
2. Recommend one restaurant (e.g. one whose official online menu shows
   prices without login, and that offers the needed services such as
   catering and to-go).
3. Record its official information: name, street address, city, state,
   ZIP code, official location page URL.
4. **Owner approves that exact restaurant.**
5. Add it to `content/menu/locations.ts` (`referenceLocations`) with the
   approval date. Every price must reference this `id`.

Do not assume Orlando has the highest search demand; it was chosen as a
consistent benchmark, not because of search data.

Display: "Prices checked at {restaurant city, ST} on {date}. Prices vary by
location." If a second location is ever added, show a range + "varies by location".

## 4. Research record (one row per offering)

Collected in a working sheet first (e.g. a spreadsheet), then copied into
`content/menu/offerings/<category>.ts` after owner review. Field names in
brackets are the code fields (`MenuOffering`, see `CONTENT_ARCHITECTURE.md` §6.3).

| Field | Example format | Notes |
|---|---|---|
| `offering_id` | `lunch-menu--chicken-parmigiana` | Already exists in the data (`id`) |
| `inventory_name` | Chicken Parmigiana | Exactly as in MENU_INVENTORY.md |
| `verified_name` | Name as shown on the official source | Flags alias/typo issues |
| `price_usd` | 0.00 | Blank if not found |
| `price_unit` | per entrée / per half pan / per gallon | |
| `price_context` | regular / lunch / catering / kids / to-go … | |
| `location` | id from `locations.ts` | Required for any price (`prices[].locationId`) |
| `calories` / `calories_max` | number / number | Range if official value is a range |
| `calorie_basis` | per entrée / per serving (serves N) | |
| `serving_size` | as stated officially | |
| `availability` | available / limited-time / location-dependent / unavailable / unknown | |
| `source_url` | https://… | One per value type (price, nutrition) |
| `checked_at` | YYYY-MM-DD | |
| `evidence_file` | private file name | Not published |
| `price_basis` / `calorie_basis_type` | official / calculated / estimated / none | One per value (§1 table) |
| `third_party_sources` | URLs + dates + stated values | Only for estimated values |
| `status` | VERIFIED / NOT VERIFIED / PARTIAL | PARTIAL = e.g. price yes, calories no |
| `uncertainty` | free text | Anything unclear |

## 5. Workflow

0. ~~Select the reference restaurant~~ (done: Orlando - Millenia Mall).
1. **Prepare:** export the research sheet from the existing data
   (`content/menu/offerings/`, 210 offerings, inventory order preserved).
2. **Resolve names:** match each inventory name to the official name;
   record alias/typo findings (see `CONTENT_ARCHITECTURE.md` §6).
3. **Nutrition pass:** fill calories from the official nutrition source;
   one source document covers most items; note the basis for each.
   Calculate totals from official parts where needed (labeled).
4. **Price pass:** record online pickup prices from the official ordering
   menu with the reference restaurant selected; note size options.
4a. **Fallback pass:** for values still missing, search credible
   third-party sites (§2 rank 4), cross-check, and record them as estimated.
   If nothing credible exists, write the note to show instead.
5. **Availability pass:** confirm promotions (Buy One Take One, Lighter
   Portions, Weekday Lunch Special), wine & beer to go, and catering terms.
6. **Review:** owner reviews flagged rows (status ≠ VERIFIED, uncertainty
   not empty).
7. **Enter data:** add only the verified fields to the entry in
   `content/menu/offerings/<category>.ts` (see `content/menu/_template.ts`);
   set `status: "verified"` and `verifiedAt`. Validation stops the build if a
   value has no approved location, date, or source, or if a value is stored
   without `status: "verified"`.
8. **Publish:** a category page is indexed when its content is complete
   and the owner approves. The homepage shows every item with its labeled
   value or note.
9. **Re-check:** prices at least every 3 months, and immediately when a
   menu change is announced. Update `verifiedAt`; never leave stale dates.

## 6. Special cases

| Case | Handling |
|---|---|
| Buy One Take One / Lighter Portions | Confirm the offer is current; record start/end dates; hide the section if not verified |
| Wine & beer to go | Confirm it is allowed in Florida and offered at the reference restaurant; note 21+; no price unless confirmed there |
| Gluten-sensitive | Quote official allergen wording; record the document date; no own conclusions |
| Catering | Record serving counts ("serves X"), pan sizes, minimums, lead time |
| Create Your Own Pasta | Record official options before any table is built |
| Calories as ranges | Store `calories` (min) and `caloriesMax`; display "X–Y" |
| Calculated calories | Only from official component values (e.g. item + included sauces). Label "calculated" and show the parts ("670 + 35 + 240"). Never round differently from the source |
| Dipping Sauces with Breadsticks | Owner decision 2026-11-12: show **calculated totals** from official values, regular and large kept separate. Official parts (nutrition PDF): breadstick 140 each; sauce regular / large: Marinara 70 / 150, Five Cheese Marinara 200 / 400, Alfredo 440 / 870, Spicy Alfredo 490 / 980. Regular (4 breadsticks): 560 + 70-490 = **630-1,050 cal (calculated)**. Large (8 breadsticks): 1,120 + 150-980 = **1,270-2,100 cal (calculated)**. Prices: regular $5.29, large $7.29. *The site still shows the sauce-only range 70-490; updated in a later code step.* |
| Official name differs from inventory name | Keep `inventoryName`; record the official name in the research notes (e.g. `research/appetizers/prices.md` §4); owner decides what is displayed |
| Hours and holiday hours (homepage) | Official location page of the reference restaurant only; record check date; if holiday hours are not officially published, the section says so and advises checking with the restaurant (no third-party hours) |
| Lunch specials and deals (homepage) | Official site only; record terms, start/end dates; remove when expired |
| Different portions of one product | Separate offerings (regular, lunch, family-style, kids, catering); never copy a value from one to another |
| Possible aliases (A1–A17) | Record what the official menu shows; owner decides; update `content/menu/aliases.ts` |
| Item not found on official menu | `status: "not-verified"` + note "not found on official menu on {date}"; owner decides whether to keep, mark discontinued, or remove (never removed automatically) |
| Website blocks access / requires login | Do not guess; use the browser integration (Claude in Chrome); if still blocked, use §2 rank 4 or ask the owner for an in-store menu photo |

## 7. When this plan runs

- Lesson 7.1B (complete menu research): all remaining categories, in the
  approved order, following §1-6. Results go to `research/<category>/`
  first; values are entered in `content/menu/` after owner review.
- Superseded rules (kept for history): "third-party sites are leads only,
  never published" and "calories only from the latest official source"
  were replaced on 2026-11-12 by §1-2 (official first, labeled estimates as
  fallback).
