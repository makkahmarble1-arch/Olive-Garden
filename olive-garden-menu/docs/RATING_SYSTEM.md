# Rating System

**Status:** complete and audited (Lesson 7.4.6, 2026-11-13); running locally, not deployed. Database: 146 products, 131 rating keys. The real database holds **2 votes made from the local site during development** (Family-Style Lasagna Bundle 1 star, Famous House Salad 4 stars); remove them before launch (section 9.3).
**Owner decision (CLAUDE.md, decision 6):** genuine 1–5 star visitor ratings, average + vote count ("Not rated yet" when none), shared by the homepage and category pages, with basic duplicate/spam protection and persistent storage (Supabase Free Plan).
**Files:** `supabase/migrations/001_create_ratings.sql` (schema), `lib/database.types.ts` (types), `lib/supabase.ts` (client), `docs/SUPABASE_SETUP.md` (connection).

## 1. Security approach

1. **The browser can only read totals.** All tables are in the private schema `ratings_private`. The Supabase Data API does not expose that schema, and `anon` / `authenticated` have no rights on it. The browser (publishable key) can call exactly one function: `public.get_rating_summaries()`, which returns product id, average, and count. Individual votes and visitor hashes are never returned.
2. **Only our server can write.** `public.submit_rating()` can be executed by `service_role` only. Browsers calling it get "permission denied". The server API (Lesson 7.4.4) calls it with the **secret key**, which is server-only.
3. **The server decides who the visitor is.** The browser never sends a visitor id that we trust. The server sets its own random anonymous id in an `HttpOnly`, `Secure`, `SameSite=Lax` cookie and sends the database only `HMAC-SHA256(RATING_HASH_SECRET, id)`. The database rejects anything that is not a 64-character hash.
4. **Duplicate protection in the database.** `unique (rating_key, visitor_hash)`: one vote per visitor per dish. Voting again updates the same row (`created` / `updated` / `unchanged`).
5. **Rate limiting in the database** (inside `submit_rating`, per clock hour): 40 writes per visitor, 120 per network. The network value is `HMAC(secret, IP + date)`, so it changes every day and the raw IP is never stored. Counters older than 2 days are deleted automatically.
6. **Row Level Security** is enabled **and forced** on all 4 tables, with no policies for `anon` / `authenticated` (deny all). The only policies are for the `postgres` owner, which the server-side functions run as. RLS is never disabled.
7. **Constraints the server cannot skip:** rating `smallint` between 1 and 5; product id must exist and be active; valid hash format; sums and counts can never go out of range.
8. **No personal data:** no IP address, name, email, user agent, or location is stored. A vote is: dish, product, visitor hash, stars, two timestamps.
9. **Functions are hardened:** `security definer` with `set search_path = ''`, fully qualified names, and `EXECUTE` revoked from `public`.

## 2. Database architecture

| Object | Purpose |
|---|---|
| `ratings_private.products` | Products that can be rated: `product_id` (= id in `content/menu/products.ts`), `rating_key` (whose ratings it shares), `is_active` |
| `ratings_private.votes` | One row per visitor per dish: `rating_key`, `product_id` (where the vote was made), `visitor_hash`, `rating` 1–5, `created_at`, `updated_at` |
| `ratings_private.summaries` | `rating_count` and `rating_sum` per dish, kept in sync by a trigger on `votes` (insert, update, delete) |
| `ratings_private.rate_limits` | Hourly write counters per visitor hash (`v:`) and network hash (`n:`) |
| `public.get_rating_summaries(text[])` | **Public read.** One call for up to 300 product ids, returns `product_id, rating_key, average_rating, rating_count` |
| `public.submit_rating(product, visitor_hash, network_hash, rating)` | **Server-only write.** Validates, rate-limits, creates or updates the vote, returns the new average and count |

**Aggregation:** averages come from the pre-computed `summaries` table, not from counting all votes. The homepage asks for all products in **one** request (not one per card):

