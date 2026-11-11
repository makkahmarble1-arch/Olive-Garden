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
- Keep it simple: no CMS, no database, no auth, no enterprise patterns.
- Do not change files unrelated to the current task.
- Never commit secrets. Use `.env.local` (already git-ignored) if ever needed.
- Commit only when the owner asks.

## Owner decisions (current)

Full status table: "Owner decisions and pending information" in
`docs/DEVELOPMENT_ROADMAP.md`. The owner supplies missing info in the phase
where it is needed. Never fill gaps with invented data.

- Site name: **Olive Garden Menu & Prices**, defined only in `lib/site.ts`
  (branding may change later). Always paired with non-affiliation disclaimers.
- Domain: a **new** domain, name not decided. **Never hardcode a domain.**
  Use `NEXT_PUBLIC_SITE_URL` with fallback `http://localhost:3000`. Do not
  migrate, redirect, or change any existing website of the owner.
- Menu categories/items: defined by `docs/MENU_INVENTORY.md`. All 17
  categories, all 210 entries, and every category-item association are
  preserved (imported in `content/menu/offerings/`). Never delete an entry.
  Never merge possible aliases (A1–A17, `content/menu/aliases.ts`) without
  owner confirmation. Keep `inventoryName` exactly as in the inventory.
- **Approved URLs:** 17 dedicated category pages at the **root** with the
  exact slugs in `docs/CONTENT_ARCHITECTURE.md` §2 (e.g. `/lunch-menu`,
  `/kids-meal`). Not under `/menu/`. Never merge or rename them.
- `/menu` = main menu hub (Option B). Homepage = intro + featured
  categories + link to `/menu`; it must not duplicate the hub.
- Prices: one benchmark restaurant in **Orlando, FL** (exact restaurant
  needs owner approval before any price is entered). Prices/calories only
  from verified sources per `docs/MENU_RESEARCH_PLAN.md`.
- Author, contact email: pending. Do not invent names, credentials, or emails.
- Logo/images: pending. Use placeholders clearly labeled as placeholders.
- Blog topics/outlines: provided in the blog phase.
- GitHub: set up in the deployment phase; default branch `main`.
- Analytics and ads: **do not implement** until the final integration phase.

## Content and accuracy rules

- **Never invent prices, calories, or nutrition facts.** Unknown values are
  `null`/empty with `status: "needs-verification"` and display "Not verified yet".
  A value is stored only with `status: "verified"`, a source, a date, and
  (for prices) an approved reference location.
- Never invent menu descriptions; `description` stays `null` until written
  from verified official information.
- Every price table shows the "prices last checked" date and a note that
  prices vary by location.
- Clearly separate verified data from placeholders in code and on the page.
- Never present the site as official. Footer disclaimer on every page:
  not affiliated with Olive Garden or Darden Restaurants, Inc.
- No Olive Garden logo, official photos, or brand styling.
- No fake reviews, ratings, or testimonials.
- Write helpful, natural content. No keyword stuffing.

## SEO rules

- One search intent per URL. Before creating a page, check that no existing
  page targets the same intent. No per-item pages, no separate calorie pages.
- `/menu` is the main menu hub, **noindex** until its final verified content
  is approved; then it is indexed. Homepage and `/menu` must not target the
  same intent (see `docs/SEO_ARCHITECTURE.md`).
- Overlapping category pages (e.g. Amazing Alfredos vs. Classic Entrees)
  each need their own intent and angle; never copy paragraphs between pages.
- Any placeholder page must be `robots: { index: false }` until approved
  content exists. Do not create the category route (`app/[category]`) or
  `/blog/[slug]` until the owner approves the page content.
- Category breadcrumbs: `Home > Menu > {Category}`.
- `/design-preview` is a dev-only component preview (404 in production).
  Its sample data must never be imported into public pages.
- Every page: unique `title`, `description`, self-canonical, Open Graph.
- One `h1` per page; logical heading order.
- JSON-LD via the shared `JsonLd` component, escaped with
  `.replace(/</g, "\\u003c")`. Allowed: `WebSite`, `Organization` (this blog),
  `BreadcrumbList`, `BlogPosting`, `FAQPage` (only for visible FAQs).
  Not allowed: `Restaurant`, `Menu`, `Product`, `Offer`, `Review`, `AggregateRating`.
- Sitemap `lastModified` uses real `updatedAt` dates, not `new Date()`.

## Accessibility and performance

- Target WCAG 2.2 AA; mobile-first; touch targets at least 44px.
- Semantic HTML, real `<table>` with `<th scope>` for prices, visible focus styles.
- All pages statically generated. `next/image` for images; `priority` only
  for the main above-the-fold image.
