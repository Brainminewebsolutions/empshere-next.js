import Link from "next/link";

/* The emPay page moved to /empay-management-solution/. The site is a static export, so there are
   no server redirects; this page forwards old links and bookmarks with a meta
   refresh and points search engines at the new canonical URL. */

const NEW_PATH = "/empay-management-solution/";
const NEW_URL = "https://www.emsphere.com/empay-management-solution/";

export const metadata = {
  title: { absolute: "emPay Management System - Emsphere" },
  alternates: { canonical: NEW_URL },
  robots: { index: false, follow: true },
};

export default function PayrollRedirectPage() {
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
