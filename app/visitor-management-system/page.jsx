import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instrument_Sans, Inter } from "next/font/google";
import ScrollReveal from "@/components/ScrollReveal";
import BackToTop from "@/components/BackToTop";
import FlagshipProducts from "@/components/FlagshipProducts";
import DemoRequestForm from "@/components/DemoRequestForm";
import CardCarousel from "@/components/CardCarousel";

/* --------------------------------------------------------------------
   Images — every image this page uses lives in
   app/images/visitor-management-system and is imported by name.
   -------------------------------------------------------------------- */

import heroImg from "../images/visitor-management-system/hero-verified-visitor-check-in-devices.webp";
import mobileImg from "../images/visitor-management-system/visitor-analytics-mobile-app-dashboard.webp";
import securityImg from "../images/visitor-management-system/workplace-security-visitor-scheduling-illustration.webp";
import digitalImg from "../images/visitor-management-system/digital-visitor-profiles-verification-illustration.webp";
import receptionImg from "../images/visitor-management-system/reception-security-desk-visitor-check-in.webp";


// Title and description are the page's Rank Math values on the current site.
const PAGE_URL = "https://www.emsphere.com/visitor-management-system/";
const PAGE_TITLE = "Visitor Management System, Software, Solution";
const PAGE_DESCRIPTION =
  "Enhance visitor security and streamline check-ins with Emsphere’s advanced Visitor Management System. Fast, secure, and efficient visitor handling.";
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

