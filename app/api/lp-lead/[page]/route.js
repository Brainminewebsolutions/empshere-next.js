import { randomUUID } from "node:crypto";
import { exec } from "@/lib/db";
import { sendMail } from "@/lib/email/mailer";
import { escapeHtml, landingLeadEmail } from "@/lib/email/templates";
import { LANDING_PAGES } from "@/lib/landingPages.mjs";
import { verifyTurnstile } from "@/lib/turnstile";

/* --------------------------------------------------------------------
   POST /api/lp-lead/<slug>/ — forms of the campaign landing pages
   (public/<slug>/, settings in lib/landingPages.mjs).

   1. Validates the fields and requires a business email address.
   2. Verifies the Cloudflare Turnstile token (as on the website forms).
   3. Saves the lead (Admin -> Leads).
   4. Emails it to LP_LEAD_TO, with hidden copies to LP_LEAD_BCC.
   5. Logs it in the Google Sheet (LP_SHEETS_URL). If the email failed and
      the sheet script reports it sent its own fallback email, the visitor
      still gets a success.

   Replies with JSON for the page script. A plain form post (script failed)
   gets a redirect or a short error page instead.
   -------------------------------------------------------------------- */

const THANK_YOU = "/thank-you/";
const JOB_TITLES = ["CXO", "Senior Management", "Manager", "operational Manager"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PERSONAL_DOMAINS = (
  "gmail.com googlemail.com rediffmail.com rediff.com yahoo.com yahoo.in yahoo.co.in yahoo.co.uk yahoo.ca " +
  "yahoo.com.au yahoo.fr yahoo.de yahoo.es yahoo.co.jp yahoo.com.br yahoo.com.mx ymail.com rocketmail.com " +
  "outlook.com outlook.in outlook.co.uk hotmail.com hotmail.in hotmail.co.in hotmail.co.uk hotmail.fr hotmail.de " +
  "live.com live.in live.co.uk msn.com aol.com icloud.com me.com mac.com protonmail.com protonmail.ch proton.me " +
  "pm.me tutanota.com tuta.com tuta.io yandex.com yandex.ru mail.ru mail.com gmx.com gmx.net gmx.de web.de " +
  "freenet.de zoho.com inbox.com fastmail.com hey.com qq.com 163.com 126.com yeah.net sina.com naver.com daum.net " +
  "comcast.net att.net verizon.net btinternet.com"
).split(" ");

const TRACKING = [
  ["utm_source", "UTM Source"],
  ["utm_medium", "UTM Medium"],
  ["utm_campaign", "UTM Campaign"],
  ["utm_term", "UTM Term"],
  ["utm_content", "UTM Content"],
  ["utm_id", "UTM ID"],
  ["gclid", "GCLID"],
  ["referrer", "Referrer"],
  ["landing_page_url", "Landing Page"],
  ["traffic_source", "Traffic Source"],
  ["traffic_medium", "Traffic Medium"],
];

async function logToSheet(payload) {
  const url = process.env.LP_SHEETS_URL;
  if (!url) return null;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15_000),
    });
    const data = await res.json();
    if (!res.ok || data?.result !== "success") throw new Error(`rejected (HTTP ${res.status})`);
    return data;
  } catch (error) {
    console.error("[api/lp-lead] Google Sheet logging failed:", error?.message || error);
    return null;
  }
}

