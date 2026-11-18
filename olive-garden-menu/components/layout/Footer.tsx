import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { siteConfig } from "@/lib/site";
import { getFooterColumns } from "@/lib/navigation";
import { publicContactEmail } from "@/content/site/publisher";
import Container from "./Container";
import BackToTopButton from "./BackToTopButton";

// With Cache Components, the current date must be read inside "use cache".
// The year is cached and refreshed daily.
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

/** Small decorative olive branch (aria-hidden), drawn in the current text color. */
function OliveBranch({ className = "" }: { className?: string }) {
  const leaves: [number, number, number][] = [
    [26, 44, -28],
    [44, 37, -36],
    [62, 29, -30],
    [80, 21, -40],
    [98, 13, -32],
  ];
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 120 60" className={className} fill="none">
      <path d="M4 52C34 46 66 32 116 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {leaves.map(([x, y, r]) => (
        <g key={x}>
          <ellipse cx={x} cy={y - 7} rx="9" ry="3.6" transform={`rotate(${r} ${x} ${y - 7})`} fill="currentColor" />
          <ellipse cx={x + 6} cy={y + 5} rx="9" ry="3.6" transform={`rotate(${r + 50} ${x + 6} ${y + 5})`} fill="currentColor" />
        </g>
      ))}
      <ellipse cx="70" cy="40" rx="4.5" ry="5.8" fill="currentColor" />
    </svg>
  );
}

const linkClass =
  "inline-flex min-h-11 items-center gap-2 rounded-md text-[0.95rem] text-white underline-offset-4 transition-colors hover:text-hero-cta hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-highlight motion-reduce:transition-none";

/**
 * Global footer (docs/DESIGN_SYSTEM.md 4.5, 2026-11-15): brand column, three
 * link columns from lib/navigation.ts, the independence disclaimer, and a
 * copyright bar with "Back to top". Server component; only the Back-to-top
 * button runs in the browser.
 */
export default function Footer() {
  const columns = getFooterColumns();
  const email = publicContactEmail();

  return (
    <footer className="mt-auto bg-hero-deep text-footer-text">
      <div className="relative overflow-hidden">
        <OliveBranch className="pointer-events-none absolute -top-2 -right-6 w-56 text-brand-dark/50 sm:w-72" />
        <Container className="relative grid gap-x-8 gap-y-10 py-12 min-[360px]:grid-cols-2 md:py-14 lg:grid-cols-[1.35fr_1fr_1fr_1fr] lg:gap-x-0">
          {/* Column 1: brand */}
          <div className="min-[360px]:col-span-2 lg:col-span-1 lg:pr-10">
            <Link
              href="/"
              aria-label={`${siteConfig.name} home`}
              className="inline-flex items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hero-highlight"
            >
              {/* Same lockup as the header: icon on a cream tile (the icon is dark) + wordmark. */}
              <span className="flex h-14 items-center rounded-xl bg-header-cream px-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
                <Image src="/images/brand/logo-icon.webp" alt="" width={138} height={96} sizes="62px" className="h-11 w-auto" />
              </span>
              <span className="font-display text-xl leading-[1.05] font-bold text-white">
                Olive Garden{" "}
                <span className="block text-hero-highlight">Menu Prices</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-[0.95rem] leading-7">
              An independent menu guide featuring Olive Garden menu prices, calories, specials, and helpful dining
              information.
            </p>
            {email ? (
              <a href={`mailto:${email}`} className={`${linkClass} mt-3 max-w-full break-all`}>
                <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="size-5 shrink-0 text-hero-highlight" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3.5 6.5L12 13l8.5-6.5" />
                </svg>
                {email}
              </a>
            ) : (
              <Link href="/contact-us" className={`${linkClass} mt-3`}>
                Contact us
              </Link>
            )}
          </div>

          {/* Columns 2-4: links */}
          {columns.map((column, i) => (
            <nav
              key={column.heading}
              aria-labelledby={`footer-col-${i}`}
              className={`lg:border-l lg:border-brand-dark lg:px-8 ${i === 2 ? "min-[360px]:col-span-2 lg:col-span-1" : ""}`}
            >
              <h2 id={`footer-col-${i}`} className="font-display text-lg font-bold text-hero-highlight">
                {column.heading}
              </h2>
              <span aria-hidden="true" className="mt-2 block h-0.5 w-10 rounded-full bg-brand" />
              <ul className={`mt-3 ${i === 2 ? "grid min-[360px]:grid-cols-2 min-[360px]:gap-x-8 lg:grid-cols-1" : ""}`}>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </Container>

        <Container className="relative pb-10">
          <p className="flex items-start gap-3 rounded-xl border border-brand-dark bg-white/[0.04] px-5 py-4 text-sm leading-6">
            <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="mt-0.5 size-5 shrink-0 text-hero-highlight" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 11v5M12 7.5v.5" />
            </svg>
            <span>
              {siteConfig.name} is an independent informational website and is not affiliated with or endorsed by Olive
              Garden or Darden Restaurants.
            </span>
          </p>
        </Container>
      </div>

      <div className="border-t border-brand-dark/60 bg-footer-deep">
        <Container className="flex flex-col items-center justify-between gap-3 py-4 text-center text-sm sm:flex-row sm:text-left">
          <p>
            &copy; <CurrentYear /> {siteConfig.name}. All Rights Reserved.
          </p>
          <BackToTopButton />
        </Container>
      </div>
    </footer>
  );
}
