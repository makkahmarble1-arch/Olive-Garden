/**
 * Downloadable PDF of the calculator's meal report, written in the browser
 * with no library (PDF 1.4, standard Helvetica fonts, US Letter). Text is
 * converted to plain ASCII so it always displays correctly. Nothing is sent
 * to a server. docs/tools/NUTRITION_CALCULATOR_ARCHITECTURE.md §7.
 */
import type { MealReport } from "./meal-report";

const W = 612;
const H = 792;
const M = 48;

type RGB = [number, number, number];
const OLIVE_DEEP: RGB = [0.157, 0.216, 0.059]; // #28370f
const OLIVE: RGB = [0.333, 0.42, 0.071]; // #556b12
const LIME: RGB = [0.835, 0.906, 0.541]; // #d5e78a
const CREAM: RGB = [1, 0.988, 0.961]; // #fffcf5
const INK: RGB = [0.11, 0.098, 0.09];
const MUTED: RGB = [0.341, 0.325, 0.306];
const TINT: RGB = [0.965, 0.973, 0.91]; // brand-tint #f6f8e8
const LINE: RGB = [0.863, 0.898, 0.729]; // card border

/** Plain ASCII for the standard PDF fonts. */
export function toPdfText(text: string): string {
  return text
    .replace(/[–—]/g, "-")
    .replace(/≤/g, "<=")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[·•]/g, "-")
    .replace(/×/g, "x")
    .replace(/…/g, "...")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^\x20-\x7e]/g, "");
}

const esc = (t: string) => toPdfText(t).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
const rgb = (c: RGB) => c.map((v) => v.toFixed(3)).join(" ");

/** Wraps text to a width (Helvetica, about 0.53 em per character on average). */
function wrap(text: string, size: number, width: number): string[] {
  const max = Math.max(8, Math.floor(width / (size * 0.53)));
  const out: string[] = [];
  let line = "";
  for (const word of toPdfText(text).split(/\s+/).filter(Boolean)) {
    if (!line) line = word;
    else if ((line + " " + word).length <= max) line += " " + word;
    else {
      out.push(line);
      line = word;
    }
    while (line.length > max) {
      out.push(line.slice(0, max));
      line = line.slice(max);
    }
  }
  if (line) out.push(line);
  return out.length ? out : [""];
}

class Pages {
  pages: string[][] = [[]];
  y = H - M;
  get ops() {
    return this.pages[this.pages.length - 1];
  }
  text(x: number, y: number, t: string, size: number, bold = false, color: RGB = INK) {
    this.ops.push(`BT /${bold ? "F2" : "F1"} ${size} Tf ${rgb(color)} rg ${x.toFixed(1)} ${y.toFixed(1)} Td (${esc(t)}) Tj ET`);
  }
  rect(x: number, y: number, w: number, h: number, fill: RGB) {
    this.ops.push(`${rgb(fill)} rg ${x.toFixed(1)} ${y.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)} re f`);
  }
  hline(x1: number, x2: number, y: number, color: RGB) {
    this.ops.push(`${rgb(color)} RG 0.6 w ${x1} ${y.toFixed(1)} m ${x2} ${y.toFixed(1)} l S`);
  }
  /** Starts a new page when fewer than `need` points are left. Returns true if it did. */
  ensure(need: number): boolean {
    if (this.y - need >= M + 24) return false;
    this.pages.push([]);
    this.y = H - M;
    return true;
  }
}

const COLS = [
  { key: "item", label: "Item", x: M, w: 150 },
  { key: "version", label: "Portion / version", x: M + 156, w: 170 },
  { key: "qty", label: "Qty", x: M + 332, w: 30 },
  { key: "price", label: "Price", x: M + 368, w: 70 },
  { key: "calories", label: "Calories", x: M + 444, w: 72 },
] as const;

function tableHeader(p: Pages) {
  p.rect(M, p.y - 20, W - 2 * M, 20, OLIVE);
  for (const c of COLS) p.text(c.x + 4, p.y - 14, c.label, 9, true, [1, 1, 1]);
  p.y -= 20;
}

