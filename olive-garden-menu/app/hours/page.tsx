import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { getGuide, guidePath } from "@/content/guides";
import GuidePageLayout from "@/components/guide/GuidePageLayout";

/** /hours: Olive Garden Hours guide (content/guides/hours.ts). */
const guide = getGuide("hours");

export const metadata: Metadata = pageMetadata({
  title: guide.metaTitle,
  description: guide.metaDescription,
  path: guidePath(guide),
  absoluteTitle: true,
  indexable: guide.status === "published",
});

export default function HoursPage() {
  return <GuidePageLayout guide={guide} />;
}
