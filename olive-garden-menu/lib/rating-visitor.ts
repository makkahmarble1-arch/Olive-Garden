import "server-only";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

/**
 * Anonymous visitor identification for ratings (docs/RATING_SYSTEM.md).
 *
 * - The SERVER creates a random 128-bit visitor id and stores it in a
 *   signed, HttpOnly cookie. Browser-supplied ids are never trusted: a
 *   cookie with a wrong signature is ignored and replaced.
 * - The database only receives HMAC-SHA256(RATING_HASH_SECRET, id), so the
 *   cookie value itself is never stored.
 * - The network hash (for rate limiting) is an HMAC of the IP address plus
 *   the current UTC date: it changes daily and the raw IP is never stored.
 */

export const VISITOR_COOKIE = "og_rv";
const COOKIE_VERSION = "v1";
/** 400 days: the maximum cookie lifetime browsers allow. */
export const VISITOR_COOKIE_MAX_AGE = 400 * 24 * 60 * 60;

function getSecret(): string {
  const secret = process.env.RATING_HASH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("RATING_HASH_SECRET is missing or too short (server only, 32+ characters).");
  }
  return secret;
}

export function isRatingSecretConfigured(): boolean {
  return (process.env.RATING_HASH_SECRET?.length ?? 0) >= 32;
}

function hmac(purpose: string, value: string): Buffer {
  return createHmac("sha256", getSecret()).update(`${purpose}:${value}`).digest();
}

function sign(id: string): string {
  return hmac("cookie", id).toString("base64url");
}

/** Returns the visitor id from a valid signed cookie, or null. */
export function readVisitorId(cookieValue: string | undefined): string | null {
  if (!cookieValue) return null;
  const [version, id, signature] = cookieValue.split(".");
  if (version !== COOKIE_VERSION || !id || !signature || !/^[A-Za-z0-9_-]{22}$/.test(id)) return null;
  const expected = Buffer.from(sign(id));
  const given = Buffer.from(signature);
  return expected.length === given.length && timingSafeEqual(expected, given) ? id : null;
}

/** A new random visitor id and its signed cookie value. */
export function createVisitor(): { id: string; cookieValue: string } {
  const id = randomBytes(16).toString("base64url");
  return { id, cookieValue: `${COOKIE_VERSION}.${id}.${sign(id)}` };
}

/** 64-character hex hash stored in the database for this visitor. */
export function visitorHash(id: string): string {
  return hmac("visitor", id).toString("hex");
}

/**
 * Client IP from TRUSTED deployment headers only. On Vercel, x-real-ip and
 * x-forwarded-for are set by the platform (client values are overwritten).
 * Elsewhere (local development, unknown hosts) the headers could be forged,
 * so all requests share one network bucket instead.
 */
export function trustedClientIp(headers: Headers): string {
  if (process.env.VERCEL) {
    const ip = headers.get("x-real-ip") ?? headers.get("x-forwarded-for")?.split(",")[0];
    if (ip?.trim()) return ip.trim();
  }
  return "untrusted-network";
}

/** 64-character hex hash of the network, rotating every UTC day. */
export function networkHash(ip: string, now = new Date()): string {
  return hmac("network", `${now.toISOString().slice(0, 10)}:${ip}`).toString("hex");
}
