import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import TableOfContents from "@/components/navigation/TableOfContents";
import MenuTable from "@/components/menu/MenuTable";
import PriceNotice from "@/components/menu/PriceNotice";
import RelatedArticles from "@/components/content/RelatedArticles";
import VerificationBadge from "@/components/ui/VerificationBadge";
import SectionHeading from "@/components/ui/SectionHeading";
import { sampleMenuItems, sampleRelatedCards } from "./_sample-data";

/**
 * DEV-ONLY component preview (http://localhost:3000/design-preview).
 * Returns 404 in production builds, and is noindex.
 */
export const metadata: Metadata = {
  title: "Component Preview",
  robots: { index: false, follow: false },
};

export default function DesignPreviewPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <Container className="space-y-14 py-10">
      <header>
        <h1 className="font-display text-3xl font-bold text-ink">Component Preview</h1>
        <p className="mt-2 text-muted">
          Development only. All data on this page is sample data, not real menu information.
        </p>
      </header>

      <section className="space-y-4">
        <SectionHeading title="Breadcrumbs" />
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Menu", href: "/menu" },
            { label: "Sample Category" },
          ]}
        />
      </section>

      <section className="space-y-4">
        <SectionHeading title="Menu Table + Price Notice" />
        <PriceNotice lastChecked={null} />
        <MenuTable caption="Sample Prices and Calories" items={sampleMenuItems} />
        <MenuTable caption="Empty Table Example" items={[]} />
      </section>

      <section className="max-w-xs space-y-4">
        <SectionHeading title="Table of Contents" />
        <TableOfContents
          items={[
            { id: "sample-1", label: "Sample heading one" },
            { id: "sample-2", label: "Sample heading two" },
          ]}
        />
      </section>

      <section className="space-y-4">
        <SectionHeading title="Verification Badge" />
        <VerificationBadge />
      </section>

      <RelatedArticles articles={sampleRelatedCards} title="Related Articles (sample)" />

      <p>
        <Link href="/design-preview/article" className="text-brand-dark underline underline-offset-4">
          Open the article layout preview
        </Link>
      </p>
    </Container>
  );
}