// Line icons drawn for this page (the live site uses an icon font here).
const ICON_PATHS = {
  checkin: (
    <>
      <rect x="6" y="5" width="20" height="23" rx="2.5" fill="currentColor" fillOpacity={0.18} />
      <path d="M12 5V3.5h8V5M11 13l2.5 2.5L18 11M11 21h10" />
    </>
  ),
  record: (
    <>
      <rect x="5" y="4" width="22" height="24" rx="2.5" fill="currentColor" fillOpacity={0.18} />
      <path d="M10 10h12M10 15h12M10 20h7" />
    </>
  ),
  chat: (
    <>
      <path d="M5 7.5A2.5 2.5 0 0 1 7.5 5h12A2.5 2.5 0 0 1 22 7.5v7a2.5 2.5 0 0 1-2.5 2.5H12l-5 4v-4H7.5" fill="currentColor" fillOpacity={0.18} />
      <path d="M25 11h.5a2.5 2.5 0 0 1 2.5 2.5v7a2.5 2.5 0 0 1-2.5 2.5H25v4l-5-4h-4.5" />
    </>
  ),
  note: (
    <>
      <path d="M6 5h20v15l-7 7H6Z" fill="currentColor" fillOpacity={0.18} />
      <path d="M19 27v-7h7M11 11h10M11 15.5h6" />
    </>
  ),
  bell: (
    <>
      <path d="M8 21V14a8 8 0 0 1 16 0v7l2.5 3h-21Z" fill="currentColor" fillOpacity={0.18} />
      <path d="M13 27.5a3 3 0 0 0 6 0" />
    </>
  ),
  signature: (
    <>
      <path d="M20.5 5.5l6 6L13 25H7v-6Z" fill="currentColor" fillOpacity={0.18} />
      <path d="M17.5 8.5l6 6M4 28.5h24" />
    </>
  ),
  badge: (
    <>
      <rect x="7" y="6" width="18" height="22" rx="2.5" fill="currentColor" fillOpacity={0.18} />
      <path d="M13 3.5h6v5h-6ZM16 14.5a3 3 0 1 1-.01 0M11 24c.8-2.2 2.7-3.5 5-3.5s4.2 1.3 5 3.5" />
    </>
  ),
  qr: (
    <>
      <rect x="5" y="5" width="9" height="9" rx="1.5" fill="currentColor" fillOpacity={0.18} />
      <rect x="18" y="5" width="9" height="9" rx="1.5" fill="currentColor" fillOpacity={0.18} />
      <rect x="5" y="18" width="9" height="9" rx="1.5" fill="currentColor" fillOpacity={0.18} />
      <path d="M18 18h3v3h-3ZM24 18h3M18 24v3M22 24h5v3" />
    </>
  ),
  idcard: (
    <>
      <rect x="3.5" y="7" width="25" height="18" rx="2.5" fill="currentColor" fillOpacity={0.18} />
      <circle cx="11" cy="14.5" r="2.8" />
      <path d="M7 21c.7-1.9 2.2-3 4-3s3.3 1.1 4 3M18.5 13h6M18.5 17.5h4" />
    </>
  ),
  integration: (
    <>
      <rect x="4" y="11" width="9" height="10" rx="2" fill="currentColor" fillOpacity={0.18} />
      <rect x="19" y="11" width="9" height="10" rx="2" fill="currentColor" fillOpacity={0.18} />
      <path d="M13 16h6M8.5 11V6M23.5 21v5" />
    </>
  ),
  lock: (
    <>
      <rect x="6" y="14" width="20" height="14" rx="2.5" fill="currentColor" fillOpacity={0.18} />
      <path d="M10.5 14V9.5a5.5 5.5 0 0 1 11 0V14M16 19.5v3" />
    </>
  ),
  shield: (
    <>
      <path d="M16 3.5 26 7.5v7.5c0 6.2-4.3 10.8-10 13-5.7-2.2-10-6.8-10-13V7.5Z" fill="currentColor" fillOpacity={0.18} />
      <path d="m11.5 16 3.2 3.2 6-6.4" />
    </>
  ),
  bolt: (
    <>
      <path d="M18 3 6.5 18H15l-1.5 11L25 14h-8.5Z" fill="currentColor" fillOpacity={0.18} />
    </>
  ),
  savings: (
    <>
      <circle cx="16" cy="16" r="11.5" fill="currentColor" fillOpacity={0.18} />
      <path d="M12 11h8M12 15h8M16 11c3 0 3 8 0 8h-4l6 5" />
    </>
  ),
  smile: (
    <>
      <circle cx="16" cy="16" r="11.5" fill="currentColor" fillOpacity={0.18} />
      <path d="M11 18.5c1.2 2 2.9 3 5 3s3.8-1 5-3M12 12.5h.01M20 12.5h.01" />
    </>
  ),
  audit: (
    <>
      <path d="M21 13V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h7" fill="currentColor" fillOpacity={0.18} />
      <path d="M10 10h7M10 14.5h4M10 19h3" />
      <circle cx="21.5" cy="20.5" r="4.5" />
      <path d="m24.8 23.8 3.2 3.2" />
    </>
  ),
  hourglass: (
    <>
      <path d="M9 4h14M9 28h14M10 4c0 6 12 7 12 12S10 22 10 28M22 4c0 6-12 7-12 12s12 6 12 12" />
      <path d="M12 26c1-2.5 7-2.5 8 0Z" fill="currentColor" fillOpacity={0.4} />
    </>
  ),
  warning: (
    <>
      <path d="M16 4 29 27H3Z" fill="currentColor" fillOpacity={0.18} />
      <path d="M16 12v7M16 23h.01" />
    </>
  ),
  chartOff: (
    <>
      <path d="M5 27h22" />
      <rect x="7" y="16" width="4" height="8" rx="1" fill="currentColor" fillOpacity={0.18} />
      <rect x="14" y="10" width="4" height="14" rx="1" fill="currentColor" fillOpacity={0.18} />
      <rect x="21" y="5" width="4" height="19" rx="1" fill="currentColor" fillOpacity={0.18} />
      <path d="M4 4l24 24" />
    </>
  ),
  scale: (
    <>
      <path d="M5 11V5h6M27 11V5h-6M5 21v6h6M27 21v6h-6" />
      <rect x="10.5" y="10.5" width="11" height="11" rx="2" fill="currentColor" fillOpacity={0.18} />
    </>
  ),
  gate: (
    <>
      <rect x="7" y="4" width="18" height="24" rx="2" fill="currentColor" fillOpacity={0.18} />
      <path d="M21 16h.01M3 28h26" />
      <path d="m12.5 16 2.5 2.5 4-4.5" />
    </>
  ),
  evacuation: (
    <>
      <path d="M17 8a2.5 2.5 0 1 1-.01 0M12 28l3-8 4 3v5M15 20l1.5-6 4 3.5 4 1M16.5 14l-4.5 2-2 4" />
      <path d="M4 4h9v5H4Z" fill="currentColor" fillOpacity={0.18} />
    </>
  ),
  database: (
    <>
      <ellipse cx="14" cy="7.5" rx="9" ry="3.5" fill="currentColor" fillOpacity={0.18} />
      <path d="M5 7.5v14c0 1.9 4 3.5 9 3.5M23 7.5v6M5 14.5c0 1.9 4 3.5 9 3.5" />
      <rect x="18" y="19" width="10" height="8" rx="1.5" fill="currentColor" fillOpacity={0.18} />
      <path d="M20 19v-2a3 3 0 0 1 6 0v2" />
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

function SectionHeader({ id, title, text, align = "center", className = "", dark = false, as = "h2" }) {
  const Heading = as;
  const alignment = align === "center" ? "mx-auto text-center items-center" : "items-start";
  return (
    <header className={`${revealUp} flex max-w-3xl flex-col gap-3 ${alignment} ${className}`}>
      <Heading id={id} className={`text-2xl font-semibold md:text-[2.1rem] md:leading-[44px] ${dark ? "text-white" : ""}`}>
        {title}
      </Heading>
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
   Content — all copy from https://www.emsphere.com/visitor-management-system/
   -------------------------------------------------------------------- */

const features = [
  { title: "Customizable Check-In", text: "The system allows users to collect information from different visitor types, including interviewees, delivery professionals, etc.", icon: "checkin" },
  { title: "Digital Visitor Record", text: "Users can review the visitor log to know who visited, how many visitors visited and what was their purpose of visit.", icon: "record" },
  { title: "Two-Way Communication", text: "Employees can notify the visitor that they are on their way to the lobby to receive them.", icon: "chat" },
  { title: "Visitor Notes", text: "Users can also add notes to a particular visit in the Visit Log to include notes, like the entry of visitor, visitor’s badge number, etc.", icon: "note" },
  {
    title: "Backup Notifications",
    text: "In case of the unavailability of a visitor’s primary contact, the system can notify another employee. Thus, users can create countless backup notifications to ensure every visitor is attended.",
    icon: "bell",
  },
  { title: "NDA Signature", text: "The system also enables companies to get NDAs signed by visitors upon their arrival.", icon: "signature" },
  // The live page repeats the Customizable Check-In text here.
  { title: "Badge Printing", text: "The system allows users to collect information from different visitor types, including interviewees, delivery professionals, etc.", icon: "badge" },
  { title: "Contactless Entry and Exit", text: "Employees and visitors can enter the premises by scanning a QR code, thus enabling touchless entry and exit.", icon: "qr" },
  { title: "ID Capturing", text: "The system captures the visitor’s ID and stores it for future reference.", icon: "idcard" },
  { title: "Seamless Integration", text: "Our system also integrates with various other internal systems to create a single source of truth and track visitor data.", icon: "integration" },
  {
    title: "Secure Data Management & Compliance Features",
    text: "The system is designed with virtual security concerns in mind. Thus, it helps secure visitor data and also complies with the respective industry’s data security regulatory needs.",
    icon: "lock",
  },
];

const benefits = [
  {
    title: "Improved Security",
    text: "A visitor management system helps you track visitors with timestamps, photos, and identification details. Furthermore, the system allows pre-registration and background checks for visitors, thus reducing trespassing and enhancing security.",
    icon: "shield",
  },
  {
    title: "Enhanced Visitor Management Efficiency",
    text: "The system eliminates manual sign-in sheets, expedites visitor registration, and reduces waiting times with pre-filled information or QR codes.",
    icon: "bolt",
  },
  {
    title: "Resource Savings",
    text: "A digital visitor management system helps reduce costs concerning paper logbooks and administrative tasks. Furthermore, it relieves front desk staff to focus on tasks more crucial from a strategic viewpoint.",
    icon: "savings",
  },
  {
    title: "Better Visitor Experience",
    text: "Fewer queues and accelerated check-ins help enhance the visitor experience, which potentially contributes to an improved reputation.",
    icon: "smile",
  },
  {
    title: "Effortless Integration",
    text: "The system can align seamlessly with existing systems like door locks, security cameras, badge printers, etc., to ensure smooth operations and form a single source of truth.",
    icon: "integration",
  },
  {
    title: "Audit Trails",
    text: "Since the system is digitally run, it provides every recorded detail of a particular visitor, thus simplifying auditing and investigations.",
    icon: "audit",
  },
];

const securityPoints = [
  "Smooth and effortless visitor management",
  "Strengthened security",
  "Digital visitor tracking and management",
  "Significant cost savings",
  "Restricting intruders or trespassers",
  "Multiple features accelerate visitor movements",
  "Enhanced visitor experience",
];

const challenges = [
  {
    title: "Inefficiency and Delays",
    text: "Manual visitor management often results in delays and visitors waiting to be attended. These delays can agitate visitors, particularly when they’ve come on a schedule and need quick entry.",
    icon: "hourglass",
  },
  {
    title: "Security Concerns",
    text: "Dodging the security personnel and attempting to trespass can be common with manual visitor management. This can increase risk and potentially threaten people inside the facility.",
    icon: "warning",
  },
  {
    title: "Inability to Track Data",
    text: "Recording data manually makes it challenging for administrators to track visitor data and analyze it further to enhance security arrangements.",
    icon: "chartOff",
  },
  {
    title: "Restricted Scalability",
    text: "Traditional visitor management isn’t as easily scalable. Besides, scaling requires additional resources, which come at a cost.",
    icon: "scale",
  },
];

const enhancements = [
  {
    title: "Automated Visitor Access Control",
    text: "Emsphere emphasizes automation wherever possible. Automating visitor access control helps reduce manual security workload, eliminates manual errors, and helps prevent intruders.",
    icon: "gate",
  },
  {
    title: "Emergency Evacuation Tracking for Visitors",
    text: "Our visitor management system takes security to the next level! It does so by helping security personnel track emergency evacuation for visitors, thus ensuring their safety.",
    icon: "evacuation",
  },
  {
    title: "Compliant and Secure Visitor Data Storage",
    text: "Data security is paramount to Emsphere’s visitor management system. Accordingly, the system is equipped with advanced and competent security features for secure data storage.",
    icon: "database",
  },
];

const faqs = [
  {
    question: "What is a Visitor Management System?",
    answer:
      "A Visitor Management System is a digital solution used by organizations to track and manage visitors entering their premises. It typically includes features for registration, check-in, badge printing, and visitor tracking.",
  },
  {
    question: "How does a Visitor Management System work?",
    answer:
      "A Visitor Management System typically operates by capturing visitor information upon arrival, issuing visitor badges or passes, and recording visitor movements throughout the premises. This information is stored in a central database for easy access and management.",
  },
  {
    question: "What are the key features of a Visitor Management System?",
    answer:
      "Key features of a Visitor Management System may include visitor pre-registration, self-service check-in kiosks, ID scanning, badge printing, real-time visitor tracking, integration with access control systems, and reporting capabilities.",
  },
  {
    question: "What are the benefits of using a Visitor Management System?",
    answer:
      "Using a Visitor Management System enhances security by accurately tracking visitor movements, improves efficiency by automating check-in processes, provides valuable data for analysis and compliance purposes, and enhances the overall visitor experience.",
  },
  {
    question: "Is a Visitor Management System suitable for all types of businesses?",
    answer:
      "Yes, a Visitor Management System can be tailored to suit the needs of various businesses, including office buildings, schools, hospitals, manufacturing facilities, hotels, and more.",
  },
  {
    question: "How does a Visitor Management System enhance security?",
    answer:
      "A Visitor Management System enhances security by providing real-time visibility into who is on-site, verifying visitor identities through ID scanning, and ensuring that visitors only have access to authorized areas.",
  },
  {
    question: "Can a Visitor Management System help with compliance regulations?",
    answer:
      "Yes, many Visitor Management Systems offer features to assist with compliance regulations such as GDPR, HIPAA, and other data privacy laws by securely storing visitor information and providing audit trails.",
  },
  {
    question: "What types of data does a Visitor Management System collect and store?",
    answer:
      "A Visitor Management System typically collects and stores visitor information such as name, contact details, purpose of visit, check-in and check-out times, and sometimes photo identification.",
  },
  {
    question: "How customizable is a Visitor Management System to suit specific business needs?",
    answer:
      "Visitor Management Systems are often highly customizable, allowing businesses to tailor the system to their specific requirements, including branding, workflows, data fields, and integration with other software systems.",
  },
  {
    question: "What are the implementation and support options available for a Visitor Management System?",
    answer:
      "Implementation and support options for Visitor Management Systems vary depending on the provider but may include on-premises installation, cloud-based solutions, and ongoing support and maintenance services. Many providers offer training and documentation to ensure smooth adoption of the system.",
  },
];


const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "emVisit — Visitor Management System",
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
        { "@type": "ListItem", position: 2, name: "Visitor Management System", item: PAGE_URL },
      ],
    },
  ],
};

