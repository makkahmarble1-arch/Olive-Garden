@AGENTS.md

# Project: Olive Garden Menu & Prices

Independent, informational food blog for US diners: menu items, prices,
calories, and helpful guides. **Not an official Olive Garden website.**

Planning docs (read the relevant one before working on a feature):
- `docs/PROJECT_REQUIREMENTS.md`: scope, accuracy and legal rules
- `docs/SEO_ARCHITECTURE.md`: URLs, metadata, structured data, internal linking
- `docs/DESIGN_SYSTEM.md`: colors, typography, component styles, accessibility
- `docs/DEVELOPMENT_ROADMAP.md`: folder structure, content model, phases, open questions
- `docs/MENU_INVENTORY.md`: **owner-approved content scope** (17 categories,
  210 placements). Not verified menu facts. Owner's file: do not edit without asking.
- `docs/CONTENT_ARCHITECTURE.md`: **approved** 17 category URLs, distinct
  intent per page, overlaps, aliases, menu data model (product / offering / category)
- `docs/MENU_PAGE_OUTLINES.md`: SEO outline for the homepage and each menu page
- `docs/MENU_RESEARCH_PLAN.md`: how prices/calories are researched and verified
- `docs/INTERNAL_LINKING.md`: navigation, breadcrumbs, contextual links
- `docs/IMAGE_REQUIREMENTS.md`: image rules, folders, naming, specs
- `docs/IMAGE_MANIFEST.md`: every image file, its folder, menu item, and alt text
- `docs/CATEGORY_PAGE_ARCHITECTURE.md`, `docs/CATEGORY_CONTENT_STANDARDS.md`,
  `docs/CATEGORY_DEVELOPMENT_CHECKLIST.md`: category page layout, writing
  rules, and per-page steps (Lesson 8). Keyword research: `research/seo/`
- `research/`: research notes per category (`appetizers/`) and the homepage
  competitor research (`homepage/`, original observations kept unchanged)

## Owner

- Complete beginner. Explain changes in simple **Roman Urdu**, briefly.
- Keep code, file names, commands, and technical terms in English.
- All public-facing website content in **English** (US audience).
- Work in small steps. After each step say how to check it in the browser.

## Stack

Next.js 16 (App Router, Turbopack, `cacheComponents` enabled), React 19,
TypeScript, Tailwind CSS v4 (config lives in `app/globals.css`, there is no
`tailwind.config`), ESLint 9. Hosted on Vercel from GitHub.

- Next.js 16 differs from older versions. Check `node_modules/next/dist/docs/`
  before using an API you are not sure about.
- `params` in pages/layouts is a Promise: `const { slug } = await params`.
  Type with `PageProps<"/blog/[slug]">`.
- With `cacheComponents`, `generateStaticParams` must return at least one item.

## Commands (run inside `olive-garden-menu/`)

- `npm run dev`: dev server at http://localhost:3000
- `npm run lint`: ESLint
- `npm run build`: production build (run before committing larger changes)

## Development rules

- Reusable components in `components/`; content/data in `content/`;
  helpers and types in `lib/`. See the roadmap for the folder layout.
- Reuse existing components before creating new ones: `MenuTable`,
  `PriceNotice`, `CategoryCard`, `Breadcrumbs` (includes BreadcrumbList
  JSON-LD), `TableOfContents`, `ArticleLayout`, `RelatedArticles`,
  `VerificationBadge`, `PlaceholderImage`, `SectionHeading`, `Container`.
- Pages read content through `lib/content.ts` helpers, and build URLs with
  its path helpers (`menuPath`, `menuCategoryPath` → `/{slug}`, `articlePath`).
- Menu data: `content/menu/` (`categories.ts`, `products.ts`,
  `offerings/<category>.ts`, `locations.ts`, `aliases.ts`). Types in
  `lib/types.ts`; `lib/menu-validation.ts` runs on every dev/build and must
  stay passing. Never weaken a validation rule to make data pass.
- Server Components by default. Add `"use client"` only when a component
  needs state, effects, or browser events.
- Do **not** add npm dependencies without asking the owner first and
  explaining why. Prefer built-in Next.js features (`next/image`,
  `next/font`, Metadata API, `sitemap.ts`, `robots.ts`).
- Use design tokens from `globals.css` (e.g. `text-brand-dark`), not raw hex.
- `#a1b626` (`brand`) is **never** used for text on white (contrast 2.27:1).
  Use `#556b12` (`brand-dark`) for links and text accents.
- Keep it simple: no CMS, no auth, no enterprise patterns. No database,
  **except** persistent storage for the approved rating system: **Supabase**
  (Free Plan, connected in Lesson 7.4.2). Client: `lib/supabase.ts`
  (publishable key only, RLS always on); setup and rules:
  `docs/SUPABASE_SETUP.md`. Never print or commit keys.
  Rating schema: `supabase/migrations/001_create_ratings.sql`, design and
  security rules: `docs/RATING_SYSTEM.md` (writes only via server API +
  secret key; browsers read totals only).
  Rating UI: `components/rating/` (one `/api/ratings` request per page,
  cached ~1 min on the server). Votes: `POST /api/ratings/vote` only
  (same-origin, signed HttpOnly visitor cookie, secret key server-only in
  `lib/supabase-admin.ts`). Never test votes on the real database.
- Do not change files unrelated to the current task.
- Never commit secrets. Use `.env.local` (already git-ignored) if ever needed.
- Commit only when the owner asks.

## Owner decisions (current)

