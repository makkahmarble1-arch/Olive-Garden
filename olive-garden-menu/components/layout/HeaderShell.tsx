"use client";

import { useEffect, useState, type ReactNode } from "react";

/** Sticky header wrapper: adds a soft shadow once the page is scrolled. */
export default function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 4);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <header
      data-scrolled={scrolled || undefined}
      className="sticky top-0 z-40 bg-header-cream transition-shadow duration-200 data-[scrolled]:shadow-[0_6px_18px_-10px_rgba(40,55,15,0.45)] motion-reduce:transition-none"
    >
      {children}
    </header>
  );
}
