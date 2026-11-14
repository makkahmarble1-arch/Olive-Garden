import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { infoPages } from "@/content/site/info-pages";
import InfoPageLayout, { InfoLink, InfoSection } from "@/components/info/InfoPageLayout";

const page = infoPages.disclaimer;
const DESCRIPTION =
  "Read our independent website disclaimer covering menu prices, nutrition information, dietary limitations, food images and restaurant affiliation.";

export const metadata: Metadata = pageMetadata({
  title: "Disclaimer",
  description: DESCRIPTION,
  path: `/${page.slug}`,
  indexable: page.status === "published",
});

const SECTIONS = [
  ["independent-website", "Independent Website Disclosure"],
  ["prices-availability", "Menu Prices and Availability"],
  ["nutrition", "Nutrition and Calorie Information"],
  ["allergens-dietary", "Allergen and Dietary Information"],
  ["food-images", "Food Images and Illustrations"],
  ["promotions", "Promotions and Special Offers"],
  ["visitor-ratings", "Visitor Ratings"],
  ["external-links", "External Links"],
  ["trademarks", "Trademark Notice"],
  ["contact-us", "Contact Us"],
] as const;
const title = Object.fromEntries(SECTIONS) as Record<(typeof SECTIONS)[number][0], string>;

/**
 * /disclaimer (Lesson 9.6). The food-image section discloses AI-generated
 * illustrations: owner decision 2026-11-14 (Lesson 9.6), the only public
 * page that mentions it; cards stay unlabeled (CLAUDE.md).
 */
export default function DisclaimerPage() {
  return (
    <InfoPageLayout
      page={page}
      h1="Disclaimer"
      description={DESCRIPTION}
      schemaType="WebPage"
      showUpdated
      toc={SECTIONS.map(([id, t]) => ({ id, title: t }))}
      intro={
        <p>
          {siteConfig.name} shares menu information to help you plan a meal. Please read the limits of that information
          below, especially before relying on prices, nutrition, or dietary details.
        </p>
      }
    >
      <InfoSection id="independent-website" title={title["independent-website"]}>
        <p>
          {siteConfig.name} is an independent informational website. It is not the official Olive Garden website and is not
          operated by, affiliated with, endorsed by, or sponsored by Olive Garden or Darden Restaurants, Inc. Nothing on
          this site should be read as a statement by Olive Garden. For official information, visit the{" "}
          <InfoLink href={siteConfig.officialSource.url}>Olive Garden website</InfoLink>.
        </p>
      </InfoSection>

      <InfoSection id="prices-availability" title={title["prices-availability"]}>
        <p>
          We research menu information from official Olive Garden resources where available. Prices shown are online
          pickup prices checked for one restaurant in the United States, with the month and year they were last verified.
          Prices, menu items, and availability vary by location across the USA, may differ for dine-in or delivery, and can
          change at any time. The prices on this site are not guaranteed at any restaurant; please confirm with your local
          Olive Garden before ordering. Learn more about{" "}
          <InfoLink href="/how-we-check-prices">how we check menu prices</InfoLink>.
        </p>
      </InfoSection>

      <InfoSection id="nutrition" title={title.nutrition}>
        <p>
          Calories come from Olive Garden&apos;s official menu and published nutrition information. Values marked
          &ldquo;Calculated&rdquo; are our own totals from official values. Actual nutrition can vary with preparation,
          ingredients, portion size, recipe changes, and the options or changes you choose. Calorie information is a
          general guide and not a substitute for advice from a doctor or dietitian.
        </p>
      </InfoSection>

      <InfoSection id="allergens-dietary" title={title["allergens-dietary"]}>
        <p>
          Olive Garden describes certain dishes as <strong className="font-semibold">gluten-sensitive</strong>, meaning
          they are made without gluten-containing ingredients. These dishes are not certified gluten-free; the restaurant
          kitchens are shared, there is no separate fryer, and cross-contact with gluten and other allergens is possible.
          Only Olive Garden&apos;s gluten-free rotini is described as gluten-free.
        </p>
        <p>
          We cannot guarantee that any dish is safe for people with celiac disease, food allergies, or other dietary
          needs. Ingredients and recipes can change. If you have an allergy or a medical condition, review Olive
          Garden&apos;s official{" "}
          <InfoLink href="https://media.olivegarden.com/en_us/pdf/allergen_guide.pdf">allergen guide</InfoLink>, tell your
          server, and ask the restaurant before ordering. Our <InfoLink href="/gluten-sensitive">gluten-sensitive menu</InfoLink>{" "}
          page explains this in more detail.
        </p>
      </InfoSection>

      <InfoSection id="food-images" title={title["food-images"]}>
        <p>
          The food images on this website are supplied by the site owner. None of them are official Olive Garden photos.
          Some are photographs, and some are illustrations created with AI image-generation tools to show what a dish
          generally looks like.
        </p>
        <p>
          Images are for illustration only. They may not match the dish exactly: portion size, sides, garnishes, plating,
          and presentation at the restaurant can be different, and a few images show sides or details that are not part of
          the current dish. Always rely on the menu description and the restaurant for what is served.
        </p>
      </InfoSection>

      <InfoSection id="promotions" title={title.promotions}>
        <p>
          Offers such as Buy One Take One, the $6 Take Home offer, and limited-time menu items are described as they were
          when we last checked them, with links to the official offer pages where available. Promotions can end, change, or
          vary by location, and some may not be available at your restaurant. Please confirm any offer with Olive Garden
          before relying on it.
        </p>
      </InfoSection>

      <InfoSection id="visitor-ratings" title={title["visitor-ratings"]}>
        <p>
          Star ratings are opinions submitted by visitors to this website. We do not verify that a visitor has ordered or
          eaten a dish, and ratings do not represent our views or Olive Garden&apos;s. We limit each browser to one rating
          per dish and use automated limits against abuse, but these measures cannot prevent all misuse.
        </p>
      </InfoSection>

      <InfoSection id="external-links" title={title["external-links"]}>
        <p>
          We link to external websites, mainly Olive Garden&apos;s official pages and nutrition guides, for your convenience.
          We do not control those sites and are not responsible for their content, accuracy, or availability.
        </p>
      </InfoSection>

      <InfoSection id="trademarks" title={title.trademarks}>
        <p>
          Olive Garden, its menu item names, and related marks are trademarks of their respective owner. They are used on
          this website only to identify the restaurant and the dishes we describe. Their use does not mean that Olive Garden
          or Darden Restaurants, Inc. sponsors, endorses, or is affiliated with this website.
        </p>
      </InfoSection>

      <InfoSection id="contact-us" title={title["contact-us"]}>
        <p>
          Found information that is out of date or incorrect? Please tell us on our{" "}
          <InfoLink href="/contact-us">Contact Us</InfoLink> page so we can check it.
        </p>
      </InfoSection>
    </InfoPageLayout>
  );
}
