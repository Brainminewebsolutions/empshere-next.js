"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Briefcase, CheckCircle, Clock, MapPin, Paperclip, UserCircle, WarningCircle, X } from "@phosphor-icons/react";

/* --------------------------------------------------------------------
   Open roles on /careers. The jobs come from the admin dashboard
   (Admin -> Job openings) through app/careers/page.jsx.

   Each card opens a details popup with an "Apply now" button; that switches
   the same popup to the application form, which posts the details and the
   resume to /api/careers/apply/ (emailed to HR).
   -------------------------------------------------------------------- */

const ENDPOINT = "/api/careers/apply/";
const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const RESUME_EXT = /\.(pdf|docx?)$/i;
const LOGO_SRC = "/universal-images/header/emsphere-logo-400.webp";

const inputCls =
  "w-full rounded-lg border border-[#d9d9d9] bg-white px-3.5 py-2.5 text-[15px] text-[#1f1f1f] placeholder:text-black/35 transition-[border-color,box-shadow] focus:border-[#EFB000] focus:outline-none focus:ring-4 focus:ring-[#EFB000]/25 aria-[invalid=true]:border-[#d64545]";
const labelCls = "mb-1.5 block text-[13px] font-semibold text-[#1f1f1f]";

const lines = (value) => (value || "").split("\n").map((l) => l.trim()).filter(Boolean);

function Meta({ icon: Icon, children }) {
  if (!children) return null;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff5d9] px-3 py-1 text-xs font-semibold text-[#8a6200]">
      <Icon weight="bold" aria-hidden="true" className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}

function Field({ id, label, required, error, children }) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label} {required && <span className="text-[#d64545]" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs font-medium text-[#d64545]">{error}</p>}
    </div>
  );
}

