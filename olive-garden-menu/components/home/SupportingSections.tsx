import Link from "next/link";
import type { ReactNode } from "react";
import type { MenuOffering } from "@/lib/types";
import { formatMonthYear } from "@/lib/format";
import { siteConfig } from "@/lib/site";
import { getMenuCategory, menuCategoryPath } from "@/lib/content";
import { offeringValues } from "@/lib/menu-display";
import {
  deals,
  dealsCheckedAt,
  holidayIntro,
  holidayNote,
  holidayRows,
  homepageFaqs,
  homepageSources,
  methodNotes,
  hoursCheckedAt,
  hoursNotes,
  nutritionParagraphs,
  nutritionResources,
  officialLinks,
  officialResourceLinks,
  orderNote,
  orderSteps,
  popularIntro,
  savingsTips,
  weeklyHours,
} from "@/content/home/homepage";
import Container from "@/components/layout/Container";
import ExternalLink from "@/components/ui/ExternalLink";
import MenuItemCard from "@/components/menu/MenuItemCard";
import JsonLd from "@/components/seo/JsonLd";

/* ---------- Shared building blocks ---------- */

function HomeSection({
  id,
  title,
  intro,
  tinted = false,
  children,
}: {
  id: string;
  title: string;
  intro?: ReactNode;
  tinted?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`scroll-mt-4 border-t border-line py-10 md:py-14 ${tinted ? "bg-brand-tint/60" : ""}`}
    >
      <Container>
        <h2 id={`${id}-heading`} className="max-w-3xl font-display text-2xl font-bold text-ink sm:text-3xl">
          {title}
        </h2>
        {intro && <div className="mt-3 max-w-3xl leading-7 text-muted">{intro}</div>}
        <div className="mt-6">{children}</div>
      </Container>
    </section>
  );
}

/** Scrollable wrapper so wide tables never cause horizontal page overflow. */
function TableWrap({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      className="overflow-x-auto rounded-xl border border-line bg-white focus-visible:outline-2 focus-visible:outline-brand-dark"
    >
      {children}
    </div>
  );
}

const th = "px-4 py-2.5 font-semibold";
const td = "px-4 py-2.5 align-top";

function Checked({ date }: { date: string }) {
  return (
    <p className="mt-3 text-sm text-muted">
      Verified <time dateTime={date}>{formatMonthYear(date)}</time> on Olive Garden&rsquo;s official website.
    </p>
  );
}

/* ---------- 7. Popular Menu Items ---------- */

export function PopularSection({ offerings }: { offerings: MenuOffering[] }) {
  return (
    <HomeSection id="popular-menu-items" title="Olive Garden Popular Menu Items" intro={<p>{popularIntro}</p>}>
      <ul className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-4 md:grid-cols-3">
        {offerings.map((offering) => (
          <MenuItemCard key={offering.id} offering={offering} />
        ))}
      </ul>
    </HomeSection>
  );
}

/* ---------- 8. Lunch Specials & Deals ---------- */

