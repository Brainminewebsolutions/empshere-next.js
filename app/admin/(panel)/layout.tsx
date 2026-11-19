import { Suspense } from "react";
import Link from "next/link";
import { requireStaff } from "@/lib/auth";
import { logout } from "../_actions/auth";
import NavLinks from "./NavLinks";
import LoadingToast from "./LoadingToast";
import DialogProvider from "./DialogProvider";
import SidebarShell, { LOGO_SRC } from "./SidebarShell";
import styles from "../admin.module.css";

function initials(name: string) {
  const parts = name.trim().split(/[\s@.]+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "EM";
}

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const staff = await requireStaff();
  const displayName = staff.fullName || staff.email;

  return (
    <DialogProvider>
    <div className={styles.shell}>
      <SidebarShell>
        <Link href="/admin/" className={styles.brand} aria-label="Emsphere admin home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO_SRC} alt="Emsphere" width={400} height={104} className={styles.brandLogo} />
          <span className={styles.brandSub}>Website admin</span>
        </Link>
        <Suspense>
          <NavLinks isAdmin={staff.role === "admin"} />
        </Suspense>
        <div className={styles.sidebarFooter}>
          <div className={styles.userChip}>
            <span className={styles.avatar} aria-hidden="true">{initials(displayName)}</span>
            <div style={{ minWidth: 0 }}>
              <div className={styles.userName}>{displayName}</div>
              <div className={styles.userRole}>{staff.role}</div>
            </div>
          </div>
          <form action={logout}>
            <button type="submit" className={styles.logoutButton}>
              Log out
            </button>
          </form>
        </div>
      </SidebarShell>
      <main className={styles.main}>{children}</main>
      <Suspense>
        <LoadingToast />
      </Suspense>
    </div>
    </DialogProvider>
  );
}
