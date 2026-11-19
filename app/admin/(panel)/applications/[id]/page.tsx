import Link from "next/link";
import { notFound } from "next/navigation";
import { requireStaff } from "@/lib/auth";
import { queryOne, toIso } from "@/lib/db";
import { STATUS_LABELS, type ApplicationRow } from "@/lib/applications-shared";
import { isUuid } from "../../../_actions/validation";
import { DeleteApplicationButton, StatusSelect } from "../ApplicationActions";
import styles from "../../../admin.module.css";
import { DetailSummary, DetailTables, type DetailSection } from "../../DetailTable";

const formatSize = (bytes: number) => (bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`);

export default async function ApplicationPage({ params }: { params: Promise<{ id: string }> }) {
  await requireStaff();
  const { id } = await params;
  if (!isUuid(id)) notFound();

  const a = await queryOne<ApplicationRow>(
    `SELECT id, job_id, job_title, name, email, phone, location, experience, current_company, current_ctc, expected_ctc,
            notice_period, linkedin, message, resume_name, resume_size, status, created_at
       FROM job_applications WHERE id = ?`,
    [id],
  );
  if (!a) notFound();

  const dash = (v: string | null | undefined) => v || <span className={styles.detailEmpty}>—</span>;
  const received = new Date(toIso(a.created_at) ?? "").toLocaleString("en-GB", { timeZone: "Asia/Kolkata", dateStyle: "full", timeStyle: "short" });
  const sections: DetailSection[] = [
    {
      title: "Contact",
      rows: [
        ["Email", <a key="e" href={`mailto:${a.email}`}>{a.email}</a>],
        ["Phone", a.phone ? <a key="p" href={`tel:${a.phone.replace(/[^0-9+]/g, "")}`}>{a.phone}</a> : dash("")],
        ["Current location", dash(a.location)],
        ["LinkedIn / portfolio", /^https?:\/\//i.test(a.linkedin) ? <a key="l" href={a.linkedin} target="_blank" rel="noopener noreferrer">{a.linkedin}</a> : dash(a.linkedin)],
      ],
    },
    {
      title: "Professional details",
      rows: [
        ["Total experience", dash(a.experience)],
        ["Current company", dash(a.current_company)],
        ["Current CTC", dash(a.current_ctc)],
        ["Expected CTC", dash(a.expected_ctc)],
        ["Notice period", dash(a.notice_period)],
      ],
    },
    {
      title: "Application",
      rows: [
        ["Applied for", a.job_title || dash("")],
        ["Received", received],
        ["Cover note", dash(a.message)],
        [
          "Resume",
          a.resume_name ? (
            <a key="r" href={`/admin/applications/${a.id}/resume/`} className={styles.buttonPrimary} style={{ display: "inline-flex" }}>
              Download {a.resume_name} ({formatSize(a.resume_size)})
            </a>
          ) : (
            dash("")
          ),
        ],
      ],
    },
  ];

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>{a.name || "Application"}</h1>
        <div className={styles.row}>
          <StatusSelect id={a.id} status={a.status} />
          <Link href="/admin/applications/" className={styles.button}>← All applications</Link>
          <DeleteApplicationButton id={a.id} name={a.name} redirectTo="/admin/applications/" />
        </div>
      </div>

      <DetailSummary
        name={a.name}
        subtitle={a.job_title ? `Applied for ${a.job_title}` : undefined}
        badges={<span className={`${styles.badge} ${a.status === "shortlisted" ? styles.badgePublished : a.status === "rejected" ? styles.badgeFailed : a.status === "new" ? styles.badgeAdmin : styles.badgeDraft}`}>{STATUS_LABELS[a.status] ?? a.status}</span>}
        meta={[["Received", new Date(toIso(a.created_at) ?? "").toLocaleDateString("en-GB", { timeZone: "Asia/Kolkata", dateStyle: "medium" })], ["Experience", a.experience || "—"]]}
      />
      <DetailTables sections={sections} />
    </>
  );
}
