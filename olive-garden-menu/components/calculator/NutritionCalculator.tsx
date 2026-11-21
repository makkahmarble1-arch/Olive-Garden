"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import Icon from "@/components/product/icons";
import { buildIndex, searchIndex } from "@/lib/site-search";
import { formatNumber, formatPrice } from "@/lib/format";
import { isComplete, mealTotals, type MealTotals, type NutrientKey, type Total } from "@/lib/calculator-math";
import { buildMealReport, PRICE_DISCLOSURE, type MealReport, type ReportMeta } from "@/lib/meal-report";
import { buildMealPdf } from "@/lib/meal-pdf";
import type { CalcCategory, CalcChoice, CalcItem } from "@/lib/calculator-data";

/** Items shown before "Show more" (keeps the first render and image loading small). */
const PAGE_SIZE = 24;
const MAX_QTY = 99;

type Line = { itemId: string; choiceId: string; qty: number };


const NUTRIENTS: { key: NutrientKey; label: string; unit: string; tone: string }[] = [
  { key: "protein", label: "Protein", unit: "g", tone: "bg-brand-dark text-white" },
  { key: "carbs", label: "Carbs", unit: "g", tone: "bg-hero-highlight text-hero-deep" },
  { key: "fat", label: "Total fat", unit: "g", tone: "bg-brand-tint text-brand-darker" },
  { key: "sodium", label: "Sodium", unit: "mg", tone: "bg-kcal-bg text-kcal-text" },
];

function calText(c: CalcChoice): string {
  if (!c.calories) return "Not listed";
  const [min, max] = c.calories;
  return min === max ? formatNumber(min) : `${formatNumber(min)}–${formatNumber(max)}`;
}

/**
 * Nutrition & Meal Price Calculator (Improvement 7). All values are verified
 * and prepared on the server (lib/calculator-data.ts); this component only
 * filters, selects and adds them up (lib/calculator-math.ts). No requests, no
 * storage: the meal lives in this tab only.
 */
