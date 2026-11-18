import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { infoPages } from "@/content/site/info-pages";
import { publicContactEmail } from "@/content/site/publisher";
import InfoPageLayout, { InfoLink, InfoSection, InfoSubheading } from "@/components/info/InfoPageLayout";

const page = infoPages.privacy;
const DESCRIPTION = page.description;

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: DESCRIPTION,
  path: `/${page.slug}`,
  indexable: page.status === "published",
});

const SECTIONS = [
  ["introduction", "Introduction"],
  ["information-we-collect", "Information We Collect"],
  ["how-we-use-information", "How We Use Information"],
  ["cookies", "Cookies and Similar Technologies"],
  ["menu-ratings", "Anonymous Menu Ratings"],
  ["contact-form", "Contact Form and Email Communications"],
  ["third-party-services", "Third-Party Services"],
  ["advertising", "Google AdSense and Advertising"],
  ["analytics", "Analytics Services"],
  ["retention-security", "Data Retention and Security"],
  ["your-rights", "Your Privacy Rights and Choices"],
  ["childrens-privacy", "Children's Privacy"],
  ["international", "International Data Processing"],
  ["changes", "Changes to This Privacy Policy"],
  ["contact-us", "Contact Us"],
] as const;
const title = Object.fromEntries(SECTIONS) as Record<(typeof SECTIONS)[number][0], string>;

/**
 * /privacy-policy (Lesson 9.6). Describes ONLY what the code does
 * (docs/PRIVACY_DATA_INVENTORY.md). Advertising and analytics are described
 * as planned, not active; update this page before enabling either.
 */
