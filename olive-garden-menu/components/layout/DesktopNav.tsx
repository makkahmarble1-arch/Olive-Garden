"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import type { NavItem } from "@/lib/navigation";

/** True when the link is the current page (hash links never count). */
export function isCurrent(href: string, pathname: string): boolean {
  if (href.includes("#")) return false;
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

const itemClass =
  "inline-flex h-11 items-center gap-1 rounded-lg px-3 text-[0.95rem] font-semibold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none";
const idle = "text-white hover:bg-white/12";
const current = "bg-hero-highlight text-hero-deep";

/**
 * Second header row (lg and up): dark olive bar with links and dropdowns.
 * Dropdowns open on click, Enter/Space, or hover; Escape and clicks outside
 * close them; arrow keys move between the links inside an open dropdown.
 */
export default function DesktopNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  // The open dropdown belongs to the page it was opened on, so it closes by
  // itself after navigation (no effect needed).
  const [openState, setOpenState] = useState<{ index: number; path: string } | null>(null);
  const open = openState && openState.path === pathname ? openState.index : null;
  const setOpen = (index: number | null) => setOpenState(index === null ? null : { index, path: pathname });
  const navRef = useRef<HTMLElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const hoverTimer = useRef<number | undefined>(undefined);
  const baseId = useId();

  // Close on outside click, Escape, and navigation.
  useEffect(() => {
    if (open === null) return;
    function onPointerDown(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) setOpen(null);
    }
    function onKey(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        buttons.current[open!]?.focus();
        setOpen(null);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
    // setOpen only depends on pathname, which `open` already reflects.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function hover(index: number | null) {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpen(index), index === null ? 150 : 60);
  }

  function onPanelKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    const links = [...event.currentTarget.querySelectorAll<HTMLAnchorElement>("a")];
    const at = links.indexOf(document.activeElement as HTMLAnchorElement);
    const next = event.key === "ArrowDown" ? (at + 1) % links.length : (at <= 0 ? links.length : at) - 1;
    event.preventDefault();
    links[next]?.focus();
  }

  return (
    <nav ref={navRef} aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {items.map((item, index) => {
          if (item.href) {
            const isActive = isCurrent(item.href, pathname);
            return (
              <li key={item.label}>
                <Link href={item.href} aria-current={isActive ? "page" : undefined} className={`${itemClass} ${isActive ? current : idle}`}>
                  {item.label}
                </Link>
              </li>
            );
          }
          const children = item.children ?? [];
          const isOpen = open === index;
          const isActive = children.some((c) => isCurrent(c.href, pathname));
          const panelId = `${baseId}-panel-${index}`;
          return (
            <li key={item.label} className={item.wide ? "" : "relative"} onMouseEnter={() => hover(index)} onMouseLeave={() => hover(null)}>
              <button
                ref={(el) => {
                  buttons.current[index] = el;
                }}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setOpen(index);
                    requestAnimationFrame(() => document.getElementById(panelId)?.querySelector("a")?.focus());
                  }
                }}
                className={`${itemClass} ${isActive ? current : idle} ${isOpen && !isActive ? "bg-white/12" : ""}`}
              >
                {item.label}
                <svg aria-hidden="true" viewBox="0 0 20 20" className={`size-4 transition-transform motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`} fill="currentColor">
                  <path d="M5.5 7.5L10 12l4.5-4.5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div
                id={panelId}
                hidden={!isOpen}
                onKeyDown={onPanelKey}
                className={`absolute z-50 mt-2 rounded-2xl border border-card-border bg-white p-3 shadow-[0_18px_40px_-16px_rgba(40,55,15,0.45)] ${
                  item.wide
                    ? "inset-x-4 sm:inset-x-6 xl:inset-x-auto xl:left-1/2 xl:w-[64rem] xl:-translate-x-1/2"
                    : // The last dropdown ("More") opens to the left so it stays on screen at 1024 px (2026-11-23).
                      index === items.length - 1
                      ? "right-0 w-72"
                      : "left-0 w-72"
                }`}
              >
                {item.wide && (
                  <p className="px-3 pt-1 pb-2 font-display text-lg font-bold text-hero-deep">Olive Garden Menu Categories</p>
                )}
                <ul className={item.wide ? "grid grid-cols-3 gap-x-2 xl:grid-cols-4" : "flex flex-col"}>
                  {children.map((child) => {
                    const childActive = isCurrent(child.href, pathname);
                    return (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          aria-current={childActive ? "page" : undefined}
                          onClick={() => setOpen(null)}
                          className={`flex min-h-11 items-center rounded-lg px-3 py-1.5 text-[0.95rem] leading-snug focus-visible:outline-2 focus-visible:outline-brand-dark ${
                            childActive ? "bg-hero-highlight font-semibold text-hero-deep" : "text-ink hover:bg-brand-tint hover:text-brand-dark"
                          }`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                {item.footer && (
                  <Link
                    href={item.footer.href}
                    onClick={() => setOpen(null)}
                    className="mt-2 flex min-h-11 items-center justify-between rounded-lg border-t border-card-border px-3 pt-2 font-semibold text-brand-dark hover:text-hero-deep focus-visible:outline-2 focus-visible:outline-brand-dark"
                  >
                    {item.footer.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
