import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instrument_Sans, Inter } from "next/font/google";
import ScrollReveal from "@/components/ScrollReveal";
import BackToTop from "@/components/BackToTop";
import FlagshipProducts from "@/components/FlagshipProducts";
import DemoRequestForm from "@/components/DemoRequestForm";
import PinnedScrollSection from "@/components/PinnedScrollSection";

/* --------------------------------------------------------------------
   Images — every image this page uses lives in
   app/images/canteen-management-system and is imported by name.
   -------------------------------------------------------------------- */

import heroImg from "../images/canteen-management-system/hero-emmeal-meal-planner-mobile-app.webp";
import iconFixedMenu from "../images/canteen-management-system/icon-fixed-menu-cloche.webp";
import iconAlaCarte from "../images/canteen-management-system/icon-ala-carte-order.webp";
import appScreenImg from "../images/canteen-management-system/emmeal-find-meals-app-screen.webp";

// Title and description are the page's Rank Math values on the current site.
const PAGE_URL = "https://www.emsphere.com/canteen-management-system/";
const PAGE_TITLE = "Canteen Management System | CMS Software and Solutions";
const PAGE_DESCRIPTION =
  "Looking for a reliable Canteen Management System? Emsphere's provides efficient CMS software to digitize food operations across workplaces & educational setups.";
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
   Shared surfaces + motion (same language as the other product pages)
   -------------------------------------------------------------------- */

const goldCard =
  "bg-white rounded-xl shadow-[inset_0_0_0_0.789px_#f8bb18,0px_0px_15.775px_-7.099px_rgba(0,0,0,0.25)]";
const greyCard =
  "bg-white rounded-2xl shadow-[inset_0_0_0_0.814px_#dddddd,0px_0px_16.279px_-7.326px_rgba(0,0,0,0.25)]";
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

