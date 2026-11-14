/**
 * Shared data shapes. TypeScript uses these to catch mistakes in content files.
 */

/* ------------------------------------------------------------------ */
/* Menu                                                                 */
/* ------------------------------------------------------------------ */

/**
 * "verified"           = checked against an authoritative source (shown on the site)
 * "needs-verification" = not researched yet
 * "not-verified"       = researched, but no authoritative source was found
 * Only "verified" values are ever displayed as fact.
 */
export type VerificationStatus = "verified" | "needs-verification" | "not-verified";

/** One row in `MenuTable`. Offerings are converted with `toMenuTableItem()` in lib/content.ts. */
export type MenuItem = {
  name: string;
  /** Canonical product id: shows the shared visitor rating. Omit for sample rows. */
  productId?: string | null;
  /** Optional short description, shown under the item name. */
  description?: string | null;
  /** Price in US dollars. `null` = not verified yet (never guess). */
  price: number | null;
  /** Calories. `null` = not verified yet (never guess). */
  calories: number | null;
  /** Upper end of a calorie range (calories = lower end). */
  caloriesMax?: number | null;
  /** Price and calories are displayed only when this is "verified". */
  status: VerificationStatus;
  /** Where the price/calories came from (e.g. official nutrition PDF, store menu). */
  source: string | null;
  /** Location the price was checked at (prices vary by location). */
  location: string | null;
  /** ISO date, e.g. "2026-11-10". */
  lastChecked: string | null;
  /** True when the item was checked and is not on the reference restaurant's menu. */
  notListed?: boolean;
  /** Shown instead of the price when there is no price (e.g. "Not on the current menu"). */
  priceNote?: string | null;
  /** Shown instead of calories when there are none (e.g. "Not published"). */
  caloriesNote?: string | null;
  /** "calculated" adds a visible label and the formula. */
  caloriesValueBasis?: ValueBasis | null;
  caloriesFormula?: string | null;
  /** Verified portion, e.g. "6 breadsticks". Shown under the item name. */
  servingSize?: string | null;
  /** What the calories refer to, e.g. "per breadstick". Shown under the calories. */
  caloriesBasis?: string | null;
};

/* ---------- Menu data model (docs/CONTENT_ARCHITECTURE.md §6) ---------- */

/** The 17 owner-approved categories. Each id is also the approved URL slug. */
export type MenuCategoryId =
  | "family-style-meals"
  | "appetizers"
  | "classic-entrees"
  | "buy-one-take-one"
  | "amazing-alfredos"
  | "soups-salad-and-breadsticks"
  | "lighter-portions"
  | "create-your-own-pasta"
  | "lunch-menu"
  | "desserts"
  | "drink-menu"
  | "sides-sauces-and-extras"
  | "non-alcoholic-beverages"
  | "wine-and-beer-to-go"
  | "gluten-sensitive"
  | "kids-meal"
  | "catering";

/**
 * "placeholder" = no page yet (never linked, never indexed).
 * "preview"     = the page exists and is linked, but its values are not all
 *                 verified yet, so it stays noindex.
 * "published"   = verified, owner-approved content (indexable).
 */
export type ContentStatus = "placeholder" | "preview" | "published";

/**
 * Portion/format of an offering. The default comes from its category
 * (a planning label, not a verified fact); confirm during research.
 */
export type PortionType =
  | "regular"
  | "family-style"
  | "promotion"
  | "lighter-portion"
  | "lunch"
  | "side"
  | "to-go"
  | "kids"
  | "catering";

export type AvailabilityStatus =
  | "unknown" // not checked yet (default)
  | "available"
  | "limited-time"
  | "location-dependent"
  /** Listed by the reference restaurant but marked "currently unavailable". */
  | "unavailable"
  /** Checked and not on the reference restaurant's current menu (kept, never deleted). */
  | "not-listed";

/**
 * How a shown value was obtained (docs/MENU_RESEARCH_PLAN.md §1).
 * "official"   = read on an official Olive Garden page or document
 * "calculated" = sum of official component values (formula shown)
 * "estimated"  = credible third-party value (labeled; none used yet)
 */
