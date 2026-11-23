/**
 * The printable Olive Garden menu PDF (Improvement 8), built from the shared
 * menu data with the same display helpers as the homepage cards
 * (lib/menu-display.ts), so prices, calories and notes always match.
 * Deterministic: the same data gives the same file (no clock, no randomness).
 * Server only (reads two JPEG files with node:fs). docs/tools/MENU_PDF_ARCHITECTURE.md.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getAllMenuCategories, getCreateYourOwnPasta, getMenuCheckDates, getOfferingsForCategory } from "@/lib/content";
import { availabilityLabel, calorieUnitNote, offeringOptions, offeringValues, type DisplayValues } from "@/lib/menu-display";
import { formatMonthYear, formatNumber, formatPrice } from "@/lib/format";
import { siteConfig } from "@/lib/site";
import { categoryNotes } from "@/content/home/homepage";
import { encode, PdfDoc, width, wrap, type PdfPage, type RGB } from "@/lib/pdf-writer";
import type { MenuCategoryDef } from "@/lib/types";

/* ---------- Rows (also used by the tests) ---------- */

export type PdfSubRow = { label: string; price: string; priceIsNote: boolean; calories: string; caloriesIsNote: boolean; note: string | null };
export type PdfRow = {
  offeringId: string;
  item: string;
  /** Small lines under the name: availability, calorie unit, calculation. */
  notes: string[];
  serving: string;
  price: string;
  priceIsNote: boolean;
  calories: string;
  caloriesIsNote: boolean;
  /** Sizes / versions (from the offering's options), each with its own price and calories. */
  options: PdfSubRow[];
};
export type PdfSection = { category: MenuCategoryDef; intro: string; rows: PdfRow[]; kind: "menu" | "build" };

const dash = (t: string) => t.replace(/(\d)-(\d)/g, "$1–$2");
/** "1,480 Cal" -> "1,480" (the column is headed "Calories"). */
const calText = (v: Pick<DisplayValues, "calories" | "caloriesIsNote">) => (v.caloriesIsNote ? v.calories : v.calories.replace(/ Cal$/, ""));

function unitAndCalc(v: DisplayValues): string | null {
  const unit = calorieUnitNote(v.caloriesUnit);
  const calc = v.calculatedFrom ? `Calc.: ${v.calculatedFrom}` : null;
  return [unit, calc].filter(Boolean).join(" · ") || null;
}

/** The same section note as the homepage (categoryNotes), else the category summary. */
const sectionIntro = (c: MenuCategoryDef) => categoryNotes[c.id] ?? c.summary;

export function buildMenuPdfSections(): PdfSection[] {
  return getAllMenuCategories().map((category) => {
    if (category.id === "create-your-own-pasta") {
      const cyop = getCreateYourOwnPasta();
      const groupName: Record<string, string> = { pasta: "Pasta", sauce: "Sauce", topping: "Topping", "first-course": "First course" };
      const rows: PdfRow[] = [
        {
          offeringId: "create-your-own-pasta--base",
          item: "Create Your Own Pasta (base price)",
          notes: [cyop.includes],
          serving: dash(cyop.caloriesUnit),
          price: formatPrice(cyop.basePrice),
          priceIsNote: false,
          calories: `${formatNumber(cyop.caloriesMin)}–${formatNumber(cyop.caloriesMax)}`,
          caloriesIsNote: false,
          options: [],
        },
        ...cyop.options.map((o) => ({
          offeringId: `create-your-own-pasta--${o.id}`,
          item: o.name,
          notes: o.vegetarian ? ["Vegetarian (V) per Olive Garden"] : [],
          serving: groupName[o.group] ?? o.group,
          price: o.priceType === "included" || o.price === 0 ? "Included" : `+${formatPrice(o.price)}`,
          priceIsNote: o.priceType === "included" || o.price === 0,
          calories: o.calories !== null ? `${formatNumber(o.calories)}${o.caloriesUnit ? ` ${o.caloriesUnit}` : ""}` : (o.caloriesNote ?? "Not listed"),
          caloriesIsNote: o.calories === null,
          options: [],
        })),
      ];
      return { category, intro: sectionIntro(category), rows, kind: "build" as const };
    }
    const rows = getOfferingsForCategory(category.id).map((o): PdfRow => {
      const v = offeringValues(o);
      const opts = offeringOptions(o);
      const tag = o.promotion?.eligible && !v.priceIsNote ? "Add-on " : "";
      const notes = [availabilityLabel(o), opts.length === 1 ? null : unitAndCalc(v)].filter((x): x is string => !!x);
      const single = opts.length === 1 ? opts[0] : null;
      const main = single ?? v;
      return {
        offeringId: o.id,
        item: o.displayName,
        notes: single ? [...notes, ...(unitAndCalc(single) ? [unitAndCalc(single)!] : [])] : notes,
        serving: o.servingSize ? dash(o.servingSize) : "",
        price: opts.length > 1 ? "See sizes" : `${tag}${main.price}`,
        priceIsNote: opts.length > 1 || main.priceIsNote,
        calories: opts.length > 1 ? "" : calText(main),
        caloriesIsNote: opts.length > 1 || main.caloriesIsNote,
        options:
          opts.length > 1
            ? opts.map((x) => ({
                label: x.label,
                price: `${tag}${x.price}`,
                priceIsNote: x.priceIsNote,
                calories: calText(x),
                caloriesIsNote: x.caloriesIsNote,
                note: [x.unavailable ? "Currently unavailable" : null, unitAndCalc(x)].filter(Boolean).join(" · ") || null,
              }))
            : [],
      };
    });
    return { category, intro: sectionIntro(category), rows, kind: "menu" as const };
  });
}