Full status table: "Owner decisions and pending information" in
`docs/DEVELOPMENT_ROADMAP.md`. The owner supplies missing info in the phase
where it is needed. Never fill gaps with invented data.

- Site name: **Olive Garden Menu Prices** (owner-approved, Lesson 9.5,
  2026-11-14), defined only in `lib/site.ts`. Always paired with
  non-affiliation disclaimers. Publisher: the "Olive
  Garden Menu Prices Editorial Desk" only (`content/site/publisher.ts`,
  `docs/PUBLISHER_IDENTITY.md`). Owner decision 2026-11-14: no personal founder
  profile; `founder` stays `null` and is not rendered. Never publish a real
  person's name, bio, photo, or credentials without the owner's written
  confirmation of that person's authorization. Never invent people,
  credentials, addresses, or phone numbers.
  Trademark: the owner declined a lawyer for now. Keep the brand-safety
  safeguards in `docs/PUBLISHER_IDENTITY.md` (independent branding, no official
  logo, visible disclaimers, no affiliation claims) and never claim legal clearance.
- Domain (owner decision 2026-11-13): **https://olivegardenmenuprices.us**.
  Still **never hardcode it** in code: it is set as `NEXT_PUBLIC_SITE_URL` in
  Vercel Production (fallback `http://localhost:3000`). Do not migrate,
  redirect, or change any existing website of the owner.
- Menu categories/items: defined by `docs/MENU_INVENTORY.md`. All 17
  categories, all 210 entries, and every category-item association are
  preserved (imported in `content/menu/offerings/`). Never delete an entry.
  Never merge possible aliases (A1–A17, `content/menu/aliases.ts`) without
  owner confirmation. Keep `inventoryName` exactly as in the inventory.
- **Research final (2026-11-12, owner Decisions 1-4):** `research/menu/`
  covers the 210 inventory entries plus **21 new official items** (231
  offerings, 146 products), 23 Create Your Own Pasta options, alias
  decisions (`ALIAS_MAPPING.md`: shared data/photos only, nothing merged),
  and a full nutrition-PDF cross-check. **Integrated into `content/menu/`
  in Lesson 7.2 (2026-11-12)**: offerings, products, Create Your Own Pasta
  options (`create-your-own-pasta.ts`), alias decisions. The offering files
  were generated from `menu-research.json`; edit values in `content/menu/`
  from now on and record the source in `research/`.
- **Approved URLs:** 17 dedicated category pages at the **root** with the
  exact slugs in `docs/CONTENT_ARCHITECTURE.md` §2 (e.g. `/lunch-menu`,
  `/kids-meal`). Not under `/menu/`. Never merge or rename them.
- **Final decisions of 2026-11-12** (details in the docs named below):
  1. **Architecture:** the homepage `/` is the **primary indexable full-menu
     page**: all 17 categories and every approved item (image, name, price,
     calories, rating, short description, size/portion options). Spec:
     `docs/MENU_PAGE_OUTLINES.md` "Homepage". The 17 category pages stay and
     add detailed category-specific content; each is indexed when complete
     and approved. One shared structured data source (`content/menu/`).
     `/menu` is **not** a full-menu page: since 2026-11-13 it **permanently
     redirects to `/`** (`next.config.ts`, HTTP 308). Internal links use
     `menuPath` = `/#full-menu`, never `/menu`.
  2. **Images:** homepage = a food image for every item; category pages =
     Option B (complete table + 3-5 selected images, reusing homepage images).
     The owner provides all food images. Never generate or download them.
     Every file is listed in `docs/IMAGE_MANIFEST.md`. Owner-supplied
     AI-generated images are allowed (2026-11-13): mark them
     `aiGenerated: true` and list them in the manifest (internal record only).
     **Never mention "AI-generated" on cards or menu pages** (owner
     decision 2026-11-14): no card label, no note there. Exception (owner
     decision 2026-11-14, Lesson 9.6): the **Disclaimer page** discloses that
     some food images are AI-generated illustrations. Elsewhere public text
     only says the photos are supplied by the site owner, are not official
     Olive Garden photos, and actual presentation may vary.
  3. **Popular Menu Items** (owner-chosen, fixed): Chicken Alfredo, Tour of
     Italy, Lasagna Classico, Chicken Parmigiana, Fettuccine Alfredo,
     Breadsticks. Shown with image, price, calories, and genuine visitor
     rating from the shared data. No invented popularity or sales claims.
  4. **Social media:** footer links only with URLs the owner supplies.
  5. **Prices/calories:** reference restaurant **Olive Garden Orlando -
     Millenia Mall** (4101 Conroy Road, Orlando, FL 32839), **online pickup**
     prices. This location is **internal only** (data, research, docs); it is
     never shown on the public site (see "Public display standards" below). Source priority and labels in `docs/MENU_RESEARCH_PLAN.md`
     (official → official nutrition → calculated → labeled third-party estimate).
  6. **Ratings:** genuine 1-5 star visitor ratings (average + vote count,
     "Not rated yet" when none), shared by homepage and category pages, with
     basic duplicate/spam protection and persistent storage. Built in its own
     lesson; architecture and database decided then.
- **Approved design (final, owner-confirmed 2026-11-14, Lesson 8.5.1):**
  - The premium menu card (`components/menu/MenuItemCard.tsx`, `docs/DESIGN_SYSTEM.md` 4.2) is the design for **every** menu card (commit `63ed27d`). It supersedes the Lesson 8.5 note against a global rollout.
  - The dark olive homepage hero (4.1) is also approved.
  - Do not revert, redesign, resize, or restyle either one without owner approval. Keep the approved font sizes and weights (descriptions at normal weight), the cream card background, olive colors, calorie pills, photo styling, and compact gold star ratings.
