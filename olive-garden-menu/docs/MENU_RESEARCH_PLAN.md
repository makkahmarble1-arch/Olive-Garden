# Menu Price & Calorie Research Plan (2026, USA)

**Status:** Plan (updated 2026-11-11). **No research has started and no values
are entered in the app.** The data structure is ready (`content/menu/`).
Bulk research begins only when the owner approves, category by category.

## 1. Principles

- **Never guess.** A value without an authoritative source is recorded as
  **NOT VERIFIED** and shown on the site as "Not verified yet".
- **Official sources first.** Third-party price sites, blogs, and social
  posts may be used only as *leads* (to know what to look for), never as
  the source of a published value.
- **Prices are location-specific.** Every price is tied to a location and a
  date. Calories (national nutrition data) are tied to a source document and date.
- **Keep evidence.** For every verified value, save the source URL, date, and
  a private screenshot/PDF (kept outside the public site).

## 2. Source priority

| Rank | Source | Use for |
|---:|---|---|
| 1 | Official Olive Garden website menu with a selected restaurant location | Prices, item names, descriptions, availability |
| 2 | Official nutrition information (web page or PDF) | Calories, serving basis |
| 3 | Official allergen / gluten-sensitive information | Gluten-sensitive page statements |
| 4 | Official catering and to-go pages | Catering serving sizes, pricing, wine & beer to go |
| 5 | In-store printed menu or receipt (owner-collected, with photo and date) | Prices when the website requires ordering steps |
| — | Third-party sites, delivery apps, social media | Leads only, **never** published as verified |

Delivery-app prices are often higher than in-store prices; if ever recorded,
they must be labeled as delivery prices and kept separate.

## 3. Reference location (owner decision, 2026-11-11)

**Approved reference market: Orlando, Florida, USA.** All published prices
come from **one** consistent benchmark restaurant, so prices are comparable
across pages. The exact restaurant is **not selected yet**.

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
| `status` | VERIFIED / NOT VERIFIED / PARTIAL | PARTIAL = e.g. price yes, calories no |
| `uncertainty` | free text | Anything unclear |

## 5. Workflow

0. **Select the reference restaurant** (§3) and get owner approval.
1. **Prepare:** export the research sheet from the existing data
   (`content/menu/offerings/`, 210 offerings, inventory order preserved).
2. **Resolve names:** match each inventory name to the official name;
   record alias/typo findings (see `CONTENT_ARCHITECTURE.md` §6).
3. **Nutrition pass:** fill calories from the official nutrition source;
   one source document covers most items; note the basis for each.
4. **Price pass:** for each reference location, record prices from the
   official menu; capture evidence.
5. **Availability pass:** confirm promotions (Buy One Take One, Lighter
   Portions, Weekday Lunch Special), wine & beer to go, and catering terms.
6. **Review:** owner reviews flagged rows (status ≠ VERIFIED, uncertainty
   not empty).
7. **Enter data:** add only the verified fields to the entry in
   `content/menu/offerings/<category>.ts` (see `content/menu/_template.ts`);
   set `status: "verified"` and `verifiedAt`. Validation stops the build if a
   value has no approved location, date, or source, or if a value is stored
   without `status: "verified"`.
8. **Publish:** page can be indexed only when its table has verified data
   and the owner approves.
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
| Different portions of one product | Separate offerings (regular, lunch, family-style, kids, catering); never copy a value from one to another |
| Possible aliases (A1–A17) | Record what the official menu shows; owner decides; update `content/menu/aliases.ts` |
| Item not found on official menu | `status: "not-verified"` + note "not found on official menu on {date}"; owner decides whether to keep, mark discontinued, or remove (never removed automatically) |
| Website blocks access / requires login | Do not guess; ask the owner for an in-store menu photo or receipt |

## 7. When this plan runs

- Research starts category by category, beginning with the first page the
  owner wants to publish (Lesson 5). No bulk research before that.
- The AI assistant may help fetch and read **official** pages when asked,
  but every value is reviewed by the owner before it is marked verified.
