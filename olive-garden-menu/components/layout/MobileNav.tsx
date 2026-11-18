"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import type { NavItem } from "@/lib/navigation";
import SiteSearch from "./SiteSearch";
import { isCurrent } from "./DesktopNav";

/**
 * Mobile and tablet controls (below lg): a search button that opens a
 * full-width search row, and a hamburger menu with expandable sections.
 * Both panels sit inside the sticky header, below the first row.
 */
export default function MobileNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  // Panels belong to the page they were opened on, so they close by
  // themselves after navigation (no effect needed).
  const [panelState, setPanelState] = useState<{ name: "menu" | "search"; path: string } | null>(null);
  const panel = panelState && panelState.path === pathname ? panelState.name : null;
  const setPanel = (name: "menu" | "search" | null) => setPanelState(name ? { name, path: pathname } : null);
  const [section, setSection] = useState<number | null>(null);
  const menuId = useId();
  const searchId = useId();

  useEffect(() => {
    if (!panel) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setPanel(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panel]);

  const toggle = (name: "menu" | "search") => setPanel(panel === name ? null : name);
  const iconButton =
    "inline-flex size-11 items-center justify-center rounded-xl text-hero-deep transition-colors hover:bg-brand-tint focus-visible:outline-2 focus-visible:outline-brand-dark motion-reduce:transition-none";

  return (
    <>
      <div className="flex items-center gap-1 lg:hidden">
        <button type="button" aria-expanded={panel === "search"} aria-controls={searchId} onClick={() => toggle("search")} className={iconButton}>
          <span className="sr-only">{panel === "search" ? "Close search" : "Search menus, prices, and more"}</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            {panel === "search" ? <path d="M6 6l12 12M18 6L6 18" /> : <><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></>}
          </svg>
        </button>
        <button
          type="button"
          aria-expanded={panel === "menu"}
          aria-controls={menuId}
          onClick={() => toggle("menu")}
          className={`${iconButton} ${panel === "menu" ? "bg-brand-dark text-white hover:bg-hero-deep" : ""}`}
        >
          <span className="sr-only">{panel === "menu" ? "Close menu" : "Open menu"}</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            {panel === "menu" ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      <div id={searchId} hidden={panel !== "search"} className="absolute inset-x-0 top-full border-b border-card-border bg-header-cream px-4 pt-1 pb-3 shadow-md sm:px-6 lg:hidden">
        {panel === "search" && <SiteSearch autoFocus onNavigate={() => setPanel(null)} />}
      </div>

      <nav
        id={menuId}
        aria-label="Mobile"
        hidden={panel !== "menu"}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-hero-deep/30 bg-brand-dark shadow-lg lg:hidden"
      >
        <ul className="mx-auto flex max-w-6xl flex-col gap-0.5 px-4 py-3 sm:px-6">
          {items.map((item, index) => {
            if (item.href) {
              const active = isCurrent(item.href, pathname);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-12 items-center rounded-lg px-3 text-base font-semibold focus-visible:outline-2 focus-visible:outline-white ${
                      active ? "bg-hero-highlight text-hero-deep" : "text-white hover:bg-white/12"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            }
            const expanded = section === index;
            const subId = `${menuId}-sub-${index}`;
            return (
              <li key={item.label}>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={subId}
                  onClick={() => setSection(expanded ? null : index)}
                  className="flex min-h-12 w-full items-center justify-between rounded-lg px-3 text-left text-base font-semibold text-white hover:bg-white/12 focus-visible:outline-2 focus-visible:outline-white"
                >
                  {item.label}
                  <svg aria-hidden="true" viewBox="0 0 20 20" className={`size-5 transition-transform motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5.5 7.5L10 12l4.5-4.5" />
                  </svg>
                </button>
                <ul id={subId} hidden={!expanded} className="mb-2 ml-3 grid gap-0.5 border-l border-white/20 pl-2 sm:grid-cols-2">
                  {[...(item.children ?? []), ...(item.footer ? [item.footer] : [])].map((child) => {
                    const active = isCurrent(child.href, pathname);
                    return (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          aria-current={active ? "page" : undefined}
                          onClick={() => setPanel(null)}
                          className={`flex min-h-11 items-center rounded-lg px-3 text-[0.95rem] focus-visible:outline-2 focus-visible:outline-white ${
                            active ? "bg-hero-highlight font-semibold text-hero-deep" : "text-white/90 hover:bg-white/12 hover:text-white"
                          }`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
