"use client";

import { useEffect, useId, useRef, useState } from "react";

type MenuSearchProps = {
  /** id of the element that contains the full menu (the cards stay server-rendered). */
  containerId: string;
  /** Total number of searchable items, for the status text. */
  total: number;
};

/** Same normalization as searchText() in lib/menu-display.ts. */
function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Wait after the last keystroke before filtering while the visitor types. */
const TYPING_DELAY_MS = 150;

/**
 * Instant search over the server-rendered menu. It does not load any data:
 * it shows or hides the existing items ([data-menu-item]) by their
 * data-search text, and hides groups/sections with no match.
 *
 * Performance (docs/PERFORMANCE_AUDIT.md): the text field updates at once;
 * the filtering (which re-lays out the whole long page) runs in a separate
 * task shortly after, so typing stays responsive on slow phones.
 */
export default function MenuSearch({ containerId, total }: MenuSearchProps) {
  const [query, setQuery] = useState("");
  // Result of the last filter run: the count always matches its own query.
  const [result, setResult] = useState({ query: "", matches: total });
  const timer = useRef<number | undefined>(undefined);
  const inputId = useId();
  const statusId = useId();
  const words = normalize(result.query).split(" ").filter(Boolean);
  const searching = words.length > 0;
  const matches = result.matches;

  useEffect(() => () => window.clearTimeout(timer.current), []);

  /** Shows/hides the server-rendered items and returns the number of matches. */
  function applyFilter(value: string): number {
    const container = document.getElementById(containerId);
    if (!container) return total;
    const terms = normalize(value).split(" ").filter(Boolean);

    let count = 0;
    container.querySelectorAll<HTMLElement>("[data-menu-item]").forEach((item) => {
      const text = item.dataset.search ?? "";
      const hit = terms.every((term) => text.includes(term));
      item.hidden = !hit;
      if (hit) count += 1;
    });
    // Hide option groups and whole category sections without a visible match.
    container.querySelectorAll<HTMLElement>("[data-menu-group], [data-menu-category]").forEach((group) => {
      group.hidden = terms.length > 0 && group.querySelector("[data-menu-item]:not([hidden])") === null;
    });
    return count;
  }

  /** `immediate` (Clear / Escape): filter in the next task instead of after a pause. */
  function update(value: string, immediate = false) {
    setQuery(value);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(
      () => setResult({ query: value, matches: applyFilter(value) }),
      immediate ? 0 : TYPING_DELAY_MS,
    );
  }

  return (
    <div role="search" className="rounded-xl border border-line bg-brand-tint p-4 sm:p-5">
      <label htmlFor={inputId} className="font-display text-lg font-bold text-ink">
        Search the menu
      </label>
      <p className="mt-1 text-sm text-muted">Type part of a dish or drink name, for example “alfredo” or “tea”.</p>
      <div className="mt-3 flex gap-2">
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(event) => update(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape") update("", true);
          }}
          placeholder="Search all menu items"
          autoComplete="off"
          aria-describedby={statusId}
          className="min-h-12 w-full min-w-0 rounded-lg border border-line bg-white px-4 text-base text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-brand-dark"
        />
        {(searching || query) && (
          <button
            type="button"
            onClick={() => update("", true)}
            className="inline-flex min-h-12 shrink-0 items-center rounded-lg border border-brand-dark bg-white px-4 font-semibold text-brand-dark hover:bg-brand-tint focus-visible:outline-2 focus-visible:outline-brand-dark"
          >
            Clear
          </button>
        )}
      </div>
      <p id={statusId} aria-live="polite" className="mt-2 text-sm text-muted">
        {searching ? `${matches} of ${total} items match “${result.query.trim()}”.` : `Showing all ${total} items.`}
      </p>
      {searching && matches === 0 && (
        <div className="mt-3 rounded-lg border border-line bg-white p-4 text-sm leading-6 text-ink">
          <p className="font-semibold">Nothing on the menu matches that search.</p>
          <p className="mt-1 text-muted">
            Check the spelling, try a shorter word (like “ravioli” instead of “toasted beef ravioli”), or{" "}
            <button
              type="button"
              onClick={() => update("", true)}
              className="font-semibold text-brand-dark underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-brand-dark"
            >
              show the full menu
            </button>
            .
          </p>
        </div>
      )}
    </div>
  );
}
