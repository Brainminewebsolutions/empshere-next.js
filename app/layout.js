import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import DemoModal from "@/components/DemoModal";
import { DEFAULT_OG_IMAGE, TWITTER_SITE } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// TODO: replace with the confirmed production domain before deploying.
const SITE_URL = "https://www.emsphere.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Workforce and Labor Management System - Emsphere",
    template: "%s | Emsphere Technologies",
  },
  description:
    "Digitalize your HR Processes and Workflow for all environments with our modern HR suites using the latest technology, powered by Emsphere Pune.",
  keywords: [
    "Workforce and Labor Management System",
    "Labor Management System",
    "Contract Labour Management System",
    "CLMS Software",
    "HRMS Software Pune",
    "Payroll Management System",
    "Emsphere Pune",
    "Emsphere Technologies",
    "Visitor Management System",
    "Employee Lifecycle Management",
    "HR Automation Suites",
    "Industrial Relations Software",
  ],
  alternates: {
    canonical: "https://www.emsphere.com/",
  },
  openGraph: {
    title: "Workforce and Labor Management System - Emsphere",
    description:
      "Digitalize your HR Processes and Workflow for all environments with our modern HR suites using the latest technology, powered by Emsphere Pune.",
    url: "https://www.emsphere.com/",
    siteName: "Emsphere Technologies",
    locale: "en_US",
    images: [DEFAULT_OG_IMAGE],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_SITE,
    title: "Workforce and Labor Management System - Emsphere",
    description:
      "Digitalize your HR Processes and Workflow for all environments with our modern HR suites using the latest technology, powered by Emsphere Pune.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SmoothScroll />
        <Header />
        {children}
        <Footer />
        <DemoModal />
      </body>
    </html>
  );
}
