import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { infoPages } from "@/content/site/info-pages";
import { publisher } from "@/content/site/publisher";
import InfoPageLayout, { InfoLink, InfoSection } from "@/components/info/InfoPageLayout";

const page = infoPages.editorial;
const DESCRIPTION = page.description;

export const metadata: Metadata = pageMetadata({
  title: "Editorial Policy",
  description: DESCRIPTION,
  path: `/${page.slug}`,
  indexable: page.status === "published",
});

/**
 * /editorial-policy (Lesson 9.7). Describes the real process from
 * docs/MENU_RESEARCH_PLAN.md and the site's labels. No invented staff,
 * credentials, review steps, firsthand dining, or update schedule.
 */
export default function EditorialPolicyPage() {
  return (
    <InfoPageLayout
      page={page}
      h1="Editorial Policy"
      description={DESCRIPTION}
      schemaType="WebPage"
      intro={
        <p>
          This page explains how the {publisher.editorialTeam} researches, writes, checks, and corrects the menu
          information on {siteConfig.name}.
        </p>
      }
    >
      <InfoSection id="mission" title="Our Editorial Mission">
        <p>
          Our goal is to give diners in the United States clear, accurate answers about the Olive Garden menu: what a dish
          costs, how many calories it has, how much food it is, and which offers apply. We would rather say that a value
          could not be verified than publish a guess.
        </p>
      </InfoSection>

      <InfoSection id="sources" title="Research and Information Sources">
        <p>We use sources in a fixed order of priority:</p>
        <ol className="list-decimal space-y-2 pl-6 marker:text-brand-dark">
          <li>Olive Garden&apos;s official online menu and ordering pages, for prices, item names, sizes, and availability.</li>
          <li>
            Olive Garden&apos;s official nutrition, allergen, and gluten-sensitive documents, for calories, serving basis, and
            dietary statements.
          </li>
          <li>Our own calculations from those official values, when a total is listed only in parts.</li>
          <li>
            A credible third-party source, only when no official value exists. Such a value would be labeled
            &ldquo;Estimated&rdquo;; no estimated values are used on the site at present.
          </li>
        </ol>
        <p>
          Our research notes record the source and check date of every value. We do not visit restaurants to test dishes,
          and we do not present opinions as tasting experience. The details of our price research are on{" "}
          <InfoLink href="/how-we-check-prices">How We Check Menu Prices</InfoLink>.
        </p>
      </InfoSection>

      <InfoSection id="content-standards" title="Content Creation Standards">
        <ul className="list-disc space-y-2 pl-6 marker:text-brand-dark">
          <li>Menu descriptions and articles are written in our own words from official information; we do not copy Olive Garden&apos;s menu text.</li>
          <li>We never invent prices, calories, ingredients, hours, or offers. When a value is not available, the page shows a short note (for example &ldquo;Not on the current online menu&rdquo;) instead of a number.</li>
          <li>Every value has one visible basis: official, calculated, or estimated.</li>
          <li>Dietary information uses Olive Garden&apos;s own terms, such as &ldquo;gluten-sensitive,&rdquo; and we give no medical or safety guarantees.</li>
          <li>We write plainly for a general U.S. audience and avoid exaggerated or promotional claims.</li>
        </ul>
      </InfoSection>

      <InfoSection id="fact-checking" title="Our Fact-Checking Process">
        <ul className="list-disc space-y-2 pl-6 marker:text-brand-dark">
          <li>Calories from the online menu are cross-checked against Olive Garden&apos;s nutrition guide; where the two differ for the same portion, we use the nutrition guide.</li>
          <li>Prices, calories, and serving sizes on every page come from one shared set of menu data, so the same dish shows the same values everywhere on the site.</li>
          <li>Numbers written into page text are taken from that same data and are checked again when the data changes.</li>
          <li>Calculations (such as a meal total or a cost per person) show their parts, so readers can check them.</li>
          <li>Automated checks run every time the site is built and stop the build if, for example, a price has no source or check date, a calculated value has no formula, or an item has neither a value nor a note explaining why.</li>
        </ul>
      </InfoSection>

      <InfoSection id="updates" title="Content Updates">
        <p>
          Each page shows the month and year its menu information was last verified. We update a value only after
          checking it against an official source again, and the verification date changes only after such a check. Time-
          sensitive details, such as limited-time items and promotions, are checked again before they are updated. We do not
          monitor prices continuously, so a page can be out of date between checks.
        </p>
      </InfoSection>

      <InfoSection id="corrections" title="Corrections Policy">
        <p>
          If you notice a price, calorie value, description, or image that looks wrong, please tell us on our{" "}
          <InfoLink href="/contact-us">Contact Us</InfoLink> page. We compare every report with Olive Garden&apos;s official
          sources. If the report is confirmed, we correct the value everywhere it appears. If an item or offer is no longer
          available, we mark it accordingly instead of showing it as current.
        </p>
      </InfoSection>

      <InfoSection id="independence" title="Editorial Independence">
        <p>
          {siteConfig.name} is independent and is not affiliated with Olive Garden or Darden Restaurants, Inc. We do not
          accept payment to change menu information, ratings, or our conclusions. The site does not show advertising at this
          time; if it does in the future, advertisers will have no influence over menu information or editorial content, and
          ads will be clearly separate from our content.
        </p>
      </InfoSection>

      <InfoSection id="images-and-ratings" title="Food Images and Visitor Ratings">
        <p>
          Food images are supplied by the site owner and are not official Olive Garden photos. Some are illustrations and may
          not match the dish exactly. Star ratings are opinions from visitors; we do not edit them, but we may remove
          ratings that appear automated or abusive. Our <InfoLink href="/disclaimer">Disclaimer</InfoLink> explains both in
          more detail.
        </p>
      </InfoSection>

      <InfoSection id="contact-editorial-desk" title="Contact Our Editorial Desk">
        <p>
          Questions about our sources or a correction to suggest? Write to the {publisher.editorialTeam} through our{" "}
          <InfoLink href="/contact-us">Contact Us</InfoLink> page. You can read more about the site on our{" "}
          <InfoLink href="/about-us">About Us</InfoLink> page.
        </p>
      </InfoSection>
    </InfoPageLayout>
  );
}
