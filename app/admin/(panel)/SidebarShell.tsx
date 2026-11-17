"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../admin.module.css";

export const LOGO_SRC = "/universal-images/header/emsphere-logo-400.webp";

// Desktop: a plain sticky sidebar. Mobile (<=860px): a top bar with a menu
// button that slides the same sidebar in as a drawer. The sidebar contents
// are server-rendered and passed in as children.
export default function SidebarShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <header className={styles.topbar}>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="admin-sidebar"
          onClick={() => setOpen(true)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
        <Link href="/admin/" aria-label="Emsphere admin home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO_SRC} alt="Emsphere" width={400} height={104} />
        </Link>
      </header>

      <div className={`${styles.scrim} ${open ? styles.scrimOpen : ""}`} onClick={() => setOpen(false)} aria-hidden="true" />

      <aside
        id="admin-sidebar"
        className={`${styles.sidebar} ${open ? styles.sidebarOpen : ""}`}
        onClick={(e) => {
          // Close the drawer once a link inside it is followed.
          if ((e.target as Element).closest("a")) setOpen(false);
        }}
      >
        <button
          type="button"
          className={`${styles.iconButton} ${styles.drawerClose}`}
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        {children}
      </aside>
    </>
  );
}
