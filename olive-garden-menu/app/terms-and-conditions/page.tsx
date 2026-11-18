import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { infoPages } from "@/content/site/info-pages";
import InfoPageLayout, { InfoLink, InfoSection } from "@/components/info/InfoPageLayout";

const page = infoPages.terms;
const DESCRIPTION = page.description;

export const metadata: Metadata = pageMetadata({
  title: "Terms and Conditions",
  description: DESCRIPTION,
  path: `/${page.slug}`,
  indexable: page.status === "published",
});

const SECTIONS = [
  ["acceptance", "Acceptance of These Terms"],
  ["about-this-website", "About This Website"],
  ["menu-information", "Use of Menu Information"],
  ["prices-availability", "Prices, Availability and Promotions"],
  ["ratings", "User-Submitted Ratings"],
  ["acceptable-use", "Acceptable Use"],
  ["intellectual-property", "Intellectual Property and Trademarks"],
  ["third-party-websites", "Third-Party Websites"],
  ["availability", "Availability of the Website"],
  ["limitation-of-liability", "Limitation of Liability"],
  ["changes", "Changes to These Terms"],
  ["contact-us", "Contact Us"],
] as const;
const title = Object.fromEntries(SECTIONS) as Record<(typeof SECTIONS)[number][0], string>;

/**
 * /terms-and-conditions (Lesson 9.6). Written for this site's real features;
 * no invented legal entity, governing law, or jurisdiction
 * (docs/LEGAL_PAGES_REVIEW.md).
 */
export default function TermsPage() {
  return (
    <InfoPageLayout
      page={page}
      h1="Terms and Conditions"
      description={DESCRIPTION}
      schemaType="WebPage"
      showUpdated
      toc={SECTIONS.map(([id, t]) => ({ id, title: t }))}
      intro={<p>These terms explain how you may use {siteConfig.name} and what you can expect from the information on it.</p>}
    >
      <InfoSection id="acceptance" title={title.acceptance}>
        <p>
          By using this website you agree to these terms and to our{" "}
          <InfoLink href="/privacy-policy">Privacy Policy</InfoLink>. If you do not agree, please do not use the site.
        </p>
      </InfoSection>

      <InfoSection id="about-this-website" title={title["about-this-website"]}>
        <p>
          {siteConfig.name} is an independent informational guide to the Olive Garden menu for diners in the United States.
          It is not operated by, affiliated with, endorsed by, or sponsored by Olive Garden or Darden Restaurants, Inc.
        </p>
        <p>
          We do not sell food, take or manage restaurant orders, make reservations, process payments, or provide restaurant
          customer service. For those, please use Olive Garden&apos;s{" "}
          <InfoLink href={siteConfig.officialSource.url}>official website</InfoLink> or contact your local restaurant.
        </p>
      </InfoSection>

      <InfoSection id="menu-information" title={title["menu-information"]}>
        <p>
          Menu information on this site is provided for general information and planning. We research it from official
          Olive Garden resources where available and show when it was last verified, but menus change and we cannot promise
          that every detail is complete or current. Always confirm prices, ingredients, and availability with the
          restaurant before you order.
        </p>
        <p>
          Nutrition, allergen, and dietary information is not medical advice. Please read our{" "}
          <InfoLink href="/disclaimer">Disclaimer</InfoLink> for important limits on this information.
        </p>
      </InfoSection>

      <InfoSection id="prices-availability" title={title["prices-availability"]}>
        <p>
          Prices on this site are online pickup prices checked for one restaurant in the United States. Prices, menu items,
          portion sizes, and availability vary by location and can change at any time. Limited-time items and promotions can
          end or differ by restaurant. The price you pay is the one charged by the restaurant.
        </p>
      </InfoSection>

      <InfoSection id="ratings" title={title.ratings}>
        <p>Visitors can rate dishes from one to five stars. When you rate a dish, you agree to:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-brand-dark">
          <li>Give your own honest opinion of the dish.</li>
          <li>Rate each dish only once and not try to get around the one-rating-per-visitor limit (for example by clearing cookies or switching devices to add more votes).</li>
          <li>Not use bots, scripts, or other automated means to submit or change ratings.</li>
        </ul>
        <p>
          Ratings show visitor opinions, not our views or Olive Garden&apos;s. We may limit, remove, or reset ratings that
          appear automated, manipulated, or abusive, and we may change or stop the rating feature at any time.
        </p>
      </InfoSection>

      <InfoSection id="acceptable-use" title={title["acceptable-use"]}>
        <p>Please use the website lawfully and respectfully. You may not:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-brand-dark">
          <li>Send spam or unsolicited advertising through the contact form.</li>
          <li>Try to gain unauthorized access to the website, its servers, its database, or its service providers.</li>
          <li>Interfere with the site&apos;s operation, security features, or rate limits, or overload it with automated requests.</li>
          <li>Copy large parts of the site&apos;s content or data by automated means for republication.</li>
          <li>Use the site to mislead others, for example by presenting it as an official Olive Garden website.</li>
        </ul>
      </InfoSection>

      <InfoSection id="intellectual-property" title={title["intellectual-property"]}>
        <p>
          The original text, page design, calculations, and compilation of information on this site belong to{" "}
          {siteConfig.name}. You may share links to our pages and quote short passages with a link back to the source. Please
          do not republish substantial parts of the site without permission.
        </p>
        <p>
          Olive Garden and related names, menu item names, and logos are trademarks of their respective owner. We use menu
          names only to identify the dishes we describe. We do not claim ownership of these trademarks, and their use does
          not imply any affiliation or endorsement. We do not use the Olive Garden logo or official Olive Garden photos.
        </p>
      </InfoSection>

      <InfoSection id="third-party-websites" title={title["third-party-websites"]}>
        <p>
          The site links to other websites, including Olive Garden&apos;s official pages and nutrition guides. We do not
          control those websites and are not responsible for their content, availability, or privacy practices.
        </p>
      </InfoSection>

      <InfoSection id="availability" title={title.availability}>
        <p>
          We aim to keep the website available and working, but it may be unavailable at times, for example during
          maintenance or because of technical problems. Some features, such as ratings or the contact form, may be
          temporarily unavailable. We may change, add, or remove content and features at any time.
        </p>
      </InfoSection>

      <InfoSection id="limitation-of-liability" title={title["limitation-of-liability"]}>
        <p>
          The website and its information are provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; To the extent
          permitted by applicable law, {siteConfig.name} is not liable for losses or damages that result from relying on
          information on the site, including price differences, menu changes, or dietary decisions, or from the site being
          unavailable. Nothing in these terms limits any rights you have that cannot be limited under applicable law.
        </p>
      </InfoSection>

      <InfoSection id="changes" title={title.changes}>
        <p>
          We may update these terms. The effective date and the &ldquo;Last updated&rdquo; date at the top of this page show
          the latest version.
          Continuing to use the site after a change means you accept the updated terms.
        </p>
      </InfoSection>

      <InfoSection id="contact-us" title={title["contact-us"]}>
        <p>
          Questions about these terms? Please reach us through our <InfoLink href="/contact-us">Contact Us</InfoLink> page.
        </p>
      </InfoSection>
    </InfoPageLayout>
  );
}
