import { randomUUID } from "node:crypto";
import { exec } from "@/lib/db";
import { sendMail } from "@/lib/email/mailer";
import { leadEmail, thankYouEmail } from "@/lib/email/templates";
import { UTM_FIELDS } from "@/lib/utm";

/* --------------------------------------------------------------------
   POST /api/lead/ — receives the JSON from components/LeadForm.jsx.

   1. Validates the fields (same rules as the form).
   2. Verifies the Cloudflare Turnstile token when TURNSTILE_SECRET_KEY is set.
   3. Emails the lead to LEAD_TO (table layout, Reply-To = the visitor).
   4. Saves a copy in the database (Admin -> Leads). A database problem is
      logged and never blocks the email.
   5. Emails the visitor a thank-you. If only this one fails, the lead is
      already delivered, so the request still succeeds.
   -------------------------------------------------------------------- */

const LIMITS = { name: 120, email: 160, mobile: 20, company: 160, product: 120, message: 5000, page: 500 };
for (const key of UTM_FIELDS) LIMITS[key] = 200;
LIMITS.landing_page = 500;
LIMITS.referrer = 500;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const fail = (status, error, extra) => Response.json({ ok: false, error, ...extra }, { status });

function clean(input, key) {
  const value = typeof input[key] === "string" ? input[key].trim() : "";
  return value.slice(0, LIMITS[key]);
}

async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token, ...(ip ? { remoteip: ip } : {}) }),
      signal: AbortSignal.timeout(10_000),
    });
    const data = await res.json();
    return Boolean(data.success);
  } catch {
    return false;
  }
}

export async function POST(request) {
  let input;
  try {
    input = await request.json();
  } catch {
    return fail(400, "bad_request");
  }
  if (!input || typeof input !== "object") return fail(400, "bad_request");

  // Honeypot: real people never fill it. Pretend it worked.
  if (input.website) return Response.json({ ok: true });

  const lead = {
    name: clean(input, "name"),
    email: clean(input, "email"),
    mobile: clean(input, "mobile").replace(/\D/g, ""),
    company: clean(input, "company"),
    product: clean(input, "product"),
    message: clean(input, "message"),
    page: clean(input, "page"),
    submittedAt: new Date(),
    // UTM tags, ad click IDs, landing page and referrer (lib/utm.js).
    tracking: Object.fromEntries([...UTM_FIELDS, "landing_page", "referrer"].map((key) => [key, clean(input, key)])),
  };
  // Only keep http(s) URLs; they are rendered as links in the email.
  const isHttp = (url) => /^https?:\/\//i.test(url);
  if (!isHttp(lead.page)) lead.page = "";
  if (!isHttp(lead.tracking.landing_page)) lead.tracking.landing_page = "";
  if (!isHttp(lead.tracking.referrer)) lead.tracking.referrer = "";

  const fields = [];
  if (!lead.name) fields.push("name");
  if (!EMAIL_RE.test(lead.email)) fields.push("email");
  if (lead.mobile.length !== 10) fields.push("mobile");
  if (!lead.company) fields.push("company");
  if (!lead.message) fields.push("message");
  if (fields.length) return fail(422, "invalid", { fields });

  const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0].trim();
  if (!(await verifyTurnstile(input["cf-turnstile-response"], ip))) return fail(403, "captcha_failed");

  const leadTo = process.env.LEAD_TO || process.env.SMTP_USER;

  if (process.env.DB_NAME) {
    try {
      const details = [lead.company && `Company: ${lead.company}`, lead.product && `Product: ${lead.product}`, lead.message]
        .filter(Boolean)
        .join("\n");
      await exec(
        `INSERT INTO leads (id, created_at, form_name, name, email, phone, message, page_title, page_url, referrer, device, ip)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          randomUUID(),
          lead.submittedAt,
          (lead.product ? `Website: ${lead.product}` : "Website lead form").slice(0, 100),
          lead.name.slice(0, 150),
          lead.email.slice(0, 190),
          lead.mobile.slice(0, 40),
          details.slice(0, 2000),
          "",
          lead.page.slice(0, 500),
          (lead.tracking.referrer || "").slice(0, 500),
          (request.headers.get("user-agent") || "").slice(0, 255),
          (ip || "").slice(0, 64),
        ],
      );
    } catch (error) {
      console.error("[api/lead] could not save the lead to the database:", error?.message || error);
    }
  }

  try {
    await sendMail({ to: leadTo, replyTo: { name: lead.name, address: lead.email }, ...leadEmail(lead) });
  } catch (error) {
    console.error("[api/lead] lead email failed:", error);
    return fail(500, "mail_failed");
  }

  try {
    await sendMail({ to: { name: lead.name, address: lead.email }, replyTo: leadTo, ...thankYouEmail(lead) });
  } catch (error) {
    console.error("[api/lead] thank-you email failed:", error);
  }

  return Response.json({ ok: true });
}
