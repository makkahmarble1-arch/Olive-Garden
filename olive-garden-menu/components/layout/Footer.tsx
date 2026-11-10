import Link from "next/link";
import { cacheLife } from "next/cache";
import { siteConfig } from "@/lib/site";
import Container from "./Container";

// With Cache Components, the current date must be read inside "use cache".
// The year is cached and refreshed daily.
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-brand-tint">
      <Container className="grid gap-8 py-10 md:grid-cols-[2fr_1fr] md:py-12">
        <div>
          <p className="font-display text-lg font-bold text-ink">{siteConfig.name}</p>
          <p className="mt-2 max-w-prose text-sm leading-6 text-muted">
            {siteConfig.description}
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold text-ink">Explore</h2>
          <ul className="mt-2 space-y-1">
            {siteConfig.nav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-sm text-brand-dark underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-brand-dark"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <div className="border-t border-line">
        <Container className="space-y-2 py-6 text-xs leading-5 text-muted">
          <p>
            <strong className="font-semibold text-ink">Disclaimer:</strong>{" "}
            {siteConfig.disclaimer}
          </p>
          <p>
            &copy; <CurrentYear /> {siteConfig.name}. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}