export type ValueBasis = "official" | "calculated" | "estimated";

/** A size / variant of one offering (e.g. 6 or 12 breadsticks, pan with broccoli). */
export type OfferingOption = {
  label: string;
  /** Official price of this option (reference location), or null if not stated. */
  price: number | null;
  /** Calories of this option, or null = use the offering's calories. */
  calories: number | null;
  caloriesMax: number | null;
  /** What the option calories refer to, e.g. "per pan". */
  caloriesUnit: string | null;
  caloriesBasis: ValueBasis | null;
  /** Parts of a calculated value, e.g. "6 × 140". Required for "calculated". */
  caloriesFormula: string | null;
  /** True when the reference restaurant marks this option "currently unavailable". */
  unavailable?: boolean;
};

/** An extra calculated total that is not a separate option (e.g. salad + 12 breadsticks). */
export type CalorieExtra = {
  label: string;
  calories: number;
  caloriesMax: number | null;
  basis: ValueBasis;
  formula: string;
};

/** Promotion details for promotional offerings (e.g. $6 Take Home Entrées). */
export type OfferingPromotion = {
  name: string;
  /** false = the inventory entry is kept but is not part of the current offer. */
  eligible: boolean;
  /** Official terms, paraphrased. Empty when not eligible. */
  conditions: string[];
  sourceUrls: string[];
  checkedAt: string;
};

/** Create Your Own Pasta: one official build option (pasta, sauce, topping, first course). */
export type CustomizationOption = {
  id: string;
  group: "pasta" | "sauce" | "topping" | "first-course";
  name: string;
  /** 0 = included in the base price. */
  price: number;
  priceType: "included" | "add-on";
  calories: number | null;
  /** Shown instead of a number when calories is null. */
  caloriesNote: string | null;
  /** e.g. "each" (per breadstick). */
  caloriesUnit: string | null;
  vegetarian: boolean;
  sourceUrl: string;
  checkedAt: string;
};

export type CreateYourOwnPasta = {
  basePrice: number;
  caloriesMin: number;
  caloriesMax: number;
  caloriesUnit: string;
  includes: string;
  sourceUrl: string;
  checkedAt: string;
  /** Owner photo for the Create Your Own Pasta card, or null. */
  image: ImageRef | null;
  options: CustomizationOption[];
};

/** One of the 17 category pages. */
export type MenuCategoryDef = {
  /** Stable internal id. Never change once used. */
  id: MenuCategoryId;
  /** Approved URL slug: the page lives at /{slug} (not under /menu/). */
  slug: string;
  /** 1-17, the order in docs/MENU_INVENTORY.md. */
  inventoryOrder: number;
  /** Category name exactly as written in the inventory. */
  inventoryName: string;
  /** Cleaned public name. */
  name: string;
  /** Neutral one-sentence summary for cards. No unverified claims. */
  summary: string;
  /** Number of entries listed in the inventory (checked by validation). */
  inventoryItemCount: number;
  defaultPortionType: PortionType;
  /** Shown in the homepage "Menu Categories" grid (the full list is on /menu). */
  featuredOnHomepage: boolean;
  contentStatus: ContentStatus;
  /** ISO date of the last content update. */
  updatedAt: string | null;
  /** Card/hero image, added only when the owner provides a real file. */
  image?: ImageRef | null;
};

/** One visible FAQ (also used for FAQPage JSON-LD). Answers state only verified facts. */
export type FaqItem = {
  question: string;
  answer: string;
  /** Optional link shown after the answer (e.g. to the category page that covers it in depth). */
  link?: { text: string; href: string };
};

/**
 * Written page content for a category page (`app/[category]/page.tsx`).
 * Every category with contentStatus "preview" or "published" needs one.
 */
