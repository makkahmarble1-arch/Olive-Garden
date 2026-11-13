import Link from "next/link";
import { siteConfig } from "@/lib/site";
import Container from "./Container";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        {/* Text logo until the owner provides an approved logo. */}
        <Link
          href="/"
          className="flex flex-col rounded-md leading-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-dark"
        >
          <span className="font-display text-base font-bold text-ink min-[380px]:text-lg sm:text-xl">
            {siteConfig.name}
          </span>
          <span className="text-xs text-muted">{siteConfig.tagline}</span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {siteConfig.nav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center rounded-md px-3 font-medium text-ink transition-colors hover:bg-brand-tint hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-brand-dark"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <MobileMenu links={siteConfig.nav} />
      </Container>
    </header>
  );
}
