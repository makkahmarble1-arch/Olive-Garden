/** Lets keyboard users jump past the header. Visible only when focused. */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-brand-dark focus:px-4 focus:py-3 focus:font-semibold focus:text-white"
    >
      Skip to main content
    </a>
  );
}