export type CategoryPageContent = {
  categoryId: MenuCategoryId;
  /**
   * Owner-approved primary keyword (research/seo/KEYWORD_MASTER_MAP.md).
   * Unique per page; used in the title/H1 naturally, never stuffed.
   */
  primaryKeyword: string;
  /**
   * Public title of this menu article, used wherever another page links to it
   * (e.g. "Related Menus"): "Olive Garden Lunch Menu". Unique; no year.
   */
  menuTitle: string;
  /** Approved secondary / semantic keywords (planning only, not rendered). */
  secondaryKeywords?: string[];
  /** One-sentence search intent this page answers (planning only). */
  searchIntent?: string;
  /** <title> (the site name is added by the layout template). */
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** Short introduction paragraphs. No unverified menu claims. */
  intro: string[];
  /** ISO date the written text was last reviewed (shown in the source note). */
  contentReviewedAt?: string;
  /** Visible H2 above the price table (outline heading). Omitted = hidden "Prices and calories" H2. */
  tableHeading?: string;
  /** Short paragraphs between the table heading and the table. */
  tableIntro?: RichText[];
  /** false = no visitor-rating column or photo-card ratings (e.g. promotion pages). Default true. */
  showRatings?: boolean;
  /**
   * Table rows shown without a visitor rating, e.g. non-food merchandise
   * (Cheese Grater). The item stays in the table; it can't be a photo card.
   */
  noRatingOfferingIds?: string[];
  /**
   * 3-5 offering ids shown as photo cards (must be in this category and have
   * an image), or [] for no cards. Omitted = the first 5 items with an image.
   */
  featuredOfferingIds?: string[];
  /** Heading (H3) of the photo cards inside the table section. */
  featuredHeading?: string;
  /** Category-specific sections after the table and photo cards (H2 each). */
  sections?: CategorySection[];
  /** Comparison tables built from the shared menu data (placed by a "comparison" block). */
  comparisons?: ComparisonTableSpec[];
  /** Create Your Own Pasta option tables (placed by an "optionTable" block). */
  optionTables?: OptionTableSpec[];
  /** Calculated example pasta builds (placed by a "pastaBuilds" block). */
  pastaBuilds?: PastaBuildSpec[];
  /** Static headcount plans (placed by a "servingPlan" block). */
  servingPlans?: ServingPlanSpec[];
  /**
   * Offerings shown in the price table instead of the category's own items.
   * Only for a category without its own offerings (Create Your Own Pasta,
   * whose dish is listed under Classic Entrées). Ratings stay shared (by product).
   */
  tableOfferingIds?: string[];
  /** Caption of the price table. */
  tableCaption: string;
  /** Extra verified price details (other sizes, price type), shown under the table. */
  priceNotes: string[];
  /** Short notes about how calories are listed. */
  nutritionNotes: string[];
  /**
   * Complete record of the official sources used for this page (internal;
   * not rendered). The public Sources section shows only `officialSource`
   * and, when needed, `extraSource` (owner standard 2026-11-13).
   */
  sources: { label: string; url: string }[];
  /** Public official source: the Olive Garden website (default) or the nutrition PDF. */
  officialSource?: "website" | "nutrition";
  /** One extra official page shown publicly, only when an important claim needs it. Must be listed in `sources`. */
  extraSource?: { label: string; url: string };
  faqs: FaqItem[];
  /**
   * Related menus with the reason to visit them. Shown under "Related Menus"
   * with the target page's `menuTitle`; an entry appears only when its page
   * is live (published, or preview on a preview page), so planned links show
   * up automatically once that page is finished.
   */
  related: { categoryId: MenuCategoryId; text: string }[];
};

/** A block inside a category section: article blocks plus comparison, option, and example-build tables. */
export type CategoryBlock =
  | ContentBlock
  | { type: "comparison"; id: string }
  | { type: "optionTable"; id: string }
  | { type: "pastaBuilds"; id: string }
  | { type: "servingPlan"; id: string }
  /**
   * Small photo grid of owner-supplied images (each listed in docs/IMAGE_MANIFEST.md),
   * e.g. one photo per soup. `label` is the accessible name of the group.
   */
  | { type: "gallery"; label: string; images: (ImageRef & { caption: string })[] };

