import Image from "next/image";
import { formatMonthYear } from "@/lib/format";
import type { HolidaySpec } from "@/lib/types";

/**
 * Photo hero of the holiday-hours articles (/thanksgiving-hours, /christmas-hours;
 * owner request 2026-11-25). A reused owner photo (docs/IMAGE_MANIFEST.md, no new
 * or generated images) sits behind a seasonal gradient so the white text keeps
 * strong contrast; light seasonal ornaments are decorative SVG. Same facts as the
 * category hero: H1, intro, last verified (month and year), how hours are set,
 * and a jump link. Server component, no JavaScript.
 */

const THEMES = {
  thanksgiving: {
    image: {
      src: "/images/family-style-meals/family-style-lasagna-bundle-large.webp",
      width: 600,
      height: 450,
      position: "object-[70%_50%]",
    },
    // Deep autumn brown on the text side, fading to show the photo on the right.
    overlay:
      "bg-[linear-gradient(90deg,rgba(43,23,9,0.96)_0%,rgba(74,42,20,0.9)_42%,rgba(94,54,24,0.55)_72%,rgba(94,54,24,0.25)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(43,23,9,0.92)_0%,rgba(74,42,20,0.88)_100%)]",
    stripe: "bg-[linear-gradient(90deg,var(--color-fall-orange),var(--color-gold),#b5651d,var(--color-fall-orange))]",
    glow: "bg-[radial-gradient(28rem_18rem_at_0%_0%,rgba(217,102,31,0.35),transparent_70%)]",
    accent: "text-[#f6c48f]",
    chip: "bg-[#f6c48f] text-[#3a1f0c]",
  },
  christmas: {
    image: {
      src: "/images/home/olive-garden-menu-spread.webp",
      width: 1200,
      height: 800,
      position: "object-[60%_50%]",
    },
    overlay:
      "bg-[linear-gradient(90deg,rgba(14,42,30,0.96)_0%,rgba(23,64,47,0.9)_42%,rgba(23,64,47,0.55)_72%,rgba(23,64,47,0.25)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(14,42,30,0.92)_0%,rgba(23,64,47,0.88)_100%)]",
    stripe: "bg-[linear-gradient(90deg,var(--color-xmas-red),var(--color-gold),#4f8a5b,var(--color-xmas-red))]",
    glow: "bg-[radial-gradient(28rem_18rem_at_0%_0%,rgba(178,58,58,0.35),transparent_70%)]",
    accent: "text-[#f3c6c6]",
    chip: "bg-[#f3c6c6] text-[#5a1216]",
  },
} as const;

function SeasonIcon({ theme, className = "size-4" }: { theme: HolidaySpec["theme"]; className?: string }) {
  return theme === "christmas" ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2l4 5h-2l4 5h-2.5l4 5H13v3h-2v-3H4.5l4-5H6l4-5H8z" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M20 4c-7 0-13 3-14.5 9.5C5 16 6 18 6 18l-2 2 1.4 1.4 2-2s2 1 4.5.5C18.5 18.5 20 12 20 4zm-8.6 12.6L10 15.2c2.5-2.5 4.6-4.2 7-5.7-1.7 2.6-3.4 4.8-5.6 7.1z" />
    </svg>
  );
}

/** Light decorative ornaments: falling leaves (Thanksgiving) or stars (Christmas). */
function Ornaments({ theme }: { theme: HolidaySpec["theme"] }) {
  const spots = [
    "top-6 right-[8%] size-7 rotate-12 opacity-40",
    "top-[38%] right-[22%] size-5 -rotate-12 opacity-30",
    "bottom-10 right-[12%] size-9 rotate-45 opacity-35",
    "top-10 right-[34%] size-4 opacity-25",
  ];
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden sm:block">
      {spots.map((spot) => (
        <span key={spot} className={`absolute ${spot} ${theme === "christmas" ? "text-[#f6e7b0]" : "text-[#f6b26b]"}`}>
          {theme === "christmas" ? (
            <svg viewBox="0 0 24 24" className="size-full" fill="currentColor">
              <path d="M12 2l2.4 6.9H22l-6.1 4.4 2.3 7L12 16l-6.2 4.3 2.3-7L2 8.9h7.6z" />
            </svg>
          ) : (
            <SeasonIcon theme={theme} className="size-full" />
          )}
        </span>
      ))}
    </div>
  );
}

export default function HolidayHero({
  holiday,
  h1,
  intro,
  lastChecked,
  facts = [],
  jumpLabel,
  tableId,
}: {
  holiday: HolidaySpec;
  h1: string;
  intro: string[];
  lastChecked: string | null;
  facts?: { label: string; value: string }[];
  jumpLabel: string;
  tableId: string;
}) {
  const theme = THEMES[holiday.theme];
  return (
    <header className="relative mt-6 overflow-hidden rounded-3xl text-white shadow-[0_28px_60px_-30px_rgba(30,20,10,0.75)]">
      <Image
        src={theme.image.src}
        alt=""
        fill
        priority
        sizes="(min-width: 1280px) 1216px, 100vw"
        className={`object-cover ${theme.image.position}`}
      />
      <div aria-hidden="true" className={`absolute inset-0 ${theme.overlay}`} />
      <div aria-hidden="true" className={`absolute inset-0 ${theme.glow}`} />
      <Ornaments theme={holiday.theme} />
      <div aria-hidden="true" className={`relative h-1.5 ${theme.stripe}`} />

      <div className="relative px-5 py-8 sm:px-10 sm:py-12 lg:py-14">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/12 px-3 py-1 text-sm font-semibold backdrop-blur-sm">
            <SeasonIcon theme={holiday.theme} className={`size-4 ${theme.accent}`} />
            {holiday.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-3xl leading-tight font-bold text-balance sm:text-4xl lg:text-5xl">{h1}</h1>
          {intro.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
              {paragraph}
            </p>
          ))}
        </div>

        <ul aria-label="About these hours" className="mt-7 flex flex-wrap items-center gap-2.5 text-sm leading-6">
          {lastChecked && (
            <li className="rounded-full border border-white/25 bg-white/12 px-3.5 py-1.5 backdrop-blur-sm">
              <strong className="font-semibold">Last verified:</strong>{" "}
              <time dateTime={lastChecked}>{formatMonthYear(lastChecked)}</time>
            </li>
          )}
          {facts.map((fact) => (
            <li key={fact.label} className="rounded-2xl border border-white/25 bg-white/12 px-3.5 py-1.5 backdrop-blur-sm">
              <strong className="font-semibold">{fact.label}:</strong> {fact.value}
            </li>
          ))}
          <li>
            <a
              href={`#${tableId}`}
              className={`inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 font-semibold shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none ${theme.chip}`}
            >
              {jumpLabel}
              <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 5v10M5.5 10.5L10 15l4.5-4.5" />
              </svg>
            </a>
          </li>
        </ul>

        <p className="mt-6 text-xs text-white/70">
          Photo supplied by the site owner for illustration; not an official Olive Garden photo.
        </p>
      </div>
    </header>
  );
}
