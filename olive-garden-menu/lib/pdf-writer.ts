/**
 * Small synchronous PDF 1.4 writer (no library, no network): standard
 * Helvetica fonts with WinAnsi encoding, exact Helvetica character widths for
 * wrapping (so text never runs out of a column), Flate-compressed page
 * streams (Node's built-in zlib) and JPEG images. Synchronous on purpose: a
 * Next.js route handler that only does synchronous work is prerendered at
 * build time (Cache Components), so the PDF becomes a static file.
 * Used by lib/menu-pdf.ts. docs/tools/MENU_PDF_ARCHITECTURE.md.
 */
import { deflateSync } from "node:zlib";

export type RGB = [number, number, number];

/** Helvetica / Helvetica-Bold widths (1/1000 em) for ASCII 32-126 (Adobe AFM). */
// prettier-ignore
const HELV = [278,278,355,556,556,889,667,191,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,278,278,584,584,584,556,1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,667,944,667,667,611,278,278,278,469,556,333,556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,333,500,278,556,500,722,500,500,500,334,260,334,584];
// prettier-ignore
const HELVB = [278,333,474,556,556,889,722,238,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,333,333,584,584,584,611,975,722,722,722,722,667,611,778,722,278,556,722,611,833,722,778,667,778,722,667,611,722,667,944,667,667,611,333,278,333,584,556,333,556,611,556,611,556,333,611,611,278,278,556,278,889,611,611,611,611,389,556,333,611,556,778,556,556,500,389,280,389,584];

/** Characters outside Latin-1 that WinAnsi encodes in the 0x80-0x9F range. */
const WINANSI: Record<string, number> = { "–": 0x96, "—": 0x97, "‘": 0x91, "’": 0x92, "“": 0x93, "”": 0x94, "•": 0x95, "…": 0x85 };
const WIDE: Record<number, number> = { 0x96: 556, 0x97: 1000, 0x91: 222, 0x92: 222, 0x93: 333, 0x94: 333, 0x95: 350, 0x85: 1000, 0xd7: 584, 0xb7: 278, 0xa0: 278 };

/** Text as a WinAnsi byte string ("≤" becomes "<="; unknown characters are dropped). */
export function encode(text: string): string {
  let out = "";
  for (const ch of text.normalize("NFC").replace(/≤/g, "<=").replace(/≥/g, ">=")) {
    const code = ch.charCodeAt(0);
    if (WINANSI[ch]) out += String.fromCharCode(WINANSI[ch]);
    else if (code >= 32 && code <= 126) out += ch;
    else if (code >= 160 && code <= 255) out += ch;
  }
  return out;
}

/** Width in points of an encoded string. */
export function width(encoded: string, size: number, bold = false): number {
  const table = bold ? HELVB : HELV;
  let w = 0;
  for (let i = 0; i < encoded.length; i++) {
    const c = encoded.charCodeAt(i);
    w += c >= 32 && c <= 126 ? table[c - 32] : (WIDE[c] ?? 611);
  }
  return (w * size) / 1000;
}

