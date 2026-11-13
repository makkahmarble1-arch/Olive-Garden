# Supabase Setup

**Status:** connected (Lesson 7.4.2, 2026-11-13). Rating schema prepared in `supabase/migrations/001_create_ratings.sql` (Lesson 7.4.3, run manually by the owner; see `docs/RATING_SYSTEM.md`).
**Purpose:** persistent storage for the approved visitor rating system (CLAUDE.md, decision 6). Nothing else uses the database.
**Plan:** Supabase Free Plan. No paid add-ons.

## Environment variables

| Variable | Where | Value |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `.env.local` (local), Vercel project settings (later) | `https://<project-ref>.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | same | the **publishable** key (`sb_publishable_…`) from Project Settings > API Keys |

- `.env.local` is git-ignored (`.gitignore`: `.env*`, with `!.env.example` so the example file can be committed).
- `.env.example` holds placeholders only. Copy it to `.env.local` and fill in real values.
- `NEXT_PUBLIC_` variables are included in browser code. That is fine for the URL and the publishable key, because Row Level Security decides what that key may do.
- **Never** put the secret key (`sb_secret_…`) or the legacy `service_role` key in a `NEXT_PUBLIC_` variable, in client code, or in the repository. Since Lesson 7.4.5 the vote API uses `SUPABASE_SECRET_KEY` **server-only** (`lib/supabase-admin.ts`, guarded by `import "server-only"`), plus `RATING_HASH_SECRET`; see `docs/RATING_SYSTEM.md` sections 5 and 5a.
- Vercel: add both variables in the Vercel project settings before deploying (deployment phase).

## Code

| File | Purpose |
|---|---|
| `lib/supabase.ts` | `getSupabaseClient()`: one shared, typed client (created on first use), `isSupabaseConfigured()`. Uses only the URL and the publishable key. No auth session is stored (the site has no user accounts). Throws a clear error if a variable is missing |
| `lib/database.types.ts` | `Database` type for the client: the two public rating functions (`get_rating_summaries`, `submit_rating`), written by hand to match the migration |
| `scripts/check-supabase.mjs` | Non-destructive connection check (`npm run check:supabase`) |

Usage (later lessons):

```ts
import { getSupabaseClient } from "@/lib/supabase";

const supabase = getSupabaseClient();
const { data, error } = await supabase.from("<table>").select("...");
```

Package: `@supabase/supabase-js` (official client, owner-approved in Lesson 7.4.2).

## Connection check

Run inside `olive-garden-menu/`:

```
npm run check:supabase
```

It never prints the variable values. It checks three separate things:

| Step | What it proves | Result on 2026-11-13 |
|---|---|---|
| 1. Variables present | `.env.local` has both values | OK |
| 2. Network / API gateway (`GET /auth/v1/health` with the publishable key) | The project is online, reachable from this computer, and the key is accepted | HTTP 200 (about 1 s). One earlier run returned HTTP 522 (timeout) once; the next runs were OK. A Free Plan project can be slow right after it starts or wakes up |
| 3. Database API (supabase-js `select` on a table that does not exist) | The database API (PostgREST) answers requests made with this key. Reply "table not found" (`PGRST205`) is the expected result | Reachable, `PGRST205`: no tables exist yet |

Step 3 does not test reading or writing real data: there are no tables yet. Table access (and the Row Level Security policies that control it) is tested when the rating tables exist (Lesson 7.4.3).

## Security rules

- Row Level Security stays **enabled** on every table. Never disable it.
- Every table gets explicit, minimal policies (no `using (true)` write policies for anonymous users without limits).
- Ratings: genuine visitor votes only; duplicate/spam protection is designed with the tables (Lesson 7.4.3).
- No ratings, tables, or UI exist yet.

## Free Plan notes

- Free projects are paused after a period of inactivity. A paused project makes `npm run check:supabase` fail at step 2; restore it in the Supabase dashboard.
- Keep usage within the free limits; do not enable paid add-ons without the owner's approval.