/* ---------- Layout ---------- */

const W = 612;
const H = 792;
const M = 40;
const CW = W - 2 * M;
const TOP = H - 54;
const BOTTOM = 62;

const C = {
  deep: [0.157, 0.216, 0.059] as RGB, // #28370f
  olive: [0.333, 0.42, 0.071] as RGB, // #556b12
  brand: [0.631, 0.714, 0.149] as RGB, // #a1b626 (fills only)
  lime: [0.835, 0.906, 0.541] as RGB, // #d5e78a
  cream: [1, 0.988, 0.961] as RGB, // #fffcf5
  tint: [0.965, 0.973, 0.91] as RGB, // #f6f8e8
  card: [0.98, 0.984, 0.961] as RGB, // #fafbf5
  border: [0.863, 0.898, 0.729] as RGB, // #dce5ba
  gold: [0.831, 0.686, 0.216] as RGB, // #d4af37 (decorative)
  ink: [0.11, 0.098, 0.09] as RGB,
  muted: [0.341, 0.325, 0.306] as RGB,
  kcal: [0.604, 0.341, 0] as RGB, // #9a5700
  white: [1, 1, 1] as RGB,
  soft: [0.898, 0.914, 0.855] as RGB, // #e5e9da
  panel: [0.231, 0.302, 0.098] as RGB,
};

/** Table columns: item, serving, price, calories. */
const COL = [
  { x: M, w: 194 },
  { x: M + 194, w: 152 },
  { x: M + 346, w: 90 },
  { x: M + 436, w: CW - 436 },
];
const PAD = 6;
const LH = 10.5;

type Block = { height: number; draw: (p: PdfPage, top: number, shaded: boolean) => void };

