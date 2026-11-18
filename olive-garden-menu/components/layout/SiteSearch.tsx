"use client";

import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { buildIndex, searchIndex, type SearchEntry } from "@/lib/site-search";

type Index = ReturnType<typeof buildIndex>;
let cachedIndex: Promise<Index> | null = null;

/** Loads the small search index once per page view (on first use). */
function loadIndex(): Promise<Index> {
  cachedIndex ??= fetch("/api/search-index")
    .then((res) => (res.ok ? (res.json() as Promise<SearchEntry[]>) : Promise.reject(new Error(String(res.status)))))
    .then(buildIndex)
    .catch((error) => {
      cachedIndex = null;
      throw error;
    });
  return cachedIndex;
}

type SiteSearchProps = {
  /** Focus the input when the component appears (mobile search panel). */
  autoFocus?: boolean;
  /** Called after navigating to a result (closes the mobile panel). */
  onNavigate?: () => void;
};

/**
 * Header search (combobox pattern): instant suggestions, keyboard navigation
 * (Arrow keys, Enter, Escape), clear button, click-outside dismissal, and a
 * "no results" message. Results come from lib/site-search.ts.
 */
export default function SiteSearch({ autoFocus = false, onNavigate }: SiteSearchProps) {
  const router = useRouter();
  const id = useId();
  const listId = `${id}-results`;
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<Index | null>(null);
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => (index && query.trim() ? searchIndex(index, query) : []), [index, query]);
  const showPanel = open && query.trim().length > 0;

  function ensureIndex() {
    if (index || failed) return;
    loadIndex().then(setIndex, () => setFailed(true));
  }

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
      ensureIndex();
    }
    // Load only once on mount when asked to focus.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFocus]);

  // Close on a click or tap outside the search.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function go(entry: SearchEntry) {
    setOpen(false);
    setQuery("");
    setActive(-1);
    onNavigate?.();
    router.push(entry.url);
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const pick = results[active] ?? results[0];
    if (pick) go(pick);
    else {
      setOpen(true);
      ensureIndex();
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" && results.length > 0) {
      event.preventDefault();
      setOpen(true);
      setActive((i) => (i + 1) % results.length);
    } else if (event.key === "ArrowUp" && results.length > 0) {
      event.preventDefault();
      setActive((i) => (i <= 0 ? results.length - 1 : i - 1));
    } else if (event.key === "Escape") {
      if (open) setOpen(false);
      else setQuery("");
      setActive(-1);
    }
  }

  return (
    <div ref={rootRef} className="relative w-full">
      <form role="search" onSubmit={onSubmit} className="relative flex items-center">
        <label htmlFor={`${id}-input`} className="sr-only">
          Search menus, prices, and more
        </label>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="pointer-events-none absolute left-3.5 size-5 text-brand-dark" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <input
          ref={inputRef}
          id={`${id}-input`}
          type="search"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={showPanel && active >= 0 ? `${id}-opt-${active}` : undefined}
          autoComplete="off"
          enterKeyHint="search"
          placeholder="Search menus, prices, and more..."
          value={query}
          maxLength={80}
          onFocus={() => {
            ensureIndex();
            setOpen(true);
          }}
          onChange={(event) => {
            ensureIndex();
            setQuery(event.target.value);
            setActive(-1);
            setOpen(true);
          }}
          onKeyDown={onKeyDown}
          className="h-11 w-full rounded-full border border-card-border bg-white pr-24 pl-11 text-[0.95rem] text-ink shadow-[inset_0_1px_2px_rgba(40,55,15,0.06)] placeholder:text-muted focus-visible:border-brand-dark focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-dark [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActive(-1);
              inputRef.current?.focus();
            }}
            className="absolute right-12 inline-flex size-9 items-center justify-center rounded-full text-muted hover:bg-brand-tint hover:text-ink focus-visible:outline-2 focus-visible:outline-brand-dark"
          >
            <span className="sr-only">Clear search</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        )}
        <button
          type="submit"
          className="absolute right-1 inline-flex size-9 items-center justify-center rounded-full bg-brand-dark text-white transition-colors hover:bg-hero-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark motion-reduce:transition-none"
        >
          <span className="sr-only">Search</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </form>

      <div
        className={`absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-card-border bg-white shadow-[0_12px_32px_-12px_rgba(40,55,15,0.35)] ${showPanel ? "" : "hidden"}`}
      >
        <ul id={listId} role="listbox" aria-label="Search suggestions" className="max-h-[min(24rem,60vh)] overflow-y-auto py-1">
          {results.map((entry, i) => (
            <li
              key={entry.url}
              id={`${id}-opt-${i}`}
              role="option"
              aria-selected={i === active}
              onPointerDown={(event) => event.preventDefault()}
              onClick={() => go(entry)}
              onMouseEnter={() => setActive(i)}
              className={`flex cursor-pointer flex-col gap-0.5 px-4 py-2.5 ${i === active ? "bg-brand-tint" : ""}`}
            >
              <span className="flex items-baseline justify-between gap-3">
                <span className="font-semibold text-hero-deep">{entry.title}</span>
                <span className="shrink-0 text-[0.7rem] font-medium tracking-wide text-muted uppercase">{entry.kind}</span>
              </span>
              <span className="line-clamp-1 text-sm text-card-text">{entry.description}</span>
            </li>
          ))}
        </ul>
        <p role="status" aria-live="polite" className={results.length ? "sr-only" : "px-4 py-3 text-sm text-card-text"}>
          {failed
            ? "Search is not available right now. Please try again."
            : !index
              ? "Loading…"
              : results.length
                ? `${results.length} result${results.length === 1 ? "" : "s"}`
                : `No results for “${query.trim()}”. Try a dish or category, like “alfredo” or “kids”.`}
        </p>
      </div>
    </div>
  );
}
