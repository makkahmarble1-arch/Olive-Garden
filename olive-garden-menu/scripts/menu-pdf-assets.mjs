// Prepares the two owner images used inside the Menu PDF (docs/tools/MENU_PDF_ARCHITECTURE.md).
// PDF files cannot embed WebP, so the owner's existing logo and homepage photo are
// converted once to small JPEG copies in content/menu-pdf/. No new or downloaded images.
// Run again only when the logo or the homepage hero photo changes:
//   node scripts/menu-pdf-assets.mjs
// Uses sharp, which Next.js installs for image optimization (no new dependency).
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";

const OUT = "content/menu-pdf";
mkdirSync(OUT, { recursive: true });

const assets = [
  // Owner logo icon (menu book + olive branch), on white for the cover's logo tile.
  { name: "logo", src: "public/images/brand/logo-icon.webp", width: 276, quality: 88, background: "#ffffff" },
  // Owner homepage photo (docs/IMAGE_MANIFEST.md), cover of the PDF.
  { name: "cover", src: "public/images/home/olive-garden-menu-spread.webp", width: 1000, quality: 68, background: "#ffffff" },
];

const manifest = {};
for (const a of assets) {
  const { data, info } = await sharp(a.src)
    .resize({ width: a.width, withoutEnlargement: true })
    .flatten({ background: a.background })
    .jpeg({ quality: a.quality, mozjpeg: true, chromaSubsampling: "4:2:0" })
    .toBuffer({ resolveWithObject: true });
  writeFileSync(`${OUT}/${a.name}.jpg`, data);
  manifest[a.name] = { file: `${a.name}.jpg`, source: a.src, width: info.width, height: info.height, bytes: data.length };
  console.log(a.name, info.width, "x", info.height, data.length, "bytes");
}
writeFileSync(`${OUT}/assets.json`, JSON.stringify(manifest, null, 2) + "\n");
