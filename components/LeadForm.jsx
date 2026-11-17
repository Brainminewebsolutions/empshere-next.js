"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { getUtm } from "@/lib/utm";

/* --------------------------------------------------------------------
   The one lead form used everywhere on the site: the Contact page, the
   product-page heroes and the "Request Demo" popup (components/DemoModal).
   Fields match https://www.emsphere.com/contact-us/.

   Submission: POSTs JSON to NEXT_PUBLIC_FORM_ENDPOINT, set in
   next.config.mjs: /api/lead.php (PHPMailer) in the static Hostinger build,
   /api/lead/ (app/api/lead/route.js, Nodemailer) in `next dev` and Node
   builds. Both verify the captcha and send the lead + thank-you emails
   through Gmail SMTP.

   Spam protection: set NEXT_PUBLIC_TURNSTILE_SITE_KEY to a Cloudflare
   Turnstile site key and the widget appears above the Submit button. Its
   token is sent as "cf-turnstile-response"; the API route verifies it with
   Cloudflare using TURNSTILE_SECRET_KEY.
   -------------------------------------------------------------------- */

const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/api/lead/";
const THANK_YOU_PATH = "/thank-you/";
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const MOBILE_MAX = 10;

export const PRODUCTS = [
  "emHRMS",
  "emContract labour management system",
  "emWorkforce management system",
  "emPayroll management software",
  "emVisit visitor management system",
  "emCount emergency headcount system",
  "emMeal Canteen Management System",
];

/* Which product to preselect on each page. */
export function productForPath(pathname = "") {
  if (pathname.startsWith("/contract-labour") || pathname.startsWith("/clms-")) return PRODUCTS[1];
  if (pathname.startsWith("/workforce")) return PRODUCTS[2];
  if (pathname.startsWith("/empay") || pathname.startsWith("/payroll")) return PRODUCTS[3];
  if (pathname.startsWith("/visitor")) return PRODUCTS[4];
  if (pathname.startsWith("/headcount")) return PRODUCTS[5];
  if (pathname.startsWith("/canteen")) return PRODUCTS[6];
  return PRODUCTS[0];
}

const ease = "ease-[cubic-bezier(0.16,1,0.3,1)]";
const fieldClass =
  "w-full rounded-[9px] border border-[#dddddd] bg-white px-3.5 py-2.5 text-[15px] text-[#1f1f1f] placeholder:text-black/35 " +
  `transition-[border-color,box-shadow] duration-200 ${ease} ` +
  "hover:border-[#d6c48f] focus:border-[#EFB000] focus:outline-none focus:ring-4 focus:ring-[#EFB000]/15 " +
  "aria-[invalid=true]:border-[#ef4444] aria-[invalid=true]:ring-[#ef4444]/10";

function Field({ id, label, required, error, hint, className = "", tight = false, children }) {
  return (
    <div className={`flex flex-col ${tight ? "gap-1" : "gap-1.5"} ${className}`}>
      <label htmlFor={id} className={`font-semibold text-[#1f1f1f] ${tight ? "text-[12px] sm:text-[13px]" : "text-[13px]"}`}>
        {label}
        {required && <span className="text-[#ef4444]"> *</span>}
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

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your work email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (!values.mobile) errors.mobile = "Please enter your mobile number.";
  else if (values.mobile.length !== MOBILE_MAX) errors.mobile = `Mobile number must be ${MOBILE_MAX} digits.`;
  if (!values.company.trim()) errors.company = "Please enter your company name.";
  if (!values.message.trim()) errors.message = "Please enter a message.";
  return errors;
}

/* Loads Cloudflare's script once and renders the widget into `ref`. */
function useTurnstile(ref, onToken, onError) {
  const widgetRef = useRef(null);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !ref.current) return undefined;
    let cancelled = false;
    let script = null;

    const render = () => {
      if (cancelled || !window.turnstile || !ref.current) return;
      widgetRef.current = window.turnstile.render(ref.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: "light",
        size: "flexible",
        callback: (token) => onToken(token),
        "expired-callback": () => onToken(""),
        "error-callback": () => onToken(""),
      });
    };
    const failed = () => !cancelled && onError();

    if (window.turnstile) render();
    else {
      script = document.querySelector(`script[src="${TURNSTILE_SRC}"]`);
      if (!script) {
        script = document.createElement("script");
        script.src = TURNSTILE_SRC;
        script.async = true;
        document.head.appendChild(script);
      }
      script.addEventListener("load", render);
      script.addEventListener("error", failed);
    }

    return () => {
      cancelled = true;
      script?.removeEventListener("load", render);
      script?.removeEventListener("error", failed);
      if (widgetRef.current !== null) window.turnstile?.remove(widgetRef.current);
      widgetRef.current = null;
    };
    // onToken / onError only call state setters, stable across renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  // Reset this form's widget only: a page can show two forms (hero + popup).
  return () => {
    if (widgetRef.current !== null) window.turnstile?.reset(widgetRef.current);
  };
}

