# Menu Item Page Data Structure

Type: `ProductPageContent` in `lib/types.ts`. One file per item in
`content/menu/product-pages/`. Example: `fried-mozzarella.ts`.

## Read from the shared data (never typed into the page file)

| Value | Source |
|---|---|
| Name, price, calories, calorie basis, serving size | primary offering (`primaryOfferingId`) |
| Other sizes (e.g. catering tray) | `sizeOfferingIds` offerings |
| Photo | offering image → product image (`getOfferingImage`) |
| Category, breadcrumb, category links | offering `categoryId` |
| Rating | `productId` (shared rating key) |
| Last verified | latest `verifiedAt` / `prices[].checkedAt` of the primary + size offerings |
| Pairing / similar / comparison prices and calories | their own offerings |

## Stored in the page file

| Field | Meaning |
|---|---|
| `productId`, `slug`, `status` | identity; status `draft` / `preview` / `published` |
| `primaryOfferingId`, `sizeOfferingIds` | which offerings drive the page |
| `primaryKeyword`, `secondaryKeywords`, `searchIntent` | SEO planning (keywords also feed search) |
| `metaTitle`, `metaDescription`, `h1` | metadata (description must show current price + calories) |
| `summary`, `servingSummary` | hero text |
| `contentReviewedAt` | ISO date of the last text review |
| `about` | heading + paragraphs (RichText with internal links) |
| `includes` | what comes with the item, official calories or null |
| `customizations` | verified options (`items`) + plain note when none verified |
| `extraSauceOfferingId` | optional related side/sauce offering |
| `nutrition` | `servingBasis` (until the official record exists), `calorieExtras` (official sauce calories) |
| `ingredients` | `completeness` (`partial`/`complete`), confirmed components, note |
| `allergens` | item-specific `facts` and official `crossContact` text (the official "contains" marks come from the central record) |
| `dietary` | official labels as shown by Olive Garden |
| `pairings` | editorial suggestions (offering id, kind, reason) |
| `relatedOfferingIds` | 3-4 similar items (cards) |
| `compareOfferingIds`, `compareHeading` | comparison chart rows |
| `faqs` | visible FAQs (also FAQPage JSON-LD) |
| `sources`, `officialSource`, `extraSource` | full record + public Sources box |
| `related` | exactly 4 Related Menus |
| `checklist` | readiness: `done` / `partial` / `missing` per gate (including `visualReview`) |
| `ownerApprovedAt` | ISO date of owner approval; required for `published` |

## Optional fields for special cases (2026-11-18)

- **`versions`:** `{ key, label, shortLabel, description, price, calories, nutritionRowId | null, allergenRowId }[]`. Used for officially listed versions with their own rows (Phase 4). The first entry is the default. See `PRODUCT_PAGE_ARCHITECTURE.md` §5b.
- **`heroImageOmitted`:** internal reason for not showing the mapped owner photo in the hero. Use it only for a concrete, materially misleading mismatch; it sets checklist `accurateImage` to `missing`.

## Central official data (not in the page file)

| Value | Source |
|---|---|
| Full nutrition (11 columns) + included-sauce rows ("add marinara") | official row of the primary offering via `offeringNutritionMap` → `content/menu/nutrition/nutrition-guide.ts` |
| Official allergen marks + prep marks (fried in soy oil, grilled) | `offeringAllergenMap` → `content/menu/nutrition/allergen-guide.ts` |
| Guide-wide cross-contact statements | `allergenGuideNotes` in `content/menu/nutrition/documents.ts` |
| Document version and date | `content/menu/nutrition/documents.ts` |

Resolved with `getOfferingNutrition()` / `getOfferingAllergens()`
(`lib/nutrition-data.ts`); only `exact`/`same-item` mappings resolve. See
`NUTRITION_ALLERGEN_DATA.md`.

## Nutrient keys

`caloriesFromFat`, `totalFat`, `saturatedFat`, `transFat`, `cholesterol`,
`sodium`, `totalCarbohydrates`, `dietaryFiber`, `sugars`, `protein` (as in the
guide; grams, cholesterol and sodium in mg). Values: number, `{ lessThan: n }`,
or `null` (not printed). Calories shown on the site come from the offering and
must equal the official row (build check).

## Allergen ids

The guide's columns: `dairy`, `eggs`, `fish`, `crustacean`, `mollusk`,
`tree-nuts`, `peanuts`, `wheat`, `gluten`, `soy`, `sesame`, `sulfites`.

## Rules

- No duplicate product records; one page per product (build check).
- Never copy a price or calorie number into page data; text that mentions a
  price is checked against the shared data.
- Unverified nutrition or allergen data is left out, never estimated.
