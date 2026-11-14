import "server-only";
import { siteConfig } from "@/lib/site";
import type { ContactValues } from "@/lib/contact";

/**
 * Sends a contact-form message by email through Resend's HTTP API
 * (docs/CONTACT_FORM_SETUP.md). Server only: the API key never reaches the
 * browser. No npm package is needed (plain fetch to the documented endpoint),
 * so no new dependency was added.
 *
 * Environment variables (server only, set in .env.local / Vercel):
 *   RESEND_API_KEY      Resend API key with "sending access" only
 *   CONTACT_TO_EMAIL    the professional inbox that receives the messages
 *   CONTACT_FROM_EMAIL  fixed sender on the domain verified in Resend
 *                       (an address, or "Name <address>")
 *   RESEND_API_URL      optional; only for local tests against a mock server
 *
 * The visitor never chooses the sender or the recipient: both come from the
 * server configuration. The visitor's validated address is used only as
 * Reply-To. Until all three required values are set, the contact API answers
 * "not_configured" and nothing is sent.
 */

const DEFAULT_API_URL = "https://api.resend.com/emails";

export function isContactEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL);
}

/** Removes anything that could break an email header (line breaks, other control characters). */
function headerSafe(text: string, max: number): string {
  return text.replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, max);
}

/** Escapes text for the HTML version of the email (no visitor input is ever rendered as HTML). */
function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/** Fixed sender from the server config; adds the site name when only an address is configured. */
function senderAddress(): string {
  const from = (process.env.CONTACT_FROM_EMAIL ?? "").trim();
  return from.includes("<") ? from : `${siteConfig.name} <${from}>`;
}

/** "November 14, 2026, 3:05 PM ET (2026-11-14T20:05:00.000Z)" */
function submittedAt(date: Date): string {
  const eastern = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/New_York",
  }).format(date);
  return `${eastern} ET (${date.toISOString()})`;
}

export type DeliveryResult = { accepted: true; id: string | null } | { accepted: false; status: number | "timeout" | "network"; reason?: string };

export async function sendContactEmail(values: ContactValues, now = new Date()): Promise<DeliveryResult> {
  const when = submittedAt(now);
  const rows: [string, string][] = [
    ["Name", values.name],
    ["Email", values.email],
    ["Subject", values.subject],
    ["Submitted", when],
  ];

  const text = [
    `New message from the contact form on ${siteConfig.name}`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    values.message,
    "",
    "Reply to this email to answer the visitor (Reply-To is set to their address).",
  ].join("\n");

  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#f6f8e8;font-family:Arial,Helvetica,sans-serif;color:#1c1917">
<div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #dce5ba;border-radius:12px;padding:24px">
<p style="margin:0 0 16px;font-size:13px;color:#556b12;font-weight:bold">${escapeHtml(siteConfig.name)} · Contact form</p>
<table role="presentation" style="border-collapse:collapse;width:100%;font-size:15px;line-height:1.5">
${rows.map(([label, value]) => `<tr><td style="padding:4px 12px 4px 0;color:#57534e;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:4px 0">${escapeHtml(value)}</td></tr>`).join("\n")}
</table>
<p style="margin:20px 0 6px;font-size:13px;color:#57534e">Message</p>
<div style="white-space:pre-wrap;font-size:15px;line-height:1.6;border-top:1px solid #e7e5e4;padding-top:12px">${escapeHtml(values.message)}</div>
<p style="margin:20px 0 0;font-size:12px;color:#57534e">Reply to this email to answer the visitor (Reply-To is set to their address).</p>
</div></body></html>`;

  const body = {
    from: senderAddress(),
    to: [process.env.CONTACT_TO_EMAIL],
    // The visitor's address goes only into the JSON reply_to field, already validated.
    reply_to: values.email,
    subject: headerSafe(`[${siteConfig.name}] ${values.subject} from ${values.name}`, 180),
    text,
    html,
  };

  try {
    const res = await fetch(process.env.RESEND_API_URL || DEFAULT_API_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    const data = (await res.json().catch(() => null)) as { id?: unknown; name?: unknown } | null;
    if (res.ok) return { accepted: true, id: typeof data?.id === "string" ? data.id : null };
    // Resend's error name (e.g. "validation_error") is safe to log; it never contains the message.
    return { accepted: false, status: res.status, reason: typeof data?.name === "string" ? data.name.slice(0, 60) : undefined };
  } catch (error) {
    return { accepted: false, status: error instanceof Error && error.name === "TimeoutError" ? "timeout" : "network" };
  }
}
