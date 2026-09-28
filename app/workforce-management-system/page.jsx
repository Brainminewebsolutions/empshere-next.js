import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instrument_Sans, Inter } from "next/font/google";
import ScrollReveal from "@/components/ScrollReveal";
import BackToTop from "@/components/BackToTop";
import FlagshipProducts from "@/components/FlagshipProducts";
import DemoRequestForm from "@/components/DemoRequestForm";
import CardCarousel from "@/components/CardCarousel";
import StopwatchCounter from "@/components/StopwatchCounter";
import WorkforceHeroVector from "@/components/WorkforceHeroVector";

/* --------------------------------------------------------------------
   Images — every image this page uses lives in
   app/images/workforce-management-system and is imported by name.
   -------------------------------------------------------------------- */

import heroImg from "../images/workforce-management-system/hero-workforce-global-enterprise-interface.webp";
import whyImg from "../images/workforce-management-system/why-emworkforce-centralized-management-dashboard.webp";
import consultingImg from "../images/workforce-management-system/consulting-session-sme-workforce-analytics.webp";

// Title and description are the page's Rank Math values on the current site.
const PAGE_URL = "https://www.emsphere.com/workforce-management-system/";
const PAGE_TITLE = "Workforce Management System India | Workforce Management";
const PAGE_DESCRIPTION =
  "Optimize your workforce with emsphere's Workforce Management System. Enhance efficiency, streamline processes, boost productivity effortlessly.";
const OG_IMAGE = heroImg.src;

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
   Shared surfaces + motion (same language as the HRMS / payroll / CLMS pages)
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
const stagger = (index, step = 120) => ({ transitionDelay: `${index * step}ms` });

const liftGold = `group/card ${motion} hover:-translate-y-1 hover:shadow-[inset_0_0_0_1.5px_#f8bb18,0px_10px_24px_-6px_rgba(0,0,0,0.18)]`;
const liftGrey = `group/card ${motion} hover:-translate-y-1.5 hover:shadow-[inset_0_0_0_0.814px_#dddddd,0px_14px_28px_-6px_rgba(0,0,0,0.18)]`;
const iconPop = `transition-[scale] duration-300 ${ease} group-hover/card:scale-110`;
const arrowNudge = `transition-[translate] duration-200 ${ease} group-hover/btn:translate-x-[3px]`;

const primaryButton = `group/btn inline-flex items-center justify-center gap-2 rounded-[9px] bg-[#0077c2] px-6 py-3 ${fontInter} font-semibold text-white ${motion} hover:-translate-y-0.5 hover:bg-[#0061af] hover:shadow-[0_8px_18px_-4px_rgba(0,119,194,0.45)]`;
const outlineButton = `group/btn inline-flex items-center justify-center gap-2 rounded-[9px] bg-white px-6 py-3 ${fontInter} font-semibold text-[#0077c2] shadow-[inset_0_0_0_1.5px_#0077c2] ${motion} hover:-translate-y-0.5 hover:bg-[#eef6fd]`;

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

function CheckIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 10.5l3.5 3.5 7.5-8" />
    </svg>
  );
}