/** A written section of a category page: rendered as an H2 with blocks. */
export type CategorySection = {
  /** Unique, lowercase-hyphenated id (anchor). */
  id: string;
  heading: string;
  blocks: CategoryBlock[];
};

/**
 * One column of a comparison table. Values come from the shared menu data
 * (content/menu/), never typed into the page. "pricePerServing" and
 * "priceDifference" are calculated and labeled "Calculated" on the page.
 */
export type ComparisonColumn =
  /**
   * `ref` = read the value from row.refs[ref] (another offering, e.g. the
   * regular-size version of the row's dish) instead of the row's own offering.
   * `missing` = note shown when the row has no such ref (e.g. "Not on the lunch menu").
   */
  | { kind: "price"; label?: string; ref?: string; missing?: string }
  | { kind: "calories"; label?: string; ref?: string; missing?: string }
  | { kind: "serving"; label?: string }
  | { kind: "category"; label?: string }
  /**
   * price ÷ servings from the official serving size: row.servings (the
   * upper number, default) or row.servingsMin (the lower number, use "min").
   */
  | { kind: "pricePerServing"; label?: string; use?: "min" | "max" }
  /** price minus the price of row `baseRow` (0-based). */
  | { kind: "priceDifference"; label?: string; baseRow: number }
  /** calories minus the calories of row `baseRow` (single values only). */
  | { kind: "caloriesDifference"; label?: string; baseRow: number }
  /**
   * Same-row difference between two versions of one dish (calculated):
   * value of `ref` (default: the row's own offering, also written "main")
   * minus value of `baseRef`. `percent` adds the change as a share of the base.
   * Calories: single values only.
   */
  | { kind: "refDifference"; measure: "price" | "calories"; label: string; ref?: string; baseRef: string; percent?: boolean }
  /** Short verified text per row, from row.text[key]. */
  | { kind: "text"; label: string; key: string };

/** Another offering used in the same comparison row (see ComparisonColumn `ref`). */
export type ComparisonRef = { offeringId: string; option?: string };

export type ComparisonRow = {
  offeringId: string;
  /** Row label; default = the offering's display name. */
  label?: string;
  /** Use this option (size/variant label) instead of the default price/calories. */
  option?: string;
  /** Other versions of the same dish, by key (e.g. { regular: {...}, lunch: {...} }). */
  refs?: Record<string, ComparisonRef>;
  /** Official number of servings (for pricePerServing), e.g. 6 for "Serves 4-6" (upper number). */
  servings?: number;
  /** Lower number of an official range, e.g. 4 for "Serves 4-6". */
  servingsMin?: number;
  text?: Record<string, string>;
};

export type ComparisonTableSpec = {
  id: string;
  caption: string;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  /** Notes under the table (e.g. how a calculation was made). */
  notes?: RichText[];
};

/**
 * A table of Create Your Own Pasta options (content/menu/create-your-own-pasta.ts):
 * the official build options with their add-on prices and component calories.
 * Also used for the soups, whose single-serving calories are listed as
 * first-course options.
 */
export type OptionTableSpec = {
  id: string;
  caption: string;
  rows: { optionId: string; label?: string; text?: Record<string, string> }[];
  columns: (
    | { kind: "price"; label?: string }
    | { kind: "calories"; label?: string }
    | { kind: "text"; label: string; key: string }
    /** Calculated: the row's calories plus the listed options (count = how many of each, default 1). */
    | { kind: "caloriesPlus"; label: string; add: { optionId: string; count?: number }[] }
  )[];
  notes?: RichText[];
};

/** One example Create Your Own Pasta order: every value is calculated from the official options. */
export type PastaBuild = {
  label: string;
  pasta: string;
  sauce: string;
  toppings?: string[];
  /** Included soup or salad (option id); shown in the full-meal column. */
  firstCourse?: string;
  /** Included breadsticks counted in the full-meal column (0-2). */
  breadsticks?: number;
};

/**
 * Static headcount plan (e.g. catering for 50 people): for each plan,
 * units = guests ÷ servesPerUnit rounded UP (so the food is never short),
 * subtotal = units × the shared price, per guest = subtotal ÷ guests. All calculated.
 */
