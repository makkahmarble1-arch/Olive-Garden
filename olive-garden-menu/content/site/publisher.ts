/**
 * Who publishes this website (docs/PUBLISHER_IDENTITY.md).
 *
 * Owner-approved (Lesson 9.5, 2026-11-14; editorial name updated in 9.5.4):
 * a real founder together with the "Olive Garden Menu Prices Editorial Desk".
 * A proposed founder name and role exist (docs/PUBLISHER_IDENTITY.md) but are
 * NOT published until the owner confirms authorization to use that real
 * person's identity and that the role is accurate. Nothing here may be invented:
 * the founder profile stays `null` until the owner supplies the exact public
 * name and biography, and the contact email is shown only after the owner
 * confirms the inbox exists and receives mail.
 */

export type FounderProfile = {
  /** Exact public name approved by the owner. */
  name: string;
  /** Public role, e.g. "Founder and editor". */
  role: string;
  /** Short biography, owner-approved paragraphs only (no invented credentials). */
  bio: string[];
};

export type PublisherIdentity = {
  /** Name used for articles and editorial notes. */
  editorialTeam: string;
  /** null = not supplied yet: the About page shows a "profile coming soon" note. */
  founder: FounderProfile | null;
  /** Public contact address. Shown only when `verified` is true. */
  contactEmail: { address: string; verified: boolean };
};

export const publisher: PublisherIdentity = {
  editorialTeam: "Olive Garden Menu Prices Editorial Desk",
  founder: null,
  // verified: owner confirmed inbox receipt of the end-to-end test (2026-11-14, Lesson 9.5.4).
  contactEmail: { address: "contact@olivegardenmenuprices.us", verified: true },
};

/** The contact email, or null while the inbox is not confirmed by the owner. */
export function publicContactEmail(): string | null {
  return publisher.contactEmail.verified ? publisher.contactEmail.address : null;
}
