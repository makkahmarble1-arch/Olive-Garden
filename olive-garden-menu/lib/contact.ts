/**
 * Contact form rules shared by the browser form and the server API
 * (docs/CONTACT_FORM_SETUP.md). No secrets and no server-only code here.
 */

export const CONTACT_SUBJECTS = [
  "General Inquiry",
  "Menu Price Correction",
  "Nutrition Information Correction",
  "Incorrect Food Image",
  "Website Feedback",
  "Advertising & Business Inquiry",
  "Other",
] as const;

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number];

export const CONTACT_LIMITS = {
  nameMin: 2,
  nameMax: 80,
  emailMax: 254,
  messageMin: 20,
  messageMax: 4000,
  /** Whole JSON request body. */
  bodyMaxBytes: 12_000,
  /** A form sent faster than this after it was shown is treated as automated. */
  minFillMs: 3_000,
  /** A form older than this is treated as stale. */
  maxFillMs: 24 * 60 * 60 * 1000,
} as const;

export type ContactField = "name" | "email" | "subject" | "message";

export type ContactInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
  /** Honeypot: hidden from people, must stay empty. */
  website?: string;
  /** Time (ms since epoch) the form was shown, set by the browser. */
  startedAt?: number;
};

export type ContactValues = { name: string; email: string; subject: ContactSubject; message: string };

export type ContactErrorCode =
  | "invalid_request"
  | "forbidden"
  | "rate_limited"
  | "not_configured"
  | "delivery_failed";

export type ContactResponse =
  | { ok: true }
  | { ok: false; error: ContactErrorCode; fields?: Partial<Record<ContactField, string>> };

// Any control character (including CR/LF, which could inject email headers).
const CONTROL = /[\u0000-\u001f\u007f]/;
// Control characters allowed in the message body: tab and line feed only.
const MESSAGE_CONTROL = /[\u0000-\u0008\u000b-\u001f\u007f]/;
// Practical email check (no spaces, one @, a dot in the domain, no characters used in header syntax).
const EMAIL = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[A-Za-z]{2,63}$/;

/** Checks and normalizes the form fields. Same rules in the browser and on the server. */
export function validateContact(input: Partial<ContactInput>): { values?: ContactValues; errors: Partial<Record<ContactField, string>> } {
  const errors: Partial<Record<ContactField, string>> = {};
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim() : "";
  const subject = typeof input.subject === "string" ? input.subject : "";
  const message = typeof input.message === "string" ? input.message.replace(/\r\n?/g, "\n").trim() : "";

  if (name.length < CONTACT_LIMITS.nameMin) errors.name = "Please enter your name.";
  else if (name.length > CONTACT_LIMITS.nameMax) errors.name = `Please keep your name under ${CONTACT_LIMITS.nameMax} characters.`;
  else if (CONTROL.test(name)) errors.name = "Your name contains characters we cannot accept.";

  if (!email) errors.email = "Please enter your email address.";
  else if (email.length > CONTACT_LIMITS.emailMax || CONTROL.test(email) || !EMAIL.test(email))
    errors.email = "Please enter a valid email address, for example name@example.com.";

  if (!(CONTACT_SUBJECTS as readonly string[]).includes(subject)) errors.subject = "Please choose a subject.";

  if (message.length < CONTACT_LIMITS.messageMin)
    errors.message = `Please write a little more (at least ${CONTACT_LIMITS.messageMin} characters).`;
  else if (message.length > CONTACT_LIMITS.messageMax)
    errors.message = `Please keep your message under ${CONTACT_LIMITS.messageMax.toLocaleString("en-US")} characters.`;
  else if (MESSAGE_CONTROL.test(message)) errors.message = "Your message contains characters we cannot accept.";

  if (Object.keys(errors).length > 0) return { errors };
  return { values: { name, email, subject: subject as ContactSubject, message }, errors };
}
