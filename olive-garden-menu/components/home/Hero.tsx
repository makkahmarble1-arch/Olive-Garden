import { siteConfig } from "@/lib/site";
import Container from "@/components/layout/Container";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

export default function Hero() {
  return (
    <section className="border-b border-line bg-gradient-to-b from-brand-tint to-white">
      <Container className="grid items-center gap-10 py-12 md:grid-cols-2 md:py-20">
        <div>
          <p className="inline-flex rounded-full border border-brand bg-white px-3 py-1 text-sm font-medium text-brand-dark">
            Independent guide &middot; Not the official website
          </p>

          <h1 className="mt-5 font-display text-3xl leading-tight font-bold text-ink sm:text-4xl lg:text-5xl">
            {siteConfig.name}
          </h1>

          <p className="mt-4 max-w-prose text-lg leading-8 text-muted">
            Browse the Olive Garden menu by category and find prices and calorie
            information in one place. We only publish prices and nutrition facts
            after checking them against a real source.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#menu-categories"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-brand-dark px-6 font-semibold text-white transition-colors hover:bg-brand-darker focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
            >
              Browse Menu Categories
            </a>
            <a
              href="#about-this-guide"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-brand-dark bg-white px-6 font-semibold text-brand-dark transition-colors hover:bg-brand-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
            >
              How We Check Prices
            </a>
          </div>
        </div>

        <PlaceholderImage
          label="Hero photo of an Italian pasta dish"
          aspect="aspect-[4/3]"
          className="rounded-xl"
        />
      </Container>
    </section>
  );
}
