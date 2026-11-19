import Link from "next/link";
import { requireStaff } from "@/lib/auth";
import { count, query, toIso } from "@/lib/db";
import styles from "../admin.module.css";

export default async function AdminDashboardPage() {
  const staff = await requireStaff();
  const [published, drafts, leads, recent] = await Promise.all([
    count("SELECT COUNT(*) AS n FROM posts WHERE status = 'published'"),
    count("SELECT COUNT(*) AS n FROM posts WHERE status = 'draft'"),
    staff.role === "admin" ? count("SELECT COUNT(*) AS n FROM leads") : Promise.resolve(-1),
    query<{ id: string; title: string; status: string; updated_at: string }>(
      "SELECT id, title, status, updated_at FROM posts ORDER BY updated_at DESC LIMIT 6",
    ),
  ]);

  const stats = [
    { label: "Published blog posts", value: published, href: "/admin/posts/?status=published" },
    { label: "Drafts", value: drafts, href: "/admin/posts/?status=draft" },
    ...(leads >= 0 ? [{ label: "Website enquiries", value: leads, href: "/admin/leads/" }] : []),
  ];

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Welcome{staff.fullName ? `, ${staff.fullName.split(" ")[0]}` : ""}</h1>
        <Link href="/admin/posts/new/?type=blog" className={styles.buttonPrimary}>
          + Add new post
        </Link>
      </div>

      <div className={styles.statGrid}>
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className={styles.card} style={{ textDecoration: "none", color: "inherit" }}>
            <div className={styles.statNumber}>{s.value}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </Link>
        ))}
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Recently edited</h2>
        {recent.length > 0 ? (
          <div className={styles.tableWrap}>
            <table className={`${styles.table} ${styles.tableStack}`}>
              <tbody>
                {recent.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <Link href={`/admin/posts/${p.id}/`} className={styles.cellTitle}>{p.title}</Link>
                    </td>
                    <td data-label="Status">
                      <span className={`${styles.badge} ${p.status === "published" ? styles.badgePublished : styles.badgeDraft}`}>
                        {p.status}
                      </span>
                    </td>
                    <td data-label="Edited" className={`${styles.muted} ${styles.nowrap}`}>
                      {new Date(toIso(p.updated_at) ?? "").toLocaleString("en-GB", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className={styles.muted}>No posts yet.</p>
        )}
      </div>
    </>
  );
}
