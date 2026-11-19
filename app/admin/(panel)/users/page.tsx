import { requireAdmin, type StaffRole } from "@/lib/auth";
import { query, toIso } from "@/lib/db";
import CreateUserForm from "./CreateUserForm";
import UserRowActions from "./UserRowActions";
import styles from "../../admin.module.css";

export default async function UsersPage() {
  const me = await requireAdmin();
  const profiles = await query<{ id: string; email: string; full_name: string; role: StaffRole; last_login_at: string | null }>(
    "SELECT id, email, full_name, role, last_login_at FROM users ORDER BY created_at",
  );

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Users</h1>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Add a user</h2>
        <CreateUserForm />
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Everyone who can log in</h2>
        <div className={styles.tableWrap}>
          <table className={`${styles.table} ${styles.tableStack}`}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Last login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((p) => {
                const signIn = toIso(p.last_login_at);
                return (
                  <tr key={p.id}>
                    <td data-label="Name" style={{ fontWeight: 600, color: "var(--ink)" }}>
                      {p.full_name || "—"}
                      {p.id === me.id && <span className={styles.muted}> (you)</span>}
                    </td>
                    <td data-label="Email">{p.email}</td>
                    <td data-label="Role">
                      <span className={`${styles.badge} ${p.role === "admin" ? styles.badgeAdmin : styles.badgeDraft}`}>
                        {p.role}
                      </span>
                    </td>
                    <td data-label="Last login" className={styles.muted}>{signIn ? new Date(signIn).toLocaleString("en-GB", { timeZone: "Asia/Kolkata", hour12: false }) : "Never"}</td>
                    <td data-label="Actions">
                      {p.id === me.id ? (
                        <span className={`${styles.muted} ${styles.small}`}>Change your password under My account</span>
                      ) : (
                        <UserRowActions id={p.id} email={p.email} role={p.role as StaffRole} />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className={`${styles.muted} ${styles.small}`} style={{ marginTop: 12 }}>
          <strong>Admin</strong> can do everything, including managing users. <strong>Editor</strong> can manage posts
          and images only.
        </p>
      </div>
    </>
  );
}
