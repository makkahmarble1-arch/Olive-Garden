# Development Roadmap

Small steps. Each step ends with: run `npm run dev`, check the page in the
browser (desktop + mobile width), run `npm run lint`, then commit to git.

## Planned folder structure

(✅ = exists, ⏳ = planned)

```
olive-garden-menu/
├── app/
│   ├── layout.tsx                 ✅ Root layout: fonts, Header, Footer, default metadata
│   ├── page.tsx                   ✅ Homepage
│   ├── globals.css                ✅ Tailwind + design tokens
│   ├── menu/page.tsx              ✅ Menu hub (noindex placeholder)
│   ├── design-preview/            ✅ Dev-only component previews (404 in production)
│   ├── not-found.tsx              ⏳ 404 page
│   ├── sitemap.ts                 ⏳ /sitemap.xml
│   ├── robots.ts                  ⏳ /robots.txt
│   ├── menu/[category]/page.tsx   ⏳ Category pages (after owner approves categories)
│   ├── blog/page.tsx              ⏳ Blog index
│   ├── blog/[slug]/page.tsx       ⏳ Blog articles (after owner approves topics)
│   ├── about/, contact/, disclaimer/, privacy-policy/   ⏳
├── components/
│   ├── layout/        ✅ Header, MobileMenu, Footer, Container, SkipLink
│   ├── home/          ✅ Hero
│   ├── navigation/    ✅ Breadcrumbs (+ BreadcrumbList JSON-LD), TableOfContents
│   ├── menu/          ✅ CategoryCard, MenuTable, PriceNotice
│   ├── content/       ✅ ArticleLayout, ContentBlocks, RichText, ArticleCard, RelatedArticles
│   │                  ⏳ FaqSection
│   ├── ui/            ✅ PlaceholderImage, SectionHeading, VerificationBadge
│   └── seo/           ✅ JsonLd
├── content/
│   ├── menu/          ✅ categories.ts (registry, placeholders now), _template.ts
│   └── articles/      ✅ index.ts (registry, empty), _template.ts
├── lib/
│   ├── site.ts        ✅ Site name, URL (env var), nav, disclaimer, price notice
│   ├── types.ts       ✅ Menu, article, breadcrumb, TOC types
│   ├── content.ts     ✅ Content helpers + URL path helpers
│   ├── format.ts      ✅ Date, price, number formatting (en-US)
│   └── seo.ts         ⏳ Metadata helpers (when real pages exist)
└── public/images/     ⏳ Owner-approved images
```

## Content management (beginner-friendly, no CMS)

Content lives in TypeScript files. To add or update content you edit a data
file; no component code changes.

```ts
// content/menu/desserts.ts (example shape, values are placeholders)
export const desserts: MenuCategory = {
  slug: "desserts",
  name: "Desserts",
  title: "Olive Garden Desserts Menu & Prices",
  description: "...",
  updatedAt: "2026-11-10",
  items: [
    {
      name: "Example Dessert",
      price: null,          // null = not verified, shows "Not verified yet"
      calories: null,
      status: "needs-verification",
      source: "",
      lastChecked: null,
    },
  ],
  faqs: [],
};
```

- TypeScript types catch mistakes (missing fields, wrong types) before the site runs.
- `lib/content.ts` collects all files so pages, sitemap, and navigation
  update automatically.
- `MenuTable` shows a price/calorie value only when the item's `status` is
  `"verified"` and the value is not `null`; otherwise "Not verified yet".
- **Adding a menu category:** copy `content/menu/_template.ts` to
  `content/menu/<slug>.ts`, fill in verified data, then replace the matching
  placeholder in `content/menu/categories.ts` with an import of the new file.
- **Adding an article:** copy `content/articles/_template.ts` to
  `content/articles/<slug>.ts`, fill in real content, then add it to the
  array in `content/articles/index.ts`. Articles have `title`, `description`,
  `intro`, `featuredImage`, `publishedAt`, `updatedAt`, `author`, `sections`
  (each with `id`, `heading`, and content blocks), and `relatedSlugs`.
  Section headings build the table of contents automatically.
- Later option (only if writing in TS gets painful): switch articles to MDX.
  That needs extra packages, so it is not part of the initial plan.

## Phases

### Phase 0: Planning (done)
- [x] Inspect project
- [x] Write `docs/` and `CLAUDE.md`

### Phase 1: Foundation (done)
1. `lib/site.ts` (site name, disclaimer text, URL from `NEXT_PUBLIC_SITE_URL`
   with localhost fallback) and `lib/types.ts` (data types)
2. Design tokens in `app/globals.css`; remove starter dark-mode styles
3. Fonts + default metadata (`metadataBase`, title template) in `app/layout.tsx`
4. `Container`, `SkipLink`, `Header` (with mobile menu), `Footer` (with disclaimer)
5. Replace starter homepage with a simple placeholder; delete unused starter SVGs
6. Version control + deployment: branch `main` pushed to GitHub, Vercel
   connected (Root Directory `olive-garden-menu`). `NEXT_PUBLIC_SITE_URL` is
   set later, once the domain is decided

