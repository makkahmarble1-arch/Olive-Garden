# Legal Pages Review

**Pages (Lesson 9.6, 2026-11-14):**
- `/privacy-policy`
- `/terms-and-conditions`
- `/disclaimer`

**Status:** `published` in `content/site/info-pages.ts`. They are still `noindex` like the whole site until `SITE_INDEXING=true`.

**Public dates (owner decision 2026-11-14):** the legal pages show **complete dates**: "Effective date: November 14, 2026 · Last updated: November 14, 2026" (`effectiveAt` / `updatedAt` in `content/site/info-pages.ts`). This is an exception for legal pages only; menu pages keep month-and-year verification labels. Change `updatedAt` (and `effectiveAt` for a new version) only when the text actually changes.

## Basis

- Written from the actual code and configuration (`PRIVACY_DATA_INVENTORY.md`), not from templates.
- No legal entity, business address, phone number, governing law, or jurisdiction is stated, because none has been supplied.
- The founder's name is not used anywhere.
- AdSense, Google Analytics, and Microsoft Clarity are described as **planned, not active**.

## Items for owner (and ideally legal) review

| # | Page | Item | Why |
|---|---|---|---|
| 1 | Privacy | Contact messages: up to 12 months, with exceptions for open inquiries and legal obligations | **Decided** 2026-11-14. The deletion process is manual (`PRIVACY_DATA_INVENTORY.md` §5) and the owner must actually follow it |
| 2 | Privacy | Ratings: no fixed expiration; deletion on legitimate request; moderation removal | **Decided** 2026-11-14 |
| 3 | Privacy | Vercel is named as the host before deployment | It becomes accurate at launch; recheck the wording then |
| 4 | Privacy | Provider regions (Resend, Hostinger, Vercel functions) are not named | Not verified; only the Supabase US region is confirmed by the owner |
| 5 | Privacy | Privacy rights wording is general ("depending on where you live") | Whether CCPA/CPRA, state laws, or GDPR apply depends on facts such as traffic and revenue thresholds, so no claim is made |
| 6 | All legal | Complete effective and updated dates | **Done** 2026-11-14 |
| 7 | Terms | No governing law or venue clause | None supplied; add one only with legal advice |
| 8 | Terms | The limitation-of-liability text is moderate and subject to applicable law | Avoids unenforceable blanket exclusions |
| 9 | Terms | Content owner named as "Olive Garden Menu Prices" (the site), not a person or company | No legal entity has been supplied |
| 10 | Disclaimer | **AI-generated illustrations disclosed** (owner decision 2026-11-14, Lesson 9.6) | This page only; cards stay unlabeled |
| 11 | All | Update before adding ads, analytics, a newsletter, or new providers | `GOOGLE_ADSENSE_COMPLIANCE_CHECKLIST.md` |

## Owner decision recorded

- **AI image disclosure (2026-11-14):** the Disclaimer page states that some food images are illustrations created with AI image-generation tools.
- This replaces the earlier "never mention AI" rule **for the Disclaimer page only**. No AI labels on cards or elsewhere.

## Professional legal review (owner recommendation, 2026-11-14)

- **Recommended before launch:** a qualified lawyer reviews all three pages, in particular:
  - which privacy laws apply (U.S. state laws such as CCPA/CPRA; GDPR/UK GDPR for visitors from those regions)
  - the limitation-of-liability wording
  - whether to add governing law and venue
  - the AdSense/consent text
- No governing law or jurisdiction is stated until that review gives one. None has been invented.

## Owner decision: no lawyer for now (2026-11-14)

- Professional legal and trademark review is **declined at this stage**.
- The pages remain written conservatively: no governing law, no guarantees, liability "to the extent permitted by applicable law".
- Brand-safety rules are in `PUBLISHER_IDENTITY.md`.
- Nothing here should be read as legal clearance. Reconsider a review if the site grows, starts earning significant revenue, or receives a complaint.
