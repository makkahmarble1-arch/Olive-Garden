// Non-destructive Supabase connection check. Never prints env values.
// Run from olive-garden-menu/: npm run check:supabase
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

const env = {};
for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const url = (env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/+$/, "");
const key = env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";
console.log("1. Env variables present:", Boolean(url), Boolean(key));

// 2. Network + key: Auth health endpoint (read-only).
try {
  const t = Date.now();
  const r = await fetch(`${url}/auth/v1/health`, { headers: { apikey: key } });
  console.log(`2. Network/API gateway: HTTP ${r.status} (${Date.now() - t} ms)`, r.ok ? "OK, project reachable and key accepted" : "NOT OK");
} catch (e) {
  console.log("2. Network/API gateway: FAILED -", e.cause?.code || e.message);
}

// 3. Database API (PostgREST) through supabase-js: read from a table that
// does not exist. "table not found" (PGRST205) proves the database API
// answered; nothing is created or changed.
const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
const { data, error, status } = await supabase.from("__connection_check__").select("*").limit(1);
if (error?.code === "PGRST205" || error?.code === "42P01") {
  console.log(`3. Database API: reachable (HTTP ${status}, ${error.code}: test table does not exist, as expected). No tables exist yet.`);
} else if (error) {
  console.log(`3. Database API: error HTTP ${status} code=${error.code} message=${error.message}`);
} else {
  console.log("3. Database API: unexpected success", data);
}
