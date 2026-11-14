# AdSense Activation Plan (future)

**Status:** not started. No ad, analytics, or consent script is on the site. **Approval is never guaranteed.** Google sets no published minimum for traffic, page count, or domain age in the sources reviewed (`GOOGLE_PUBLISHER_POLICY_AUDIT.md`), and none is assumed here. Re-read the official policies before each step.

## Phase 0: before launch (blockers)

1. Resolve the "NEEDS CORRECTION" items in `PRE_LAUNCH_COMPLIANCE_REPORT.md`:
   - the About Us founder placeholder
   - the GS Grilled Chicken Parmigiana photo
2. Manual official re-check of the time-sensitive menu facts (`LAUNCH_CHECKLIST.md` §2).
3. Run the dev test vote cleanup SQL.
4. Professional legal review of the legal pages and of the trademark risk of the domain and name (recommended).

## Phase 1: deployment and public access

1. In Vercel Production set:
   - `NEXT_PUBLIC_SITE_URL=https://olivegardenmenuprices.us`
   - the Supabase variables
   - `RATING_HASH_SECRET`
   - `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (Sensitive)
2. Deploy, then point the domain to Vercel; HTTPS should be active (check HSTS).
3. Live checks:
   - 25 pages 200, unknown URLs 404, `/menu` 308
   - security headers present
   - ratings load
   - one labeled contact-form test
4. Set `SITE_INDEXING=true` (owner approval). Check `robots.txt` (sitemap listed) and `sitemap.xml`:
   - the homepage, 17 categories, and published information pages are listed
   - About Us is listed only once it is published
5. Google Search Console: verify the domain, submit the sitemap, and inspect key URLs.
6. Update the Privacy Policy hosting wording, if needed, and the "Last updated" date.

## Phase 2: privacy and consent readiness

1. Verify that Google "Privacy & messaging" is still a Google-certified CMP with IAB TCF, and check the current regional requirements (EEA, UK, Switzerland, any new regions).
2. Decide on US state handling: Restricted Data Processing, and any opt-out message; legal advice recommended.
3. Plan the Content Security Policy for the ad and CMP domains (none exists today; keep the current headers). Check that `X-Frame-Options: SAMEORIGIN` and the Permissions-Policy do not block the ad iframes or features (ad features are already left open).
4. Prepare the Privacy Policy update (ads active; partners; consent tool). Publish it together with the ads, not before.

## Phase 3: AdSense site submission

1. Create or sign in to the AdSense account (owner, 18+, accurate details).
2. Add the site `olivegardenmenuprices.us`.
3. Add the **account-specific** verification: the AdSense code snippet and/or meta tag, or `ads.txt`, as the account shows it. **Never invent a publisher id.** Put it in `app/layout.tsx` only with owner approval. The `ads.txt` file goes in `public/`, and `proxy.ts` allows it automatically.
4. Request review and wait. Do not click your own ads or ask others to click.

## Phase 4: after approval

1. Turn on the Privacy & messaging message for the required regions and test it from those regions (VPN).
2. Choose ad placements:
   - only on content pages (homepage and category pages), not on About, Contact, legal, or editorial pages
   - never between a price table and its caption, and never looking like menu items or buttons
   - keep content above ads, so pages have more content than ads
   - measure CLS (reserve space for ad slots)
3. Make the Privacy Policy "Google AdSense and Advertising" section active, list the cookies, and set a new date.
4. Measure performance (Lighthouse, then real users) before and after ads.

## Phase 5: monitoring and invalid traffic

- Never click your own ads. Do not buy traffic from bots or click exchanges. Watch for traffic spikes.
- Check the AdSense Policy center and Search Console regularly.
- Keep `ads.txt` correct, and update the Privacy Policy when partners or settings change.
- Keep menu information current (dates, offers). Stale offers could become deceptive content.