export type ServingPlanSpec = {
  id: string;
  caption: string;
  guests: number;
  plans: {
    label: string;
    offeringId: string;
    option?: string;
    /** Official serving number used per unit (the LOWER number of a "serves 8-14" range). */
    servesPerUnit: number;
  }[];
  notes?: RichText[];
};

export type PastaBuildSpec = {
  id: string;
  caption: string;
  builds: PastaBuild[];
  notes?: RichText[];
};

/** A heading on /menu that groups related categories. */
export type MenuCategoryGroup = {
  id: string;
  heading: string;
  categoryIds: MenuCategoryId[];
};

/** Image record. Only real files that exist in /public (never invented paths). */
export type ImageRef = {
  /** Path inside /public, e.g. "/images/menu/products/chicken-parmigiana.jpg". */
  src: string;
  alt: string;
  width: number;
  height: number;
  credit: string | null;
  /** e.g. "Owner photo" or "Licensed: <source>". */
  license: string;
  /**
   * AI-generated illustration (supplied by the owner). Recorded for the
   * image manifest; no label on the card (owner decision 2026-11-13).
   */
  aiGenerated?: boolean;
};

/** A specific restaurant used as the price benchmark (owner-approved). */
export type ReferenceLocation = {
  /** e.g. "orlando-fl-<street>" */
  id: string;
  name: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  /** Official location page URL. */
  officialUrl: string;
  /** ISO date the owner approved this restaurant as the benchmark. */
  approvedAt: string;
};

/** One verified price, always tied to a location and a date. */
export type PriceObservation = {
  /** US dollars. */
  amount: number;
  /** e.g. "per entree", "per half pan", "per gallon". `null` if not stated. */
  unit: string | null;
  /** Must match a `ReferenceLocation.id`. */
  locationId: string;
  /** Official page the price was read from (null for in-store evidence). */
  sourceUrl: string | null;
  /** Required when there is no URL, e.g. "In-store menu photo, owner, 2026-12-01". */
  sourceNote: string | null;
  /** ISO date the price was checked. */
  checkedAt: string;
};

/** Canonical dish/drink, shared by offerings in several categories. */
export type MenuProduct = {
  /** e.g. "chicken-parmigiana" */
  id: string;
  name: string;
  /** Verified facts only. `null` until written from official information. */
  description: string | null;
  /** Usable owner photo (file exists and is approved), else null. */
  image: ImageRef | null;
  /**
   * Planned photo path (research/menu/IMAGE_MANIFEST.md). The file may not
   * exist yet; it is never rendered until it is moved into `image`.
   */
  plannedImageSrc: string;
  /** Why an existing file is not used, e.g. "Replacement needed: ...". */
  imageIssue: string | null;
};

/**
 * One inventory entry: a product as offered in one category.
 * The same product can have several offerings (regular, lunch,
 * family-style, catering...) with different prices, calories and sizes.
 */
