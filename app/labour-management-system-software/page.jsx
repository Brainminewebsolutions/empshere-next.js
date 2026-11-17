import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instrument_Sans, Inter } from "next/font/google";
import {
  Buildings,
  ChartLineUp,
  CheckCircle,
  ClockCountdown,
  Cpu,
  Fingerprint,
  Gauge,
  Handshake,
  Leaf,
  Lightning,
  ListChecks,
  Receipt,
  Scales,
  SealCheck,
  ShieldCheck,
  Target,
  Warning,
} from "@phosphor-icons/react/ssr";
import ScrollReveal from "@/components/ScrollReveal";
import BackToTop from "@/components/BackToTop";
import FeatureCard from "@/components/FeatureCard";
import FlagshipProducts from "@/components/FlagshipProducts";
import LeadForm from "@/components/LeadForm";
import PhosphorIconTile from "@/components/PhosphorIconTile";
import heroImg from "../images/clms-attendance-shift-overtime-management/real-time-attendance-face-biometric-punch.webp";
import portalImg from "../images/clms-contractor-portal/hero-contractor-portal-dashboard.webp";
import securityDeskImg from "../images/clms-contractor-contract-employee-masters/aadhaar-blacklist-check-security-desk.webp";
import invoiceImg from "../images/clms-contractor-portal/contractor-invoice-summary-screen.webp";
import manpowerImg from "../images/workforce-management-system/consulting-session-sme-workforce-analytics.webp";
import complianceImg from "../images/payroll-management-solution/salary-monthly-reconciliation-reports.webp";
import attendanceDashImg from "../images/clms-attendance-shift-overtime-management/hero-attendance-shift-overtime-dashboard.webp";
import { TWITTER_SITE } from "@/lib/seo";
import { jsonLdScript, productPageJsonLd } from "@/lib/schema";

// Title and description are the page's Rank Math values on the current site.
const PAGE_URL = "https://www.emsphere.com/labour-management-system-software/";
const PAGE_TITLE = "Comprehensive Labour Management System (CLMS) Software";
const PAGE_DESCRIPTION =
  "Explore our Comprehensive Labour Management System (CLMS) designed to simplify workforce tracking, compliance, and contractor management. Contact Now!";
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
    site: TWITTER_SITE,
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
  "bg-white rounded-2xl shadow-[inset_0_0_0_0.789px_#EFB000,0px_3px_12px_-4px_rgba(0,0,0,0.07)]";
const mutedText = "text-[rgba(0,0,0,0.64)]";
const inlineLink = "font-medium text-[#b07d00] underline-offset-2 hover:underline";

const ease = "ease-[cubic-bezier(0.16,1,0.3,1)]";
const motion = `transition-[translate,scale,box-shadow,background-color] duration-300 ${ease}`;
const revealUp = "reveal-on-scroll reveal-fade-up";
const revealFromLeft = "reveal-on-scroll reveal-fade-right";
const revealFromRight = "reveal-on-scroll reveal-fade-left";
const revealZoom = "reveal-on-scroll reveal-zoom-in";
const stagger = (index, step = 120) => ({ transitionDelay: `${index * step}ms` });

const liftGold = `group/card ${motion} hover:-translate-y-1 hover:shadow-[inset_0_0_0_1.5px_#EFB000,0px_14px_28px_-10px_rgba(239,176,0,0.3)]`;
const arrowNudge = `transition-[translate] duration-200 ${ease} group-hover/btn:translate-x-[3px]`;
const primaryButton = `group/btn inline-flex items-center justify-center gap-2 rounded-[9px] bg-[#EFB000] px-6 py-3 ${fontInter} font-semibold text-white ${motion} hover:-translate-y-0.5 hover:bg-[#d99e00] hover:shadow-[0_8px_18px_-4px_rgba(239,176,0,0.45)]`;
const outlineButton = `group/btn inline-flex items-center justify-center gap-2 rounded-[9px] bg-white px-6 py-3 ${fontInter} font-semibold text-[#EFB000] shadow-[inset_0_0_0_1.5px_#EFB000] ${motion} hover:-translate-y-0.5 hover:bg-[#fffdf5]`;

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

