import Link from "next/link";

/* The emPay page lives at /payroll-management-solution/. The site can be a static export, so
   there are no server redirects here; this page forwards old links and bookmarks with a meta
   refresh and points search engines at the canonical URL. */

const NEW_PATH = "/payroll-management-solution/";
const NEW_URL = "https://www.emsphere.com/payroll-management-solution/";

export const metadata = {
  title: { absolute: "emPay Management System - Emsphere" },
  alternates: { canonical: NEW_URL },
  robots: { index: false, follow: true },
};

export default function EmpayRedirectPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-[#FFFFFA] px-4 text-center">
      <meta httpEquiv="refresh" content={`0; url=${NEW_PATH}`} />
      <p className="text-base text-[#4c4c4c]">
        This page has moved to{" "}
        <Link href={NEW_PATH} className="font-semibold text-[#b07d00] underline">
          emPay
        </Link>
        .
      </p>
    </main>
  );
}
