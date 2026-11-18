"use client";

/**
 * Footer "Back to top": scrolls to the top (instantly when the visitor prefers
 * reduced motion) and moves keyboard focus to the header's home link.
 */
export default function BackToTopButton() {
  function onClick() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.querySelector<HTMLElement>("header a[href='/']")?.focus({ preventScroll: true });
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-brand-dark px-4 text-sm font-semibold text-white transition-colors hover:border-hero-cta hover:text-hero-cta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-highlight motion-reduce:transition-none"
    >
      Back to top
      <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 15V5M5.5 9.5L10 5l4.5 4.5" />
      </svg>
    </button>
  );
}