function rowBlock(r: PdfRow): Block {
  const name = wrap(r.item, 9, COL[0].w - 2 * PAD, true);
  const notes = r.notes.flatMap((n) => wrap(n, 7, COL[0].w - 2 * PAD));
  const serving = r.serving ? wrap(r.serving, 8, COL[1].w - 2 * PAD) : [];
  const price = wrap(r.price, r.priceIsNote ? 7.5 : 9, COL[2].w - 2 * PAD, !r.priceIsNote);
  const cal = r.calories ? wrap(r.calories, r.caloriesIsNote ? 7.5 : 9, COL[3].w - 2 * PAD, !r.caloriesIsNote) : [];
  const first = Math.max(name.length * LH + notes.length * 8.6, serving.length * 9.6, price.length * LH, cal.length * LH);
  const subs = r.options.map((o) => {
    const label = wrap(`– ${o.label}`, 8, COL[0].w + COL[1].w - 3 * PAD);
    const note = o.note ? wrap(o.note, 7, COL[0].w + COL[1].w - 3 * PAD) : [];
    const p = wrap(o.price, o.priceIsNote ? 7.5 : 8.5, COL[2].w - 2 * PAD, !o.priceIsNote);
    const c = wrap(o.calories, o.caloriesIsNote ? 7.5 : 8.5, COL[3].w - 2 * PAD, !o.caloriesIsNote);
    return { label, note, p, c, pNote: o.priceIsNote, cNote: o.caloriesIsNote, h: Math.max(label.length * 9.6 + note.length * 8.4, p.length * 9.6, c.length * 9.6) + 3 };
  });
  const height = first + 2 * PAD + subs.reduce((s, x) => s + x.h, 0) + (subs.length ? 2 : 0);

  return {
    height,
    draw(p, top, shaded) {
      if (shaded) p.rect(M, top - height, CW, height, C.cream);
      let y = top - PAD - 7.5;
      name.forEach((l, i) => p.text(COL[0].x + PAD, y - i * LH, l, 9, { bold: true, encoded: true, color: C.ink }));
      const ny = y - name.length * LH + 1.5;
      notes.forEach((l, i) => p.text(COL[0].x + PAD, ny - i * 8.6, l, 7, { encoded: true, color: C.muted }));
      serving.forEach((l, i) => p.text(COL[1].x + PAD, y - i * 9.6, l, 8, { encoded: true, color: C.ink }));
      price.forEach((l, i) => p.text(COL[2].x + COL[2].w - PAD, y - i * LH, l, r.priceIsNote ? 7.5 : 9, { bold: !r.priceIsNote, encoded: true, color: r.priceIsNote ? C.muted : C.olive, align: "right" }));
      cal.forEach((l, i) => p.text(COL[3].x + COL[3].w - PAD, y - i * LH, l, r.caloriesIsNote ? 7.5 : 9, { bold: !r.caloriesIsNote, encoded: true, color: r.caloriesIsNote ? C.muted : C.kcal, align: "right" }));
      y = top - PAD - first - 2;
      for (const s of subs) {
        p.line(COL[0].x + PAD + 6, y + 1.5, M + CW - PAD, y + 1.5, C.border, 0.4, [1.5, 1.5]);
        const by = y - 8.2;
        s.label.forEach((l, i) => p.text(COL[0].x + PAD + 8, by - i * 9.6, l, 8, { encoded: true, color: C.ink }));
        s.note.forEach((l, i) => p.text(COL[0].x + PAD + 14, by - s.label.length * 9.6 + 1 - i * 8.4, l, 7, { encoded: true, color: C.muted }));
        s.p.forEach((l, i) => p.text(COL[2].x + COL[2].w - PAD, by - i * 9.6, l, s.pNote ? 7.5 : 8.5, { bold: !s.pNote, encoded: true, color: s.pNote ? C.muted : C.olive, align: "right" }));
        s.c.forEach((l, i) => p.text(COL[3].x + COL[3].w - PAD, by - i * 9.6, l, s.cNote ? 7.5 : 8.5, { bold: !s.cNote, encoded: true, color: s.cNote ? C.muted : C.kcal, align: "right" }));
        y -= s.h;
      }
      p.line(M, top - height, M + CW, top - height, C.border, 0.5);
    },
  };
}

function tableHeader(p: PdfPage, top: number, firstLabel: string, secondLabel: string): number {
  p.rect(M, top - 18, CW, 18, C.olive);
  const labels = [firstLabel, secondLabel, "Price", "Calories"];
  labels.forEach((l, i) =>
    i < 2 ? p.text(COL[i].x + PAD, top - 12.5, l, 8, { bold: true, color: C.white }) : p.text(COL[i].x + COL[i].w - PAD, top - 12.5, l, 8, { bold: true, color: C.white, align: "right" }),
  );
  return top - 18;
}

const introLines = (s: PdfSection) => wrap(s.intro, 8.5, CW - 40);
const headingHeight = (s: PdfSection) => 30 + introLines(s).length * 11;

