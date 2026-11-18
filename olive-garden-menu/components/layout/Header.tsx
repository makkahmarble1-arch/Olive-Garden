import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { getMainNav } from "@/lib/navigation";
import Container from "./Container";
import HeaderShell from "./HeaderShell";
import SiteSearch from "./SiteSearch";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

/**
 * Global header (docs/DESIGN_SYSTEM.md 4.4), one implementation for every page.
 * Row 1 (cream): logo (owner icon + site name) and search. Row 2 (lg and up):
 * dark olive navigation with dropdowns. Below lg: logo, search button, menu.
 * Height is fixed per breakpoint (--header-h in globals.css) so sticky bars
 * and anchor jumps line up.
 */
export default function Header() {
  const items = getMainNav();
  return (
    <HeaderShell>
      <div className="border-b border-card-border">
        <Container className="flex h-16 items-center justify-between gap-4 lg:gap-8">
          <Link
            href="/"
            aria-label={`${siteConfig.name} home`}
            className="flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-dark"
          >
            <Image
              src="/images/brand/logo-icon.webp"
              alt=""
              width={138}
              height={96}
              loading="eager"
              sizes="66px"
              className="h-10 w-auto sm:h-11"
            />
            <span className="font-display text-[1.05rem] leading-[1.05] font-bold text-hero-deep min-[400px]:text-lg sm:text-xl">
              Olive Garden{" "}
              <span className="block text-brand-dark">Menu Prices</span>
            </span>
          </Link>

          <div className="hidden w-full max-w-md lg:block">
            <SiteSearch />
          </div>

          <MobileNav items={items} />
        </Container>
      </div>

      <div className="hidden bg-brand-dark lg:block">
        <Container className="flex h-12 items-center">
          <DesktopNav items={items} />
        </Container>
      </div>
    </HeaderShell>
  );
}
