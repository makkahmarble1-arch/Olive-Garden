// Security checks of POST /api/ratings/vote: every request here must be
// rejected BEFORE any database write, so it is safe on the real database.
// Run with the dev server on: npm run test:rating-api [base-url]
const BASE = process.argv[2] ?? "http://localhost:3000";
const url = `${BASE}/api/ratings/vote`;
let pass = 0, fail = 0;
async function t(name, init, expectStatus, expectError) {
  const res = await fetch(url, init);
  let body = null; try { body = await res.json(); } catch {}
  const ok = res.status === expectStatus && (!expectError || body?.error === expectError);
  if (ok) pass++; else fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}: HTTP ${res.status} ${JSON.stringify(body)}${res.headers.get("set-cookie") ? " [set-cookie!]" : ""}`);
}
const json = (o) => JSON.stringify(o);
const H = { "Content-Type": "application/json", Origin: BASE, "Sec-Fetch-Site": "same-origin" };
await t("cross-origin request (other website)", { method: "POST", headers: { ...H, Origin: "https://evil.example", "Sec-Fetch-Site": "cross-site" }, body: json({ productId: "tiramisu", rating: 5 }) }, 403, "forbidden");
await t("forged Origin but cross-site fetch metadata", { method: "POST", headers: { ...H, "Sec-Fetch-Site": "cross-site" }, body: json({ productId: "tiramisu", rating: 5 }) }, 403, "forbidden");
await t("no Origin header (curl / bot)", { method: "POST", headers: { "Content-Type": "application/json" }, body: json({ productId: "tiramisu", rating: 5 }) }, 403, "forbidden");
await t("form post (text/plain, CSRF style)", { method: "POST", headers: { ...H, "Content-Type": "text/plain" }, body: json({ productId: "tiramisu", rating: 5 }) }, 400, "invalid_request");
await t("malformed JSON", { method: "POST", headers: H, body: "{rating:5" }, 400, "invalid_request");
await t("oversized body", { method: "POST", headers: H, body: json({ productId: "tiramisu", rating: 5, pad: "x".repeat(2000) }) }, 400, "invalid_request");
await t("JSON array body", { method: "POST", headers: H, body: "[1,2]" }, 400, "invalid_request");
for (const r of [0, 6, -1, 3.5, "5", null, true]) {
  await t(`invalid rating ${JSON.stringify(r)}`, { method: "POST", headers: H, body: json({ productId: "tiramisu", rating: r }) }, 400, "invalid_request");
}
await t("missing rating", { method: "POST", headers: H, body: json({ productId: "tiramisu" }) }, 400, "invalid_request");
await t("invalid product id format", { method: "POST", headers: H, body: json({ productId: "../etc/passwd", rating: 5 }) }, 400, "invalid_request");
await t("SQL-ish product id", { method: "POST", headers: H, body: json({ productId: "x'; drop table votes;--", rating: 5 }) }, 400, "invalid_request");
await t("unknown product (valid format)", { method: "POST", headers: H, body: json({ productId: "big-mac", rating: 5 }) }, 404, "unknown_product");
await t("visitorHash supplied by browser is ignored -> still rejected for bad rating", { method: "POST", headers: H, body: json({ productId: "tiramisu", rating: 9, visitorHash: "a".repeat(64) }) }, 400, "invalid_request");
const g = await fetch(url); if (g.status === 405) pass++; else fail++; console.log(`${g.status === 405 ? "PASS" : "FAIL"}  GET not allowed: HTTP ${g.status}`);
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