function categoryHeading(p: PdfPage, top: number, s: PdfSection, count: string): number {
  const h = headingHeight(s);
  p.roundRect(M, top - h, CW, h, 6, C.deep);
  p.rect(M, top - h, 4, h, C.gold);
  p.text(M + 14, top - 19, s.category.name, 15, { bold: true, color: C.white });
  p.text(M + CW - 12, top - 18, count, 8.5, { bold: true, color: C.lime, align: "right" });
  introLines(s).forEach((l, i) => p.text(M + 14, top - 33 - i * 11, l, 8.5, { encoded: true, color: C.lime }));
  return top - h - 6;
}

function pageChrome(p: PdfPage, pageNo: number, total: number, section: string | null, host: string) {
  p.text(M, H - 30, "Olive Garden Menu Prices · independent menu guide", 7.5, { bold: true, color: C.olive });
  if (section) p.text(W - M, H - 30, section, 7.5, { color: C.muted, align: "right" });
  p.line(M, H - 37, W - M, H - 37, C.border, 0.6);
  p.line(M, 46, W - M, 46, C.border, 0.6);
  p.text(M, 34, `Not an official Olive Garden menu. ${siteConfig.locationNotice}`, 7, { color: C.muted });
  p.text(M, 24, host, 7, { bold: true, color: C.olive });
  p.text(W - M, 34, `Page ${pageNo} of ${total}`, 7.5, { bold: true, color: C.deep, align: "right" });
}

function loadJpeg(file: string): { jpeg: Uint8Array; width: number; height: number } {
  const dir = join(process.cwd(), "content", "menu-pdf");
  const manifest = JSON.parse(readFileSync(join(dir, "assets.json"), "utf8")) as Record<string, { file: string; width: number; height: number }>;
  const entry = Object.values(manifest).find((a) => a.file === file);
  if (!entry) throw new Error(`Menu PDF: missing asset ${file} (run node scripts/menu-pdf-assets.mjs).`);
  return { jpeg: new Uint8Array(readFileSync(join(dir, file))), width: entry.width, height: entry.height };
}

export type MenuPdf = {
  bytes: Uint8Array;
  pages: number;
  sizeBytes: number;
  categories: number;
  entries: number;
  lastChecked: string | null;
  sections: PdfSection[];
  /** Page where each category starts (1-based), in category order. */
  categoryPages: { id: string; name: string; page: number }[];
};

let cached: MenuPdf | null = null;

/** The full menu PDF (built once per process; deterministic). */
export function getMenuPdf(): MenuPdf {
  if (!cached) cached = renderMenuPdf(buildMenuPdfSections());
  return cached;
}

