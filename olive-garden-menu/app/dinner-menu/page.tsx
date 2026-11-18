import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { getGuide, guidePath } from "@/content/guides";
import GuidePageLayout from "@/components/guide/GuidePageLayout";

/** /dinner-menu: Olive Garden Dinner Menu guide (content/guides/dinner-menu.ts). */
const guide = getGuide("dinner-menu");

export const metadata: Metadata = pageMetadata({
  title: guide.metaTitle,
  description: guide.metaDescription,
  path: guidePath(guide),
  absoluteTitle: true,
  indexable: guide.status === "published",
});

export default function DinnerMenuPage() {
  return <GuidePageLayout guide={guide} />;
}