function Eyebrow({ children, dark = false, className = "self-start" }) {
  return (
    <span
      className={`${fontInter} inline-flex items-center gap-2 ${className} rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] ${
        dark ? "bg-white/10 text-[#f8bb18] ring-1 ring-white/15" : "bg-white text-[#b07d00] shadow-[inset_0_0_0_1px_rgba(239,176,0,0.35)]"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#EFB000]" />
      {children}
    </span>
  );
}

function SectionHeader({ id, eyebrow, title, text, align = "center", dark = false, className = "" }) {
  const alignment = align === "left" ? "items-start text-left" : "items-center text-center mx-auto";
  return (
    <header className={`${revealUp} flex max-w-3xl flex-col gap-3 ${alignment} ${className}`}>
      {eyebrow && <Eyebrow dark={dark} className={align === "left" ? "self-start" : "self-center"}>{eyebrow}</Eyebrow>}
      <h2 id={id} className={`text-2xl font-semibold leading-tight md:text-[2.25rem] md:leading-[1.2] ${dark ? "text-white" : "text-[#1f1f1f]"}`}>
        {title}
      </h2>
      {text && <p className={`text-base leading-[26px] md:text-lg md:leading-[29px] ${dark ? "text-white/70" : mutedText}`}>{text}</p>}
    </header>
  );
}

/* --------------------------------------------------------------------
   Content — all copy from
   https://www.emsphere.com/labour-management-system-software/
   -------------------------------------------------------------------- */

const heroStats = [
  { value: "500+", label: "Clients trust emContract" },
  { value: "20+", label: "State & central laws covered" },
  { value: "100%", label: "Accurate Information" },
];

const introSections = [
  {
    id: "choosing-heading",
    eyebrow: "Why CLMS",
    title: (
      <>
        Choosing the Right <span className="text-[#efb000]">Comprehensive Labour Management System</span>
      </>
    ),
    image: portalImg,
    imageAlt: "Contractor portal dashboard on a desktop monitor showing active workers, licence validity and contract employee status",
    paragraphs: [
      "Main objective of Comprehensive Labour Management System (CLMS) is maintaining contractor and subcontractor details. Labour Management attendance is extremely tedious errand which connects with labour additionally require monstrous printed material.",
      "The goal of Labour Management Information System Software is keeping up contractual worker and subcontractor subtle elements. emSphere has comprehended the requirements of such organization and has propelled its Labour Management System.",
      "The framework helps in getting contract points of interest and permit subtle elements. This product is created by consolidating extensive examination, sees from the specialists of work expert fields and input of work consultancies. It will deal with your Organization all the more proficiently. A wide range of issues identified with Labour and Contractor Management with their Attendance issue is fathomed astoundingly by the product.",
    ],
  },
  {
    id: "lmis-heading",
    eyebrow: "LMIS",
    title: (
      <>
        Labor Management <span className="text-[#efb000]">Information System</span>
      </>
    ),
    image: securityDeskImg,
    imageAlt: "Security officer running an Aadhaar and blacklist check for a contract worker at the plant gate",
    paragraphs: [
      "Main objective of Labour Management System is maintaining contractor and subcontractor details. Labour Management attendance is extremely tedious errand which connects with labour additionally require monstrous printed material.",
      "The goal of Labour Management Information System Software is keeping up contractual worker and subcontractor subtle elements. emSphere has comprehended the requirements of such organization and has propelled its Labour Management System.",
      "The framework helps in getting contract points of interest and permit subtle elements. This product is created by consolidating extensive examination, sees from the specialists of work expert fields and input of work consultancies. It will deal with your Organization all the more proficiently. A wide range of issues identified with Labour and Contractor Management with their Attendance issue is fathomed astoundingly by the product",
    ],
  },
];

const advantages = [
  "Save time.",
  "Simplify the procurement contract process",
  "Allow for compliance with internal and external regulations",
  "Identify and manage risk",
  "Enhance the standardization of the contract process",
];

const benefits = [
  { text: "Fully automated LMS Labor Management Information System process from Attendance to Billing", icon: Lightning },
  { text: "Complete shift , overtime , comp- off management as per configurable company business rules & statutory norms", icon: ClockCountdown },
  { text: "Web based software with multiple locations & Contractor masters", icon: Buildings },
  { text: "Access to all legal & Statutory compliences", icon: Scales },
  { text: "Overtime claim verification through online workflow", icon: ListChecks },
  { text: "Productivity Benchmark", icon: Gauge },
  { text: "100% Accurate Information", icon: Target },
  { text: "Better manpower Planning & Workforce projection", icon: ChartLineUp },
  { text: "Paperless record keeping & calculations avoiding human errors", icon: Leaf },
];

const loopholes = ["proxy attendance", "manipulated man-hours", "inadequate manpower", "un-skilled labor supply"];

const industrialRelations = [
  "Contract Labour Management System today is utilized over a few parts and businesses. Contracting is an imperative procedure helps in improvising the bottom-line with keeping the liabilities limited.",
  "The difficulties of current organizations have frightened the custom of direct business connection between the representative and the business by blurring the path for elective enlistment procedures.",
  "It becomes extremely difficult to manually keep track of the attendance of these contract labor, several loopholes emerge in the manual system like proxy attendance, manipulated man-hours, inadequate manpower, un-skilled labor supply.etc.",
  "A Labour Management System Software (LMS) is composed remembering every one of these escape clauses and making foremost boss’ life simple and focused on free.",
  "The profitability and effectiveness gains from interest in Emsphere labour management system can yield positive ROI. Contract Labour Management Information System Software, Solution which is specifically designed for medium & large organizations helping them to manage all their contract worker management processes.",
];

const capabilities = [
  {
    id: "contractor-billing",
    label: "Contractor Billing & Contractor Portal",
    icon: Receipt,
    image: invoiceImg,
    imageAlt: "Contractor invoice summary screen with contractor-wise and work order-wise billing breakdown",
    paragraphs: [
      "The contractor billing summary is easily generated, including contractor-wise, work order-wise, and salary head-wise breakdowns, ensuring hassle-free billing and readily available data. The Contractor Billing & Contractor Portal like labour management information system promotes collaboration and ensures everyone is on the same page.",
      "Contractors have access to manage their resources and work through the Contractor Portal. They can upload their own master information and required document soft copies, which undergo an approval workflow by the principal employer team for contractor onboarding and new work orders. Using the Contractor Billing & Contractor Portal, contractors can efficiently oversee their financial transactions, track work progress, and handle administrative tasks.",
      "The labour management system allows for generating contractor first-time login credentials to their provided email IDs by the Admin user. With the Contractor Billing & Contractor Portal, managing access to the platform becomes a seamless process, ensuring security and data privacy.",
      "Contractor supervisors can upload contractor employee master data through bulk excel upload, along with required document soft copies. This process includes up to four levels of workflow, streamlining the contractor management process. The Contractor Billing & Contractor Portal enables supervisors to oversee employee data and ensure compliance with necessary documentation.",
      "Once the employee master data is uploaded, the employee code and name are synchronized with the respective biometric reader location for enrollment purposes. The Contractor Billing & Contractor Portal provides integrated features for smooth data synchronization and simplifies attendance and payroll management.",
      "The Contractor Billing & Contractor Portal also facilitates generating ID cards in a defined format. This feature enhances security measures and ensures easy identification of personnel on-site.",
      "By implementing the Contractor Billing & Contractor Portal, businesses can experience enhanced contractor management efficiency, streamlined billing processes, and improved collaboration between all parties involved. Simplify your contractor-related operations today with this user-friendly and powerful platform.",
    ],
  },
  {
    id: "manpower-planning",
    label: "Manpower planning & Manpower Cost analytics",
    icon: ChartLineUp,
    image: manpowerImg,
    imageAlt: "Workforce consultant reviewing manpower analytics charts on a tablet with an operations manager",
    paragraphs: [
      "Experience hassle-free manpower planning, requisition, and allocation digitally while leveraging the power of data analytics. Easily manage manpower requisitions based on category, skill requirements, desired manpower count, and any ad hoc needs.",
      "Review and approve manpower requests, and allocate approved requests to contractors for sourcing against work orders. Onboard candidates according to allocated requirements and upload master information for gate pass ID approval. Benefit from real-time monitoring of planned versus actual manpower, summary of shortages, and Manpower Cost Analytics.",
      <>
        With our streamlined{" "}
        <Link href="/contract-labour-management-system-software/" className={inlineLink}>
          Contract Labour Management System
        </Link>
        , you can experience a seamless and efficient process for manpower planning and requisition.
      </>,
      "Leverage the power of data analytics to make informed decisions and optimize your manpower allocation. Our platform empowers you with real-time insights, enabling you to monitor and compare the planned vs actual manpower effortlessly. By integrating Manpower Cost Analytics, you can ensure optimal resource utilization while staying within budget constraints.",
      "Once the manpower requests are reviewed and approved, you can conveniently allocate them to contactors for sourcing against specific work orders. Furthermore, our real-time monitoring feature provides you with valuable insights through Manpower Cost Analytics. You can continuously assess workforce performance and adjust allocation as needed to meet project demands. Additionally, our system generates a comprehensive summary of shortages, enabling you to address any gaps promptly and efficiently.",
      "Experience the benefits of hassle-free manpower planning, efficient requisition management, and data-driven allocation with emSphere Contract Labour Management System. By integrating Manpower Cost Analytics into your workforce management strategy, you can achieve cost-effectiveness without compromising on productivity and quality.",
      "Our system’s advanced capabilities include Manpower Planning & Manpower Cost Analytics, providing you with a comprehensive solution for workforce optimization. By embracing digital transformation and harnessing the power of data, you can elevate your manpower management process to a new level of efficiency. With real-time insights and seamless requisition handling, you can focus on maximizing productivity and achieving your business goals effectively. Experience the future of efficient manpower management with emSphere Contract Labour Management System.",
    ],
  },
  {
    id: "real-time-attendance",
    label: "Real Time Attendance",
    icon: Fingerprint,
    image: attendanceDashImg,
    imageAlt: "Attendance, shift and overtime dashboard for contract labour",
    paragraphs: [
      "Introducing Hassle-Free Real Time Attendance Tracking for Contract Labours!",
      "Effortlessly track employee punches for all shifts with pinpoint accuracy and generate precise Real Time Attendance reports. Experience the convenience of location-based attendance marking, real-time on-site tracking, and swift roster setup with emSphere’s Contract Labour Management System.",
      "Streamline Attendance Management with our seamless one-time setup process. Effortlessly manage Real Time Attendance procedures and unlock HR efficiency like never before. With Real Time Attendance tracking, you can ensure timely and accurate records of your contract labor workforce.",
      "Achieve Unparalleled Accuracy in Real Time Attendance Tracking by automating HR processes with ease. Effortlessly view punch records and calculate working hours in a flash. Our Real Time Attendance feature ensures that you have up-to-date information on employee attendance at all times.",
      "Stay Ahead with Real-Time Attendance Reports by seamlessly integrating with various biometric systems such as fingerprint attendance, fingerprint readers, access control systems, touchless face recognition systems, and more. Seamlessly manage employee attendance with our comprehensive labour management system, providing you with real-time insights and data for efficient decision-making.",
      "Experience Comprehensive Shift Management with our 360-degree coverage. From normal shifts to break shifts, flexi shifts, and auto shifts – we’ve got you covered with Real Time Attendance tracking for all shifts.",
      "Unlock Actionable Insights with a wide array of reports at your fingertips. From Live Real Time Attendance Reports to Attendance Muster Reports, Working Hour Register Reports, Man Hours OT Reports, Overtime Register Reports, Continuous Days Present Reports, Absenteeism Reports, All Swipe Reports, Monthly Performance Reports, Manual Attendance Reports, Monthly MIS Reports, Annual Manday’s Reports, Manpower Classification Reports, and Contractor Performance Reports – we provide the information you need in Real Time Attendance format.",
      "Get in touch with us today and elevate your attendance process to a new level of efficiency. Experience the power of Real Time Attendance tracking with emSphere Contract Labour Management System and ensure seamless workforce management.",
    ],
  },
  {
    id: "pf-esic-validation",
    label: "PF ESIC ECR Challan Auto Validation",
    icon: SealCheck,
    image: complianceImg,
    imageAlt: "HR and finance team reviewing statutory PF, ESIC and payroll reconciliation reports on a laptop",
    paragraphs: [
      "With our advanced AI and ML-based tools, we have revolutionized the process of validating PF (Provident Fund) and ESIC (Employee’s State Insurance Corporation) documents through PF ESIC ECR Challan auto Validation. These cutting-edge technologies allow us to achieve an unprecedented level of efficiency and accuracy in PF ESIC ECR Challan auto Validation, reducing the chances of any deviations or errors.",
      "Traditionally, validating PF and ESIC documents involved manual inspections and time-consuming processes. However, our AI and ML tools for PF ESIC ECR Challan auto Validation have automated and streamlined this entire procedure.",
      "By leveraging the power of artificial intelligence and machine learning in PF ESIC ECR Challan auto Validation, we are able to swiftly process and verify the authenticity of these crucial documents.",
      "The use of AI and ML enables us to analyze various data points, cross-reference information, and identify any discrepancies or inconsistencies rapidly in PF ESIC ECR Challan auto Validation. This not only saves significant time but also ensures a higher level of accuracy in PF ESIC ECR Challan auto Validation, leaving less room for errors or fraudulent activities.",
      "The speed at which our tools can validate PF and ESIC documents in PF ESIC ECR Challan auto Validation is truly remarkable. What used to take hours or even days can now be accomplished within a fraction of that time in PF ESIC ECR Challan auto Validation. This empowers businesses to expedite their processes, improve efficiency, and reduce administrative burdens in PF ESIC ECR Challan auto Validation.",
      "By incorporating AI and ML into document validation, we provide a reliable and efficient solution for PF ESIC ECR Challan auto Validation that enhances compliance, minimizes risks, and strengthens overall workforce management. With our technology for PF ESIC ECR Challan auto Validation, organizations can confidently ensure the validity and compliance of PF and ESIC documents, fostering a smoother and more secure work environment.",
    ],
  },
  {
    id: "hardware-software",
    label: "Complete Ownership Of Hardware & Software",
    icon: Cpu,
    image: heroImg,
    imageAlt: "Contract worker punching in on a face recognition terminal at a factory turnstile",
    paragraphs: [
      "Companies often struggle when managing separate vendors for software and hardware. This reliance on multiple sources for punching details and integrating live data creates significant challenges. However, we offer a unique solution as a one-stop destination for both software and hardware, taking complete ownership of both aspects, ensuring smooth functionality.",
      "With our integrated approach, we provide complete ownership of hardware and software, eliminating the hassle of dealing with multiple vendors",
      "Our specialized hardware integration automates custom messaging on devices, preventing incorrect punches. This improves HR team productivity and minimizes disputes caused by integration issues and live data. By entrusting us with complete ownership of your hardware and software, you can experience seamless integration and efficient data management. Optimize labour management with Labor Management System (LMS). Emsphere’s emcontract has user-friendly labour management system login through labour attendance app and software.",
      "By streamlining your organization’s software and hardware with our complete ownership, we provide valuable benefits like centralized support, simplified communication, and tailored comprehensive solutions. You no longer have to deal with the complexities of managing multiple vendors for different aspects of your operations. We take care of everything, ensuring a hassle-free experience and allowing you to focus on your core business activities. With our complete ownership of hardware and software, you can achieve enhanced productivity and a more integrated and streamlined workflow.",
    ],
  },
];

const jsonLd = productPageJsonLd({
  url: PAGE_URL,
  name: "emContract Comprehensive Labour Management System",
  description: PAGE_DESCRIPTION,
  subCategory: "Labour Management System Software",
  pageName: "Comprehensive Labour Management System",
  breadcrumbName: "Labour Management System Software",
});

/* --------------------------------------------------------------------
   Page
   -------------------------------------------------------------------- */

export default function LabourManagementSystemSoftwarePage() {
  return (
    <main className={`${instrumentSans.variable} ${inter.variable} hrms-page payroll-page lms-page w-full overflow-x-clip bg-[#FFFFFA] font-sans text-[#4c4c4c]`}>
      <ScrollReveal root=".lms-page" />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />

      {/* Hero — fills the viewport below the 88px header on desktop */}
      <section
        aria-labelledby="lms-hero-heading"
        className="relative isolate flex items-center overflow-hidden bg-[#FFFFFA] px-4 py-10 md:px-12 lg:h-[calc(100svh-88px)] lg:min-h-[600px] lg:max-h-[880px] lg:py-6"
      >
        <span aria-hidden="true" className="absolute -right-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-[#EFB000]/10 blur-3xl" />
        <span aria-hidden="true" className="absolute -bottom-48 -left-32 -z-10 h-[420px] w-[420px] rounded-full bg-[#EFB000]/[0.07] blur-3xl" />
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <header className={`${revealFromLeft} flex flex-col gap-5`}>
            <nav aria-label="Breadcrumb" className={`${fontInter} text-[13px] font-medium text-black/55`}>
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link href="/" className="transition-colors hover:text-[#f8bb18]">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">›</li>
                <li aria-current="page" className="text-black/80">
                  Labour Management System Software
                </li>
              </ol>
            </nav>
            <Eyebrow>emContract Software</Eyebrow>
            <h1 id="lms-hero-heading" className="text-[2rem] font-semibold leading-[1.15] text-[#1f1f1f] sm:text-[2.5rem] xl:text-[3rem]">
              Comprehensive <span className="text-[#f8bb18]">Labour Management System</span> (CLMS)
            </h1>
            <p className={`max-w-xl text-base leading-[27px] md:text-lg md:leading-[30px] ${mutedText}`}>
              emContract Software – Comprehensive Labour Management System (CLMS) – Save Time, Save Money and Ensure Success with Us!
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="/contact-us/" data-request-demo className={`${primaryButton} text-[15px]`}>
                Request a demo
                <ArrowCircleIcon />
              </a>
              <Link href="/contact-us/" className={`${outlineButton} text-[15px]`}>
                Contact us
              </Link>
            </div>
            <ul className="mt-2 grid max-w-xl grid-cols-3 gap-3 border-t border-black/10 pt-5">
              {heroStats.map((stat) => (
                <li key={stat.label} className="flex flex-col gap-1">
                  <span className={`${fontInter} text-2xl font-extrabold text-[#1f1f1f] md:text-[1.75rem]`}>{stat.value}</span>
                  <span className={`text-xs leading-[17px] md:text-[13px] ${mutedText}`}>{stat.label}</span>
                </li>
              ))}
            </ul>
          </header>

          <div className={`${revealFromRight} relative mx-auto w-full max-w-xl lg:max-w-none`}>
            <div className="relative overflow-hidden rounded-[28px] shadow-[0_40px_80px_-40px_rgba(15,22,42,0.55)] ring-1 ring-black/5">
              <Image
                src={heroImg}
                alt="Contract worker punching in on a face recognition terminal at a factory turnstile while the attendance dashboard shows live headcount"
                className="h-[300px] w-full object-cover sm:h-[380px] lg:h-[min(560px,calc(100svh-240px))]"
                sizes="(min-width: 1024px) 46vw, 100vw"
                priority
              />
            </div>
            <div className="payroll-float absolute -left-3 top-6 flex items-center gap-3 rounded-2xl bg-white p-2.5 pr-4 shadow-[0_16px_36px_-14px_rgba(0,0,0,0.35)] sm:-left-8">
              <PhosphorIconTile icon={Fingerprint} className="h-10 w-10 rounded-xl" iconClassName="h-6 w-6" />
              <div>
                <p className="text-sm font-semibold text-[#1f1f1f]">Real Time Attendance</p>
                <p className={`text-xs ${mutedText}`}>Face · Fingerprint · Access control</p>
              </div>
            </div>
            <div className="payroll-float absolute -bottom-4 right-3 flex items-center gap-3 rounded-2xl bg-[#0f162a] p-2.5 pr-4 text-white shadow-[0_16px_36px_-14px_rgba(0,0,0,0.5)] [animation-delay:1.5s] sm:-right-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFB000]">
                <ShieldCheck weight="fill" aria-hidden="true" className="h-6 w-6" />
              </span>
              <div>
                <p className="text-sm font-semibold">PF ESIC ECR Challan</p>
                <p className="text-xs text-white/70">Auto Validation with AI</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Choosing the right CLMS / Labor Management Information System — alternating splits */}
      {introSections.map((section, index) => (
        <section key={section.id} aria-labelledby={section.id} className="bg-[#FFFFFA] px-4 py-12 md:px-12 md:py-16">
          <div className={`mx-auto flex max-w-7xl flex-col items-center gap-10 lg:gap-16 ${index % 2 ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
            <div className={`${index % 2 ? revealFromRight : revealFromLeft} relative w-full lg:w-[46%]`}>
              <span aria-hidden="true" className={`absolute -z-10 h-full w-full rounded-[28px] bg-[#EFB000]/15 ${index % 2 ? "-left-4 top-4" : "-right-4 top-4"}`} />
              <Image
                src={section.image}
                alt={section.imageAlt}
                className="h-auto w-full rounded-[24px] object-cover shadow-[0_30px_60px_-34px_rgba(0,0,0,0.45)]"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
            <div className="flex w-full flex-col gap-6 lg:w-[54%]">
              <SectionHeader id={section.id} eyebrow={section.eyebrow} title={section.title} align="left" />
              <div className={`${revealUp} flex flex-col gap-4 text-base leading-[27px] md:text-[17px] md:leading-[29px] ${mutedText}`}>
                {section.paragraphs.map((paragraph, i) => (
                  <p key={i} className={i === 0 ? "border-l-[3px] border-[#EFB000] pl-4 font-medium text-[#1f1f1f]" : ""}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Advantages + Benefits */}
      <section aria-labelledby="value-heading" className="bg-[#FFFFFA] px-4 py-12 md:px-12 md:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <SectionHeader
            id="value-heading"
            eyebrow="Advantages & Benefits"
            title={
              <>
                What a <span className="text-[#efb000]">Comprehensive Labour Management System</span> Software delivers
              </>
            }
          />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <article className={`${revealFromLeft} relative isolate flex flex-col gap-6 overflow-hidden rounded-3xl bg-gradient-to-br from-[#efb000] to-[#d69e00] p-7 text-white shadow-[0_24px_48px_-24px_rgba(176,125,0,0.7)] md:p-9`}>
              <span aria-hidden="true" className="absolute -bottom-12 -right-12 -z-10 text-white/10">
                <Handshake weight="fill" className="h-56 w-56" />
              </span>
              <h3 className="text-xl font-semibold leading-snug md:text-2xl">Advantages of Comprehensive Labour Management System Software</h3>
              <ul className="flex flex-col gap-3.5">
                {advantages.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] font-medium leading-[23px] md:text-base">
                    <CheckCircle weight="fill" aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-white" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-4 border-t border-white/25 pt-6">
                <p className="text-[15px] leading-[23px] text-white/90">
                  Fully automated LMS Labor Management Information System process from Attendance to Billing.
                </p>
                <a
                  href="/contact-us/"
                  data-request-demo
                  className={`group/btn inline-flex items-center justify-center gap-2 self-start rounded-[9px] bg-white px-6 py-3 ${fontInter} text-[15px] font-semibold text-[#b07d00] ${motion} hover:-translate-y-0.5 hover:shadow-[0_8px_18px_-6px_rgba(0,0,0,0.3)]`}
                >
                  Request a demo
                  <ArrowCircleIcon fill="#b07d00" />
                </a>
              </div>
            </article>
            <article className={`${revealFromRight} ${goldCard} flex flex-col gap-6 p-7 md:p-9`}>
              <h3 className="text-xl font-semibold leading-snug text-[#1f1f1f] md:text-2xl">Benefits of using Comprehensive Labour Management System Software</h3>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {benefits.map((item, index) => (
                  <FeatureCard
                    key={item.text}
                    index={index}
                    compact
                    className={revealUp}
                    style={stagger(index % 3, 80)}
                    icon={<item.icon weight="fill" />}
                    title={item.text}
                  />
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* Industrial relations — cream band */}
      <section aria-labelledby="ir-heading" className="px-4 py-12 md:px-12 md:py-16">
        <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[#FDF6E6] px-6 py-12 shadow-[inset_0_0_0_1px_#f0deba] md:px-12 md:py-16">
          <span aria-hidden="true" className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[#EFB000]/20 blur-3xl" />
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div className="flex flex-col gap-6">
              <SectionHeader
                id="ir-heading"
                eyebrow="Industrial Relations"
                title="How Automated Labour Management Information System Software Maintain Gracious Industrial Relations?"
                align="left"
              />
              <div className={`${revealUp} flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-[inset_0_0_0_1px_#f0deba]`}>
                <p className="flex items-center gap-2 text-sm font-semibold text-[#b07d00]">
                  <Warning weight="fill" aria-hidden="true" className="h-5 w-5" />
                  Loopholes in the manual system
                </p>
                <ul className="flex flex-wrap gap-2">
                  {loopholes.map((item) => (
                    <li key={item} className="rounded-full bg-[#fff5d9] px-3 py-1.5 text-xs font-semibold capitalize text-[#1f1f1f] ring-1 ring-[#f0deba]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <ol className="flex flex-col gap-4">
              {industrialRelations.map((paragraph, i) => (
                <li key={i} style={stagger(i, 80)} className={`${revealUp} flex gap-4`}>
                  <span className={`${fontInter} mt-0.5 text-sm font-bold text-[#b07d00]`}>{String(i + 1).padStart(2, "0")}</span>
                  <p className={`text-[15px] leading-[26px] md:text-base md:leading-[27px] ${mutedText}`}>{paragraph}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Capabilities — tabs, as on the current site. Pure CSS (see the
          .hrms-showcase rules in globals.css): every panel stays in the HTML. */}
      <section aria-labelledby="capabilities-heading" className="bg-[#FFFFFA] px-4 py-12 md:px-12 md:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <SectionHeader
            id="capabilities-heading"
            eyebrow="Inside emContract"
            title={
              <>
                Everything your <span className="text-[#efb000]">contract labour</span> operation needs
              </>
            }
          />
          <div className={`${revealUp} hrms-showcase grid grid-cols-1 gap-6 xl:grid-cols-[300px_1fr] xl:items-start`}>
            <div role="radiogroup" aria-label="emContract capabilities" className="flex gap-2 overflow-x-auto pb-1 xl:sticky xl:top-28 xl:flex-col xl:overflow-visible xl:pb-0">
              {capabilities.map((tab, i) => (
                <label
                  key={tab.id}
                  className={`group/tab flex min-w-[220px] cursor-pointer items-center gap-3 rounded-2xl bg-white p-3.5 text-left text-sm font-semibold leading-snug text-[#1f1f1f] shadow-[inset_0_0_0_1px_#ececec] ${motion} hover:shadow-[inset_0_0_0_1.5px_#EFB000] has-[:checked]:bg-[#EFB000] has-[:checked]:text-white has-[:checked]:shadow-[0_18px_36px_-18px_rgba(176,125,0,0.7)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#EFB000] xl:min-w-0 xl:text-[15px]`}
                >
                  <input type="radio" name="lms-capability-tab" value={tab.id} data-tab-index={i} defaultChecked={i === 0} className="sr-only" />
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff5d9] text-[#b07d00] transition-colors group-has-[:checked]/tab:bg-white group-has-[:checked]/tab:text-[#b07d00]">
                    <tab.icon weight="fill" aria-hidden="true" className="h-5 w-5" />
                  </span>
                  {tab.label}
                </label>
              ))}
            </div>

            <div>
              {capabilities.map((tab, i) => (
                <article key={tab.id} id={tab.id} data-tab-item={i} className={`hrms-tab-swap ${goldCard} overflow-hidden`}>
                  <div className="lms-tab-top grid grid-cols-1 lg:h-[480px] lg:grid-cols-[1fr_0.9fr] xl:h-[460px]">
                    <div className="lms-tab-copy flex flex-col justify-center gap-4 p-6 md:p-8">
                      <span className={`${fontInter} text-xs font-bold uppercase tracking-[0.14em] text-[#b07d00]`}>
                        {String(i + 1).padStart(2, "0")} / {String(capabilities.length).padStart(2, "0")}
                      </span>
                      <h3 className="text-2xl font-semibold leading-tight text-[#1f1f1f] md:text-[1.75rem]">{tab.label}</h3>
                      <p className="text-base font-medium leading-[27px] text-[#1f1f1f] md:text-[17px]">{tab.paragraphs[0]}</p>
                    </div>
                    <div className="lms-tab-media relative order-first h-[260px] bg-[#fdf6e6] sm:h-[360px] lg:order-none lg:h-auto">
                      <Image src={tab.image} alt={tab.imageAlt} fill className="object-cover" sizes="(min-width: 1280px) 460px, (min-width: 1024px) 45vw, 100vw" />
                    </div>
                  </div>
                  <div className={`grid grid-cols-1 gap-x-8 gap-y-4 border-t border-[#f0deba] p-6 text-[15px] leading-[26px] md:grid-cols-2 md:p-8 ${mutedText}`}>
                    {tab.paragraphs.slice(1).map((paragraph, j) => (
                      <p key={j}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Request a demo */}
      <section aria-labelledby="demo-heading" className="bg-[#FFFFFA] px-4 py-12 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 rounded-[32px] bg-[#fdf6e6] p-6 shadow-[inset_0_0_0_1px_#f0deba] md:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:p-14">
          <div className="flex flex-col gap-6">
            <SectionHeader
              id="demo-heading"
              eyebrow="Get started"
              title={
                <>
                  Save Time, Save Money and <span className="text-[#efb000]">Ensure Success</span> with Us!
                </>
              }
              text="See emContract in action — from contractor onboarding and real time attendance to PF ESIC validation and contractor billing."
              align="left"
            />
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { icon: Lightning, text: "Fully automated from Attendance to Billing" },
                { icon: ClockCountdown, text: "Shift, overtime & comp-off as per your rules" },
                { icon: SealCheck, text: "Access to all legal & Statutory compliances" },
                { icon: Cpu, text: "Complete ownership of hardware & software" },
              ].map((item, index) => (
                <li key={item.text} style={stagger(index, 80)} className={`${revealUp} flex items-center gap-3 rounded-xl bg-white p-3.5 text-[14.5px] font-medium text-[#1f1f1f] shadow-[0_6px_18px_-12px_rgba(0,0,0,0.25)]`}>
                  <PhosphorIconTile icon={item.icon} className="h-9 w-9 shrink-0 rounded-lg" iconClassName="h-5 w-5" />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${revealZoom} mx-auto w-full max-w-md`}>
            <LeadForm compact product="emContract labour management system" title="Request a demo" subtitle="Our team will reach out to schedule your walkthrough." />
          </div>
        </div>
      </section>

      {/* Our Flagship Products */}
      <FlagshipProducts className="bg-[#FFFFFA]" />

      {/* Contact CTA — same as the other product pages */}
      <section aria-label="Contact emSphere" className="bg-[#FFFFFA] px-6 py-12 min-[769px]:py-[88px]">
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
                  data-request-demo=""
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
