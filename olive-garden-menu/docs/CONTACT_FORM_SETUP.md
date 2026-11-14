# Contact Form Setup

**Status:** 2026-11-14 (Lesson 9.5.4). **Configured locally and tested end to end.** Resend is set up in `.env.local`, one test email reached the owner's inbox, and Reply-To was checked. `/contact-us` is `published` (still `noindex` while `SITE_INDEXING` is off) and shows `contact@olivegardenmenuprices.us`. **Vercel still needs the same three variables before deployment** (§3).

_Lesson 9.5 history: the code was built and tested with the form switched off and the API answering `503 not_configured`._

## 1. How it works

```
/contact-us  ContactForm (browser): same validation as the server, honeypot field, form-start time
   -> POST /api/contact (JSON, same origin)
        1. Same-origin check (Origin + Sec-Fetch-Site)             else 403 forbidden
        2. JSON only, body <= 12 KB, an object                      else 400 invalid_request
        3. Honeypot "website" must be "" and the form must be 3 s-24 h old   else 400
        4. Shared validation (lib/contact.ts)                       else 400 + field messages
        5. Email configured? (RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL)   else 503 not_configured
        6. Rate limit: 5 per network per 10 min, 30 per hour per server instance      else 429 + Retry-After
        7. Send through Resend's HTTP API (lib/contact-email.ts, 10 s timeout)
           accepted -> 200 { ok: true } ; error/timeout -> 502 delivery_failed
```

The browser shows "Thank you, your message was sent" **only** after `ok: true`, which comes only after the email service accepted the message.

| File | Purpose |
|---|---|
| `lib/contact.ts` | Subjects, length limits, `validateContact()` (shared by the browser and the server) |
| `lib/contact-email.ts` | `server-only`; builds a plain-text email and calls Resend with `fetch` (no npm package) |
| `app/api/contact/route.ts` | The endpoint: protections 1-7 above |
| `components/contact/ContactForm.tsx` | The form: labels, errors, loading state, result message, honeypot |
| `content/site/info-pages.ts` | Page status (`preview` until email works) |
| `content/site/publisher.ts` | Contact address, shown only when `verified: true` |

## 2. Security

| Risk | Protection |
|---|---|
| Cross-site posting (CSRF) | Same-origin check (same rule as the rating vote API) |
| Email header injection | Name, email, and subject reject any control character (CR/LF). The subject must be one of 7 fixed values. The visitor's address goes only into the JSON `reply_to` field. The email subject is built server-side and line breaks are stripped. The email is plain text (no HTML field) |
| Spam | Honeypot field, 3-second minimum fill time, rate limits. The memory-based limit is per server instance, so it is a basic limit, not a guarantee. If spam becomes a problem, add Cloudflare Turnstile (free) after owner approval |
| Large or odd requests | 12 KB body limit, type checks, length limits (name 2-80, email up to 254, message 20-4,000) |
| Privacy | Messages are not stored (no database). Logs record only the delivery status code, never the name, email, or message. Responses use `Cache-Control: no-store` |
| Secrets | `RESEND_API_KEY` is server-only and never in the browser bundle (checked) |

## 3. Owner setup (Resend, free plan; not done yet)

1. Create a Resend account and add the domain `olivegardenmenuprices.us`. Add the DNS records Resend shows (SPF/DKIM, and optionally DMARC) at the domain registrar, then wait for "Verified".
2. Make sure the receiving inbox exists and receives mail, for example `contact@olivegardenmenuprices.us` via the registrar's email forwarding or a mailbox provider. Send it a test email from your own account.
3. In Resend create an API key with **Sending access** only (not full access).
4. Add these to `.env.local` (local) and Vercel → Settings → Environment Variables (Production; Sensitive):
   - `RESEND_API_KEY=re_...`
   - `CONTACT_TO_EMAIL=contact@olivegardenmenuprices.us` (or another inbox you read)
   - `CONTACT_FROM_EMAIL="Olive Garden Menu Prices <contact-form@olivegardenmenuprices.us>"` (on the verified domain)
5. Rebuild and redeploy (the page decides at build time whether the form is switched on).
6. Send one real test message from the live site and confirm it arrives. Reply to it and check that the reply goes to the sender.
7. Then:
   - set `publisher.contactEmail.verified = true` if the address should be shown
   - set `infoPages.contact.status = "published"`
   - update `LAUNCH_CHECKLIST.md`

Do not use any other email service or paid plan without owner approval.

## 4. Tests run (2026-11-14, local production builds)

| Suite | Result | Notes |
|---|---|---|
| API with a **mock** email service (`RESEND_API_URL` → local mock) | 37/37 | Covers: GET 405; cross-origin, missing Origin, cross-site 403; wrong type, bad JSON, array, > 12 KB 400; honeypot filled or missing 400; sent < 3 s 400; field errors (short or long name, CR/LF in name, email, or subject, 6 invalid emails, unknown subject, short or long message, control character, wrong types); no email sent for any rejected request; success → mock called once with the Bearer key, server-side `to`/`from`, `reply_to` = visitor, text only; mock error → 502; 6th+ request → 429 with Retry-After; no visitor data in the server log |
| API without email configured (real build) | 30/30 | Valid message → 503 `not_configured` |
| Browser, mock email (Edge, 320-1440 px) | 27/27 | Labels, 44 px+ fields, subject list, honeypot hidden and skipped by Tab, Tab order, empty submit (4 errors, focus on Name, no request), invalid email message, "Sending…" state, timeout and service error → error message with the text kept, success only after the mock accepted it, focus on the result message, no console errors |
| Browser, not configured | 20/20 | Submit disabled with explanation; email address not shown |

