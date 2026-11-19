import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { queryOne, toIso } from "@/lib/db";
import DeleteLeadButton from "../DeleteLeadButton";
import { DetailSummary, DetailTables, type DetailSection } from "../../DetailTable";
import styles from "../../../admin.module.css";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// The website form saves "Company: X", "Product: Y" and the visitor's message
// as one text block (see app/api/lead/route.js); split them back out.
function splitMessage(text: string) {
  let company = "";
  let product = "";
  const rest: string[] = [];
  for (const line of text.split("\n")) {
    if (!company && /^Company:\s*/.test(line)) company = line.replace(/^Company:\s*/, "").trim();
    else if (!product && /^Product:\s*/.test(line)) product = line.replace(/^Product:\s*/, "").trim();
    else rest.push(line);
  }
  return { company, product, message: rest.join("\n").trim() };
}

export default async function LeadPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  if (!UUID_RE.test(id)) notFound();

  const lead = await queryOne<{
    id: string; created_at: string; form_name: string; name: string; email: string; phone: string; message: string;
    page_title: string; page_url: string; referrer: string; device: string; ip: string;
  }>("SELECT * FROM leads WHERE id = ?", [id]);
  if (!lead) notFound();

  const dash = (v: React.ReactNode) => v || <span className={styles.detailEmpty}>—</span>;
  const link = (url: string, label?: string) =>
    /^https?:\/\//i.test(url) ? (
      <a href={url} target="_blank" rel="noopener noreferrer">{label || url}</a>
    ) : (
      dash(url)
    );

  const { company, product, message } = splitMessage(lead.message || "");
  const received = new Date(toIso(lead.created_at) ?? "").toLocaleString("en-GB", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });

  const sections: DetailSection[] = [
    {
      title: "Contact",
      rows: [
        ["Name", dash(lead.name)],
        ["Email", lead.email ? <a key="e" href={`mailto:${lead.email}`}>{lead.email}</a> : dash("")],
        ["Phone", lead.phone ? <a key="p" href={`tel:${lead.phone.replace(/[^0-9+]/g, "")}`}>{lead.phone}</a> : dash("")],
        ["Company", dash(company)],
      ],
    },
    {
      title: "Enquiry",
      rows: [
        ["Form", dash(lead.form_name)],
        ["Product", dash(product)],
        ["Message", dash(message)],
        ["Received", received],
      ],
    },
    {
      title: "Source & device",
      rows: [
        ["Page", dash(lead.page_title)],
        ["Page URL", link(lead.page_url)],
        ["Came from", lead.referrer ? link(lead.referrer) : "Direct / unknown"],
        ["Device", dash(lead.device)],
        ["IP address", dash(lead.ip)],
      ],
    },
  ];

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Lead</h1>
        <div className={styles.row}>
          <Link href="/admin/leads/" className={styles.button}>
            ← All leads
          </Link>
          <DeleteLeadButton id={lead.id} name={lead.name} redirectTo="/admin/leads/" />
        </div>
      </div>

      <DetailSummary
        name={lead.name}
        subtitle={[company, product].filter(Boolean).join(" · ") || lead.email}
        badges={lead.form_name ? <span className={`${styles.badge} ${styles.badgeAdmin}`}>{lead.form_name}</span> : undefined}
        meta={[["Received", new Date(toIso(lead.created_at) ?? "").toLocaleDateString("en-GB", { timeZone: "Asia/Kolkata", dateStyle: "medium" })]]}
      />
      <DetailTables sections={sections} />
    </>
  );
}
