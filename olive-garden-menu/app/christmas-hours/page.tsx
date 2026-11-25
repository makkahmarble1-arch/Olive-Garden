import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { getGuide, guidePath } from "@/content/guides";
import GuidePageLayout from "@/components/guide/GuidePageLayout";

/** /christmas-hours: Olive Garden Christmas Hours 2026 (content/guides/christmas-hours.ts). */
const guide = getGuide("christmas-hours");

export const metadata: Metadata = pageMetadata({
  title: guide.metaTitle,
  description: guide.metaDescription,
  path: guidePath(guide),
  absoluteTitle: true,
  indexable: guide.status === "published",
});

export default function ChristmasHoursPage() {
  return <GuidePageLayout guide={guide} />;
}
