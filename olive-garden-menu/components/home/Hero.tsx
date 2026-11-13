import Image from "next/image";
import type { ImageRef, ReferenceLocation } from "@/lib/types";
import { formatDate } from "@/lib/format";
import Container from "@/components/layout/Container";

type HeroProps = {
  /** The page's only H1. */
  title: string;
  intro: string;
  image: ImageRef;
};

const buttonBase =
  "inline-flex min-h-12 items-center justify-center rounded-lg px-5 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark";

/**
 * Homepage hero: H1, one short paragraph, quick links, and a food photo.
 * The pricing and verification facts sit right below it (PricingInfoBar).
 */
export default function Hero({ title, intro, image }: HeroProps) {
  return (
    <section id="top" className="border-b border-line bg-gradient-to-b from-brand-tint to-white">
      <Container className="grid items-center gap-6 py-8 md:py-10 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
        <div>
          <p className="inline-flex rounded-full border border-brand bg-white px-3 py-1 text-sm font-medium text-brand-dark">
            Independent guide &middot; Not the official website
          </p>
          <h1 className="mt-4 font-display text-3xl leading-tight font-bold text-ink sm:text-4xl lg:text-[2.6rem]">
            {title}
          </h1>
          <p className="mt-3 max-w-prose text-base leading-7 text-muted sm:text-lg sm:leading-8">{intro}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="#full-menu" className={`${buttonBase} bg-brand-dark text-white hover:bg-brand-darker`}>
              Browse the full menu
            </a>
            <a
              href="#lunch-specials-deals"
              className={`${buttonBase} border border-brand-dark bg-white text-brand-dark hover:bg-brand-tint`}
            >
              Lunch specials &amp; deals
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-md">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            preload
            sizes="(min-width: 1152px) 560px, (min-width: 1024px) 48vw, (min-width: 640px) 90vw, 100vw"
            className="aspect-[16/9] h-auto w-full object-cover sm:aspect-[3/2]"
          />
        </div>
      </Container>
    </section>
  );
}

/** "November 11–12, 2026" or "November 12, 2026". */
export function checkedRange(checked: { first: string; last: string }): string {
  if (checked.first === checked.last) return formatDate(checked.last);
  const first = formatDate(checked.first);
  const last = formatDate(checked.last);
  const [fMonth, fDay] = first.replace(",", "").split(" ");
  const [lMonth, lDay, lYear] = last.replace(",", "").split(" ");
  return fMonth === lMonth && first.endsWith(lYear) ? `${fMonth} ${fDay}–${lDay}, ${lYear}` : `${first} – ${last}`;
}

/**
 * Compact pricing facts under the hero: reference restaurant, real check
 * date, and the price-variation notice. Full method: the Sources section.
 */
export function PricingInfoBar({
  location,
  checked,
}: {
  location: ReferenceLocation;
  checked: { first: string; last: string } | null;
}) {
  const item = "flex items-start gap-2";
  const dot = <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />;
  return (
    <div role="note" aria-label="About these prices" className="border-b border-line bg-white">
      <Container className="py-3">
        <ul className="grid gap-x-6 gap-y-1.5 text-sm leading-6 text-ink md:flex md:flex-wrap md:items-center">
          <li className={item}>
            {dot}
            <span>
              <strong className="font-semibold">Prices:</strong> online pickup at Olive Garden {location.name},{" "}
              {location.city}, {location.state}
            </span>
          </li>
          {checked && (
            <li className={item}>
              {dot}
              <span>
                <strong className="font-semibold">Last checked:</strong> {checkedRange(checked)}
              </span>
            </li>
          )}
          <li className={item}>
            {dot}
            <span>Prices and items vary by location.</span>
          </li>
          <li className={item}>
            {dot}
            <a
              href="#sources"
              className="font-medium text-brand-dark underline underline-offset-4 hover:text-brand-darker focus-visible:outline-2 focus-visible:outline-brand-dark"
            >
              How we check prices
            </a>
          </li>
        </ul>
      </Container>
    </div>
  );
}
