import Link from "next/link";
import { requireStaff } from "@/lib/auth";
import { count, query, toIso } from "@/lib/db";
import { APPLICATION_STATUSES, STATUS_LABELS, type ApplicationRow, type ApplicationStatus } from "@/lib/applications-shared";
import Pagination, { PAGE_SIZE, pageParam } from "../Pagination";
import { DeleteApplicationButton } from "./ApplicationActions";
import styles from "../../admin.module.css";

type Search = { q?: string; status?: string; page?: string };
type ListRow = Pick<ApplicationRow, "id" | "job_title" | "name" | "email" | "phone" | "location" | "experience" | "status" | "created_at" | "resume_name">;

const formatDate = (value: string) =>
  new Date(toIso(value) ?? "").toLocaleString("en-GB", { timeZone: "Asia/Kolkata", day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

const badgeClass = (status: ApplicationStatus) =>
  status === "shortlisted" ? styles.badgePublished : status === "rejected" ? styles.badgeFailed : status === "new" ? styles.badgeAdmin : styles.badgeDraft;

export default async function ApplicationsPage({ searchParams }: { searchParams: Promise<Search> }) {
  await requireStaff();
  const params = await searchParams;
  const q = (params.q ?? "").trim().slice(0, 100);
  const status = (APPLICATION_STATUSES as readonly string[]).includes(params.status ?? "") ? (params.status as ApplicationStatus) : "";
  const page = pageParam(params.page);

  const where: string[] = [];
  const args: string[] = [];
  if (q) {
    const like = `%${q.replace(/[\\%_]/g, (c) => "\\" + c)}%`;
    where.push("(name LIKE ? OR email LIKE ? OR phone LIKE ? OR job_title LIKE ?)");
    args.push(like, like, like, like);
  }
  if (status) { where.push("status = ?"); args.push(status); }
  const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";

  let rows: ListRow[] = [];
  let total = 0;
  let newCount = 0;
  let error: string | null = null;
  try {
    [rows, total, newCount] = await Promise.all([
      query<ListRow>(
        `SELECT id, job_title, name, email, phone, location, experience, status, created_at, resume_name
           FROM job_applications ${clause} ORDER BY created_at DESC, id ASC LIMIT ? OFFSET ?`,
        [...args, PAGE_SIZE, (page - 1) * PAGE_SIZE] as (string | number)[],
      ),
      count(`SELECT COUNT(*) AS n FROM job_applications ${clause}`, args),
      count("SELECT COUNT(*) AS n FROM job_applications WHERE status = 'new'"),
    ]);
  } catch (err) {
    console.error("[admin applications]", err);
    error = "database error - run database/mysql.sql (MySQL) or database/postgres.sql (Postgres) to create the job_applications table.";
  }

  const pageHref = (p: number) => {
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (status) sp.set("status", status);
    if (p > 1) sp.set("page", String(p));
    const s = sp.toString();
    return `/admin/applications/${s ? `?${s}` : ""}`;
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Job applications</h1>
      </div>
      <p className={styles.pageIntro}>
        Every application submitted through the <a href="/careers/#open-roles" target="_blank" rel="noopener">/careers</a> apply form, newest first. {newCount} new.
      </p>

      <div className={styles.card} style={{ marginBottom: 16 }}>
        <form className={styles.filterGrid} action="/admin/applications/">
          <label className={styles.field}>
            <span className={styles.label}>Search</span>
            <input name="q" type="search" defaultValue={q} placeholder="Name, email, phone or job" className={styles.input} />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Status</span>
            <select name="status" defaultValue={status} className={styles.select}>
              <option value="">All statuses</option>
              {APPLICATION_STATUSES.map((s) => (
                <option key={s} value={s}>{STATUS_LABELS[s]}</option>
              ))}
            </select>
          </label>
          <div className={styles.row} style={{ flexWrap: "nowrap" }}>
            <button className={styles.buttonPrimary} type="submit">Filter</button>
            {(q || status) && <Link href="/admin/applications/" className={styles.button}>Clear</Link>}
          </div>
        </form>
      </div>

      {error && <p className={styles.error}>Could not load applications: {error}</p>}

      <div style={{ marginBottom: 12 }}>
        <Pagination page={page} total={total} noun={["application", "applications"]} hrefFor={pageHref} />
      </div>

      <div className={styles.tableWrap}>
        <table className={`${styles.table} ${styles.tableStack}`}>
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Applied for</th>
              <th>Contact</th>
              <th>Experience</th>
              <th>Status</th>
              <th>Received</th>
              <th style={{ width: 150 }}><span className={styles.srOnly}>Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((a) => (
              <tr key={a.id}>
                <td>
                  <div style={{ minWidth: 0 }}>
                    <Link href={`/admin/applications/${a.id}/`} className={styles.cellTitle}>{a.name || "—"}</Link>
                    {a.location && <div className={styles.cellSub}>{a.location}</div>}
                  </div>
                </td>
                <td data-label="Applied for">{a.job_title || "—"}</td>
                <td data-label="Contact">
                  <div style={{ minWidth: 0 }}>
                    <div><a href={`mailto:${a.email}`} className={styles.cellLink}>{a.email}</a></div>
                    {a.phone && <div><a href={`tel:${a.phone.replace(/[^0-9+]/g, "")}`} className={styles.cellLink}>{a.phone}</a></div>}
                  </div>
                </td>
                <td data-label="Experience">{a.experience || "—"}</td>
                <td data-label="Status"><span className={`${styles.badge} ${badgeClass(a.status)}`}>{STATUS_LABELS[a.status] ?? a.status}</span></td>
                <td data-label="Received" className={`${styles.muted} ${styles.nowrap}`}>{formatDate(a.created_at)}</td>
                <td>
                  <div className={styles.row} style={{ gap: 2, flexWrap: "nowrap" }}>
                    <Link href={`/admin/applications/${a.id}/`} className={styles.buttonLink}>View</Link>
                    <DeleteApplicationButton id={a.id} name={a.name} />
                  </div>
                </td>
              </tr>
            ))}
            {!error && rows.length === 0 && (
              <tr>
                <td colSpan={7} className={styles.emptyCell}>
                  {q || status ? "No applications match these filters." : "No applications yet. They appear here as soon as someone applies from the careers page."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
