import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";

/**
 * Shared, typed Supabase client (docs/SUPABASE_SETUP.md).
 *
 * Uses only the public URL and the **publishable** key, so it is safe in
 * Server and Client Components. Data access is controlled by Row Level
 * Security policies in Supabase. Never put a secret / service_role key here
 * or in any NEXT_PUBLIC_ variable.
 *
 * The site has no user accounts, so no auth session is stored.
 */

let client: SupabaseClient<Database> | null = null;

/** Reads the two public variables; throws a clear error if one is missing. */
function getSupabaseConfig(): { url: string; key: string } {
  // Written out in full so Next.js can inline them into browser code.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase is not configured: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local (see .env.example).",
    );
  }
  return { url: url.replace(/\/+$/, ""), key };
}

/** True when both public Supabase variables are set (no network call). */
export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
}

/** Returns the shared client, created on first use. */
export function getSupabaseClient(): SupabaseClient<Database> {
  if (!client) {
    const { url, key } = getSupabaseConfig();
    client = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    });
  }
  return client;
}
