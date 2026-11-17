import { redirect } from "next/navigation";
import { getCurrentStaff } from "@/lib/auth";
import LoginForm from "./LoginForm";
import styles from "../admin.module.css";

export default async function AdminLoginPage() {
  if (await getCurrentStaff()) redirect("/admin/");

  return (
    <div className={styles.loginWrap}>
      <div className={`${styles.card} ${styles.loginCard}`}>
        <div className={styles.loginLogo}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="Winsquare" width={247} height={85} />
          <span className={styles.brandSub}>Website admin</span>
        </div>
        <div className={styles.loginBody}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
