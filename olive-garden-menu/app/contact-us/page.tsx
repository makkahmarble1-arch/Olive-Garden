import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { isContactEmailConfigured } from "@/lib/contact-email";
import { infoPages } from "@/content/site/info-pages";
import { publicContactEmail } from "@/content/site/publisher";
import InfoPageLayout, { InfoLink, InfoSection } from "@/components/info/InfoPageLayout";
import ContactForm from "@/components/contact/ContactForm";

const page = infoPages.contact;
const DESCRIPTION = page.description;

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description: DESCRIPTION,
  path: `/${page.slug}`,
  indexable: page.status === "published",
});

/**
 * /contact-us (Lesson 9.5). The form posts to /api/contact, which emails the
 * message through Resend (server-side key). Until email delivery is
 * configured the form is shown but switched off, and the page stays a
 * preview. The contact email is shown only after the owner confirms the
 * inbox (content/site/publisher.ts).
 */
export default function ContactUsPage() {
  const formEnabled = isContactEmailConfigured();
  const email = publicContactEmail();

  return (
    <InfoPageLayout
      page={page}
      h1="Contact Us"
      description={DESCRIPTION}
      schemaType="ContactPage"
      intro={
        <p>
          Spotted a price that has changed, a calorie value that looks wrong, or a photo that does not match a dish? Have
          a question or feedback about {siteConfig.name}? Send us a message and we will look into it.
        </p>
      }
    >
      <InfoSection id="send-a-message" title="Send Us a Message">
        <div className="rounded-2xl border border-card-border bg-card-bg p-5 shadow-[0_1px_2px_rgba(40,55,15,0.05),0_8px_20px_-14px_rgba(40,55,15,0.35)] sm:p-8">
          <ContactForm enabled={formEnabled} />
        </div>
        {email && (
          <p>
            You can also email us at <InfoLink href={`mailto:${email}`}>{email}</InfoLink>.
          </p>
        )}
      </InfoSection>

      <InfoSection id="menu-corrections" title="Menu and Price Corrections">
        <p>
          Prices and menus change, and they vary by location across the USA. If something on our site looks out of date,
          these details help us check it quickly:
        </p>
        <ul className="list-disc space-y-2 pl-6 marker:text-brand-dark">
          <li>The dish or drink name and the page where you saw it.</li>
          <li>What you saw at Olive Garden: the price, calories, or portion, and the date.</li>
          <li>Whether it was online pickup, delivery, or dine-in, since prices can differ.</li>
          <li>The state or city of the restaurant, if you are comfortable sharing it.</li>
        </ul>
        <p>
          We compare every report with Olive Garden&apos;s official menu and nutrition information before we change a
          page (see <InfoLink href="/how-we-check-prices">how we check prices</InfoLink>). Choose &ldquo;Menu Price Correction,&rdquo; &ldquo;Nutrition Information Correction,&rdquo; or
          &ldquo;Incorrect Food Image&rdquo; as the subject.
        </p>
      </InfoSection>

      <InfoSection id="general-questions" title="General Questions and Website Feedback">
        <p>
          Questions about how we research the menu, ideas for the site, or problems with a page (for example something
          that does not work on your phone) are welcome. Our <InfoLink href="/about-us">About Us</InfoLink> page explains
          how we check prices and calories.
        </p>
      </InfoSection>

      <InfoSection id="business-inquiries" title="Advertising and Business Inquiries">
        <p>
          For advertising, partnership, or other business questions, choose &ldquo;Advertising &amp; Business
          Inquiry&rdquo; as the subject and tell us a little about your company and your request.
        </p>
      </InfoSection>

      <InfoSection id="orders-and-reservations" title="Orders, Reservations, and Refunds">
        <p>
          We cannot place, change, or cancel orders, make reservations, issue refunds, or handle gift cards or
          restaurant complaints, because we are not connected to Olive Garden&apos;s restaurants or ordering system. For
          those, please contact Olive Garden directly through its{" "}
          <InfoLink href={siteConfig.officialSource.url}>official website</InfoLink> or your local restaurant.
        </p>
      </InfoSection>

      <InfoSection id="independent-website" title="An Independent Website">
        <p>{siteConfig.disclaimer}</p>
      </InfoSection>
    </InfoPageLayout>
  );
}