/* --------------------------------------------------------------------
   Page
   -------------------------------------------------------------------- */

export default function VisitorManagementSystemPage() {
  return (
    <main className={`${instrumentSans.variable} ${inter.variable} hrms-page payroll-page vms-page w-full overflow-x-clip bg-white font-sans text-[#4c4c4c]`}>
      <ScrollReveal root=".vms-page" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      {/* Hero */}
      <section
        aria-labelledby="vms-hero-heading"
        className="relative bg-[radial-gradient(circle_at_0%_20%,rgba(0,119,194,0.14),transparent_32%),radial-gradient(circle_at_55%_0%,rgba(248,187,24,0.25),transparent_35%),radial-gradient(circle_at_100%_80%,rgba(248,187,24,0.3),transparent_30%),radial-gradient(circle_at_30%_100%,rgba(15,184,128,0.1),transparent_25%)] px-4 pb-12 pt-6 md:px-12 md:pb-16 md:pt-10"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:justify-between lg:gap-14">
          <header className={`${revealFromLeft} flex flex-col gap-5 lg:max-w-xl`}>
            <nav aria-label="Breadcrumb" className={`${fontInter} text-[13px] font-medium text-black/55`}>
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link href="/" className="transition-colors hover:text-[#0077c2]">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">›</li>
                <li aria-current="page" className="text-black/80">
                  Visitor Management System
                </li>
              </ol>
            </nav>
            <h1 id="vms-hero-heading" className="text-3xl font-semibold leading-tight text-[#1f1f1f] md:text-[2.6rem] md:leading-[1.2]">
              Smart <span className="text-[#0077c2]">Visitor Management System</span> by Emsphere Technologies
            </h1>
            <p className={`text-base leading-[26px] md:text-lg md:leading-[29px] ${mutedText}`}>
              India’s leading cloud-based, fully automated &amp; comprehensive system to manage planned and unplanned visitors. Secure multiple entry and
              exit points, integrate hardware installed with our software to make a full proof visitor management system and get detailed analytics.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="#request-demo" className={`${primaryButton} text-[15px]`}>
                Request for demo
                <ArrowCircleIcon />
              </a>
              <a href="#vms-features" className={`${outlineButton} text-[15px]`}>
                Explore Features
              </a>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-1 text-sm font-semibold text-[#1f1f1f]">
              {["Cloud-based", "Fully automated", "Hardware integration"].map((item, index) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: tone(index + 2).bg, color: tone(index + 2).color }}>
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </header>

          <div className={`${revealFromRight} relative w-full max-w-xl lg:w-[46%] lg:max-w-none`}>
            <div aria-hidden="true" className="absolute inset-8 rounded-full bg-[#fff1c7] blur-3xl" />
            <Image
              src={heroImg}
              alt="Isometric illustration of a verified visitor profile connected to check-in screens and a laptop"
              className={`relative h-auto w-full ${motion} hover:-translate-y-1`}
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
            <div className="payroll-float absolute -bottom-4 left-2 flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-[0_16px_36px_-14px_rgba(0,0,0,0.4)] sm:left-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d1f4e3] text-[#0b8f63]">
                <CheckIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#1f1f1f]">Visitor verified</p>
                <p className={`text-xs ${mutedText}`}>Contactless QR check-in</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why your business needs a VMS */}
      <section aria-labelledby="needs-heading" className="px-4 py-14 md:px-12 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row-reverse lg:gap-16">
          <div className={`${revealFromRight} relative mx-auto w-full max-w-[26rem] lg:w-[38%]`}>
            <div aria-hidden="true" className="absolute inset-6 rounded-full bg-[#d8e7fe] blur-3xl" />
            <Image
              src={mobileImg}
              alt="Smartphone running the Emsphere visitor app with visitor counts and analytics charts"
              className="relative h-auto w-full"
              sizes="(min-width: 1024px) 26rem, 90vw"
            />
          </div>
          <div className={`${revealFromLeft} flex w-full flex-col gap-5 lg:w-[62%]`}>
            <h2 id="needs-heading" className="text-2xl font-semibold md:text-[2.1rem] md:leading-[44px]">
              Why Your Business Needs a <span className="text-[#0077c2]">Visitor Management System</span>
            </h2>
            <p className={`text-base leading-[27px] md:text-[17px] ${mutedText}`}>
              If you are a business managing visitor movements manually and struggling to do it efficiently, you need a tech-driven visitor management
              system. While simplifying visitor management, a visitor management system also helps strengthen security. By leveraging the latest
              technologies, it helps track visitors in and out movement, restrict unauthorized entrants or trespassers, and more.
            </p>
            <p className={`text-base leading-[27px] md:text-[17px] ${mutedText}`}>
              At Emsphere, we are committed to excellence with a feature-rich and customizable visitor management system. Our systems are used across
              the premises of numerous business domains managing varying footfalls throughout the day. Here’s more to the features of our visitor
              management system solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Features — infinite slider */}
      <section id="vms-features" aria-labelledby="features-heading" className="scroll-mt-24 bg-[#fcfcfc] px-4 py-12 md:px-12 md:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <SectionHeader
            id="features-heading"
            title={
              <>
                Features of Emsphere&apos;s <span className="text-[#0077c2]">Visitor Management System</span>
              </>
            }
            text="A comprehensive solution to managing visitor movements, our visitor management system offers the following features."
          />
          <div className={revealUp}>
            <CardCarousel label="Visitor management features" interval={1700} dotLabels={features.map((f, i) => `Show feature ${i + 1}: ${f.title}`)}>
              {features.map((item, index) => (
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

      {/* Benefits */}
      <section aria-labelledby="benefits-heading" className="px-4 py-12 md:px-12 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <SectionHeader
            id="benefits-heading"
            title={
              <>
                Benefits of Implementing a <span className="text-[#f8bb18]">Digital Visitor Management System</span>
              </>
            }
            text="Implementing a digital visitor management system offers numerous advantages, including the following."
          />
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((item, index) => (
              <li key={item.title} style={stagger(index % 3, 100)} className={`${revealUp} ${greyCard} ${liftGrey} flex flex-col gap-3 p-6`}>
                <div className="flex items-center gap-3">
                  <IconTile name={item.icon} bg={tone(index + 1).bg} color={tone(index + 1).color} />
                  <h3 className="text-lg font-semibold leading-snug text-[#1f1f1f]">{item.title}</h3>
                </div>
                <p className={`text-[15px] leading-[24px] ${mutedText}`}>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How Emsphere enhances workplace security — checklist */}
      <section aria-labelledby="enhances-heading" className="bg-[#eef4fd] px-4 py-14 md:px-12 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:gap-16">
          <div className={`${revealFromLeft} relative mx-auto w-full max-w-lg lg:w-[45%]`}>
            <div className={`${softCard} overflow-hidden bg-white p-4`}>
              <Image
                src={securityImg}
                alt="Two colleagues managing a visitor schedule beside a large hourglass and calendar board"
                className="h-auto w-full"
                sizes="(min-width: 1024px) 32rem, 90vw"
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-6 lg:w-[55%]">
            <SectionHeader
              id="enhances-heading"
              align="left"
              title={
                <>
                  How Emsphere Enhances Workplace Security with <span className="text-[#0077c2]">Visitor Management Software</span>
                </>
              }
              text="At Emsphere, we strive to improve workplace security with our comprehensive and thoughtfully designed visitor management software. Here’s how we contribute."
            />
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {securityPoints.map((point, index) => (
                <li
                  key={point}
                  style={stagger(index, 70)}
                  className={`${revealUp} group/card flex items-center gap-3 rounded-xl bg-white px-4 py-3.5 text-[15px] font-semibold text-[#1f1f1f] shadow-[inset_0_0_0_1px_#dfe7f3] ${motion} hover:-translate-y-0.5 hover:shadow-[inset_0_0_0_1.5px_#a7ddff,0_10px_22px_-12px_rgba(0,119,194,0.45)]`}
                >
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0077c2] text-white ${iconPop}`}>
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Challenges with traditional visitor management (dark band) */}
      <section aria-labelledby="challenges-heading" className="relative overflow-hidden bg-[#0f162a] px-4 py-14 text-white md:px-12 md:py-20">
        <div aria-hidden="true" className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#efb000]/20 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#0077c2]/30 blur-3xl" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-12">
          <header className={`${revealUp} mx-auto flex max-w-3xl flex-col items-center gap-3 text-center`}>
            <p className="text-lg font-semibold text-[#efb000]">Why Your Business Needs a Visitor Management System</p>
            <h2 id="challenges-heading" className="text-2xl font-semibold md:text-[2.1rem] md:leading-[44px]">
              Challenges with Traditional Visitor Management
            </h2>
            <p className="text-base leading-[25px] text-white/75 md:text-lg">Some common challenges associated with traditional visitor management include,</p>
          </header>
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {challenges.map((item, index) => (
              <li
                key={item.title}
                style={stagger(index, 100)}
                className={`${revealUp} group/card flex flex-col gap-3 rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/10 backdrop-blur ${motion} hover:-translate-y-1 hover:bg-white/[0.1]`}
              >
                <span className={`flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#ef4444]/15 text-[#ff8a80] ${iconPop}`}>
                  <svg viewBox="0 0 32 32" aria-hidden="true" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    {ICON_PATHS[item.icon]}
                  </svg>
                </span>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm leading-[22px] text-white/70">{item.text}</p>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-1 items-center gap-10 rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/10 md:p-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className={`${revealFromLeft} flex flex-col gap-4`}>
              <h3 className="text-2xl font-semibold md:text-[1.75rem]">
                The Shift to <span className="text-[#efb000]">Digital Solutions</span> for Visitor Management
              </h3>
              <p className="text-base leading-[26px] text-white/75">
                Upgrading to digital solutions refers to a futuristic move. While streamlining visitor movements is one aspect, what matters the most is
                enhancing security. Secure premises foster a fearless environment that fuels productivity, and efficiency.
              </p>
              <p className="text-base leading-[26px] text-white/75">
                Although these are indirect impacts, they matter in the long run. Emsphere’s visitor management principle is based on delivering tangible
                value to enterprises. The system is designed with modern security needs in mind and supports companies in various tactical and strategic
                ways, helping them strengthen security and improve the overall visitor experience.
              </p>
            </div>
            <div className={`${revealFromRight} mx-auto w-full max-w-md rounded-2xl bg-white p-4`}>
              <Image
                src={digitalImg}
                alt="Professionals reviewing digital visitor profile cards with verification check marks"
                className="h-auto w-full"
                sizes="(min-width: 1024px) 28rem, 90vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How Emsphere enhances workplace security — 3 pillars */}
      <section aria-labelledby="pillars-heading" className="px-4 py-12 md:px-12 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <SectionHeader
            id="pillars-heading"
            title={
              <>
                How Emsphere Enhances <span className="text-[#0077c2]">Workplace Security</span>
              </>
            }
          />
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {enhancements.map((item, index) => (
              <li key={item.title} style={stagger(index)} className={`${revealUp} ${goldCard} ${liftGold} relative flex flex-col gap-4 overflow-hidden p-7`}>
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1" style={{ background: tone(index * 2).color }} />
                <IconTile name={item.icon} bg={tone(index * 2).bg} color={tone(index * 2).color} className="h-14 w-14" iconClassName="h-8 w-8" />
                <h3 className="text-xl font-semibold leading-snug text-[#1f1f1f]">{item.title}</h3>
                <p className={`text-[15px] leading-[24px] ${mutedText}`}>{item.text}</p>
              </li>
            ))}
          </ul>
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
              FAQ’s for Visitor Management System
            </h2>
          </header>
          <ul className="flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <li key={faq.question} style={stagger(index % 5, 70)} className={`${revealUp} ${goldCard} ${liftGold} overflow-hidden`}>
                <details name="vms-faq" open={index === 0} className="hrms-faq group">
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

      {/* Ready to transform — image + copy + demo form */}
      <section aria-labelledby="transform-heading" className="relative overflow-hidden bg-[#0f162a] px-4 py-14 text-white md:px-12 md:py-20">
        <div aria-hidden="true" className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#0077c2]/30 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-[#efb000]/20 blur-3xl" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
          <div className={`${revealFromLeft} flex w-full flex-col gap-6 lg:max-w-xl`}>
            <SectionHeader
              id="transform-heading"
              dark
              align="left"
              title={
                <>
                  Ready to Transform Your Visitor Management? <span className="text-[#efb000]">Contact Emsphere Today!</span>
                </>
              }
              text="Yes. Upgrade to a smarter and safer workplace with Emsphere. Our customizable visitor management software is prepared to serve you. Connect with us via email ID and embark on your journey to improving visitor management and strengthening workplace security."
            />
            <div className="overflow-hidden rounded-2xl ring-1 ring-white/15">
              <Image
                src={receptionImg}
                alt="Security officer monitoring screens while visitors check in at the reception desk"
                className="h-auto w-full"
                sizes="(min-width: 1024px) 36rem, 100vw"
              />
            </div>
          </div>
          <div className={`${revealFromRight} w-full max-w-md lg:w-[40%] lg:max-w-[440px]`}>
            <DemoRequestForm
              product="Visitor Management System (emVisit)"
              title="Contact Now"
              subtitle="Request a demo of emVisit — our team will reach out to schedule it."
            />
          </div>
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
