"use client";

import { usePathname } from "next/navigation";

// Renders its children everywhere except the /admin dashboard. Used in the
// root layout to keep the public site's header/footer, live chat and
// analytics/session-recording scripts (GTM, GA4, Clarity, Tawk.to) off
// admin screens - Clarity in particular would otherwise record admin
// sessions, including whatever is typed into the editor.
export default function SiteOnly({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}