export function DealsSection() {
  return (
    <HomeSection
      id="lunch-specials-deals"
      title="Olive Garden Lunch Specials & Deals"
      tinted
      intro={
        <p>
          The current offers at a glance. Promotional prices are kept apart from regular menu prices, and deals can
          end or differ by restaurant, so check before you order.
        </p>
      }
    >
      <TableWrap label="Olive Garden lunch specials and deals">
        <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
          <caption className="sr-only">Current Olive Garden deals with price, timing, and conditions</caption>
          <thead className="bg-brand-tint text-ink">
            <tr>
              <th scope="col" className={th}>Deal</th>
              <th scope="col" className={th}>Price</th>
              <th scope="col" className={th}>When</th>
              <th scope="col" className={th}>Good to know</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal) => (
              <tr key={deal.name} className="border-t border-line">
                <th scope="row" className={`${td} font-semibold text-ink`}>
                  <ExternalLink href={deal.sourceUrl} className="font-semibold">
                    {deal.name}
                  </ExternalLink>
                </th>
                <td className={`${td} font-semibold whitespace-nowrap text-ink tabular-nums`}>{deal.price}</td>
                <td className={`${td} text-ink`}>{deal.when}</td>
                <td className={`${td} leading-6 text-muted`}>{deal.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>
      <p className="mt-3 text-sm text-muted">
        Prices are online pickup prices from Olive Garden&rsquo;s official website. {siteConfig.locationNotice}
      </p>
      <Checked date={dealsCheckedAt} />
      <ul className="mt-5 max-w-3xl list-disc space-y-2 pl-5 leading-7 text-muted marker:text-brand-dark">
        {savingsTips.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
    </HomeSection>
  );
}

/* ---------- 9. Hours ---------- */

export function HoursSection() {
  return (
    <HomeSection
      id="hours"
      title="Olive Garden Hours — Opening & Closing Times"
      intro={
        <p>
          Opening hours we verified at one Olive Garden restaurant in the {siteConfig.market}. Hours are set by each
          restaurant, so yours may differ. Lunch is served on weekdays; on weekends the dinner menu runs all day.
        </p>
      }
    >
      <TableWrap label="Weekly opening hours">
        <table className="w-full min-w-[30rem] border-collapse text-left text-sm">
          <caption className="sr-only">Olive Garden weekly hours at one U.S. restaurant</caption>
          <thead className="bg-brand-tint text-ink">
            <tr>
              <th scope="col" className={th}>Day</th>
              <th scope="col" className={th}>Open – close</th>
              <th scope="col" className={th}>Lunch menu</th>
              <th scope="col" className={th}>Online ordering</th>
            </tr>
          </thead>
          <tbody>
            {weeklyHours.map((row) => (
              <tr key={row.day} className="border-t border-line">
                <th scope="row" className={`${td} font-semibold text-ink`}>{row.day}</th>
                <td className={`${td} whitespace-nowrap text-ink`}>{row.open}</td>
                <td className={`${td} text-ink`}>{row.lunch}</td>
                <td className={`${td} whitespace-nowrap text-ink`}>{row.online}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>
      <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 leading-7 text-muted marker:text-brand-dark">
        {hoursNotes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-muted">
        Source: Olive Garden&rsquo;s official restaurant pages, verified{" "}
        <time dateTime={hoursCheckedAt}>{formatMonthYear(hoursCheckedAt)}</time>. Find your own restaurant&rsquo;s hours
        with the <ExternalLink href={officialLinks.locator}>official restaurant locator</ExternalLink>.
      </p>
    </HomeSection>
  );
}

/* ---------- 10. Holiday Hours ---------- */

export function HolidaySection() {
  return (
    <HomeSection id="holiday-hours" title="Olive Garden Holiday Hours" tinted intro={<p>{holidayIntro}</p>}>
      <TableWrap label="Holiday hours">
        <table className="w-full min-w-[26rem] border-collapse text-left text-sm">
          <caption className="sr-only">Upcoming holidays and what is known about Olive Garden hours</caption>
          <thead className="bg-brand-tint text-ink">
            <tr>
              <th scope="col" className={th}>Holiday</th>
              <th scope="col" className={th}>Date</th>
              <th scope="col" className={th}>Hours</th>
            </tr>
          </thead>
          <tbody>
            {holidayRows.map((row) => (
              <tr key={row.holiday} className="border-t border-line">
                <th scope="row" className={`${td} font-semibold text-ink`}>{row.holiday}</th>
                <td className={`${td} whitespace-nowrap text-ink`}>{row.date}</td>
                <td className={td}>
                  <span className={row.confirmed ? "font-semibold text-ink" : "text-muted"}>{row.status}</span>
                  <span className="block text-xs text-muted">
                    {row.confirmed ? "Confirmed by Olive Garden" : "Check with your restaurant"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>
      <p className="mt-4 max-w-3xl leading-7 text-muted">{holidayNote}</p>
      <p className="mt-3 text-sm text-muted">
        Source: <ExternalLink href={officialLinks.faqs}>Olive Garden FAQs</ExternalLink>, verified{" "}
        <time dateTime={hoursCheckedAt}>{formatMonthYear(hoursCheckedAt)}</time>.
      </p>
    </HomeSection>
  );
}

/* ---------- 11. Nutrition ---------- */

export function NutritionSection({ lowerCalorie }: { lowerCalorie: MenuOffering[] }) {
  return (
    <HomeSection id="nutrition" title="Olive Garden Nutrition & Dietary Options">
      <div className="max-w-3xl space-y-4 leading-7 text-muted">
        {nutritionParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-6">
        <TableWrap label="Lower-calorie choices">
          <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
            <caption className="px-4 pt-3 pb-2 text-left font-display text-base font-bold text-ink">
              Lower-calorie choices (soup or salad and breadsticks not included)
            </caption>
            <thead className="bg-brand-tint text-ink">
              <tr>
                <th scope="col" className={th}>Item</th>
                <th scope="col" className={th}>Menu section</th>
                <th scope="col" className={`${th} text-right`}>Calories</th>
                <th scope="col" className={`${th} text-right`}>Price</th>
              </tr>
            </thead>
            <tbody>
              {lowerCalorie.map((offering) => {
                const values = offeringValues(offering);
                const category = getMenuCategory(offering.categoryId);
                return (
                  <tr key={offering.id} className="border-t border-line">
                    <th scope="row" className={`${td} font-semibold text-ink`}>{offering.displayName}</th>
                    <td className={`${td} text-muted`}>
                      {category && <a href={`#${category.slug}`} className="text-brand-dark underline underline-offset-4">{category.name}</a>}
                    </td>
                    <td className={`${td} text-right whitespace-nowrap text-ink tabular-nums`}>{values.calories}</td>
                    <td className={`${td} text-right whitespace-nowrap text-ink tabular-nums`}>{values.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableWrap>
        <p className="mt-2 text-sm text-muted">
          &ldquo;Lower-calorie&rdquo; only means fewer calories than most entrées on this menu. It is not a health
          or diet claim.
        </p>
      </div>

      <p className="mt-6 font-semibold text-ink">Official nutrition and allergen resources</p>
      <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
        {nutritionResources.map((link) => (
          <li key={link.href}>
            <ExternalLink href={link.href}>{link.label}</ExternalLink>
          </li>
        ))}
      </ul>
    </HomeSection>
  );
}

/* ---------- 12. How to order online ---------- */

export function OrderOnlineSection() {
  return (
    <HomeSection
      id="order-online"
      title="How to Order Olive Garden Online"
      tinted
      intro={<p>Ordering takes a few minutes on Olive Garden&rsquo;s own website. Here is the short version.</p>}
    >
      <ol className="max-w-3xl space-y-3">
        {orderSteps.map((step, index) => (
          <li key={step} className="flex gap-3 leading-7 text-ink">
            <span
              aria-hidden="true"
              className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-dark text-sm font-bold text-white"
            >
              {index + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
      <p className="mt-4 max-w-3xl leading-7 text-muted">{orderNote}</p>
      <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
        <ExternalLink href={officialLinks.orderOnline}>Official ordering page</ExternalLink>
        <ExternalLink href={officialLinks.locator}>Find a restaurant</ExternalLink>
        <ExternalLink href={officialLinks.catering}>Catering</ExternalLink>
      </p>
    </HomeSection>
  );
}

/* ---------- 13. FAQ ---------- */

export function FaqSection() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homepageFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <HomeSection id="faq" title="Frequently Asked Questions">
      <div className="max-w-3xl divide-y divide-line rounded-xl border border-line bg-white">
        {homepageFaqs.map((faq) => (
          <details key={faq.question} className="group px-5 py-3">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink focus-visible:outline-2 focus-visible:outline-brand-dark">
              {faq.question}
              <span aria-hidden="true" className="text-xl text-brand-dark transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-1 pb-2 leading-7 text-muted">
              {faq.answer}
              {faq.link && (
                <>
                  {" "}
                  <Link
                    href={faq.link.href}
                    className="font-medium text-brand-dark underline underline-offset-4 hover:text-brand-darker focus-visible:outline-2 focus-visible:outline-brand-dark"
                  >
                    {faq.link.text}
                  </Link>
                </>
              )}
            </p>
          </details>
        ))}
      </div>
      <JsonLd data={faqJsonLd} />
    </HomeSection>
  );
}

/* ---------- 14. Important links ---------- */

export function ImportantLinks({ categoryPages }: { categoryPages: { slug: string; name: string }[] }) {
  return (
    <nav aria-label="Helpful links" className="border-t border-line py-10">
      <Container className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="font-display text-lg font-bold text-ink">Menu category guides</p>
          <ul className="mt-3 space-y-1">
            {categoryPages.map((page) => (
              <li key={page.slug}>
                <Link
                  href={menuCategoryPath(page.slug)}
                  className="inline-flex min-h-11 items-center font-medium text-brand-dark underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-brand-dark"
                >
                  {page.name} menu with prices
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-sm text-muted">More category guides are added as they are completed.</p>
        </div>
        <div>
          <p className="font-display text-lg font-bold text-ink">Official Olive Garden resources</p>
          <ul className="mt-3 grid gap-x-6 sm:grid-cols-2">
            {officialResourceLinks.map((link) => (
              <li key={link.href} className="flex min-h-11 items-center">
                <ExternalLink href={link.href}>{link.label}</ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </nav>
  );
}

/* ---------- 15. Sources ---------- */

export function SourcesList() {
  return (
    <section id="sources" aria-label="Sources and how we check prices" className="scroll-mt-4 border-t border-line bg-brand-tint/60 py-8">
      <Container>
        <p className="font-display text-lg font-bold text-ink">How we check prices and calories</p>
        <ul className="mt-3 max-w-3xl list-disc space-y-2 pl-5 text-sm leading-6 text-muted marker:text-brand-dark">
          {methodNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
        <p className="mt-6 font-display text-lg font-bold text-ink">Sources</p>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
          {homepageSources.map((source) => (
            <li key={source.href}>
              <ExternalLink href={source.href}>{source.label}</ExternalLink>
              <span className="block">{source.note}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-6 text-muted">
          No third-party (estimated) values are used on this page. Our research notes record the source and check
          date of every value.
        </p>
      </Container>
    </section>
  );
}