function FaqToggleIcon() {
  return (
    <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-[inset_0_0_0_0.394px_#f8bb18,0_0_0_0.394px_#f8bb18,0px_0px_15.775px_-7.099px_rgba(0,0,0,0.25)] transition-colors duration-300 group-open:bg-[#fff5d9]">
      <svg viewBox="0 0 22 22" aria-hidden="true" className={`h-5 w-5 transition-[rotate] duration-400 ${ease} group-open:rotate-180`} stroke="#000000" strokeWidth={2} strokeLinecap="round">
        <path d="M4 11H18" />
        <path d="M11 4V18" className={`origin-center transition-[scale] duration-400 [transform-box:fill-box] ${ease} group-open:scale-y-0`} />
      </svg>
    </span>
  );
}

// Solid icons drawn for this page matching the HRMS vibrant solid-tile + white icon style.
const ICON_PATHS = {
  employee: (
    <path fillRule="evenodd" d="M12 1.5a4.5 4.5 0 0 0-4.5 4.5v.75a4.5 4.5 0 0 0 9 0V6a4.5 4.5 0 0 0-4.5-4.5Zm-7.5 16.5A4.5 4.5 0 0 1 9 13.5h6a4.5 4.5 0 0 1 4.5 4.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 4.5 19.5V18Z" clipRule="evenodd" />
  ),
  clock: (
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
  ),
  payroll: (
    <path fillRule="evenodd" d="M12 1.5c-5.799 0-10.5 4.701-10.5 10.5s4.701 10.5 10.5 10.5 10.5-4.701 10.5-10.5S17.799 1.5 12 1.5Zm1.125 5.25a.75.75 0 0 0 0 1.5h2.25a.75.75 0 0 1 0 1.5h-3.375a.75.75 0 0 0 0 1.5h1.875a2.25 2.25 0 0 1 0 4.5h-.75v1.5a.75.75 0 0 1-1.5 0V16.5H9.375a.75.75 0 0 1 0-1.5h2.25a.75.75 0 0 0 0-1.5H9.75a2.25 2.25 0 0 1 0-4.5h2.625V7.5a.75.75 0 0 1 1.5 0v.75h1.5a.75.75 0 0 0 0-1.5h-2.25Z" clipRule="evenodd" />
  ),
  mobile: (
    <>
      <path d="M7 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H7zm0 2h10v13H7V4zm5 14.25a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
      <path d="M12 7a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3 7a3 3 0 0 1 6 0H9z" />
    </>
  ),
  calendar: (
    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75A3.75 3.75 0 0 1 22.5 8.25v10.5A3.75 3.75 0 0 1 18.75 22.5H5.25A3.75 3.75 0 0 1 1.5 18.75V8.25A3.75 3.75 0 0 1 5.25 4.5H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
  ),
  lock: (
    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
  ),
  workflow: (
    <path fillRule="evenodd" d="M6 2a3 3 0 0 0-3 3v.5a3 3 0 0 0 2 2.82v7.36A3 3 0 0 0 3 18.5v.5a3 3 0 1 0 6 0v-.5a3 3 0 0 0-2-2.82V9.82A3.001 3.001 0 0 0 8.82 8H13a3 3 0 0 1 3 3v2.18a3 3 0 1 0 2 0V11a5 5 0 0 0-5-5H8.82A3 3 0 0 0 6 2Z" clipRule="evenodd" />
  ),
  reports: (
    <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875ZM12.75 12a.75.75 0 0 0 0-1.5h-4.5a.75.75 0 0 0 0 1.5h4.5Zm0 3a.75.75 0 0 0 0-1.5h-4.5a.75.75 0 0 0 0 1.5h4.5Zm-2.25 3a.75.75 0 0 0 0-1.5h-2.25a.75.75 0 0 0 0 1.5h2.25Zm4.5-12.75v1.875a.375.375 0 0 0 .375.375h1.875a2.25 2.25 0 0 0-2.25-2.25Z" clipRule="evenodd" />
  ),
};

function LineIcon({ name, className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      {ICON_PATHS[name]}
    </svg>
  );
}

function IconTile({ name, bg, color = "#ffffff", className = "h-12 w-12 rounded-[10px]", iconClassName = "h-6 w-6" }) {
  return (
    <span className={`flex shrink-0 items-center justify-center text-white shadow-sm ${iconPop} ${className}`} style={{ background: bg }}>
      <LineIcon name={name} className={iconClassName} />
    </span>
  );
}

function SectionHeader({ id, title, text, align = "center", className = "", dark = false }) {
  const alignment = align === "center" ? "mx-auto text-center items-center" : "items-start";
  return (
    <header className={`${revealUp} flex max-w-3xl flex-col gap-3 ${alignment} ${className}`}>
      <h2 id={id} className={`text-2xl font-semibold md:text-[2.1rem] md:leading-[44px] ${dark ? "text-white" : "text-[#1f1f1f]"}`}>
        {title}
      </h2>
      {text && <p className={`text-base leading-[25px] md:text-lg md:leading-[28px] ${dark ? "text-white/75" : mutedText}`}>{text}</p>}
    </header>
  );
}

const TONES = [
  { bg: "#0077c2", color: "#ffffff" },
  { bg: "#0fb880", color: "#ffffff" },
  { bg: "#f8bb18", color: "#ffffff" },
  { bg: "#ef4444", color: "#ffffff" },
  { bg: "#5b5bd6", color: "#ffffff" },
];
const tone = (index) => TONES[index % TONES.length];

/* --------------------------------------------------------------------
   Content — all copy from https://www.emsphere.com/workforce-management-system/
   -------------------------------------------------------------------- */

const stats = [
  {
    value: 120,
    suffix: "+",
    label: "Happy Customers",
    desc: "Enterprise clients worldwide",
    bg: "#0077c2",
    color: "#ffffff",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.003.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.232.75.75 0 0 0 .364-.63v-.12a5.625 5.625 0 0 0-5.188-5.615Z" />
      </svg>
    ),
  },
  {
    value: 100,
    suffix: "+",
    label: "Compliance Reports",
    desc: "State & central statutory acts",
    bg: "#f8bb18",
    color: "#ffffff",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    value: 250,
    suffix: "+",
    label: "Successful projects",
    desc: "Multi-site implementations",
    bg: "#0fb880",
    color: "#ffffff",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    value: 99,
    suffix: "%",
    label: "Customer Satisfaction",
    desc: "Verified SLA delivery rating",
    bg: "#ef4444",
    color: "#ffffff",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
      </svg>
    ),
  },
];

