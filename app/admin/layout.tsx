import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import styles from "./admin.module.css";

// Same heading typeface as the public blog, so the admin feels like the site.
const adminFont = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-admin",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin | Emsphere",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${styles.root} ${adminFont.variable}`}>{children}</div>;
}
