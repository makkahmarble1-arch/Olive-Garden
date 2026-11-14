import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { formatMonthYear } from "@/lib/format";
import { getAllMenuCategories, getMenuCheckDates, getOfferingsForCategory } from "@/lib/content";
import { infoPages } from "@/content/site/info-pages";
import { publisher } from "@/content/site/publisher";
import InfoPageLayout, { InfoLink, InfoSection } from "@/components/info/InfoPageLayout";

const page = infoPages.about;
const DESCRIPTION =
  "Learn about Olive Garden Menu Prices, our independent menu research, pricing verification, nutrition information and editorial standards.";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description: DESCRIPTION,
  path: `/${page.slug}`,
  indexable: page.status === "published",
});

/**
 * /about-us (Lesson 9.5): who publishes the site, what it covers, and how
 * menu information is researched. Facts only from docs/MENU_RESEARCH_PLAN.md
 * and the shared menu data; the founder profile comes from
 * content/site/publisher.ts and is never invented.
 */
export default function AboutUsPage() {
  const categories = getAllMenuCategories();
  const listings = categories.reduce((sum, c) => sum + getOfferingsForCategory(c.id).length, 0);
  const checked = getMenuCheckDates();
  const lastVerified = checked ? formatMonthYear(checked.last) : null;
  const founder = publisher.founder;

  return (
    <InfoPageLayout
      page={page}
      h1="About Us"
      description={DESCRIPTION}
      schemaType="AboutPage"
      intro={
        <p>
          {siteConfig.name} is an independent guide to the Olive Garden menu for diners in the United States. We
          collect prices, calories, portion sizes, and current offers in one place, so you can plan an order before you
          visit or order online.
        </p>
      }
    >
      <InfoSection id="who-we-are" title="Who We Are">
        <p>
          {siteConfig.name} is an informational website published by its founder and the {publisher.editorialTeam}. We
          are not a restaurant, a delivery service, or part of Olive Garden. Our work is reading the official menu
          carefully, recording what we find, and presenting it in a way that is easy to compare.
        </p>
        <p>
          The site is written in American English for a U.S. audience. Every price on the site is in U.S. dollars.
        </p>
      </InfoSection>

      <InfoSection id="our-mission" title="Our Mission">
        <p>
          Restaurant menus change often, and the details people look for (what a dish costs, how many calories it has,
          how many people a family meal feeds) are spread across many pages. Our goal is to answer those questions
          clearly, with the source and the date of every value, and without guessing.
        </p>
      </InfoSection>

      <InfoSection id="what-we-cover" title="What We Cover">
        <p>
          The <InfoLink href="/#full-menu">full menu on our homepage</InfoLink> lists {listings} menu listings in{" "}
          {categories.length} categories. Each category also has its own page with comparisons and answers to common
          questions, for example the <InfoLink href="/lunch-menu">lunch menu</InfoLink>, the{" "}
          <InfoLink href="/family-style-meals">family-style meals</InfoLink>, the{" "}
          <InfoLink href="/gluten-sensitive">gluten-sensitive menu</InfoLink>, and the{" "}
          <InfoLink href="/catering">catering menu</InfoLink>.
        </p>
        <ul className="list-disc space-y-2 pl-6 marker:text-brand-dark">
          <li>Prices for each size or portion, with the basis shown (for example per entrée or per pan).</li>
          <li>Calories, including the range when a dish has options.</li>
          <li>Portion and serving sizes, such as how many people a family bundle or catering tray serves.</li>
          <li>Current offers and limited-time items, marked as such, with a link to the official offer page.</li>
          <li>How ordering works: online pickup, catering, and what to check with your restaurant.</li>
        </ul>
        <p>
          Visitors can also rate dishes from one to five stars. Ratings come only from real visitor votes; we never add
          ratings or reviews ourselves.
        </p>
      </InfoSection>

      <InfoSection id="how-we-research" title="How We Research Menu Information">
        <p>
          Prices are online pickup prices from Olive Garden&apos;s official ordering menu, checked for one restaurant in the
          United States. Dine-in prices were not checked and may differ. Prices vary by location across the USA and can
          change at any time, so please confirm with your local restaurant before you order.
        </p>
        <p>
          Calories come from the same official menu and are cross-checked against Olive Garden&apos;s published nutrition
          guide. When we add up official values ourselves, for example a meal total or a cost per person, the value is
          labeled &ldquo;Calculated&rdquo; and the parts are shown next to it. A value from a credible third-party
          source would be labeled &ldquo;Estimated&rdquo;; official values are never replaced by estimates.
        </p>
        <p>
          Each page shows the month and year the information was last verified
          {lastVerified ? <> (currently {lastVerified})</> : null}. Our internal research notes keep the source and the
          exact check date of every value. Our page{" "}
          <InfoLink href="/how-we-check-prices">How We Check Menu Prices</InfoLink> explains this process in detail.
        </p>
        <p>
          Food photos on the site are supplied by the site owner. They are not official Olive Garden photos, and the
          actual presentation in the restaurant may vary.
        </p>
      </InfoSection>

      <InfoSection id="meet-our-founder" title="Meet Our Founder">
        {founder ? (
          <>
            <p className="font-display text-xl font-bold text-hero-deep">
              {founder.name}
              <span className="block font-sans text-base font-normal text-muted">{founder.role}</span>
            </p>
            {founder.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </>
        ) : (
          <p className="rounded-lg border border-card-border bg-card-bg px-4 py-3 text-base leading-7 text-card-text">
            The founder&apos;s profile will be published here soon.
          </p>
        )}
      </InfoSection>

      <InfoSection id="editorial-standards" title="Our Editorial Standards">
        <ul className="list-disc space-y-2 pl-6 marker:text-brand-dark">
          <li>We never invent prices, calories, menu descriptions, hours, or offers. If a value cannot be verified, the page says so instead of showing a number.</li>
          <li>Every value has one basis that is visible on the page: official, calculated, or estimated.</li>
          <li>Time-sensitive information, such as limited-time items and promotions, is checked again before it is updated, and the verification month changes only after a real check.</li>
          <li>Dietary information uses Olive Garden&apos;s own wording (for example &ldquo;gluten-sensitive&rdquo;), and we do not give medical or safety guarantees.</li>
          <li>Menu descriptions are written in our own words from official information.</li>
          <li>Corrections are welcome. When a reader reports an error, we check it against the official sources and update the page if it is confirmed.</li>
        </ul>
        <p>
          Read the full <InfoLink href="/editorial-policy">Editorial Policy</InfoLink> for our sources, fact-checking, and
          corrections process.
        </p>
      </InfoSection>

      <InfoSection id="independence" title="Independence and Transparency">
        <p>
          {siteConfig.name} is not operated by, affiliated with, endorsed by, or sponsored by Olive Garden or Darden
          Restaurants, Inc. Olive Garden is a trademark of its respective owner. We do not use the Olive Garden logo or
          official photos.
        </p>
        <p>
          For official information, orders, reservations, or customer service, please use the{" "}
          <InfoLink href={siteConfig.officialSource.url}>official Olive Garden website</InfoLink>.
        </p>
      </InfoSection>

      <InfoSection id="get-in-touch" title="Get in Touch">
        <p>
          Found a price that has changed, a calorie value that looks wrong, or a photo that does not match a dish? Please
          tell us on our <InfoLink href="/contact-us">Contact Us</InfoLink> page. Website feedback and business inquiries
          are welcome there too.
        </p>
      </InfoSection>
    </InfoPageLayout>
  );
}
