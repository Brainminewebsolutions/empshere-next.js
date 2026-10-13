import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instrument_Sans, Inter } from "next/font/google";
import ScrollReveal from "@/components/ScrollReveal";
import BackToTop from "@/components/BackToTop";
import FlagshipProducts from "@/components/FlagshipProducts";
import FeatureCard from "@/components/FeatureCard";
import { ArrowsClockwise, BellRinging, CalendarCheck, ChartLineUp, ChartPieSlice, ClipboardText, Clock, Desktop, DeviceMobile, EnvelopeSimple, Eye, FileText, GearSix, HandCoins, HandTap, Headset, IdentificationCard, Lightbulb, ListMagnifyingGlass, MapPin, Medal, Notepad, SealCheck, ShieldCheck, SlidersHorizontal, Stack, Stamp, UserCheck, UsersFour, UsersThree } from "@phosphor-icons/react/ssr";

/* --------------------------------------------------------------------
   Images — every image this page uses lives in
   app/images/human-resource-management-system and is imported by name.
   -------------------------------------------------------------------- */

// Hero
import heroDashboard from "../images/human-resource-management-system/hero-hrms-dashboard-team-overview.webp";

// emRecruit / emWelcome / employee Information Management
import recruitImg from "../images/human-resource-management-system/emrecruit-candidate-shortlisting-laptop.webp";
import welcomeImg from "../images/human-resource-management-system/emwelcome-new-joiner-handshake.webp";
import employeeInfoImg from "../images/human-resource-management-system/employee-information-management-profiles.webp";

// emWorkforce Attendance and Leave Management
import attendanceImg from "../images/human-resource-management-system/emworkforce-attendance-calendar-laptop.webp";

// emPayRoll
import payrollImg from "../images/human-resource-management-system/empayroll-dashboard-laptop.webp";
// TODO: these two are cropped from the design screenshots (~475px source, upscaled
// 2x and sharpened). Replace with the full-resolution originals, same file names.
import mobileAppImg from "../images/human-resource-management-system/emmobile-ess-app-phone-in-hands.webp";
import performanceImg from "../images/human-resource-management-system/emperformance-analytics-dashboard-laptop.webp";

// emExit / emExpense / emHelpDesk / emWorkforce Analytics
import exitImg from "../images/human-resource-management-system/emexit-employee-carrying-belongings-box.webp";
import expenseImg from "../images/human-resource-management-system/emexpense-claims-dashboard-laptop.webp";
import helpdeskImg from "../images/human-resource-management-system/emhelpdesk-support-agents-headsets.webp";
import analyticsImg from "../images/human-resource-management-system/emworkforce-analytics-charts-illustration.webp";


// TODO: confirm production domain (layout.js also flags this) before deploying.
const PAGE_URL = "https://www.emsphere.com/human-resource-management-system/";
const PAGE_TITLE = "Human Resource Management System, SAP HRMS Software";
const PAGE_DESCRIPTION =
  "Emsphere's HRMS System in Pune: Automate and Simplify Your HR Operations with Our Easy-to-Use and Customizable Human Resource Management System!";
const PAGE_KEYWORDS = [
  "Human Resource Management System",
  "SAP HRMS Software",
  "HRMS System in Pune",
  "HRMS Software",
  "Human Resource Management Software",
  "Customizable HRMS System",
  "HR Operations Automation",
  "HR Software Pune",
  "Employee Management System",
  "Attendance and Leave Management",
  "Payroll Management Software",
  "Emsphere HRMS",
  "emHRMS",
  "Emsphere Technologies",
];
// TODO: replace with a dedicated 1200x630 OG image; the hero screenshot is a stand-in.
const OG_IMAGE = heroDashboard.src;