/** Lays out the given sections (all 17 for the real file; a subset in visual tests). */
export function renderMenuPdf(sections: PdfSection[]): MenuPdf {
  const lastChecked = getMenuCheckDates()?.last ?? null;
  const checked = lastChecked ? formatMonthYear(lastChecked) : null;
  const host = siteConfig.url.replace(/^https?:\/\//, "");
  const entries = sections.reduce((n, s) => n + s.rows.length, 0);
  const doc = new PdfDoc(W, H);
  const logo = loadJpeg("logo.jpg");
  const cover = loadJpeg("cover.jpg");
  doc.addImage({ name: "Logo", ...logo });
  doc.addImage({ name: "Cover", ...cover });

  /* Cover */
  const c = doc.addPage();
  const photoH = 400;
  const imgH = (W * cover.height) / cover.width;
  c.rect(0, 0, W, H, C.deep);
  c.image("Cover", 0, H - imgH + (imgH - photoH) / 2, W, imgH, [0, H - photoH, W, photoH]);
  c.rect(0, H - photoH - 4, W, 4, C.gold);
  c.text(M, H - photoH - 16, "Photo supplied by the site owner for illustration; not an official Olive Garden photo.", 6.5, { color: C.soft });
  c.roundRect(M, 300, 76, 58, 10, C.white);
  c.image("Logo", M + 6, 305, 64, (64 * logo.height) / logo.width);
  c.text(M + 92, 334, siteConfig.name, 16, { bold: true, color: C.white });
  c.text(M + 92, 318, "Independent menu & price guide", 9.5, { color: C.lime });
  c.text(M, 252, "Olive Garden Menu", 38, { bold: true, color: C.white });
  c.text(M, 222, "with Prices & Calories 2026", 22, { bold: true, color: C.lime });
  const chips = [`${sections.length} menu categories`, `${formatNumber(entries)} menu entries`, checked ? `Prices last verified: ${checked}` : "Prices: see notes"];
  let cx = M;
  for (const chip of chips) {
    const w = width(encode(chip), 9, true) + 24;
    c.roundRect(cx, 168, w, 24, 12, C.panel, C.olive, 0.8);
    c.text(cx + w / 2, 176, chip, 9, { bold: true, color: C.white, align: "center" });
    cx += w + 8;
  }
  c.roundRect(M, 70, CW, 76, 8, C.panel);
  c.text(M + 12, 130, "Independent guide · not an official Olive Garden menu", 9.5, { bold: true, color: C.lime });
  wrap(
    `${siteConfig.disclaimer} Prices are online pickup prices from a restaurant we checked; ${siteConfig.locationNotice.charAt(0).toLowerCase()}${siteConfig.locationNotice.slice(1)}`,
    8,
    CW - 24,
  ).forEach((l, i) => c.text(M + 12, 116 - i * 10.5, l, 8, { encoded: true, color: C.soft }));
  c.text(M, 40, host, 10, { bold: true, color: C.lime });
  c.text(W - M, 40, "US Letter · printable", 8.5, { color: C.soft, align: "right" });

  /* Contents (filled in after the layout, when page numbers are known) */
  const toc = doc.addPage();

  /* Menu sections */
  const categoryPages: MenuPdf["categoryPages"] = [];
  const chrome: { page: PdfPage; section: string | null }[] = [{ page: toc, section: "Contents" }];
  let page = doc.addPage();
  chrome.push({ page, section: null });
  let y = TOP;
  const newPage = (section: string) => {
    page = doc.addPage();
    chrome.push({ page, section });
    y = TOP;
  };

  for (const s of sections) {
    const blocks = s.rows.map(rowBlock);
    const firstLabel = s.kind === "build" ? "Build option" : "Item";
    const secondLabel = s.kind === "build" ? "Group" : "Portion / serving";
    const count = s.kind === "build" ? `${s.rows.length - 1} build options` : `${s.rows.length} ${s.rows.length === 1 ? "item" : "items"}`;
    // Keep the heading with the table header and at least the first row.
    if (y - (headingHeight(s) + 6 + 18 + (blocks[0]?.height ?? 0)) < BOTTOM) newPage(s.category.name);
    if (chrome[chrome.length - 1].page === page && chrome[chrome.length - 1].section === null) chrome[chrome.length - 1].section = s.category.name;
    categoryPages.push({ id: s.category.id, name: s.category.name, page: doc.pages.indexOf(page) + 1 });
    y = categoryHeading(page, y, s, count);
    y = tableHeader(page, y, firstLabel, secondLabel);
    blocks.forEach((b, i) => {
      if (y - b.height < BOTTOM) {
        newPage(s.category.name);
        page.text(M, y - 4, `${s.category.name} (continued)`, 10, { bold: true, color: C.deep });
        y = tableHeader(page, y - 12, firstLabel, secondLabel);
      }
      b.draw(page, y, i % 2 === 0);
      y -= b.height;
    });
    y -= 22;
  }

  /* Notes and sources */
  if (y - 230 < BOTTOM) newPage("Notes & sources");
  const notes = [
    `Prices are online pickup prices we verified at a restaurant we checked${checked ? ` (last verified ${checked})` : ""}. ${siteConfig.locationNotice} Dine-in, delivery and catering charges, taxes and tips are not included.`,
    "Calories come from Olive Garden’s official online menu and U.S. nutrition information. Values marked “Calc.” are our calculations from official values; the parts are shown. Nothing is estimated.",
    "When no verified price or calorie value exists, the table shows a note (for example “Not on the current online menu”) instead of a number. Limited-time items and offers can end at any time.",
    `Allergens are not listed in this PDF. Each dish’s page on ${host} lists the allergens Olive Garden marks for it; tell your server about any allergy before ordering.`,
    `This PDF is generated from the same menu data as ${host}, so the website and this file show the same values. For photos, ratings and details of each dish, visit the website.`,
  ];
  page.text(M, y - 4, "Notes & sources", 14, { bold: true, color: C.deep });
  y -= 20;
  for (const n of notes) {
    const lines = wrap(n, 8.5, CW - 14);
    if (y - lines.length * 11.5 - 6 < BOTTOM) {
      newPage("Notes & sources");
    }
    page.rect(M, y - 7, 3, 3, C.brand);
    lines.forEach((l, i) => page.text(M + 10, y - 9 - i * 11.5 + 4, l, 8.5, { encoded: true, color: C.ink }));
    y -= lines.length * 11.5 + 6;
  }
  y -= 6;
  const disc = wrap(siteConfig.disclaimer, 8, CW - 24);
  if (y - disc.length * 10.5 - 30 < BOTTOM) newPage("Notes & sources");
  page.roundRect(M, y - disc.length * 10.5 - 24, CW, disc.length * 10.5 + 24, 6, C.tint, C.border);
  page.text(M + 12, y - 15, "Independent website", 9, { bold: true, color: C.deep });
  disc.forEach((l, i) => page.text(M + 12, y - 28 - i * 10.5, l, 8, { encoded: true, color: C.ink }));

  /* Contents page */
  toc.text(M, TOP - 6, "Inside this menu", 22, { bold: true, color: C.deep });
  wrap(
    `All ${sections.length} menu categories with the prices and calories we verified${checked ? ` (last verified ${checked})` : ""}. Sizes and versions are listed under each dish. ${siteConfig.locationNotice}`,
    9.5,
    CW,
  ).forEach((l, i) => toc.text(M, TOP - 26 - i * 13, l, 9.5, { encoded: true, color: C.muted }));
  let ty = TOP - 62;
  toc.rect(M, ty - 18, CW, 18, C.olive);
  toc.text(M + PAD, ty - 12.5, "Category", 8.5, { bold: true, color: C.white });
  toc.text(W - M - PAD, ty - 12.5, "Page", 8.5, { bold: true, color: C.white, align: "right" });
  ty -= 18;
  categoryPages.forEach((cp, i) => {
    if (i % 2 === 0) toc.rect(M, ty - 20, CW, 20, C.cream);
    toc.text(M + PAD, ty - 13.5, cp.name, 10, { bold: true, color: C.ink });
    toc.line(M + PAD + 8 + width(encode(cp.name), 10, true), ty - 13, W - M - 36, ty - 13, C.border, 0.6, [1, 2.5]);
    toc.text(W - M - PAD, ty - 13.5, String(cp.page), 10, { bold: true, color: C.olive, align: "right" });
    ty -= 20;
  });
  ty -= 16;
  const legend: [string, string][] = [
    ["Price", "Online pickup price we verified; “Add-on” = only with another purchase."],
    ["Calories", "Per item as served (pans, bundles and gallons: total). “Calc.” = our calculation from official values."],
    ["Sizes", "Dishes with several sizes or versions list each one with its own price and calories."],
    ["Notes", "“Limited time”, “Not on the current online menu” and similar notes replace missing values."],
  ];
  toc.roundRect(M, ty - legend.length * 22 - 26, CW, legend.length * 22 + 26, 8, C.tint, C.border);
  toc.text(M + 12, ty - 16, "How to read the tables", 10, { bold: true, color: C.deep });
  legend.forEach(([k, v], i) => {
    toc.text(M + 12, ty - 34 - i * 22, k, 8.5, { bold: true, color: C.olive });
    wrap(v, 8.5, CW - 100).forEach((l, j) => toc.text(M + 80, ty - 34 - i * 22 - j * 10, l, 8.5, { encoded: true, color: C.ink }));
  });

  /* Page chrome (all pages but the cover) */
  const total = doc.pages.length;
  chrome.forEach(({ page: pg, section }) => pageChrome(pg, doc.pages.indexOf(pg) + 1, total, section, host));

  const bytes = doc.toBytes({
    title: "Olive Garden Menu with Prices & Calories (independent guide)",
    author: siteConfig.name,
    subject: `All ${sections.length} menu categories with verified prices and calories. Not an official Olive Garden menu.`,
    creator: host,
    created: lastChecked,
  });
  return { bytes, pages: total, sizeBytes: bytes.length, categories: sections.length, entries, lastChecked, sections, categoryPages };
}

/** "312 KB" / "1.2 MB" */
export function formatFileSize(bytes: number): string {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
}
