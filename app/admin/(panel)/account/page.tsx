import { requireStaff } from "@/lib/auth";
import ChangePasswordForm from "./ChangePasswordForm";
import styles from "../../admin.module.css";

export default async function AccountPage() {
  const staff = await requireStaff();

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>My account</h1>
      </div>
      <div className={styles.card} style={{ maxWidth: 520 }}>
        <p style={{ marginBottom: 4 }}>
          <strong>{staff.fullName || "—"}</strong>
        </p>
        <p className={styles.muted} style={{ marginBottom: 18 }}>
          {staff.email} · <span style={{ textTransform: "capitalize" }}>{staff.role}</span>
        </p>
        <h2 className={styles.cardTitle}>Change password</h2>
        <ChangePasswordForm />
      </div>
    </>
  );
}
