import nodemailer from "nodemailer";
import { LOGO_CID, LOGO_PNG_BASE64 } from "./logo";

/* --------------------------------------------------------------------
   Gmail SMTP via Nodemailer. Server-only: imported by route handlers,
   never by client components, so the App Password stays on the server.

   Environment (.env.local locally, hosting dashboard in production):
     SMTP_USER   Google Workspace / Gmail address that sends the mail
     SMTP_PASS   16-character Google App Password (spaces are ignored)
     SMTP_HOST   optional, default smtp.gmail.com
     SMTP_PORT   optional, default 465 (SSL); 587 uses STARTTLS
   -------------------------------------------------------------------- */

let transporter;

export function getTransporter() {
  if (transporter) return transporter;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, "");
  if (!user || !pass) throw new Error("SMTP_USER / SMTP_PASS are not set");

  const port = Number(process.env.SMTP_PORT || 465);
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user, pass },
  });
  return transporter;
}

/* Sends one email with the Emsphere logo attached inline (cid). */
export function sendMail({ to, bcc, replyTo, subject, html, text, attachments = [] }) {
  const from = { name: process.env.SMTP_FROM_NAME || "Emsphere Technologies", address: process.env.SMTP_USER };
  return getTransporter().sendMail({
    from,
    to,
    bcc,
    replyTo,
    subject,
    html,
    text,
    attachments: [
      {
        filename: "emsphere-logo.png",
        content: Buffer.from(LOGO_PNG_BASE64, "base64"),
        contentType: "image/png",
        cid: LOGO_CID,
        contentDisposition: "inline",
      },
      ...attachments,
    ],
  });
}
