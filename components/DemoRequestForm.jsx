"use client";

import { useId, useState } from "react";

/* --------------------------------------------------------------------
   "Request for demo" form used in product-page heroes.

   Submission: set DEMO_FORM_ENDPOINT to a URL that accepts a JSON POST
   (e.g. a Formspree / Web3Forms / WordPress endpoint). The site is a
   static export, so there is no server of its own to receive it.
   Until an endpoint is set, the form only shows the success message
   (same as components/ContactForm.jsx) — no data is sent anywhere.
   -------------------------------------------------------------------- */

const DEMO_FORM_ENDPOINT = "";
const MOBILE_MAX = 10;

const ease = "ease-[cubic-bezier(0.16,1,0.3,1)]";
const inputClass =
  "peer w-full rounded-[9px] border border-[#dddddd] bg-white px-3.5 py-2.5 text-sm text-[#1f1f1f] placeholder:text-black/35 " +
  `transition-[border-color,box-shadow] duration-200 ${ease} ` +
  "hover:border-[#bcd8ee] focus:border-[#0077c2] focus:outline-none focus:ring-4 focus:ring-[#0077c2]/12 " +
  "aria-[invalid=true]:border-[#ef4444] aria-[invalid=true]:ring-[#ef4444]/10";

function Field({ id, label, error, hint, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-[13px] font-semibold text-[#1f1f1f]">
        {label} <span className="text-[#ef4444]">*</span>
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-xs font-medium text-[#ef4444]">
          {error}
        </p>
      ) : (
        hint
      )}
    </div>
  );
}

const EMPTY = { name: "", email: "", mobile: "", company: "", website: "" };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your work email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (!values.mobile) errors.mobile = "Please enter your mobile number.";
  else if (values.mobile.length !== MOBILE_MAX) errors.mobile = `Mobile number must be ${MOBILE_MAX} digits.`;
  if (!values.company.trim()) errors.company = "Please enter your company name.";
  return errors;
}

export default function DemoRequestForm({ product = "Contract Labour Management System", title = "Request for demo", subtitle }) {
  const uid = useId();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | failed

  const ids = {
    name: `${uid}-name`,
    email: `${uid}-email`,
    mobile: `${uid}-mobile`,
    company: `${uid}-company`,
  };

  const update = (field) => (event) => {
    let value = event.target.value;
    if (field === "mobile") value = value.replace(/\D/g, "").slice(0, MOBILE_MAX);
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Hidden "website" field: real people never fill it, bots usually do.
    if (values.website) return;

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(ids[Object.keys(found)[0]])?.focus();
      return;
    }

    setStatus("sending");
    try {
      if (DEMO_FORM_ENDPOINT) {
        const res = await fetch(DEMO_FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: values.name.trim(),
            email: values.email.trim(),
            mobile: values.mobile,
            company: values.company.trim(),
            product,
            page: typeof window !== "undefined" ? window.location.href : "",
          }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 700));
      }
      setStatus("sent");
      setValues(EMPTY);
    } catch {
      setStatus("failed");
    }
  };

  const describedBy = (field, extra) => [errors[field] ? `${ids[field]}-error` : null, extra].filter(Boolean).join(" ") || undefined;

  return (
    <div
      id="request-demo"
      className="relative scroll-mt-28 overflow-hidden rounded-2xl bg-white p-5 shadow-[inset_0_0_0_0.814px_#dddddd,0_24px_60px_-24px_rgba(0,0,0,0.35)] sm:p-6"
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#efb000] via-[#f8bb18] to-[#0077c2]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#fff1c7] blur-2xl" />

      {status === "sent" ? (
        <div role="status" className="relative flex flex-col items-center gap-3 py-6 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d1f4e3] text-[#0b8f63]">
            <svg viewBox="0 0 20 20" aria-hidden="true" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M4.5 10.5l3.5 3.5 7.5-8" />
            </svg>
          </span>
          <h2 className="text-xl font-semibold text-[#1f1f1f]">Thank you!</h2>
          <p className="max-w-sm text-[15px] leading-[23px] text-black/60">
            We have received your demo request. Our team will get in touch with you shortly.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-2 rounded-[9px] px-4 py-2 text-sm font-semibold text-[#0077c2] transition-colors hover:bg-[#eef6fd]"
          >
            Submit another request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="relative flex flex-col gap-3" aria-label={title}>
          <header>
            <h2 className="text-xl font-semibold text-[#1f1f1f]">{title}</h2>
            {subtitle && <p className="mt-1 text-sm leading-[20px] text-black/60">{subtitle}</p>}
          </header>

          <Field id={ids.name} label="Name" error={errors.name}>
            <input
              id={ids.name}
              name="name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={update("name")}
              placeholder="Your full name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={describedBy("name")}
              className={inputClass}
            />
          </Field>

          <Field id={ids.email} label="Work Email" error={errors.email}>
            <input
              id={ids.email}
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={values.email}
              onChange={update("email")}
              placeholder="name@company.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={describedBy("email")}
              className={inputClass}
            />
          </Field>

          <Field
            id={ids.mobile}
            label="Mobile Number"
            error={errors.mobile}
            hint={
              <p id={`${ids.mobile}-count`} className="text-xs text-black/50" aria-live="polite">
                {values.mobile.length} of {MOBILE_MAX} max characters.
              </p>
            }
          >
            <input
              id={ids.mobile}
              name="mobile"
              type="tel"
              autoComplete="tel-national"
              inputMode="numeric"
              maxLength={MOBILE_MAX}
              value={values.mobile}
              onChange={update("mobile")}
              placeholder="10-digit mobile number"
              aria-invalid={Boolean(errors.mobile)}
              aria-describedby={describedBy("mobile", errors.mobile ? null : `${ids.mobile}-count`)}
              className={inputClass}
            />
          </Field>

          <Field id={ids.company} label="Company Name" error={errors.company}>
            <input
              id={ids.company}
              name="company"
              type="text"
              autoComplete="organization"
              value={values.company}
              onChange={update("company")}
              placeholder="Your company"
              aria-invalid={Boolean(errors.company)}
              aria-describedby={describedBy("company")}
              className={inputClass}
            />
          </Field>

          {/* Honeypot — hidden from people and screen readers. */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={update("website")}
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />

          {status === "failed" && (
            <p role="alert" className="rounded-[10px] bg-[#fff0ef] px-4 py-3 text-sm font-medium text-[#c2362c]">
              Something went wrong. Please try again, or write to us from the Contact page.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className={`group/btn mt-1 inline-flex w-full items-center justify-center gap-2 rounded-[9px] bg-[#0077c2] px-6 py-3 text-[15px] font-semibold text-white transition-[translate,box-shadow,background-color] duration-300 ${ease} hover:-translate-y-0.5 hover:bg-[#0061af] hover:shadow-[0_8px_18px_-4px_rgba(0,119,194,0.45)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#efb000]/60 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0`}
          >
            {status === "sending" ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                  <path fill="currentColor" d="M4 12a8 8 0 0 1 8-8v8Z" className="opacity-75" />
                </svg>
                Sending…
              </>
            ) : (
              <>
                Request for demo
                <svg viewBox="0 0 20 20" aria-hidden="true" className={`h-4 w-4 transition-[translate] duration-200 ${ease} group-hover/btn:translate-x-[3px]`} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 10h12M11 5l5 5-5 5" />
                </svg>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