function ApplyForm({ job, onDone, onBack }) {
  const [status, setStatus] = useState("idle"); // idle | sending | error
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const formRef = useRef(null);

  const submit = async (event) => {
    event.preventDefault();
    const form = formRef.current;
    const data = new FormData(form);
    const next = {};
    if (!String(data.get("name")).trim()) next.name = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(data.get("email")).trim())) next.email = "Enter a valid email address.";
    if (String(data.get("phone")).replace(/\D/g, "").length < 10) next.phone = "Enter a valid phone number.";
    if (!String(data.get("location")).trim()) next.location = "Enter your current location.";
    if (!String(data.get("experience")).trim()) next.experience = "Enter your total experience.";
    const file = data.get("resume");
    if (!file || !file.size) next.resume = "Attach your resume.";
    else if (!RESUME_EXT.test(file.name)) next.resume = "Upload a PDF, DOC or DOCX file.";
    else if (file.size > MAX_RESUME_BYTES) next.resume = "The file is larger than 5 MB.";
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector("[aria-invalid='true']")?.focus();
      return;
    }

    data.set("jobId", job.id);
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch(ENDPOINT, { method: "POST", body: data });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        onDone();
        return;
      }
      if (json.error === "job_closed") setMessage("This position is no longer open. Please pick another role.");
      else if (json.error === "resume_too_large") setMessage("Your resume is larger than 5 MB.");
      else if (json.error === "resume_type") setMessage("Please upload your resume as a PDF, DOC or DOCX file.");
      else if (json.error === "invalid") setMessage("Please check the highlighted fields and try again.");
      else setMessage("We could not send your application. Please try again or email hr@emsphere.com.");
      if (Array.isArray(json.fields)) setErrors(Object.fromEntries(json.fields.map((f) => [f, "Please check this field."])));
    } catch {
      setMessage("Network problem. Please check your connection and try again.");
    }
    setStatus("error");
  };

  const err = (key) => (errors[key] ? { "aria-invalid": true } : {});

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="flex flex-col gap-4">
      {/* Honeypot for bots */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="ap-name" label="Full name" required error={errors.name}>
          <input id="ap-name" name="name" autoComplete="name" maxLength={120} className={inputCls} {...err("name")} />
        </Field>
        <Field id="ap-email" label="Email" required error={errors.email}>
          <input id="ap-email" name="email" type="email" autoComplete="email" maxLength={160} className={inputCls} {...err("email")} />
        </Field>
        <Field id="ap-phone" label="Phone" required error={errors.phone}>
          <input id="ap-phone" name="phone" type="tel" autoComplete="tel" maxLength={20} className={inputCls} {...err("phone")} />
        </Field>
        <Field id="ap-location" label="Current location" required error={errors.location}>
          <input id="ap-location" name="location" autoComplete="address-level2" maxLength={120} className={inputCls} {...err("location")} />
        </Field>
        <Field id="ap-exp" label="Total experience" required error={errors.experience}>
          <input id="ap-exp" name="experience" placeholder="e.g. 4 years" maxLength={40} className={inputCls} {...err("experience")} />
        </Field>
        <Field id="ap-company" label="Current company">
          <input id="ap-company" name="currentCompany" autoComplete="organization" maxLength={160} className={inputCls} />
        </Field>
        <Field id="ap-ctc" label="Current CTC">
          <input id="ap-ctc" name="currentCtc" placeholder="e.g. 8 LPA" maxLength={60} className={inputCls} />
        </Field>
        <Field id="ap-ectc" label="Expected CTC">
          <input id="ap-ectc" name="expectedCtc" placeholder="e.g. 12 LPA" maxLength={60} className={inputCls} />
        </Field>
        <Field id="ap-notice" label="Notice period">
          <input id="ap-notice" name="noticePeriod" placeholder="e.g. 30 days" maxLength={60} className={inputCls} />
        </Field>
        <Field id="ap-linkedin" label="LinkedIn / portfolio">
          <input id="ap-linkedin" name="linkedin" maxLength={300} placeholder="https://" className={inputCls} />
        </Field>
      </div>

      <Field id="ap-resume" label="Resume (PDF, DOC or DOCX, max 5 MB)" required error={errors.resume}>
        <label
          htmlFor="ap-resume"
          className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-[#EFB000] bg-[#fffcf0] px-4 py-3 text-sm transition-colors hover:bg-[#fff5d9]"
        >
          <Paperclip weight="bold" aria-hidden="true" className="h-5 w-5 shrink-0 text-[#b07d00]" />
          <span className="min-w-0 truncate font-medium text-[#1f1f1f]">{fileName || "Choose a file to upload"}</span>
        </label>
        <input
          id="ap-resume"
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="sr-only"
          onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
          {...err("resume")}
        />
      </Field>

      <Field id="ap-note" label="Cover note (optional)">
        <textarea id="ap-note" name="message" rows={4} maxLength={3000} className={`${inputCls} resize-y`} />
      </Field>

      {message && (
        <p role="alert" className="flex items-start gap-2 rounded-lg bg-[#fdecec] px-3.5 py-3 text-sm font-medium text-[#8f1f1f]">
          <WarningCircle weight="fill" aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          {message}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="button" onClick={onBack} className="rounded-lg px-4 py-3 text-sm font-semibold text-[#4c4c4c] hover:text-[#b07d00]">
          Back to details
        </button>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#EFB000] px-7 py-3 text-[15px] font-semibold text-white shadow-[0_10px_22px_-10px_rgba(239,176,0,0.8)] transition-colors hover:bg-[#d99e00] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "sending" ? "Sending…" : "Submit application"}
          {status !== "sending" && <ArrowRight weight="bold" aria-hidden="true" className="h-4 w-4" />}
        </button>
      </div>
    </form>
  );
}

function JobDetails({ job, onApply }) {
  const description = lines(job.description);
  const requirements = lines(job.requirements);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        <Meta icon={Briefcase}>{job.department}</Meta>
        <Meta icon={MapPin}>{job.location}</Meta>
        <Meta icon={Clock}>{job.employment_type}</Meta>
        <Meta icon={UserCircle}>{job.experience}</Meta>
        {job.salary && <Meta icon={Briefcase}>{job.salary}</Meta>}
      </div>
      {job.summary && <p className="text-base leading-relaxed text-black/70">{job.summary}</p>}
      {description.length > 0 && (
        <section>
          <h4 className="mb-2 text-sm font-bold uppercase tracking-[0.12em] text-[#b07d00]">About the role</h4>
          <div className="flex flex-col gap-2 text-[15px] leading-relaxed text-black/70">
            {description.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </section>
      )}
      {requirements.length > 0 && (
        <section>
          <h4 className="mb-2 text-sm font-bold uppercase tracking-[0.12em] text-[#b07d00]">Requirements</h4>
          <ul className="flex flex-col gap-2 text-[15px] leading-relaxed text-black/70">
            {requirements.map((r, i) => (
              <li key={i} className="flex gap-2.5">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#EFB000]" />
                {r}
              </li>
            ))}
          </ul>
        </section>
      )}
      <button
        type="button"
        onClick={onApply}
        className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-[#EFB000] px-7 py-3 text-[15px] font-semibold text-white shadow-[0_10px_22px_-10px_rgba(239,176,0,0.8)] transition-colors hover:bg-[#d99e00] max-sm:w-full"
      >
        Apply now
        <ArrowRight weight="bold" aria-hidden="true" className="h-4 w-4" />
      </button>
    </div>
  );
}

function JobDialog({ job, initialView, onClose }) {
  const [view, setView] = useState(initialView); // details | apply | done
  const panel = useRef(null);

  useEffect(() => {
    const previous = document.activeElement;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    // Lenis (smooth scroll) hijacks the wheel, so pause it while the popup is open.
    window.lenis?.stop();
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    panel.current?.focus();
    return () => {
      document.body.style.overflow = "";
      window.lenis?.start();
      document.body.style.paddingRight = "";
      previous?.focus?.();
    };
  }, []);

  useEffect(() => {
    panel.current?.scrollTo({ top: 0 });
  }, [view]);

  const onKeyDown = (event) => {
    if (event.key === "Escape") onClose();
    if (event.key !== "Tab") return;
    const focusable = panel.current?.querySelectorAll("a[href],button:not([disabled]),input:not([tabindex='-1']),select,textarea,[tabindex]:not([tabindex='-1'])");
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/55 p-0 sm:items-center sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={onKeyDown}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="job-dialog-title"
        tabIndex={-1}
        data-lenis-prevent
        className="relative flex max-h-[94svh] w-full max-w-2xl flex-col overflow-y-auto overscroll-contain rounded-t-3xl bg-white shadow-2xl outline-none sm:max-h-[90svh] sm:rounded-3xl"
      >
        <span aria-hidden="true" className="sticky top-0 z-10 block h-[3px] shrink-0 bg-gradient-to-r from-[#ffd34d] via-[#EFB000] to-[#ffd34d]" />
        <header className="flex items-start justify-between gap-4 border-b border-[#f1e7c8] bg-[#fffcf0] px-5 py-4 sm:px-8">
          <div className="flex min-w-0 flex-col gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element -- static asset, shared with the header */}
            <img src={LOGO_SRC} alt="emSphere - Seamless Connect" width={400} height={110} className="h-9 w-auto self-start" />
            <h3 id="job-dialog-title" className="text-xl font-bold leading-snug text-[#1f1f1f] sm:text-2xl">
              {view === "apply" ? `Apply: ${job.title}` : view === "done" ? "Application sent" : job.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#4c4c4c] shadow-[inset_0_0_0_1px_#e5e5e5] transition-colors hover:text-[#b07d00]"
          >
            <X weight="bold" aria-hidden="true" className="h-4 w-4" />
          </button>
        </header>

        <div className="px-5 py-6 sm:px-8">
          {view === "details" && <JobDetails job={job} onApply={() => setView("apply")} />}
          {view === "apply" && <ApplyForm job={job} onDone={() => setView("done")} onBack={() => setView("details")} />}
          {view === "done" && (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f6ed] text-[#1a8a45]">
                <CheckCircle weight="fill" aria-hidden="true" className="h-9 w-9" />
              </span>
              <p className="text-lg font-semibold text-[#1f1f1f]">Thank you for applying!</p>
              <p className="max-w-md text-[15px] leading-relaxed text-black/65">
                Our HR team has received your application for <strong>{job.title}</strong> and will reach out if your profile matches.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 rounded-lg bg-[#EFB000] px-7 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#d99e00]"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function CareersJobBoard({ jobs }) {
  const [active, setActive] = useState(null); // { job, view }
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      <ul className="mx-auto flex w-full max-w-4xl flex-col gap-4">
        {jobs.map((job) => (
          <li
            key={job.id}
            className="reveal-on-scroll reveal-fade-up relative flex flex-col gap-4 overflow-hidden rounded-2xl bg-white p-5 shadow-[inset_0_0_0_1px_#ececec,0_14px_32px_-26px_rgba(0,0,0,0.3)] transition-shadow duration-300 hover:shadow-[inset_0_0_0_1.5px_#EFB000,0_16px_34px_-22px_rgba(176,125,0,0.45)] sm:p-6"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <div className="flex min-w-0 flex-col gap-2.5">
                <h3 className="text-xl font-bold leading-snug text-[#1f1f1f]">{job.title}</h3>
                <div className="flex flex-wrap gap-2">
                  <Meta icon={Briefcase}>{job.department}</Meta>
                  <Meta icon={MapPin}>{job.location}</Meta>
                  <Meta icon={Clock}>{job.employment_type}</Meta>
                  <Meta icon={UserCircle}>{job.experience}</Meta>
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setActive({ job, view: "details" })}
                  className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#1f1f1f] shadow-[inset_0_0_0_1px_#e5e5e5] transition-shadow hover:shadow-[inset_0_0_0_1.5px_#EFB000]"
                >
                  View details
                </button>
                <button
                  type="button"
                  onClick={() => setActive({ job, view: "apply" })}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#EFB000] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#d99e00]"
                >
                  Apply now
                  <ArrowRight weight="bold" aria-hidden="true" className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            {job.summary && <p className="text-[15px] leading-relaxed text-black/65">{job.summary}</p>}
          </li>
        ))}
      </ul>
      {active && <JobDialog key={active.job.id + active.view} job={active.job} initialView={active.view} onClose={close} />}
    </>
  );
}
