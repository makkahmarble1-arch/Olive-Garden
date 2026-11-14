"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  CONTACT_LIMITS,
  CONTACT_SUBJECTS,
  validateContact,
  type ContactField,
  type ContactResponse,
} from "@/lib/contact";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

const SERVER_MESSAGES: Record<string, string> = {
  not_configured: "Our contact form is not accepting messages yet. Please try again later.",
  rate_limited: "You have sent several messages in a short time. Please wait a few minutes and try again.",
  delivery_failed: "Your message could not be sent right now. Please try again in a few minutes.",
  forbidden: "Your message could not be sent from this page. Please reload the page and try again.",
  invalid_request: "Please check the highlighted fields and try again.",
};

const FIELD_ORDER: ContactField[] = ["name", "email", "subject", "message"];

const inputClass =
  "mt-2 block w-full rounded-lg border bg-white px-4 py-3 text-base text-ink placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-dark aria-[invalid=true]:border-red-700";

/**
 * Contact form (docs/CONTACT_FORM_SETUP.md). Validates in the browser with
 * the same rules as the server, posts JSON to /api/contact, and shows
 * "sent" only when the server confirms the email service accepted it.
 * `enabled` is false until email delivery is configured: the form is still
 * shown, but sending is switched off with an explanation.
 */
