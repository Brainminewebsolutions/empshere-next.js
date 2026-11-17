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
          <img src="/universal-images/header/emsphere-logo-400.webp" alt="Emsphere" width={400} height={104} />
          <span className={styles.brandSub}>Website admin</span>
        </div>
        <div className={styles.loginBody}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
