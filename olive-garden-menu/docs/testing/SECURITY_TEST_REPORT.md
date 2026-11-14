# Security Test Report (Lesson 8.6)

**Date:** 2026-11-14 · **Build:** local production build. No credentials were printed; checks compared files against the values in `.env.local` without showing them.

| Check | Method | Result | Status |
|---|---|---|---|
| `.env.local` excluded from Git | `git check-ignore` (`.gitignore:34 .env*`); `git ls-files` | Ignored; only `.env.example` is tracked, and it has placeholders only (`sb_secret_your_key_here`, …) | Pass |
| Secrets in browser bundles | Searched `.next/static` for the real `SUPABASE_SECRET_KEY` and `RATING_HASH_SECRET` values, plus the patterns `sb_secret_…` and `service_role` | 0 matches | Pass |
| Secrets in `public/` | Same search | 0 matches | Pass |
| Secrets in tracked files | Searched all `git ls-files` for every `.env.local` value | 0 matches | Pass |
| Server-only guard | `lib/supabase-admin.ts` starts with `import "server-only"` | Present (the build would fail if browser code imported it) | Pass |
| Credentials in error responses | Outage test: `/api/ratings` → `{"available":false,…}`, vote → `{"ok":false,"error":"unavailable"}` | No internal messages, URLs, or keys | Pass |
| API input validation | `npm run test:rating-api` (20 rejection cases) | 20/20 | Pass |
| Cross-origin vote | POST with `Origin: https://evil.example` | 403 `forbidden` | Pass |
| Database access (RLS) | Isolated tests: votes only through `submit_rating` with service_role; summaries through anon; tables in `ratings_private` not reachable with API keys | Pass (as designed in `RATING_SYSTEM.md`) | Pass |
| Anonymous visitor id | Signed HttpOnly, Secure, SameSite=Strict cookie; tampered cookies rejected; database stores only 64-hex HMAC hashes | Pass | Pass |
| Rate limiting | 429 after 40 writes/visitor/hour and 120/network/hour | Pass | Pass |
| Admin / dev routes | `/design-preview`, `/design-preview/category` → 404; no admin routes exist | Pass | Pass |
| Source, research, and config files over HTTP | `/docs/…`, `/research/…`, `/supabase/…`, `/content/…`, `/lib/…`, `/.next/…`, `/.git/config`, path traversal (`/images/../.env.local`, `/_next/static/../../.env.local`, `/%2e%2e/%2e%2e/etc`) | All 404 | Pass |
| One-segment file names | `/.env.local`, `/.env`, `/package.json`, `/next.config.ts`, `/CLAUDE.md`, `/proxy.ts` | **Before the fix:** HTTP 200 with the HTML 404 page (soft 404; checked: no file content, no secrets). **After fix F1:** 404 | Pass after fix |
| Dependencies | `npm audit --omit=dev` | **0 vulnerabilities** in production dependencies | Pass |
| Dev dependencies | `npm audit` | 7 moderate (`minimatch` inside `@typescript-eslint`, used only by ESLint) | P2: owner approval for `npm audit fix` (no major upgrades made) |
| Response headers | `curl -D -` on `/` | `X-Powered-By: Next.js` is sent; no CSP, X-Frame-Options, Referrer-Policy, or Permissions-Policy (Vercel adds HSTS on HTTPS) | P2: recommendation (owner approval) |
| Real ratings | Read-only during this lesson | 3 votes unchanged; nothing inserted, changed, or deleted | Pass |

## Recommendations (need owner approval)

1. `poweredByHeader: false` in `next.config.ts`.
2. A small header set via `headers()` in `next.config.ts`:
   - `X-Content-Type-Options: nosniff`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `X-Frame-Options: DENY` (or CSP `frame-ancestors 'none'`)
   - a minimal `Permissions-Policy`

   A full Content-Security-Policy needs testing with Next.js inline scripts, so it is a separate task.
3. `npm audit fix` for the dev-only `minimatch` warning (non-major updates only), then lint and build again.
4. Before launch: run the vote cleanup SQL (`supabase/maintenance/2026-11-14_remove_two_dev_test_votes.sql`) by hand. After deploying, run `npm run test:rating-api -- https://olivegardenmenuprices.us`.

## Lesson 8.6.1 update (2026-11-14)

### Security headers (implemented in `next.config.ts`, verified on the production build)

| Header | Value | Verified on |
|---|---|---|
| `X-Content-Type-Options` | `nosniff` | `/`, `/catering`, `/api/ratings`, `/robots.txt`, 404 pages, `_next` files |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | same |
| `X-Frame-Options` | `SAMEORIGIN` | same |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=(), bluetooth=(), hid=(), midi=()` | same |
| `X-Powered-By` | removed (`poweredByHeader: false`) | not sent |

**Checks:**
- Each header appears exactly once (no duplicates or conflicts).
- Supabase is unaffected: it is called only from the server, and `/api/ratings` still returns 200 with `available: true`.
- `npm run test:rating-api`: 20/20.

**Future integrations:**
- The Permissions-Policy deliberately leaves the ad-related features (`browsing-topics`, `attribution-reporting`, `join-ad-interest-group`, `run-ad-auction`) and `fullscreen` at their defaults, so Google AdSense, Google Analytics, and Microsoft Clarity are not blocked.
- **No Content-Security-Policy yet.** A CSP must list the script, frame, and connect domains of AdSense, GA4, and Clarity and be tested with Next.js inline scripts. It needs a separate review and owner approval.
- **HTTPS:** Vercel adds `Strict-Transport-Security` on its domains. Check the live response headers after deployment, and do not add `preload` without a decision.

### Dependency audit

| Step | Result |
|---|---|
| `npm audit` | 7 moderate, all from one advisory: `minimatch` 10.2.6 (GHSA-g3hv-75wg-m249, "globparts amplification" denial of service), pulled in by `@typescript-eslint/typescript-estree` 8.72.2 -> `typescript-eslint` -> `eslint-config-next` |
| Affects | **Development only** (ESLint). `npm audit --omit=dev`: 0 vulnerabilities in what visitors receive |
| `npm audit fix --dry-run` | **0 packages changed** (added 0, removed 0, changed 0). The newest `@typescript-eslint/typescript-estree` (8.72.2) still requires `minimatch ^10.2.2`, and the advisory covers all of 7.0.0-11.0.0, so there is no compatible fix |
| Applied | Nothing. `npm audit fix` would change nothing, and `--force` or an `overrides` entry (forcing minimatch 11) is not allowed without approval. `package.json` and `package-lock.json` are unchanged |
| Remaining | 7 moderate (dev-only). Re-check when `typescript-eslint` or `eslint-config-next` releases an update |