// Line icons drawn for this page (the live site uses an icon font here).
const ICON_PATHS = {
  portal: (
    <>
      <rect x="4" y="5" width="24" height="18" rx="2.5" fill="currentColor" fillOpacity={0.18} />
      <circle cx="16" cy="12" r="3" />
      <path d="M11 20c.8-2.2 2.7-3.5 5-3.5s4.2 1.3 5 3.5M11 28h10" />
    </>
  ),
  clock: (
    <>
      <circle cx="16" cy="16" r="11.5" fill="currentColor" fillOpacity={0.18} />
      <path d="M16 9v7.5l5 3" />
    </>
  ),
  billing: (
    <>
      <path d="M8 4h16v24l-4-2.5-4 2.5-4-2.5L8 28Z" fill="currentColor" fillOpacity={0.18} />
      <path d="M12.5 10h7M12.5 13.5h7M16.5 10c2.5 0 2.5 6.5 0 6.5h-3l5 4.5" />
    </>
  ),
  reports: (
    <>
      <path d="M19 4H8a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V11Z" fill="currentColor" fillOpacity={0.18} />
      <path d="M19 4v7h7M11 22v-4M15 22v-7M19 22v-5" />
    </>
  ),
  mail: (
    <>
      <rect x="4" y="7" width="24" height="18" rx="2.5" fill="currentColor" fillOpacity={0.18} />
      <path d="m5 9 11 8.5L27 9" />
    </>
  ),
  menu: (
    <>
      <path d="M5 21a11 11 0 0 1 22 0Z" fill="currentColor" fillOpacity={0.18} />
      <path d="M3 21h26M16 10V7M13 7h6M6 25h20" />
    </>
  ),
  kiosk: (
    <>
      <rect x="7" y="3" width="18" height="17" rx="2" fill="currentColor" fillOpacity={0.18} />
      <path d="M13 20v5h6v-5M9 28h14M13 10.5a3 3 0 1 1 6 0c0 1.7-1.3 3-3 3s-3-1.3-3-3" />
    </>
  ),
  integration: (
    <>
      <rect x="4" y="11" width="9" height="10" rx="2" fill="currentColor" fillOpacity={0.18} />
      <rect x="19" y="11" width="9" height="10" rx="2" fill="currentColor" fillOpacity={0.18} />
      <path d="M13 16h6M8.5 11V6M23.5 21v5" />
    </>
  ),
  coupon: (
    <>
      <path d="M4 10a3 3 0 0 0 0 6v6h24v-6a3 3 0 0 0 0-6V4H4Z" transform="translate(0 3)" fill="currentColor" fillOpacity={0.18} />
      <path d="M20 7v4M20 14.5v3M20 21v4M9 13h6M9 17h4" />
    </>
  ),
  overtime: (
    <>
      <circle cx="14" cy="16" r="10" fill="currentColor" fillOpacity={0.18} />
      <path d="M14 10v6l4 2.5M25 6v6M22 9h6" />
    </>
  ),
  vendor: (
    <>
      <path d="M4 12 6.5 5h19L28 12" />
      <path d="M5 12h22v14H5Z" fill="currentColor" fillOpacity={0.18} />
      <path d="M13 26v-7h6v7" />
    </>
  ),
  inventory: (
    <>
      <path d="M16 3 28 9v14l-12 6-12-6V9Z" fill="currentColor" fillOpacity={0.18} />
      <path d="M4 9l12 6 12-6M16 15v14" />
    </>
  ),
  pointer: (
    <>
      <rect x="4" y="5" width="24" height="18" rx="2.5" fill="currentColor" fillOpacity={0.18} />
      <path d="M4 10h24M8 7.5h.01M11 7.5h.01M16 15l8.5 3-3.7 1.3-1.3 3.7Z" />
    </>
  ),
  savings: (
    <>
      <circle cx="16" cy="16" r="11.5" fill="currentColor" fillOpacity={0.18} />
      <path d="M12 11h8M12 15h8M16 11c3 0 3 8 0 8h-4l6 5" />
    </>
  ),
  bolt: (
    <>
      <path d="M18 3 6.5 18H15l-1.5 11L25 14h-8.5Z" fill="currentColor" fillOpacity={0.18} />
    </>
  ),
  smile: (
    <>
      <circle cx="16" cy="16" r="11.5" fill="currentColor" fillOpacity={0.18} />
      <path d="M11 18.5c1.2 2 2.9 3 5 3s3.8-1 5-3M12 12.5h.01M20 12.5h.01" />
    </>
  ),
  layers: (
    <>
      <path d="M16 4 28 10l-12 6-12-6Z" fill="currentColor" fillOpacity={0.18} />
      <path d="m4 16 12 6 12-6M4 22l12 6 12-6" />
    </>
  ),
  tailored: (
    <>
      <path d="M6 9h20M6 16h20M6 23h20" />
      <circle cx="12" cy="9" r="2.8" fill="currentColor" fillOpacity={0.3} />
      <circle cx="21" cy="16" r="2.8" fill="currentColor" fillOpacity={0.3} />
      <circle cx="10" cy="23" r="2.8" fill="currentColor" fillOpacity={0.3} />
    </>
  ),
  automation: (
    <>
      <circle cx="16" cy="16" r="5" fill="currentColor" fillOpacity={0.18} />
      <path d="M16 4v4M16 24v4M4 16h4M24 16h4M7.5 7.5l2.8 2.8M21.7 21.7l2.8 2.8M7.5 24.5l2.8-2.8M21.7 10.3l2.8-2.8" />
    </>
  ),
  scale: (
    <>
      <path d="M5 11V5h6M27 11V5h-6M5 21v6h6M27 21v6h-6" />
      <rect x="10.5" y="10.5" width="11" height="11" rx="2" fill="currentColor" fillOpacity={0.18} />
    </>
  ),
  headset: (
    <>
      <path d="M6 18v-3a10 10 0 0 1 20 0v3" />
      <rect x="4.5" y="17" width="5" height="8" rx="2" fill="currentColor" fillOpacity={0.18} />
      <rect x="22.5" y="17" width="5" height="8" rx="2" fill="currentColor" fillOpacity={0.18} />
      <path d="M25 25c0 2-2 3-5 3h-3" />
    </>
  ),
  trophy: (
    <>
      <path d="M10 5h12v7a6 6 0 0 1-12 0Z" fill="currentColor" fillOpacity={0.18} />
      <path d="M10 8H6c0 4 2 6 4.5 6.5M22 8h4c0 4-2 6-4.5 6.5M16 18v5M11 27h10M12.5 27l1-4h5l1 4" />
    </>
  ),
  warning: (
    <>
      <path d="M16 4 29 27H3Z" fill="currentColor" fillOpacity={0.18} />
      <path d="M16 12v7M16 23h.01" />
    </>
  ),
};

