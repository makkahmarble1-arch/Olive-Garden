# Image Requirements

**Status:** Planning (2026-11-11). No images are in the project yet.
All images are supplied by the owner (original or properly licensed).

## 1. Rules

- **Allowed:** owner's own photos; images with a license that allows web use
  (license recorded).
- **Not allowed:** images copied from Olive Garden or competitor websites,
  delivery apps, or search results; AI-generated food images; the Olive
  Garden logo or official marketing images.
- **No fake paths.** Data files keep `image: null` until the real file exists
  in `/public`. Placeholders (`PlaceholderImage`) are used until then.
- Photos must honestly represent the dish (no misleading edits).

## 2. Folder structure

```
public/images/
├── menu/
│   ├── products/        One photo per canonical product (shared across categories)
│   ├── catering/        Catering pans, trays, combinations (different from dine-in)
│   ├── family-style/    Family-size bundles
│   └── categories/      One card/hero image per menu page (12)
├── pages/               Homepage hero, About, etc.
├── blog/<article-slug>/ Featured and in-article images
└── og/                  Social sharing images (1200 x 630)
```

## 3. File naming

- Lowercase, hyphen-separated, descriptive, no spaces or dates in the name.
- Product photos use the **product id** from `CONTENT_ARCHITECTURE.md`.
- Variants add a suffix after `--`.

| Image | Path example |
|---|---|
| Product | `public/images/menu/products/chicken-parmigiana.jpg` |
| Product variant | `public/images/menu/products/cheese-ravioli--meat-sauce.jpg` |
| Catering version | `public/images/menu/catering/chicken-parmigiana--catering-pan.jpg` |
| Category card/hero | `public/images/menu/categories/desserts.jpg` |
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

Each image is referenced through an `ImageRef` (see `CONTENT_ARCHITECTURE.md`
§9.2): `src`, `alt`, `width`, `height`, `credit`, `license`. A build-time
check (later) confirms every `src` file exists.

## 7. When images are needed

| Phase | Images needed |
|---|---|
| Before the first menu page is published | 1 category hero/card image for that page (optional: product photos for its items) |
| Homepage refresh | Homepage hero + category card images for published pages |
| Blog phase | Featured image per article |
| Technical SEO phase (before launch) | Default OG image + optional per-page OG images |
| Logo/branding | Before launch (site currently uses a text logo) |

Pages can be published without product photos; tables work without images.
