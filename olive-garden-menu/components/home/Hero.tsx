import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { menuPath } from "@/lib/content";
import Container from "@/components/layout/Container";

type HeroProps = {
  /** Number of menu categories covered (from the menu data). */
  categoryCount: number;
};

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="mt-1 size-5 shrink-0 text-brand-dark"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="10" cy="10" r="8.5" />
      <path d="M6.5 10.2l2.3 2.3 4.7-4.9" />
    </svg>
  );
}

export default function Hero({ categoryCount }: HeroProps) {
  const highlights = [
    `${categoryCount} menu categories, from appetizers to catering`,
    "Prices and calories shown only after they are checked against a real source",
    "Every price table notes where and when prices were checked",
  ];

  return (
    <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-brand-tint to-white">
      {/* Decorative shapes (CSS only, no images). */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full border-[24px] border-brand/20"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-16 size-48 rounded-full bg-brand/10"
      />

      <Container className="relative grid items-center gap-10 py-12 md:grid-cols-[1.15fr_1fr] md:py-20">
        <div>
          <p className="inline-flex rounded-full border border-brand bg-white px-3 py-1 text-sm font-medium text-brand-dark">
            Independent guide &middot; Not the official website
          </p>

          <h1 className="mt-5 font-display text-3xl leading-tight font-bold text-ink sm:text-4xl lg:text-5xl">
            {siteConfig.name}
          </h1>

          <p className="mt-4 max-w-prose text-lg leading-8 text-muted">
            Plan your meal before you go. Browse the Olive Garden menu by
            category and find prices and calorie information as we verify it,
            with every source and check date clearly noted.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={menuPath}
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-brand-dark px-6 font-semibold text-white transition-colors hover:bg-brand-darker focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
            >
              View the Full Menu
            </Link>
            <a
              href="#about-this-guide"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-brand-dark bg-white px-6 font-semibold text-brand-dark transition-colors hover:bg-brand-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
            >
              How We Check Prices
            </a>
          </div>
        </div>

        <div className="rounded-xl border border-line bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold tracking-wide text-brand-dark uppercase">
            Inside this guide
          </p>
          <ul className="mt-4 space-y-4">
            {highlights.map((text) => (
              <li key={text} className="flex gap-3 leading-7 text-ink">
                <CheckIcon />
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <div aria-hidden="true" className="mt-6 h-1.5 w-16 rounded-full bg-brand" />
        </div>
      </Container>
    </section>
  );
}