export default function ContactForm({ enabled }: { enabled: boolean }) {
  const ids = { name: useId(), email: useId(), subject: useId(), message: useId(), website: useId(), status: useId() };
  const [fields, setFields] = useState({ name: "", email: "", subject: "", message: "", website: "" });
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const startedAt = useRef(0);
  const refs = useRef<Partial<Record<ContactField, HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null>>>({});
  const statusRef = useRef<HTMLDivElement>(null);
  // Blocks a second submit before React has re-rendered the disabled button.
  const inFlight = useRef(false);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Move focus to the result message once it is on screen (keyboard and screen-reader users).
  useEffect(() => {
    if (status.kind === "sent" || status.kind === "error") statusRef.current?.focus();
  }, [status]);

  function update(field: keyof typeof fields, value: string) {
    setFields((f) => ({ ...f, [field]: value }));
    if (field in errors) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function showErrors(next: Partial<Record<ContactField, string>>) {
    setErrors(next);
    const first = FIELD_ORDER.find((f) => next[f]);
    if (first) refs.current[first]?.focus();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current || status.kind === "sending" || !enabled) return;
    const { values, errors: found } = validateContact(fields);
    if (!values) {
      setStatus({ kind: "idle" });
      showErrors(found);
      return;
    }
    setErrors({});
    setStatus({ kind: "sending" });
    inFlight.current = true;
    let result: ContactResponse | null = null;
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: fields.website, startedAt: startedAt.current }),
      });
      result = (await res.json()) as ContactResponse;
    } catch {
      result = null;
    } finally {
      inFlight.current = false;
    }
    if (result?.ok === true) {
      setStatus({ kind: "sent" });
      setFields({ name: "", email: "", subject: "", message: "", website: "" });
    } else {
      const code = result && !result.ok ? result.error : "delivery_failed";
      if (result && !result.ok && result.fields) showErrors(result.fields);
      setStatus({ kind: "error", message: SERVER_MESSAGES[code] ?? SERVER_MESSAGES.delivery_failed });
    }
  }

  const describedBy = (field: ContactField, hint?: string) =>
    [errors[field] ? `${ids[field]}-error` : null, hint ?? null].filter(Boolean).join(" ") || undefined;
  const fieldError = (field: ContactField) =>
    errors[field] ? (
      <p id={`${ids[field]}-error`} className="mt-2 text-sm font-medium text-red-800">
        {errors[field]}
      </p>
    ) : null;
  const sending = status.kind === "sending";

  return (
    <form noValidate onSubmit={onSubmit} aria-describedby={enabled ? undefined : `${ids.status}-off`} className="space-y-6">
      {!enabled && (
        <p id={`${ids.status}-off`} className="rounded-lg border border-line bg-warning-bg px-4 py-3 text-sm leading-6 text-warning-text">
          <strong className="font-semibold">The contact form is not active yet.</strong> We are setting up email delivery,
          so messages cannot be sent at the moment.
        </p>
      )}

      <div
        ref={statusRef}
        tabIndex={-1}
        role={status.kind === "error" ? "alert" : "status"}
        aria-live="polite"
        className="outline-none empty:hidden"
      >
        {status.kind === "sent" && (
          <div className="relative flex items-start gap-4 overflow-hidden rounded-xl border border-gold/40 bg-[linear-gradient(135deg,var(--color-hero-deep)_0%,var(--color-brand-dark)_100%)] p-5 text-white shadow-[0_10px_24px_-14px_rgba(40,55,15,0.7)] sm:p-6">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-10 -right-10 size-32 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.28),transparent_70%)]"
            />
            <span
              aria-hidden="true"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-hero-cta text-hero-deep ring-4 ring-white/15"
            >
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </span>
            <div className="relative">
              <p className="font-display text-xl leading-snug font-bold text-white">
                Thank you, your message was sent<span className="text-hero-highlight">!</span>
              </p>
              <p className="mt-1 text-base leading-7 text-hero-soft">
                We read every message and reply by email when an answer is needed.
              </p>
            </div>
          </div>
        )}
        {status.kind === "error" && (
          <div className="flex items-start gap-3 rounded-xl border border-red-200 border-l-4 border-l-red-700 bg-red-50 p-4 sm:p-5">
            <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-800">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                <path d="M12 7v6M12 17h.01" />
              </svg>
            </span>
            <p className="text-base leading-7 text-red-900">{status.message}</p>
          </div>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={ids.name} className="font-semibold text-ink">
            Name <span className="font-normal text-muted">(required)</span>
          </label>
          <input
            ref={(el) => {
              refs.current.name = el;
            }}
            id={ids.name}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={CONTACT_LIMITS.nameMax}
            value={fields.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("name")}
            className={`${inputClass} border-line`}
          />
          {fieldError("name")}
        </div>
        <div>
          <label htmlFor={ids.email} className="font-semibold text-ink">
            Email address <span className="font-normal text-muted">(required)</span>
          </label>
          <input
            ref={(el) => {
              refs.current.email = el;
            }}
            id={ids.email}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={CONTACT_LIMITS.emailMax}
            value={fields.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("email")}
            className={`${inputClass} border-line`}
          />
          {fieldError("email")}
        </div>
      </div>

      <div>
        <label htmlFor={ids.subject} className="font-semibold text-ink">
          Subject <span className="font-normal text-muted">(required)</span>
        </label>
        <select
          ref={(el) => {
            refs.current.subject = el;
          }}
          id={ids.subject}
          name="subject"
          required
          value={fields.subject}
          onChange={(e) => update("subject", e.target.value)}
          aria-invalid={errors.subject ? true : undefined}
          aria-describedby={describedBy("subject")}
          className={`${inputClass} min-h-12 border-line`}
        >
          <option value="">Choose a subject</option>
          {CONTACT_SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {fieldError("subject")}
      </div>

      <div>
        <label htmlFor={ids.message} className="font-semibold text-ink">
          Message <span className="font-normal text-muted">(required)</span>
        </label>
        <p id={`${ids.message}-hint`} className="mt-1 text-sm text-muted">
          For a correction, please include the dish name, the page, and what you saw (for example the price and the date).
        </p>
        <textarea
          ref={(el) => {
            refs.current.message = el;
          }}
          id={ids.message}
          name="message"
          required
          rows={7}
          maxLength={CONTACT_LIMITS.messageMax}
          value={fields.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy("message", `${ids.message}-hint ${ids.message}-count`)}
          className={`${inputClass} border-line leading-7`}
        />
        <p id={`${ids.message}-count`} className="mt-1 text-right text-xs text-muted tabular-nums">
          {fields.message.length.toLocaleString("en-US")} / {CONTACT_LIMITS.messageMax.toLocaleString("en-US")}
        </p>
        {fieldError("message")}
      </div>

      {/* Honeypot: hidden from people and screen readers; automated senders often fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={ids.website}>Leave this field empty</label>
        <input
          id={ids.website}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={fields.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <p className="text-sm leading-6 text-muted">
        <strong className="font-semibold text-ink">Privacy:</strong> we use your name, email address, and message only to
        read and answer your message. They are sent to us by email and are not published, sold, or added to a mailing
        list. See our{" "}
        <Link
          href="/privacy-policy"
          className="font-medium text-brand-dark underline underline-offset-4 hover:text-brand-darker focus-visible:outline-2 focus-visible:outline-brand-dark"
        >
          Privacy Policy
        </Link>
        .
      </p>

      <button
        type="submit"
        disabled={!enabled || sending}
        aria-busy={sending || undefined}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-dark px-6 font-semibold text-white transition-colors hover:bg-brand-darker focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
