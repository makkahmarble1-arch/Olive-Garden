// Shows the database visitor hash of YOUR browser, so your own test votes
// can be found and removed without touching genuine visitor votes.
//
// 1. In the browser where you voted: DevTools (F12) > Application >
//    Cookies > your site > copy the VALUE of the cookie "og_rv".
// 2. npm run rating:visitor-hash -- "<cookie value>"
// 3. Use the printed hash in supabase/maintenance/cleanup_test_votes.sql.
//
// Reads RATING_HASH_SECRET from .env.local (never printed). Read-only:
// no network, no database access.
import { readFileSync } from "node:fs";
import { createHmac, timingSafeEqual } from "node:crypto";

const cookie = (process.argv[2] ?? "").trim().replace(/^og_rv=/, "");
let secret = "";
for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const m = line.match(/^\s*RATING_HASH_SECRET\s*=\s*(.*)\s*$/);
  if (m) secret = m[1].replace(/^["']|["']$/g, "");
}
if (!secret) {
  console.error("RATING_HASH_SECRET is missing in .env.local.");
  process.exit(1);
}
const [version, id, signature] = cookie.split(".");
if (version !== "v1" || !id || !signature) {
  console.error('Paste the value of the "og_rv" cookie (it starts with "v1.").');
  process.exit(1);
}
const expected = Buffer.from(createHmac("sha256", secret).update(`cookie:${id}`).digest("base64url"));
if (expected.length !== signature.length || !timingSafeEqual(expected, Buffer.from(signature))) {
  console.error("This cookie was not signed with this site's RATING_HASH_SECRET.");
  process.exit(1);
}
console.log(createHmac("sha256", secret).update(`visitor:${id}`).digest("hex"));