/** Wraps text to a width; very long words are split. Returns encoded lines. */
export function wrap(text: string, size: number, maxWidth: number, bold = false): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of encode(text).split(/ +/).filter(Boolean)) {
    const candidate = line ? `${line} ${word}` : word;
    if (width(candidate, size, bold) <= maxWidth) {
      line = candidate;
      continue;
    }
    if (line) lines.push(line);
    line = word;
    while (width(line, size, bold) > maxWidth) {
      let cut = line.length - 1;
      while (cut > 1 && width(line.slice(0, cut), size, bold) > maxWidth) cut--;
      lines.push(line.slice(0, cut));
      line = line.slice(cut);
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

const num = (n: number) => (Math.round(n * 100) / 100).toString();
const color = (c: RGB) => c.map((v) => num(v)).join(" ");
const escape = (s: string) => s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

export class PdfPage {
  ops: string[] = [];
  images = new Set<string>();
  /** Text at (x, y) baseline. `text` must already be encoded (see encode/wrap) unless raw is false. */
  text(x: number, y: number, text: string, size: number, opts: { bold?: boolean; color?: RGB; encoded?: boolean; align?: "left" | "right" | "center" } = {}) {
    const enc = opts.encoded ? text : encode(text);
    const w = opts.align && opts.align !== "left" ? width(enc, size, opts.bold) : 0;
    const left = opts.align === "right" ? x - w : opts.align === "center" ? x - w / 2 : x;
    this.ops.push(`BT /${opts.bold ? "F2" : "F1"} ${num(size)} Tf ${color(opts.color ?? [0.11, 0.1, 0.09])} rg ${num(left)} ${num(y)} Td (${escape(enc)}) Tj ET`);
  }
  rect(x: number, y: number, w: number, h: number, fill: RGB) {
    this.ops.push(`${color(fill)} rg ${num(x)} ${num(y)} ${num(w)} ${num(h)} re f`);
  }
  /** Rounded rectangle (fill and/or stroke). */
  roundRect(x: number, y: number, w: number, h: number, r: number, fill: RGB | null, stroke?: RGB, lineWidth = 0.75) {
    const k = 0.5523 * r;
    const p = [
      `${num(x + r)} ${num(y)} m`,
      `${num(x + w - r)} ${num(y)} l`,
      `${num(x + w - r + k)} ${num(y)} ${num(x + w)} ${num(y + r - k)} ${num(x + w)} ${num(y + r)} c`,
      `${num(x + w)} ${num(y + h - r)} l`,
      `${num(x + w)} ${num(y + h - r + k)} ${num(x + w - r + k)} ${num(y + h)} ${num(x + w - r)} ${num(y + h)} c`,
      `${num(x + r)} ${num(y + h)} l`,
      `${num(x + r - k)} ${num(y + h)} ${num(x)} ${num(y + h - r + k)} ${num(x)} ${num(y + h - r)} c`,
      `${num(x)} ${num(y + r)} l`,
      `${num(x)} ${num(y + r - k)} ${num(x + r - k)} ${num(y)} ${num(x + r)} ${num(y)} c h`,
    ].join(" ");
    const paint = fill && stroke ? "B" : fill ? "f" : "S";
    this.ops.push(`${fill ? `${color(fill)} rg ` : ""}${stroke ? `${color(stroke)} RG ${num(lineWidth)} w ` : ""}${p} ${paint}`);
  }
  line(x1: number, y1: number, x2: number, y2: number, stroke: RGB, lineWidth = 0.6, dash?: number[]) {
    this.ops.push(`${dash ? `[${dash.join(" ")}] 0 d ` : ""}${color(stroke)} RG ${num(lineWidth)} w ${num(x1)} ${num(y1)} m ${num(x2)} ${num(y2)} l S${dash ? " [] 0 d" : ""}`);
  }
  /** Draws a registered JPEG, optionally clipped to a rectangle (for "cover" cropping). */
  image(name: string, x: number, y: number, w: number, h: number, clip?: [number, number, number, number]) {
    this.images.add(name);
    const c = clip ? `${clip.map(num).join(" ")} re W n ` : "";
    this.ops.push(`q ${c}${num(w)} 0 0 ${num(h)} ${num(x)} ${num(y)} cm /${name} Do Q`);
  }
}

export type PdfImage = { name: string; jpeg: Uint8Array; width: number; height: number };

export class PdfDoc {
  pages: PdfPage[] = [];
  images = new Map<string, PdfImage>();
  constructor(
    readonly pageWidth: number,
    readonly pageHeight: number,
  ) {}
  addPage(): PdfPage {
    const p = new PdfPage();
    this.pages.push(p);
    return p;
  }
  addImage(img: PdfImage) {
    this.images.set(img.name, img);
  }

  /** The finished file. `info` values are plain text; `created` is an ISO date (deterministic). */
  toBytes(info: { title: string; author: string; subject: string; creator: string; created: string | null }): Uint8Array {
    const chunks: Buffer[] = [];
    const offsets: number[] = [];
    let size = 0;
    const push = (b: Buffer) => {
      chunks.push(b);
      size += b.length;
    };
    const objects: (Buffer | string)[] = [];
    const add = (o: Buffer | string) => objects.push(o) && objects.length;

    const catalog = add("");
    const pagesObj = add("");
    const f1 = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
    const f2 = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");
    const imageIds = new Map<string, number>();
    for (const img of this.images.values()) {
      const head = Buffer.from(
        `<< /Type /XObject /Subtype /Image /Width ${img.width} /Height ${img.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${img.jpeg.length} >>\nstream\n`,
        "latin1",
      );
      imageIds.set(img.name, add(Buffer.concat([head, Buffer.from(img.jpeg), Buffer.from("\nendstream", "latin1")])));
    }
    const pageIds: number[] = [];
    for (const page of this.pages) {
      const data = deflateSync(Buffer.from(page.ops.join("\n"), "latin1"), { level: 9 });
      const content = add(Buffer.concat([Buffer.from(`<< /Length ${data.length} /Filter /FlateDecode >>\nstream\n`, "latin1"), data, Buffer.from("\nendstream", "latin1")]));
      const xobjects = [...page.images].map((n) => `/${n} ${imageIds.get(n)} 0 R`).join(" ");
      pageIds.push(
        add(
          `<< /Type /Page /Parent ${pagesObj} 0 R /MediaBox [0 0 ${this.pageWidth} ${this.pageHeight}] /Resources << /Font << /F1 ${f1} 0 R /F2 ${f2} 0 R >>${xobjects ? ` /XObject << ${xobjects} >>` : ""} >> /Contents ${content} 0 R >>`,
        ),
      );
    }
    objects[catalog - 1] = `<< /Type /Catalog /Pages ${pagesObj} 0 R /ViewerPreferences << /DisplayDocTitle true >> /PageLayout /SinglePage >>`;
    objects[pagesObj - 1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;
    const d = info.created ? `D:${info.created.replace(/-/g, "")}000000Z` : null;
    const str = (s: string) => `(${escape(encode(s))})`;
    const infoId = add(
      `<< /Title ${str(info.title)} /Author ${str(info.author)} /Subject ${str(info.subject)} /Creator ${str(info.creator)} /Producer (olivegardenmenuprices PDF writer)${d ? ` /CreationDate (${d}) /ModDate (${d})` : ""} >>`,
    );

    push(Buffer.from("%PDF-1.4\n%\xe2\xe3\xcf\xd3\n", "latin1"));
    objects.forEach((o, i) => {
      offsets.push(size);
      push(Buffer.from(`${i + 1} 0 obj\n`, "latin1"));
      push(typeof o === "string" ? Buffer.from(o, "latin1") : o);
      push(Buffer.from("\nendobj\n", "latin1"));
    });
    const xref = size;
    push(
      Buffer.from(
        `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.map((o) => `${String(o).padStart(10, "0")} 00000 n \n`).join("")}trailer\n<< /Size ${objects.length + 1} /Root ${catalog} 0 R /Info ${infoId} 0 R >>\nstartxref\n${xref}\n%%EOF\n`,
        "latin1",
      ),
    );
    return new Uint8Array(Buffer.concat(chunks));
  }
}
