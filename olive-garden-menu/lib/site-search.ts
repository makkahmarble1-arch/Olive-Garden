/**
 * Lightweight site search (no dependency, no external service): the header
 * downloads a small static index (/api/search-index, titles, descriptions,
 * keywords: no article bodies) on first use and ranks it in the browser with
 * partial-word and typo-tolerant matching. Shared by the API route and the
 * client. docs/DESIGN_SYSTEM.md 4.4.
 */

export type SearchEntry = {
  title: string;
  /** Short text under the title. */
  description: string;
  url: string;
  /** "Menu", "Guide", or "Homepage section". */
  kind: string;
  keywords: string[];
};

type Indexed = SearchEntry & { titleWords: string[]; keywordWords: string[]; descWords: string[]; titleText: string };

export function normalizeText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9$]+/g, " ")
    .trim();
}

const STOP = new Set(["olive", "garden", "the", "and", "of", "a", "an", "to", "for", "with", "at", "in", "on", "menu"]);
const words = (text: string) => normalizeText(text).split(" ").filter(Boolean);

/** Edit distance with transpositions, stopped early above `max`. */
function distance(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const d: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    let rowMin = Infinity;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      rowMin = Math.min(rowMin, d[i][j]);
    }
    if (rowMin > max) return max + 1;
  }
  return d[a.length][b.length];
}

/** How well one query word matches one indexed word (0 = no match). */
function wordMatch(q: string, w: string): number {
  if (w === q) return 1;
  if (q.length >= 2 && w.startsWith(q)) return 0.9;
  if (q.length >= 3 && w.includes(q)) return 0.6;
  if (q.length >= 4) {
    const allowed = q.length >= 7 ? 2 : 1;
    // Compare with the same-length start of longer words too ("alfred" ~ "alfredo").
    const dist = Math.min(distance(q, w, allowed), w.length > q.length ? distance(q, w.slice(0, q.length), allowed) : allowed + 1);
    if (dist <= allowed) return dist === 1 ? 0.7 : 0.5;
  }
  return 0;
}

export function buildIndex(entries: SearchEntry[]): Indexed[] {
  return entries.map((e) => ({
    ...e,
    titleWords: words(e.title),
    keywordWords: e.keywords.flatMap(words),
    descWords: words(e.description),
    titleText: normalizeText(e.title),
  }));
}

/** Best matches for a query (all meaningful query words must match). */
export function searchIndex(index: Indexed[], query: string, limit = 8): SearchEntry[] {
  const q = normalizeText(query);
  if (!q) return [];
  let terms = q.split(" ").filter((t) => !STOP.has(t));
  if (terms.length === 0) terms = q.split(" ");
  const scored: { entry: Indexed; score: number }[] = [];
  for (const entry of index) {
    let total = 0;
    let all = true;
    for (const term of terms) {
      const best = Math.max(
        ...entry.titleWords.map((w) => wordMatch(term, w) * 5),
        ...entry.keywordWords.map((w) => wordMatch(term, w) * 3),
        ...entry.descWords.map((w) => wordMatch(term, w) * 1),
        0,
      );
      if (best === 0) {
        all = false;
        break;
      }
      total += best;
    }
    if (!all) continue;
    if (entry.titleText.includes(q)) total += 4;
    // Prefer titles that are mostly the query ("Hours" over "Holiday Hours").
    const core = entry.titleWords.filter((w) => !STOP.has(w));
    if (core.length > 0 && core.every((w) => terms.some((t) => wordMatch(t, w) >= 0.9))) total += 3;
    total -= core.length * 0.1;
    if (entry.kind === "Menu") total += 0.5;
    scored.push({ entry, score: total });
  }
  return scored
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
    .slice(0, limit)
    .map(({ entry }) => ({ title: entry.title, description: entry.description, url: entry.url, kind: entry.kind, keywords: [] }));
}
