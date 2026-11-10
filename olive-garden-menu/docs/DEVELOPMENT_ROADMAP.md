# Development Roadmap

Small steps. Each step ends with: run `npm run dev`, check the page in the
browser (desktop + mobile width), run `npm run lint`, then commit to git.

## Planned folder structure

```
olive-garden-menu/
├── app/
│   ├── layout.tsx                 Root layout: fonts, Header, Footer, default metadata
│   ├── page.tsx                   Homepage
│   ├── globals.css                Tailwind + design tokens
│   ├── not-found.tsx              404 page
│   ├── sitemap.ts                 /sitemap.xml
│   ├── robots.ts                  /robots.txt
│   ├── menu/[category]/page.tsx   Category pages
│   ├── blog/page.tsx              Blog index
│   ├── blog/[slug]/page.tsx       Blog articles
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── disclaimer/page.tsx
│   └── privacy-policy/page.tsx
├── components/
│   ├── layout/        Header, MobileMenu, Footer, Container, SkipLink
│   ├── navigation/    Breadcrumbs, TableOfContents
│   ├── menu/          CategoryCard, PriceTable, PriceNotice, VerificationBadge
│   ├── content/       FaqSection, RelatedArticles, ArticleBody, ArticleCard
│   └── seo/           JsonLd
├── content/
│   ├── menu/          One .ts file per category (items, prices, calories, FAQ)
│   └── blog/          One .ts file per article
├── lib/
│   ├── site.ts        Site name, URL, author, "prices last checked" date
│   ├── types.ts       TypeScript types for menu items and articles
│   ├── content.ts     Helper functions: getAllCategories, getPostBySlug, etc.
│   └── seo.ts         Helpers to build metadata and JSON-LD
└── public/images/     Our own images
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
- Blog articles use the same idea: an object with `title`, `description`,
  `publishedAt`, `updatedAt`, `sections` (each with `id`, `heading`, and
  content blocks), `faqs`, and `relatedSlugs`. Section headings build the
  table of contents automatically.
- Later option (only if writing in TS gets painful): switch articles to MDX.
  That needs extra packages, so it is not part of the initial plan.

## Phases

### Phase 0: Planning (done)
- [x] Inspect project
- [x] Write `docs/` and `CLAUDE.md`

### Phase 1: Foundation
1. `lib/site.ts` (site name, disclaimer text, URL from `NEXT_PUBLIC_SITE_URL`
   with localhost fallback) and `lib/types.ts` (data types)
2. Design tokens in `app/globals.css`; remove starter dark-mode styles
3. Fonts + default metadata (`metadataBase`, title template) in `app/layout.tsx`
4. `Container`, `SkipLink`, `Header` (with mobile menu), `Footer` (with disclaimer)
5. Replace starter homepage with a simple placeholder; delete unused starter SVGs
6. Version control + deployment (when the owner is ready): rename branch to
   `main`, create GitHub repo, connect Vercel, set `NEXT_PUBLIC_SITE_URL`

### Phase 2: Menu pages
1. Confirm real category list; create one category data file with
   verified (or clearly marked unverified) items
2. `PriceTable`, `PriceNotice`, `VerificationBadge`
3. `Breadcrumbs` + `BreadcrumbList` JSON-LD (`JsonLd` component)
4. `app/menu/[category]/page.tsx` with `generateStaticParams` + `generateMetadata`
5. Add remaining categories one at a time
6. Homepage: intro, category cards with price ranges, price notice

### Phase 3: Blog
1. Article data type + first real article
2. `ArticleBody`, `TableOfContents`, `FaqSection` (+ `FAQPage` JSON-LD)
3. `app/blog/[slug]/page.tsx` with `BlogPosting` JSON-LD
4. `RelatedArticles`, `ArticleCard`, `app/blog/page.tsx`
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
| 10 | GitHub repository | Configured in the version-control/deployment phase. New repo uses **`main`** as default branch (local repo is currently on `master` with no commits; rename then) | Phase 1, step 6 |
| 11 | Analytics and ads | **Not implemented** until the final integration phase | Phase 7 |

## Repo note

The git repository root is `Olive Garden/` and the Next.js app is inside
`olive-garden-menu/`. When importing to Vercel, set **Root Directory** to
`olive-garden-menu`. A stray `package-lock.json` in `C:\Users\WC` causes a
Turbopack warning; it is outside the project and harmless, but can be removed
by the owner.
