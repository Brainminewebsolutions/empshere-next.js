import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { queryOne, toIso } from "@/lib/db";
import DeleteLeadButton from "../DeleteLeadButton";
import styles from "../../../admin.module.css";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function LeadPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  if (!UUID_RE.test(id)) notFound();

  const lead = await queryOne<{
    id: string; created_at: string; form_name: string; name: string; email: string; phone: string; message: string;
    page_title: string; page_url: string; referrer: string; device: string; ip: string;
  }>("SELECT * FROM leads WHERE id = ?", [id]);
  if (!lead) notFound();

  const link = (url: string) =>
    url ? (
      <a href={url} target="_blank" rel="noopener">{url}</a>
    ) : (
      "—"
    );
  const rows: [string, React.ReactNode][] = [
    [
      "Received",
      new Date(toIso(lead.created_at) ?? "").toLocaleString("en-GB", {
        timeZone: "Asia/Kolkata",
        dateStyle: "full",
        timeStyle: "short",
      }),
    ],
    ["Form", lead.form_name],
    ["Name", lead.name || "—"],
    ["Email", lead.email ? <a href={`mailto:${lead.email}`}>{lead.email}</a> : "—"],
    ["Phone", lead.phone ? <a href={`tel:${lead.phone.replace(/[^0-9+]/g, "")}`}>{lead.phone}</a> : "—"],
    ["Message", lead.message || "—"],
    ["Page", lead.page_title || "—"],
    ["Page URL", link(lead.page_url)],
    ["Came from", lead.referrer ? link(lead.referrer) : "Direct / unknown"],
    ["Device", lead.device || "—"],
    ["IP address", lead.ip || "—"],
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
