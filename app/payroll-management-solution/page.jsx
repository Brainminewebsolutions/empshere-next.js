import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instrument_Sans, Inter } from "next/font/google";
import ScrollReveal from "@/components/ScrollReveal";
import BackToTop from "@/components/BackToTop";
import FlagshipProducts from "@/components/FlagshipProducts";
import PayrollHeroVector from "@/components/PayrollHeroVector";

/* --------------------------------------------------------------------
   Images — every image this page uses lives in
   app/images/payroll-management-solution and is imported by name.
   -------------------------------------------------------------------- */

// Hero + clients
import heroIllustration from "../images/payroll-management-solution/hero-empayroll-salary-payslip-illustration.webp";
import logoUttam from "../images/payroll-management-solution/client-logo-uttam.webp";
import logoApollo from "../images/payroll-management-solution/client-logo-apollo.webp";
import logoCastrol from "../images/payroll-management-solution/client-logo-castrol.webp";
import logoPremier from "../images/payroll-management-solution/client-logo-premier.webp";

// One Software, many Advantages
import salaryCreditedImg from "../images/payroll-management-solution/employee-salary-credited-on-mobile.webp";
import badgeRating from "../images/payroll-management-solution/badge-five-star-rating.webp";
import badgeIndustryStandards from "../images/payroll-management-solution/badge-as-per-industry-standards.webp";
import badgeProgressRing from "../images/payroll-management-solution/badge-payroll-progress-ring.webp";

// Employee information / role based access / self service / exit
import employeeInfoImg from "../images/payroll-management-solution/employee-information-quick-access-mobile.webp";
import roleBasedImg from "../images/payroll-management-solution/role-based-access-login-screens.webp";
import empoweredImg from "../images/payroll-management-solution/empowered-employee-self-service.webp";
import exitImg from "../images/payroll-management-solution/frictionless-employee-exit-settlement.webp";

// Salary management tabs
import salaryCalculationImg from "../images/payroll-management-solution/salary-calculation-team-review.webp";
import salaryComputationImg from "../images/payroll-management-solution/salary-computation-calculator.webp";
import reconciliationImg from "../images/payroll-management-solution/salary-monthly-reconciliation-reports.webp";
import payslipImg from "../images/payroll-management-solution/payslip-generation-dashboard.webp";


// Title and description are the page's Rank Math values on the current site.
const PAGE_URL = "https://www.emsphere.com/payroll-management-solution/";
const PAGE_TITLE = "Payroll Management System, Payroll Software India - Emsphere";
const PAGE_DESCRIPTION =
  "Efficient Payroll Management System and Software in Pune, India. Simplify Payroll Processes with Our Comprehensive Payroll Software";
const OG_IMAGE = heroIllustration.src;

export const metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  keywords: null,
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "Emsphere Technologies",
    locale: "en_US",
    images: [OG_IMAGE],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const instrumentSans = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument-sans" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fontInstrument = "font-[family-name:var(--font-instrument-sans)]";
const fontInter = "font-[family-name:var(--font-inter)]";

/* --------------------------------------------------------------------
   Shared surfaces + motion (same language as the HRMS page)
   -------------------------------------------------------------------- */

const goldCard =
  "bg-white rounded-xl shadow-[inset_0_0_0_0.789px_#f8bb18,0px_0px_15.775px_-7.099px_rgba(0,0,0,0.25)]";
const greyCard =
  "bg-white rounded-2xl shadow-[inset_0_0_0_0.814px_#dddddd,0px_0px_16.279px_-7.326px_rgba(0,0,0,0.25)]";
const softCard =
  "rounded-[11px] shadow-[inset_0_0_0_0.601px_#dddddd,0px_0px_12.029px_-5.413px_rgba(0,0,0,0.25)]";
const mutedText = "text-[rgba(0,0,0,0.64)]";

const ease = "ease-[cubic-bezier(0.16,1,0.3,1)]";
const motion = `transition-[translate,scale,box-shadow,background-color] duration-300 ${ease}`;
const revealUp = "reveal-on-scroll reveal-fade-up";
const revealFromLeft = "reveal-on-scroll reveal-fade-right";
const revealFromRight = "reveal-on-scroll reveal-fade-left";
const revealZoom = "reveal-on-scroll reveal-zoom-in";
const stagger = (index, step = 120) => ({ transitionDelay: `${index * step}ms` });

const liftGold = `group/card ${motion} hover:-translate-y-1 hover:shadow-[inset_0_0_0_1.5px_#f8bb18,0px_10px_24px_-6px_rgba(0,0,0,0.18)]`;
const liftGrey = `group/card ${motion} hover:-translate-y-1.5 hover:shadow-[inset_0_0_0_0.814px_#dddddd,0px_14px_28px_-6px_rgba(0,0,0,0.18)]`;
const liftPanel = `group/panel ${motion} hover:-translate-y-1 hover:shadow-[inset_0_0_0_0.601px_#dddddd,0px_14px_28px_-8px_rgba(0,0,0,0.18)]`;
const iconPop = `transition-[scale] duration-300 ${ease} group-hover/card:scale-110`;
const panelImageZoom = `transition-[scale] duration-500 ${ease} group-hover/panel:scale-[1.04]`;
const arrowNudge = `transition-[translate] duration-200 ${ease} group-hover/btn:translate-x-[3px]`;

const primaryButton = `group/btn inline-flex items-center justify-center gap-2 rounded-[9px] bg-[#0077c2] px-6 py-3 ${fontInter} font-semibold text-white ${motion} hover:-translate-y-0.5 hover:bg-[#0061af] hover:shadow-[0_8px_18px_-4px_rgba(0,119,194,0.45)]`;
const outlineButton = `group/btn inline-flex items-center justify-center gap-2 rounded-[9px] bg-white px-6 py-3 ${fontInter} font-semibold text-[#f8bb18] shadow-[inset_0_0_0_1.5px_#f8bb18] ${motion} hover:-translate-y-0.5 hover:bg-[#fffdf5]`;
const learnMoreButton = `group/btn flex items-center justify-center gap-2 rounded-[5px] bg-[#3b82f6] min-h-11 py-3 text-xs font-medium tracking-wide text-white shadow-[inset_0_0_0_1px_#b3b3b3] ${motion} hover:-translate-y-0.5 hover:bg-[#2563eb] hover:shadow-[inset_0_0_0_1px_#b3b3b3,0_8px_18px_-4px_rgba(59,130,246,0.45)]`;

