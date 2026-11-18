"use client";

import {
  FormEvent,
  useEffect,
  useId,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRsvp } from "@/components/RsvpProvider";
import {
  MAX_PARTY_SIZE,
  normalizeRsvp,
  validateRsvp,
  type RsvpErrors,
  type RsvpInput,
} from "@/lib/validations";

const initialForm: RsvpInput = {
  guestName: "",
  contact: "",
  partySize: 1,
  companions: [],
  wishes: "",
};

export function RsvpModal() {
  const { isOpen, closeRsvp } = useRsvp();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25 }}
        >
          <button
            type="button"
            aria-label="Close RSVP"
            className="absolute inset-0 bg-[var(--deep-taupe)]/45 backdrop-blur-[2px]"
            onClick={closeRsvp}
          />
          <RsvpDialog onClose={closeRsvp} reduceMotion={!!reduceMotion} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function RsvpDialog({
  onClose,
  reduceMotion,
}: {
  onClose: () => void;
  reduceMotion: boolean;
}) {
  const titleId = useId();
  const [form, setForm] = useState<RsvpInput>(initialForm);
  const [errors, setErrors] = useState<RsvpErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validateRsvp(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(normalizeRsvp(form)),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        setErrors({
          form: data?.error ?? "Something went wrong. Please try again.",
        });
        return;
      }
      setSuccess(true);
    } catch {
      setErrors({ form: "Unable to submit right now. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="relative z-10 max-h-[92dvh] w-full max-w-md overflow-y-auto bg-[var(--white)] px-6 py-8 shadow-xl sm:px-8"
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: 16 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 font-sans text-xs uppercase tracking-[0.2em] text-[var(--warm-beige)] transition hover:text-[var(--deep-taupe)]"
      >
        Close
      </button>

      {success ? (
        <div className="py-10 text-center">
          <h2
            id={titleId}
            className="font-serif text-3xl text-[var(--deep-taupe)]"
          >
            Thank You
          </h2>
          <p className="mt-4 font-serif text-base text-[var(--deep-taupe)]/75">
            Your RSVP has been received. We look forward to celebrating with
            you.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-8 bg-[var(--deep-taupe)] px-8 py-3 font-sans text-xs uppercase tracking-[0.28em] text-[var(--champagne)]"
          >
            Done
          </button>
        </div>
      ) : (
        <>
          <h2
            id={titleId}
            className="pr-12 font-serif text-3xl text-[var(--deep-taupe)]"
          >
            RSVP
          </h2>
          <p className="mt-2 font-serif text-sm text-[var(--deep-taupe)]/70">
            Kindly share your details so we can welcome you.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
            <Field
              label="Guest name"
              error={errors.guestName}
              htmlFor="guestName"
            >
              <input
                id="guestName"
                name="guestName"
                autoComplete="name"
                value={form.guestName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, guestName: e.target.value }))
                }
                className={inputClass}
              />
            </Field>

            <Field
              label="Contact number"
              error={errors.contact}
              htmlFor="contact"
            >
              <input
                id="contact"
                name="contact"
                type="tel"
                autoComplete="tel"
                value={form.contact}
                onChange={(e) =>
                  setForm((f) => ({ ...f, contact: e.target.value }))
                }
                className={inputClass}
              />
            </Field>

            <Field
              label="Number of guests (including you)"
              error={errors.partySize}
              htmlFor="partySize"
            >
              <select
                id="partySize"
                name="partySize"
                value={form.partySize}
                onChange={(e) => {
                  const partySize = Number(e.target.value);
                  setForm((f) => ({
                    ...f,
                    partySize,
                    companions: Array.from(
                      { length: Math.max(0, partySize - 1) },
                      (_, i) => f.companions[i] ?? "",
                    ),
                  }));
                  setErrors((current) => ({ ...current, companions: undefined }));
                }}
                className={inputClass}
              >
                {Array.from({ length: MAX_PARTY_SIZE }, (_, i) => i + 1).map(
                  (size) => (
                    <option key={size} value={size}>
                      {size === 1 ? "1 — Just me" : size}
                    </option>
                  ),
                )}
              </select>
              <p className="mt-1.5 font-serif text-sm text-[var(--deep-taupe)]/60">
                Up to {MAX_PARTY_SIZE} people in total, including yourself.
              </p>
            </Field>

            {form.companions.map((name, index) => (
              <Field
                key={index}
                label={`Name of guest ${index + 2}`}
                error={errors.companions?.[index] || undefined}
                htmlFor={`companion-${index}`}
              >
                <input
                  id={`companion-${index}`}
                  name={`companion-${index}`}
                  autoComplete="name"
                  value={name}
                  onChange={(e) => {
                    const value = e.target.value;
                    setForm((f) => {
                      const companions = [...f.companions];
                      companions[index] = value;
                      return { ...f, companions };
                    });
                  }}
                  className={inputClass}
                  placeholder="Person coming with you"
                />
              </Field>
            ))}

            <Field label="Wishes (optional)" htmlFor="wishes">
              <textarea
                id="wishes"
                name="wishes"
                rows={3}
                value={form.wishes}
                onChange={(e) =>
                  setForm((f) => ({ ...f, wishes: e.target.value }))
                }
                className={`${inputClass} resize-none`}
                placeholder="A short message for the couple"
              />
            </Field>

            {errors.form ? (
              <p className="font-sans text-sm text-red-700" role="alert">
                {errors.form}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[var(--deep-taupe)] px-8 py-3.5 font-sans text-xs uppercase tracking-[0.28em] text-[var(--champagne)] transition hover:bg-[var(--warm-beige)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Submit"}
            </button>
          </form>
        </>
      )}
    </motion.div>
  );
}

const inputClass =
  "w-full border border-[var(--soft-gold)]/60 bg-[var(--champagne)]/40 px-3 py-2.5 font-serif text-base text-[var(--deep-taupe)] outline-none transition placeholder:text-[var(--deep-taupe)]/35 focus:border-[var(--warm-beige)]";

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block font-sans text-xs uppercase tracking-[0.2em] text-[var(--warm-beige)]"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 font-sans text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
