import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { ImageRef } from "@/lib/types";
import { formatMonthYear } from "@/lib/format";
import { siteConfig } from "@/lib/site";
import Container from "@/components/layout/Container";

type HeroProps = {
  /** The page's only H1 (text unchanged; "Menu with Prices" is highlighted). */
  title: string;
  intro: string;
  image: ImageRef;
};

/** The part of the H1 shown in the light olive highlight color. */
const HIGHLIGHT = "Menu with Prices";

/** Same size for both buttons: 44px+ touch target, compact padding. */
const buttonBase =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 text-[0.95rem] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/** Renders the H1 text unchanged, wrapping the highlight phrase in a span. */
function HeroTitle({ title }: { title: string }): ReactNode {
  const at = title.indexOf(HIGHLIGHT);
  if (at === -1) return title;
  return (
    <>
      {title.slice(0, at)}
      <span className="text-hero-highlight">{HIGHLIGHT}</span>
      {title.slice(at + HIGHLIGHT.length)}
    </>
  );
}

/**
 * Homepage hero (premium design approved 2026-11-14, docs/DESIGN_SYSTEM.md):
 * dark olive gradient #28370f -> #556b12 at 135deg with two soft CSS glows
 * (gold and light olive) and a thin gold hairline; no image assets. Small
 * "Independent Menu Guide" badge, H1 with highlighted "Menu with Prices",
 * the unchanged intro, two buttons, and the food photo (20px radius, thin
 * translucent border, soft shadow). Server component, no client JavaScript.
 * The pricing and verification facts sit right below it (PricingInfoBar).
 */
export default function Hero({ title, intro, image }: HeroProps) {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden"
      style={{
        backgroundImage: [
          // Gold glow, top right (decorative only).
          "radial-gradient(42rem 22rem at 92% -10%, color-mix(in srgb, var(--color-gold) 18%, transparent), transparent 70%)",
          // Light olive glow, bottom left.
          "radial-gradient(30rem 18rem at -5% 115%, color-mix(in srgb, var(--color-hero-highlight) 12%, transparent), transparent 70%)",
          // Main gradient: darker where the text sits (left/top), lighter toward the photo.
          "linear-gradient(135deg, var(--color-hero-deep) 0%, color-mix(in srgb, var(--color-hero-deep) 78%, var(--color-brand-dark)) 45%, var(--color-brand-dark) 100%)",
        ].join(", "),
      }}
    >
      <Container className="grid items-center gap-7 py-7 sm:py-9 lg:grid-cols-[1.25fr_0.75fr] lg:gap-10 lg:py-8">
        <div>
          <p className="inline-flex flex-wrap items-center gap-x-1.5 gap-y-0.5 rounded-2xl border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-hero-soft sm:rounded-full">
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <svg aria-hidden="true" viewBox="0 0 20 20" className="size-3.5 text-hero-highlight" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.25 9a.75.75 0 0 1 1.5 0v4.25a.75.75 0 0 1-1.5 0V9Z"
                  clipRule="evenodd"
                />
              </svg>
              Independent Menu Guide
            </span>
            <span aria-hidden="true" className="hidden text-white/40 sm:inline">
              &middot;
            </span>
            <span className="whitespace-nowrap text-white/80">Not the official Olive Garden website</span>
          </p>

          <h1 className="mt-4 font-display text-[1.95rem] leading-[1.15] font-semibold tracking-[-0.01em] text-balance text-white sm:text-[2.6rem] lg:text-[3rem] lg:leading-[1.1]">
            <HeroTitle title={title} />
          </h1>

          <span aria-hidden="true" className="mt-4 block h-px w-16 bg-gradient-to-r from-gold to-transparent lg:hidden" />

          <p className="mt-4 max-w-[34rem] text-base lg:mt-3 lg:max-w-[40rem] leading-7 text-pretty text-hero-soft sm:text-[1.0625rem] sm:leading-[1.75]">
            {intro}
          </p>

          <div className="mt-6 flex flex-wrap gap-3 lg:mt-5">
            <a href="#full-menu" className={`${buttonBase} bg-hero-cta text-hero-deep shadow-sm hover:bg-hero-highlight`}>
              Explore Full Menu
              <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M10 4v12m0 0-4.5-4.5M10 16l4.5-4.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#lunch-specials-deals"
              className={`${buttonBase} border border-white/45 bg-transparent text-white hover:border-white/70 hover:bg-white/10`}
            >
              Lunch Specials
            </a>
          </div>
        </div>

        {/* Tablet: cap the photo width so it does not dominate the stacked layout. */}
        <div className="relative w-full md:max-w-[34rem] lg:max-w-none">
          {/* Thin gold frame offset behind the photo (decorative). */}
          <span
            aria-hidden="true"
            className="absolute -inset-2 -z-10 hidden rounded-[26px] border border-gold/25 sm:block"
          />
          <div className="overflow-hidden rounded-[20px] border border-white/20 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.55)]">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              preload
              sizes="(min-width: 1152px) 420px, (min-width: 1024px) 36vw, (min-width: 768px) 544px, (min-width: 640px) 90vw, 100vw"
              className="aspect-[3/2] h-auto w-full object-cover"
            />
          </div>
        </div>
      </Container>
      {/* Gold hairline along the bottom edge. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
      />
    </section>
  );
}

/** Month and year only (owner standard 2026-11-13): "November 2026" or "October – November 2026". */
export function checkedRange(checked: { first: string; last: string }): string {
  const first = formatMonthYear(checked.first);
  const last = formatMonthYear(checked.last);
  return first === last ? last : `${first} – ${last}`;
}

/** Small olive line icons for the verification bar (decorative). */
const icons = {
  pin: <path d="M10 18s5.5-5.2 5.5-9.5a5.5 5.5 0 1 0-11 0C4.5 12.8 10 18 10 18Zm0-7.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />,
  calendar: <path d="M4 5.5h12v11H4zM4 9h12M7 3.5v3M13 3.5v3" />,
  info: <path d="M10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15ZM10 9.5v4M10 6.75v.01" />,
  check: <path d="M4.5 10.5l3.5 3.5 7.5-8" />,
};

function BarIcon({ name }: { name: keyof typeof icons }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="size-4 shrink-0 text-brand-dark"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[name]}
    </svg>
  );
}