```ts
const { data } = await getSupabaseClient().rpc("get_rating_summaries", { p_product_ids: productIds });
```

Unrated (or unknown) products return `rating_count: 0` and `average_rating: null`, so the page shows "Not rated yet". Nothing is invented. Average = `rating_sum / rating_count`, rounded to 2 decimals.

## 3. Shared product rating mapping

Ratings are stored per **rating key**. Offerings of the same product (e.g. Cheese Ravioli as an entrée, a lunch dish, and a lighter portion) already share one product id, so they share ratings. In addition, these products share ratings because the owner confirmed them as the same dish (alias decisions, `content/menu/aliases.ts`, status "shared-data"):

| Alias | Rating key (canonical) | Also uses this rating |
|---|---|---|
| A3 | `kids-grilled-chicken-with-rotini-pasta-and-marinara` | `grilled-chicken-with-rotini-pasta-and-marinara` (gluten-sensitive listing of the same kids meal) |
| A6 | `toasted-ravioli` | `toasted-beef-ravioli` (catering) |
| A7 | `sicilian-cheesecake-with-strawberry-topping` | `sicilian-cheesecake` (catering) |
| A8 | `cheese-ravioli` | `cheese-ravioli-with-meat-or-marinara-sauce`, `cheese-ravioli-with-marinara-or-meat-sauce` (pans) |
| A9 | `spaghetti-with-marinara` | `spaghetti-with-marinara-sauce` (pans). Lunch `spaghetti` stays separate (sauce choice) |
| A10 | `soup-salad-and-breadsticks` | `soup-salad-and-breadsticks-lunch`, `weekday-lunch-special` |
| A12 | `side-of-grilled-chicken` | `grilled-chicken-breasts` (catering) |
| A13 | `side-of-broccoli` | `broccoli` (catering) |
| A14 | `side-of-alfredo-sauce` | `alfredo-dipping-sauce` |
| A14 | `side-of-marinara-sauce` | `marinara-dipping-sauce` |
| A14 | `side-of-meat-sauce` | `meat-dipping-sauce` |
| A14 | `side-of-five-cheese-marinara-sauce` | `five-cheese-marinara-dipping-sauce` |
| A15 | `chicken-fingers` | `kids-chicken-fingers` |

Totals: **146 products → 131 rating keys** (15 products share). A14 is split per sauce: alfredo, marinara, meat, and five cheese marinara are different sauces, so each has its own rating.

**Kept separate (confirmed different, aliases A1, A2, A4, A5, A11, A16, A17):** e.g. adult vs. kids rotini, Jumbo House Salad vs. Large Salad, house salad with vs. without croutons, Italian Meatballs vs. Meatballs Parmigiana vs. Side of Meatballs, Homemade Soups vs. Zuppa Toscana.

**Owner check before launch:** A6, A7, A8, A9, A12, A13, and A15 are "same dish, different portion" (e.g. a dessert slice and the whole catering cake). Sharing ratings is recommended because visitors rate the dish. If you prefer them separate, change it **before** any votes exist: the migration does not move a product that already has votes.

**New products later:** add a row with `insert into ratings_private.products (product_id, rating_key) values ('<id>', '<id>');`. To stop rating a product, set `is_active = false`; never delete it.

## 3a. Rating UI (Lesson 7.4.4)

