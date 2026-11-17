import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { createSessionClient } from "@/lib/supabase/server";
import DeleteLeadButton from "../DeleteLeadButton";
import styles from "../../../admin.module.css";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function LeadPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  if (!UUID_RE.test(id)) notFound();

  const supabase = await createSessionClient();
  const { data: lead } = await supabase.from("leads").select("*").eq("id", id).maybeSingle();
  if (!lead) notFound();

  const link = (url: string) =>
    url ? (
      <a href={url} target="_blank" rel="noopener">{url}</a>
    ) : (
      "—"
    );
  const utm = Object.entries((lead.utm ?? {}) as Record<string, string>);

  const rows: [string, React.ReactNode][] = [
    [
      "Received",
      new Date(lead.created_at).toLocaleString("en-GB", {
        timeZone: "Europe/London",
        dateStyle: "full",
        timeStyle: "short",
      }),
    ],
    ["Form", lead.form_name],
    ["Name", lead.name || "—"],
    ["Email", lead.email ? <a href={`mailto:${lead.email}`}>{lead.email}</a> : "—"],
    ["Phone", lead.phone ? <a href={`tel:${lead.phone.replace(/[^0-9+]/g, "")}`}>{lead.phone}</a> : "—"],
    ...(lead.form_type === "quote"
      ? ([
          ["Postal address", lead.address || "—"],
          ["Interested in", lead.interests?.length ? lead.interests.join(", ") : "—"],
        ] as [string, React.ReactNode][])
      : []),
    ["Message", lead.message || "—"],
    ["Page", lead.page_title || "—"],
    ["Page URL", link(lead.page_url)],
    ["Landing page", link(lead.landing_page)],
    ["Came from", lead.referrer ? link(lead.referrer) : "Direct / unknown"],
    ...(utm.length ? ([["UTM", utm.map(([k, v]) => `${k}: ${v}`).join("\n")]] as [string, React.ReactNode][]) : []),
    ["Device", lead.device || "—"],
    ["IP address", lead.ip || "—"],
    ["Email status", lead.email_status || "—"],
  ];

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>{lead.name || "Lead"}</h1>
        <div className={styles.row}>
          <Link href="/admin/leads/" className={styles.button}>
            ← All leads
          </Link>
          <DeleteLeadButton id={lead.id} name={lead.name} redirectTo="/admin/leads/" />
        </div>
      </div>

      <div className={styles.card}>
        <dl className={styles.detailGrid} style={{ margin: 0 }}>
          {rows.map(([label, value]) => (
            <div key={label} style={{ display: "contents" }}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
