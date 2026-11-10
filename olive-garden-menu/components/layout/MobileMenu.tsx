"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import type { NavLink } from "@/lib/site";

type MobileMenuProps = {
  links: readonly NavLink[];
};

/** Hamburger menu shown on small screens only (hidden from md and up). */
export default function MobileMenu({ links }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  // Close the menu with the Escape key.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-11 items-center justify-center rounded-md text-ink hover:bg-brand-tint focus-visible:outline-2 focus-visible:outline-brand-dark"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      <nav
        id={menuId}
        aria-label="Mobile"
        hidden={!open}
        className="absolute inset-x-0 top-16 border-b border-line bg-white shadow-sm"
      >
        <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center rounded-md px-3 font-medium text-ink hover:bg-brand-tint hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-brand-dark"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