/**
 * Compact white verification bar under the hero: USA online pickup prices,
 * month and year of the real check (from the data), the price-variation
 * notice, and a link to the method. The reference restaurant is not shown.
 */
export function PricingInfoBar({ checked }: { checked: { first: string; last: string } | null }) {
  const item = "flex items-center gap-2";
  return (
    <div role="note" aria-label="About these prices" className="border-b border-line bg-white shadow-[0_1px_0_rgba(0,0,0,0.02)]">
      <Container className="py-2.5 sm:py-3">
        <ul className="grid gap-x-5 gap-y-1.5 text-sm leading-6 text-ink sm:grid-cols-2 lg:flex lg:flex-wrap lg:items-center lg:gap-x-0 lg:divide-x lg:divide-line">
          <li className={`${item} lg:pr-5`}>
            <BarIcon name="pin" />
            <span>
              <strong className="font-semibold">{siteConfig.market}</strong> &middot; online pickup prices
            </span>
          </li>
          {checked && (
            <li className={`${item} lg:px-5`}>
              <BarIcon name="calendar" />
              <span>
                <strong className="font-semibold">Last verified:</strong> {checkedRange(checked)}
              </span>
            </li>
          )}
          <li className={`${item} lg:px-5`}>
            <BarIcon name="info" />
            <span>{siteConfig.locationNotice}</span>
          </li>
          <li className={`${item} lg:pl-5`}>
            <BarIcon name="check" />
            <Link
              href="/how-we-check-prices"
              className="font-medium text-brand-dark underline underline-offset-4 hover:text-brand-darker focus-visible:outline-2 focus-visible:outline-brand-dark"
            >
              How we check prices
            </Link>
          </li>
        </ul>
      </Container>
    </div>
  );
}
