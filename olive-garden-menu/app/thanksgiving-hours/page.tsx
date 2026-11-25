import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { getGuide, guidePath } from "@/content/guides";
import GuidePageLayout from "@/components/guide/GuidePageLayout";

/** /thanksgiving-hours: Olive Garden Thanksgiving Hours 2026 (content/guides/thanksgiving-hours.ts). */
const guide = getGuide("thanksgiving-hours");

export const metadata: Metadata = pageMetadata({
  title: guide.metaTitle,
  description: guide.metaDescription,
  path: guidePath(guide),
  absoluteTitle: true,
  indexable: guide.status === "published",
});

export default function ThanksgivingHoursPage() {
  return <GuidePageLayout guide={guide} />;
}