function IconTile({ name, bg, color, className = "h-12 w-12", iconClassName = "h-7 w-7" }) {
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-[10px] ${iconPop} ${className}`} style={{ background: bg, color }}>
      <svg viewBox="0 0 32 32" aria-hidden="true" className={iconClassName} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        {ICON_PATHS[name]}
      </svg>
    </span>
  );
}

function SectionHeader({ id, title, text, align = "center", className = "", dark = false }) {
  const alignment = align === "center" ? "mx-auto text-center items-center" : "items-start";
  return (
    <header className={`${revealUp} flex max-w-3xl flex-col gap-3 ${alignment} ${className}`}>
      <h2 id={id} className={`text-2xl font-semibold md:text-[2.1rem] md:leading-[44px] ${dark ? "text-white" : ""}`}>
        {title}
      </h2>
      {text && <p className={`text-base leading-[25px] md:text-lg md:leading-[28px] ${dark ? "text-white/75" : mutedText}`}>{text}</p>}
    </header>
  );
}

const TONES = [
  { bg: "#d8e7fe", color: "#1d64d8" },
  { bg: "#fee6b1", color: "#b07d00" },
  { bg: "#d1f4e3", color: "#0b8f63" },
  { bg: "#fdd7d4", color: "#c2362c" },
  { bg: "#e9eafe", color: "#5b5bd6" },
];
const tone = (index) => TONES[index % TONES.length];

/* --------------------------------------------------------------------
   Content — all copy from https://www.emsphere.com/canteen-management-system/
   -------------------------------------------------------------------- */

const menuModules = [
  {
    title: "Fixed Menu",
    text: "From admin portal to time slot definition, restricting employees, mail notifications, canteen billing and reports everything can be managed on this system",
    icon: iconFixedMenu,
    alt: "Orange menu card with a serving cloche",
    bg: "#fff1e3",
  },
  {
    title: "Ala-carte",
    text: "This module offers everything that comes with Fixed Menu module, on top of that, you get employee login on kiosks via RFID, Daily Menu Management and Virtual Cash Deductions",
    icon: iconAlaCarte,
    alt: "Order slip with a yellow serving cloche",
    bg: "#fff8d6",
  },
];

const convenience = [
  { text: "Offer convenience to your employees, manage food coupons and vendor billing at one place.", icon: "coupon" },
  { text: "Integrate with other systems to add employee enrolled for OT. Make placing a meal during OT easy.", icon: "overtime" },
  { text: "Manage food coupons, employee and employer contribution and vendor billing.", icon: "vendor" },
];

const glanceFeatures = [
  { title: "Admin & Employee Portal", icon: "portal" },
  { title: "Time Slot Definition", icon: "clock" },
  { title: "Canteen Billing and Virtual Deductions", icon: "billing" },
  { title: "Reports", icon: "reports" },
  { title: "Mail Notifications", icon: "mail" },
  { title: "Daily Menu and Item Selection", icon: "menu" },
  { title: "Kiosk Login (RFID/Biometric/Facial Recognition)", icon: "kiosk" },
  { title: "Integrations", icon: "integration" },
];

const challenges = [
  [
    "Lack of Automation",
    "Traditional canteen systems often rely on manual processes, leading to inefficiencies and errors. Automating these processes can significantly enhance accuracy and speed up operations.",
  ],
  [
    "Manual Errors",
    "Manual data entry and transaction recording increase the likelihood of errors. These errors can result in inventory discrepancies, billing inaccuracies, and overall dissatisfaction among users.",
  ],
  [
    "Inventory Management Issues",
    "Managing inventory manually can be cumbersome and prone to errors. Overstocking or understocking of food items can lead to wastage or shortages, affecting both finances and user satisfaction.",
  ],
];

const functionalities = [
  { title: "Automated Billing", text: "Emsphere's system automates the billing process, reducing the risk of errors and ensuring transparency.", icon: "billing" },
  { title: "Inventory Management", text: "The system provides real-time inventory tracking, enabling effective management of food supplies and reducing wastage.", icon: "inventory" },
  { title: "User-Friendly Interface", text: "With an intuitive interface, Emsphere's CMS is easy to use for both canteen staff and end-users.", icon: "pointer" },
  {
    title: "Integration Capabilities",
    text: "Emsphere's CMS seamlessly integrates with existing organizational systems, such as HR and finance, allowing for smoother data exchange and comprehensive reporting.",
    icon: "integration",
  },
];

const benefits = [
  {
    title: "Time and Cost Savings",
    text: "By automating manual processes and streamlining operations, Emsphere's CMS helps organizations save time and reduce administrative costs.",
    icon: "savings",
  },
  {
    title: "Enhanced Efficiency and Accuracy",
    text: "The system's automation capabilities minimize errors and ensure accurate transaction recording, leading to smoother operations and improved productivity.",
    icon: "bolt",
  },
  {
    title: "Improved User Experience",
    text: "With its user-friendly interface and efficient processes, Emsphere's CMS enhances the overall dining experience for employees, leading to higher satisfaction levels.",
    icon: "smile",
  },
];

const reasons = [
  {
    title: "Comprehensive Solution",
    text: "Emsphere's CMS provides a comprehensive solution for all aspects of canteen management, including billing, inventory management, and user interface, ensuring that all your needs are met efficiently under one platform.",
    icon: "layers",
  },
  {
    title: "Customization",
    text: "Emsphere understands that every organization has unique requirements. Their CMS is highly customizable, allowing for tailored solutions that align perfectly with your specific business needs and preferences.",
    icon: "tailored",
  },
  {
    title: "User-Friendly Interface",
    text: "Emsphere's CMS boasts an intuitive and user-friendly interface, making it easy for both canteen staff and end-users to navigate and utilize the system effectively without extensive training or technical expertise.",
    icon: "pointer",
  },
  {
    title: "Seamless Integration",
    text: "Emsphere's CMS seamlessly integrates with existing organizational systems such as HR and finance, facilitating smooth data exchange and comprehensive reporting without disrupting your current operations.",
    icon: "integration",
  },
  {
    title: "Automation and Efficiency",
    text: "By automating manual processes and streamlining operations, Emsphere's CMS enhances efficiency, reduces errors, and saves valuable time and resources, ultimately improving overall productivity.",
    icon: "automation",
  },
  {
    title: "Scalability",
    text: "Whether you're a small business or a large enterprise, Emsphere's CMS is scalable to accommodate your growth and evolving needs, ensuring that the system remains effective and efficient as your organization expands.",
    icon: "scale",
  },
  {
    title: "Reliable Support and Maintenance",
    text: "Emsphere offers reliable support and maintenance services to ensure the smooth operation of its CMS, providing assistance whenever needed and keeping the system up-to-date with the latest features and enhancements.",
    icon: "headset",
  },
  {
    title: "Proven Track Record",
    text: "Emsphere Technologies has a proven track record of successful implementations across various industries, demonstrating its expertise and reliability in delivering tangible results and customer satisfaction.",
    icon: "trophy",
  },
];

const faqs = [
  {
    question: "What is a Canteen Management System (CMS)?",
    answer:
      "A Canteen Management System (CMS) is a software solution designed to streamline and automate various operations within a canteen or cafeteria, including inventory management, order processing, payment handling, and reporting.",
  },
  {
    question: "What are the key features of a Canteen Management System?",
    answer:
      "Key features of a CMS typically include menu management, order tracking, user account management, payment processing, inventory management, reporting, and analytics.",
  },
  {
    question: "How does a Canteen Management System benefit canteen owners?",
    answer:
      "A CMS helps canteen owners improve efficiency by automating manual processes, reducing errors in order processing, optimizing inventory management, enhancing customer service, and gaining insights through data analysis.",
  },
  {
    question: "What are the advantages for customers using a Canteen Management System?",
    answer:
      "Customers benefit from a CMS through quick and convenient order placement, secure payment options, real-time order tracking, access to a digital menu with nutritional information, and the ability to provide feedback for continuous improvement.",
  },
  {
    question: "Is it possible to integrate a Canteen Management System with existing systems?",
    answer:
      "Yes, most modern CMS solutions offer integration capabilities with other systems such as accounting software, point-of-sale (POS) systems, student information systems (SIS), and ERP systems, allowing seamless data flow and synchronization.",
  },
  {
    question: "How does a Canteen Management System handle payments?",
    answer:
      "A CMS typically supports various payment methods, including cash, credit/debit cards, mobile wallets, and meal cards. Payments can be processed securely through integrated payment gateways, ensuring transactions are fast and accurate.",
  },
  {
    question: "Can a Canteen Management System help in reducing food wastage?",
    answer:
      "Yes, a CMS can help reduce food wastage by providing insights into demand patterns through analytics, enabling better inventory management and menu planning. Additionally, features like pre-ordering and meal customization can minimize excess production.",
  },
  {
    question: "Is a Canteen Management System suitable for different types of canteens?",
    answer:
      "Yes, a CMS can be tailored to suit the needs of various canteens, including those in schools, colleges, corporate offices, hospitals, and other institutions. The flexibility of the system allows customization to accommodate specific requirements.",
  },
  {
    question: "How user-friendly is a Canteen Management System for staff and customers?",
    answer:
      "Most CMS solutions are designed with user-friendly interfaces for both staff and customers, featuring intuitive navigation, easy order placement, clear menu displays, and helpful prompts for guidance.",
  },
  {
    question: "Is support and maintenance provided for a Canteen Management System?",
    answer:
      "Yes, reputable CMS providers typically offer support services and maintenance to ensure smooth operation of the system. This may include technical assistance, software updates, troubleshooting, and training for users.",
  },
];


const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "emMeal — Canteen Management System",
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
        { "@type": "ListItem", position: 2, name: "Canteen Management System", item: PAGE_URL },
      ],
    },
  ],
};

/* --------------------------------------------------------------------
   Page
   -------------------------------------------------------------------- */

export default function CanteenManagementSystemPage() {
  return (
    <main className={`${instrumentSans.variable} ${inter.variable} hrms-page payroll-page cms-page w-full overflow-x-clip bg-white font-sans text-[#4c4c4c]`}>
      <ScrollReveal root=".cms-page" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      {/* Hero */}
      <section
        aria-labelledby="cms-hero-heading"
        className="relative bg-[radial-gradient(circle_at_0%_20%,rgba(0,119,194,0.14),transparent_32%),radial-gradient(circle_at_55%_0%,rgba(248,187,24,0.25),transparent_35%),radial-gradient(circle_at_100%_80%,rgba(248,187,24,0.3),transparent_30%),radial-gradient(circle_at_30%_100%,rgba(15,184,128,0.1),transparent_25%)] px-4 pb-12 pt-6 md:px-12 md:pb-16 md:pt-10"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:justify-between lg:gap-14">
          <header className={`${revealFromLeft} flex flex-col gap-5 lg:max-w-2xl`}>
            <nav aria-label="Breadcrumb" className={`${fontInter} text-[13px] font-medium text-black/55`}>
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link href="/" className="transition-colors hover:text-[#0077c2]">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">›</li>
                <li aria-current="page" className="text-black/80">
                  Canteen Management System
                </li>
              </ol>
            </nav>
            <h1 id="cms-hero-heading" className="text-3xl font-semibold leading-tight text-[#1f1f1f] md:text-[2.6rem] md:leading-[1.2]">
              Simplify <span className="text-[#0077c2]">Canteen Management System</span> with em<span className="text-[#f8bb18]">Meal</span> System
            </h1>
            <p className={`text-base leading-[26px] md:text-[17px] md:leading-[28px] ${mutedText}`}>
              Most large organizations, including corporate offices and factory units, prioritize employee meals, hygiene, and the quality of food
              served. A robust Canteen Management System like emMeal helps streamline these operations by enabling quick, efficient, and systematic meal
              management. emMeal ensures hassle-free service for a large workforce, improving satisfaction while maintaining hygiene and operational
              control.
            </p>
            <p className="text-base font-semibold text-[#1f1f1f]">To talk more about well organised lunch breaks</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="#request-demo" className={`${primaryButton} text-[15px]`}>
                Book a demo
                <ArrowCircleIcon />
              </a>
              <a href="#cms-features" className={`${outlineButton} text-[15px]`}>
                Explore Features
              </a>
            </div>
          </header>

          <div className={`${revealFromRight} relative w-full max-w-md lg:w-[38%] lg:max-w-none`}>
            <div aria-hidden="true" className="absolute inset-8 rounded-full bg-[#fff1c7] blur-3xl" />
            <Image
              src={heroImg}
              alt="Hand holding a phone showing the emMeal weekly meal planner"
              className={`relative h-auto w-full ${motion} hover:-translate-y-1`}
              priority
              sizes="(min-width: 1024px) 38vw, 100vw"
            />
            <div className="payroll-float absolute bottom-10 -left-2 flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-[0_16px_36px_-14px_rgba(0,0,0,0.4)] sm:-left-8">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fee6b1] text-[#b07d00]">
                <svg viewBox="0 0 32 32" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  {ICON_PATHS.menu}
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-[#1f1f1f]">Fixed Menu &amp; Ala-carte</p>
                <p className={`text-xs ${mutedText}`}>RFID · Biometric · Face kiosk</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed Menu / Ala-carte */}
      <section aria-labelledby="modules-heading" className="px-4 py-14 md:px-12 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-10">
          <SectionHeader
            id="modules-heading"
            title={
              <>
                Whether your canteen serves a <span className="text-[#0077c2]">Fixed Menu</span> or <span className="text-[#f8bb18]">Ala-Carte</span>, We have a
                module for you!
              </>
            }
            className="max-w-4xl"
          />
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {menuModules.map((item, index) => (
              <li key={item.title} style={stagger(index)} className={`${index === 0 ? revealFromLeft : revealFromRight} ${goldCard} ${liftGold} flex flex-col items-start gap-5 p-7 sm:flex-row sm:p-8`}>
                <span className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl ${iconPop}`} style={{ background: item.bg }}>
                  <Image src={item.icon} alt={item.alt} className="h-16 w-16 object-contain" sizes="64px" />
                </span>
                <div>
                  <h3 className="text-2xl font-semibold text-[#1f1f1f]">{item.title}</h3>
                  <p className={`mt-2 text-[15px] leading-[25px] md:text-base ${mutedText}`}>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* We're talking system for food!! — app screen + demo form (dark band) */}
      <section aria-labelledby="food-heading" className="relative overflow-hidden bg-[#0f162a] px-4 py-14 text-white md:px-12 md:py-20">
        <div aria-hidden="true" className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#efb000]/20 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#0077c2]/30 blur-3xl" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
          <div className={`${revealFromLeft} flex w-full flex-col gap-6 lg:max-w-xl`}>
            <SectionHeader
              id="food-heading"
              dark
              align="left"
              title={
                <>
                  We’re talking <span className="text-[#efb000]">system for food!!</span>
                </>
              }
            />
            <div className="overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/15">
              <Image
                src={appScreenImg}
                alt="emMeal app on a phone showing Find Meals with favourites, popular categories and dinner recommendations"
                className="h-auto w-full"
                sizes="(min-width: 1024px) 36rem, 100vw"
              />
            </div>
          </div>
          <div className={`${revealFromRight} w-full max-w-md lg:w-[40%] lg:max-w-[440px]`}>
            <DemoRequestForm product="Canteen Management System (emMeal)" title="Book a call" subtitle="Request a demo of emMeal — our team will reach out to schedule it." />
          </div>
        </div>
      </section>

      {/* Convenience with integration */}
      <section aria-labelledby="convenience-heading" className="px-4 py-14 md:px-12 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <SectionHeader
            id="convenience-heading"
            title={
              <>
                Convenience with <span className="text-[#0077c2]">integration</span>
              </>
            }
          />
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {convenience.map((item, index) => (
              <li key={item.icon} style={stagger(index)} className={`${revealUp} ${greyCard} ${liftGrey} flex flex-col gap-4 p-6`}>
                <IconTile name={item.icon} bg={tone(index * 2).bg} color={tone(index * 2).color} className="h-14 w-14" iconClassName="h-8 w-8" />
                <p className="text-base font-medium leading-[26px] text-[#1f1f1f]">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* A quick glance at all the features */}
      <section id="cms-features" aria-labelledby="glance-heading" className="scroll-mt-24 bg-[#fcfcfc] px-4 py-14 md:px-12 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <SectionHeader id="glance-heading" title="A quick glance at all the features!" />
          <ul className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
            {glanceFeatures.map((item, index) => (
              <li
                key={item.title}
                style={stagger(index % 4, 80)}
                className={`${revealUp} ${goldCard} ${liftGold} flex flex-col items-center gap-3 px-4 py-6 text-center`}
              >
                <IconTile name={item.icon} bg={tone(index).bg} color={tone(index).color} className="h-14 w-14 rounded-full" iconClassName="h-7 w-7" />
                <h3 className="text-[15px] font-semibold leading-snug text-[#1f1f1f] md:text-base">{item.title}</h3>
              </li>
            ))}
          </ul>
          <p
            className={`${revealZoom} mx-auto flex items-center gap-3 rounded-full bg-[#0f162a] px-6 py-3.5 text-center text-base font-semibold text-white shadow-[0_18px_40px_-20px_rgba(15,22,42,0.9)] md:text-lg`}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#efb000] text-[#0f162a]">
              <CheckIcon className="h-4 w-4" />
            </span>
            We can guarantee a hassle free experience.
          </p>
        </div>
      </section>

      {/* Introduction — pins on desktop: heading stays, page scroll moves the cards */}
      <PinnedScrollSection
        ariaLabelledby="intro-heading"
        listClassName="gap-5"
        intro={
          <SectionHeader
            id="intro-heading"
            align="left"
            title={
              <>
                Introduction to Emsphere’s <span className="text-[#0077c2]">Canteen Management System</span>
              </>
            }
            text="In today's fast-paced world, efficient management of canteens is essential for organizations of all sizes. Canteen Management Systems (CMS) play a pivotal role in streamlining operations, ensuring transparency, and enhancing user experience."
          />
        }
      >
        <li className={`${greyCard} ${liftGrey} flex flex-col gap-3 p-6`}>
          <h3 className="text-xl font-semibold text-[#1f1f1f]">The Importance of Efficient Canteen Management System</h3>
          <p className={`text-[15px] leading-[25px] ${mutedText}`}>
            Efficient canteen management goes beyond merely serving meals. It involves inventory management, transaction tracking, and ensuring
            compliance with safety and hygiene standards. A well-managed canteen contributes to employee satisfaction, productivity, and overall
            organizational efficiency.
          </p>
        </li>
        <li className={`${greyCard} ${liftGrey} flex flex-col gap-4 p-6`}>
          <h3 className="text-xl font-semibold text-[#1f1f1f]">Challenges Faced in Traditional Canteen System</h3>
          <ul className="flex flex-col gap-3">
            {challenges.map(([term, text]) => (
              <li key={term} className="flex gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#fdd7d4] text-[#c2362c]">
                  <svg viewBox="0 0 32 32" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                    {ICON_PATHS.warning}
                  </svg>
                </span>
                <p className={`text-[15px] leading-[24px] ${mutedText}`}>
                  <span className="font-semibold text-[#1f1f1f]">{term}:</span> {text}
                </p>
              </li>
            ))}
          </ul>
        </li>
        <li className={`${greyCard} ${liftGrey} flex flex-col gap-3 p-6`}>
          <h3 className="text-xl font-semibold text-[#1f1f1f]">Introduction to Emsphere Technologies</h3>
          <p className={`text-[15px] leading-[25px] ${mutedText}`}>
            Emsphere Technologies is a leading provider of innovative solutions for organizational management. With a focus on leveraging technology to
            streamline processes, Emsphere offers a comprehensive Canteen Management System tailored to the needs of modern businesses.
          </p>
        </li>
        <li className={`${greyCard} ${liftGrey} flex flex-col gap-3 p-6`}>
          <h3 className="text-xl font-semibold text-[#1f1f1f]">Understanding Emsphere&apos;s Canteen Management System</h3>
          <p className={`text-[15px] leading-[25px] ${mutedText}`}>
            Emsphere&apos;s CMS is designed to address the challenges faced by traditional canteen systems. It offers a wide range of features and
            functionalities aimed at enhancing efficiency, accuracy, and user experience.
          </p>
        </li>
      </PinnedScrollSection>

      {/* Features and functionalities */}
      <section aria-labelledby="functionalities-heading" className="bg-[#eef4fd] px-4 py-14 md:px-12 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <SectionHeader
            id="functionalities-heading"
            title={
              <>
                Features and Functionalities of <span className="text-[#0077c2]">Canteen Management System</span>
              </>
            }
            text="In today's fast-paced world, efficient management of canteens is essential for organizations of all sizes. Canteen Management System (CMS) play a pivotal role in streamlining operations, ensuring transparency, and enhancing user experience."
          />
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {functionalities.map((item, index) => (
              <li key={item.title} style={stagger(index, 100)} className={`${revealUp} ${greyCard} ${liftGrey} flex flex-col gap-3 p-6`}>
                <IconTile name={item.icon} bg={tone(index).bg} color={tone(index).color} />
                <h3 className="text-lg font-semibold text-[#1f1f1f]">{item.title}</h3>
                <p className={`text-[15px] leading-[24px] ${mutedText}`}>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Benefits */}
      <section aria-labelledby="benefits-heading" className="px-4 py-14 md:px-12 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <SectionHeader
            id="benefits-heading"
            title={
              <>
                Benefits of Implementing <span className="text-[#f8bb18]">Emsphere’s Canteen Management System</span>
              </>
            }
            text="Discover the key benefits of implementing Emsphere’s Contractor Canteen System — from reducing food wastage and improving hygiene to streamlining meal distribution and enhancing employee satisfaction."
          />
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {benefits.map((item, index) => (
              <li key={item.title} style={stagger(index)} className={`${revealUp} ${goldCard} ${liftGold} relative flex flex-col gap-4 overflow-hidden p-7`}>
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1" style={{ background: tone(index * 2 + 1).color }} />
                <IconTile name={item.icon} bg={tone(index * 2 + 1).bg} color={tone(index * 2 + 1).color} className="h-14 w-14" iconClassName="h-8 w-8" />
                <h3 className="text-xl font-semibold text-[#1f1f1f]">{item.title}</h3>
                <p className={`text-[15px] leading-[24px] ${mutedText}`}>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why choose Emsphere + conclusion */}
      <section aria-labelledby="why-heading" className="bg-[#fcfcfc] px-4 py-14 md:px-12 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <SectionHeader
            id="why-heading"
            title={
              <>
                Why choose <span className="text-[#f8bb18]">Emsphere Technologies</span> for the Canteen Management System
              </>
            }
            className="max-w-4xl"
          />
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((item, index) => (
              <li key={item.title} style={stagger(index % 4, 90)} className={`${revealUp} ${goldCard} ${liftGold} relative flex flex-col gap-3 p-6`}>
                <span className={`${fontInter} absolute right-5 top-5 text-sm font-bold text-black/15`}>{String(index + 1).padStart(2, "0")}</span>
                <IconTile name={item.icon} bg={tone(index).bg} color={tone(index).color} />
                <h3 className="pr-6 text-lg font-semibold leading-snug text-[#1f1f1f]">{item.title}</h3>
                <p className={`text-[15px] leading-[23px] ${mutedText}`}>{item.text}</p>
              </li>
            ))}
          </ul>

          <aside
            aria-labelledby="conclusion-heading"
            className={`${revealZoom} relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0077c2] to-[#0061af] p-6 text-white shadow-[0_24px_50px_-24px_rgba(0,97,175,0.8)] md:p-10`}
          >
            <div aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#efb000]/30 blur-2xl" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <h3 id="conclusion-heading" className="text-2xl font-semibold md:text-3xl">
                  Conclusion | Canteen Management System
                </h3>
                <p className="mt-3 text-base leading-[26px] text-white/85">
                  Efficient canteen management is essential for organizations to ensure employee satisfaction, productivity, and overall operational
                  efficiency. Emsphere Technologies offers a comprehensive Canteen Management System designed to address the challenges faced by
                  traditional systems and deliver tangible benefits to organizations.
                </p>
              </div>
              <a
                href="#request-demo"
                className={`group/btn inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-[9px] bg-[#efb000] px-6 py-3 ${fontInter} text-[15px] font-semibold text-black ${motion} hover:-translate-y-0.5 hover:bg-[#d69e00] hover:shadow-[0_8px_18px_-4px_rgba(239,176,0,0.55)] lg:self-center`}
              >
                Book a demo
                <ArrowCircleIcon fill="#000000" />
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section
        aria-labelledby="faq-heading"
        className="bg-[#fdf6e6] bg-[radial-gradient(circle_at_10%_15%,rgba(248,187,24,0.3),transparent_25%),radial-gradient(circle_at_95%_75%,rgba(248,187,24,0.3),transparent_25%)] px-4 py-12 md:px-12 md:py-20"
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-8">
          <header className={`${revealUp} flex flex-col gap-2 text-center`}>
            <h2 id="faq-heading" className="text-3xl font-semibold md:text-[2.375rem] md:leading-[49px]">
              FAQ’s for Canteen Management System
            </h2>
          </header>
          <ul className="flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <li key={faq.question} style={stagger(index % 5, 70)} className={`${revealUp} ${goldCard} ${liftGold} overflow-hidden`}>
                <details name="cms-faq" open={index === 0} className="hrms-faq group">
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