export default function LeadForm({
  product = PRODUCTS[0],
  title = "Contact Us",
  subtitle,
  submitLabel = "Submit",
  framed = true,
  autoFocus = false,
  compact = false,
  // Pin the Submit button to the bottom of a scrolling sheet on phones
  // (components/DemoModal), so it is always in reach.
  stickySubmit = false,
}) {
  const uid = useId();
  const empty = { name: "", email: "", mobile: "", company: "", product, message: "", website: "" };
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const [status, setStatus] = useState("idle"); // idle | sending | sent | failed | captcha
  const [captcha, setCaptcha] = useState("");
  const [captchaError, setCaptchaError] = useState(""); // "" | missing | unavailable
  const turnstileRef = useRef(null);
  const resetTurnstile = useTurnstile(
    turnstileRef,
    (token) => {
      setCaptcha(token);
      if (token) setCaptchaError("");
    },
    () => setCaptchaError("unavailable")
  );

  const ids = {
    title: `${uid}-title`,
    name: `${uid}-name`,
    email: `${uid}-email`,
    mobile: `${uid}-mobile`,
    company: `${uid}-company`,
    product: `${uid}-product`,
    message: `${uid}-message`,
  };

  useEffect(() => {
    // Mouse/trackpad only: on phones, focusing opens the keyboard over the form.
    if (autoFocus && window.matchMedia("(pointer: fine)").matches) {
      document.getElementById(ids.name)?.focus({ preventScroll: true });
    }
  }, [autoFocus, ids.name]);

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
    if (TURNSTILE_SITE_KEY && !captcha) {
      setCaptchaError((prev) => prev || "missing");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          mobile: values.mobile,
          company: values.company.trim(),
          product: values.product,
          message: values.message.trim(),
          page: window.location.href,
          ...getUtm(),
          "cf-turnstile-response": captcha || undefined,
        }),
      });
      // Require the API's JSON {ok:true}: a static host answers 200 with an
      // HTML page, which must not count as a delivered lead.
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.ok !== true) throw new Error(data.error || `HTTP ${res.status}`);
      setStatus("sent");
      router.push(THANK_YOU_PATH);
    } catch (error) {
      setStatus(String(error?.message).startsWith("captcha") ? "captcha" : "failed");
      // A Turnstile token works only once; get a fresh one for the retry.
      setCaptcha("");
      resetTurnstile();
    }
  };

  const describedBy = (field, extra) => [errors[field] ? `${ids[field]}-error` : null, extra].filter(Boolean).join(" ") || undefined;

  const field = compact ? `${fieldClass} max-sm:!rounded-[8px] max-sm:!px-3 max-sm:!py-[7px] max-sm:!text-base sm:!py-2 sm:!text-sm` : fieldClass;

  const frame = framed
    ? `relative overflow-hidden rounded-2xl bg-white p-5 shadow-[inset_0_0_0_1px_#e5e5e5,0_12px_28px_-12px_rgba(0,0,0,0.1)] ${compact ? "sm:p-6" : "sm:p-7"}`
    : "relative";

  return (
    <div id={framed ? "request-demo" : undefined} className={`@container scroll-mt-28 ${frame}`}>
      {framed && <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-[#EFB000]" />}

      <form onSubmit={handleSubmit} noValidate aria-labelledby={title ? ids.title : undefined} className={`flex flex-col ${compact ? "gap-2.5 sm:gap-3" : "gap-4"}`}>
        {title && (
          <header>
            <h2 id={ids.title} className={`font-semibold tracking-[-0.01em] text-[#1f1f1f] ${compact ? "text-xl" : "text-xl sm:text-2xl"}`}>
              {title}
            </h2>
            {subtitle && <p className={`mt-1 text-black/60 ${compact ? "text-[13px] leading-[19px]" : "text-sm leading-[21px]"}`}>{subtitle}</p>}
          </header>
        )}

        <div className={`grid ${compact ? "grid-cols-2 gap-x-2.5 gap-y-2 @min-[360px]:gap-x-3.5 @min-[360px]:gap-y-3" : "grid-cols-1 gap-4 @min-[360px]:grid-cols-2"}`}>
          <Field id={ids.name} label="Name" required error={errors.name} tight={compact} className={`${compact ? "col-span-2 @min-[360px]:col-span-1" : ""}`}>
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
              className={field}
            />
          </Field>

          <Field id={ids.email} label="Work Email" required error={errors.email} tight={compact} className={`${compact ? "col-span-2 @min-[360px]:col-span-1" : ""}`}>
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
              className={field}
            />
          </Field>

          <Field
            id={ids.mobile}
            label="Mobile Number"
            required
            tight={compact}
            error={errors.mobile}
            hint={
              <p id={`${ids.mobile}-count`} className={`text-xs text-black/50 ${compact ? "sr-only" : ""}`} aria-live="polite">
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
              placeholder="10-digit number"
              aria-invalid={Boolean(errors.mobile)}
              aria-describedby={describedBy("mobile", errors.mobile ? null : `${ids.mobile}-count`)}
              className={field}
            />
          </Field>

          <Field id={ids.company} label="Company Name" required error={errors.company} tight={compact}>
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
              className={field}
            />
          </Field>

          <Field id={ids.product} label="Select Product" tight={compact} className={compact ? "col-span-2" : "@min-[360px]:col-span-2"}>
            <div className="relative">
              <select
                id={ids.product}
                name="product"
                value={values.product}
                onChange={update("product")}
                className={`${field} cursor-pointer appearance-none pr-10`}
              >
                {PRODUCTS.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <svg viewBox="0 0 20 20" aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-black/45" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 7.5l5 5 5-5" />
              </svg>
            </div>
          </Field>

          <Field id={ids.message} label="Message" required error={errors.message} tight={compact} className={compact ? "col-span-2" : "@min-[360px]:col-span-2"}>
            <textarea
              id={ids.message}
              name="message"
              rows={compact ? 2 : 3}
              value={values.message}
              onChange={update("message")}
              placeholder="Message..."
              aria-invalid={Boolean(errors.message)}
              aria-describedby={describedBy("message")}
              className={`${field} resize-y ${compact ? "min-h-[56px] sm:min-h-[72px]" : "min-h-[92px]"}`}
            />
          </Field>
        </div>

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

        {TURNSTILE_SITE_KEY && (
          <div>
            <div ref={turnstileRef} className="min-h-[65px]" />
            {captchaError && (
              <p role="alert" className="mt-1 text-xs font-medium text-[#ef4444]">
                {captchaError === "unavailable" ? (
                  <>
                    The security check could not load. Please allow it in your ad blocker, or write to us at{" "}
                    <a href="mailto:sales@emsphere.com" className="underline underline-offset-2">sales@emsphere.com</a>.
                  </>
                ) : (
                  "Please complete the security check."
                )}
              </p>
            )}
          </div>
        )}

        <p className={`text-black/55 ${compact ? "text-[11px] leading-[16px] sm:text-xs sm:leading-[18px]" : "text-xs leading-[18px]"}`}>
          By sharing your details, you agree to Emsphere Technologies&apos;{" "}
          <Link href="/privacy-policy" className="font-medium text-[#b07d00] underline-offset-2 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>

        {(status === "failed" || status === "captcha") && (
          <p role="alert" className="rounded-[10px] bg-[#fff0ef] px-4 py-3 text-sm font-medium text-[#c2362c]">
            {status === "captcha" ? (
              "The security check failed or expired. Please complete it again and resubmit."
            ) : (
              <>
                Something went wrong. Please try again, or write to us at{" "}
                <a href="mailto:sales@emsphere.com" className="underline underline-offset-2">sales@emsphere.com</a>.
              </>
            )}
          </p>
        )}

        <div
          className={
            stickySubmit
              ? "max-sm:sticky max-sm:bottom-0 max-sm:z-10 max-sm:-mx-4 max-sm:-mb-4 max-sm:border-t max-sm:border-black/[0.06] max-sm:bg-white max-sm:px-4 max-sm:py-3"
              : undefined
          }
        >
        <button
          type="submit"
          disabled={status === "sending" || status === "sent"}
          className={`group/btn inline-flex w-full items-center justify-center gap-2 rounded-[9px] bg-[#EFB000] px-6 font-semibold ${compact ? "py-2.5 text-sm" : "py-3 text-[15px]"} tracking-[0.02em] text-white transition-[translate,box-shadow,background-color] duration-300 ${ease} hover:-translate-y-0.5 hover:bg-[#d99e00] hover:shadow-[0_8px_18px_-4px_rgba(239,176,0,0.45)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#efb000]/50 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0`}
        >
          {status === "sending" || status === "sent" ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                <path fill="currentColor" d="M4 12a8 8 0 0 1 8-8v8Z" className="opacity-75" />
              </svg>
              Sending…
            </>
          ) : (
            <>
              {submitLabel}
              <svg viewBox="0 0 20 20" aria-hidden="true" className={`h-4 w-4 transition-[translate] duration-200 ${ease} group-hover/btn:translate-x-[3px]`} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 10h12M11 5l5 5-5 5" />
              </svg>
            </>
          )}
        </button>
        </div>
      </form>
    </div>
  );
}
