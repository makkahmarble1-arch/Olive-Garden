# Image Requirements

**Status:** Convention approved (2026-11-11). No images are in the project yet.
All images are supplied by the owner (original or properly licensed) and are
integrated during the page development phases.

## 1. Rules

- **Allowed:** owner's own photos; images with a license that allows web use
  (license recorded).
- **Not allowed:** images copied from Olive Garden or competitor websites,
  delivery apps, or search results; AI-generated food images; the Olive
  Garden logo or official marketing images.
- **No fake paths.** Data files keep `image: null` until the real file exists
  in `/public`. Placeholders (`PlaceholderImage`) are used until then.
  Folders are created only when the first real image is added.
- Photos must honestly represent the dish (no misleading edits).

## 2. Folder structure

```
public/images/
├── menu/
│   ├── products/        One photo per canonical product (shared across categories)
│   ├── catering/        Catering pans, trays, combinations (different from dine-in)
│   ├── family-style/    Family-size bundles
│   └── categories/      One card/hero image per category page (17), named by category slug
├── pages/               Homepage hero, About, etc.
├── blog/<article-slug>/ Featured and in-article images
└── og/                  Social sharing images (1200 x 630)
```

## 3. File naming

- Lowercase, hyphen-separated, descriptive, no spaces or dates in the name.
- Product photos use the **product id** from `content/menu/products.ts`.
- Variants add a suffix after `--` (same as offering variant ids, e.g. `--large`).
- Category images use the **category slug** (e.g. `wine-and-beer-to-go.jpg`).
- Image names follow the product id even while an alias case is unresolved;
  if two products are later merged, keep one file and update the reference.

| Image | Path example |
|---|---|
| Product | `public/images/menu/products/chicken-parmigiana.jpg` |
| Product variant | `public/images/menu/products/homemade-soups--large.jpg` |
| Catering version | `public/images/menu/catering/chicken-parmigiana--catering-pan.jpg` |
| Category card/hero | `public/images/menu/categories/desserts.jpg`, `.../soups-salad-and-breadsticks.jpg` |
| Homepage hero | `public/images/pages/home-hero.jpg` |
| Article featured | `public/images/blog/<slug>/featured.jpg` |
| Social share | `public/images/og/menu-desserts.jpg` |

## 4. Technical specs

| Use | Aspect ratio | Minimum original size |
|---|---|---|
| Category card | 4:3 | 1200 x 900 |
| Page/article hero | 16:9 | 1600 x 900 |
| Product photo | 4:3 (or 1:1 if owner prefers; keep one ratio) | 1200 x 900 |
| Open Graph | 1.91:1 | 1200 x 630 |

- Format: JPG (photos) or PNG (graphics); keep originals under ~1 MB.
  `next/image` serves optimized AVIF/WebP and resized versions automatically.
- Always set `width`/`height` (or `fill` + `sizes`) to prevent layout shift.
- `priority` only for the main above-the-fold image of a page.
- Use `sizes` that match the layout (e.g. cards: `(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw`).
- Remove camera location data (EXIF GPS) before adding photos.

## 5. Alt text

- Describe what is visible: "Chicken Parmigiana with spaghetti on a white plate".
- No keyword stuffing; no "image of".
- Decorative images use `alt=""`.

## 6. Image records

Each image is referenced through an `ImageRef` (`lib/types.ts`): `src`
(path inside `/public`, starting with `/images/`), `alt`, `width`, `height`,
`credit`, `license`.

| Where | Field | Use |
|---|---|---|
| `MenuProduct.image` | shared photo of a dish | Used by every offering of that product |
| `MenuOffering.image` | format-specific photo | Overrides the product photo (e.g. a catering pan) |
| Category | (added when category pages are built) | Card + hero image |
| `Article.featuredImage` | article photo | Blog |

Rendering: always `next/image` with the stored `width`/`height` (or `fill` +
`sizes`), so Next.js serves optimized, resized AVIF/WebP automatically.

Validation (`lib/menu-validation.ts`) already checks that image paths start
with `/images/` and have alt text. A check that the file really exists is
added when the first images arrive.

## 7. When images are needed

| Phase | Images needed |
|---|---|
| Before the first menu page is published | 1 category hero/card image for that page (optional: product photos for its items) |
| Homepage refresh | Homepage hero + category card images for published pages |
| Blog phase | Featured image per article |
| Technical SEO phase (before launch) | Default OG image + optional per-page OG images |
| Logo/branding | Before launch (site currently uses a text logo) |

Pages can be published without product photos; tables work without images.
