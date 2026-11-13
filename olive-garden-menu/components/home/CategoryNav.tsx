"use client";

import { useEffect, useRef, useState } from "react";

type CategoryNavProps = {
  categories: { id: string; label: string }[];
};

/**
 * Sticky jump links to the 17 menu sections. Plain anchor links (they work
 * without JavaScript); the script only highlights the section in view and
 * keeps the active link visible in the scrollable bar.
 */
export default function CategoryNav({ categories }: CategoryNavProps) {
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);
    // A section counts as active while it crosses a line just below the sticky bars.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -65% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [categories]);

  // Scroll the bar (not the page) so the active link stays in view.
  useEffect(() => {
    const list = listRef.current;
    if (!list || !active) return;
    const link = list.querySelector<HTMLElement>(`[data-target="${active}"]`);
    if (!link) return;
    const left = link.offsetLeft - list.clientWidth / 2 + link.clientWidth / 2;
    list.scrollTo({ left, behavior: "auto" });
  }, [active]);

  return (
    <nav
      aria-label="Menu categories"
      className="sticky top-16 z-30 -mx-4 border-y border-line bg-white/95 backdrop-blur sm:-mx-6"
    >
      <ul ref={listRef} className="flex gap-2 overflow-x-auto px-4 py-2 [scrollbar-width:thin] sm:px-6">
        {categories.map((category) => {
          const isActive = category.id === active;
          return (
            <li key={category.id} className="shrink-0">
              <a
                href={`#${category.id}`}
                data-target={category.id}
                aria-current={isActive ? "location" : undefined}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark ${
                  isActive
                    ? "border-brand-dark bg-brand-dark text-white"
                    : "border-line bg-white text-ink hover:border-brand-dark hover:text-brand-dark"
                }`}
              >
                {category.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
