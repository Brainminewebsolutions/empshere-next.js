"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../admin.module.css";

// 24px-grid line icons, drawn at 18px.
const ICONS: Record<string, React.ReactNode> = {
  dashboard: (
    <>
      <rect x="3.5" y="3.5" width="7" height="8" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="5" rx="1.5" />
      <rect x="13.5" y="11.5" width="7" height="9" rx="1.5" />
      <rect x="3.5" y="14.5" width="7" height="6" rx="1.5" />
    </>
  ),
  posts: (
    <>
      <path d="M14 3.5H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-10z" />
      <path d="M14 3.5v5h5M8.5 13h7M8.5 16.5h4.5" />
    </>
  ),
  add: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8.5v7M8.5 12h7" />
    </>
  ),
  users: (
    <>
      <circle cx="9.5" cy="8" r="3.5" />
      <path d="M3.5 19.5v-.8a4.7 4.7 0 0 1 4.7-4.7h2.6a4.7 4.7 0 0 1 4.7 4.7v.8M15.5 4.7a3.5 3.5 0 0 1 0 6.6M17.8 14.2a4.7 4.7 0 0 1 2.7 4.3v1" />
    </>
  ),
  leads: (
    <>
      <path d="M3.5 13.5h4.8l1.4 2.5h4.6l1.4-2.5h4.8" />
      <path d="M6.2 5.5h11.6l2.7 8v5a1.5 1.5 0 0 1-1.5 1.5h-14A1.5 1.5 0 0 1 3.5 18.5v-5z" />
    </>
  ),
  account: (
    <>
      <circle cx="12" cy="8.5" r="4" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  website: (
    <>
      <path d="M14 4h6v6M20 4l-8.5 8.5" />
      <path d="M18 13.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4.5" />
    </>
  ),
};

function Icon({ name }: { name: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

export default function NavLinks({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname().replace(/\/$/, "");

  const links = [
    { href: "/admin/", label: "Dashboard", icon: "dashboard", active: pathname === "/admin" },
    { href: "/admin/posts/", label: "Blog posts", icon: "posts", active: pathname.startsWith("/admin/posts") && !pathname.startsWith("/admin/posts/new") },
    { href: "/admin/posts/new/?type=blog", label: "Add new post", icon: "add", active: pathname.startsWith("/admin/posts/new") },
    ...(isAdmin
      ? [
          { href: "/admin/users/", label: "Users", icon: "users", active: pathname.startsWith("/admin/users") },
          { href: "/admin/leads/", label: "Leads", icon: "leads", active: pathname.startsWith("/admin/leads") },
        ]
      : []),
    { href: "/admin/account/", label: "My account", icon: "account", active: pathname.startsWith("/admin/account") },
  ];

  return (
    <nav aria-label="Admin">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          prefetch={false}
          aria-current={link.active ? "page" : undefined}
          className={`${styles.navLink} ${link.active ? styles.navLinkActive : ""}`}
        >
          <Icon name={link.icon} />
          {link.label}
        </Link>
      ))}
      <div className={styles.navDivider} />
      <a href="/" target="_blank" rel="noopener" className={styles.navLink}>
        <Icon name="website" />
        View website
      </a>
    </nav>
  );
}
