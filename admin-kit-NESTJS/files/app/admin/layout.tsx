import type { Metadata } from "next";
import styles from "./admin.module.css";

// The admin always reads live data behind a login, so it is allowed to block on
// navigation (opts out of the "instant navigation" dev check).
export const instant = false;

export const metadata: Metadata = {
  title: "Admin | Winsquare",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles.root}>{children}</div>;
}
