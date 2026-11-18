"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Icon from "./icons";

/** One version, already formatted on the server (only verified official values). */
export type VersionView = {
  key: string;
  label: string;
  shortLabel: string;
  description: string;
  price: string;
  calories: string;
  /** Share of a 2,000-calorie day, our calculation. */
  share: number;
  /** Four key nutrients from the version's official row, or null when the guide has no row. */
  macros: { label: string; value: string }[] | null;
  /** All other official nutrients of the row (label + printed value). */
  details: { label: string; value: string; indent?: boolean }[];
  contains: string[];
  prep: string[];
  /** False when the allergen guide has no row for this version. */
  allergensListed: boolean;
  /** "U.S. Nutrition Information (US_101926), page 8 · Allergen Guide, page 6" */
  source: string;
};

const MACRO_TONES = [
  "bg-kcal-bg text-kcal-text",
  "bg-brand-tint text-brand-darker",
  "bg-hero-highlight text-hero-deep",
  "bg-brand-dark text-white",
];

/**
 * Version selector of a menu item page (Phase 4, owner approval 2026-11-18).
 * An accessible tab list (arrow keys, Home/End) that switches the panel with
 * the version's own price, calories, key nutrients and allergen marks. All
 * values are verified and pre-formatted on the server; this component only
 * switches between them. The server-rendered "at a glance" table below it
 * shows every version, so nothing depends on JavaScript.
 */
export default function VersionSelector({ versions, unit }: { versions: VersionView[]; unit: string }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId();
  const v = versions[active];

  function onKey(event: KeyboardEvent<HTMLButtonElement>, i: number) {
    const last = versions.length - 1;
    const next =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? (i === last ? 0 : i + 1)
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? (i === 0 ? last : i - 1)
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="mt-6 overflow-hidden rounded-3xl border border-card-border bg-header-cream shadow-[0_18px_40px_-30px_rgba(40,55,15,0.6)]">
      <div className="bg-gradient-to-r from-hero-deep to-brand-dark px-4 py-4 sm:px-6">
        <p className="text-xs font-semibold tracking-wide text-hero-highlight uppercase">Choose a version</p>
        <div role="tablist" aria-label="Versions" className="mt-3 flex flex-wrap gap-2">
          {versions.map((x, i) => {
            const selected = i === active;
            return (
              <button
                key={x.key}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${base}-tab-${x.key}`}
                aria-selected={selected}
                aria-controls={`${base}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={`flex min-h-11 grow flex-col items-start sm:grow-0 rounded-2xl px-4 py-2 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-highlight ${
                  selected
                    ? "bg-hero-cta text-hero-deep shadow-md"
                    : "bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/20"
                }`}
              >
                <span className="text-sm font-bold">{x.shortLabel}</span>
                <span className={`text-xs tabular-nums ${selected ? "text-hero-deep/80" : "text-hero-soft"}`}>
                  {x.price} · {x.calories} Cal
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-tab-${v.key}`} className="p-4 sm:p-6" aria-live="polite">
        <h3 className="font-display text-xl font-bold text-hero-deep sm:text-2xl">{v.label}</h3>
        <p className="mt-1 max-w-prose text-sm leading-6 text-ink">{v.description}</p>

        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <div className="grid grid-cols-2 content-start gap-3 lg:grid-cols-1">
            <div className="rounded-2xl bg-brand-dark p-4 text-white">
              <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-hero-highlight uppercase">
                <Icon name="tag" className="size-4" />
                Price
              </p>
              <p className="mt-1 font-display text-3xl font-bold tabular-nums">{v.price}</p>
              <p className="text-xs text-hero-soft">Online pickup</p>
            </div>
            <div className="rounded-2xl border border-kcal-text/15 bg-kcal-bg p-4">
              <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-kcal-text uppercase">
                <Icon name="flame" className="size-4" />
                Calories per {unit}
              </p>
              <p className="mt-1 font-display text-3xl font-bold text-kcal-text tabular-nums">{v.calories}</p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white ring-1 ring-kcal-text/15" aria-hidden="true">
                <div className="h-full rounded-full bg-kcal-bar" style={{ width: `${Math.min(v.share, 100)}%` }} />
              </div>
              <p className="mt-1 text-xs text-ink">
                About {v.share}% of a 2,000-calorie day <span className="text-muted">(Calc.)</span>
              </p>
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-4">
            {v.macros ? (
              <>
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Key nutrients">
                  {v.macros.map((m, i) => (
                    <li key={m.label} className="flex flex-col items-center gap-1 rounded-2xl border border-card-border bg-white p-3 text-center">
                      <span className={`rounded-lg px-2 py-0.5 text-[0.7rem] font-semibold tracking-wide uppercase ${MACRO_TONES[i % MACRO_TONES.length]}`}>
                        {m.label}
                      </span>
                      <span className="font-display text-xl font-bold text-hero-deep tabular-nums">{m.value}</span>
                    </li>
                  ))}
                </ul>
                <dl className="grid grid-cols-1 gap-x-6 rounded-2xl border border-card-border bg-white px-4 py-2 text-sm min-[420px]:grid-cols-2">
                  {v.details.map((d) => (
                    <div key={d.label} className="flex items-center justify-between gap-3 border-b border-line/70 py-1.5 last:border-b-0">
                      <dt className={`text-ink ${d.indent ? "pl-3" : ""}`}>{d.label}</dt>
                      <dd className="font-semibold tabular-nums text-hero-deep">{d.value}</dd>
                    </div>
                  ))}
                </dl>
              </>
            ) : (
              <p role="note" className="flex gap-2 rounded-2xl border border-line bg-brand-tint p-4 text-sm leading-6 text-ink">
                <Icon name="info" className="mt-0.5 size-5 shrink-0 text-brand-dark" />
                Detailed nutrition is not available for this version: Olive Garden’s online menu lists its price and calories,
                but the official nutrition guide has no separate row for it, so we do not show fat, sodium, carbs or protein.
              </p>
            )}

            <div className="rounded-2xl border border-allergen-border bg-allergen-bg p-4">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-allergen-text">
                <Icon name="alert" className="size-4" />
                {!v.allergensListed
                  ? "Olive Garden’s U.S. allergen guide does not list this version separately. Ask your server before ordering."
                  : v.contains.length > 0
                    ? "Contains, per Olive Garden’s U.S. allergen guide:"
                    : "No listed allergens marked in the guide"}
              </p>
              {(v.contains.length > 0 || v.prep.length > 0) && (
                <ul className="mt-2 flex flex-wrap gap-2">
                  {v.contains.map((a) => (
                    <li key={a} className="rounded-full border border-allergen-border bg-white px-3 py-1 text-sm font-semibold text-allergen-text">
                      {a}
                    </li>
                  ))}
                  {v.prep.map((p) => (
                    <li key={p} className="inline-flex items-center gap-1 rounded-full bg-kcal-bg px-3 py-1 text-sm font-semibold text-kcal-text">
                      <Icon name="flame" className="size-4" />
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <p className="flex items-start gap-1.5 text-xs leading-5 text-muted">
              <Icon name="check" className="mt-0.5 size-3.5 shrink-0 text-brand-dark" />
              {v.source}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