- **Category status (2026-11-14, Lesson 8.5.1):** all 17 category pages are `published` (content status only). Pre-launch `noindex` stays on until `SITE_INDEXING=true` at launch.
- Privacy Policy, author information, and final branding: later lessons
  (owner, 2026-11-13). Homepage performance: keep the current approach
  (option A, `docs/PERFORMANCE_AUDIT.md`).
- **Lesson 8 (next phase):** SEO-optimized dedicated category pages. Each
  page follows an owner-approved primary keyword, semantic keyword cluster,
  search intent, competitor analysis, and outline. Do **not** write or build
  a category page before its SEO instructions are provided.
- Author, contact email: pending. Do not invent names, credentials, or emails.
- Logo: pending. Food images: supplied by the owner over time; until a
  photo exists, use a placeholder clearly labeled as a placeholder.
- Blog topics/outlines: provided in the blog phase.
- GitHub: set up in the deployment phase; default branch `main`.
- Analytics and ads: **do not implement** until the final integration phase.

## Content and accuracy rules

- **Never invent prices, calories, or nutrition facts.** Every displayed
  value has a source, a date, and (for prices) the approved reference
  location. Each value has one basis, always visible on the page:
  **official** (verified) · **calculated** (from official component values,
  labeled, parts shown) · **estimated** (credible third-party source, labeled
  "Estimated", cross-checked where possible). Never overwrite an official
  value with an estimate; never present an estimate or calculation as
  official. Full rules: `docs/MENU_RESEARCH_PLAN.md`.
- Goal: no empty price or calorie cells. If no credible value exists, the
  cell shows a meaningful note (e.g. "Not on the online menu") instead of a
  number. "Not verified yet" is used only while research is unfinished.
- Never invent menu descriptions; `description` stays `null` until written
  (in our own words) from verified official information.
- Hours, holiday hours, lunch specials, and deals appear only when verified
  from an official source with a date; otherwise the section says so.
- Every price table shows the month and year prices were last verified and
  the note "Prices may vary by location across the USA."
- Clearly separate verified data from placeholders in code and on the page.
- Never present the site as official. Footer disclaimer on every page:
  not affiliated with Olive Garden or Darden Restaurants, Inc.
- No Olive Garden logo, official photos, or brand styling.
- Ratings come only from real visitor votes. Never seed, generate, or
  import ratings or vote counts. No reviews or testimonials.
- Menu names: keep the owner's `inventoryName`; record official name
  differences separately. Never remove or merge items without permission.
- Write helpful, natural content. No keyword stuffing.

## Public display standards (owner-approved 2026-11-13, permanent)

Apply to the homepage, every category page, shared components, and all future pages.

1. **Location:** the public site shows the target country, **USA**, never the
   reference restaurant (no Orlando, Florida, Millenia Mall, street address,
   phone, or "at our Orlando restaurant" labels). Use `siteConfig.market` and
   `siteConfig.locationNotice` ("Prices may vary by location across the USA.").
   Never imply that all restaurants charge the same price. Neutral wording such
   as "the prices we verified" or "the restaurant we checked" is fine. The
   exact reference location stays in `content/menu/locations.ts`, offering
   data, `research/`, and docs.
2. **Dates:** public verification dates show **month and year only**
   ("Last verified: November 2026") via `formatMonthYear()` (`lib/format.ts`),
   in hero bars, section headers, source notes, and text. Keep full ISO dates in
   data, research, `<time dateTime>`, JSON-LD `dateModified`, and the sitemap.
   Never advance the month without a real re-check. (Event dates such as
   holiday dates are not verification dates.)
3. **Sources:** category pages end with a short "Sources" box
   (`components/category/SourceNote`): one sentence, one official source
   (Olive Garden website, or the nutrition PDF via `officialSource`), at most
   one extra official page (`extraSource`) when an important claim needs it,
   "Last verified: Month Year", and the disclaimer. The full source list stays
   in `sources` (not rendered) and in `research/`.
4. **Related Menus:** the section is titled "Related Menus"; cards use the
   target page's real article title (`menuTitle`, e.g. "Olive Garden Lunch
   Menu") and link to its URL. Only live pages are shown (published; preview
   targets only from another preview page), never the page itself, never a
   placeholder. Planned entries appear automatically when their page is finished
   (`getRelatedMenus` in `lib/category-data.ts`).
   **Exactly 4 cards per article, one row on desktop** (owner decision
   2026-11-15; 2 x 2 on tablets, stacked on phones). Choose the 4 most relevant
   pages; a guide such as `/dinner-menu` can be a card (`{ guide: "dinner-menu" }`).
   Validation fails if a category page does not list exactly 4.

## SEO rules

- One search intent per URL. Before creating a page, check that no existing
  page targets the same intent. No separate calorie pages. Individual menu
  item pages at `/menu/{slug}` are an **approved permanent part of the
  architecture** (owner decision 2026-11-15, supersedes "no per-item pages"),
  each only after the content checklist (see "Menu item pages" below).
