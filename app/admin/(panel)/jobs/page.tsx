import Link from "next/link";
import { requireStaff } from "@/lib/auth";
import { query, toIso } from "@/lib/db";
import type { Job } from "@/lib/jobs-shared";
import JobRowActions from "./JobRowActions";
import styles from "../../admin.module.css";

type Search = { saved?: string };

export default async function AdminJobsPage({ searchParams }: { searchParams: Promise<Search> }) {
  await requireStaff();
  const params = await searchParams;

  let jobs: Job[] = [];
  let error: string | null = null;
  try {
    jobs = await query<Job>(
      "SELECT id, title, department, location, employment_type, status, created_at, updated_at FROM jobs ORDER BY created_at DESC, id ASC",
    );
  } catch (err) {
    console.error("[admin jobs]", err);
    error = "database error - run database/mysql.sql (MySQL) or database/postgres.sql (Postgres) to create the jobs table.";
  }

  const openCount = jobs.filter((j) => j.status === "open").length;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Job openings</h1>
        <Link href="/admin/jobs/new/" className={styles.buttonPrimary}>+ Add job</Link>
      </div>
      <p className={styles.pageIntro}>
        Open jobs appear on the public <a href="/careers/#open-roles" target="_blank" rel="noopener">/careers</a> page.
        Applications are emailed to the HR inbox. {openCount} open, {jobs.length - openCount} closed.
      </p>

      {params.saved && <p className={styles.success}>Job saved.</p>}
      {error && <p className={styles.error}>Could not load jobs: {error}</p>}

      <div className={styles.tableWrap}>
        <table className={`${styles.table} ${styles.tableStack}`}>
          <thead>
            <tr>
              <th>Job</th>
              <th>Location</th>
              <th>Type</th>
              <th>Status</th>
              <th>Posted</th>
              <th style={{ width: 210 }}><span className={styles.srOnly}>Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>
                  <div style={{ minWidth: 0 }}>
                    <Link href={`/admin/jobs/${job.id}/`} className={styles.cellTitle}>{job.title}</Link>
                    {job.department && <div className={styles.cellSub}>{job.department}</div>}
                  </div>
                </td>
                <td data-label="Location">{job.location || "—"}</td>
                <td data-label="Type">{job.employment_type}</td>
                <td data-label="Status">
                  <span className={`${styles.badge} ${job.status === "open" ? styles.badgePublished : styles.badgeDraft}`}>{job.status}</span>
                </td>
                <td data-label="Posted" className={`${styles.muted} ${styles.nowrap}`}>
                  {new Date(toIso(job.created_at) ?? "").toLocaleDateString("en-GB", { dateStyle: "medium", timeZone: "Asia/Kolkata" })}
                </td>
                <td><JobRowActions id={job.id} title={job.title} status={job.status} /></td>
              </tr>
            ))}
            {!error && jobs.length === 0 && (
              <tr>
                <td colSpan={6} className={styles.emptyCell}>No jobs yet. Click “Add job” to publish the first opening.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