/* --------------------------------------------------------------------
   Icons
   -------------------------------------------------------------------- */

function ArrowCircleIcon({ className = "h-5 w-5", fill = "#ffffff" }) {
  return (
    <svg viewBox="0 0 21 21" aria-hidden="true" className={`-scale-x-100 ${arrowNudge} ${className}`}>
      <path
        fill={fill}
        d="M10.5 0C8.423 0 6.393 0.616 4.667 1.77C2.94 2.923 1.594 4.563 0.799 6.482C0.005 8.4 -0.203 10.512 0.202 12.548C0.607 14.585 1.607 16.456 3.075 17.925C4.544 19.393 6.415 20.393 8.452 20.798C10.488 21.203 12.6 20.995 14.518 20.201C16.437 19.406 18.077 18.06 19.23 16.333C20.384 14.607 21 12.577 21 10.5C20.997 7.716 19.89 5.047 17.921 3.079C15.953 1.11 13.284 0.003 10.5 0ZM14.538 11.308L8.411 11.308L10.264 13.159C10.339 13.234 10.398 13.323 10.439 13.422C10.48 13.52 10.5 13.625 10.5 13.731C10.5 13.837 10.48 13.942 10.439 14.04C10.398 14.138 10.339 14.227 10.264 14.302C10.189 14.377 10.1 14.437 10.002 14.477C9.904 14.518 9.798 14.539 9.692 14.539C9.586 14.539 9.481 14.518 9.383 14.477C9.285 14.437 9.196 14.377 9.121 14.302L5.89 11.071C5.815 10.996 5.755 10.907 5.715 10.809C5.674 10.711 5.653 10.606 5.653 10.5C5.653 10.394 5.674 10.289 5.715 10.191C5.755 10.093 5.815 10.004 5.89 9.929L9.121 6.698C9.272 6.546 9.478 6.461 9.692 6.461C9.907 6.461 10.112 6.546 10.264 6.698C10.415 6.849 10.5 7.055 10.5 7.269C10.5 7.484 10.415 7.689 10.264 7.841L8.411 9.692L14.538 9.692C14.753 9.692 14.958 9.777 15.11 9.929C15.261 10.08 15.346 10.286 15.346 10.5C15.346 10.714 15.261 10.92 15.11 11.071C14.958 11.223 14.753 11.308 14.538 11.308Z"
      />
    </svg>
  );
}