export async function POST(request, { params }) {
  const { page } = await params;
  const wantsJson =
    request.headers.get("x-requested-with") === "XMLHttpRequest" ||
    Boolean(request.headers.get("accept")?.includes("application/json"));

  // Status 200 for field errors: the page scripts read `message` from the body.
  const fail = (message, status = 200) =>
    wantsJson
      ? Response.json({ status: "error", message }, { status })
      : new Response(
          `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Request not sent</title><p>${escapeHtml(message)}</p><p><a href="/${Object.hasOwn(LANDING_PAGES, page) ? `${page}/` : ""}">Go back</a></p>`,
          { status: status === 200 ? 422 : status, headers: { "Content-Type": "text/html; charset=utf-8" } },
        );

  if (!Object.hasOwn(LANDING_PAGES, page)) return fail("Unknown form.", 404);
  const config = LANDING_PAGES[page];

  let form;
  try {
    form = await request.formData();
  } catch {
    return fail("Invalid request.", 400);
  }
  const raw = {};
  for (const [key, value] of form) {
    if (typeof value === "string") raw[key] = value.replaceAll("\0", "").trim().slice(0, 2000);
  }
  const field = (key, max = 200) => (raw[key] || "").replace(/[\r\n]+/g, " ").slice(0, max);

  const lead = {
    name: field("name", 120),
    email: field("email", 160),
    phone: field("phone", 30),
    city: field("city", 120),
    company: field(config.companyField || "company", 160),
    sites: field(config.sitesField),
    jobTitle: field("job_title"),
    message: raw.message || "",
    formType: field("form_type") || field("form_source") || "Landing Page Form",
    trigger: field("lead_trigger"),
  };

  const optional = config.optional || [];
  const required = ["name", "email", "phone", "city", "company", "sites", "jobTitle"].filter((key) => !optional.includes(key));
  if (required.some((key) => !lead[key])) return fail("Please fill in all required fields.");
  if (!EMAIL_RE.test(lead.email)) return fail("Please provide a valid email address.");

  const domain = lead.email.split("@").pop().toLowerCase();
  if (PERSONAL_DOMAINS.some((d) => domain === d || domain.endsWith(`.${d}`))) {
    return fail("Please Enter Valid Business Email ID");
  }
  const digits = lead.phone.replace(/\D/g, "").length;
  if (!/^[0-9+()\-. ]+$/.test(lead.phone) || digits < 8 || digits > 15) return fail("Please enter a valid phone number.");
  if (!JOB_TITLES.includes(lead.jobTitle) || (lead.sites && !config.sites.includes(lead.sites))) {
    return fail("Please select a valid Workforce Site and Job Title.");
  }

  const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "";
  if (!(await verifyTurnstile(raw["cf-turnstile-response"], ip))) {
    return fail("Security check failed. Please try again.");
  }

  const submittedAt = new Date();
  const leadId = field("lead_id", 100) || randomUUID();
  const tracking = TRACKING.map(([key, label]) => [label, field(key, 500)]);

  let saved = false;
  if (process.env.DB_NAME || process.env.DATABASE_URL) {
    try {
      const details = [
        lead.company && `Company: ${lead.company}`,
        lead.city && `City: ${lead.city}`,
        lead.sites && `Workforce: ${lead.sites}`,
        `Job title: ${lead.jobTitle}`,
        lead.message,
      ]
        .filter(Boolean)
        .join("\n");
      await exec(
        `INSERT INTO leads (id, created_at, form_name, name, email, phone, message, page_title, page_url, referrer, device, ip)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          randomUUID(),
          submittedAt,
          `Landing page: ${config.pageName}`.slice(0, 100),
          lead.name,
          lead.email,
          lead.phone,
          details.slice(0, 2000),
          config.title,
          field("landing_page_url", 500),
          field("referrer", 500),
          (request.headers.get("user-agent") || "").slice(0, 255),
          ip.slice(0, 64),
        ],
      );
      saved = true;
    } catch (error) {
      console.error("[api/lp-lead] could not save the lead to the database:", error?.message || error);
    }
  }

  const ownList = process.env.LP_LEAD_TO;
  const to = ownList || process.env.LEAD_TO || process.env.SMTP_USER;
  const bcc = ownList ? process.env.LP_LEAD_BCC : process.env.LEAD_BCC;

  let emailSent = false;
  let emailError = "";
  try {
    await sendMail({
      to,
      bcc,
      replyTo: { name: lead.name, address: lead.email },
      ...landingLeadEmail({ ...lead, pageName: config.pageName, title: config.title, submittedAt, ip, tracking }),
    });
    emailSent = true;
  } catch (error) {
    emailError = String(error?.message || error);
    console.error("[api/lp-lead] lead email failed:", error);
  }

  const sheetFields = { ...raw };
  delete sheetFields["cf-turnstile-response"];
  delete sheetFields.is_ajax;
  const sheet = await logToSheet({
    ...sheetFields,
    page_name: config.pageName,
    lead_id: leadId,
    email_sent: emailSent,
    ...(emailError ? { email_error: emailError } : {}),
    fallback_email_to: to || "",
  });

  // The lead has reached the team if any of these worked.
  if (!emailSent && !saved && !["sent", "already-sent"].includes(sheet?.fallback_email)) {
    return fail("Unable to send your request right now. Please try again in a few minutes.");
  }

  // Campaign tags travel on to the thank-you page for conversion reports.
  const query = new URLSearchParams(
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].map((key) => [key, field(key)]).filter(([, value]) => value),
  ).toString();
  const redirect = query ? `${THANK_YOU}?${query}` : THANK_YOU;

  if (!wantsJson) return new Response(null, { status: 303, headers: { Location: redirect } });
  return Response.json({
    status: "success",
    message: "Your inquiry has been submitted successfully.",
    redirect,
    redirect_url: redirect,
  });
}
