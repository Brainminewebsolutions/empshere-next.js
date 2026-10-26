import { LOGO_CID } from "./logo";

/* --------------------------------------------------------------------
   HTML emails sent by app/api/lead/route.js:

     leadEmail(lead)      → the team inbox (LEAD_TO): the lead as a table
     thankYouEmail(lead)  → the person who filled in the form

   Email clients ignore most modern CSS, so the layout is nested tables
   with inline styles. The <style> block only adds the mobile tweaks
   (Gmail, Apple Mail and Outlook apps honour it); on clients that drop
   it the 600px card is still fluid (width:100%; max-width:600px).
   Colours match the website: #EFB000 gold, #fff5d9 / #fffcf0 light yellow.
   -------------------------------------------------------------------- */

const SITE_URL = "https://www.emsphere.com";
const GOLD = "#EFB000";
const GOLD_DARK = "#b07d00";
const CREAM = "#fffcf0";
const LIGHT_YELLOW = "#fff5d9";
const BORDER = "#f3e3b0";
const INK = "#1f1f1f";
const MUTED = "#6b6b6b";
const FONT = "'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const nl2br = (value) => escapeHtml(value).replace(/\r?\n/g, "<br>");

export function formatIndiaTime(date = new Date()) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(date) + " IST";
}

function layout({ preheader, body }) {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>Emsphere</title>
<style>
  body { margin:0; padding:0; -webkit-text-size-adjust:100%; }
  a { color:${GOLD_DARK}; }
  @media only screen and (max-width:620px) {
    .wrap { padding:12px 8px !important; }
    .pad { padding-left:20px !important; padding-right:20px !important; }
    .h1 { font-size:22px !important; line-height:30px !important; }
    .stack, .stack td { display:block !important; width:100% !important; box-sizing:border-box; }
    .label { padding:12px 16px 2px !important; border-bottom:0 !important; background:${CREAM} !important; }
    .value { padding:0 16px 12px !important; background:${CREAM} !important; }
    .btn { display:block !important; width:100% !important; box-sizing:border-box; text-align:center !important; }
    .btn-gap { display:block !important; height:10px !important; width:100% !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${LIGHT_YELLOW};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${LIGHT_YELLOW};">${escapeHtml(preheader)}&#8203;&#8199;&#8203;&#8199;&#8203;&#8199;&#8203;&#8199;</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${LIGHT_YELLOW};">
  <tr>
    <td class="wrap" align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid ${BORDER};">
        <tr><td style="height:6px;line-height:6px;font-size:0;background:${GOLD};">&nbsp;</td></tr>
        <tr>
          <td class="pad" align="center" style="padding:28px 32px 20px;background:#ffffff;">
            <a href="${SITE_URL}" target="_blank" style="text-decoration:none;">
              <img src="cid:${LOGO_CID}" width="180" alt="emsphere — Seamless Connect" style="display:block;width:180px;max-width:60%;height:auto;border:0;outline:none;">
            </a>
          </td>
        </tr>
        ${body}
        <tr>
          <td class="pad" align="center" style="padding:22px 32px;background:${INK};font-family:${FONT};font-size:12px;line-height:19px;color:#bdbdbd;">
            <strong style="color:#ffffff;">Emsphere Technologies Pvt. Ltd.</strong><br>
            <a href="mailto:sales@emsphere.com" style="color:${GOLD};text-decoration:none;">sales@emsphere.com</a>
            &nbsp;·&nbsp;
            <a href="tel:+917798981117" style="color:${GOLD};text-decoration:none;">+91 77989 81117</a><br>
            <a href="${SITE_URL}" style="color:#bdbdbd;text-decoration:underline;">www.emsphere.com</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

/* One row of the details table. `html` is already escaped. */
function row(label, html, last = false) {
  const border = last ? "" : `border-bottom:1px solid ${BORDER};`;
  return `<tr class="stack">
    <td class="label" width="34%" valign="top" style="padding:13px 16px;${border}background:${LIGHT_YELLOW};font-family:${FONT};font-size:13px;line-height:20px;font-weight:600;color:${GOLD_DARK};white-space:nowrap;">${label}</td>
    <td class="value" valign="top" style="padding:13px 16px;${border}background:#ffffff;font-family:${FONT};font-size:15px;line-height:22px;color:${INK};word-break:break-word;">${html}</td>
  </tr>`;
}

function table(rows) {
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid ${BORDER};border-radius:12px;border-collapse:separate;overflow:hidden;">
    ${rows.join("")}
  </table>`;
}

function button(href, label, { outline = false } = {}) {
  const style = outline
    ? `background:#ffffff;color:${INK};border:1.5px solid ${GOLD};`
    : `background:${GOLD};color:#ffffff;border:1.5px solid ${GOLD};`;
  return `<a class="btn" href="${href}" target="_blank" style="${style}display:inline-block;padding:12px 22px;border-radius:9px;font-family:${FONT};font-size:14px;font-weight:700;letter-spacing:0.02em;text-decoration:none;">${label}</a>`;
}

/* ---- Lead notification (to the team) --------------------------------- */

const TRACKING_ROWS = [
  ["utm_source", "UTM Source"],
  ["utm_medium", "UTM Medium"],
  ["utm_campaign", "UTM Campaign"],
  ["utm_term", "UTM Term"],
  ["utm_content", "UTM Content"],
  ["utm_id", "UTM ID"],
  ["gclid", "Google Ads (gclid)"],
  ["fbclid", "Meta Ads (fbclid)"],
  ["msclkid", "Microsoft Ads (msclkid)"],
  ["li_fat_id", "LinkedIn Ads (li_fat_id)"],
  ["landing_page", "Landing Page"],
  ["referrer", "Referrer"],
];

const hostOf = (url) => {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return "";
  }
};

/* One-line answer to "where did this lead come from?". */
export function leadSource(t = {}) {
  if (t.utm_source) return [t.utm_source, t.utm_medium].filter(Boolean).join(" / ");
  if (t.gclid) return "Google Ads";
  if (t.fbclid) return "Meta (Facebook / Instagram)";
  if (t.msclkid) return "Microsoft Ads";
  if (t.li_fat_id) return "LinkedIn Ads";
  const ref = hostOf(t.referrer);
  if (/(^|\.)google\.|bing\.com|duckduckgo\.com|yahoo\.com/.test(ref)) return `Organic search (${ref})`;
  if (ref) return `Referral (${ref})`;
  return "Direct";
}

function trackingValue(key, value) {
  if (!value) return `<span style="color:#b5b5b5;">—</span>`;
  if (key === "landing_page" || key === "referrer") {
    return `<a href="${escapeHtml(value)}" style="color:${GOLD_DARK};font-size:13px;">${escapeHtml(value)}</a>`;
  }
  return escapeHtml(value);
}

export function leadEmail(lead) {
  const submitted = formatIndiaTime(lead.submittedAt);
  const tracking = lead.tracking || {};
  const source = leadSource(tracking);
  const trackingRows = [
    row("Lead Source", `<strong>${escapeHtml(source)}</strong>`),
    ...TRACKING_ROWS.map(([key, label], i) => row(label, trackingValue(key, tracking[key]), i === TRACKING_ROWS.length - 1)),
  ];
  const mobileDigits = lead.mobile.replace(/\D/g, "");
  const rows = [
    row("Name", escapeHtml(lead.name)),
    row("Work Email", `<a href="mailto:${escapeHtml(lead.email)}" style="color:${GOLD_DARK};text-decoration:none;font-weight:600;">${escapeHtml(lead.email)}</a>`),
    row("Mobile", `<a href="tel:+91${mobileDigits}" style="color:${GOLD_DARK};text-decoration:none;font-weight:600;">+91 ${escapeHtml(lead.mobile)}</a>`),
    row("Company", escapeHtml(lead.company)),
    row("Product", `<span style="display:inline-block;padding:3px 10px;border-radius:999px;background:${LIGHT_YELLOW};border:1px solid ${BORDER};font-size:13px;font-weight:600;color:${INK};">${escapeHtml(lead.product || "—")}</span>`),
    row("Message", nl2br(lead.message)),
    row("Page", lead.page ? `<a href="${escapeHtml(lead.page)}" style="color:${GOLD_DARK};font-size:13px;">${escapeHtml(lead.page)}</a>` : "—"),
    row("Submitted", escapeHtml(submitted), true),
  ];

  const body = `
        <tr>
          <td class="pad" style="padding:4px 32px 8px;font-family:${FONT};">
            <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${GOLD_DARK};">New website lead</p>
            <h1 class="h1" style="margin:0;font-size:24px;line-height:32px;font-weight:700;color:${INK};">${escapeHtml(lead.name)} from ${escapeHtml(lead.company)}</h1>
            <p style="margin:8px 0 0;font-size:14px;line-height:21px;color:${MUTED};">Enquiry about <strong style="color:${INK};">${escapeHtml(lead.product || "Emsphere")}</strong> · Source: <strong style="color:${INK};">${escapeHtml(source)}</strong> · ${escapeHtml(submitted)}</p>
          </td>
        </tr>
        <tr>
          <td class="pad" style="padding:20px 32px 8px;">
            ${table(rows)}
          </td>
        </tr>
        <tr>
          <td class="pad" style="padding:20px 32px 8px;font-family:${FONT};">
            <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${GOLD_DARK};">Lead source &amp; UTM tracking</p>
            ${table(trackingRows)}
          </td>
        </tr>
        <tr>
          <td class="pad" style="padding:20px 32px 30px;">
            ${button(`mailto:${escapeHtml(lead.email)}?subject=${encodeURIComponent(`Re: Your enquiry about ${lead.product || "Emsphere"}`)}`, `Reply to ${escapeHtml(lead.name.split(" ")[0])}`)}<span class="btn-gap" style="display:inline-block;width:10px;"></span>${button(`tel:+91${mobileDigits}`, "Call now", { outline: true })}
          </td>
        </tr>`;

  const text = [
    "New website lead — emsphere.com",
    "",
    `Name:      ${lead.name}`,
    `Email:     ${lead.email}`,
    `Mobile:    +91 ${lead.mobile}`,
    `Company:   ${lead.company}`,
    `Product:   ${lead.product}`,
    `Page:      ${lead.page || "-"}`,
    `Submitted: ${submitted}`,
    "",
    "Message:",
    lead.message,
    "",
    "Lead source & UTM tracking",
    `Lead Source: ${source}`,
    ...TRACKING_ROWS.map(([key, label]) => `${label}: ${tracking[key] || "-"}`),
  ].join("\n");

  return {
    subject: `New lead: ${lead.product || "Website"} — ${lead.company} (${lead.name})`,
    html: layout({ preheader: `${lead.name} from ${lead.company} enquired about ${lead.product}.`, body }),
    text,
  };
}

/* ---- Thank-you (to the visitor) -------------------------------------- */

export function thankYouEmail(lead) {
  const firstName = lead.name.trim().split(/\s+/)[0];
  const steps = [
    ["1", "We review your requirement", "A product specialist reads your message and matches it to the right solution."],
    ["2", "We get in touch", "Expect a call or email from our team within one business day."],
    ["3", "Personalised demo", `A walkthrough of ${escapeHtml(lead.product || "emSphere")}, set up around how your organisation works.`],
  ];

  const stepRows = steps
    .map(
      ([n, title, copy], i) => `<tr>
        <td width="40" valign="top" style="padding:${i ? "14px" : "0"} 0 0;">
          <div style="width:30px;height:30px;line-height:30px;border-radius:50%;background:${GOLD};color:#ffffff;text-align:center;font-family:${FONT};font-size:14px;font-weight:700;">${n}</div>
        </td>
        <td valign="top" style="padding:${i ? "14px" : "0"} 0 0 6px;font-family:${FONT};">
          <p style="margin:0;font-size:15px;line-height:22px;font-weight:700;color:${INK};">${title}</p>
          <p style="margin:2px 0 0;font-size:14px;line-height:21px;color:${MUTED};">${copy}</p>
        </td>
      </tr>`
    )
    .join("");

  const rows = [
    row("Product", escapeHtml(lead.product || "—")),
    row("Company", escapeHtml(lead.company)),
    row("Mobile", `+91 ${escapeHtml(lead.mobile)}`),
    row("Message", nl2br(lead.message), true),
  ];

  const body = `
        <tr>
          <td class="pad" style="padding:4px 32px 0;font-family:${FONT};">
            <h1 class="h1" style="margin:0;font-size:26px;line-height:34px;font-weight:700;color:${INK};">Thank you, ${escapeHtml(firstName)}!</h1>
            <p style="margin:12px 0 0;font-size:15px;line-height:24px;color:#3d3d3d;">We have received your enquiry about <strong style="color:${INK};">${escapeHtml(lead.product || "emSphere")}</strong>. Our team will get in touch with you shortly to understand your needs and schedule a demo.</p>
          </td>
        </tr>
        <tr>
          <td class="pad" style="padding:24px 32px 0;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${CREAM};border:1px solid ${BORDER};border-radius:12px;">
              <tr>
                <td style="padding:20px 20px 18px;">
                  <p style="margin:0 0 14px;font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${GOLD_DARK};">What happens next</p>
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">${stepRows}</table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td class="pad" style="padding:24px 32px 0;font-family:${FONT};">
            <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${GOLD_DARK};">Your submission</p>
            ${table(rows)}
          </td>
        </tr>
        <tr>
          <td class="pad" style="padding:24px 32px 30px;font-family:${FONT};">
            ${button(SITE_URL, "Explore emSphere &rarr;")}
            <p style="margin:18px 0 0;font-size:13px;line-height:20px;color:${MUTED};">Need something sooner? Reply to this email or call us on <a href="tel:+917798981117" style="color:${GOLD_DARK};font-weight:600;text-decoration:none;">+91 77989 81117</a>.</p>
          </td>
        </tr>`;

  const text = [
    `Thank you, ${firstName}!`,
    "",
    `We have received your enquiry about ${lead.product || "emSphere"}. Our team will get in touch with you shortly to understand your needs and schedule a demo.`,
    "",
    "Your submission",
    `Product: ${lead.product}`,
    `Company: ${lead.company}`,
    `Mobile:  +91 ${lead.mobile}`,
    `Message: ${lead.message}`,
    "",
    "Need something sooner? Reply to this email or call +91 77989 81117.",
    "",
    "Emsphere Technologies Pvt. Ltd. — https://www.emsphere.com",
  ].join("\n");

  return {
    subject: `Thank you for contacting Emsphere, ${firstName}`,
    html: layout({ preheader: `We received your enquiry about ${lead.product || "emSphere"} — our team will be in touch shortly.`, body }),
    text,
  };
}