function ArrowOutlineIcon({ className = "h-3.5 w-4" }) {
  return (
    <svg
      viewBox="-8 -8 208 208"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`${arrowNudge} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.133}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M96 0L192 96L96 192L96 144L64 144L64 48L96 48L96 0Z" vectorEffect="non-scaling-stroke" />
      <path d="M0 144L0 48" vectorEffect="non-scaling-stroke" />
      <path d="M32 144L32 48" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function CheckIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 10.5l3.5 3.5 7.5-8" />
    </svg>
  );
}

// Solid icons drawn for this page matching the HRMS vibrant solid-tile + white icon style.
const ICON_PATHS = {
  access: (
    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
  ),
  controls: (
    <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
  ),
  accuracy: (
    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
  ),
  analytics: (
    <path fillRule="evenodd" d="M3 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h18a1 1 0 1 0 0-2H4V4a1 1 0 0 0-1-1Zm4 10a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-5Zm6-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V9Zm6-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V5Z" clipRule="evenodd" />
  ),
  cycle: (
    <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.022.75.75 0 0 0-.53-.92Z" clipRule="evenodd" />
  ),
  audit: (
    <>
      <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5A1.5 1.5 0 0 0 7.5 20.25h9a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5h-9Zm3.75 3.75a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75Zm-2.25 4.5a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm0 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
      <path d="M18.75 9.75a.75.75 0 0 0-1.5 0v9.75H7.5a.75.75 0 0 0 0 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V9.75Z" />
    </>
  ),
  group: (
    <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.003.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.232.75.75 0 0 0 .364-.63v-.12a5.625 5.625 0 0 0-5.188-5.615Z" />
  ),
  rules: (
    <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.177 5.48a1.875 1.875 0 0 0-2.282.819l-.92 1.59a1.875 1.875 0 0 0 .432 2.385l1.04.832c.1.082.146.229.117.382a7.525 7.525 0 0 0 0 1.14c.029.153-.017.3-.117.382l-1.04.832a1.875 1.875 0 0 0-.432 2.385l.92 1.59c.527.912 1.636 1.3 2.282.818l1.14-.41c.116-.043.284-.032.45.082.312.214.641.405.986.57.182.088.277.228.297.35l.177 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.14.409a1.875 1.875 0 0 0 2.282-.818l.92-1.59a1.875 1.875 0 0 0-.432-2.385l-1.04-.832c-.1-.082-.146-.229-.117-.382a7.525 7.525 0 0 0 0-1.14c-.029-.153.017-.3.117-.382l1.04-.832a1.875 1.875 0 0 0 .432-2.385l-.92-1.59a1.875 1.875 0 0 0-2.282-.818l-1.14.41c-.115.042-.283.031-.45-.083a7.49 7.49 0 0 0-.985-.57c-.183-.088-.277-.229-.297-.349l-.178-1.071A1.875 1.875 0 0 0 12.922 2.25h-1.844ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
  ),
  arrears: (
    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75A3.75 3.75 0 0 1 22.5 8.25v10.5A3.75 3.75 0 0 1 18.75 22.5H5.25A3.75 3.75 0 0 1 1.5 18.75V8.25A3.75 3.75 0 0 1 5.25 4.5H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
  ),
  reimbursement: (
    <path fillRule="evenodd" d="M4.5 2.25A.75.75 0 0 0 3.75 3v18a.75.75 0 0 0 1.18.614l2.57-1.836 2.57 1.836a.75.75 0 0 0 .88 0l2.57-1.836 2.57 1.836a.75.75 0 0 0 .88 0l2.57-1.836 2.57 1.836A.75.75 0 0 0 20.25 21V3a.75.75 0 0 0-.75-.75H4.5ZM7.5 6a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5h-9Zm0 3.75a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5h-9Zm0 3.75a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5h-5Z" clipRule="evenodd" />
  ),
  loans: (
    <>
      <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
      <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.005ZM1.5 18a.75.75 0 0 1 .75-.75h19.5a.75.75 0 0 1 0 1.5H2.25A.75.75 0 0 1 1.5 18Zm0 3a.75.75 0 0 1 .75-.75h19.5a.75.75 0 0 1 0 1.5H2.25A.75.75 0 0 1 1.5 21Z" clipRule="evenodd" />
    </>
  ),
  banking: (
    <>
      <path fillRule="evenodd" d="M11.584 2.376a.75.75 0 0 1 .832 0l9 6a.75.75 0 1 1-.832 1.248L12 3.901 3.416 9.624a.75.75 0 0 1-.832-1.248l9-6Z" clipRule="evenodd" />
      <path fillRule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1 0-1.5h.75v-9.918a.75.75 0 0 1 1.5 0v9.918h3v-9.918a.75.75 0 0 1 1.5 0v9.918h3v-9.918a.75.75 0 0 1 1.5 0v9.918h3v-9.918a.75.75 0 0 1 1.5 0ZM4.5 22.5a.75.75 0 0 0 0 1.5h15a.75.75 0 0 0 0-1.5h-15Z" clipRule="evenodd" />
    </>
  ),
  pf: (
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v6.19a.75.75 0 0 0 1.5 0V8.06l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
  ),
  esi: (
    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
  ),
  pt: (
    <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875ZM12.75 12a.75.75 0 0 0 0-1.5h-4.5a.75.75 0 0 0 0 1.5h4.5Zm0 3a.75.75 0 0 0 0-1.5h-4.5a.75.75 0 0 0 0 1.5h4.5Zm-2.25 3a.75.75 0 0 0 0-1.5h-2.25a.75.75 0 0 0 0 1.5h2.25Zm4.5-12.75v1.875a.375.375 0 0 0 .375.375h1.875a2.25 2.25 0 0 0-2.25-2.25Z" clipRule="evenodd" />
  ),
  tds: (
    <path fillRule="evenodd" d="M6 2.25A2.25 2.25 0 0 0 3.75 4.5v15A2.25 2.25 0 0 0 6 21.75h12A2.25 2.25 0 0 0 20.25 19.5V4.5A2.25 2.25 0 0 0 18 2.25H6Zm1.5 3a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5h-9ZM7.5 9a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-.75.75h-1.5A.75.75 0 0 1 7.5 10.5V9Zm4.5-.75a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75h-1.5ZM7.5 13.5a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75v-1.5Zm4.5-.75a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75h-1.5ZM15 9a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75V9Zm-7.5 9a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
  ),
  form16: (
    <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875ZM9.75 14.25a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0Zm.324 3.594a3.75 3.75 0 0 0 3.852 0l1.358 2.037a.75.75 0 0 1-.624 1.169H9.34a.75.75 0 0 1-.624-1.169l1.358-2.037ZM14.25 3.375v1.875a.375.375 0 0 0 .375.375h1.875a2.25 2.25 0 0 0-2.25-2.25Z" clipRule="evenodd" />
  ),
  bonus: (
    <path fillRule="evenodd" d="M12 2.25a2.25 2.25 0 0 0-2.25 2.25v.75H4.5A2.25 2.25 0 0 0 2.25 7.5v2.25a2.25 2.25 0 0 0 2.25 2.25h.75v6.75A2.25 2.25 0 0 0 7.5 21h9a2.25 2.25 0 0 0 2.25-2.25V12h.75a2.25 2.25 0 0 0 2.25-2.25V7.5A2.25 2.25 0 0 0 19.5 5.25h-5.25V4.5A2.25 2.25 0 0 0 12 2.25ZM11.25 12H7.5v6.75a.75.75 0 0 0 .75.75h3V12Zm1.5 7.5h3a.75.75 0 0 0 .75-.75V12h-3.75v7.5ZM4.5 6.75h6.75v3.75H4.5a.75.75 0 0 1-.75-.75V7.5a.75.75 0 0 1 .75-.75Zm8.25 0h6.75a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75H12.75V6.75Z" clipRule="evenodd" />
  ),
  reports: (
    <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 1 1-16.5 0Zm10.5-9.69a9.75 9.75 0 0 1 8.94 8.94.75.75 0 0 1-.74.75h-7.5a.75.75 0 0 1-.75-.75V4.55a.75.75 0 0 1 .05-.74Z" clipRule="evenodd" />
  ),
};

function LineIcon({ name, className = "h-6 w-6" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

function IconTile({ name, bg, className = "h-12 w-12 rounded-[10px]", iconClassName = "h-6 w-6" }) {
  return (
    <span className={`flex shrink-0 items-center justify-center text-white shadow-sm ${iconPop} ${className}`} style={{ background: bg }}>
      <LineIcon name={name} className={iconClassName} />
    </span>
  );
}

function SectionHeader({ id, title, text, align = "center", className = "" }) {
  const alignment = align === "center" ? "mx-auto text-center items-center" : "items-start";
  return (
    <header className={`${revealUp} flex max-w-3xl flex-col gap-3 ${alignment} ${className}`}>
      <h2 id={id} className="text-2xl font-semibold md:text-[2.1rem] md:leading-[44px]">
        {title}
      </h2>
      {text && <p className={`text-base leading-[25px] md:text-lg md:leading-[28px] ${mutedText}`}>{text}</p>}
    </header>
  );
}

/* --------------------------------------------------------------------
   Content — all copy from https://www.emsphere.com/payroll-management-solution/
   -------------------------------------------------------------------- */

const clients = [
  { name: "Uttam", logo: logoUttam },
  { name: "Apollo", logo: logoApollo },
  { name: "Castrol", logo: logoCastrol },
  { name: "Premier", logo: logoPremier },
];

const advantages = [
  {
    title: "Access",
    text: "ESS access for TDF self-declaration, comparison of tax amount & document with proof upload, validations with approval workflows",
    icon: "access",
    bg: "#0077c2",
  },
  {
    title: "Controls",
    text: "Strong workflows and Audit Controls, maker, checker and approver",
    icon: "controls",
    bg: "#0fb880",
  },
];

const whyEmpayroll = [
  { title: "Accuracy", text: "100% accurate and on time payroll.", icon: "accuracy", bg: "#f8bb18", color: "#f8bb18" },
  { title: "Analytics", text: "Slice and dice data and analyse department-wise.", icon: "analytics", bg: "#0077c2", color: "#0077c2" },
  {
    title: "End to End Payroll",
    text: "From attendance, to leaves, payroll, TDS, calculations & loan deductions, 24QR, Form 16, payslip generation to FNF.",
    icon: "cycle",
    bg: "#0fb880",
    color: "#0fb880",
  },
  {
    title: "Audit & Compliance",
    text: "Strong audit trails with tracking for each sensitive transaction or workflow modification. Encryption of sensitive information with GDPR Certification.",
    icon: "audit",
    bg: "#ef4444",
    color: "#ef4444",
  },
];

const salaryTabs = [
  {
    id: "salary-calculation",
    label: "Salary Calculation",
    text: "Business Vertical agnostic system provides flexibility to create salary structure as required. System offers the freedom to customize Salary Head, create Salary Templates and decide Salary Calculation as per your business norms.",
    image: salaryCalculationImg,
    imageAlt: "HR and finance team collaborating on salary structure calculations and financial review on a laptop",
  },
  {
    id: "salary-computation",
    label: "Salary Computation",
    text: "Calculate salary accurately with all kind of computations included like attendance, statutory deductions, loans if any, all this and more with a single Click and Hold.",
    image: salaryComputationImg,
    imageAlt: "Payroll specialist computing employee salaries and statutory deductions on a digital tablet in modern office",
  },
  {
    id: "monthly-reconciliation",
    label: "Monthly Reconciliation",
    text: "User friendly flow which gives power back to the user to select own criteria and get accurate results.",
    image: reconciliationImg,
    imageAlt: "Finance team analyzing monthly payroll reconciliation and variance reports on a laptop in modern office",
  },
  {
    id: "pay-slip-generations",
    label: "Pay Slip Generations",
    text: "Generate payslip as per customized templates. emPayroll makes it instant and effortless.",
    image: payslipImg,
    imageAlt: "HR professional generating and downloading employee payslips from the payroll management dashboard",
  },
];

const salaryProcessing = [
  { title: "Arrears", text: "Automated calculation of arrears for number of days worked, in case of increment etc.", icon: "arrears", bg: "#f8bb18" },
  { title: "Reimbursement", text: "Create and manage different type of reimbursement, give claim approvals, and auto-calculate employee tax.", icon: "reimbursement", bg: "#0077c2" },
  { title: "Loans", text: "Recover loans if any with fixed monthly or user-defined instalments. Track entire loan lifecycle.", icon: "loans", bg: "#0fb880" },
  { title: "Banking", text: "All banking related services for employees.", icon: "banking", bg: "#5b5bd6" },
];

const statutory = [
  { title: "PF", text: "Accurate PF payment with AI powered electronic challan-cum-return generation process (ECR).", icon: "pf" },
  { title: "ESI", text: "ESI payment made easy with auto creation of reports and ready to file returns of ESI for multiple ESI codes", icon: "esi" },
  { title: "Professional Tax", text: "PT supported for all states of India. Processing payments and filing returns simplified with reports generated automatically.", icon: "pt" },
];

const tds = [
  { title: "TDS", text: "Auto-tax computation with data pulled from salary computation and employee declaration.", icon: "tds" },
  { title: "Form 16", text: "Generate Form 16 directly and digitally sign the form to help employee with personal Income Tax.", icon: "form16" },
  { title: "Tax on other earnings", text: "Calculate one-time tax on other earning of employee like bonus, gratuity etc and club it with tax deducted in salary.", icon: "bonus" },
  { title: "TDS Reports", text: "All TDS reports covered from Form 16/16 AA, Form-12 BA, Form 24 Q Etds, Form 27A to ITNS 281 Challan of income tax.", icon: "reports" },
];

const reportTeams = [
  {
    team: "Payroll Teams",
    text: "gets monthly and annual reports for salary, bank wise transactions, mode of payment, reconciliation, OT, CTC paymaster, TDS, Arrears, Gratuity and last but not the least Compliance.",
    accent: "#efb000",
    bg: "#fff5d9",
  },
  {
    team: "Other HR Teams",
    text: "get onboarding, employee information, Training related reports",
    accent: "#0077c2",
    bg: "#eef6fd",
  },
  {
    team: "Finance Team",
    text: "gets reports on audit trails, variance on last month, employee wise details on arrears, reimbursement and recovery, TDS, e Returns, Form 16.",
    accent: "#0fb880",
    bg: "#e5fff4",
  },
  {
    team: "Compliance Team",
    text: "will get all the reports on State & Central acts, Factory Acts, Shop and Establishment Act & labour Law etc. All the Register and Return format will be updated as per government guidelines and same gets updated at client end automatically.",
    accent: "#ef4444",
    bg: "#fff0ef",
  },
];


const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "emPayroll — Payroll Management System",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Android, iOS",
      description: PAGE_DESCRIPTION,
      url: PAGE_URL,
      publisher: { "@type": "Organization", name: "Emsphere Technologies", url: "https://www.emsphere.com/" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.emsphere.com/" },
        { "@type": "ListItem", position: 2, name: "Payroll Management System", item: PAGE_URL },
      ],
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.emsphere.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Payroll Management System",
      item: PAGE_URL,
    },
  ],
};

/* --------------------------------------------------------------------
   Page
   -------------------------------------------------------------------- */

export default function PayrollManagementSolutionPage() {
  return (
    <main className={`${instrumentSans.variable} ${inter.variable} hrms-page payroll-page w-full overflow-x-hidden bg-white font-sans text-[#4c4c4c]`}>
      <ScrollReveal root=".payroll-page" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }} />

      {/* Hero */}
      <section
        id="payroll-hero"
        aria-labelledby="payroll-hero-heading"
        className="relative bg-[radial-gradient(circle_at_0%_20%,rgba(0,119,194,0.14),transparent_32%),radial-gradient(circle_at_55%_0%,rgba(248,187,24,0.25),transparent_35%),radial-gradient(circle_at_100%_80%,rgba(248,187,24,0.3),transparent_30%),radial-gradient(circle_at_30%_100%,rgba(15,184,128,0.1),transparent_25%)] px-4 pb-10 pt-8 md:px-12 md:pb-14 md:pt-12"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 lg:flex-row lg:justify-between lg:gap-12">
          <header className={`${revealFromLeft} -mt-3 flex flex-col gap-5 lg:-mt-8 lg:max-w-xl`}>
            <nav aria-label="Breadcrumb" className={`${fontInter} text-[13px] font-medium text-black/55`}>
              <ol
                itemScope
                itemType="https://schema.org/BreadcrumbList"
                className="flex flex-wrap items-center gap-1.5"
              >
                <li
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  <Link
                    href="/"
                    itemProp="item"
                    className="transition-colors hover:text-[#b07d00]"
                  >
                    <span itemProp="name">Home</span>
                  </Link>
                  <meta itemProp="position" content="1" />
                </li>
                <li aria-hidden="true" className="text-black/35">›</li>
                <li
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                  aria-current="page"
                  className="text-black/80"
                >
                  <span itemProp="name">Payroll Management System</span>
                  <link itemProp="item" href={PAGE_URL} />
                  <meta itemProp="position" content="2" />
                </li>
              </ol>
            </nav>
            <h1 id="payroll-hero-heading" className="text-3xl font-semibold leading-tight text-[#1f1f1f] md:text-[2.6rem] md:leading-[1.2]">
              Simplify Your Payroll Process With A <span className="text-[#f8bb18]">Powerful Payroll Management System</span>
            </h1>
            <p className={`text-base leading-[26px] md:text-lg md:leading-[29px] ${mutedText}`}>
              A robust payroll management system that takes care of everything right from employee information, salary calculation, and compliance
              management. Use emPayroll for timely, hassle-free, and accurate payroll.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/contact-us" className={`${primaryButton} text-[15px]`}>
                Book a Demo
                <ArrowCircleIcon />
              </Link>
              <Link href="/contact-us" className={`${outlineButton} text-[15px]`}>
                Download Now
                <ArrowOutlineIcon />
              </Link>
            </div>
          </header>

          <div className={`${revealFromRight} relative w-full max-w-md lg:w-[44%] lg:max-w-none`}>
            <PayrollHeroVector />
          </div>
        </div>

        {/* Clients */}
        <div className="mx-auto mt-12 max-w-7xl">
          <p className={`${revealUp} text-center text-lg font-semibold text-[#1f1f1f] md:text-xl`}>Join these companies who enjoy payroll processing</p>
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-6">
            {clients.map((client, index) => (
              <li
                key={client.name}
                style={stagger(index, 90)}
                className={`${revealUp} group/card flex h-24 items-center justify-center rounded-xl bg-white px-5 shadow-[inset_0_0_0_1px_#ececec,0_6px_20px_-12px_rgba(0,0,0,0.25)] ${motion} hover:-translate-y-1 hover:shadow-[inset_0_0_0_1.5px_#f8bb18,0_14px_28px_-12px_rgba(0,0,0,0.25)]`}
              >
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className={`max-h-16 w-auto object-contain transition-[scale] duration-300 ${ease} group-hover/card:scale-105`}
                  sizes="200px"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* One Software, many Advantages */}
      <section aria-labelledby="advantages-heading" className="px-4 py-12 md:px-12 md:py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:gap-16">
          <div className={`${revealFromLeft} relative mx-auto w-full max-w-[26rem] lg:w-[40%]`}>
            <div className={`${softCard} overflow-hidden bg-[#fdf6e6] p-3`}>
              <Image
                src={salaryCreditedImg}
                alt="Smiling employee looking at his phone after his salary is credited on time"
                className="h-auto w-full rounded-lg"
                sizes="(min-width: 1024px) 26rem, 90vw"
              />
            </div>
            <Image
              src={badgeRating}
              alt="Five star rating badge"
              className="payroll-float absolute left-1 top-8 w-28 rounded-xl shadow-[0_14px_30px_-12px_rgba(0,0,0,0.35)] sm:-left-10 sm:w-36"
              sizes="144px"
            />
            <Image
              src={badgeProgressRing}
              alt="Payroll progress ring badge"
              className="payroll-float absolute -right-3 top-1/3 w-20 rounded-xl shadow-[0_14px_30px_-12px_rgba(0,0,0,0.35)] [animation-delay:-2s] sm:-right-8 sm:w-24"
              sizes="96px"
            />
            <Image
              src={badgeIndustryStandards}
              alt="Thumbs up badge: as per industry standards"
              className="payroll-float absolute -bottom-6 left-6 w-24 rounded-xl shadow-[0_14px_30px_-12px_rgba(0,0,0,0.35)] [animation-delay:-4s] sm:w-28"
              sizes="112px"
            />
          </div>

          <div className="flex w-full flex-col gap-6 lg:w-[60%]">
            <SectionHeader
              id="advantages-heading"
              title="One Software, many Advantages"
              text="A system that is simple, flexible, user friendly and highly configurable."
              align="left"
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {advantages.map((item, index) => (
                <article key={item.title} style={stagger(index + 1)} className={`${revealUp} ${greyCard} ${liftGrey} flex flex-col items-center text-center gap-3 p-6`}>
                  <IconTile name={item.icon} bg={item.bg} color={item.color} />
                  <h3 className="text-xl font-semibold text-[#1f1f1f]">{item.title}</h3>
                  <p className={`text-[15px] leading-[23px] ${mutedText}`}>{item.text}</p>
                  <Link href="/contact-us" className={`group/btn mt-auto inline-flex items-center justify-center gap-2 pt-1 ${fontInter} text-sm font-semibold text-[#f8bb18]`}>
                    Learn More
                    <ArrowCircleIcon className="h-4 w-4" fill="#f8bb18" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why emPayroll? */}
      <section aria-labelledby="why-heading" className="bg-[#fcfcfc] px-4 py-12 md:px-12 md:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <SectionHeader id="why-heading" title={<>Why em<span className="text-[#f8bb18]">Payroll</span>?</>} />
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyEmpayroll.map((item, index) => (
              <li key={item.title} style={stagger(index, 100)} className={`${revealUp} ${goldCard} ${liftGold} relative flex flex-col items-center gap-3 overflow-hidden px-6 pb-7 pt-8 text-center`}>
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1" style={{ background: item.color }} />
                <IconTile name={item.icon} bg={item.bg} color={item.color} className="h-16 w-16 rounded-full" iconClassName="h-8 w-8" />
                <h3 className="text-lg font-semibold text-[#1f1f1f]">{item.title}</h3>
                <p className={`text-[15px] leading-[23px] ${mutedText}`}>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Employee information + role based access */}
      <section aria-label="Employee information and role based access" className="px-4 py-12 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-10">
          <article className={`${revealFromLeft} ${softCard} ${liftPanel} flex flex-col gap-6 bg-[rgba(235,243,255,0.55)] p-5 md:p-7 lg:flex-row lg:items-center`}>
            <div className="mx-auto w-44 shrink-0 overflow-hidden sm:w-52 lg:w-[42%]">
              <Image
                src={employeeInfoImg}
                alt="Hand holding a smartphone showing the emPayroll employee information screen"
                className={`h-auto w-full ${panelImageZoom}`}
                sizes="(min-width: 1024px) 20vw, 13rem"
              />
            </div>
            <div className="flex flex-col gap-4 text-center lg:text-left">
              <header>
                <p className="text-xl font-semibold text-[#f8bb18] md:text-2xl">Employee</p>
                <h2 className="text-2xl font-semibold text-[#1f1f1f] md:text-[1.75rem]">Quick access to Employee Information</h2>
              </header>
              <p className={`text-base leading-[25px] ${mutedText}`}>
                Just a few clicks and voilà you have everything from basic information, to qualification, previous job history, documents submitted,
                personal & family details right in front of you.
              </p>
              <Link href="/contact-us" className={`${primaryButton} self-center text-sm lg:self-start`}>
                Get Started
                <ArrowCircleIcon className="h-4 w-4" />
              </Link>
            </div>
          </article>

          <article className={`${revealFromRight} ${softCard} ${liftPanel} flex flex-col gap-5 bg-[rgba(249,241,230,0.6)] p-5 md:p-7`}>
            <div className="flex flex-col items-center gap-5 sm:flex-row">
              <div className="w-40 shrink-0 overflow-hidden sm:w-44">
                <Image
                  src={roleBasedImg}
                  alt="Two login screens with employee avatars showing role based access"
                  className={`h-auto w-full ${panelImageZoom}`}
                  sizes="11rem"
                />
              </div>
              <header className="text-center sm:text-left">
                <p className="text-xl font-semibold text-[#b07d00] md:text-2xl">Role Based</p>
                <h2 className="text-2xl font-semibold text-[#1f1f1f] md:text-[1.75rem]">Stay in control.</h2>
                <p className={`mt-1 text-base leading-[25px] ${mutedText}`}>You decide who gets access to what!</p>
              </header>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { title: "User Groups and Access", text: "Create different user groups and give group-wise access.", icon: "group", bg: "#f8bb18", surface: "#fff5d9" },
                { title: "Rule Engine", text: "Define rules to access, view, edit, delete or modify any data.", icon: "rules", bg: "#0fb880", surface: "#e5fff4" },
              ].map((item) => (
                <div key={item.title} className={`group/card flex items-center gap-3 rounded-[8px] p-3.5 ${motion} hover:-translate-y-0.5 hover:shadow-[0px_8px_20px_-8px_rgba(0,0,0,0.2)]`} style={{ background: item.surface }}>
                  <IconTile name={item.icon} bg={item.bg} className="h-11 w-11 rounded-[8px]" iconClassName="h-6 w-6" />
                  <div>
                    <h3 className="text-[15px] font-semibold text-[#1f1f1f]">{item.title}</h3>
                    <p className={`text-sm leading-[19px] ${mutedText}`}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* Self service + exit */}
      <section aria-label="Employee self service and exit" className="bg-[#eef4fd] px-4 py-12 sm:px-6 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-6 md:gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Card 1: Employee Self Service */}
          <article className={`${revealFromLeft} group/card flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_16px_36px_-8px_rgba(0,0,0,0.12)] md:rounded-3xl`}>
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
              <Image
                src={empoweredImg}
                alt="Confident smiling male professional managing payroll and benefits on a digital tablet in a modern office"
                fill
                className="object-cover object-center transition-transform duration-500 ease-out group-hover/card:scale-105"
                sizes="(min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-5 p-6 sm:p-7 md:p-8">
              <div className="flex flex-col gap-2.5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#f8bb18] sm:text-sm">Strength of an organisation is empowered</p>
                <h2 className="text-xl font-bold leading-snug text-[#1f1f1f] sm:text-2xl md:text-[1.75rem]">
                  Make them <span className="text-[#f8bb18]">self-sufficient</span> today!
                </h2>
                <p className="text-[14.5px] leading-relaxed text-[#595959] sm:text-base">
                  Provide employees with easy-to-use self-service to view and download payslips, calculate TDS, submit tax proofs, apply for reimbursements, and access Form 16.
                </p>
              </div>
              <div className="mt-auto pt-2">
                <Link
                  href="/contact-us"
                  className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0077c2] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0061af] hover:shadow-md sm:w-auto sm:self-start"
                >
                  <span>KNOW MORE</span>
                  <ArrowOutlineIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          </article>

          {/* Card 2: Frictionless Exit */}
          <article className={`${revealFromRight} group/card flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_16px_36px_-8px_rgba(0,0,0,0.12)] md:rounded-3xl`}>
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
              <Image
                src={exitImg}
                alt="Two male colleagues smiling warmly while walking together through a bright office hallway during a positive transition"
                fill
                className="object-cover object-center transition-transform duration-500 ease-out group-hover/card:scale-105"
                sizes="(min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-5 p-6 sm:p-7 md:p-8">
              <div className="flex flex-col gap-2.5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#ef4444] sm:text-sm">Smooth Separation Process</p>
                <h2 className="text-xl font-bold leading-snug text-[#1f1f1f] sm:text-2xl md:text-[1.75rem]">
                  Parting ways made <span className="text-[#ef4444]">frictionless</span>
                </h2>
                <p className="text-[14.5px] leading-relaxed text-[#595959] sm:text-base">
                  Lets you support your employee even when they have decided to move on, with quick exit reports and easy access to information on full and final settlement.
                </p>
              </div>
              <div className="mt-auto pt-2">
                <Link
                  href="/contact-us"
                  className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0077c2] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0061af] hover:shadow-md sm:w-auto sm:self-start"
                >
                  <span>KNOW MORE</span>
                  <ArrowOutlineIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Salary Management — vertical CSS-only tabs (same mechanism as the HRMS
          page: hidden radios + .hrms-showcase rules in globals.css). */}
      <section aria-labelledby="salary-heading" className="px-4 py-12 md:px-12 md:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <SectionHeader
            id="salary-heading"
            title={
              <>
                Salary Management <span className="text-[#ef4444]">Money Matters!</span>
              </>
            }
            text="An intuitive system to Calculate, Compute, Reconcile Salary accurately and generate Pay Slips instantly."
          />

          <div className={`${revealUp} hrms-showcase grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[330px_1fr] lg:gap-8 xl:grid-cols-[350px_1fr]`}>
            <div
              role="radiogroup"
              aria-label="Salary management features"
              className="-mx-4 flex snap-x gap-2.5 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:flex lg:h-full lg:flex-col lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0"
            >
              {salaryTabs.map((tab, i) => (
                <label
                  key={tab.id}
                  className={`group/tab flex shrink-0 cursor-pointer items-center gap-3.5 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#1f1f1f] shadow-[inset_0_0_0_1px_#e3e3e3] ${motion} hover:bg-[#fffaf0] hover:shadow-[inset_0_0_0_1.5px_#f8bb18,0_6px_16px_-4px_rgba(0,0,0,0.1)] has-[:checked]:bg-[#0077c2] has-[:checked]:text-white has-[:checked]:shadow-[0_12px_24px_-8px_rgba(0,119,194,0.5)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#f8bb18] lg:min-h-0 lg:flex-1 lg:rounded-2xl lg:px-5 lg:py-4 lg:text-base`}
                >
                  <input
                    type="radio"
                    name="payroll-salary-tab"
                    value={tab.id}
                    data-tab-index={i}
                    defaultChecked={i === 0}
                    className="peer sr-only"
                  />
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fff5d9] text-xs font-bold text-[#b07d00] transition-colors group-has-[:checked]/tab:bg-white/20 group-has-[:checked]/tab:text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="whitespace-nowrap text-[15px] font-semibold leading-snug xl:text-base">
                    {tab.label}
                  </span>
                </label>
              ))}
            </div>

            <div className="h-full">
              {salaryTabs.map((tab, i) => (
                <div key={tab.id} data-tab-item={i} className="hrms-tab-swap h-full">
                  <div
                    className={`flex h-full min-h-[420px] flex-col gap-6 rounded-2xl bg-[#fdf6e6] p-5 shadow-[inset_0_0_0_0.744px_#dddddd,0px_0px_14.874px_-6.693px_rgba(0,0,0,0.25)] md:p-8 lg:flex-row lg:items-center lg:gap-8 xl:min-h-[450px] xl:gap-10`}
                  >
                    <div className="shrink-0 overflow-hidden rounded-2xl bg-white p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] sm:p-4 lg:w-[52%]">
                      <Image
                        src={tab.image}
                        alt={tab.imageAlt}
                        className="h-auto w-full rounded-xl object-contain"
                        sizes="(min-width: 1024px) 40vw, 100vw"
                      />
                    </div>
                    <div className="flex flex-col justify-center gap-4 lg:w-[48%]">
                      <h3 className="text-2xl font-bold leading-tight text-[#1f1f1f] sm:text-[1.75rem]">
                        {tab.label}
                      </h3>
                      <p className={`text-[15px] leading-relaxed ${mutedText} sm:text-base`}>
                        {tab.text}
                      </p>
                      <Link href="/contact-us" className={`${primaryButton} self-start text-sm`}>
                        Know More
                        <ArrowCircleIcon className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Salary Processing */}
      <section aria-labelledby="processing-heading" className="bg-[#fcfcfc] px-4 py-12 md:px-12 md:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <SectionHeader
            id="processing-heading"
            title={
              <>
                Salary Processing <span className="text-[#f8bb18]">On time, every time!</span>
              </>
            }
            text="When it comes to salaries, people like to it credited early or on time. With emPayroll, a click is all that client need to process employee salaries. Our payroll management system helps you compute salaries for all Employees taking Statutory Deduction, Loan Deduction, Arrears, Revision all into consideration."
          />
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {salaryProcessing.map((item, index) => (
              <li key={item.title} style={stagger(index, 100)} className={`${revealUp} ${greyCard} ${liftGrey} flex flex-col items-center text-center gap-3 p-6`}>
                <IconTile name={item.icon} bg={item.bg} color={item.color} />
                <h3 className="text-lg font-semibold text-[#1f1f1f]">{item.title}</h3>
                <p className={`text-[15px] leading-[23px] ${mutedText}`}>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Statutory Compliance + TDS */}
      <section aria-labelledby="compliance-heading" className="relative overflow-hidden bg-[#fdf6e6] px-4 py-14 text-[#1f1f1f] md:px-12 md:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#f8bb18]/25 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#f8bb18]/20 blur-3xl" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-14">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.6fr] lg:items-start">
            <header className={`${revealFromLeft} flex flex-col gap-3`}>
              <p className={`${fontInter} text-xs font-bold uppercase tracking-[0.16em] text-[#b07d00]`}>PF · ESI · Professional Tax</p>
              <h2 id="compliance-heading" className="text-2xl font-bold text-[#1f1f1f] md:text-[2.1rem] md:leading-[44px]">
                Statutory Compliance
              </h2>
              <p className="text-base leading-[26px] text-[#595959] md:text-lg">
                We make staying in compliance simple, hassle free with our powerful tools and ready templates.
              </p>
            </header>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {statutory.map((item, index) => (
                <li
                  key={item.title}
                  style={stagger(index, 100)}
                  className={`${revealUp} group/card flex flex-col items-center text-center gap-3 rounded-2xl bg-white p-5 shadow-[inset_0_0_0_1px_#e5e7eb,0_2px_12px_rgba(0,0,0,0.04)] ${motion} hover:-translate-y-1 hover:shadow-[inset_0_0_0_1.5px_#f8bb18,0_12px_24px_-8px_rgba(0,0,0,0.1)]`}
                >
                  <span className={`flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#f8bb18] text-white shadow-sm ${iconPop}`}>
                    <LineIcon name={item.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="text-lg font-semibold text-[#1f1f1f]">{item.title}</h3>
                  <p className="text-sm leading-[21px] text-[#595959]">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_0.9fr] lg:items-center">
            <ul className="order-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:order-1">
              {tds.map((item, index) => (
                <li
                  key={item.title}
                  style={stagger(index, 100)}
                  className={`${revealUp} group/card flex gap-4 rounded-2xl bg-white p-5 shadow-[inset_0_0_0_1px_#e5e7eb,0_2px_12px_rgba(0,0,0,0.04)] ${motion} hover:-translate-y-1 hover:shadow-[inset_0_0_0_1.5px_#f8bb18,0_12px_24px_-8px_rgba(0,0,0,0.1)]`}
                >
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-[#f8bb18] text-white shadow-sm ${iconPop}`}>
                    <LineIcon name={item.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1f1f1f]">{item.title}</h3>
                    <p className="mt-1 text-sm leading-[21px] text-[#595959]">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <header className={`${revealFromRight} order-1 flex flex-col gap-3 lg:order-2 lg:pl-6`}>
              <p className={`${fontInter} text-xs font-bold uppercase tracking-[0.16em] text-[#b07d00]`}>TDS · Form 16</p>
              <h2 className="text-2xl font-bold text-[#1f1f1f] md:text-[2.1rem] md:leading-[44px]">Tax Deducted at Source</h2>
            </header>
          </div>
        </div>
      </section>

      {/* Reports */}
      <section aria-labelledby="reports-heading" className="bg-white px-4 py-12 md:px-12 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
            <SectionHeader
              id="reports-heading"
              title="When it comes to reports we got all your teams covered!"
              text="In this data driven world it is important to have multiple type of reports with in a department to slice and dice information. Be analytics driven with emPayroll."
              align="left"
              className="items-center text-center lg:items-start lg:text-left"
            />
            <Link href="/contact-us" className={`${revealUp} ${primaryButton} shrink-0 text-[15px] lg:mb-12`}>
              Request a demo
              <ArrowCircleIcon />
            </Link>
          </div>
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reportTeams.map((item, index) => (
              <li key={item.team} style={stagger(index, 100)} className={`${revealUp} ${greyCard} ${liftGrey} relative flex flex-col gap-3 overflow-hidden p-6`}>
                <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5" style={{ background: item.accent }} />
                <span className="flex h-11 w-11 items-center justify-center rounded-full text-base font-bold" style={{ background: item.bg, color: item.accent }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-semibold text-[#1f1f1f]">{item.team}</h3>
                <p className={`text-[15px] leading-[23px] ${mutedText}`}>
                  {item.text.charAt(0).toUpperCase() + item.text.slice(1)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Our Flagship Products */}
      <FlagshipProducts />

      {/* Contact CTA — same as the home / HRMS pages */}
      <section aria-label="Contact emSphere" className="bg-white px-6 py-12 min-[769px]:py-[88px]">
        <div className="mx-auto flex max-w-275 flex-col items-center justify-center gap-9 text-black min-[1081px]:flex-row min-[1081px]:gap-20">
          {[
            { title: "Ready to talk?", cta: "Talk to Sale", reveal: revealFromLeft },
            { title: "Want to know more?", cta: "Book Demo", reveal: revealFromRight },
          ].map((col, index) => (
            <Fragment key={col.title}>
              {index > 0 && <span aria-hidden="true" className="hidden h-30 w-0.5 shrink-0 bg-[rgba(139,138,138,0.4)] min-[1081px]:block" />}
              <div className={`${col.reveal} flex w-full flex-1 flex-col items-center gap-6 text-center`}>
                <h2 className={`${fontInstrument} text-2xl leading-[1.5] font-semibold tracking-[-0.01em] min-[769px]:text-[38px] min-[769px]:whitespace-nowrap`}>
                  {col.title}
                </h2>
                <Link
                  href="/contact-us"
                  className={`group/btn inline-flex w-full max-w-65 items-center justify-center rounded-lg bg-[#0077c2] px-6 py-[13px] ${fontInter} text-[15px] font-semibold tracking-[0.02em] text-white ${motion} hover:-translate-y-0.5 hover:bg-[#0061af] hover:shadow-[0_8px_18px_-4px_rgba(0,119,194,0.45)] active:translate-y-0 min-[769px]:w-auto min-[769px]:max-w-none min-[769px]:min-w-[145px] min-[769px]:px-[30px]`}
                >
                  {col.cta}
                </Link>
              </div>
            </Fragment>
          ))}
        </div>
      </section>
      <BackToTop trigger="#payroll-hero" />
    </main>
  );
}