### Phase 1.5: Reusable component architecture (done)
- `MenuTable`, `PriceNotice`, `VerificationBadge`, `Breadcrumbs`, `JsonLd`,
  `TableOfContents`, `ArticleLayout`, `ContentBlocks`, `RichText`,
  `ArticleCard`, `RelatedArticles`
- Content registries + templates, `lib/content.ts`, `lib/format.ts`
- `/menu` noindex placeholder hub; dev-only `/design-preview`

### Phase 1.6: Content architecture planning (done, 2026-11-11)
- Owner inventory received (`MENU_INVENTORY.md`: 17 categories, 210 placements)
- Planned in `CONTENT_ARCHITECTURE.md`, `MENU_PAGE_OUTLINES.md`,
  `MENU_RESEARCH_PLAN.md`, `INTERNAL_LINKING.md`, `IMAGE_REQUIREMENTS.md`
- Awaiting owner decisions listed in `CONTENT_ARCHITECTURE.md` §11

### Phase 2: Menu pages
1. Confirm real category list; create one category data file with
   verified (or clearly marked unverified) items
2. ~~`MenuTable`, `PriceNotice`, `VerificationBadge`~~ (done in Phase 1.5)
3. ~~`Breadcrumbs` + `BreadcrumbList` JSON-LD~~ (done in Phase 1.5)
4. `app/menu/[category]/page.tsx` with `generateStaticParams` + `generateMetadata`
5. Add remaining categories one at a time
6. Homepage: intro, category cards with price ranges, price notice

### Phase 3: Blog
1. First real article (owner-provided topic and outline)
2. `FaqSection` (+ `FAQPage` JSON-LD)
3. `app/blog/[slug]/page.tsx` using `ArticleLayout`, with `BlogPosting` JSON-LD
4. `app/blog/page.tsx` using `ArticleCard`
5. Internal links between articles and category pages

### Phase 4: Trust and legal pages
- About (with how prices are checked), Contact, Disclaimer, Privacy Policy
- `not-found.tsx`

### Phase 5: Technical SEO
- `app/sitemap.ts`, `app/robots.ts`
- Open Graph image (static image or `opengraph-image.tsx`)
- `WebSite` + `Organization` JSON-LD on homepage
- Validate structured data; check every page's metadata

### Phase 6: Quality and launch
- Accessibility check (keyboard only, screen reader basics, Lighthouse)
- Performance check (Lighthouse mobile, image sizes)
- `npm run build` passes with no errors
- Connect custom domain on Vercel; Google Search Console + sitemap

### Phase 7: Ongoing
- Re-check prices on a schedule; update `lastChecked` dates
- Add articles based on real search demand
- Final integration (owner decides): analytics and/or ads, with Privacy Policy update

## Owner decisions and pending information

The owner provides final information progressively, in the phase where it is
needed. Until then, use clearly identified placeholders and never invent data.

| # | Topic | Decision / status | Provided in |
|---|---|---|---|
| 1 | Site name | **"Olive Garden Menu & Prices"** (decided). Independent site; always paired with disclaimers. Independent branding may be refined later, so keep the name in one place (`lib/site.ts`) | Decided |
| 2 | Domain | Pending. **Do not hardcode.** Read from env var `NEXT_PUBLIC_SITE_URL`, fallback `http://localhost:3000` for local dev | Before deployment |
| 3 | Prices, sources, locations | Owner provides verified data. Do not invent prices | Content development (Phase 2) |
| 4 | Menu categories, items, page outlines | Owner provides before real menu pages are built. Temporary, clearly labeled placeholder categories are OK for initial design | Before Phase 2 menu pages |
| 5 | Calories / nutrition | Owner provides verified data or approved sources. Do not invent | When required (Phase 2) |
| 6 | Author name + bio | Pending. Do not invent author names or credentials | Before publishing articles / About page |
| 7 | Contact email | Pending | Later (Phase 4) |
| 8 | Logo and images | Pending. Use clearly identified placeholders (e.g. labeled "Placeholder image") | Design and content phases |
| 9 | Blog topics + SEO outlines | Pending | Phase 3 |
| 10 | GitHub repository | **Done.** `main` branch pushed to `github.com/makkahmarble1-arch/Olive-Garden`; Vercel deploys from it | Done |
| 11 | Analytics and ads | **Not implemented** until the final integration phase | Phase 7 |

## Repo note

The git repository root is `Olive Garden/` and the Next.js app is inside
`olive-garden-menu/`. Vercel's **Root Directory** is set to
`olive-garden-menu` (without it, Vercel deploys an empty site that returns
404). After changing Vercel settings, a redeploy is required. A stray `package-lock.json` in `C:\Users\WC` causes a
Turbopack warning; it is outside the project and harmless, but can be removed
by the owner.