const modules = [
  { title: "Employee Management System", text: "Single module to maintain all employee information, documents and track training & work history.", icon: "employee" },
  {
    title: "Time & Attendance",
    text: "Auto attendance management integrated with 3rd party devices. Enabled with Geo Fencing, GPS Location tracking Mobile App. End to End Shift, OT and Weekly Off management.",
    icon: "clock",
  },
  {
    title: "Payroll Management",
    text: "End to end payroll module from Salary computation, reconciliation to processing after arrears, claims and loans calculation, to payslip generation. Fool proof PF, ESIc, PT, TDS compliance management.",
    icon: "payroll",
  },
  {
    title: "ESS Portal and Mobile",
    text: "Self-service module for employees to check everything that matters Attendance, Leave, Tax Declaration, Reimbursement, Loans, Leave applications, Comp Off and approvals accessible both on Android and iOS.",
    icon: "mobile",
  },
  {
    title: "Leave Management System",
    text: "Custom workflows to manage all type of leaves, PL, SL, Maternity and Paternity leaves with alert based approval system, trackable via handheld devices.",
    icon: "calendar",
  },
  {
    title: "User Access and Rights",
    text: "Define users, groups, provide access and get audit trails. Set conditional, parallel workflows up to 4 levels to keep tab of various applications and approval processes.",
    icon: "lock",
  },
  {
    title: "Workflow Engine and Alerts",
    text: "Define different email and SMS alert for different workflows. Configure workflows for users and user groups with ease.",
    icon: "workflow",
  },
  {
    title: "MIS Reports and Compliance",
    text: "Required MIS data and reports on your fingertips. 100+ Compliance reports covered. Configure various compliance points. Readily available state and central compliance reports.",
    icon: "reports",
  },
];

const faqs = [
  {
    question: "What is a Workforce Management System and how does it benefit my organization?",
    answer:
      "A Workforce Management System (WMS) is a software solution designed to optimize and streamline various workforce-related processes such as scheduling, time and attendance tracking, labor budgeting, and performance monitoring. By automating these processes, a WMS helps organizations improve productivity, reduce labor costs, ensure compliance with labor laws, and enhance employee satisfaction by providing accurate and fair scheduling.",
  },
  {
    question: "How does the scheduling feature in a Workforce Management System work?",
    answer:
      "The scheduling feature in a WMS allows managers to create, adjust, and manage employee schedules efficiently. It uses algorithms to predict staffing needs based on historical data, current trends, and business demands. This feature ensures optimal shift coverage, minimizes overtime, and accommodates employee availability and preferences, leading to a balanced and fair schedule for all employees.",
  },
  {
    question: "Can a Workforce Management System integrate with our existing HR and payroll systems?",
    answer:
      "Yes, most Workforce Management Systems are designed to integrate seamlessly with existing HR, payroll, and other enterprise systems. This integration allows for the automatic transfer of data, such as employee hours and attendance records, reducing manual data entry, minimizing errors, and ensuring accurate and timely payroll processing. It also provides a unified view of workforce data across different platforms.",
  },
  {
    question: "What is a Leave Management System (LMS), and why is it essential for businesses?",
    answer:
      "A Leave Management System is a software tool that helps organizations manage employee leave requests, track accrued time off, and ensure compliance with leave policies. It's essential for maintaining a structured and fair leave process.",
  },
  {
    question:
      "Does Emsphere provide the best solutions for Biometric Attendance, Employee Management System, Attendance Management System, and Leave Management System?",
    answer:
      "Yes, Emsphere offers comprehensive and cutting-edge solutions for Biometric Attendance, Employee Management, Attendance Management, and Leave Management. Their systems are designed to streamline workforce management processes, enhance accuracy, and improve overall efficiency.",
  },
];


