import type { Metadata } from "next";
import styles from "./admin.module.css";

export const metadata: Metadata = {
  title: "Admin | Secure House",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles.root}>{children}</div>;
}