export default function NutritionCalculator({ items, categories, meta }: { items: CalcItem[]; categories: CalcCategory[]; meta: ReportMeta }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [picked, setPicked] = useState<Record<string, string>>({});
  const [lines, setLines] = useState<Line[]>([]);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [status, setStatus] = useState("");
  /** Print view mounted (only while printing, so Ctrl+P elsewhere prints the normal page). */
  const [printReport, setPrintReport] = useState<MealReport | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const byId = useMemo(() => new Map(items.map((i) => [i.id, i])), [items]);
  const choiceById = useMemo(() => new Map(items.flatMap((i) => i.choices.map((c) => [c.id, c] as const))), [items]);
  const index = useMemo(
    () => buildIndex(items.map((i) => ({ title: i.name, description: "", url: i.id, kind: "Item", keywords: [...i.keywords, ...i.choices.map((c) => c.label)] }))),
    [items],
  );

  const filtered = useMemo(() => {
    const inCategory = (i: CalcItem) => category === "all" || i.categoryIds.includes(category as CalcItem["categoryIds"][number]);
    if (!query.trim()) return items.filter(inCategory);
    return searchIndex(index, query, items.length)
      .map((e) => byId.get(e.url)!)
      .filter(inCategory);
  }, [items, index, byId, query, category]);

  /** Selected version of an item: the visitor's pick, else the first version in the chosen category. */
  function currentChoice(item: CalcItem): CalcChoice {
    const id = picked[item.id];
    const chosen = id ? item.choices.find((c) => c.id === id) : undefined;
    if (chosen) return chosen;
    if (category !== "all") {
      const inCat = item.choices.find((c) => c.categoryIds.includes(category as CalcChoice["categoryIds"][number]));
      if (inCat) return inCat;
    }
    return item.choices[0];
  }

  function add(item: CalcItem) {
    const choice = currentChoice(item);
    const found = lines.find((l) => l.choiceId === choice.id);
    const next = found
      ? lines.map((l) => (l.choiceId === choice.id ? { ...l, qty: Math.min(MAX_QTY, l.qty + 1) } : l))
      : [...lines, { itemId: item.id, choiceId: choice.id, qty: 1 }];
    const count = next.reduce((n, l) => n + l.qty, 0);
    setLines(next);
    setStatus(`Added ${item.name} (${choice.label}). ${count} ${count === 1 ? "item" : "items"} in your meal.`);
  }

  function setQty(choiceId: string, qty: number) {
    setLines((prev) => prev.map((l) => (l.choiceId === choiceId ? { ...l, qty: Math.max(1, Math.min(MAX_QTY, qty)) } : l)));
  }

  function remove(line: Line) {
    const item = byId.get(line.itemId);
    setLines((prev) => prev.filter((l) => l.choiceId !== line.choiceId));
    setStatus(`Removed ${item?.name ?? "item"} from your meal.`);
  }

  function reset() {
    setLines([]);
    setStatus("Your meal is empty.");
  }

  function report(): MealReport {
    return buildMealReport(
      mealLines.map(({ item, choice, line }) => ({
        name: item.name,
        version: choice.label,
        qty: line.qty,
        price: choice.price,
        calories: choice.calories,
        hasNutrition: choice.nutrition !== null,
        bundle: choice.bundle,
      })),
      totals,
      meta,
    );
  }

  /** Writes the PDF in the browser and saves it; nothing is uploaded. */
  function downloadPdf() {
    const r = report();
    const blob = new Blob([buildMealPdf(r) as BlobPart], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `olive-garden-meal-estimate-${r.createdIso}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
    setStatus("Your meal estimate was downloaded as a PDF.");
  }

  useEffect(() => {
    if (!printReport) return;
    const done = () => setPrintReport(null);
    window.addEventListener("afterprint", done);
    const timer = window.setTimeout(() => window.print(), 60);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("afterprint", done);
    };
  }, [printReport]);

  function onSearchKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape" && query) {
      e.preventDefault();
      setQuery("");
      setVisible(PAGE_SIZE);
    }
  }

  const mealLines = lines.flatMap((l) => {
    const item = byId.get(l.itemId);
    const choice = choiceById.get(l.choiceId);
    return item && choice ? [{ line: l, item, choice }] : [];
  });
  const totals = mealTotals(mealLines.map(({ item, choice, line }) => ({ name: item.name, choice, qty: line.qty })));
  const shown = filtered.slice(0, visible);

  return (
    <div className={`grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-start ${totals.items > 0 ? "pb-24 lg:pb-0" : ""}`}>
      <p role="status" aria-live="polite" className="sr-only">
        {status}
      </p>

      {/* ---------- Build your meal ---------- */}
      <section aria-labelledby="build-meal" className="min-w-0 rounded-3xl border border-card-border bg-header-cream p-4 shadow-[0_18px_40px_-30px_rgba(40,55,15,0.6)] sm:p-6">
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-brand-dark text-white" aria-hidden="true">
            <Icon name="plate" className="size-5" />
          </span>
          <div>
            <h2 id="build-meal" className="font-display text-2xl font-bold text-hero-deep">
              Build Your Meal
            </h2>
            <p className="text-sm text-muted">Search or pick a category, choose a version, then add it.</p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div>
            <label htmlFor="calc-search" className="text-xs font-semibold tracking-wide text-hero-deep uppercase">
              Search menu items
            </label>
            <div className="relative mt-1">
              <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-brand-dark" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </span>
              <input
                ref={searchRef}
                id="calc-search"
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setVisible(PAGE_SIZE);
                }}
                onKeyDown={onSearchKey}
                placeholder="e.g. alfredo, lunch, soup"
                autoComplete="off"
                className="min-h-12 w-full rounded-2xl border border-card-border bg-white py-2 pr-12 pl-10 text-base text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-brand-dark [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setVisible(PAGE_SIZE);
                    searchRef.current?.focus();
                  }}
                  aria-label="Clear search"
                  className="absolute top-1/2 right-1 grid size-11 -translate-y-1/2 place-items-center rounded-xl text-xl leading-none text-muted hover:bg-brand-tint hover:text-hero-deep focus-visible:outline-2 focus-visible:outline-brand-dark"
                >
                  <span aria-hidden="true">×</span>
                </button>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="calc-category" className="text-xs font-semibold tracking-wide text-hero-deep uppercase">
              Menu category
            </label>
            <select
              id="calc-category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setVisible(PAGE_SIZE);
              }}
              className="mt-1 min-h-12 w-full rounded-2xl border border-card-border bg-white px-3 text-base text-ink focus-visible:outline-2 focus-visible:outline-brand-dark"
            >
              <option value="all">All categories ({items.length})</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.count})
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="mt-4 text-sm text-muted" aria-live="polite">
          {filtered.length === 0 ? "No matching items." : `Showing ${shown.length} of ${filtered.length} ${filtered.length === 1 ? "item" : "items"}.`}
        </p>

        {filtered.length === 0 ? (
          <div className="mt-3 rounded-2xl border border-dashed border-card-border bg-white p-6 text-center">
            <p className="font-semibold text-hero-deep">No menu items match “{query}”{category !== "all" ? " in this category" : ""}.</p>
            <p className="mt-1 text-sm text-muted">Check the spelling, try a shorter word, or choose All categories.</p>
          </div>
        ) : (
          <ul className="mt-3 grid gap-3" aria-label="Menu items">
            {shown.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                choice={currentChoice(item)}
                onPick={(id) => setPicked((p) => ({ ...p, [item.id]: id }))}
                onAdd={() => add(item)}
              />
            ))}
          </ul>
        )}

        {filtered.length > shown.length && (
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="mt-4 min-h-12 w-full rounded-2xl border border-brand-dark bg-white px-4 font-semibold text-brand-dark hover:bg-brand-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
          >
            Show {Math.min(PAGE_SIZE, filtered.length - shown.length)} more items
          </button>
        )}
      </section>

      {/* ---------- Your meal ---------- */}
      <section
        id="your-meal"
        aria-labelledby="your-meal-title"
        className="min-w-0 scroll-mt-[calc(var(--header-h)+1rem)] overflow-hidden rounded-3xl border border-card-border bg-white shadow-[0_18px_40px_-30px_rgba(40,55,15,0.6)] lg:sticky lg:top-[calc(var(--header-h)+1rem)]"
      >
        <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-hero-deep to-brand-dark px-4 py-4 sm:px-6">
          <h2 id="your-meal-title" className="flex items-center gap-2 font-display text-2xl font-bold text-white">
            <Icon name="list" className="size-5 text-hero-highlight" />
            Your Meal
          </h2>
          <span className="rounded-full bg-hero-highlight px-3 py-1 text-sm font-bold text-hero-deep tabular-nums">
            {totals.items} {totals.items === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="p-4 sm:p-6">
          {mealLines.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-card-border bg-header-cream p-5 text-center">
              <p className="font-semibold text-hero-deep">Your meal is empty.</p>
              <p className="mt-1 text-sm text-muted">Add items from the list to see the estimated price and nutrition totals.</p>
            </div>
          ) : (
            <ul className="divide-y divide-line lg:max-h-[min(24rem,42vh)] lg:overflow-y-auto lg:pr-2" aria-label="Items in your meal">
              {mealLines.map(({ line, item, choice }) => (
                <li key={line.choiceId} className="py-3 first:pt-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold leading-6 text-ink">{item.name}</p>
                      <p className="text-sm text-muted">{choice.label}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(line)}
                      aria-label={`Remove ${item.name} (${choice.label})`}
                      className="grid size-11 shrink-0 place-items-center rounded-xl text-xl leading-none text-allergen-text hover:bg-allergen-bg focus-visible:outline-2 focus-visible:outline-brand-dark"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center rounded-xl border border-card-border bg-header-cream" role="group" aria-label={`Quantity of ${item.name}`}>
                      <button
                        type="button"
                        onClick={() => setQty(line.choiceId, line.qty - 1)}
                        disabled={line.qty <= 1}
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="grid size-11 place-items-center rounded-l-xl text-xl font-bold text-brand-dark hover:bg-brand-tint disabled:cursor-not-allowed disabled:text-line focus-visible:outline-2 focus-visible:outline-brand-dark"
                      >
                        <span aria-hidden="true">−</span>
                      </button>
                      <span className="min-w-8 text-center font-bold text-hero-deep tabular-nums" aria-live="polite">
                        <span className="sr-only">Quantity </span>
                        {line.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty(line.choiceId, line.qty + 1)}
                        disabled={line.qty >= MAX_QTY}
                        aria-label={`Increase quantity of ${item.name}`}
                        className="grid size-11 place-items-center rounded-r-xl text-xl font-bold text-brand-dark hover:bg-brand-tint disabled:cursor-not-allowed disabled:text-line focus-visible:outline-2 focus-visible:outline-brand-dark"
                      >
                        <span aria-hidden="true">+</span>
                      </button>
                    </div>
                    <p className="text-right text-sm leading-5 tabular-nums">
                      <span className="block font-bold text-hero-deep">{choice.price === null ? "Price not verified" : formatPrice(choice.price * line.qty)}</span>
                      <span className="text-kcal-text">
                        {choice.calories
                          ? `${choice.calories[0] === choice.calories[1] ? formatNumber(choice.calories[0] * line.qty) : `${formatNumber(choice.calories[0] * line.qty)}–${formatNumber(choice.calories[1] * line.qty)}`} Cal`
                          : "Calories not listed"}
                      </span>
                    </p>
                  </div>
                  {!choice.nutrition && (
                    <p className="mt-2 flex items-start gap-1.5 text-xs leading-5 text-muted">
                      <Icon name="info" className="mt-0.5 size-3.5 shrink-0 text-brand-dark" />
                      {choice.bundle
                        ? "Bundle: counted once with Olive Garden’s own total; protein, carbs, fat and sodium are not listed for it."
                        : "Calories only: Olive Garden’s nutrition guide has no exact protein, carbs, fat or sodium for this version."}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}

          <Totals totals={totals} />

          <p className="mt-4 flex items-start gap-2 rounded-2xl bg-brand-tint p-3 text-sm leading-6 text-ink">
            <Icon name="tag" className="mt-1 size-4 shrink-0 text-brand-dark" />
            {PRICE_DISCLOSURE}
          </p>

          {mealLines.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={downloadPdf}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-brand-dark px-4 font-semibold text-white shadow-sm hover:bg-brand-darker focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" />
                </svg>
                Download PDF
              </button>
              <button
                type="button"
                onClick={() => setPrintReport(report())}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-brand-dark bg-white px-4 font-semibold text-brand-dark hover:bg-brand-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 9V4h10v5M7 17H5a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2M7 14h10v6H7z" />
                </svg>
                Print
              </button>
            </div>
          )}

          {mealLines.length > 0 && (
            <button
              type="button"
              onClick={reset}
              className="mt-4 min-h-12 w-full rounded-2xl border border-allergen-border bg-white px-4 font-semibold text-allergen-text hover:bg-allergen-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
            >
              Reset meal
            </button>
          )}
        </div>
      </section>

      {printReport && createPortal(<MealPrintView report={printReport} />, document.body)}

      {/* Phones and tablets: a compact meal summary that stays in reach. */}
      {totals.items > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-card-border bg-header-cream/95 px-4 py-3 shadow-[0_-8px_24px_-16px_rgba(40,55,15,0.5)] backdrop-blur lg:hidden">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
            <p className="min-w-0 text-sm leading-5">
              <span className="block font-bold text-hero-deep">
                {totals.items} {totals.items === 1 ? "item" : "items"} · {formatPrice(totals.price.value)}
                {!isComplete(totals.price) && <span className="font-normal text-muted"> ({coverage(totals.price, totals.lines)} priced)</span>}
              </span>
              <span className="text-kcal-text">
                {formatCalories(totals.calories)} Cal
                {!isComplete(totals.calories) && <span className="text-muted"> ({coverage(totals.calories, totals.lines)})</span>}
              </span>
            </p>
            <a
              href="#your-meal"
              className="inline-flex min-h-11 shrink-0 items-center rounded-2xl bg-brand-dark px-4 font-semibold text-white hover:bg-brand-darker focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
            >
              View meal
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Print-only meal report: a direct child of <body>; globals.css hides every other
 * part of the page while it is mounted (only during printing).
 */
function MealPrintView({ report }: { report: MealReport }) {
  return (
    <div id="meal-print" className="bg-white p-6 text-ink">
      <div className="rounded-2xl bg-hero-deep px-6 py-5 text-white">
        <p className="font-display text-3xl font-bold">{report.title}</p>
        <p className="mt-1 text-sm text-hero-highlight">{report.created}</p>
      </div>
      <h2 className="mt-6 font-display text-xl font-bold text-hero-deep">Your meal</h2>
      <table className="mt-2 w-full border-collapse text-left text-sm">
        <thead>
          <tr className="bg-brand-dark text-white">
            <th scope="col" className="px-3 py-2">Item</th>
            <th scope="col" className="px-3 py-2">Portion / version</th>
            <th scope="col" className="px-3 py-2">Qty</th>
            <th scope="col" className="px-3 py-2">Price</th>
            <th scope="col" className="px-3 py-2">Calories</th>
          </tr>
        </thead>
        <tbody>
          {report.rows.map((r, i) => (
            <tr key={i} className="border-b border-card-border odd:bg-header-cream">
              <th scope="row" className="px-3 py-2 align-top font-semibold">
                {r.item}
                {r.note && <span className="mt-0.5 block text-xs font-normal text-muted">{r.note}</span>}
              </th>
              <td className="px-3 py-2 align-top">{r.version}</td>
              <td className="px-3 py-2 align-top whitespace-nowrap tabular-nums">{r.qty}</td>
              <td className="px-3 py-2 align-top whitespace-nowrap tabular-nums">{r.price}</td>
              <td className="px-3 py-2 align-top whitespace-nowrap tabular-nums">{r.calories}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="mt-6 font-display text-xl font-bold text-hero-deep">Meal totals</h2>
      <dl className="mt-2 grid grid-cols-2 gap-2 text-sm">
        {report.totals.map((t) => (
          <div key={t.label} className="rounded-xl border border-card-border bg-header-cream p-3">
            <dt className="font-semibold text-hero-deep">{t.label}</dt>
            <dd className="font-display text-xl font-bold tabular-nums">{t.value}</dd>
            {t.coverage && <dd className="text-xs font-semibold text-brand-dark">{t.coverage}</dd>}
          </div>
        ))}
      </dl>
      {report.coverageNotes.length > 0 && (
        <div className="mt-3 rounded-xl border border-card-border bg-brand-tint p-3 text-xs leading-5">
          <p className="font-semibold text-hero-deep">How these totals are counted</p>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            {report.coverageNotes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      )}
      <h2 className="mt-6 font-display text-lg font-bold text-hero-deep">About these numbers</h2>
      <ul className="mt-1 list-disc space-y-1 pl-5 text-xs leading-5 text-muted">
        {report.notes.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
      <p className="mt-4 border-t border-card-border pt-2 text-[0.7rem] text-muted">{report.footer}</p>
    </div>
  );
}

function formatCalories(t: Total): string {
  return t.max !== t.value ? `${formatNumber(t.value)}–${formatNumber(t.max)}` : formatNumber(t.value);
}

function ItemCard({ item, choice, onPick, onAdd }: { item: CalcItem; choice: CalcChoice; onPick: (id: string) => void; onAdd: () => void }) {
  const selectId = `ver-${item.id}`;
  return (
    <li className="rounded-2xl border border-card-border bg-white p-3 shadow-[0_1px_2px_rgba(40,55,15,0.05)] sm:p-4">
      <div className="flex gap-3">
        <div className="relative size-18 shrink-0 overflow-hidden rounded-xl bg-brand-tint ring-1 ring-card-border sm:size-20">
          {item.image ? (
            <Image src={item.image.src} alt="" width={160} height={160} sizes="80px" className="h-full w-full object-cover" />
          ) : (
            <span className="grid h-full place-items-center text-brand-dark" aria-hidden="true">
              <Icon name="plate" className="size-7" />
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg leading-snug font-bold text-hero-deep">{item.name}</h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-sm">
            <span className="rounded-lg bg-brand-dark px-2 py-0.5 font-bold text-white tabular-nums">
              {choice.price === null ? "Price not verified" : formatPrice(choice.price)}
            </span>
            <span className="rounded-lg bg-kcal-bg px-2 py-0.5 font-semibold text-kcal-text tabular-nums">
              {calText(choice)}
              {choice.calories && " Cal"}
              {choice.caloriesCalculated && <span className="font-normal"> (Calc.)</span>}
            </span>
            {choice.nutrition ? (
              <span className="rounded-lg bg-hero-highlight/60 px-2 py-0.5 text-xs font-semibold text-hero-deep">Full nutrition</span>
            ) : choice.calories ? (
              <span className="rounded-lg bg-brand-tint px-2 py-0.5 text-xs font-semibold text-brand-darker">Calories only</span>
            ) : (
              <span className="rounded-lg bg-warning-bg px-2 py-0.5 text-xs font-semibold text-warning-text">No nutrition listed</span>
            )}
            {choice.bundle && <span className="rounded-lg bg-header-cream px-2 py-0.5 text-xs font-semibold text-hero-deep ring-1 ring-card-border">Bundle</span>}
            {choice.limitedTime && <span className="rounded-lg bg-warning-bg px-2 py-0.5 text-xs font-semibold text-warning-text">Limited time</span>}
          </div>
          {choice.serving && <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted">{choice.serving}</p>}
          {!choice.calories && choice.caloriesNote && <p className="mt-1 text-xs leading-5 text-muted">{choice.caloriesNote}.</p>}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-end gap-2">
        {item.choices.length > 1 ? (
          <div className="min-w-0 flex-1 basis-48">
            <label htmlFor={selectId} className="text-xs font-semibold text-hero-deep">
              Portion or version
            </label>
            <select
              id={selectId}
              value={choice.id}
              onChange={(e) => onPick(e.target.value)}
              className="mt-1 min-h-11 w-full rounded-xl border border-card-border bg-header-cream px-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-brand-dark"
            >
              {item.choices.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label} · {c.price === null ? "price not verified" : formatPrice(c.price)} · {calText(c)}
                  {c.calories ? " Cal" : ""}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p className="min-w-0 flex-1 basis-48 text-sm text-muted">{choice.label}</p>
        )}
        {item.href && (
          <Link
            href={item.href}
            aria-label={`${item.name}: item page with allergens and full nutrition`}
            className="inline-flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-brand-dark underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-brand-dark"
          >
            Details
          </Link>
        )}
        <button
          type="button"
          onClick={onAdd}
          aria-label={`Add ${item.name} (${choice.label}) to your meal`}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-hero-cta px-4 font-bold text-hero-deep shadow-sm hover:bg-hero-highlight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
        >
          <span aria-hidden="true" className="text-lg leading-none">
            +
          </span>
          Add
        </button>
      </div>
    </li>
  );
}

/** "1 of 3 items": how many meal lines a total includes. */
function coverage(t: Total, lines: number): string {
  return `${t.known} of ${lines} ${lines === 1 ? "item" : "items"}`;
}

/**
 * Explains, once and in plain words, which items a partial total leaves out
 * (Olive Garden publishes no exact value for them). Never a zero, never hidden.
 */
function CoverageNote({ totals }: { totals: MealTotals }) {
  const { price, calories, nutrients } = totals;
  const partial = NUTRIENTS.filter((n) => !isComplete(nutrients[n.key]));
  const sameSet = partial.every((n) => nutrients[n.key].missing.join("|") === nutrients[partial[0]?.key]?.missing.join("|"));
  const nutrientNames = [...new Set(partial.flatMap((n) => nutrients[n.key].missingNames))];
  const stillCounted = nutrientNames.every((name) => !price.missingNames.includes(name) && !calories.missingNames.includes(name));
  if (partial.length === 0 && isComplete(price) && isComplete(calories)) return null;

  return (
    <div className="mt-3 rounded-2xl border border-card-border bg-brand-tint p-3 text-sm leading-6 text-ink">
      <p className="flex items-center gap-1.5 font-semibold text-hero-deep">
        <Icon name="info" className="size-4 shrink-0 text-brand-dark" />
        How these totals are counted
      </p>
      <ul className="mt-1 space-y-1.5 pl-5.5 text-[0.8125rem] leading-5">
        {partial.length > 0 &&
          (sameSet ? (
            <li>
              Olive Garden’s nutrition guide has no exact {partial.length === NUTRIENTS.length ? "protein, carbs, fat or sodium" : partial.map((n) => n.label.toLowerCase()).join(", ")}{" "}
              values for <strong className="font-semibold">{nutrientNames.join(", ")}</strong>, so{" "}
              {nutrientNames.length === 1 ? "it is" : "they are"} left out of those totals.
              {stillCounted && ` ${nutrientNames.length === 1 ? "Its" : "Their"} price and calories are still counted.`}
            </li>
          ) : (
            partial.map((n) => (
              <li key={n.key}>
                No exact {n.label.toLowerCase()} value for <strong className="font-semibold">{nutrients[n.key].missingNames.join(", ")}</strong>.
              </li>
            ))
          ))}
        {!isComplete(calories) && (
          <li>
            Calories are not listed for <strong className="font-semibold">{calories.missingNames.join(", ")}</strong> in this size, so the calorie total
            covers the other items.
          </li>
        )}
        {!isComplete(price) && (
          <li>
            No verified price for <strong className="font-semibold">{price.missingNames.join(", ")}</strong>; the subtotal covers the other items.
          </li>
        )}
        {partial.length > 0 && <li className="text-muted">Tip: each dish’s item page (Details) shows every value Olive Garden publishes for it.</li>}
      </ul>
    </div>
  );
}

function Totals({ totals }: { totals: MealTotals }) {
  const { price, calories, nutrients, items, lines } = totals;
  const any = items > 0;
  const value = (t: Total, text: string) => (!any ? "–" : t.known === 0 ? "Not listed" : `${t.upperBound ? "≤ " : ""}${text}`);

  return (
    <div className="mt-5" aria-label="Meal totals" role="group">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-brand-dark p-4 text-white">
          <p className="flex flex-wrap items-center gap-1.5 text-xs font-semibold tracking-wide text-hero-highlight uppercase">
            <Icon name="tag" className="size-4" />
            Estimated price
          </p>
          <p className="mt-1 font-display text-2xl font-bold tabular-nums sm:text-3xl">{value(price, formatPrice(price.value))}</p>
          <p className="text-xs text-hero-soft">{any && !isComplete(price) ? `Includes ${coverage(price, lines)}` : "Subtotal, online pickup"}</p>
        </div>
        <div className="rounded-2xl border border-kcal-text/15 bg-kcal-bg p-4">
          <p className="flex flex-wrap items-center gap-1.5 text-xs font-semibold tracking-wide text-kcal-text uppercase">
            <Icon name="flame" className="size-4" />
            Calories
          </p>
          <p className={`mt-1 font-display font-bold text-kcal-text tabular-nums ${calories.max !== calories.value ? "text-lg sm:text-xl" : "text-2xl sm:text-3xl"}`}>
            {value(calories, formatCalories(calories))}
          </p>
          <p className="text-xs text-ink">
            {any && !isComplete(calories)
              ? `Includes ${coverage(calories, lines)}`
              : calories.max !== calories.value
                ? "Range: depends on choices"
                : "Total for the meal"}
          </p>
        </div>
      </div>

      <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2" aria-label="Nutrient totals">
        {NUTRIENTS.map((n) => {
          const t = nutrients[n.key];
          return (
            <li key={n.key} className="flex flex-col items-center gap-1 rounded-2xl border border-card-border bg-header-cream p-3 text-center">
              <span className={`rounded-lg px-2 py-0.5 text-[0.7rem] font-semibold tracking-wide uppercase ${n.tone}`}>{n.label}</span>
              <span className="font-display text-lg font-bold text-hero-deep tabular-nums">{value(t, `${formatNumber(t.value)} ${n.unit}`)}</span>
              {any && (
                <span className="text-xs text-muted">{isComplete(t) ? (lines === 1 ? "Official value" : `All ${lines} items`) : coverage(t, lines)}</span>
              )}
            </li>
          );
        })}
      </ul>
      {any && <CoverageNote totals={totals} />}
      {any && NUTRIENTS.some((n) => nutrients[n.key].upperBound) && (
        <p className="mt-2 text-xs leading-5 text-muted">“≤”: includes values the guide lists as “less than”, counted at their upper limit.</p>
      )}
    </div>
  );
}