| File | Purpose |
|---|---|
| `lib/ratings.ts` | Server: `getRatingSummaries()` reads all 146 products with ONE `get_rating_summaries` call. `'use cache'`, `cacheLife("minutes")`, tag `ratings` (the voting API will refresh it) |
| `app/api/ratings/route.ts` | `GET /api/ratings`: `{ available, ratings: { [productId]: { average, count } } }`, only products with votes. Prerendered, revalidates about every minute |
| `lib/rating-types.ts` | Shared types |
| `components/rating/rating-store.ts` | Browser: ONE `fetch("/api/ratings")` per page view, shared by every rating on the page (`useSyncExternalStore`, so no provider component is needed) |
| `components/rating/StarRating.tsx` | Golden stars drawn with CSS (`og-star`, `og-star-btn` in `app/globals.css`, Lesson 7.5): 18 px outline + gold fill whose width is `--fill`, one element per star (smaller DOM). `starFillStyle()` and a display-only `StarRating` |
| `components/rating/RatingSummary.tsx` | Always-visible row (owner design review): five individually selectable stars, then `(0)` when unrated or `4.3 (12)` with real votes (12 px text). Centered on cards, left-aligned in tables. Screen readers hear "Rating for {item}: not rated yet, 0 ratings". Keyboard: one Tab stop, Left/Right/Home/End, Enter/Space. Touch target 24 × 44 px per star without enlarging the 18 px star. Golden hover preview only once voting is open. After a press, a short label says "Voting opens soon. Not saved" (no layout shift) |
| `lib/rating-vote.ts` | `submitVote()` and `VOTING_OPEN = false`: placeholder until Lesson 7.4.5. Sends nothing and returns "unavailable", so the UI says "Voting opens soon. Not saved". It never reports a fake success |

Where ratings appear (always by canonical `productId`, so the same product shows the same rating everywhere):

- Homepage menu cards (all 17 categories) and Popular Menu Items: `MenuItemCard` (bottom of the card; `showRating={false}` hides it)
- Category pages: `MenuTable` (column "Visitor rating" on desktop, line under the name on phones; only for real products) and the "Popular {Category}" cards

The browser never talks to Supabase directly and gets no Supabase library or key from the rating UI: it only calls `/api/ratings`. Pages stay statically rendered; no `AggregateRating` or other rating structured data is added (CLAUDE.md SEO rules).

## 4. SQL installation (owner, manual)

1. Open https://supabase.com/dashboard and select this project. If the project is paused, click **Restore** first.
2. In the left menu click **SQL Editor**, then **New query**.
3. In VS Code open `supabase/migrations/001_create_ratings.sql`, select all (Ctrl+A), copy (Ctrl+C), and paste into the SQL Editor.
4. Click **Run** (or Ctrl+Enter). Expected result: "Success. No rows returned". The SQL runs inside one transaction: if anything fails, nothing is changed. If Supabase warns about a "destructive operation" (the `drop trigger if exists` line), confirm: it only replaces this migration's own trigger.
5. Check it worked. New query, paste, Run:

   ```sql
   select count(*) as products, count(*) filter (where rating_count = 0) as unrated
   from public.get_rating_summaries((select array_agg(product_id) from ratings_private.products));
   ```

   Expected: `products = 146`, `unrated = 146`.
6. Optional security check: **Table Editor** does not show the rating tables under `public` (they are in `ratings_private`). **Database → Tables**, schema `ratings_private`: all 4 tables show RLS enabled.
7. Tell us it is done. Then `npm run check:supabase` can confirm from this computer.

Running the file again is safe (it skips what already exists and adds no ratings). Do not edit or run parts of it separately.

**Remove everything again** (only before launch, deletes all votes):

```sql
drop function if exists public.submit_rating(text, text, text, integer);
drop function if exists public.get_rating_summaries(text[]);
drop schema if exists ratings_private cascade;
```

## 5. Environment variables