- The homepage is the only indexable full-menu page ("Olive Garden menu
  with prices and calories"). `/menu` permanently redirects to `/`
  (owner decision 2026-11-13, see `docs/SEO_ARCHITECTURE.md`).
- Homepage headings: one H1 ("Olive Garden Menu with Prices & Calories
  2026"), one H2 per category (17), eight supporting H2s (the Menu PDF section was added 2026-11-21); H3 only when needed.
  Section order: `docs/MENU_PAGE_OUTLINES.md` "Homepage".
- Homepage and category pages share data, not paragraphs: category pages
  add expanded, category-specific content instead of repeating the homepage.
- Overlapping category pages (e.g. Amazing Alfredos vs. Classic Entrees)
  each need their own intent and angle; never copy paragraphs between pages.
- Any placeholder page must be `robots: { index: false }` until approved
  content exists. Do not create `/blog/[slug]` until the owner approves it.
- Category pages: `app/[category]/page.tsx` renders a category only when its
  `contentStatus` is `"preview"` (linked, noindex) or `"published"` (indexed)
  and it has an entry in `content/menu/category-pages.ts`. Other paths 404.
  Owner approval is needed before a category becomes `"published"`.
- Category breadcrumbs: `Home > Menu > {Category}`.
- **HTTP 404 for unknown URLs: `proxy.ts`** (owner approval 2026-11-14).
  - Also matches `/menu/:slug` (2026-11-15): only live menu item slugs pass (`liveProductSlugs`), everything else is a real 404.
  - **What it checks:** one-segment URLs (matcher `/:segment`). A segment is allowed if it is:
    - a category with a page (read from `content/menu/categories.ts`, the same rule as `app/[category]`)
    - a top-level `app/` folder that contains a `page` or `route` file (`APP_TOP_LEVEL_ROUTES`)
    - a real top-level file: `public/` files and app metadata files such as robots.txt, sitemap.xml, favicon.ico (`APP_TOP_LEVEL_FILES`)
    - a Next.js internal path starting with `_`
    - Both lists are read from the file system in `next.config.ts` at build/dev start. Since Lesson 8.6 (fix F1), dotted names such as `/.env` or `/package.json` and folders without a page such as `/api` return 404.
  - **Anything else** is rewritten to an unmatched internal path, so it gets the normal 404 page with a real HTTP 404.
  - **Untouched:** no database, no route list to maintain. `/`, API routes, `/_next`, images, and deeper paths never reach it.
  - **Future routes:**
    - A new static page folder (`app/about`, `app/blog`) works automatically; restart `npm run dev` after adding a top-level folder.
    - A new category works automatically once its `contentStatus` is not `placeholder`.
    - A new **dynamic** route (e.g. `app/blog/[slug]`, or another top-level `[param]`) can again return HTTP 200 for unknown slugs (streaming). Extend `proxy.ts` (matcher plus a check against that route's real slug data) in the same lesson that adds it.
    - Never put an extensionless file at the top of `public/`.
- `/design-preview` is a dev-only component preview (404 in production).
  Its sample data must never be imported into public pages.
- Every page: unique `title`, `description`, self-canonical, Open Graph,
  Twitter card: build it with `pageMetadata()` from `lib/metadata.ts`.
- **Indexing is OFF until launch:** `SITE_INDEXING=true` (Vercel Production,
  owner approval) switches it on; never set it locally or in previews.
- One `h1` per page; logical heading order.
- JSON-LD via the shared `JsonLd` component, escaped with
  `.replace(/</g, "\\u003c")`. Allowed: `WebSite`, `Organization` (this blog), `WebPage`
  (and its subtypes `AboutPage`, `ContactPage`), `BreadcrumbList`, `BlogPosting`,
  `FAQPage` (only for visible FAQs). No `Person` until the founder's details are approved.
  Not allowed: `Restaurant`, `Menu`, `Product`, `Offer`, `Review`, `AggregateRating`
  (visitor ratings are shown on the page, but not as structured data).
- Sitemap `lastModified` uses real `updatedAt` dates, not `new Date()`.

## Accessibility and performance

- Target WCAG 2.2 AA; mobile-first; touch targets at least 44px.
- Semantic HTML, real `<table>` with `<th scope>` for prices, visible focus styles.
- All pages statically generated (rating data may load separately, without
  slowing the page). `next/image` for images; `priority` only for the main
  above-the-fold image. The full-menu homepage must stay fast: lazy-load
  images below the fold.

## Information pages and contact form (Lesson 9.5)

- `/about-us` and `/contact-us` use `components/info/InfoPageLayout.tsx`. Their status is in `content/site/info-pages.ts`: `preview` means `noindex`, a notice on the page, and no sitemap entry. Plan: `docs/IMPORTANT_PAGES_PLAN.md`.
- The contact form posts to `POST /api/contact` (same-origin, honeypot, timing check, in-memory rate limit, shared validation in `lib/contact.ts`) and sends email through Resend's HTTP API (`lib/contact-email.ts`, server-only, no npm package).
- Env vars, all server only: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. Without them the form is switched off and the API returns 503 `not_configured`.
- Never fake a success. Never store messages (no Supabase) without owner approval. Never log message content.
- Setup and tests: `docs/CONTACT_FORM_SETUP.md`.

## Legal pages and privacy (Lesson 9.6)

- `/privacy-policy`, `/terms-and-conditions`, `/disclaimer` use `InfoPageLayout` (with `showUpdated` and `toc`); all are linked in the footer.
- They must describe only what the code actually does. Source of truth: `docs/PRIVACY_DATA_INVENTORY.md`.
- Change both the inventory and the policy (and the real `updatedAt`) **before** adding cookies, providers, analytics, or ads.
- Legal pages show **complete** "Effective date" and "Last updated" dates (`effectiveAt`/`updatedAt`; owner decision 2026-11-14). This is an exception to the month-year rule, which still applies to all menu and verification dates.
- Retention (owner, 2026-11-14): contact emails up to 12 months (manual monthly mailbox review); ratings have no fixed expiration (manual deletion on request or for moderation). Do not describe these as automated.
- AdSense, GA4, and Clarity are planned only. No script, no fake consent banner. Steps: `docs/GOOGLE_ADSENSE_COMPLIANCE_CHECKLIST.md`. Open legal items: `docs/LEGAL_PAGES_REVIEW.md`.

## Editorial pages (Lesson 9.7)

- `/editorial-policy` and `/how-we-check-prices` (`InfoPageLayout`; status in `content/site/info-pages.ts`) must stay in line with `docs/MENU_RESEARCH_PLAN.md` and the real data.
- If the research method, labels, or calculations change, update these pages too. Never claim staff, credentials, firsthand dining, live price monitoring, or a fixed update schedule.
- The homepage "How we check prices" link points to `/how-we-check-prices`.

## Global header, navigation, and site search (2026-11-15)

- **One header** for all pages: `components/layout/Header.tsx` (layout), specified in `docs/DESIGN_SYSTEM.md` 4.4.
- The navigation comes from `lib/navigation.ts`, which is built from the category data, `content/guides/`, and `content/site/info-pages.ts`. Never hardcode a link to a page that does not exist; hide items without a destination.
- **Site search:**
  - `app/api/search-index/route.ts` builds a small static index: titles, short descriptions, keywords, and URLs of published pages and key homepage sections. It holds no article bodies, no drafts, and no admin or API routes.
  - `components/layout/SiteSearch.tsx` loads the index once, on first use, and ranks it with `lib/site-search.ts` (partial words, small typos; no dependency, no external service).
- **Adding a page:**
  - New category pages, and info pages with `status: "published"`, appear in the navigation and search automatically.
  - A new article type (e.g. a Dinner Menu or Hours article) needs an entry in `lib/navigation.ts` and in the search-index route once it is published.
  - Top-level routes need no `proxy.ts` change.
- **Header height** is `--header-h` (`globals.css`). If the header height changes, keep this value equal, because sticky bars and anchor offsets depend on it.
- **Logo:** use only the owner's icon (menu book + olive branch, `public/images/brand/logo-icon.webp`). Never use the owner logo's script lettering or "Italian Kitchen" tagline, or anything resembling the official Olive Garden logo (brand safety, `docs/PUBLISHER_IDENTITY.md`).

## Global footer (2026-11-15)

- **One footer** for all pages: `components/layout/Footer.tsx`, specified in `docs/DESIGN_SYSTEM.md` 4.5.
- Its link columns come from `getFooterColumns()` in `lib/navigation.ts`. Change footer links there, never in the component. Category links appear only if the category page exists; info links only if the page is `published`.
- **Dinner Menu** is the `/dinner-menu` guide (see "Guide pages" below). It appears in the header, footer, and search while its status is `published`.
- The footer disclaimer text is fixed (owner-approved): "Olive Garden Menu Prices is an independent informational website and is not affiliated with or endorsed by Olive Garden or Darden Restaurants." It must stay on every page.
- No social links (only with owner-supplied URLs), no newsletter, no links to pages that do not exist.
- **Favicon:** `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png` (simplified menu book + olive leaf, no text).

## Guide pages: Dinner Menu (2026-11-15)

- **`/dinner-menu` is a guide, not a category.** Olive Garden has no separate dinner menu, so the 17 approved categories and the inventory stay unchanged.
  - Content: `content/guides/dinner-menu.ts` (`GuidePageContent`), registered in `content/guides/index.ts`.
  - Route: `app/dinner-menu/page.tsx`. Layout: `components/guide/GuidePageLayout.tsx`, which uses the category components, so the design is identical.
- **Data:** only the shared menu data (existing offering ids, images, and rating groups). The section price overview (`priceOverview`) and the example orders (`mealExamples`, labeled "Calc.") are generated in `lib/category-data.ts`.
  - Prose numbers must match the data. When prices change, update the guide text too; the fact log is `research/seo/dinner-menu/FACT_VERIFICATION.md`.
- **Its own intent:** dinner time, dinner prices by section, dinner for two, dinner specials, and short lunch-vs-dinner rules.
  - Never copy the full entrée list (`/classic-entrees`), the lunch-vs-dinner table (`/lunch-menu`), or the lighter-portions table (`/lighter-portions`); link to them instead.
  - Rules: `research/seo/KEYWORD_CANNIBALIZATION.md` §7.
- **A published guide automatically appears in** the footer, the search index, and the sitemap. The header needs an entry in `getMainNav`.
  - No `proxy.ts` change is needed.
  - A guide slug must never equal a category slug (build check).
- **Hours:** see "Guide pages: Hours" below.

## Guide pages: Hours (2026-11-15)

- **`/hours`** is a guide (`content/guides/hours.ts`, route `app/hours/page.tsx`).
  - It has static tables (`staticTable` blocks): weekly hours, lunch and dinner menu times, holidays, and To Go cutoffs. It has no prices and no photos.
  - Fact log: `research/seo/hours/FACT_VERIFICATION.md`.
- **Hours rules:**
  - Each restaurant sets its own hours. Show only what official Olive Garden listings and the FAQ show, never as guaranteed nationwide.
  - No "open now" status, no visitor location, no time-zone logic.
  - Holidays: only the official closures (Thanksgiving Day, Christmas Day) and the "may close early" days (the day before Thanksgiving, Christmas Eve) are facts. Everything else is "Not announced" or "Varies by location". Never invent holiday times.
  - Never use `LocalBusiness`, `Restaurant`, or `OpeningHoursSpecification` schema.
- **Navigation:**
  - The header Hours dropdown points to `/hours`, `/hours#holiday-hours`, Lunch Hours, and Dinner Hours.
  - A future holiday article (owner approval needed) is a guide with `navGroup: "hours"` and `navLabel`; it then appears in that dropdown automatically.
  - The footer lists "Olive Garden Hours" under Explore More.
- **Homepage:** its Hours and Holiday Hours sections stay, and end with links to `/hours` and `/hours#holiday-hours` (owner approval 2026-11-15; shown only while the guide is published).

## Nutrition & Meal Price Calculator (Improvement 7, 2026-11-20)

- **`/nutrition-calculator`**, status **`published`** (owner approval 2026-11-20, `ownerApprovedAt` in `content/tools/nutrition-calculator.ts`): live everywhere and linked (header "More", footer "Explore More", search kind "Tool"); in the sitemap once `SITE_INDEXING=true` (indexing stays off). Owner decision 2026-11-20: Buy One Take One / $6 Take Home promotion entries stay out of the calculator (conditional prices).
- Docs: `docs/tools/NUTRITION_CALCULATOR_ARCHITECTURE.md`, `NUTRITION_CALCULATOR_DATA_RULES.md`, `NUTRITION_CALCULATOR_TEST_REPORT.md`. Tests: `npm run test:calculator` (must pass; update its named examples when menu data changes).
- Data only from the shared menu data (`lib/calculator-data.ts`, build check `validateCalculatorData`): one item per dish, its offerings as choices (regular, lunch, lighter, kids, gluten-sensitive, family-style, catering), item-page versions with their own rows, identical listings merged, same-dish listings (`equivalentOfferingIds`) joined. Excluded: promotion entries, not-listed/unavailable items, merchandise, group entries (Homemade Soups group).
- Protein, carbs, fat, sodium only from an official row with the same calories as that exact choice; never borrowed from another version or size, never for ranges or bundles. Per-slice/per-breadstick calories are never paired with a whole-cake/order price.
- Totals (`lib/calculator-math.ts`): value × quantity; a missing value is never zero (each total says how many items it includes, e.g. "1 of 3 items", and one "How these totals are counted" note names the dishes without an exact value; "Not listed" when nothing is known); "less than" counted at its limit with "≤"; calorie ranges stay ranges; bundles count once with Olive Garden's own total. Fixed price disclosure: "Prices vary by location. Estimated totals exclude taxes, tips, delivery fees, and other charges." No discounts, taxes or fees; no allergen filtering or safety claims.
- One client component (`components/calculator/NutritionCalculator.tsx`), no API calls, no storage, no new dependency. Design: `docs/DESIGN_SYSTEM.md` 4.7.
- **Download PDF and Print** (owner request 2026-11-20) under the meal totals: one report (`lib/meal-report.ts`) for both; the PDF is written in the browser without a library (`lib/meal-pdf.ts`); Print shows only the report (`#meal-print`, print CSS in `app/globals.css`). Same values, "Incomplete" notes and disclosures as the screen; nothing is sent or stored.

## Homepage Menu PDF (Improvement 8, 2026-11-21, waiting for owner review)

- Homepage section **H2 "Olive Garden Menu PDF with Prices"**, anchor `/#menu-pdf`, between "How to Order Olive Garden Online" and the FAQs. **No separate article or route** for it. Linked from the header "More" menu, the footer "Popular Menus" column and site search (all to `/#menu-pdf`).
- The PDF (`/downloads/olive-garden-menu-with-prices.pdf`, US Letter) is generated from the shared menu data with the homepage display helpers (`lib/menu-pdf.ts`, writer `lib/pdf-writer.ts`, no library) and **prerendered at every build** by a synchronous route handler, so it always matches the website. Deterministic (same data → same bytes). All 17 categories, every homepage entry (231) plus the Create Your Own Pasta options; missing values are notes, never invented.
- Always `X-Robots-Tag: noindex` + canonical link to the homepage; not in the sitemap. Do not change robots or `SITE_INDEXING` for it.
- Images inside the PDF: JPEG copies of the owner's logo and homepage photo in `content/menu-pdf/` (re-create with `node scripts/menu-pdf-assets.mjs` when those images change). Never other or new images.
- Print prints the PDF, not the page (hidden frame on desktop; opens the PDF on touch devices). The in-page preview loads only on click.
- Docs: `docs/tools/MENU_PDF_ARCHITECTURE.md`, `MENU_PDF_TEST_REPORT.md`. Tests: `npm run test:menu-pdf` (must pass).

## Launch and post-launch (owner decision 2026-11-22)

- **Launch the existing completed site; no new articles or features before launch.** Launch scope: homepage (with the Menu PDF section), 17 category pages, `/dinner-menu`, `/hours`, 122 item pages, `/nutrition-calculator`, 7 information/legal pages (150 pages; checklist `docs/LAUNCH_CHECKLIST.md` §19).
- **POST-LAUNCH** (`docs/POST_LAUNCH_ROADMAP.md`): coupons/promo codes article, Never-Ending Pasta Bowl article, holiday hours articles, blog, a Specials & Deals article, more calculators/tools, Menu PDF owner review and real-device checks, data upkeep, author profile, social links, analytics/ads. Never create routes, placeholders or links for them before the owner starts an item.
- **Indexing switch** (`lib/site.ts`): ON only when `SITE_INDEXING=true` **and** the build is the Vercel Production deployment (`PRODUCTION_DEPLOYMENT=1`) **and** the site URL is a public https domain (never `localhost` or `*.vercel.app`). Local builds and preview deployments stay `noindex` even if the variable is set by mistake.
- **Site URL** (`lib/site.ts`, 2026-11-23): `NEXT_PUBLIC_SITE_URL`, else on the Production deployment Vercel's `VERCEL_PROJECT_PRODUCTION_URL` (passed as `VERCEL_PRODUCTION_HOST` in `next.config.ts`), else `http://localhost:3000`. Never hardcode the domain. Live on 2026-11-23 the domain served the site with `SITE_INDEXING` on but `NEXT_PUBLIC_SITE_URL` missing, so robots.txt, the sitemap and every canonical pointed to `http://localhost:3000`; fixed by this fallback plus the fail-safe (not deployed until the owner approves).

## Menu item pages (owner decisions of 2026-11-15)

- **Permanent architecture:** individual item pages at `/menu/{slug}` (`app/menu/[slug]/page.tsx`). First page: `/menu/fried-mozzarella`, **`published` on 2026-11-18** (owner approval of design and data; `ownerApprovedAt: "2026-11-18"`). Status on 2026-11-18 (item-page phase complete): **all 77 pages are `published`**. The owner confirmed visual approval of the remaining 76 on 2026-11-18; the approval dates are in `content/menu/product-pages/approvals.ts` and the four standalone page files. Indexing stays off.
  - Coverage of all 146 products, with the reason for each product without a page: `docs/product-pages/PRODUCT_INVENTORY.md`. Open points: `research/products/PENDING.md`.
  - **Complete coverage round (owner decisions 2026-11-19):** 45 more pages (soups, wines, beers, simple drinks, kids, bundles/combinations), **published 2026-11-19 after the owner's visual approval**, so **all 122 pages are `published`**. The owner also accepted (2026-11-19) the 150-calorie kids five cheese marinara sauce value from the online menu, the shared `homemade-soups` rating group for the three soups, and the November 2026 prices as last verified. Tools (`PRODUCT_PAGE_ARCHITECTURE.md` §5d): detail-only records (`content/menu/detail-items.ts`, the three soups; never listed in a category, inventory unchanged), `equivalentOfferingIds` (same dish as a catering tray/family pan/gluten-sensitive listing; never merged), `ratingProductId` (soups share `homemade-soups`), required `nutritionUnavailableNote`/`allergenUnavailableNote` disclosures, and `components` ("What's Included"). Kids pasta calories are now pasta + sauce (Calc.); the kids five cheese marinara row is missing from the guide (documented).
  - Drinks use `allergensNotListed`, because the allergen guide does not cover to-go drinks. Version selector entries may have `nutritionRowId`/`allergenRowId` = null when the guide does not list a version; they then show calories only, with a clear disclosure.
  - **Version-aware layout** (Phase 4, owner approval 2026-11-18): dishes with officially listed versions get one page with `versions`. Each version has its own price, calories, nutrition row and allergen row. The UI is a selector plus an "all versions" table (`components/product/VersionSection.tsx`, `VersionSelector.tsx`), and a build check verifies every version against the shared data. Never merge genuinely different dishes.
  - **`heroImageOmitted`:** replaces a materially misleading photo with a labeled placeholder on the item page only (gluten-sensitive Grilled Chicken Parmigiana).
  - **Owner decisions 2026-11-18:** 13 pages may be published with disclosed gaps, recorded per page as `acceptedGaps`: the gluten-sensitive placeholder, 3 versions without official rows, and 9 drinks outside the allergen guide, whose notice says "not allergen-free". These pages were published with their disclosures after the owner's visual approval on 2026-11-18. **Future pages:** publish only after the owner's actual approval, by adding the slug to `approvals.ts` and setting it to `published` in `registry.ts`. Next pages follow `docs/product-pages/PRODUCT_DEVELOPMENT_PLAN.md`, one small batch at a time, each with owner approval. Never generate pages for every product id. Do not commit or push without the owner's request.
- Docs: `docs/product-pages/` (`PRODUCT_PAGE_ARCHITECTURE.md`, `PRODUCT_DATA_STRUCTURE.md`, `PRODUCT_PAGE_DESIGN.md`, `PRODUCT_CONTENT_CHECKLIST.md`, `NUTRITION_ALLERGEN_DATA.md`, `COMPETITOR_ANALYSIS.md`). Fact log per item: `research/products/<slug>/FACT_VERIFICATION.md`.
- **Plan and inventory:** `docs/product-pages/PRODUCT_DEVELOPMENT_PLAN.md` (67 candidates in 7 phases) and `PRODUCT_ELIGIBILITY_REPORT.md`.
- **Visibility:** `draft` = 404 everywhere. `preview` = reachable and linked (cards, price tables, search) only in local development, local `next start`, and Vercel preview deployments; on the **production deployment** (`VERCEL_ENV=production`, flag `PRODUCTION_DEPLOYMENT` in `next.config.ts`) it is HTTP 404, unlinked, and not in search. `published` = live everywhere and in the sitemap; indexed only when `SITE_INDEXING=true` (stays **off**).
- **Publishing** needs owner approval (`ownerApprovedAt`), owner visual review, verified product information, every checklist item `done`, and the official nutrition + allergen records (build check in `lib/product-pages.ts`).
- Data: one file per item in `content/menu/product-pages/`. Prices, calories, serving sizes, photos, category and rating key are always read from the shared offerings/products.
- **Central official nutrition and allergen data** (`content/menu/nutrition/`, `lib/nutrition-data.ts`, docs `docs/product-pages/NUTRITION_ALLERGEN_DATA.md`): every row of the owner-supplied U.S. Nutrition Information (303 rows) and Allergen Guide (112 rows), both **US_101926**, stored once with PDF page numbers; `offering-map.ts` gives every one of the 231 offerings a status (exact, same-item, variants, conflict, generic, composite, multi-row, not-in-guide...). Only `exact`/`same-item` rows are shown as an item's official values. `null` = not printed (never zero); "less than" values are kept. The files are GENERATED by `research/nutrition-extraction/` (re-run for a new PDF version; never hand-edit values). Owner PDFs live in `research/official-sources/` (git-ignored). Never use third-party or Canadian values.
- **Calories must agree:** the build fails if an exact/same-item official row's calories differ from the calories shown on the site. Such a case is marked `conflict` and needs an owner decision; never change existing menu calories without approval. Owner decision 2026-11-18: catering Sicilian Cheesecake now 730 per slice (official, same dessert and serving). Side of Crispy Shrimp Fritta: final owner decision 2026-11-18 = keep 200 (the guide's 220 is a pasta-topping row with no piece count); its mapping stays `conflict` (documented), not shown as official nutrition. Fried Mozzarella 800 matches the guide.
- Content: allergens appear as "contains" only from the official row (plus "fried in soy oil"/"grilled" prep marks, the "not marked" list, and the guide's cross-contact notes); ingredient lists are "partial" unless complete; pairings are labeled editorial. No order/cart buttons. Structured data: `WebPage`, `BreadcrumbList`, `FAQPage` only.
- **Permanent design requirement** (owner, 2026-11-15): every item page and future improvement must be visually attractive, colorful, professional, premium, informative, easy to navigate, mobile-friendly and useful, never a plain text-heavy layout. Spec: `docs/DESIGN_SYSTEM.md` 4.6 and `docs/product-pages/PRODUCT_PAGE_DESIGN.md`.
- Reports: `docs/product-pages/PRODUCT_INVENTORY.md`, `NUTRITION_DATA_REPORT.md`, `ALLERGEN_DATA_REPORT.md`, `PRODUCT_ELIGIBILITY_REPORT.md` (58 data-ready products; pages only after the sample is approved, one at a time).
- Fried Mozzarella (2026-11-18): published; official nutrition and allergens integrated; price $9.79 kept as last verified November 2026 (not re-checked, never claim a fresh check); unverified customization omitted (the `customizations` field is optional and only verified options render); no vegetarian suitability claims beyond Olive Garden's own (V) label. Indexing stays off (`SITE_INDEXING` unset).
- Local testing: the owner's own `npm run dev` may already be running on port 3000. Use it for visual checks; run at most one extra server (e.g. `next start -p 3100`) and stop it right after. The machine has ~8 GB RAM; parallel dev + build + start servers caused the 2026-11-15 out-of-memory stop.

- Layout options (2026-11-18): `unitLabel` (e.g. "breadstick") and `priceNote` adapt the wording; size options of the primary offering appear in a "pack sizes" table; several included sauces get one nutrition column each; empty "What comes with it" and unverified customization cards are not rendered. Item fact logs can be generated with `research/nutrition-extraction/factlog.js <slug>` and must then be reviewed.
- **Item page images (permanent owner instruction, 2026-11-18; supersedes the earlier mandatory image review):**
  - Reuse all existing owner-provided menu item images as mapped in `content/menu/products.ts`, and preserve the mappings.
  - Do not repeatedly review images or request replacements, and do not block item pages because of routine image review.
  - Request a new image only for a new menu item that has no owner-provided image.
  - Flag only concrete, materially misleading mismatches.
  - Never generate, download, or replace images automatically.
  - If the owner sends a new photo anyway: convert it to WebP (`docs/IMAGE_REQUIREMENTS.md`), list it in `docs/IMAGE_MANIFEST.md`, and keep the same mapping.

## Keep visitors on the site: one external link per page (owner decisions 2026-11-21)

- The site must answer the visitor itself. Article pages (homepage, categories, guides, item pages, nutrition calculator) never send the visitor elsewhere:
  - no external links in text, tables, notes, FAQs, cards, or buttons
  - no sentences that redirect, such as "check your restaurant's page", "confirm before you go", "call ahead", "see the specials page", "use the official allergen guide", or "use the locator"
  - state the fact instead (e.g. "hours vary by restaurant"; "restaurants may close early"), or link to a page on this site
- **Exactly one external link per article page:** the Olive Garden website (`siteConfig.officialSource`, https://www.olivegarden.com/) in the Sources box (`SourceNote`). On the homepage, it is in the Sources list.
  - Specific documents (nutrition or allergen PDFs, FAQ, specials, locator) are named as plain text ("Also checked: ..."), never linked.
- **Allowed:**
  - Provenance wording ("from Olive Garden's official online menu, checked November 2026").
  - The "How to Order Online" process steps (the topic itself).
- **Allergy safety stays:** point to the allergen list on the dish's item page and tell the visitor to inform their server. Never imply a dish is safe.
- **Important pages keep their links:** About, Contact, Privacy Policy, Terms, Disclaimer, Editorial Policy, How We Check Prices.
- **Check:** crawl the build. Every non-legal page has at most one external link, and it is `https://www.olivegarden.com/`.