export type MenuOffering = {
  /** "<categoryId>--<productId>" plus "--<variant>" for size variants. */
  id: string;
  productId: string;
  categoryId: MenuCategoryId;
  /** Position inside its category in docs/MENU_INVENTORY.md (1-based). */
  inventoryOrder: number;
  /**
   * Exact text from the inventory (kept for traceability).
   * `null` only for new official items that are not in the owner inventory.
   */
  inventoryName: string | null;
  /** Name as shown on the official ordering menu (research record). */
  officialName: string | null;
  /** Official item found during research and added with owner approval (Decision 3). */
  isNewOfficialItem: boolean;
  /** Public name (capitalization/spelling corrected). */
  displayName: string;
  description: string | null;
  portionType: PortionType;
  /** Verified serving context, e.g. "Serves 4-6". */
  servingSize: string | null;
  /** Empty = no price (see `priceNote`). Several entries = several locations/dates. */
  prices: PriceObservation[];
  /** Visible note when there is no price, e.g. "Not on the current menu". */
  priceNote: string | null;
  /** Sizes / variants with their own price or calories (first = default). */
  options: OfferingOption[];
  calories: number | null;
  /** Upper bound when the official value is a range (calories = lower bound). */
  caloriesMax: number | null;
  /** e.g. "per entree", "per serving". */
  caloriesBasis: string | null;
  /** Official nutrition source for the calories. */
  caloriesSourceUrl: string | null;
  /** Basis of `calories` (official or calculated). */
  caloriesValueBasis: ValueBasis | null;
  /** Parts of a calculated value. Required when the basis is "calculated". */
  caloriesFormula: string | null;
  /** Visible note when there are no calories, e.g. "Not published for take-home portions". */
  caloriesNote: string | null;
  /** Extra calculated totals, e.g. "With 12 breadsticks". */
  calorieExtras: CalorieExtra[];
  availability: AvailabilityStatus;
  /** Promotion details (only promotional offerings). */
  promotion: OfferingPromotion | null;
  /** Offering whose regular price is shown for reference (e.g. the regular entrée). */
  regularPriceOfferingId: string | null;
  /** Overrides the product image (e.g. a catering pan photo). */
  image: ImageRef | null;
  status: VerificationStatus;
  /** ISO date of the last full check of this offering. */
  verifiedAt: string | null;
  /** Uncertainty and caveats (internal; not shown on the site). */
  notes: string | null;
};

/** A possible alias between inventory names. Never merged without approval. */
export type AliasCase = {
  /** "A1" ... "A17" (docs/CONTENT_ARCHITECTURE.md §7). */
  id: string;
  question: string;
  offeringIds: string[];
  status: "unresolved" | "confirmed-same" | "confirmed-different" | "shared-data";
  /** Owner decision (research/menu/ALIAS_MAPPING.md). "shared-data" = same dish, shared data/photo, entries kept. */
  decision?: string;
};

/* ------------------------------------------------------------------ */
/* Articles                                                             */
/* ------------------------------------------------------------------ */

/** A link inside text. Internal links start with "/" (e.g. "/menu"). */
export type InlineLink = { text: string; href: string };

/** Plain text, or a mix of text and links: ["See our ", { text: "menu", href: "/menu" }, "."] */
export type RichText = string | (string | InlineLink)[];

/** Building blocks for article sections. */
export type ContentBlock =
  | { type: "paragraph"; text: RichText }
  | { type: "subheading"; text: string; id?: string }
  | { type: "list"; items: RichText[]; ordered?: boolean }
  | { type: "note"; text: RichText };

export type ArticleSection = {
  /** Unique, lowercase-hyphenated id. Used for the table of contents link (#id). */
  id: string;
  /** Rendered as an h2 and listed in the table of contents. */
  heading: string;
  blocks: ContentBlock[];
};

export type ArticleImage = {
  /** Image path in /public. `null` until the owner provides an approved image. */
  src: string | null;
  /** Describes the image for screen readers and search engines. */
  alt: string;
};

export type Article = {
  /** Used in the URL: /blog/[slug] */
  slug: string;
  /** The h1 of the article. */
  title: string;
  /** Meta description and card summary (~140-160 characters). */
  description: string;
  intro: RichText;
  featuredImage: ArticleImage | null;
  /** ISO date, e.g. "2026-11-10". */
  publishedAt: string;
  /** ISO date of the last meaningful update, or `null`. */
  updatedAt: string | null;
  /** Real author name only (owner-provided). `null` = not shown. */
  author: string | null;
  /** Only "published" articles are listed and linked. */
  contentStatus: "draft" | "published";
  sections: ArticleSection[];
  /** Slugs of related articles (shown at the bottom). */
  relatedSlugs: string[];
};

/** Data needed to show an article card. */
export type ArticleCardData = {
  title: string;
  description: string;
  href: string;
  /** ISO date shown on the card (updated date if available). */
  date: string | null;
};

/** One link in the breadcrumb trail. The last item (current page) has no href. */
export type BreadcrumbItem = {
  label: string;
  href?: string;
};

/** One entry in a table of contents. */
export type TocItem = {
  id: string;
  label: string;
};