| Variable | Used by | Where | Status |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | browser + server | `.env.local`, Vercel | set (Lesson 7.4.2) |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | browser + server: `get_rating_summaries` only | `.env.local`, Vercel | set (Lesson 7.4.2) |
| `SUPABASE_SECRET_KEY` | **server only**: `submit_rating` via `lib/supabase-admin.ts` | `.env.local`, Vercel (no `NEXT_PUBLIC_` prefix) | set (Lesson 7.4.5) |
| `RATING_HASH_SECRET` | **server only**: cookie signature, visitor and network hashes (`lib/rating-visitor.ts`) | `.env.local`, Vercel | set (generated in Lesson 7.4.5: 48 random bytes, base64url) |
| `NEXT_PUBLIC_SITE_URL` | same-origin check of the vote API (with the request's own origin) | Vercel | set at launch |

Never put the secret key or `RATING_HASH_SECRET` in a `NEXT_PUBLIC_` variable, client code, docs, or git. If `RATING_HASH_SECRET` changes, existing visitors can vote once more (their hashes change), so set it once.

**Vercel setup (deployment phase):** Project > Settings > Environment Variables. Add all four variables for **Production** (and Preview only if previews should accept votes). Copy the values from `.env.local`; mark `SUPABASE_SECRET_KEY` and `RATING_HASH_SECRET` as **Sensitive**. Redeploy after adding them.

## 5a. Voting API (Lesson 7.4.5)

```
Browser (star click)
  -> POST /api/ratings/vote  {"productId":"tiramisu","rating":4}   same-origin JSON, no ids
     app/api/ratings/vote/route.ts
       1. Origin must be this site (and Sec-Fetch-Site same-origin)   else 403 forbidden
       2. Content-Type application/json, body <= 1 KB, valid JSON      else 400 invalid_request
       3. productId format + rating integer 1-5                        else 400 invalid_request
       4. productId must be one of the 146 products                    else 404 unknown_product
       5. visitor id from OUR signed HttpOnly cookie, or a new one
       6. HMAC hashes -> public.submit_rating() with the SECRET key (server only)
          (database: one vote per visitor per rating key, rate limits)  429 rate_limited / 503 unavailable
       7. revalidateTag("ratings") so the next page view shows the new totals
     <- 200 {"ok":true,"result":"created|updated|unchanged","ratingKey","average","count"}
  -> every card with the same rating key updates at once (rating-store applyVote)
```

| File | Purpose |
|---|---|
| `app/api/ratings/vote/route.ts` | The vote endpoint (POST only; GET returns 405). Responses are `Cache-Control: no-store` |
| `lib/supabase-admin.ts` | Privileged client with `SUPABASE_SECRET_KEY`; starts with `import "server-only"`, so the build fails if browser code ever imports it |
| `lib/rating-visitor.ts` | `server-only`: visitor cookie, HMAC hashes, trusted client IP |
| `lib/rating-vote.ts` | Browser: `submitVote()` posts to the API; "saved" only when the server says `ok: true` |
| `components/rating/rating-store.ts` | Ratings stored per rating key; `applyVote()` updates only the cards of that key |
| `scripts/test-rating-api.mjs` | `npm run test:rating-api`: 20 security checks that are all rejected before any database write (safe on the real database) |

**Visitor identification**

- On the first vote the server creates a random 128-bit id and sets cookie `og_rv` = `v1.<id>.<HMAC signature>`: `HttpOnly` (JavaScript cannot read it), `SameSite=Strict`, `Secure` in production, `Path=/`, 400 days.
- A missing, edited, or made-up cookie fails the signature check and is replaced with a new id. The browser never sends a visitor id or hash that is trusted.
- The database gets only `HMAC-SHA256(RATING_HASH_SECRET, "visitor:" + id)` (64 hex). The cookie id itself is never stored.
- Network for rate limiting: `HMAC(secret, "network:" + UTC date + ":" + IP)`, rotates daily. The IP is read only from headers the host sets: on Vercel `x-real-ip` / `x-forwarded-for` (Vercel overwrites client values). On any other host or locally these headers could be forged, so all requests share one network bucket (`untrusted-network`). **Before hosting anywhere other than Vercel, update `trustedClientIp()`.** No IP address is stored.

**Duplicate votes and rate limits** (database, `submit_rating`):

- One vote per visitor per rating key. Voting again changes the existing vote: the count stays the same, only the average changes (`updated`); the same stars again = `unchanged`.
- Products that share a rating key (section 3) count as one dish: rating the catering pan after the appetizer updates the same vote.
- Limits per clock hour: 40 writes per visitor, 120 per network, then HTTP 429 with `Retry-After: 3600`; the UI says "Too many ratings. Try later".

**UI states** (`RatingSummary`):

- **Saving:** the chosen stars show dimmed with "Saving…".
- **Success:** "Thanks for rating!", "Rating updated", or "Rating already saved", plus the new totals, e.g. "4.0 (1)".
- **Error:** "Not saved. Please try again"; nothing changes.

The labels appear above the stars and disappear after 3.5 s, so nothing shifts. On phone-width cards the numbers sit under the stars, so cards keep the same height before and after a vote.

**Security tests (2026-11-13), all passed**

- **Real server, real database, no writes:** `npm run test:rating-api`, 20 of 20. These covered:
  - cross-origin requests and a missing Origin header (403)
  - text/plain form posts
  - malformed, oversized, and array JSON bodies
  - ratings of 0, 6, -1, 3.5, "5", null, and true, and a missing rating
  - bad and SQL-like product ids, and an unknown product (404)
  - GET requests (405)
- **Real database, no writes:**
  - the secret key can execute `submit_rating` (a rating of 0 is rejected before any write)
  - the publishable key gets "permission denied"
  - neither key can read `ratings_private` directly
- **Isolated test environment:** 16 of 16. It used an in-memory PostgreSQL with the real migration, a small Supabase-style API, and the site running on port 3100 with test keys, so **no test vote reached the real database**. These covered:
  - created, updated, and unchanged votes, with no count increase on an update
  - a second visitor
  - tampered and made-up cookies, which are replaced by a new visitor
  - cookie flags
  - alias groups sharing one vote, while separate products stay separate
  - `/api/ratings` refreshing after a vote
  - visitor and network rate limits (429)
  - only hashes stored, and writes only with `service_role`
- **Browser, isolated environment (1280 px and 390 px):**
  - voting by click and by keyboard
  - all 5 Cheese Ravioli cards sync; Kids Cheese Ravioli stays separate
  - totals are still correct after a reload
  - no console errors and no browser requests to Supabase
- **Build scan:** neither secret value nor the variable names appear in any browser file; the server reads them at runtime.

**How to test again**

1. `npm run dev`, then `npm run test:rating-api` (safe, no writes).
2. Manual: open the site and click a star on a card. Expect "Thanks for rating!" and e.g. "4.0 (1)" on all cards of that dish. **This is a real vote.** Remove test votes before launch in the SQL Editor (postgres role): `delete from ratings_private.votes where product_id = '<product-id>';` (the summary trigger corrects the totals).
3. Never test rate limits on the real database. Use an isolated copy as described above.

## 6. Anonymous voting: limitations

- There are no accounts, so a determined person can vote again by clearing cookies, using a private window, or using another browser or device. The network limit (120 writes per hour) slows this down but cannot stop it completely. Anonymous voting is **not** abuse-proof.
- Privacy: the only stored data per vote are the dish, the stars, two timestamps, and a one-way visitor hash. The `og_rv` cookie is a functional cookie used only for ratings; mention it in the privacy policy before launch.
- Many people behind one network (office, school, mobile carrier) share the network limit; 120 per hour leaves room for normal use.
- Ratings show what site visitors think, not verified diners. The page should say "visitor ratings", never "customer reviews".
- Possible later, free additions (owner decision): Cloudflare Turnstile on the vote button, or a minimum time between a visitor's changes.

## 7. Free Plan performance

- Page views read totals with **one** request for all cards, served from the small `summaries` table (one row per rated dish). The pages stay static; ratings will load separately (Lesson 7.4.5) so they never slow down the menu.
- Recommended in 7.4.4: cache the summaries on the server for about 60 seconds, so many visitors cost one database query per minute.
- Each vote is one function call (a few small writes). Storage is tiny: a vote row is under 200 bytes, so even 100,000 votes use about 20 MB of the 500 MB Free Plan database.
- A Free Plan project pauses after about a week without activity. Ratings then fail to load (the page must still work and show "Not rated yet") until the project is restored in the dashboard.

## 8. How the SQL was tested

Before delivery, the migration was run twice in a local in-memory PostgreSQL (PGlite, used only for the test, not added to the project) with Supabase-like roles. 29 of 29 checks passed:

- **Migration:** runs again safely; 146 products, 131 keys; no ratings inserted.
- **Access:** RLS is enabled and forced. `anon` and `authenticated` cannot read or write the tables or call `submit_rating`. `anon` gets 0 votes and a null average for unrated products.
- **Voting:** a vote can be created, updated, or left unchanged; shared alias groups and separate products behave as designed.
- **Rejected:** invalid ratings, unknown products, and raw or invalid hashes.
- **Limits:** both rate limits work, and requests for more than 300 ids are rejected.
- **Totals:** summaries match the real vote totals after insert, update, and delete.

One part could not be tested locally: on Supabase the `postgres` role is not a superuser. The forced RLS has explicit `postgres` policies for that case. Step 5 above confirms the setup on Supabase itself.

## 9. Final audit (Lesson 7.4.6, 2026-11-13)

All tests that write votes ran in the isolated test environment (in-memory PostgreSQL with the real migration, a Supabase-style test API, site on port 3100 with test keys). The real database was only read, plus calls that are rejected before any write.

### 9.1 Results

| Area | Test | Result |
|---|---|---|
| Functional | 1, 2, 3, 4 and 5 stars accepted | Pass |
| Functional | Average exact (1+2+3+4+5 = 3.00; 1+2+2 = 1.67, shown 1.7) and count exact | Pass |
| Functional | Update existing vote: count unchanged, average recalculated (3.00 → 3.40) | Pass |
| Functional | 10 repeated votes from one visitor → still one vote | Pass |
| Functional | Stored in the database; shown again after a page refresh (also an immediate refresh) | Pass (after fix 2) |
| Functional | Shared ratings: all members of an alias group show the same totals (e.g. 5 Cheese Ravioli cards); Kids Cheese Ravioli stays separate | Pass |
| Functional | Unrated: "(0)", no invented values | Pass |
| Errors | Database unreachable: menu and images load, ratings "(–)", vote "Not saved. Please try again" (HTTP 503) | Pass |
| Errors | Database hangs: `/api/ratings` and votes give up after about 15 s; pages unaffected (about 1 s) | Pass |
| Security | `npm run test:rating-api` on the real server: 20/20 (cross-origin, missing Origin, form posts, bad JSON, oversized body, invalid ratings, bad/unknown products, GET) | Pass |
| Security | Isolated end-to-end: 16/16. Covered the cookie flags (HttpOnly, SameSite=Strict, 400 days) and the signed cookie value. Tampered or invented cookies were replaced by a new visitor. Also covered: duplicate protection, alias groups, both rate limits (429), hash-only storage, and writes only via service_role | Pass |
| Security | Real database: secret key can only execute `submit_rating`; publishable key gets "permission denied"; neither can read `ratings_private` | Pass |
| Security | Migration tests (RLS on and forced, grants, constraints, trigger): 29/29 | Pass |
| Security | Build scan: no secret value or secret variable name in any browser file; `.env.local` git-ignored, no env file tracked, `.env.example` has placeholders only | Pass |
| SEO | No `AggregateRating` or other rating structured data in any page | Pass |
| UI | 1280, 820, 390, 340 px: 237 rows. Every row has five 18 × 18 px stars, gold #F59E0B, no overlaps, 12 px text, no popup, no page overflow, CLS 0 | Pass |
| UI | Touch target 24 × 44 px per star; one Tab stop per row; arrows/Home/End/Enter; visible focus outline | Pass (after fix 1) |
| UI | Same row height on all cards (28 px desktop/tablet, 46 px phone, numbers under the stars) before and after a vote | Pass |
| Performance | One `/api/ratings` request per page view for all cards; no browser request to Supabase | Pass |
| Performance | A vote re-renders only the rows of that rating key (measured: 5 renders for 4 Shrimp Scampi rows, 0 of the other 233) | Pass |
| Performance | Production server: homepage TTFB about 0.03 s (static), `/api/ratings` 0.007–0.04 s (server cache) | Pass |

### 9.2 Fixes made during the audit

1. **Keyboard:** fast arrow-key presses could start from a stale star position. Arrow keys now move from the star that really has focus.
2. **Refresh after voting:** `/api/ratings` is sent with `s-maxage=60, stale-while-revalidate`, so the browser could show an older copy from its disk cache right after a vote. The rating store now fetches with `cache: "no-cache"` (the server cache still answers quickly). Verified: three votes, each followed by an immediate refresh, showed the new totals.
3. **HTML size:** the long utility class lists repeated on about 1,200 star buttons were moved to two CSS classes (`og-star-btn`, `og-star` in `app/globals.css`). Homepage HTML went from 2.51 MB to 2.16 MB (gzip 133 KB to 129 KB) with identical look and sizes.
4. **Logs:** a Supabase outage page (HTML) is no longer written in full to the server log (first 200 characters only, never ids or hashes).

### 9.3 Test data cleanup (owner approval needed; nothing was deleted)

The site has only run locally, so every vote in the real database comes from development. Found on 2026-11-13: **2 votes** (Family-Style Lasagna Bundle 1 star, Famous House Salad 4 stars).

Safe procedure, removes only confirmed test votes (`supabase/maintenance/cleanup_test_votes.sql`):

1. In the browser you voted with: DevTools (F12) > Application > Cookies > copy the value of `og_rv`.
2. `npm run rating:visitor-hash -- "<value>"` prints your 64-character visitor hash. It works offline, checks the cookie signature, and never prints the secret.
3. In the Supabase SQL Editor, run STEP 1 (list) and STEP 2 (preview with your hash, or with confirmed vote ids).
4. STEP 3: put the same filter and the number of rows from the preview into `expected_count`. If the number does not match, nothing is deleted.
5. STEP 4: check the totals (the trigger recalculates them).

Tested on a local copy: a wrong count or a count of 0 deleted nothing; the correct count removed only the 2 test votes and kept all genuine votes and totals.

**Owner-approved cleanup (2026-11-13):** `supabase/maintenance/2026-11-13_remove_dev_test_votes.sql` removes exactly the 2 development votes (family-style-lasagna-bundle 1 star, famous-house-salad 4 stars, created 2026-11-13). It deletes only if the database holds exactly these 2 votes; otherwise nothing changes. Tested on local copies: 3/3 cases. It must be run by the owner in the SQL Editor, because no API key (not even the secret key) can reach `ratings_private` (by design).

### 9.4 Remaining limitations

- Anonymous voting is not abuse-proof: clearing cookies, private windows, or other devices allow new votes. Rate limits (40 per visitor and 120 per network per hour) only slow this down.
- The network limit uses the real IP only on Vercel; on other hosts or locally all requests share one bucket (update `trustedClientIp()` before using another host).
- The Supabase Free Plan answered slowly or with HTTP 522 several times during testing. The site handles it ("(–)" and a retry), but ratings can be missing for a moment, and a paused project shows no ratings until it is restored.
- On a phone, a vote shows "Saving…" for up to 15 s if the database hangs.
- `npm run test:rating-api` only checks rejected requests; tests that write votes need the isolated environment (section 5a).

### 9.5 Deployment requirements (Vercel)

1. Environment variables (Production): `NEXT_PUBLIC_SITE_URL` (final domain), `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY` (Sensitive), `RATING_HASH_SECRET` (Sensitive, keep it stable).
2. Remove the development test votes (9.3) before launch.
3. Privacy policy: mention the functional cookie `og_rv` (ratings only, no tracking) and that votes are stored as one-way hashes.
4. After deploying: `npm run test:rating-api -- https://<domain>` from your computer (expects 20/20), then one real vote check and its cleanup.
5. Keep the Supabase project active (Free Plan projects pause after about a week without activity).