export const metadata = {
  // `absolute` skips the root layout's "%s | Emsphere Technologies" template,
  // matching the exact 51-character title from the SEO audit.
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  keywords: null,
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
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

// The design uses Instrument Sans (product cards, CTA) and Inter (buttons).
const instrumentSans = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument-sans" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fontInstrument = "font-[family-name:var(--font-instrument-sans)]";
const fontInter = "font-[family-name:var(--font-inter)]";

/* --------------------------------------------------------------------
   Shared surface styles (colors / shadows carried over from the design)
   -------------------------------------------------------------------- */

const goldCard =
  "bg-white rounded-xl shadow-[inset_0_0_0_0.789px_#EFB000,0px_3px_12px_-4px_rgba(0,0,0,0.07)]";
const greyCard =
  "bg-white rounded-2xl shadow-[inset_0_0_0_0.814px_#e5e5e5,0px_3px_12px_-4px_rgba(0,0,0,0.06)]";
const softCard =
  "rounded-[11px] shadow-[inset_0_0_0_0.601px_#e5e5e5,0px_2px_8px_-2px_rgba(0,0,0,0.05)]";
const mutedText = "text-[rgba(0,0,0,0.64)]";

/* --------------------------------------------------------------------
   Motion — mirrors the home page. Scroll reveals come from the
   `reveal-*` classes in globals.css (driven by <ScrollReveal>); hover
   effects use Tailwind's `translate` / `scale` utilities, which the
   reveal transition also animates, so both can sit on one element.
   -------------------------------------------------------------------- */

const ease = "ease-[cubic-bezier(0.16,1,0.3,1)]";
const motion = `transition-[translate,scale,box-shadow,background-color] duration-300 ${ease}`;
const revealUp = "reveal-on-scroll reveal-fade-up";
const revealFromLeft = "reveal-on-scroll reveal-fade-right";
const revealFromRight = "reveal-on-scroll reveal-fade-left";
const revealZoom = "reveal-on-scroll reveal-zoom-in";
const stagger = (index, step = 120) => ({ transitionDelay: `${index * step}ms` });

// Card lift on hover, one per surface so each keeps its own outline colour.
const liftGold = `group/card ${motion} hover:-translate-y-1 hover:shadow-[inset_0_0_0_1.5px_#EFB000,0px_8px_20px_-6px_rgba(239,176,0,0.2)]`;
const liftGrey = `group/card ${motion} hover:-translate-y-1.5 hover:shadow-[inset_0_0_0_0.814px_#dddddd,0px_10px_22px_-6px_rgba(0,0,0,0.1)]`;
// Panels hold their own hover cards, so they use a separate group name —
// hovering a panel zooms its image without popping every icon inside it.
const liftPanel = `group/panel ${motion} hover:-translate-y-1 hover:shadow-[inset_0_0_0_0.601px_#dddddd,0px_10px_22px_-6px_rgba(0,0,0,0.1)]`;
const iconPop =`transition-[scale] duration-300 ${ease} group-hover/card:scale-110`;
const imageZoom = `transition-[scale] duration-500 ${ease} group-hover/card:scale-[1.04]`;
const panelImageZoom = `transition-[scale] duration-500 ${ease} group-hover/panel:scale-[1.04]`;
const arrowNudge = `transition-[translate] duration-200 ${ease} group-hover/btn:translate-x-[3px]`;

const primaryButton = `group/btn inline-flex items-center justify-center gap-2 rounded-[9px] bg-[#EFB000] px-6 py-3 ${fontInter} font-semibold text-white ${motion} hover:-translate-y-0.5 hover:bg-[#d99e00] hover:shadow-[0_8px_18px_-4px_rgba(239,176,0,0.45)]`;
const learnMoreButton = `group/btn flex items-center justify-center gap-2 rounded-[5px] bg-[#EFB000] min-h-11 py-3 text-xs font-medium tracking-wide text-white shadow-[inset_0_0_0_1px_#b3b3b3] ${motion} hover:-translate-y-0.5 hover:bg-[#d99e00] hover:shadow-[inset_0_0_0_1px_#b3b3b3,0_8px_18px_-4px_rgba(239,176,0,0.45)]`;
const demoButton = `group/btn flex items-center justify-center gap-2 rounded-[5px] bg-[#EFB000] min-h-12 py-3.5 text-base font-semibold tracking-wide text-white shadow-[inset_0_0_0_1px_#b3b3b3] ${motion} hover:-translate-y-0.5 hover:bg-[#d99e00] hover:shadow-[inset_0_0_0_1px_#b3b3b3,0_8px_18px_-4px_rgba(239,176,0,0.45)]`;

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

// FAQ toggle: a plus that morphs into a minus when its <details> (group) opens —
// the icon turns a half-turn while the vertical bar collapses.
function FaqToggleIcon() {
  return (
    <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-[inset_0_0_0_0.394px_#f8bb18,0_0_0_0.394px_#f8bb18,0px_0px_15.775px_-7.099px_rgba(0,0,0,0.25)] transition-colors duration-300 group-open:bg-[#fff5d9]">
      <svg
        viewBox="0 0 22 22"
        aria-hidden="true"
        className={`h-5 w-5 transition-[rotate] duration-400 ${ease} group-open:rotate-180`}
        stroke="#000000"
        strokeWidth={2}
        strokeLinecap="round"
      >
        <path d="M4 11H18" />
        <path
          d="M11 4V18"
          className={`origin-center transition-[scale] duration-400 [transform-box:fill-box] ${ease} group-open:scale-y-0`}
        />
      </svg>
    </span>
  );
}

/* --------------------------------------------------------------------
   Reusable building blocks
   -------------------------------------------------------------------- */

function BrandName({ prefix = "em", name, color }) {
  return (
    <>
      {prefix}
      <span style={{ color }}>{name}</span>
    </>
  );
}

// Section icons from Phosphor (https://phosphoricons.com), white on the #EFB000 tile.
function IconTile({ icon: Icon, className = "h-12 w-12 rounded-lg", iconClassName = "h-7 w-7" }) {
  return (
    <span className={`flex shrink-0 items-center justify-center bg-[#EFB000] text-white shadow-sm ${iconPop} ${className}`}>
      <Icon weight="fill" aria-hidden="true" className={iconClassName} />
    </span>
  );
}

function MiniFeature({ icon, bg, title, text }) {
  return (
    <article
      className={`group/card flex items-center gap-3 rounded-[5px] p-3.5 ${motion} hover:-translate-y-0.5 hover:shadow-[0px_8px_20px_-8px_rgba(0,0,0,0.2)]`}
      style={{ background: bg }}
    >
      <IconTile icon={icon} className="h-11 w-11 rounded-[10px]" iconClassName="h-6 w-6" />
      <div>
        <h3 className={`text-sm font-medium leading-6 ${mutedText}`}>{title}</h3>
        <p className={`text-sm leading-[18px] ${mutedText}`}>{text}</p>
      </div>
    </article>
  );
}

function ShowcaseHeader({ eyebrow, title, titleBreak }) {
  return (
    <header>
      <p className="text-2xl font-semibold text-[#F8BB18] md:text-[1.7rem]">{eyebrow}</p>
      <h2 className="text-2xl font-semibold md:text-3xl md:leading-[39px]">
        {title} <br className="hidden lg:inline" />
        {titleBreak}
      </h2>
    </header>
  );
}

function ShowcasePanel({ bg, intro, cards, image, imageAlt }) {
  return (
    <div
      className="flex flex-col gap-6 rounded-2xl p-4 shadow-[inset_0_0_0_0.744px_#dddddd,0px_6px_18px_-6px_rgba(0,0,0,0.08)] md:p-8 lg:flex-row lg:items-center lg:p-10"
      style={{ background: bg }}
    >
      <div className="flex flex-col gap-4 lg:w-1/2">
        <p className={`text-base font-medium leading-[26.5px] ${mutedText}`}>{intro}</p>
        {cards.map((card) => (
          <article
            key={card.title}
            className={`group/card flex flex-col items-start gap-3 rounded-[14px] bg-white p-5 shadow-[inset_0_0_0_0.744px_#dddddd,0px_0px_14.874px_-6.693px_rgba(0,0,0,0.25)] sm:flex-row sm:items-center sm:gap-4 ${motion} hover:-translate-y-1 hover:shadow-[inset_0_0_0_0.744px_#dddddd,0px_14px_28px_-6px_rgba(0,0,0,0.18)]`}
          >
            <IconTile icon={card.icon} className="h-[3.25rem] w-[3.25rem] rounded-[10px]" iconClassName="h-8 w-8" />
            <div>
              <h3 className="text-lg font-semibold md:text-xl">{card.title}</h3>
              <p className="text-sm leading-[18px]">{card.text}</p>
            </div>
          </article>
        ))}
      </div>
      <div
        className={`group/card overflow-hidden rounded-[14px] bg-white shadow-[inset_0_0_0_0.744px_#dddddd,0px_0px_14.874px_-6.693px_rgba(0,0,0,0.25)] lg:w-1/2 ${motion} hover:-translate-y-1 hover:shadow-[inset_0_0_0_0.744px_#dddddd,0px_18px_40px_-9px_rgba(0,0,0,0.22)]`}
      >
        <Image src={image} alt={imageAlt} className={`h-auto w-full ${imageZoom}`} sizes="(min-width: 1024px) 50vw, 100vw" />
      </div>
    </div>
  );
}

function LearnMoreLink({ href }) {
  return (
    <Link href={href} className={`${learnMoreButton} w-full`}>
      LEARN MORE
      <ArrowOutlineIcon />
    </Link>
  );
}

/* --------------------------------------------------------------------
   Content
   -------------------------------------------------------------------- */

const heroFeatures = [
  {
    title: "Highly Configurable & Flexible",
    text: "Easy to Implement & modify. Available in on premises and cloud versions.",
    icon: SlidersHorizontal,
  },
  {
    title: "Unified System Experience",
    text: "A centralized system to manage end to end employee lifecycle bringing a unified experience across all modules.",
    icon: Desktop,
  },
  {
    title: "Audit & Compliances",
    text: "Keep track of Audit Trails. Stay on top of business critical transactions and workflow changes.",
    icon: ListMagnifyingGlass,
  },
];

const attendanceChips = [
  { label: "Approvals and workflows", icon: Stamp },
  { label: "Mail alerts", icon: EnvelopeSimple },
  { label: "Reminders on leave requests", icon: BellRinging },
  { label: "Week Off Management", icon: CalendarCheck },
];

const attendanceCards = [
  {
    title: "Shift Management",
    icon: ArrowsClockwise,
    points: [
      "Create different type of shifts, Default, Flexi, Cross/Night Shift, Break Shift",
      "Allocate shift both manually and automatically on rotation basis.",
    ],
    href: "/products/emworkforce",
  },
  {
    title: "Overtime Management",
    icon: Clock,
    points: [
      "OT calculation based on In-Out time or on hourly calculation",
      "OT Policy on holidays and week offs.",
      "OT Limit warning triggers and approvals.",
    ],
    href: "/products/emworkforce",
  },
  {
    title: "Leave Management",
    icon: Notepad,
    points: [
      "Configure Leave policies, L/SL/Maternity / paternity leaves and Comp offs etc.",
      "Configure leave rules",
      "Track leave and comp off transaction details for each employee.",
    ],
    href: "/products/emworkforce",
  },
];

const showcaseTabs = [
  {
    id: "empay",
    label: "emPay",
    eyebrow: "emPay",
    title: "Easy to use Payroll Software",
    titleBreak: "for enterprise HR teams",
    bg: "#fdf6e6",
    intro:
      "A highly accountable HR team needs a Hassle Free, accurate Payroll system to ensure accurate salary calculation adhering to all statutory compliance.",
    image: payrollImg,
    imageAlt: "Laptop on a desk showing the emPay dashboard with total payroll, recent payroll runs and a 100% compliance status",
    cards: [
      {
        title: "Pay on time",
        text: "Salary Calculation, computation, monthly reconciliation, arrears, claims , reimbursements, and loans all at one place with auto payslip generation. Save time and be accurate with emPay.",
        icon: HandCoins,
      },
      {
        title: "Compliances",
        text: "From PF, ESIc to PT and TDS all covered in one module. Be on the right side of compliance with emPay.",
        icon: ShieldCheck,
      },
    ],
  },
  {
    id: "emmobile",
    label: "emMobile ESS App",
    eyebrow: "emMobile ESS App",
    title: "Help employees self-serve",
    titleBreak: "anywhere anytime",
    bg: "#FDF6E6",
    intro: "A quick access mobile app for today’s millennials to access and update information on the go.",
    image: mobileAppImg,
    imageAlt: "Employee holding a smartphone showing the emMobile ESS app home screen with attendance, leave, payslip, personal info and documents tiles",
    cards: [
      {
        title: "Technology",
        text: "Works seamlessly on both Android and iOS, is GPS enabled for location based attendance tracking.",
        icon: DeviceMobile,
      },
      {
        title: "Power on finger tips",
        text: "From attendance, leaves, salary details, tax, investment declaration, reimbursement to leave applications and status, updating employee information or documents, all can be managed on emMobile.",
        icon: HandTap,
      },
    ],
  },
  {
    id: "emperformance",
    label: "emPerformance",
    eyebrow: "emPerformance",
    title: "Manage, Monitor, Measure",
    titleBreak: "performance with Analytics",
    bg: "#fdf6e6",
    intro:
      "Get deep insights into individual, team and organizational performance on a periodic basis to help identify goals vs actual achievement, gap analysis, behaviour analysis and training needs.",
    image: performanceImg,
    imageAlt: "Laptop showing the emPerformance overview dashboard with high performers, a performance distribution chart, goal achievement bars and a performance trend line",
    cards: [
      {
        title: "Appraisal for the deserving",
        text: "Fully automated self-serve appraiser module with details of both employee and the Reviewer with reports and email alerts.",
        icon: Medal,
      },
      {
        title: "Monitor everyone",
        text: "Monitor employee, supervisor, manager and department head at one place. Identify gaps, training needs to achieve revenue goals.",
        icon: Eye,
      },
    ],
  },
];

const skillStats = [
  {
    value: "85M",
    text: "According to a Korn Ferry study called Global Talent Crunch, the current talent shortage could create 85 Million unfilled jobs and close to $8.5 trillion in unrealized revenues if unaddressed by 2030.",
  },
  {
    value: "87M",
    text: "of McKinsey Global Survey respondents agree that they are already experiencing gaps now or are expecting them within a few years.",
  },
  {
    value: "62%",
    text: "of HR directors believe that workers will need to re-skill or upskill at least once a year to remain competitive and address the skills gap.",
  },
  {
    value: "95%",
    text: "of employees would stay at a company if it invested in their career development, as per the 2018 LinkedIn Learning Report.",
  },
];

const moduleSections = [
  {
    id: "emexit",
    name: "Exit",
    nameColor: "#F8BB18",
    tagline: "Make parting ways a good experience",
    intro: "An exit is an equally important part of the employee lifecycle, so why drop the ball at the end? Keep the brand experience intact.",
    image: exitImg,
    imageAlt: "Departing employee carrying a cardboard box of personal belongings out of the office",
    imageFirst: true,
    cards: [
      {
        title: "Settlement and Documentation",
        text: "Correction of payroll, employee data, Timely calculation of liabilities and dues if any, documentation like Exit Interview Form, Form 16 and Relieving letter, all can be processed on emExit with ease.",
        icon: FileText,
      },
      {
        title: "Automate with a human touch!",
        text: "emExit allows employee to place resignation request, track approval, get clearance and no dues check from all departments and SBUs, access separation and notice period policy, track progress with no need of manual follow up.",
        icon: GearSix,
      },
    ],
  },
  {
    id: "emexpense",
    name: "Expense",
    nameColor: "#F8BB18",
    tagline: "Travel & Spend Managed Better!",
    intro: "Today’s enterprise is data driven. Our aim is to help you with analytics for an aligned HR.",
    image: expenseImg,
    imageAlt: "Laptop showing the emSphere expense dashboard with recent claims and an expense category chart",
    imageFirst: false,
    cards: [
      {
        title: "Efficient and Productive Helpdesk",
        text: "Faster turnaround times on claim settlement increases employee satisfaction, brings transparency and with reduction in time spend on follow- ups increases over all productivity.",
        icon: Headset,
      },
      {
        title: "Single Platform",
        text: "Whether it is raising a claim, categorizing it as per spend or priority, automated responses to these claims, or escalation to unresolved ones, all this can be achieved in single platform.",
        icon: Stack,
      },
    ],
  },
  {
    id: "emhelpdesk",
    name: "HelpDesk",
    nameColor: "#F8BB18",
    tagline: "Efficient HR Desk!",
    intro: "Say NO to a buzzing HR desk, by automating HR queries.",
    image: helpdeskImg,
    imageAlt: "Two HR helpdesk agents wearing headsets answering employee queries at their desks",
    imageFirst: true,
    cards: [
      {
        title: "Efficient and Productive Helpdesk",
        text: "Faster turn-around times on queries increases employee satisfaction, frees HR time for routine tasks, brings transparency and with reduction in foot fall at HR desk increases productivity.",
        icon: Headset,
      },
      {
        title: "Single Platform",
        text: "Whether it is raising a query, classifying it as per category, sub category or priority, automated responses to these queries, or escalation to unresolved ones, all this can be achieved in single platform.",
        icon: Stack,
      },
    ],
  },
  {
    id: "emworkforce-analytics",
    name: "Workforce Analytics",
    nameColor: "#F8BB18",
    tagline: "For the enterprise that learns!",
    intro: "Today’s enterprise is data-driven. Our aim, is to help you with analytics for an aligned HR.",
    image: analyticsImg,
    imageAlt: "Illustration of workforce analytics with progress bars, a donut chart and a rising line graph",
    imageFirst: false,
    cards: [
      {
        title: "Leadership Dashboards",
        text: "All these analytics and reports help in preparation of leadership dashboards, which is required for stakeholders to make insight-driven decisions.",
        icon: ChartPieSlice,
      },
      {
        title: "Trends and Insights",
        text: "Get holistic analytics for various HRMS functions like recruitment and exit, attendance & leave, salary, overtime & cost, employee performance, gender & attrition, demographic, employee life cycle as detailed reports with alerts",
        icon: Lightbulb,
      },
    ],
  },
];

const faqs = [
  {
    question: "How long does it take for emSphere HRMS to be implemented?",
    answer:
      "emSphere HRMS is a ready-to-use HRMS platform that can be configured easily based on organization requirements. The actual time for implementation varies as per module & customization requirements, but typically it is between 6-10 weeks depending on the size & scale of implementation.",
  },
  {
    question: "Can the emSphere HRMS be customized?",
    answer:
      "emSphere HRMS is a fully in-house developed product, and we undertake customizations as required by organizations during emSphere HRMS implementations",
  },
  {
    question: "Does emSphere HRMS offer a payroll module?",
    answer:
      "Yes, the Payroll module is an add-on module part of emSphere HRMS software for companies who want to manage all aspects of HR applications in-house including payroll.",
  },
  {
    question: "Is a Mobile app available for emSphere HRMS?",
    answer: "All-important ESS portal options for managing Attendance, Leave & Payroll are available on IOS & Android platforms.",
  },
  {
    question: "emSphere HRMS is available as On-Premise License Or as a SaaS Cloud Subscription?",
    answer:
      "emSphere HRMS is offered in both options On-Premise license model hosted on customer premises as well as the cloud subscription model hosted on emSphere Microsoft Azure Cloud platform depending on the mode of implementation preferred by the organizations.",
  },
];


/* --------------------------------------------------------------------
   Page
   -------------------------------------------------------------------- */

export default function HumanResourceManagementSystemPage() {
  return (
    <main className={`${instrumentSans.variable} ${inter.variable} hrms-page w-full overflow-x-hidden bg-[#FFFFFA] font-sans text-[#4c4c4c]`}>
      <ScrollReveal root=".hrms-page" />

      {/* Hero */}
      <section
        aria-labelledby="hrms-hero-heading"
        className="bg-[#FFFFFA] px-4 py-10 md:px-12 md:py-16"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between lg:gap-12">
            <header className={`${revealFromLeft} flex flex-col gap-5 lg:max-w-lg`}>
              <h1 id="hrms-hero-heading" className="text-3xl font-semibold leading-tight md:text-4xl">
                A Single All-In One System <br className="hidden md:inline" />
                for your HR Needs
              </h1>
              <p className={`text-base leading-[25.5px] ${mutedText}`}>
                Select an HR System that helps you stay on top of your daily activities, saves you time to focus on people and create engaging experiences.
              </p>
              <Link href="/contact-us" className={`${primaryButton} self-start text-[15px]`}>
                Book a Demo
                <ArrowCircleIcon />
              </Link>
            </header>
            <div className={`${revealFromRight} w-full max-w-2xl lg:w-1/2 lg:max-w-none`}>
              <Image
                src={heroDashboard}
                alt="emSphere HRMS dashboard showing team attendance, absenteeism, late log-in and attrition metrics, payroll status, an interview timeline and a task list"
                className={`h-auto w-full ${motion} hover:-translate-y-1`}
                fetchPriority="high"
                loading="eager"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
            {heroFeatures.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                index={index}
                className={revealUp}
                style={stagger(index)}
                icon={<feature.icon weight="fill" />}
                titleAs="h2"
                title={feature.title}
                text={feature.text}
              />
            ))}
          </ul>
        </div>
      </section>

      {/* emRecruit / emWelcome / employee Information Management */}
      <section aria-label="Recruitment, onboarding and employee information" className="bg-[#FFFFFA] px-4 py-10 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:gap-11">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-14">
            <article className={`${revealFromLeft} ${softCard} ${liftPanel} flex flex-col gap-5 bg-[rgba(249,241,230,0.5)] p-4 md:p-6`}>
              <div className={`${softCard} overflow-hidden bg-white`}>
                <Image
                  src={recruitImg}
                  alt="Laptop screen of candidate profile cards with a magnifying glass highlighting a shortlisted candidate"
                  className={`h-auto w-full ${panelImageZoom}`}
                  sizes="(min-width: 768px) 45vw, 100vw"
                />
              </div>
              <header className="text-center">
                <h2 className="text-xl font-semibold md:text-2xl">
                  <BrandName name="Recruit" color="#f8bb18" />
                </h2>
                <p className="text-xl font-semibold md:text-2xl">Hire and work with the best</p>
              </header>
              <p className={`text-center text-base leading-6 ${mutedText}`}>
                A reliable module for everything from manpower requisition to resume parsing, scheduling interviews, rate candidates, rolling out offers, candidate documentation, background verification and vendor management.
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
                <MiniFeature
                  icon={IdentificationCard}
                  bg="#fff5d9"
                  title="Candidate Selection"
                  text="Simplifies recruitment, and documentation with a great interview experience."
                />
                <MiniFeature
                  icon={UsersThree}
                  bg="#FFF5D9"
                  title="Vendor Selection"
                  text="Simplifies hiring the best agencies and starts a smooth vendor relation."
                />
              </div>
            </article>

            <article className={`${revealFromRight} ${softCard} ${liftPanel} flex flex-col gap-5 bg-[#F9F1E680] p-4 md:p-6`}>
              <div className={`${softCard} overflow-hidden bg-white`}>
                <Image
                  src={welcomeImg}
                  alt="HR manager shaking hands with a smiling new joiner while colleagues applaud in the office"
                  className={`h-auto w-full ${panelImageZoom}`}
                  sizes="(min-width: 768px) 45vw, 100vw"
                />
              </div>
              <header className="text-center">
                <h2 className="text-xl font-semibold md:text-2xl">
                  <BrandName name="Welcome" color="#f8bb18" />
                </h2>
                <p className="text-xl font-semibold md:text-2xl">Ensure a warm welcome</p>
              </header>
              <p className={`text-center text-base leading-6 ${mutedText}`}>
                Make new joiner at home from the word go! Give easy access to offer letter, file documents, create digital signatures, enter details in HR portal, get mail alerts for orientation, asset issuance, team welcome and training.
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
                <MiniFeature
                  icon={SealCheck}
                  bg="#fff5d9"
                  title="Interactive Onboarding"
                  text="A great interactive and warm welcome experience."
                />
                <MiniFeature
                  icon={ClipboardText}
                  bg="#FFF5D9"
                  title="Easy Access"
                  text="Easy access to all information and next steps for the new member."
                />
              </div>
            </article>
          </div>

          <article className={`${revealUp} ${softCard} ${liftPanel} flex flex-col gap-6 bg-[#F9F1E680] p-4 md:p-6 lg:flex-row lg:items-center`}>
            <div className={`${softCard} overflow-hidden bg-white lg:w-[45%] lg:shrink-0`}>
              <Image
                src={employeeInfoImg}
                alt="HR professional working on a laptop beside an employee directory screen with verified employee profile cards"
                className={`h-auto w-full ${panelImageZoom}`}
                sizes="(min-width: 768px) 45vw, 100vw"
              />
            </div>
            <div className="flex flex-col gap-4">
              <header>
                <h2 className="text-2xl font-semibold leading-snug md:text-[1.75rem]">
                  employee <span className="text-[#f8bb18]">Information Management</span>
                </h2>
                <p className="text-xl font-semibold md:text-2xl">on finger tips</p>
              </header>
              <p className={`text-base leading-6 ${mutedText}`}>
                A few clicks and you know everything from employee joining date, general information, to employee history within the organization.
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <MiniFeature
                  icon={ChartLineUp}
                  bg="#fff5d9"
                  title="Upskill your employee"
                  text="Keep tab on employee skills and look out for opportunities to help employee upgrade skills."
                />
                <MiniFeature
                  icon={UsersFour}
                  bg="#FFF5D9"
                  title="Retain the best"
                  text="Promotion and rating history to know your best pool of employees."
                />
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* emWorkforce Attendance and Leave Management */}
      <section aria-labelledby="attendance-heading" className="bg-[#FFFFFA] px-4 py-10 md:px-12 md:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <header className={`${revealUp} mx-auto flex max-w-3xl flex-col gap-3 text-center`}>
            <h2 id="attendance-heading" className="text-2xl font-bold md:text-3xl">
              emWorkforce Attendance and Leave Management
            </h2>
            <p className="mx-auto max-w-xl text-lg md:text-xl">
              A rule-driven system that connects all modern technologies to stay on top of Time and Attendance management.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Photo card: the image fills the card as a background and the
                feature chips + banner sit on top of it in normal flow. */}
            <div className={`${revealZoom} ${greyCard} group/photo relative isolate flex flex-col overflow-hidden md:min-h-[26rem] lg:col-span-2 ${motion} hover:-translate-y-1.5 hover:shadow-[inset_0_0_0_0.814px_#dddddd,0px_14px_28px_-6px_rgba(0,0,0,0.18)]`}>
              <div className="relative aspect-[16/9] w-full md:absolute md:inset-0 md:-z-10 md:aspect-auto">
                <Image
                  src={attendanceImg}
                  alt="Employee using a laptop with an HR portal attendance calendar, surrounded by mail, settings, alert, calendar and location icons"
                  fill
                  className={`object-cover object-[70%_center] transition-[scale] duration-700 ${ease} group-hover/photo:scale-[1.04]`}
                  sizes="(min-width: 1024px) 60vw, 100vw"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between gap-4 bg-[linear-gradient(180deg,rgba(255,255,255,0)_33.679%,rgba(248,187,24,0.47)_100%)] p-4 md:gap-6 md:p-5">
                <div className="flex flex-col gap-2.5 md:w-3/5 lg:w-1/2">
                  <ul className="grid grid-cols-2 gap-2.5">
                    {attendanceChips.map((chip) => (
                      <li
                        key={chip.label}
                        className={`group/card flex min-h-16 items-center gap-2.5 rounded-[5px] bg-white px-2.5 py-3 text-xs font-medium leading-[17.5px] text-black shadow-[inset_0_0_0_0.84px_#dcdcdc,0px_2px_8px_-2px_rgba(0,0,0,0.06)] md:text-sm ${motion} hover:-translate-y-0.5 hover:shadow-[inset_0_0_0_0.84px_#EFB000,0px_6px_14px_-4px_rgba(0,0,0,0.1)]`}
                      >
                        <IconTile icon={chip.icon} className="h-9 w-9 rounded-md" iconClassName="h-5 w-5" />
                        <span>{chip.label}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="flex items-center justify-center gap-2 rounded-[10px] bg-[#0f162a] px-3 py-4 text-sm font-medium text-white shadow-[0px_3px_12px_-4px_rgba(0,0,0,0.12)]">
                    <IconTile icon={MapPin} className="h-7 w-7 rounded-md" iconClassName="h-4 w-4" />
                    Location based Holidays
                  </p>
                </div>

                <div className="flex flex-col gap-3 rounded-[10px] bg-[#FDF6E6] p-3.5 shadow-[inset_0_0_0_0.814px_#dcdcdc,0px_3px_12px_-4px_rgba(0,0,0,0.08)] sm:flex-row sm:items-center sm:gap-4">
                  <span aria-hidden="true" className="flex shrink-0 -space-x-1.5">
                    <span className="h-8 w-8 rounded-full bg-[#101f37]" />
                    <span className="h-8 w-8 rounded-full bg-[#1e7efe]" />
                    <span className="h-8 w-8 rounded-full bg-[#abb4c3]" />
                  </span>
                  <div className="flex-1 text-sm leading-[21px] sm:text-left">
                    <p className="font-medium">Customizable to Fit Your Business</p>
                    <p>Build a workforce management system that works for you</p>
                  </div>
                  <Link href="/products/emworkforce" className={`${learnMoreButton} shrink-0 px-10 py-2.5`}>
                    LEARN MORE
                    <ArrowOutlineIcon />
                  </Link>
                </div>
              </div>
            </div>

            <article style={stagger(1)} className={`${revealFromRight} ${greyCard} ${liftGrey} flex flex-col gap-5 p-5 md:p-6`}>
              <div className="flex flex-1 flex-col justify-center gap-4 px-1">
                <IconTile icon={UserCheck} className="h-14 w-14 rounded-[10px]" iconClassName="h-9 w-9" />
                <h3 className="text-xl font-semibold md:text-[1.375rem]">Attendance Management</h3>
                <ul className="flex list-disc flex-col gap-1.5 pl-5 text-base font-medium leading-[22px] md:text-[17px]">
                  <li>Integration with 3rd Party Devices and Biometrics</li>
                  <li>Geo Fencing</li>
                  <li>Attendance Capture via Mobile App and GPS.</li>
                </ul>
              </div>
              <LearnMoreLink href="/products/emworkforce" />
            </article>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {attendanceCards.map((card, index) => (
              <article key={card.title} style={stagger(index)} className={`${revealUp} ${greyCard} ${liftGrey} flex flex-col gap-4 p-5 sm:last:col-span-2 md:p-6 lg:last:col-span-1`}>
                <div className="flex items-center gap-3">
                  <IconTile icon={card.icon} className="h-11 w-11 rounded-[10px]" iconClassName="h-6 w-6" />
                  <h3 className="text-lg font-semibold md:text-xl">{card.title}</h3>
                </div>
                <ul className="flex list-disc flex-col gap-2 pl-5 text-base leading-[21px]">
                  {card.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="mt-auto pt-2">
                  <LearnMoreLink href={card.href} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* emPay / emMobile ESS App / emPerformance — tabbed */}
      <section aria-label="emPay, emMobile ESS App and emPerformance" className="bg-[#FFFFFA] px-4 py-10 md:px-12 md:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          {/* Pure-CSS tabs (no client JS): each tab label wraps a hidden radio,
              and globals.css shows the header/panel whose data-tab-item matches
              the checked radio. All three products stay in the HTML for crawlers,
              and the radios give arrow-key navigation between tabs for free. */}
          <div className={`${revealUp} hrms-showcase flex flex-col gap-6`}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              {showcaseTabs.map((tab, i) => (
                <div key={tab.id} data-tab-item={i} className="hrms-tab-swap">
                  <ShowcaseHeader eyebrow={tab.eyebrow} title={tab.title} titleBreak={tab.titleBreak} />
                </div>
              ))}

              {/* Phones: an even 3-column tab bar with a bottom rule. From sm up:
                  the design's plain text links, underlined when active. */}
              <div
                role="radiogroup"
                aria-label="HR products"
                className="grid grid-cols-3 border-b border-black/10 sm:-mx-1 sm:flex sm:flex-wrap sm:gap-x-3 sm:border-0 lg:shrink-0"
              >
                {showcaseTabs.map((tab, i) => (
                  <label
                    key={tab.id}
                    className="-mb-px flex min-h-12 cursor-pointer items-center justify-center rounded-t-md border-b-2 border-transparent px-1 text-center text-sm leading-tight text-black underline-offset-4 transition-colors duration-200 hover:text-[#854d0e] has-[:checked]:border-[#854d0e] has-[:checked]:font-medium has-[:checked]:text-[#854d0e] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#EFB000] sm:mb-0 sm:min-h-11 sm:border-b-0 sm:px-2 sm:text-lg sm:has-[:checked]:font-normal sm:has-[:checked]:underline md:text-xl"
                  >
                    <input
                      type="radio"
                      name="hrms-showcase-tab"
                      value={tab.id}
                      data-tab-index={i}
                      defaultChecked={i === 0}
                      className="sr-only"
                    />
                    {tab.label}
                  </label>
                ))}
              </div>
            </div>

            {showcaseTabs.map((tab, i) => (
              <div key={tab.id} data-tab-item={i} className="hrms-tab-swap">
                <ShowcasePanel bg={tab.bg} intro={tab.intro} cards={tab.cards} image={tab.image} imageAlt={tab.imageAlt} />
              </div>
            ))}
          </div>

          <Link href="/contact-us" className={`${revealUp} ${demoButton} w-full px-12 sm:mx-auto sm:w-auto`}>
            Book a Demo
            <ArrowOutlineIcon />
          </Link>
        </div>
      </section>

      {/* emSkills */}
      <section aria-labelledby="emskills-heading" className="bg-[#FFFFFA] px-4 py-10 md:px-12 md:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <header className={`${revealUp} mx-auto flex max-w-xl flex-col gap-3 text-center`}>
            <h2 id="emskills-heading" className="text-3xl font-semibold md:text-[2.375rem] md:leading-[49px]">
              <BrandName name="Skills" color="#efb000" />
            </h2>
            <p className="text-xl font-medium md:text-2xl">
              Build personalized learning experience based on employee interaction
            </p>
          </header>
          <div className={`${revealUp} relative isolate overflow-hidden rounded-3xl bg-[#fdf6e6] p-3 shadow-[inset_0_0_0_1px_#f0deba] sm:p-4 md:p-5`}>
            <span aria-hidden="true" className="absolute -right-24 -top-24 -z-10 h-64 w-64 rounded-full bg-[#efb000]/15 blur-3xl" />
            <span aria-hidden="true" className="absolute -bottom-24 -left-24 -z-10 h-64 w-64 rounded-full bg-[#efb000]/10 blur-3xl" />
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
              {skillStats.map((stat, index) => (
                <li key={stat.value} style={stagger(index, 110)} className={`${revealUp} flex`}>
                  <article className="group/card relative flex w-full flex-col gap-4 overflow-hidden rounded-2xl bg-white p-6 shadow-[0_6px_20px_-14px_rgba(0,0,0,0.2)] transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-[inset_0_0_0_1.5px_#efb000,0_24px_44px_-24px_rgba(176,125,0,0.45)] md:p-7">
                    {/* Top rule that fills on hover */}
                    <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[#efb000] transition-[scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-x-100" />
                    <p className={`${fontInter} origin-left bg-gradient-to-br from-[#f8bb18] to-[#c98f00] bg-clip-text text-5xl font-extrabold leading-none tracking-tight text-transparent transition-[scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-105 md:text-[3.25rem]`}>
                      {stat.value}
                    </p>
                    <span aria-hidden="true" className="h-[3px] w-10 rounded-full bg-[#f1e2b8] transition-[width,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:w-16 group-hover/card:bg-[#efb000]" />
                    <p className={`text-[15px] leading-[24px] ${mutedText}`}>{stat.text}</p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* emExit / emExpense / emHelpDesk / emWorkforce Analytics */}
      {moduleSections.map((section) => (
        <section key={section.id} aria-labelledby={`${section.id}-heading`} className="bg-[#FFFFFA] px-4 py-10 md:px-12">
          <div className={`mx-auto flex max-w-7xl flex-col gap-8 lg:items-center lg:gap-12 ${section.imageFirst ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
            <div className={`${section.imageFirst ? revealFromRight : revealFromLeft} flex flex-col gap-5 lg:w-1/2`}>
              <header>
                <h2 id={`${section.id}-heading`} className="text-2xl font-semibold md:text-[1.8rem] md:leading-[38px]">
                  <BrandName name={section.name} color={section.nameColor} />
                </h2>
                <p className="text-xl font-semibold md:text-[1.45rem]">{section.tagline}</p>
              </header>
              <p className={`text-[17px] font-medium leading-[25.5px] ${mutedText}`}>{section.intro}</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {section.cards.map((card, index) => (
                  <article
                    key={card.title}
                    style={stagger(index + 1)}
                    className={`${revealUp} group/card flex flex-col items-center gap-2 rounded-xl bg-white p-5 text-center shadow-[inset_0_0_0_0.67px_#EFB000,0px_3px_12px_-4px_rgba(0,0,0,0.07)] ${motion} hover:-translate-y-1 hover:shadow-[inset_0_0_0_1.5px_#EFB000,0px_8px_20px_-6px_rgba(239,176,0,0.2)]`}
                  >
                    <IconTile icon={card.icon} className="h-12 w-12 rounded-[10px]" iconClassName="h-8 w-8" />
                    <h3 className="text-lg font-semibold">{card.title}</h3>
                    <p className="text-sm leading-[18px]">{card.text}</p>
                  </article>
                ))}
              </div>
            </div>
            <Image
              src={section.image}
              alt={section.imageAlt}
              className={`${section.imageFirst ? revealFromLeft : revealFromRight} mx-auto h-auto w-full max-w-2xl lg:w-1/2 lg:max-w-none ${motion} hover:scale-[1.02]`}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </section>
      ))}

      {/* FAQ */}
      <section
        aria-labelledby="faq-heading"
        className="bg-[#FFFFFA] px-4 py-10 md:px-12 md:py-24"
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-8">
          <header className={`${revealUp} flex flex-col gap-2 text-center`}>
            <h2 id="faq-heading" className="text-3xl font-semibold md:text-[2.375rem] md:leading-[49px]">
              FAQ
            </h2>
            <p className="text-xl font-semibold md:text-3xl">Answers to your immediate HRMS questions</p>
          </header>
          <ul className="flex flex-col gap-4">
            {/* Native accordion, no client JS: the shared `name` makes the browser
                close the open <details> when another opens (one at a time), and
                the smooth open/close lives in globals.css (.hrms-faq). */}
            {faqs.map((faq, index) => (
              <li key={faq.question} style={stagger(index, 80)} className={`${revealUp} ${goldCard} ${liftGold} overflow-hidden`}>
                <details name="hrms-faq" open={index === 0} className="hrms-faq group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 sm:px-5 md:px-7 rounded-xl outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-[#EFB000] [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base font-semibold sm:text-lg md:text-xl">{faq.question}</h3>
                    <FaqToggleIcon />
                  </summary>
                  <p className="hrms-faq-answer px-4 pb-5 text-[15px] leading-[23px] sm:px-5 sm:text-base md:px-7 md:text-lg">{faq.answer}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Our Flagship Products */}
      <FlagshipProducts className="bg-[#FFFFFA]" />

      {/* Contact CTA */}
      {/* Mirrors the home page CTA (.cta / .ctaRow / .ctaCol / .ctaDivider in
          app/page.jsx): two equal columns centred either side of a short
          divider, stacking below 1081px, with 24px titles below 769px. */}
      <section aria-label="Contact emSphere" className="bg-[#FFFFFA] px-6 py-12 min-[769px]:py-[88px]">
        <div className="mx-auto flex max-w-275 flex-col items-center justify-center gap-9 text-black min-[1081px]:flex-row min-[1081px]:gap-20">
          {[
            { title: "Ready to talk?", cta: "Talk to Sale", reveal: revealFromLeft },
            { title: "Want to know more?", cta: "Book Demo", reveal: revealFromRight },
          ].map((col, index) => (
            <Fragment key={col.title}>
              {index > 0 && (
                <span aria-hidden="true" className="hidden h-30 w-0.5 shrink-0 bg-[rgba(139,138,138,0.4)] min-[1081px]:block" />
              )}
              <div className={`${col.reveal} flex w-full flex-1 flex-col items-center gap-6 text-center`}>
                <h2
                  className={`${fontInstrument} text-2xl leading-[1.5] font-semibold tracking-[-0.01em] min-[769px]:text-[38px] min-[769px]:whitespace-nowrap`}
                >
                  {col.title}
                </h2>
                <Link
                  href="/contact-us"
                  className={`group/btn inline-flex w-full max-w-65 items-center justify-center rounded-lg bg-[#EFB000] px-6 py-[13px] ${fontInter} text-[15px] font-semibold tracking-[0.02em] text-white ${motion} hover:-translate-y-0.5 hover:bg-[#d99e00] hover:shadow-[0_8px_18px_-4px_rgba(239,176,0,0.45)] active:translate-y-0 min-[769px]:w-auto min-[769px]:max-w-none min-[769px]:min-w-[145px] min-[769px]:px-[30px]`}
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
