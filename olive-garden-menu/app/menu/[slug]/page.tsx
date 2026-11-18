import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/metadata";
import { getOfferingImage, getOffering } from "@/lib/content";
import { getLiveProductPage, getProductPageData, getRenderableProductPages, productPath } from "@/lib/product-pages";
import ProductPageLayout from "@/components/product/ProductPageLayout";
import Container from "@/components/layout/Container";

/**
 * Individual menu item pages: /menu/{slug} (first sample: /menu/fried-mozzarella).
 * Only pages with status "preview" or "published" in content/menu/product-pages
 * render; every other slug is a real HTTP 404 (proxy.ts answers before
 * rendering). "/menu" itself still redirects permanently to "/" (next.config.ts).
 * docs/product-pages/PRODUCT_PAGE_ARCHITECTURE.md.
 */
export function generateStaticParams() {
  // Every non-draft page is prerendered (Cache Components needs at least one
  // entry, also on production while no page is published yet). A page that is
  // not live in this environment renders the 404 page, and proxy.ts already
  // answers its URL with HTTP 404 before rendering.
  return getRenderableProductPages().map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps<"/menu/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = getLiveProductPage(slug);
  if (!page) return {};
  const offering = getOffering(page.primaryOfferingId);
  const image = offering && !page.heroImageOmitted ? getOfferingImage(offering) : null;
  return pageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: productPath(page.slug),
    absoluteTitle: true,
    // Preview pages are always noindex; published pages follow the site-wide switch.
    indexable: page.status === "published",
    image: image ? { url: image.src, width: image.width, height: image.height, alt: image.alt } : undefined,
    type: "article",
  });
}

/**
 * `params` is read inside <Suspense> (Next.js 16 instant navigation,
 * node_modules/next/dist/docs/01-app/02-guides/instant-navigation.md), so the
 * route shell can render at once on client navigations. Live pages are fully
 * prerendered, so visitors normally never see the fallback.
 */
export default function ProductPage({ params }: PageProps<"/menu/[slug]">) {
  return (
    <Suspense fallback={<ProductPageFallback />}>
      <ProductPageContent params={params} />
    </Suspense>
  );
}

async function ProductPageContent({ params }: { params: PageProps<"/menu/[slug]">["params"] }) {
  const { slug } = await params;
  const page = getLiveProductPage(slug);
  if (!page) notFound();
  return <ProductPageLayout data={getProductPageData(page)} />;
}

/** Same size as the hero, so nothing jumps when the page appears. */
function ProductPageFallback() {
  return (
    <div className="py-6 md:py-10" aria-busy="true">
      <Container>
        <div className="h-5 w-64 max-w-full rounded bg-brand-tint" />
        <div className="mt-5 h-[34rem] rounded-3xl border border-card-border bg-header-cream md:h-[30rem]" />
      </Container>
    </div>
  );
}
