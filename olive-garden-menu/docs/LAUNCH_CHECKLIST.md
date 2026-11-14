# Launch Checklist

**Status:** not launched. Nothing is deployed, nothing is pushed to GitHub, and search indexing is OFF.
Each item needs the owner's approval. Details: `HOMEPAGE_SEO_AUDIT.md`, `PERFORMANCE_AUDIT.md`, `RATING_SYSTEM.md` §9, `SUPABASE_SETUP.md`.

## 1. Decisions the owner still has to make

- [x] Final domain: **https://olivegardenmenuprices.us** (2026-11-13). Never hardcoded; set `NEXT_PUBLIC_SITE_URL` in Vercel Production.
- [x] `/menu` permanently redirects to `/` (308, `next.config.ts`; done 2026-11-13). Old hub page removed; links use `/#full-menu`.
- [x] Mobile performance: **option A** chosen by the owner (2026-11-13): keep as is, measure real users after launch (`PERFORMANCE_AUDIT.md` §3).
- [ ] Optional: a real 404 status for unknown URLs via `proxy.ts` (now 200 + noindex; see `HOMEPAGE_SEO_AUDIT.md` §4).
- [ ] Author/About page, contact email, logo, Privacy Policy, final branding: planned for later lessons (owner, 2026-11-13).

## 2. Before deploying

- [x] Category pages: all 17 have complete content (Lesson 8, 2026-11-14). 5 are `published` (Batch 1), 12 are `preview` (Batches 2-4, development complete). Status table: `CATEGORY_DEVELOPMENT_CHECKLIST.md` section F.
- [ ] Owner decides which `preview` pages become `published` before launch (only published pages are indexable and in the sitemap once `SITE_INDEXING=true`).
- [ ] Replacement photos for 4 products whose incorrect images were removed (`MISSING_IMAGES.md` section 00; 6 homepage cards show the placeholder until then).
- [ ] Re-check time-sensitive facts in a browser and update dates if they change: limited-time items (Never-Ending Soup, Salad & Breadsticks $9.99, Spicy Alfredo, Crispy Shrimp Fritta, Pumpkin Cookie Butter Cheesecake, Never-Ending Pasta Bowl), Buy One Take One / $6 Take Home status, catering "starting at" prices and delivery rules.

- [ ] Remove the 2 development test votes: owner runs `supabase/maintenance/2026-11-13_remove_dev_test_votes.sql` in the Supabase SQL Editor (approved 2026-11-13; it deletes only if exactly those 2 votes exist). Then confirm 0 votes.
- [ ] Privacy policy mentions the functional cookie `og_rv` (ratings only) and that votes are stored as one-way hashes.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm run build`: all pass.
- [x] Local commit "Complete homepage, menu data, images, ratings and SEO foundation" (2026-11-13; env files, secrets, and `image-staging/` excluded).
- [ ] Push to GitHub (owner request; `.env.local` stays git-ignored, check `git status`).

## 3. Vercel environment variables (Project > Settings > Environment Variables)

| Variable | Production | Preview | Notes |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://olivegardenmenuprices.us` | the preview URL, or leave unset | No trailing slash |
| `NEXT_PUBLIC_SUPABASE_URL` | yes | yes | |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | yes | yes | publishable key only |
| `SUPABASE_SECRET_KEY` | yes (Sensitive) | only if previews should accept votes | server only |
| `RATING_HASH_SECRET` | yes (Sensitive) | only if previews accept votes | keep it stable |
| `SITE_INDEXING` | `true` **only at launch** | never | turns indexing on |

## 4. Launch day (in this order)

1. [ ] Deploy to Production **without** `SITE_INDEXING`, and check the live site:
   - pages load and the 17 categories are visible
   - images load
   - ratings load; one test vote, then remove it again (`RATING_SYSTEM.md` §5a)
   - `npm run test:rating-api -- https://olivegardenmenuprices.us` gives 20/20
2. [ ] Add `SITE_INDEXING=true` (Production only) and redeploy. Then check:
   - `https://olivegardenmenuprices.us/robots.txt` lists the sitemap
   - `https://olivegardenmenuprices.us/sitemap.xml` lists only `/` and published category pages (now `/appetizers`)
   - the homepage source has `<meta name="robots" content="index, follow">` and a canonical on the final domain
3. [ ] Preview deployments: confirm Vercel sends `X-Robots-Tag: noindex`.
4. [ ] Google Search Console: verify the domain, submit `sitemap.xml`, and inspect the homepage URL.
5. [ ] Rich Results Test and Schema.org validator on the homepage (WebSite, Organization, WebPage, FAQPage; no errors).
6. [ ] Share-preview check (for example the Facebook Sharing Debugger or a chat app): the 1200 × 630 image and the title appear.
7. [ ] PageSpeed Insights on the live URL: record the lab results now; field data appears after a few weeks of traffic.

## 5. After launch

- [ ] Keep the Supabase Free project active (it pauses after about a week without activity).
- [ ] Re-check prices/calories on schedule and update the "last checked" dates (they drive `dateModified` and the sitemap `lastmod`).
- [ ] Monitor Search Console (coverage, Core Web Vitals) and real-user performance before any of the performance options in `PERFORMANCE_AUDIT.md` §3.