export default function PrivacyPolicyPage() {
  const email = publicContactEmail();
  return (
    <InfoPageLayout
      page={page}
      h1="Privacy Policy"
      description={DESCRIPTION}
      schemaType="WebPage"
      showUpdated
      toc={SECTIONS.map(([id, t]) => ({ id, title: t }))}
      intro={
        <p>
          This policy explains what information {siteConfig.name} collects when you visit this website, rate a dish, or
          contact us, how we use it, and the choices you have.
        </p>
      }
    >
      <InfoSection id="introduction" title={title.introduction}>
        <p>
          {siteConfig.name} is an independent informational website about the Olive Garden menu for diners in the United
          States. We are not Olive Garden or Darden Restaurants, Inc., and this policy covers only this website. You can
          read most of the site without giving us any information: there are no user accounts, no sign-ups, and no
          payments.
        </p>
        <p>
          We collect a small amount of information when you choose to rate a dish or send us a message, and our service
          providers process technical information needed to deliver the website. This policy describes those cases as
          they work today.
        </p>
      </InfoSection>

      <InfoSection id="information-we-collect" title={title["information-we-collect"]}>
        <InfoSubheading>When you rate a dish</InfoSubheading>
        <ul className="list-disc space-y-2 pl-6 marker:text-brand-dark">
          <li>
            A random visitor identifier, stored in a cookie on your browser (see{" "}
            <InfoLink href="#cookies">Cookies</InfoLink>).
          </li>
          <li>
            In our ratings database: a one-way keyed hash of that identifier, the dish you rated, your star rating (1 to
            5), and the dates and times the rating was created and last changed.
          </li>
          <li>
            For abuse protection: short-lived counters linked to a keyed hash of your visitor identifier and to a keyed
            hash of your IP address combined with the current date. Your IP address itself is not stored in our
            database.
          </li>
        </ul>
        <InfoSubheading>When you use the contact form</InfoSubheading>
        <ul className="list-disc space-y-2 pl-6 marker:text-brand-dark">
          <li>Your name, email address, the subject you choose, and your message.</li>
          <li>The date and time you sent it, which we add to the email.</li>
          <li>
            Your IP address, used briefly in server memory to limit how many messages can be sent in a short time. It is
            not saved by the website.
          </li>
        </ul>
        <InfoSubheading>When you visit any page</InfoSubheading>
        <p>
          Like any website, our hosting provider receives technical information with each request, such as your IP
          address, browser and device type, the page requested, the referring page, and the time. This is needed to
          deliver pages, keep the site secure, and fix errors, and it is handled under the hosting provider&apos;s
          policies (see <InfoLink href="#third-party-services">Third-Party Services</InfoLink>).
        </p>
        <p>
          We do not ask for sensitive information, and we do not keep a record of which menu pages you read. Please do
          not include sensitive personal details (for example health or financial information) in a contact message.
        </p>
      </InfoSection>

      <InfoSection id="how-we-use-information" title={title["how-we-use-information"]}>
        <ul className="list-disc space-y-2 pl-6 marker:text-brand-dark">
          <li>To show average ratings and vote counts, and to let you change your own rating instead of adding a second one.</li>
          <li>To limit automated or repeated voting and messaging, and to protect the website from abuse.</li>
          <li>To read and answer your messages, including corrections to menu information.</li>
          <li>To operate, secure, and troubleshoot the website.</li>
        </ul>
        <p>
          We do not sell your personal information, and we do not use it to build advertising profiles. We do not send
          marketing emails or add you to a mailing list.
        </p>
      </InfoSection>

      <InfoSection id="cookies" title={title.cookies}>
        <p>The website currently sets one cookie, and only after you submit a rating:</p>
        <div className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[36rem] border-collapse text-left text-[0.95rem] leading-6">
            <caption className="sr-only">Cookies used by this website</caption>
            <thead className="bg-brand-tint text-ink">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Name</th>
                <th scope="col" className="px-4 py-3 font-semibold">Purpose</th>
                <th scope="col" className="px-4 py-3 font-semibold">Type</th>
                <th scope="col" className="px-4 py-3 font-semibold">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-line align-top">
                <td className="px-4 py-3 font-mono text-sm">og_rv</td>
                <td className="px-4 py-3">
                  Holds a random, signed visitor identifier so that each browser has one rating per dish and can change it.
                  Set by our server; it cannot be read by page scripts (HttpOnly), is sent only over secure connections, and
                  only to this website (SameSite=Strict).
                </td>
                <td className="px-4 py-3">Functional (first-party)</td>
                <td className="px-4 py-3">Up to 400 days</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          We do not use analytics or advertising cookies today. Fonts and images are served from our own website, so
          reading a page does not load files from font or ad providers. If you delete or block the cookie, the site still
          works; a new rating will simply be counted as coming from a new visitor.
        </p>
        <p>
          If we add advertising or analytics in the future, those services may set their own cookies or use similar
          technologies. We will update this policy, and ask for consent where the law requires it, before they are used.
        </p>
      </InfoSection>

      <InfoSection id="menu-ratings" title={title["menu-ratings"]}>
        <p>
          Ratings are anonymous in the sense that we never ask for your name or email address to rate a dish. They are
          not completely anonymous, though: the hashed visitor identifier is linked to the cookie in your browser, so it
          works as a pseudonymous identifier for that browser. We treat it as personal information.
        </p>
        <p>
          Ratings are stored by our database provider, Supabase, in the United States. Visitors and page scripts can only
          read averages and vote counts; individual ratings and identifiers are accessible only to our server through
          protected database functions. Database access keys are kept on the server and are never sent to your browser.
        </p>
        <p>
          The average and number of ratings for each dish are shown publicly. Your individual rating is not shown or
          linked to you on the site.
        </p>
      </InfoSection>

      <InfoSection id="contact-form" title={title["contact-form"]}>
        <p>
          Messages sent through our <InfoLink href="/contact-us">contact form</InfoLink> are not stored in a website
          database. Our server checks the message and passes your name, email address, subject, message, and the time
          sent to our email delivery provider, Resend, which sends it to our mailbox. Your email address is added as the
          reply-to address so we can answer you.
        </p>
        <p>
          We use your message only to respond to you. Under normal circumstances we keep contact messages in our mailbox
          for up to 12 months after we receive them and then delete them. We may keep a message longer while your inquiry
          is still open or when we need it to meet a legal obligation. The email delivery and mailbox providers keep their
          own technical records, such as delivery logs, according to their policies. If you email us directly, the same
          applies.
        </p>
      </InfoSection>

      <InfoSection id="third-party-services" title={title["third-party-services"]}>
        <p>These providers process information on our behalf to run the website:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-brand-dark">
          <li>
            <strong className="font-semibold">Vercel</strong> (website hosting and content delivery): processes request
            data such as IP addresses to serve pages. <InfoLink href="https://vercel.com/legal/privacy-policy">Vercel privacy policy</InfoLink>
          </li>
          <li>
            <strong className="font-semibold">Supabase</strong> (database for menu ratings): stores the rating data
            described above. <InfoLink href="https://supabase.com/privacy">Supabase privacy policy</InfoLink>
          </li>
          <li>
            <strong className="font-semibold">Resend</strong> (email delivery for the contact form): receives the contents
            of contact messages to deliver them. <InfoLink href="https://resend.com/legal/privacy-policy">Resend privacy policy</InfoLink>
          </li>
          <li>
            <strong className="font-semibold">Hostinger</strong> (our email mailbox): stores the emails we receive.{" "}
            <InfoLink href="https://www.hostinger.com/legal/privacy-policy">Hostinger privacy policy</InfoLink>
          </li>
        </ul>
        <p>
          Our pages link to Olive Garden&apos;s official website and other external sites. When you follow those links,
          their own privacy policies apply.
        </p>
      </InfoSection>

      <InfoSection id="advertising" title={title.advertising}>
        <p>
          <strong className="font-semibold">This website does not show ads at this time.</strong> We plan to apply to
          Google AdSense in the future. Before any ads appear, we will update this policy. When ads are shown, the
          following will apply:
        </p>
        <ul className="list-disc space-y-2 pl-6 marker:text-brand-dark">
          <li>Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website and other websites.</li>
          <li>
            Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visits to this
            and other sites on the internet. Ads may be personalized or non-personalized; non-personalized ads are based
            on context such as the page content and your general location.
          </li>
          <li>
            You can opt out of personalized advertising in Google&apos;s{" "}
            <InfoLink href="https://myadcenter.google.com/">My Ad Center</InfoLink>, and opt out of some third-party
            vendors&apos; use of cookies for personalized advertising at{" "}
            <InfoLink href="https://www.aboutads.info/choices/">aboutads.info</InfoLink>.
          </li>
          <li>
            Learn{" "}
            <InfoLink href="https://policies.google.com/technologies/partner-sites">
              how Google uses information from sites or apps that use its services
            </InfoLink>{" "}
            and <InfoLink href="https://policies.google.com/technologies/ads">how Google uses cookies in advertising</InfoLink>.
          </li>
          <li>
            Where the law requires it (for example for visitors in the European Economic Area, the United Kingdom, and
            Switzerland), we will ask for your consent through a consent tool before personalized ads or related cookies
            are used. We plan to use Google&apos;s own consent tool for this, and we will describe it here when it is
            active.
          </li>
        </ul>
      </InfoSection>

      <InfoSection id="analytics" title={title.analytics}>
        <p>
          We do not use analytics services at this time, so we do not track how individual visitors move through the
          site. We may add a service such as Google Analytics or Microsoft Clarity later to understand which pages are
          useful. If we do, we will update this policy first, describe what the service collects, and ask for consent
          where required.
        </p>
      </InfoSection>

      <InfoSection id="retention-security" title={title["retention-security"]}>
        <ul className="list-disc space-y-2 pl-6 marker:text-brand-dark">
          <li>Ratings and their hashed identifiers have no fixed expiration date. We delete a rating when we receive a legitimate deletion request that we can match to it, and we may remove ratings that appear automated, manipulated, or abusive.</li>
          <li>Rating abuse counters are short-lived: entries older than about two days are deleted automatically when new ratings are processed.</li>
          <li>The rating cookie stays in your browser for up to 400 days unless you delete it.</li>
          <li>The contact form&apos;s IP-based limit is kept only in server memory, for up to about ten minutes.</li>
          <li>Contact messages are kept in our mailbox for up to 12 months under normal circumstances, longer only for open inquiries or legal obligations; provider logs are kept according to each provider&apos;s policy.</li>
        </ul>
        <p>
          We protect information with encrypted connections (HTTPS), keyed one-way hashing of identifiers, database access
          rules that block direct public access, and secret keys that stay on the server. No method of storage or
          transmission is completely secure, so we cannot guarantee absolute security.
        </p>
      </InfoSection>

      <InfoSection id="your-rights" title={title["your-rights"]}>
        <p>
          Depending on where you live, you may have rights over your personal information, such as asking to access,
          correct, or delete it, or objecting to certain uses. Whether a specific law applies depends on your location and
          on the circumstances. Regardless, we will respond to reasonable privacy requests.
        </p>
        <ul className="list-disc space-y-2 pl-6 marker:text-brand-dark">
          <li><strong className="font-semibold">Ratings:</strong> you can change your rating at any time by choosing different stars. Because ratings are stored only under a hashed identifier, we may need information from the cookie in your browser to find your rating if you ask us to delete it; we will explain how when you contact us.</li>
          <li><strong className="font-semibold">Cookies:</strong> you can delete or block cookies in your browser settings.</li>
          <li><strong className="font-semibold">Contact messages:</strong> you can ask us to delete messages you sent.</li>
        </ul>
        <p>
          To make a request, use our <InfoLink href="/contact-us">Contact Us</InfoLink> page and choose &ldquo;Other&rdquo;
          as the subject. We may need to confirm that a request comes from you before acting on it.
        </p>
      </InfoSection>

      <InfoSection id="childrens-privacy" title={title["childrens-privacy"]}>
        <p>
          This website provides general menu information for a general audience. Our{" "}
          <InfoLink href="/kids-meal">kids menu page</InfoLink> is written for parents and other adults planning a meal;
          the site is not directed to children under 13. We do not knowingly collect personal information from children
          under 13, and we do not ask for anyone&apos;s age. If you believe a child has sent us personal information,
          please contact us and we will delete it.
        </p>
      </InfoSection>

      <InfoSection id="international" title={title.international}>
        <p>
          This website is intended for visitors in the United States. Rating data is stored in the United States, and our
          other providers may process information in the United States and in other countries where they operate (for
          example, a hosting provider may serve pages from a location close to you). If you visit from outside the United
          States, your information will be processed in the United States and those other locations.
        </p>
      </InfoSection>

      <InfoSection id="changes" title={title.changes}>
        <p>
          We will update this policy when our practices change, for example before adding advertising or analytics. The
          effective date and the &ldquo;Last updated&rdquo; date at the top of this page show which version applies and
          when it was last revised. Please check this page from time to time.
        </p>
      </InfoSection>

      <InfoSection id="contact-us" title={title["contact-us"]}>
        <p>
          Questions about this policy or your information? Send us a message on our{" "}
          <InfoLink href="/contact-us">Contact Us</InfoLink> page
          {email ? (
            <>
              {" "}
              or email <InfoLink href={`mailto:${email}`}>{email}</InfoLink>
            </>
          ) : null}
          .
        </p>
      </InfoSection>
    </InfoPageLayout>
  );
}