const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "emWorkForce — Workforce Management System",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Android, iOS",
      description: PAGE_DESCRIPTION,
      url: PAGE_URL,
      publisher: { "@type": "Organization", name: "Emsphere Technologies", url: "https://www.emsphere.com/" },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.emsphere.com/" },
        { "@type": "ListItem", position: 2, name: "Workforce Management System", item: PAGE_URL },
      ],
    },
  ],
};

/* --------------------------------------------------------------------
   Page
   -------------------------------------------------------------------- */

export default function WorkforceManagementSystemPage() {
  return (
    <main className={`${instrumentSans.variable} ${inter.variable} hrms-page payroll-page wfm-page w-full overflow-x-clip bg-white font-sans text-[#4c4c4c]`}>
      <ScrollReveal root=".wfm-page" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      {/* Hero */}
      <section
        aria-labelledby="wfm-hero-heading"
        className="relative flex flex-col justify-center bg-[radial-gradient(circle_at_0%_20%,rgba(0,119,194,0.14),transparent_32%),radial-gradient(circle_at_55%_0%,rgba(248,187,24,0.25),transparent_35%),radial-gradient(circle_at_100%_80%,rgba(248,187,24,0.3),transparent_30%),radial-gradient(circle_at_30%_100%,rgba(15,184,128,0.1),transparent_25%)] px-4 py-8 md:px-12 lg:min-h-[calc(100vh-88px)] lg:py-6"
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
          <header className={`${revealFromLeft} flex flex-col gap-5 lg:max-w-xl`}>
            <nav aria-label="Breadcrumb" className={`${fontInter} text-[13px] font-medium text-black/55`}>
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link href="/" className="transition-colors hover:text-[#f8bb18]">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">›</li>
                <li aria-current="page" className="text-black/80">
                  Workforce Management System
                </li>
              </ol>
            </nav>
            <h1 id="wfm-hero-heading" className="text-3xl font-semibold leading-tight text-[#1f1f1f] md:text-[2.6rem] md:leading-[1.2]">
              An Intuitive modern <span className="text-[#f8bb18]">Workforce Management System</span> for today’s global enterprise
            </h1>
            <p className={`text-base leading-[26px] md:text-lg md:leading-[29px] ${mutedText}`}>
              Available in On-Premises and Cloud trims with multi-tier security to support workforce spread in multi locations.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="#request-demo" className={`${primaryButton} text-[15px]`}>
                Book a Demo
                <ArrowCircleIcon />
              </a>
              <a href="#wfm-modules" className={`${outlineButton} text-[15px]`}>
                Explore Modules
              </a>
            </div>
          </header>

          <div className={`${revealFromRight} relative w-full max-w-xl lg:w-[48%] lg:max-w-none`}>
            <WorkforceHeroVector />
          </div>
        </div>
      </section>

      {/* Why emWorkForce? */}
      <section aria-labelledby="why-heading" className="relative px-4 py-14 md:px-12 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
          {/* Visual Showcase Card — matching HRMS photo cards */}
          <div className={`${revealFromLeft} relative w-full lg:w-[46%] xl:w-[45%]`}>
            <div aria-hidden="true" className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#f8bb18]/25 via-[#fee6b1]/20 to-transparent blur-2xl -z-10" />
            <div className={`${softCard} overflow-hidden rounded-2xl bg-white p-3 md:p-3.5 shadow-[inset_0_0_0_0.744px_#dddddd,0px_16px_36px_-12px_rgba(0,0,0,0.18)] ${motion} hover:-translate-y-1 hover:shadow-[inset_0_0_0_0.744px_#dddddd,0px_22px_48px_-12px_rgba(0,0,0,0.22)]`}>
              <div className="overflow-hidden rounded-xl bg-[#f8fafd]">
                <Image
                  src={whyImg}
                  alt="Centralized global workforce management dashboard showing attendance analytics, resource scheduling, and multi-location enterprise connectivity"
                  className="h-auto w-full object-cover transition-transform duration-500 ease-out hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 46vw, 100vw"
                />
              </div>
            </div>
          </div>

          {/* Content & Metrics — matching HRMS typography and card grid */}
          <div className={`${revealFromRight} flex w-full flex-col gap-6 lg:w-[54%] xl:w-[55%]`}>
            <header className="flex flex-col gap-2.5">
              <h2 id="why-heading" className="text-3xl font-semibold leading-tight text-[#1f1f1f] md:text-[2.35rem] md:leading-[1.25]">
                Why em<span className="text-[#f8bb18]">WorkForce</span>?
              </h2>
              <p className={`text-base leading-[26px] md:text-[17px] md:leading-[27px] ${mutedText}`}>
                Our customers use emWorkforce to bring information of their resources from multiple locations in a centralized system, to automate day to day HR Process and manage compliance with ease.
              </p>
            </header>

            <ul className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:gap-4">
              {stats.map((stat, index) => (
                <li
                  key={stat.label}
                  style={stagger(index, 80)}
                  className={`${revealUp} ${goldCard} ${liftGold} group/stat relative flex items-start gap-3.5 rounded-xl bg-white p-4 sm:p-4.5 transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[inset_0_0_0_1.5px_#f8bb18,0px_12px_28px_-6px_rgba(0,0,0,0.18)]`}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[9px] ${iconPop}`}
                    style={{ background: stat.bg, color: stat.color }}
                  >
                    {stat.icon}
                  </span>
                  <div className="flex flex-col">
                    <StopwatchCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      className="text-2xl sm:text-[1.75rem] font-bold leading-tight text-[#1f1f1f]"
                    />
                    <h3 className="mt-0.5 text-sm font-semibold text-[#1f1f1f]">{stat.label}</h3>
                    <p className={`text-xs leading-4 mt-0.5 ${mutedText}`}>{stat.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Modules — infinite slider */}
      <section id="wfm-modules" aria-labelledby="modules-heading" className="scroll-mt-24 bg-[#fcfcfc] px-4 py-12 md:px-12 md:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <SectionHeader
            id="modules-heading"
            title={
              <>
                Extensive Modules for <span className="text-[#f8bb18]">Global Workforce Management System</span>
              </>
            }
          />
          <div className={revealUp}>
            <CardCarousel label="emWorkForce modules" interval={1700} dotLabels={modules.map((m, i) => `Show module ${i + 1}: ${m.title}`)}>
              {modules.map((item, index) => (
                <article key={item.title} className={`${goldCard} ${liftGold} relative flex w-full flex-col gap-3 p-6`}>
                  <span className={`${fontInter} absolute right-5 top-5 text-sm font-bold text-black/15`}>{String(index + 1).padStart(2, "0")}</span>
                  <IconTile name={item.icon} bg={tone(index).bg} color={tone(index).color} />
                  <h3 className="pr-6 text-lg font-semibold leading-snug text-[#1f1f1f]">{item.title}</h3>
                  <p className={`text-[15px] leading-[23px] ${mutedText}`}>{item.text}</p>
                </article>
              ))}
            </CardCarousel>
          </div>
        </div>
      </section>

      {/* Consulting session + demo form */}
      <section
        aria-labelledby="consulting-heading"
        className="relative overflow-hidden bg-[#fdf6e6] bg-[radial-gradient(circle_at_10%_15%,rgba(248,187,24,0.3),transparent_28%),radial-gradient(circle_at_95%_75%,rgba(248,187,24,0.3),transparent_28%)] px-4 py-10 md:px-12 md:py-14 lg:py-16"
      >
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#f8bb18]/20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#f8bb18]/20 blur-3xl" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 lg:flex-row lg:items-center lg:gap-10 xl:gap-14">
          <div className={`${revealFromLeft} flex w-full flex-col gap-4 lg:w-[52%] lg:max-w-xl`}>
            <header className="flex flex-col gap-2">
              <h2
                id="consulting-heading"
                className="text-2xl font-semibold leading-tight text-[#1f1f1f] sm:text-3xl lg:text-[2.1rem] lg:leading-[1.22]"
              >
                Schedule a <span className="text-[#f8bb18]">No Obligation</span> consulting session with our SME
              </h2>
              <p className={`text-[15px] leading-relaxed md:text-base ${mutedText}`}>
                A quick assessment of your current environment with expert solutioning!
              </p>
            </header>

            {/* Visual showcase card with controlled aspect ratio matching HRMS styling */}
            <div className="group/card relative overflow-hidden rounded-2xl bg-white p-2.5 shadow-[inset_0_0_0_0.744px_#dddddd,0px_14px_30px_-12px_rgba(0,0,0,0.14)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[inset_0_0_0_1.5px_#f8bb18,0px_20px_40px_-12px_rgba(0,0,0,0.2)]">
              <div className="relative aspect-[16/9] max-h-[280px] w-full overflow-hidden rounded-xl bg-[#f8fafd]">
                <Image
                  src={consultingImg}
                  alt="SME enterprise consultant reviewing workforce analytics charts on a tablet with business executive"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
                  sizes="(min-width: 1024px) 32rem, 100vw"
                  priority={false}
                />
              </div>
            </div>

            {/* Consulting value badges matching HRMS style */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              <div className="flex items-center gap-2.5 rounded-xl bg-white/90 px-3 py-2 shadow-[inset_0_0_0_0.75px_#dddddd,0_2px_8px_-2px_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[inset_0_0_0_1px_#f8bb18,0_6px_14px_-4px_rgba(0,0,0,0.1)]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#fee6b1] text-[#b07d00]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <polyline points="16 11 18 13 22 9" />
                  </svg>
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black/50">Step 1</span>
                  <span className="text-xs font-semibold text-[#1f1f1f]">1-on-1 SME Advice</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 rounded-xl bg-white/90 px-3 py-2 shadow-[inset_0_0_0_0.75px_#dddddd,0_2px_8px_-2px_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[inset_0_0_0_1px_#f8bb18,0_6px_14px_-4px_rgba(0,0,0,0.1)]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#d8e7fe] text-[#1d64d8]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black/50">Step 2</span>
                  <span className="text-xs font-semibold text-[#1f1f1f]">System Assessment</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 rounded-xl bg-white/90 px-3 py-2 shadow-[inset_0_0_0_0.75px_#dddddd,0_2px_8px_-2px_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[inset_0_0_0_1px_#f8bb18,0_6px_14px_-4px_rgba(0,0,0,0.1)]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#d1f4e3] text-[#0b8f63]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black/50">Step 3</span>
                  <span className="text-xs font-semibold text-[#1f1f1f]">Tailored Roadmap</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`${revealFromRight} relative w-full max-w-md lg:w-[44%] lg:max-w-[450px]`}>
            <div aria-hidden="true" className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#f8bb18]/30 via-[#fee6b1]/20 to-transparent blur-2xl -z-10" />
            <DemoRequestForm
              product="Workforce Management System (emWorkForce)"
              title="Request for demo"
              subtitle="Tell us a little about your team — our SME will reach out to schedule your session."
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        aria-labelledby="faq-heading"
        className="bg-white px-4 py-12 md:px-12 md:py-20"
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-8">
          <header className={`${revealUp} flex flex-col gap-2 text-center`}>
            <h2 id="faq-heading" className="text-3xl font-semibold text-[#1f1f1f] md:text-[2.375rem] md:leading-[49px]">
              Frequently Asked Questions
            </h2>
          </header>
          <ul className="flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <li key={faq.question} style={stagger(index, 80)} className={`${revealUp} ${goldCard} ${liftGold} overflow-hidden`}>
                <details name="wfm-faq" open={index === 0} className="hrms-faq group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-4 outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#0077c2] sm:px-5 md:px-7 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base font-semibold sm:text-lg md:text-xl">{faq.question}</h3>
                    <FaqToggleIcon />
                  </summary>
                  <p className="hrms-faq-answer px-4 pb-5 text-[15px] leading-[23px] sm:px-5 sm:text-base md:px-7 md:text-lg md:leading-[27px]">{faq.answer}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Our Flagship Products */}
      <FlagshipProducts />

      {/* Contact CTA — same as the other product pages */}
      <section aria-label="Contact emSphere" className="bg-white px-6 py-12 min-[769px]:py-[88px]">
        <div className="mx-auto flex max-w-275 flex-col items-center justify-center gap-9 text-black min-[1081px]:flex-row min-[1081px]:gap-20">
          {[
            { title: "Ready to talk?", cta: "Talk to Sales", reveal: revealFromLeft },
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
      <BackToTop />
    </main>
  );
}
