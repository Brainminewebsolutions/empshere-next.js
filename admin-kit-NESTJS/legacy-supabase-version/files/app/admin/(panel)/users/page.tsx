import { requireAdmin, type StaffRole } from "@/lib/auth";
import { createSecretClient } from "@/lib/supabase/server";
import CreateUserForm from "./CreateUserForm";
import UserRowActions from "./UserRowActions";
import styles from "../../admin.module.css";

export default async function UsersPage() {
  const me = await requireAdmin();
  const secret = createSecretClient();

  const [{ data: profiles }, { data: authList }] = await Promise.all([
    secret.from("profiles").select("id, email, full_name, role, created_at").order("created_at"),
    secret.auth.admin.listUsers({ perPage: 1000 }),
  ]);

  const lastSignIn = new Map((authList?.users ?? []).map((u) => [u.id, u.last_sign_in_at]));

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
              {(profiles ?? []).map((p) => {
                const signIn = lastSignIn.get(p.id);
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
                    <td data-label="Last login" className={styles.muted}>{signIn ? new Date(signIn).toLocaleString("en-GB") : "Never"}</td>
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