/** The report as PDF bytes (ASCII). */
export function buildMealPdf(report: MealReport): Uint8Array {
  const p = new Pages();

  // Header band
  p.rect(0, H - 96, W, 96, OLIVE_DEEP);
  p.text(M, H - 52, report.title, 22, true, [1, 1, 1]);
  p.text(M, H - 74, report.created, 10, false, LIME);
  p.y = H - 96 - 24;

  // Items table
  p.text(M, p.y, "Your meal", 14, true, OLIVE_DEEP);
  p.y -= 12;
  tableHeader(p);
  report.rows.forEach((r, i) => {
    const cells = COLS.map((c) => wrap(r[c.key], 9, c.w - 6));
    const note = r.note ? wrap(r.note, 7.5, W - 2 * M - 10) : [];
    const lines = Math.max(...cells.map((c) => c.length));
    const h = lines * 11 + note.length * 9.5 + 10;
    if (p.ensure(h)) tableHeader(p);
    if (i % 2 === 0) p.rect(M, p.y - h, W - 2 * M, h, CREAM);
    COLS.forEach((c, ci) => cells[ci].forEach((t, li) => p.text(c.x + 4, p.y - 13 - li * 11, t, 9, ci === 0)));
    note.forEach((t, li) => p.text(M + 4, p.y - 13 - lines * 11 - li * 9.5, t, 7.5, false, MUTED));
    p.y -= h;
    p.hline(M, W - M, p.y, LINE);
  });

  // Totals
  p.y -= 26;
  p.ensure(40);
  p.text(M, p.y, "Meal totals", 14, true, OLIVE_DEEP);
  p.y -= 10;
  for (const t of report.totals) {
    const h = 22;
    p.ensure(h);
    p.rect(M, p.y - h, W - 2 * M, h, CREAM);
    p.text(M + 8, p.y - 15, t.label, 10, true, OLIVE_DEEP);
    p.text(M + 170, p.y - 15, t.value, 11, true, INK);
    if (t.coverage) p.text(M + 340, p.y - 15, t.coverage, 8.5, true, OLIVE);
    p.y -= h + 4;
  }
  if (report.coverageNotes.length) {
    const lines = report.coverageNotes.flatMap((n) => wrap(n, 8, W - 2 * M - 16));
    const h = 22 + lines.length * 10;
    p.ensure(h);
    p.rect(M, p.y - h, W - 2 * M, h, TINT);
    p.text(M + 8, p.y - 14, "How these totals are counted", 9, true, OLIVE_DEEP);
    lines.forEach((l, i) => p.text(M + 8, p.y - 26 - i * 10, l, 8, false, INK));
    p.y -= h + 4;
  }

  // Notes
  p.y -= 14;
  p.ensure(30);
  p.text(M, p.y, "About these numbers", 11, true, OLIVE_DEEP);
  p.y -= 6;
  for (const n of report.notes) {
    const ls = wrap(n, 8.5, W - 2 * M);
    p.ensure(ls.length * 11 + 4);
    ls.forEach((l) => {
      p.y -= 11;
      p.text(M, p.y, l, 8.5, false, MUTED);
    });
    p.y -= 4;
  }

  // Footer on every page
  const total = p.pages.length;
  const footer = wrap(report.footer, 7, W - 2 * M - 60);
  p.pages.forEach((ops, i) => {
    footer.forEach((l, li) => ops.push(`BT /F1 7 Tf ${rgb(MUTED)} rg ${M} ${(30 - li * 9).toFixed(1)} Td (${esc(l)}) Tj ET`));
    ops.push(`BT /F1 7 Tf ${rgb(MUTED)} rg ${W - M - 40} 30 Td (${esc(`Page ${i + 1} of ${total}`)}) Tj ET`);
  });

  // Objects: 1 catalog, 2 pages, 3-4 fonts, then page + content pairs.
  const objs: string[] = [];
  const kids = p.pages.map((_, i) => `${5 + i * 2} 0 R`).join(" ");
  objs.push("<< /Type /Catalog /Pages 2 0 R >>");
  objs.push(`<< /Type /Pages /Kids [${kids}] /Count ${p.pages.length} >>`);
  objs.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
  objs.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");
  p.pages.forEach((ops, i) => {
    const stream = ops.join("\n");
    objs.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${6 + i * 2} 0 R >>`);
    objs.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
  });

  let out = "%PDF-1.4\n";
  const offsets: number[] = [];
  objs.forEach((o, i) => {
    offsets.push(out.length);
    out += `${i + 1} 0 obj\n${o}\nendobj\n`;
  });
  const xref = out.length;
  out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
  out += offsets.map((o) => `${String(o).padStart(10, "0")} 00000 n \n`).join("");
  out += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\n`;
  out += `startxref\n${xref}\n%%EOF\n`;

  const bytes = new Uint8Array(out.length);
  for (let i = 0; i < out.length; i++) bytes[i] = out.charCodeAt(i) & 0x7f;
  return bytes;
}
