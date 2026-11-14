# Privacy Data Inventory

**Checked:** 2026-11-14 (Lesson 9.6), from the code and configuration (no secret values were read).

This file is the source for `/privacy-policy`. **Update this file and the policy before changing any data practice**, for example before adding ads, analytics, new cookies, a newsletter, or new providers.

## 1. Data the website processes

| Data | When | Where / who | Stored? | Retention | Source in code |
|---|---|---|---|---|---|
| Random visitor id (128-bit, signed) | First rating submitted | Cookie `og_rv` in the visitor's browser | Browser only; the raw id is never stored server-side | Up to 400 days (`VISITOR_COOKIE_MAX_AGE`) | `lib/rating-visitor.ts`, `app/api/ratings/vote/route.ts` |
| Visitor hash = HMAC-SHA256(`RATING_HASH_SECRET`, id) | Each rating | Supabase `ratings_private.votes.visitor_hash` | Yes | No fixed expiration (owner decision 2026-11-14); manual deletion on request or for moderation (§5) | same + `supabase/migrations/001_create_ratings.sql` |
| Rating value 1-5, product id, rating key | Each rating | Supabase `votes` | Yes | as above | same |
| Rating timestamps `created_at`, `updated_at` | Each rating / change | Supabase `votes` | Yes | as above | migration |
| Per-dish totals (count, sum) | Trigger on votes | Supabase `summaries`; public as average + count only | Yes | as above | migration |
| Rate-limit counters: `v:<visitor hash>` and `n:<HMAC(IP + UTC date)>`, hourly windows | Each rating write | Supabase `rate_limits` | Yes (no raw IP) | Rows older than 2 days are deleted inside `submit_rating` (only when ratings are submitted) | migration line ~254 |
| Client IP (rating) | Each rating write | Server memory only, to compute the daily network hash; on Vercel taken from platform headers | No | Request lifetime | `trustedClientIp()` |
| Contact name, email, subject, message, submission time | Contact form sent | Server → Resend → mailbox (Hostinger, per the domain's MX records) | Not in any website database; yes in Resend's records and the mailbox | Mailbox: up to 12 months, manual monthly deletion (§5); Resend: per Resend's policy (**not verified**) | `app/api/contact/route.ts`, `lib/contact-email.ts` |
| Client IP (contact rate limit) | Contact form sent | Server memory map | No | Up to 10 minutes per instance | `app/api/contact/route.ts` |
| Request data (IP, user agent, URL, referrer, time) | Every request | Vercel (hosting, after deployment) | Vercel logs | Per Vercel's policy (**not verified**) | Platform |
| Server error logs | Errors only | Vercel logs | Status codes and provider error names only; never message content, names, or emails | Per Vercel | `console.error` calls |

**Not collected:** accounts, passwords, payments, precise location, analytics events, advertising identifiers, newsletter sign-ups, user-generated text (other than contact messages), age.

## 2. Cookies and similar technologies

| Name | Party | Purpose | Category | Attributes | Duration |
|---|---|---|---|---|---|
| `og_rv` | First-party | One rating per browser per dish; lets the visitor change their rating | Functional (set only after a rating is submitted) | HttpOnly, Secure, SameSite=Strict, Path=/ | 400 days |

- **No** other cookies, no `localStorage`, `sessionStorage`, or IndexedDB (searched the code: 0 uses).
- **No** third-party scripts: fonts are self-hosted by `next/font` at build time, images are served from our own domain, and there is no analytics, ads, or tag manager.
- The browser HTTP cache (static files, `/api/ratings` for up to 60 s at the CDN) is not personal data.

## 3. Service providers

| Provider | Status | Role | Data | Region | Policy |
|---|---|---|---|---|---|
| Vercel | **Planned host** (not deployed yet) | Hosting, CDN, logs | Request data | Global edge; region of functions **to verify** | https://vercel.com/legal/privacy-policy |
| Supabase | **Active** | Ratings database | §1 rating rows | **United States** (owner-confirmed 2026-11-14) | https://supabase.com/privacy |
| Resend | **Active** (local test done) | Contact email delivery | Contact fields + time | **To verify** | https://resend.com/legal/privacy-policy |
| Hostinger | **Active** (MX records) | Mailbox for `contact@` | Received emails | **To verify** | https://www.hostinger.com/legal/privacy-policy |
| Google AdSense | **Planned, not installed** | Advertising | Cookies, device and IP data (via Google) | — | https://policies.google.com/technologies/partner-sites |
| Google Analytics / Microsoft Clarity | **Planned, not installed** | Analytics / session replay | Usage data | — | before activation |

## 4. Open questions (owner decisions)

1. ~~Contact email retention~~: decided (12 months, §5).
2. ~~Ratings retention~~: decided (no fixed expiration, §5).
3. Verify the Resend and Hostinger data regions, and the Vercel function region after deployment.
4. If analytics or ads are added: which consent tool and which regions (see `GOOGLE_ADSENSE_COMPLIANCE_CHECKLIST.md`).
5. A formal legal review of the policy text before launch (owner recommendation 2026-11-14; we did not claim compliance with any specific law).

## 5. Owner retention decisions (2026-11-14) and the actual processes

| Data | Decision | Process | Implemented? |
|---|---|---|---|
| Contact emails (mailbox) | Keep up to **12 months** under normal circumstances. Keep longer only for an open inquiry or a legal obligation | **Manual.** Once a month, the owner opens the mailbox (Hostinger webmail for `contact@olivegardenmenuprices.us`): (1) mark messages for open inquiries or legal holds with a label/folder such as "Keep"; (2) delete all other contact-form messages and replies older than 12 months; (3) empty Trash/Deleted. Optional: a mailbox rule that files contact-form emails (subject starts with `[Olive Garden Menu Prices]`) into one folder | **Defined, not automated.** It works only if the owner does the monthly review: set a recurring calendar reminder. The first messages turn 12 months old in **November 2027** (the first message was received 2026-11-14) |
| Contact emails (Resend records) | Not under our control | Kept according to Resend's policy and plan. Do not promise deletion there | Provider-controlled (**retention period not verified**) |
| Ratings (Supabase) | **No fixed expiration**. Delete on a legitimate request; remove for moderation | **Manual, tools exist.** Deletion request: (1) the visitor copies the `og_rv` cookie value from their browser (DevTools → Application → Cookies); (2) the owner runs `npm run rating:visitor-hash -- "<value>"` locally (offline; checks the signature and prints the 64-hex hash); (3) in the Supabase SQL Editor, list and then delete that visitor's rows: `select id, product_id, rating, created_at from ratings_private.votes where visitor_hash = '<hash>';` then `delete from ratings_private.votes where visitor_hash = '<hash>';` The summary trigger corrects the totals. Moderation (spam or abuse): identify rows by product and time pattern, check them with `select`, delete with the same kind of filtered `delete`, then check the totals (`RATING_SYSTEM.md` §9.3) | **Tools and SQL exist; no request handled yet.** No automatic deletion. A visitor without the cookie cannot be matched (the Privacy Policy says so) |
| Rate-limit counters | About 2 days | Automatic inside `submit_rating` (deletes rows older than 2 days when ratings are submitted) | **Implemented** (runs only when ratings arrive) |
| `og_rv` cookie | 400 days | Browser expiry | **Implemented** |

