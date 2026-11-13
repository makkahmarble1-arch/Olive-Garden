"use client";

import { useEffect, useState } from "react";

/** Floating "Back to top" link, shown after scrolling down the long menu. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 1200);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed right-4 bottom-4 z-40 inline-flex min-h-12 items-center gap-1 rounded-full bg-brand-dark px-4 font-semibold text-white shadow-lg transition-opacity hover:bg-brand-darker focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <span aria-hidden="true">&uarr;</span> Back to top
    </a>
  );
}
