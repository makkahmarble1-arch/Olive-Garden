import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { formatMonthYear } from "@/lib/format";
import { getMenuCheckDates } from "@/lib/content";
import { infoPages } from "@/content/site/info-pages";
import InfoPageLayout, { InfoLink, InfoSection } from "@/components/info/InfoPageLayout";

const page = infoPages.prices;
const DESCRIPTION = page.description;

export const metadata: Metadata = pageMetadata({
  title: "How We Check Menu Prices",
  description: DESCRIPTION,
  path: `/${page.slug}`,
  indexable: page.status === "published",
});

/**
 * /how-we-check-prices (Lesson 9.7). Methodology from
 * docs/MENU_RESEARCH_PLAN.md and the real calculation code
 * (lib/category-data.ts). The reference restaurant stays internal: the
 * public location is "USA" (owner standard 2026-11-13). The verification
 * month comes from the menu data, never typed by hand.
 */
export default function HowWeCheckPricesPage() {
  const checked = getMenuCheckDates();
  const verified = checked ? formatMonthYear(checked.last) : null;

  return (
    <InfoPageLayout
      page={page}
      h1="How We Check Menu Prices"
      description={DESCRIPTION}
      schemaType="WebPage"
      intro={
        <p>
          The prices and calories on {siteConfig.name} come from Olive Garden&apos;s official menu and nutrition
          information. This page explains where each number comes from, how we calculate comparisons, and why the price at
          your restaurant may be different.
        </p>
      }
    >
      {verified && (
        <p className="mb-10 rounded-lg border border-card-border bg-brand-tint px-4 py-3 text-base leading-7 text-ink">
          <strong className="font-semibold">Menu prices last verified:</strong> {verified} · {siteConfig.market} · online
          pickup. {siteConfig.locationNotice}
        </p>
      )}

      <InfoSection id="collecting-prices" title="How We Collect Menu Prices">
        <p>
          We read prices from Olive Garden&apos;s official online ordering menu with one restaurant in the United States
          selected and the order type set to pickup. For each dish we record the price of every size or option, the item
          name as the menu shows it, whether it is available, and the date we checked it.
        </p>
        <p>
          These are reference prices from the restaurant we checked, not a nationwide price survey and not live prices: we
          do not track prices automatically or continuously. Dine-in and delivery prices were not checked and may differ.
        </p>
      </InfoSection>

      <InfoSection id="methodology" title="Our Pricing Methodology">
        <ul className="list-disc space-y-2 pl-6 marker:text-brand-dark">
          <li>Every price is stored once in our shared menu data and shown the same way on every page, so the homepage and the category pages always agree.</li>
          <li>Each price shows its basis, such as per entrée, per pan, or per bundle.</li>
          <li>
            Items that are not on the current online menu, or are not part of an offer, show a short note instead of a
            price, for example &ldquo;Not on the current online menu.&rdquo;
          </li>
          <li>
            Limited-time items are labeled &ldquo;Limited time.&rdquo; Promotions such as Buy One Take One are described as
            they were when we checked them, with a link to the official offer page.
          </li>
          <li>If a value has not been verified yet, it is labeled &ldquo;Not verified yet&rdquo; rather than estimated.</li>
        </ul>
      </InfoSection>

      <InfoSection id="calories" title="How We Verify Calories">
        <p>
          Calories come from the official online menu and are cross-checked against Olive Garden&apos;s{" "}
          <InfoLink href={siteConfig.nutritionSource.url}>nutrition guide (PDF)</InfoLink>. When the two differ for the same
          portion, we use the nutrition guide. Dishes with options show a calorie range, and family and catering items show
          calories for the whole pan or bundle, as the official sources list them.
        </p>
      </InfoSection>

      <InfoSection id="comparisons" title="How We Calculate Menu Comparisons">
        <p>Some useful numbers are not published by Olive Garden, so we calculate them from official values:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-brand-dark">
          <li>
            <strong className="font-semibold">Cost per person:</strong> the price divided by the number of people the item
            serves, for example a $47.99 pan for 4 to 6 people is about $8.00 to $12.00 per person.
          </li>
          <li>
            <strong className="font-semibold">Totals:</strong> official parts added together, such as breadsticks plus a
            dipping sauce, with the parts shown (for example 4 × 140 + 70).
          </li>
          <li>
            <strong className="font-semibold">Group planning:</strong> the number of guests divided by the people one tray
            serves, rounded up to whole trays; the total is for food only.
          </li>
          <li>
            <strong className="font-semibold">Differences:</strong> the gap in price or calories between two portions or
            dishes.
          </li>
        </ul>
        <p>
          Calculated values are marked &ldquo;Calc.&rdquo; or &ldquo;Calculated&rdquo; and never replace an official value.
          A value from a credible third-party source would be marked &ldquo;Estimated&rdquo;; none are used on the site at
          present.
        </p>
      </InfoSection>

      <InfoSection id="update-frequency" title="How Often We Update Information">
        <p>
          We update a price, calorie value, or offer only after checking it again against an official source, and the
          &ldquo;last verified&rdquo; month on each page changes only after such a check. We do not follow a fixed
          schedule, and we do not monitor prices continuously, so information can become out of date between checks.
          Corrections from readers are checked and, when confirmed, applied across the whole site.
        </p>
      </InfoSection>

      <InfoSection id="why-prices-vary" title="Why Prices May Vary">
        <ul className="list-disc space-y-2 pl-6 marker:text-brand-dark">
          <li>Olive Garden restaurants can set different prices by location across the USA.</li>
          <li>Online pickup, delivery, and dine-in prices can differ.</li>
          <li>Menus, portion sizes, and recipes change over time, and limited-time items and promotions end.</li>
          <li>Some items or offers are available only at some restaurants.</li>
        </ul>
        <p>
          Always confirm the price with your restaurant before ordering. Our{" "}
          <InfoLink href="/disclaimer">Disclaimer</InfoLink> explains the limits of this information, and our{" "}
          <InfoLink href="/editorial-policy">Editorial Policy</InfoLink> covers our wider research and correction process.
        </p>
      </InfoSection>

      <InfoSection id="report" title="Report Incorrect Menu Information">
        <p>
          Saw a different price or calorie value? Tell us on our <InfoLink href="/contact-us">Contact Us</InfoLink> page and
          choose &ldquo;Menu Price Correction&rdquo; or &ldquo;Nutrition Information Correction.&rdquo; Please include the dish,
          what you saw, the date, and whether it was pickup, delivery, or dine-in.
        </p>
      </InfoSection>
    </InfoPageLayout>
  );
}
