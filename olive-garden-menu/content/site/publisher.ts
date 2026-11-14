/**
 * Who publishes this website (docs/PUBLISHER_IDENTITY.md).
 *
 * Owner decision (2026-11-14, after Lesson 9.8): the publisher is the
 * "Olive Garden Menu Prices Editorial Desk". No personal founder profile is
 * published: `founder` stays null and is not rendered anywhere. Never add a
 * real person's name, biography, photo, or credentials without the owner's
 * written confirmation that the person authorized it. The contact email is
 * shown only while `verified` is true.
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
