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

- Site name: **Olive Garden Menu & Prices**, defined only in `lib/site.ts`
  (branding may change later). Always paired with non-affiliation disclaimers.
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
     **Never mention "AI-generated" anywhere on the public site** (owner
     decision 2026-11-14): no card label, no note. Public text only says the
     photos are supplied by the site owner, are not official Olive Garden
     photos, and actual presentation may vary.
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

## SEO rules

- One search intent per URL. Before creating a page, check that no existing
  page targets the same intent. No per-item pages, no separate calorie pages.
- The homepage is the only indexable full-menu page ("Olive Garden menu
  with prices and calories"). `/menu` permanently redirects to `/`
  (owner decision 2026-11-13, see `docs/SEO_ARCHITECTURE.md`).
- Homepage headings: one H1 ("Olive Garden Menu with Prices & Calories
  2026"), one H2 per category (17), seven supporting H2s; H3 only when needed.
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
- `/design-preview` is a dev-only component preview (404 in production).
  Its sample data must never be imported into public pages.
- Every page: unique `title`, `description`, self-canonical, Open Graph,
  Twitter card: build it with `pageMetadata()` from `lib/metadata.ts`.
- **Indexing is OFF until launch:** `SITE_INDEXING=true` (Vercel Production,
  owner approval) switches it on; never set it locally or in previews.
- One `h1` per page; logical heading order.
- JSON-LD via the shared `JsonLd` component, escaped with
  `.replace(/</g, "\\u003c")`. Allowed: `WebSite`, `Organization` (this blog), `WebPage`,
  `BreadcrumbList`, `BlogPosting`, `FAQPage` (only for visible FAQs).
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