**Not tested:** real delivery through Resend (needs the owner's account, domain, and inbox). Do not treat the form as working until step 6 above is done.

## 5. Future Privacy Policy disclosures (for the Privacy Policy lesson)

- The contact form collects name, email, subject, and message. They are used only to answer the message and are sent by email through Resend (email processor). They are not stored in a database.
- Rate limiting uses the visitor's IP address in server memory for up to 10 minutes. It is not stored.
- The rating cookie `og_rv` and hashed votes (already listed in `LAUNCH_CHECKLIST.md`).
- Future analytics and ads (AdSense, GA4, Clarity) need their own disclosures and consent review.

## 6. Lesson 9.5.4: live configuration and end-to-end test (2026-11-14)

### Configuration (checked without showing any values)

| Item | Status |
|---|---|
| `RESEND_API_KEY` | Present in `.env.local`; Resend format (`re_…`); a **sending-only** key (the read-only domain API answers `401 restricted_api_key`, as expected for that key type) |
| `CONTACT_TO_EMAIL` | Present; an address on `olivegardenmenuprices.us` (MX: Hostinger mail) |
| `CONTACT_FROM_EMAIL` | Present; an address on the sending subdomain `mail.olivegardenmenuprices.us`. A plain address is wrapped as `Olive Garden Menu Prices <address>` |
| Sending domain DNS (public lookup) | DKIM `resend._domainkey.mail.olivegardenmenuprices.us` present; SPF + MX on `send.mail.olivegardenmenuprices.us` present; DMARC `p=none` on the root domain. The provider accepted the real send (HTTP 200), which it does only for a verified domain |
| `.env.local` | Git-ignored (`.gitignore:34 .env*`); no value appears in client bundles, `public/`, or tracked files (checked) |
| Resend SDK | **Not installed.** The documented REST endpoint is called with `fetch`, so no new dependency is needed (project rule) |
| Vercel | **Not done yet:** add the same three variables (Production, Sensitive), then deploy |

### Email format (`lib/contact-email.ts`)

- Fixed sender from the server config; the visitor is never the sender.
- Recipient only `CONTACT_TO_EMAIL`. Extra `to`/`from`/`cc`/`bcc` fields in a request are ignored (tested).
- `Reply-To` = the visitor's validated address.
- Subject: `[Olive Garden Menu Prices] <Subject> from <Name>`, with line breaks removed.
- Contents:
  - a plain-text part
  - a simple HTML part in which every visitor value is HTML-escaped
  - both show the name, email, subject, submission time (US Eastern + UTC ISO), and the message
- The UI says "your message was sent" only after the provider **accepted** the message (HTTP 2xx). Acceptance is not proof of inbox delivery; inbox delivery was confirmed once by the owner (below).

### Tests

| Test | Result |
|---|---|
| API with mock provider | 40/40: all earlier checks, plus escaped HTML, timestamp, fixed sender with the site name, and ignored `to`/`from`/`cc`/`bcc` |
| Browser with mock provider (320-1440 px) | 27/27, plus double-submit: a rapid triple click sends 1 request and 1 email |
| API with the real configuration (no email sent) | 29/29 rejection checks: cross-origin, missing Origin, type, size, honeypot, timing, invalid/empty fields, header injection, oversized message, GET 405 |
| **Real end-to-end (owner-approved, exactly 1 email)** | Sent from the local production build at 390 px: "Sending…" shown, 1 POST, API 200 (provider accepted), success message, form cleared. **Owner confirmed:** the email arrived in the **Inbox** (not spam), and **Reply goes to the visitor address** (the owner's Gmail, used with permission) |
| Provider failure | Mock 500 and a 10-second timeout → 502 `delivery_failed`, error message, text kept, no success (log shows the status and provider error name only) |
| Rate limiting | 6th request within 10 minutes → 429 with Retry-After (mock) |
| Responsive (real config) | 13/13: `/contact-us` and `/about-us` at 320/375/390/768/1024/1440 px, no overflow, email link visible, Send enabled (48 px), no console errors |
| Headers | Security headers present on `/contact-us`; cross-origin POST → 403 |

### Privacy disclosures for the Privacy Policy (actual processing)

- **Collected:** name, email address, subject, message, and the submission time (added to the email).
- **Purpose:** only to read and answer the message.
- **Processor:** Resend, Inc. (email delivery) sends the message to our inbox; the inbox is hosted by our email provider (Hostinger mail, per the domain's MX records).
- **Storage:** not stored by the website (no database). It exists in Resend's sending logs and in our mailbox; retention follows those services and our mailbox practice.
- **Network data:** the IP address is used only in server memory for the rate limit (up to 10 minutes) and is not stored. Logs never contain message content.
- No marketing list, no sharing or selling, no tracking on the form.

## 7. Privacy Policy (Lesson 9.6)

- The data processing in section 6 is now published in `/privacy-policy` (sections "Contact Form and Email Communications", "Third-Party Services", "Data Retention and Security").
- The form's privacy notice links to the Privacy Policy.
- Mailbox retention is still an owner decision (`PRIVACY_DATA_INVENTORY.md` §4).

## 8. Retention (owner decision 2026-11-14)

- Contact messages are kept in the mailbox for up to 12 months under normal circumstances. They are kept longer only for open inquiries or legal obligations.
- Deletion is a **manual monthly mailbox review** by the owner (`PRIVACY_DATA_INVENTORY.md` §5); nothing deletes them automatically.
- Resend keeps its own delivery records according to its policy.
