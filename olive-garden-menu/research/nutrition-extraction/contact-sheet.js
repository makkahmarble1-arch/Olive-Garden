/* eslint-disable -- Node research script (CommonJS), not app code. */
// Builds a labeled contact sheet of product photos for visual accuracy checks.
// Usage: node research/nutrition-extraction/contact-sheet.js <out.png> <productId> [<productId>...]
const ROOT = process.cwd();
const sharp = require(ROOT + "/node_modules/sharp");
const { createJiti } = require(ROOT + "/node_modules/jiti");
const j = createJiti(ROOT + "/x.js", { alias: { "@": ROOT } });
const { menuProducts } = j(ROOT + "/content/menu/products.ts");
const [out, ...ids] = process.argv.slice(2);
const W = 360, H = 270, LABEL = 34, COLS = 3;
(async () => {
  const tiles = [];
  for (const id of ids) {
    const p = menuProducts.find((x) => x.id === id);
    const img = await sharp(ROOT + "/public" + p.image.src).resize(W, H, { fit: "cover" }).toBuffer();
    const label = Buffer.from(`<svg width="${W}" height="${LABEL}"><rect width="100%" height="100%" fill="#28370f"/><text x="8" y="23" font-family="Arial" font-size="17" fill="#fff">${p.name.replace(/&/g, "&amp;")}</text></svg>`);
    tiles.push({ img, label });
  }
  const rows = Math.ceil(tiles.length / COLS);
  const comp = [];
  tiles.forEach((t, i) => {
    const x = (i % COLS) * (W + 8), y = Math.floor(i / COLS) * (H + LABEL + 8);
    comp.push({ input: t.label, left: x, top: y }, { input: t.img, left: x, top: y + LABEL });
  });
  await sharp({ create: { width: COLS * (W + 8), height: rows * (H + LABEL + 8), channels: 3, background: "#ffffff" } }).composite(comp).png().toFile(out);
  console.log("sheet", out, tiles.length);
})();
