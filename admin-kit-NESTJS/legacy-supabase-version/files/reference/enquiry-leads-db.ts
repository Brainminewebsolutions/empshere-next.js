import { createSecretClient } from "@/lib/supabase/server";
import type { LeadContext } from "./email";

// Every lead is also saved to the Supabase "leads" table (see
// supabase/schema.sql), which is what the admin Leads screen lists. Like the
// Google Sheet, it runs after the email attempt and records whether the
// email went out. Never throws: a database problem must not lose the lead
// email or fail the visitor's submission.

const asText = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value.join(", ") : (value ?? "");

export async function saveLeadToDb(ctx: LeadContext, emailStatus: "Sent" | "Failed"): Promise<void> {
  const v = ctx.values;
  try {
    const { error } = await createSecretClient()
      .from("leads")
      .insert({
        form_type: ctx.formType,
        form_name: ctx.form.name,
        name: asText(v.name),
        email: asText(v.email),
        phone: asText(v.phone),
        address: asText(v.address),
        interests: Array.isArray(v.interests) ? v.interests : [],
        message: asText(v.enquiry) || asText(v.message),
        page_title: ctx.headline,
        page_url: ctx.pageUrl,
        landing_page: ctx.landingPage,
        referrer: ctx.referrer,
        utm: ctx.utm,
        device: ctx.device,
        ip: ctx.ip,
        email_status: emailStatus,
      });
    if (error) console.error("[api/enquiry] Saving lead to database failed:", error.message);
  } catch (err) {
    console.error("[api/enquiry] Saving lead to database failed:", err);
  }
}
