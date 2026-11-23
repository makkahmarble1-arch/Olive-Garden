/* eslint-disable -- Node test script (CommonJS), not app code. */
// Tests of the Menu PDF (Improvement 8). Usage: npm run test:menu-pdf
// docs/tools/MENU_PDF_TEST_REPORT.md
const ROOT = process.cwd();
const zlib = require("zlib");
const { createJiti } = require(ROOT + "/node_modules/jiti");
const j = createJiti(ROOT + "/x.js", { alias: { "@": ROOT } });
const P = j(ROOT + "/lib/menu-pdf.ts");
const C = j(ROOT + "/lib/content.ts");
const D = j(ROOT + "/lib/menu-display.ts");
const { encode } = j(ROOT + "/lib/pdf-writer.ts");

let passed = 0;
const failed = [];
const test = (name, fn) => {
  try {
    fn();
    passed++;
  } catch (e) {
    failed.push(`${name}: ${e.message}`);
  }
};
const ok = (c, m) => {
  if (!c) throw new Error(m);
};

const pdf = P.getMenuPdf();
const raw = Buffer.from(pdf.bytes).toString("latin1");
// Decompressed page streams, in page order.
const pageObjs = [...raw.matchAll(/\/Type \/Page \/Parent \d+ 0 R \/MediaBox \[0 0 (\d+) (\d+)\][^]*?\/Contents (\d+) 0 R/g)];
const objStart = (id) => raw.indexOf(`\n${id} 0 obj\n`) + 1;
const streamOf = (id) => {
  const at = objStart(id);
  const len = Number(raw.slice(at).match(/\/Length (\d+)/)[1]);
  const s = raw.indexOf("stream\n", at) + 7;
  return zlib.inflateSync(Buffer.from(raw.slice(s, s + len), "latin1")).toString("latin1");
};
const pages = pageObjs.map((m) => ({ w: Number(m[1]), h: Number(m[2]), text: streamOf(Number(m[3])) }));
const shown = (s) => [...s.matchAll(/\(((?:\\.|[^\\)])*)\) Tj/g)].map((m) => m[1].replace(/\\([()\\])/g, "$1"));
const allText = pages.map((p) => shown(p.text).join("\n")).join("\n");

test("deterministic: same data gives the same bytes", () => {
  const again = P.renderMenuPdf(P.buildMenuPdfSections());
  ok(Buffer.compare(Buffer.from(again.bytes), Buffer.from(pdf.bytes)) === 0, "bytes differ");
});

test("valid PDF structure (header, xref offsets, EOF, page count)", () => {
  ok(raw.startsWith("%PDF-1.4\n") && raw.trimEnd().endsWith("%%EOF"), "header/EOF");
  const xref = Number(raw.match(/startxref\n(\d+)/)[1]);
  ok(raw.slice(xref, xref + 4) === "xref", "startxref");
  [...raw.slice(xref).matchAll(/(\d{10}) 00000 n /g)].forEach((m, i) => ok(raw.slice(Number(m[1]), Number(m[1]) + `${i + 1} 0 obj`.length) === `${i + 1} 0 obj`, `xref ${i + 1}`));
  ok(Number(raw.match(/\/Count (\d+)/)[1]) === pdf.pages && pages.length === pdf.pages, "page count");
});

test("US Letter on every page", () => ok(pages.every((p) => p.w === 612 && p.h === 792), "page size"));

test("all 17 categories, in homepage order, with a heading and a contents entry", () => {
  const cats = C.getAllMenuCategories();
  ok(pdf.sections.length === 17 && cats.length === 17, `${pdf.sections.length} sections`);
  cats.forEach((c, i) => ok(pdf.sections[i].category.id === c.id, `order ${c.id}`));
  for (const c of cats) ok(allText.includes(encode(c.name)), `heading ${c.name}`);
  ok(pdf.categoryPages.every((p, i, a) => p.page >= 3 && (i === 0 || p.page >= a[i - 1].page)), "contents pages ascending");
});

test("every homepage menu entry is in the PDF (and nothing else)", () => {
  for (const s of pdf.sections) {
    if (s.kind === "build") {
      ok(s.rows.length === C.getCreateYourOwnPasta().options.length + 1, "CYOP options");
      continue;
    }
    const offs = C.getOfferingsForCategory(s.category.id);
    ok(s.rows.length === offs.length, `${s.category.id}: ${s.rows.length} vs ${offs.length}`);
    offs.forEach((o, i) => ok(s.rows[i].offeringId === o.id, `${o.id} order`));
  }
});

