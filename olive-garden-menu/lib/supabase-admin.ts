import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";

/**
 * Privileged Supabase client (secret key = service_role). SERVER ONLY:
 * the `server-only` import makes the build fail if a Client Component
 * imports this file, so the secret key can never reach the browser.
 *
 * Its only use: calling public.submit_rating() from the vote API
 * (app/api/ratings/vote/route.ts). The rating tables stay private.
 */
let admin: SupabaseClient<Database> | null = null;

export function isSupabaseAdminConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SECRET_KEY);
}

export function getSupabaseAdminClient(): SupabaseClient<Database> {
  if (!admin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SECRET_KEY;
    if (!url || !key) {
      throw new Error("Supabase admin is not configured: set SUPABASE_SECRET_KEY (server only) in .env.local.");
    }
    admin = createClient<Database>(url.replace(/\/+$/, ""), key, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    });
  }
  return admin;
}
