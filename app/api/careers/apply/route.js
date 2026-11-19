import { randomUUID } from "node:crypto";
import { exec } from "@/lib/db";
import { sendMail } from "@/lib/email/mailer";
import { applicationEmail } from "@/lib/email/templates";
import { getOpenJobTitle } from "@/lib/jobs";

/* --------------------------------------------------------------------
   POST /api/careers/apply/ - job application from the careers page.
   Receives multipart/form-data (the fields + the resume file), validates it
   and emails HR (CAREERS_TO) with the details as a table and the resume
   attached. Reply-To is the candidate, so HR can answer straight away.
   -------------------------------------------------------------------- */

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS = {
  name: 120, email: 160, phone: 20, location: 120, experience: 40, currentCompany: 160,
  currentCtc: 60, expectedCtc: 60, noticePeriod: 60, linkedin: 300, message: 3000,
};

// Allowed resume types: extension + the file's first bytes (not just the name).
const RESUME_TYPES = {
  pdf: { mime: "application/pdf", magic: [0x25, 0x50, 0x44, 0x46] },
  doc: { mime: "application/msword", magic: [0xd0, 0xcf, 0x11, 0xe0] },
  docx: { mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", magic: [0x50, 0x4b, 0x03, 0x04] },
};

const fail = (status, error, extra) => Response.json({ ok: false, error, ...extra }, { status });

const field = (form, key) => {
  const value = form.get(key);
  return (typeof value === "string" ? value.trim() : "").slice(0, LIMITS[key] ?? 200);
};

const formatSize = (bytes) => (bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`);

export async function POST(request) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return fail(400, "bad_request");
  }

  // Honeypot: real people never fill it. Pretend it worked.
  if (form.get("website")) return Response.json({ ok: true });

  const jobId = field(form, "jobId");
  const app = {
    name: field(form, "name"),
    email: field(form, "email"),
    phone: field(form, "phone"),
    location: field(form, "location"),
    experience: field(form, "experience"),
    currentCompany: field(form, "currentCompany"),
    currentCtc: field(form, "currentCtc"),
    expectedCtc: field(form, "expectedCtc"),
    noticePeriod: field(form, "noticePeriod"),
    linkedin: field(form, "linkedin"),
    message: field(form, "message"),
    submittedAt: new Date(),
  };
  if (app.linkedin && !/^https?:\/\//i.test(app.linkedin)) app.linkedin = `https://${app.linkedin}`;

  const fields = [];
  if (!app.name) fields.push("name");
  if (!EMAIL_RE.test(app.email)) fields.push("email");
  if (app.phone.replace(/\D/g, "").length < 10) fields.push("phone");
  if (!app.location) fields.push("location");
  if (!app.experience) fields.push("experience");

  const resume = form.get("resume");
  const hasResume = resume && typeof resume === "object" && typeof resume.arrayBuffer === "function" && resume.size > 0;
  if (!hasResume) fields.push("resume");
  if (fields.length) return fail(422, "invalid", { fields });

  if (resume.size > MAX_RESUME_BYTES) return fail(413, "resume_too_large");
  const ext = (resume.name.split(".").pop() || "").toLowerCase();
  const type = RESUME_TYPES[ext];
  if (!type) return fail(415, "resume_type");
  const buffer = Buffer.from(await resume.arrayBuffer());
  if (!type.magic.every((byte, i) => buffer[i] === byte)) return fail(415, "resume_type");

  let job = null;
  try {
    job = jobId ? await getOpenJobTitle(jobId) : null;
  } catch (error) {
    console.error("[api/careers/apply] could not load the job:", error?.message || error);
    return fail(500, "server_error");
  }
  if (!job) return fail(410, "job_closed");

  // Filename for the attachment: keep it readable, strip path/odd characters.
  const safeName = `${app.name.replace(/[^\w.-]+/g, "_").slice(0, 60) || "candidate"}_Resume.${ext}`;
  const to = process.env.CAREERS_TO || process.env.LEAD_TO || process.env.SMTP_USER;

  // Save a copy (with the resume) for Admin -> Job applications. A database
  // problem never blocks the email, and vice versa.
  let saved = false;
  if (process.env.DB_NAME || process.env.DATABASE_URL) {
    try {
      await exec(
        `INSERT INTO job_applications (id, job_id, job_title, name, email, phone, location, experience, current_company,
           current_ctc, expected_ctc, notice_period, linkedin, message, resume_name, resume_mime, resume_size, resume_data, status, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?)`,
        [
          randomUUID(), job.id, job.title.slice(0, 160), app.name, app.email, app.phone, app.location, app.experience,
          app.currentCompany, app.currentCtc, app.expectedCtc, app.noticePeriod, app.linkedin, app.message,
          safeName, type.mime, buffer.length, buffer, app.submittedAt,
        ],
      );
      saved = true;
    } catch (error) {
      console.error("[api/careers/apply] could not save the application:", error?.message || error);
    }
  }

  try {
    await sendMail({
      to,
      replyTo: { name: app.name, address: app.email },
      ...applicationEmail({ ...app, jobTitle: job.title, resumeName: safeName, resumeSize: formatSize(buffer.length) }),
      attachments: [{ filename: safeName, content: buffer, contentType: type.mime }],
    });
  } catch (error) {
    console.error("[api/careers/apply] application email failed:", error);
    if (!saved) return fail(500, "mail_failed");
  }

  return Response.json({ ok: true });
}