test("prices and calories match the homepage display values", () => {
  let checked = 0;
  for (const s of pdf.sections.filter((x) => x.kind === "menu")) {
    for (const row of s.rows) {
      const o = C.getOffering(row.offeringId);
      const v = D.offeringValues(o);
      const opts = D.offeringOptions(o);
      const tag = o.promotion?.eligible && !v.priceIsNote ? "Add-on " : "";
      if (opts.length > 1) {
        ok(row.options.length === opts.length, `${o.id} options`);
        opts.forEach((x, i) => {
          ok(row.options[i].price === tag + x.price, `${o.id} option price`);
          ok(row.options[i].calories === (x.caloriesIsNote ? x.calories : x.calories.replace(/ Cal$/, "")), `${o.id} option calories`);
          checked++;
        });
      } else {
        const m = opts[0] ?? v;
        ok(row.price === tag + m.price, `${o.id} price ${row.price} vs ${m.price}`);
        ok(row.calories === (m.caloriesIsNote ? m.calories : m.calories.replace(/ Cal$/, "")), `${o.id} calories`);
        checked++;
      }
    }
  }
  ok(checked > 250, `only ${checked} values checked`);
});

test("every row's name, price and calories are drawn in the file", () => {
  // Wrapped text is split over lines, so compare without spaces.
  const flat = allText.replace(/\s+/g, "");
  for (const s of pdf.sections)
    for (const r of s.rows) {
      for (const t of [r.item, r.price, r.calories, ...r.options.flatMap((o) => [o.label, o.price, o.calories])]) {
        if (!t) continue;
        ok(flat.includes(encode(t).replace(/\s+/g, "")), `missing "${t}" (${r.offeringId})`);
      }
    }
});

test("no invented values: missing values are notes, 'Calc.' values show their parts", () => {
  for (const s of pdf.sections)
    for (const r of s.rows) {
      if (r.priceIsNote && r.price !== "See sizes" && r.price !== "Included") ok(!/\$\d/.test(r.price) || /offer|\$6/.test(r.price), `${r.offeringId} price note ${r.price}`);
    }
  ok(!/estimated/i.test(allText.replace("Nothing is estimated", "")), "estimated wording");
  const calcRows = pdf.sections.flatMap((s) => s.rows).filter((r) => r.notes.some((n) => n.startsWith("Calc.:")) || r.options.some((o) => o.note && o.note.includes("Calc.:")));
  ok(calcRows.length > 5, "calc parts shown");
});

test("text stays inside the page (no clipped or off-page text)", () => {
  for (const [i, p] of pages.entries()) {
    for (const m of p.text.matchAll(/ ([\d.]+) ([\d.-]+) Td/g)) {
      const x = Number(m[1]), y = Number(m[2]);
      ok(x >= 20 && x <= 592 && y >= 18 && y <= 780, `page ${i + 1}: text at ${x},${y}`);
    }
  }
});

test("table rows never cross the footer area", () => {
  for (const [i, p] of pages.entries()) {
    if (i === 0) continue;
    for (const m of p.text.matchAll(/ ([\d.]+) ([\d.]+) Td \(((?:\\.|[^\\)])*)\) Tj/g)) {
      const y = Number(m[2]);
      // Footer lines sit at y 34 and 24; everything else must stay above the footer rule (y 46).
      const footer = y <= 34 && (/^(Not an official Olive Garden menu|Page \d+ of \d+)/.test(m[3]) || !m[3].includes(" "));
      if (!footer) ok(y >= 50, `page ${i + 1}: content at y=${y} "${m[3].slice(0, 30)}"`);
    }
  }
});

test("disclaimer, website address and page numbers on every page", () => {
  pages.forEach((p, i) => {
    const t = shown(p.text).join(" ");
    if (i === 0) ok(/not an official Olive Garden menu/.test(t) && /not affiliated with/.test(t), "cover disclaimer");
    else {
      ok(t.includes("Not an official Olive Garden menu."), `page ${i + 1} disclaimer`);
      ok(t.includes(`Page ${i + 1} of ${pages.length}`), `page ${i + 1} number`);
    }
  });
  ok(allText.includes("not affiliated with, endorsed by, or sponsored by"), "full disclaimer");
});

test("no reference restaurant or AI wording", () => {
  ok(!/orlando|millenia|4101 conroy|florida/i.test(allText), "location");
  ok(!/\bAI\b|ai-generated/i.test(allText), "AI wording");
});

test("logo and cover photo embedded as JPEG; file size optimized", () => {
  ok((raw.match(/\/Subtype \/Image/g) || []).length === 2 && raw.includes("/DCTDecode"), "images");
  ok(pdf.sizeBytes < 400 * 1024, `size ${pdf.sizeBytes}`);
});

console.log(`menu PDF tests: ${passed} passed, ${failed.length} failed`);
console.log(`pages ${pdf.pages}, size ${P.formatFileSize(pdf.sizeBytes)} (${pdf.sizeBytes} bytes), categories ${pdf.categories}, entries ${pdf.entries}`);
if (failed.length) {
  console.log(failed.map((f) => "FAIL " + f).join("\n"));
  process.exit(1);
}
