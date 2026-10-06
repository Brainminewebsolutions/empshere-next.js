import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instrument_Sans, Inter } from "next/font/google";
import ScrollReveal from "@/components/ScrollReveal";
import BackToTop from "@/components/BackToTop";
import FlagshipProducts from "@/components/FlagshipProducts";
import DemoRequestForm from "@/components/DemoRequestForm";
import CardCarousel from "@/components/CardCarousel";
import PinnedScrollSection from "@/components/PinnedScrollSection";
import WhyChooseFlipCards from "@/components/WhyChooseFlipCards";

/* --------------------------------------------------------------------
   Images — every image this page uses lives in
   app/images/contract-labour-management-system-software and is imported by name.
   -------------------------------------------------------------------- */


// Hero dashboards
import dashboardLiability from "../images/contract-labour-management-system-software/dashboard-contractor-liability-document-status.webp";
import dashboardContractorOt from "../images/contract-labour-management-system-software/dashboard-contractor-wise-headcount-overtime.webp";
import dashboardDepartmentOt from "../images/contract-labour-management-system-software/dashboard-department-wise-headcount-overtime.webp";

// Clients
import logoApolloTyres from "../images/contract-labour-management-system-software/client-logo-apollo-tyres.webp";
import logoKirloskar from "../images/contract-labour-management-system-software/client-logo-kirloskar.webp";
import logoVarroc from "../images/contract-labour-management-system-software/client-logo-varroc.webp";
import logoMahindra from "../images/contract-labour-management-system-software/client-logo-mahindra.webp";
import logoSandvik from "../images/contract-labour-management-system-software/client-logo-sandvik.webp";
import logoDow from "../images/contract-labour-management-system-software/client-logo-dow.webp";
import logoBasf from "../images/contract-labour-management-system-software/client-logo-basf.webp";
import logoBlueStar from "../images/contract-labour-management-system-software/client-logo-blue-star.webp";
import logoYazaki from "../images/contract-labour-management-system-software/client-logo-yazaki.webp";
import logoCastrol from "../images/contract-labour-management-system-software/client-logo-castrol.webp";

// From Labour Analytics to Compliance
import complianceAutomationImg from "../images/contract-labour-management-system-software/compliance-automation-digital-checklist.webp";
import badgeGdpr from "../images/contract-labour-management-system-software/badge-gdpr-certified.webp";

// How emContract helps to manage compliance

// Turn key solution partners
import partnerSuprema from "../images/contract-labour-management-system-software/partner-logo-suprema.webp";
import partnerZkteco from "../images/contract-labour-management-system-software/partner-logo-zkteco.webp";
import partnerEssl from "../images/contract-labour-management-system-software/partner-logo-essl.webp";
import partnerIdemia from "../images/contract-labour-management-system-software/partner-logo-idemia.webp";
import partnerHoneywell from "../images/contract-labour-management-system-software/partner-logo-honeywell.webp";
import partnerTyco from "../images/contract-labour-management-system-software/partner-logo-tyco.webp";
import partnerJohnsonControls from "../images/contract-labour-management-system-software/partner-logo-johnson-controls.webp";
import partnerG4s from "../images/contract-labour-management-system-software/partner-logo-g4s.webp";
import partnerHanvon from "../images/contract-labour-management-system-software/partner-logo-hanvon-faceid.webp";
import partnerVirdi from "../images/contract-labour-management-system-software/partner-logo-virdi.webp";
import partnerNitgen from "../images/contract-labour-management-system-software/partner-logo-nitgen.webp";
import { ArrowsOut, CalendarCheck, ChartBar, ChartLineUp, ChartPieSlice, Clock, Cloud, CursorClick, EnvelopeSimple, FileText, FirstAidKit, GearSix, HardDrives, HardHat, Headset, IdentificationCard, ListChecks, ListMagnifyingGlass, Money, PlugsConnected, Scales, ShieldCheck, SlidersHorizontal, Sparkle, Stamp, Star, TrendUp, Trophy, UserCheck, UserGear, UsersThree } from "@phosphor-icons/react/ssr";


// Title and description are the page's Rank Math values on the current site.
const PAGE_URL = "https://www.emsphere.com/contract-labour-management-system-software/";
const PAGE_TITLE = "Contract Labour Management System, Contract Worker";
const PAGE_DESCRIPTION =
  "A Contract Labour Management System (CLMS) helps automate and manage contract workers' attendance, compliance, wages, & documentation efficiently.";
const OG_IMAGE = complianceAutomationImg.src;

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
   Shared surfaces + motion (same language as the HRMS / payroll pages)
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
const iconPop = `transition-[scale] duration-300 ${ease} group-hover/card:scale-110`;
const arrowNudge = `transition-[translate] duration-200 ${ease} group-hover/btn:translate-x-[3px]`;

const primaryButton = `group/btn inline-flex items-center justify-center gap-2 rounded-[9px] bg-[#0077c2] px-6 py-3 ${fontInter} font-semibold text-white ${motion} hover:-translate-y-0.5 hover:bg-[#0061af] hover:shadow-[0_8px_18px_-4px_rgba(0,119,194,0.45)]`;
const outlineButton = `group/btn inline-flex items-center justify-center gap-2 rounded-[9px] bg-white px-6 py-3 ${fontInter} font-semibold text-[#efb000] shadow-[inset_0_0_0_1.5px_#efb000] ${motion} hover:-translate-y-0.5 hover:bg-[#fffdf5]`;

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

// FAQ toggle (same as the HRMS page): plus morphs into minus when open.
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

// Section icons from Phosphor (https://phosphoricons.com), white on the #EFB000 tile.
const ICONS = {
  automation: GearSix,
  shield: ShieldCheck,
  master: UsersThree,
  clock: Clock,
  dashboard: ChartPieSlice,
  wages: Money,
  star: Star,
  planning: ChartLineUp,
  contractor: HardHat,
  reports: FileText,
  mail: EnvelopeSimple,
  integration: PlugsConnected,
  ai: Sparkle,
  law: Scales,
  attendance: UserCheck,
  calendar: CalendarCheck,
  performance: TrendUp,
  tasks: ListChecks,
  selfservice: UserGear,
  analytics: ChartBar,
  tailored: SlidersHorizontal,
  cloud: Cloud,
  scale: ArrowsOut,
  pointer: CursorClick,
  headset: Headset,
  trophy: Trophy,
  server: HardDrives,
  complianceReports: ListMagnifyingGlass,
  pfEsic: IdentificationCard,
  licenseExpiry: Stamp,
  oshas: FirstAidKit,
};

function LineIcon({ name, className = "h-6 w-6" }) {
  const Icon = ICONS[name];
  return <Icon weight="fill" aria-hidden="true" className={className} />;
}

function IconTile({ name, className = "h-12 w-12 rounded-[10px]", iconClassName = "h-6 w-6" }) {
  return (
    <span className={`flex shrink-0 items-center justify-center bg-[#EFB000] text-white shadow-sm ${iconPop} ${className}`}>
      <LineIcon name={name} className={iconClassName} />
    </span>
  );
}

function SectionHeader({ id, eyebrow, title, text, align = "center", className = "", dark = false }) {
  const alignment = align === "center" ? "mx-auto text-center items-center" : "items-start";
  return (
    <header className={`${revealUp} flex max-w-3xl flex-col gap-3 ${alignment} ${className}`}>
      {eyebrow && (
        <span
          className={`inline-flex items-center text-xs font-bold uppercase tracking-[0.14em] ${
            dark ? "text-[#efb000]" : "text-[#b07d00]"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2 id={id} className={`text-2xl font-semibold md:text-[2.1rem] md:leading-[44px] ${dark ? "text-white" : ""}`}>
        {title}
      </h2>
      {text && <p className={`text-base leading-[25px] md:text-lg md:leading-[28px] ${dark ? "text-white/75" : mutedText}`}>{text}</p>}
    </header>
  );
}

// A vibrant solid palette the cards cycle through (blue / green / gold / red / violet).
/* --------------------------------------------------------------------
   Content — all copy from
   https://www.emsphere.com/contract-labour-management-system-software/
   -------------------------------------------------------------------- */

const clients = [
  { name: "Apollo Tyres", logo: logoApolloTyres },
  { name: "Kirloskar", logo: logoKirloskar },
  { name: "Varroc", logo: logoVarroc },
  { name: "Mahindra", logo: logoMahindra },
  { name: "Sandvik", logo: logoSandvik },
  { name: "Dow", logo: logoDow },
  { name: "BASF", logo: logoBasf },
  { name: "Blue Star", logo: logoBlueStar },
  { name: "Yazaki", logo: logoYazaki },
  { name: "Castrol", logo: logoCastrol },
];

const pillars = [
  {
    title: "Automation",
    text: "A feature packed CLMS that automates most crucial parts of contract labour management to minimize errors, bring high accuracy in manpower management, wages calculation.",
    icon: "automation",
  },
  {
    title: "Compliance",
    text: "A highly effective system that collects all documentations, checks all the boxes in the process and keeps your business within the compliances.",
    icon: "shield",
  },
];

const modules = [
  { title: "Contractor and Contract Employee Master", text: "Module to capture details of two most important entities in a large labour workforce environment.", icon: "master" },
  { title: "Shift and Overtime Management", text: "Every penny saved is a penny earned, especially when it is on a big scale. Manage Shift and OT accurately here.", icon: "clock" },
  { title: "Real Time Dashboards, Attendance and Compliance", text: "A dedicated module to capture attendance both within premises and work areas and keep compliance in check.", icon: "dashboard" },
  { title: "Wages and Contractor Billing", text: "Remove billing errors by eliminating manual calculations.", icon: "wages" },
  { title: "Workflows Performance Rating", text: "Stay on top of both internal and external teams, track monitor and measure all.", icon: "star" },
  { title: "Man-power Planning and Analytics", text: "Get projections, Coordinate and be ready to meet man power requirements with analytics.", icon: "planning" },
  { title: "Contractor Module", text: "Let contractor handle workers documentation, generate bills on their own.", icon: "contractor" },
  { title: "Reports in Statutory Formats", text: "Get reports in the format you need and as per government norms.", icon: "reports" },
  { title: "Mail Notifications", text: "Never miss an important update with e-mail notifications. Set rules to stay on top of tasks and processes.", icon: "mail" },
  { title: "Integration", text: "Integrate with leading ERPs, third-party attendance tracking devices, biometrics, face IDS etc.", icon: "integration" },
  { title: "Easy PF and ESIC comparison with AI", text: "Save hours spent comparing PF and ESIC for ECR filing, our AI does that for you with elan!", icon: "ai" },
  { title: "Labour Law Compliance", text: "We are high on automation, simplicity and helping you stay within government compliance.", icon: "law" },
];

const complianceItems = [
  {
    title: "Compliance Reports",
    text: "Manage all that you have to maintain as a Principal employer namely Registers for Contractor, Overtime, Wage Slips, Muster Role and Employer ID.",
    icon: "complianceReports",
  },
  {
    title: "PF/ESIC",
    text: "Give Login to contractor and enable to upload the challan for ECR and verify details submitted by contractor automatically.",
    icon: "pfEsic",
  },
  {
    title: "License Expiry",
    text: "Get timely alerts for expiry of license, WC between contractor and employee. Get notified if any employee tries to work without any week off.",
    icon: "licenseExpiry",
  },
  {
    title: "OSHAS",
    text: "Manage health and safety compliance by capturing Background check, Policy Verification, Medical verification, Induction , Training details, PPE details etc",
    icon: "oshas",
  },
];

const partners = [
  { name: "Suprema", logo: partnerSuprema },
  { name: "ZKTeco", logo: partnerZkteco },
  { name: "eSSL", logo: partnerEssl },
  { name: "IDEMIA", logo: partnerIdemia },
  { name: "Honeywell", logo: partnerHoneywell },
  { name: "Tyco", logo: partnerTyco },
  { name: "Johnson Controls", logo: partnerJohnsonControls },
  { name: "G4S", logo: partnerG4s },
  { name: "Hanvon FaceID", logo: partnerHanvon },
  { name: "Virdi", logo: partnerVirdi },
  { name: "Nitgen", logo: partnerNitgen },
];


const dashboards = [
  { title: "Contractor Liability & Document Status", image: dashboardLiability, alt: "CLMS dashboard table of contractor liability and document submission percentage by month" },
  { title: "Contractor Wise Head Count and OT", image: dashboardContractorOt, alt: "CLMS dashboard of contractor-wise head count and overtime across morning, afternoon and night shifts" },
  { title: "Department Wise Head Count and OT", image: dashboardDepartmentOt, alt: "CLMS dashboard of department-wise head count and overtime across morning, afternoon and night shifts" },
];

const features = [
  {
    title: "Real-time Attendance Tracking",
    text: "With Emsphere's LMS, employers can effortlessly track employee attendance in real-time. Gone are the days of manual attendance registers and tedious paperwork. The system provides accurate insights into employee attendance patterns, enabling businesses to optimize staffing levels and ensure compliance with labor regulations.",
    icon: "attendance",
  },
  {
    title: "Automated Shift Scheduling",
    text: "Say goodbye to scheduling headaches with Emsphere's automated shift scheduling feature. The LMS allows managers to create, modify, and communicate shift schedules with ease. By factoring in employee availability, skill sets, and labor laws, the system ensures optimal staffing levels while minimizing conflicts and overtime costs.",
    icon: "calendar",
  },
  {
    title: "Performance Management",
    text: "Emsphere's LMS goes beyond basic attendance tracking by offering robust performance management tools. Managers can set performance targets, track progress, and provide timely feedback to employees. This fosters a culture of accountability and productivity, ultimately driving organizational success.",
    icon: "performance",
  },
  {
    title: "Task Management",
    text: "Efficient task management is essential for maximizing productivity in the workplace. Emsphere's LMS streamlines task allocation, monitoring, and reporting processes. Managers can assign tasks to specific employees, track their progress, and ensure timely completion, enhancing overall efficiency and accountability.",
    icon: "tasks",
  },
  {
    title: "Compliance Monitoring",
    text: "Staying compliant with labor regulations is non-negotiable for businesses. Emsphere's LMS simplifies compliance monitoring by automating record-keeping and generating comprehensive reports. From overtime tracking to statutory holiday calculations, the system ensures adherence to legal requirements, mitigating the risk of penalties and lawsuits.",
    icon: "shield",
  },
  {
    title: "Employee Self-Service Portal",
    text: "Empowering employees to manage their own information can significantly reduce administrative burden. Emsphere's LMS includes a user-friendly self-service portal where employees can view their schedules, request time off, and update personal details. This promotes transparency, enhances communication, and improves overall employee satisfaction.",
    icon: "selfservice",
  },
  {
    title: "Data Analytics and Insights",
    text: "Data-driven decision-making is the cornerstone of successful workforce management. Emsphere's LMS provides advanced analytics and reporting capabilities, allowing businesses to gain valuable insights into labor trends, performance metrics, and cost optimizations. Armed with this information, organizations can make informed strategic decisions to drive growth and profitability.",
    icon: "analytics",
  },
];

const reasons = [
  {
    title: "Tailored Solutions",
    text: "Emsphere Technologies understands that every business is unique, with its own set of challenges and requirements. That's why we offer tailored solutions that align with your specific needs. Whether you're a small startup or a multinational corporation, our LMS can be customized to suit your industry, size, and operational complexities.",
    icon: "tailored",
  },
  {
    title: "Cutting-edge Technology",
    text: "At Emsphere, we stay at the forefront of technological advancements to deliver state-of-the-art solutions to our clients. Our CLMS leverages cutting-edge technology, including cloud computing, artificial intelligence, and data analytics, to provide robust features and seamless user experience.",
    icon: "cloud",
  },
  {
    title: "Scalability",
    text: "As your business grows, so do your workforce management needs. Emsphere's Contract Labour Management System (CLMS) is designed to scale effortlessly, accommodating your expanding workforce and evolving requirements without compromising performance or efficiency. Whether you're adding new employees, opening new locations, or diversifying your operations, our scalable solution grows with you.",
    icon: "scale",
  },
  {
    title: "User-friendly Interface",
    text: "We understand that ease of use is paramount for user adoption and productivity. That's why we prioritize user experience in the design of our LMS. With an intuitive interface and straightforward navigation, Emsphere's solution is easy to learn and use, minimizing training time and maximizing efficiency.",
    icon: "pointer",
  },
  {
    title: "Comprehensive Support",
    text: "Implementing a new CLMS can be daunting, but with Emsphere Technologies, you're not alone. Our dedicated support team is committed to ensuring a smooth transition and ongoing success. From implementation assistance to troubleshooting and training, we provide comprehensive support every step of the way, ensuring that you get the most out of your investment.",
    icon: "headset",
  },
  {
    title: "Compliance Assurance",
    text: "Staying compliant with labor laws and regulations is critical for businesses to avoid penalties and legal issues. Emsphere's CLMS comes equipped with robust compliance features, including automated record-keeping, regulatory updates, and audit trails, ensuring that your organization remains compliant with ease.",
    icon: "shield",
  },
  {
    title: "Proven Track Record",
    text: "With a proven track record of success and satisfied clients across various industries, Emsphere Technologies is a trusted partner in workforce management. Our testimonials and case studies speak volumes about the impact of our solutions in driving efficiency, productivity, and profitability for our clients.",
    icon: "trophy",
  },
];

const faqs = [
  {
    question: "Can Contractor Bills be generated from the CLMS system?",
    answer: [
      "Yes. emSphere Contract Labour Management System (CLMS) is a complete system that manages contract employee wages calculation, contractor services charges configurations & statutory deductions to provide a complete billing summary for contractors. Costs to the company CTC department wise including wages, contractor charges & statutory deductions are available in CLMS reports.",
    ],
  },
  {
    question: "Are the dashboards & Reports available with real-time data?",
    answer: [
      "Yes. emSphere Contract Labour Management System (CLMS) has a unique configuration to derive shift-wise, department-wise & contractor-wise real-time update information on dashboards & reports.",
    ],
  },
  {
    question: "What are the compliances managed in emSphere CLMS software?",
    answer: [
      "emSphere Contract Labour Management System (CLMS) can generate all Central & State wise legal statutory report formats like Form B, Form D, Annual return of principal employer, Interstate migrant labours, etc. as well as manage blocking access with mail notifications for compliance violations like contract license expiry, work order expiry, continuous working, Overtime limit, etc.",
    ],
  },
  {
    question: "Is the software integrated with SAP ERP & Existing biometric devices?",
    answer: [
      "Yes, we offer end-to-end integrations between SAP, ERP & client’s existing biometric devices for complete seamless integrations with data fetch and update functionality.",
    ],
  },
  {
    question: "How different is emSphere Contract labour management software system in India from others?",
    answer: [
      "We always put customers first. The product continues to evolve over the last 5 years and offers complete contractor lifecycle management from Onboarding to Billing with MIS dashboards and compliance reports",
    ],
  },
  {
    question: "How long does it take for emSphere contract labour management software to be implemented?",
    answer: [
      "emSphere HRMS is ready to use the Contract Labour Management System (CLMS) platform which can be configured easily based on organization requirements. The actual time for implementation varies as per module & customization requirements, but typically it is between 6-8 weeks depending on the size & scale of implementation.",
    ],
  },
  {
    question: "How does the contract labor management system help streamline compliance processes, leading to savings in time and resources?",
    answer: [
      "The system plays a vital role in this by automating tasks, offering real-time insights, and integrating with the Visitor Management System. As a result, compliance workflows become more efficient, cutting down on manual efforts and ensuring adherence to regulations, which ultimately saves valuable time and resources.",
    ],
  },
  {
    question: "What is contract labor management, and what impact does it have on business operations?",
    answer: [
      "Contract labor management involves overseeing the recruitment, hiring, scheduling, and payment of workers who are employed on a contractual basis rather than as full-time employees. This includes managing temporary workers, freelancers, and independent contractors.",
      "The impact of contract labor management on business operations can be significant. It allows companies to access specialized skills as needed, scale their workforce according to project demands, and reduce overhead costs associated with full-time employees. However, it also brings challenges such as maintaining consistent quality, managing compliance with labor laws, and ensuring effective communication and integration within the organization. Efficient contract labor management is crucial for optimizing productivity and maintaining flexibility in today's dynamic business environment.",
    ],
  },
  {
    question: "Define labor management and explain its significance for organizations.",
    answer: [
      "Labor management refers to the process of effectively overseeing and coordinating the workforce within an organization. It involves tasks such as scheduling, staffing, training, and ensuring compliance with labor laws and regulations.",
      "Its significance for organizations lies in optimizing productivity, minimizing labor costs, maintaining a motivated workforce, and complying with legal and ethical standards. Effective labor management contributes to operational efficiency, employee satisfaction, and overall organizational success.",
    ],
  },
  {
    question: "What are the three primary phases involved in effectively managing compliance within a business?",
    answer: ["The three primary phases involved in effectively managing compliance within a business are:"],
    list: [
      ["Assessment", "Evaluating regulatory requirements and internal policies to understand compliance obligations."],
      ["Implementation", "Developing and implementing policies, procedures, and controls to meet compliance standards."],
      ["Monitoring and Enforcement", "Continuously monitoring adherence to compliance measures and enforcing corrective actions as needed."],
    ],
  },
  {
    question: "Explain the concept of a contract labor management system and its role in organizational governance.",
    answer: [
      "A contract labor management system is a structured approach to managing temporary or contingent workers within an organization. It involves processes for recruiting, onboarding, scheduling, and paying contract workers while ensuring compliance with labor laws and company policies. Its role in organizational governance is to enhance efficiency, mitigate risks, and maintain transparency in managing external workforce, contributing to overall compliance and operational effectiveness.",
    ],
  },
  {
    question: "What are the unique features and functionalities of a contract labor management system?",
    answer: [
      "A contract labor management system typically offers features like centralized contractor tracking, compliance management, automated onboarding/offboarding, scheduling, and performance monitoring. These systems streamline communication, ensure regulatory adherence, and enhance efficiency in managing contract workers.",
    ],
  },
  {
    question: "How does contract labor management software help businesses in managing risk and ensuring ongoing compliance?",
    answer: [
      "Contract labor management software helps businesses manage risk and ensure ongoing compliance by providing centralized tracking of contracts, ensuring adherence to labor regulations, automating compliance checks, and facilitating accurate reporting, minimizing legal and financial risks.",
    ],
  },
];


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
      name: "Contract Labour Management System",
      item: PAGE_URL,
    },
  ],
};

/* --------------------------------------------------------------------
   Page
   -------------------------------------------------------------------- */

export default function ContractLabourManagementSystemPage() {
  return (
    <main className={`${instrumentSans.variable} ${inter.variable} hrms-page payroll-page clms-page w-full overflow-x-clip bg-white font-sans text-[#4c4c4c]`}>
      <ScrollReveal root=".clms-page" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Hero */}
      <section
        id="clms-hero"
        aria-labelledby="clms-hero-heading"
        className="relative bg-[radial-gradient(circle_at_0%_20%,rgba(0,119,194,0.14),transparent_32%),radial-gradient(circle_at_55%_0%,rgba(248,187,24,0.25),transparent_35%),radial-gradient(circle_at_100%_80%,rgba(248,187,24,0.3),transparent_30%),radial-gradient(circle_at_30%_100%,rgba(15,184,128,0.1),transparent_25%)] px-4 pb-10 pt-6 md:px-12 md:pb-14 md:pt-8"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-14">
          <header className={`${revealFromLeft} flex flex-col gap-5 pt-2 sm:pt-3 lg:max-w-xl lg:pt-10`}>
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
                    className="transition-colors hover:text-[#0077c2]"
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
                  <span itemProp="name">Contract Labour Management System</span>
                  <link itemProp="item" href={PAGE_URL} />
                  <meta itemProp="position" content="2" />
                </li>
              </ol>
            </nav>
            <h1 id="clms-hero-heading" className="text-3xl font-semibold leading-tight text-[#1f1f1f] md:text-[2.6rem] md:leading-[1.2]">
              <span className="text-[#efb000]">Contract Labour Management System</span> made Simple!
            </h1>
            <p className={`text-base leading-[26px] md:text-lg md:leading-[29px] ${mutedText}`}>
              emContract Labour Management System is a trusted choice for 500+ clients and widely accepted across various industries for sheer
              simplification in helping industrials teams create manpower requests, contractors in fulfilling them, leadership to monitor performance of
              both.
            </p>
            <p className={`text-base leading-[26px] ${mutedText}`}>
              Our flagship product is known to simplify, automate, keep large scale labour teams compliant as per statutory guidelines.
            </p>
            <div className="flex flex-col gap-3.5 sm:flex-row sm:gap-5">
              <a href="#request-demo" className={`${primaryButton} text-[15px]`}>
                Book a Demo
                <ArrowCircleIcon />
              </a>
              <a href="#clms-modules" className={`${outlineButton} text-[15px]`}>
                Explore 12 Modules
              </a>
            </div>
          </header>

          {/* Request for demo form */}
          <div className={`${revealFromRight} relative w-full max-w-md lg:w-[40%] lg:max-w-[440px]`}>
            <div aria-hidden="true" className="absolute -inset-6 rounded-full bg-[#fff1c7] blur-3xl" />
            <DemoRequestForm
              product="Contract Labour Management System (CLMS)"
              title="Request for demo"
              subtitle="See emContract in action our team will reach out to schedule your walkthrough."
            />
          </div>
        </div>

        {/* Clients */}
        <div className="mx-auto mt-16 max-w-7xl">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
            {clients.map((client, index) => (
              <li
                key={client.name}
                style={stagger(index % 5, 70)}
                className={`${revealUp} group/card flex h-20 items-center justify-center rounded-xl bg-white px-4 shadow-[inset_0_0_0_1px_#ececec,0_6px_20px_-12px_rgba(0,0,0,0.25)] ${motion} hover:-translate-y-1 hover:shadow-[inset_0_0_0_1.5px_#f8bb18,0_14px_28px_-12px_rgba(0,0,0,0.25)]`}
              >
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className={`max-h-12 w-auto object-contain transition-transform duration-300 ${ease} group-hover/card:scale-105`}
                  sizes="170px"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* From Labour Analytics to Compliance */}
      <section aria-labelledby="pillars-heading" className="px-4 py-12 md:px-12 md:py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:gap-16">
          <div className={`${revealFromLeft} relative mx-auto w-full max-w-[28rem] lg:w-[42%]`}>
            <div className={`${softCard} overflow-hidden bg-[#0f162a] p-3`}>
              <Image
                src={complianceAutomationImg}
                alt="Enterprise executive interacting with digital labor compliance analytics and automated workflow interface"
                className="h-auto w-full rounded-lg shadow-inner"
                sizes="(min-width: 1024px) 28rem, 90vw"
              />
            </div>
            <div className="payroll-float absolute -bottom-6 left-3 flex items-center gap-3 rounded-2xl bg-white p-2.5 pr-5 shadow-[0_16px_36px_-14px_rgba(0,0,0,0.4)] sm:-left-8">
              <Image src={badgeGdpr} alt="GDPR certification badge with EU stars" className="h-14 w-14 rounded-xl object-cover" sizes="56px" />
              <div>
                <p className="text-base font-semibold text-[#1f1f1f]">GDPR Certified</p>
                <p className={`text-sm ${mutedText}`}>Software</p>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-6 lg:w-[58%]">
            <SectionHeader
              id="pillars-heading"
              title="From Labour Analytics to Compliance"
              text="We got you covered from workflows to compliance with our well thought 12 modules."
              align="left"
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {pillars.map((item, index) => (
                <article key={item.title} style={stagger(index + 1)} className={`${revealUp} ${greyCard} ${liftGrey} flex flex-col items-center text-center gap-3 p-6`}>
                  <IconTile name={item.icon} />
                  <h3 className="text-xl font-semibold text-[#1f1f1f]">{item.title}</h3>
                  <p className={`text-[15px] leading-[23px] ${mutedText}`}>{item.text}</p>
                </article>
              ))}
            </div>
            <a href="#clms-modules" className={`${revealUp} ${primaryButton} self-start text-sm`}>
              Explore More
              <ArrowCircleIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 12 modules */}
      <section id="clms-modules" aria-labelledby="modules-heading" className="scroll-mt-24 bg-[#fcfcfc] px-4 py-12 md:px-12 md:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <SectionHeader
            id="modules-heading"
            title={
              <>
                The Most Comprehensive <span className="text-[#efb000]">Contract Labour Management System</span>
              </>
            }
          />
          {/* Infinite auto-playing slider: 4 cards on desktop, 2 on tablets, 1 on phones. */}
          <div className={revealUp}>
            <CardCarousel label="CLMS modules" interval={1700} dotLabels={modules.map((m, i) => `Show module ${i + 1}: ${m.title}`)}>
              {modules.map((item, index) => (
                <article key={item.title} className={`${goldCard} ${liftGold} relative flex w-full flex-col gap-3 p-6`}>
                  <span className={`${fontInter} absolute right-5 top-5 text-sm font-bold text-black/15`}>{String(index + 1).padStart(2, "0")}</span>
                  <IconTile name={item.icon} />
                  <h3 className="pr-6 text-lg font-semibold leading-snug text-[#1f1f1f]">{item.title}</h3>
                  <p className={`text-[15px] leading-[23px] ${mutedText}`}>{item.text}</p>
                </article>
              ))}
            </CardCarousel>
          </div>
        </div>
      </section>

      {/* How emContract helps to manage compliance */}
      <section aria-labelledby="compliance-heading" className="relative overflow-hidden bg-[#fdf6e6] px-4 py-14 text-[#1f1f1f] md:px-12 md:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#efb000]/25 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#efb000]/20 blur-3xl" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-10">
          <SectionHeader
            id="compliance-heading"
            title={
              <>
                How em<span className="text-[#efb000]">Contract</span> helps to manage compliance?
              </>
            }
            text="20 plus state and central laws covered."
          />
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {complianceItems.map((item, index) => (
              <li
                key={item.title}
                style={stagger(index, 100)}
                className={`${revealUp} group/card flex flex-col items-center text-center gap-4 rounded-2xl bg-white p-6 shadow-[inset_0_0_0_1px_#ececec,0_2px_12px_rgba(0,0,0,0.04)] ${motion} hover:-translate-y-1 hover:shadow-[inset_0_0_0_1.5px_#efb000,0_12px_24px_-8px_rgba(0,0,0,0.1)]`}
              >
                <IconTile name={item.icon} className="h-16 w-16 rounded-2xl" iconClassName="h-9 w-9" />
                <h3 className="text-lg font-semibold text-[#1f1f1f]">{item.title}</h3>
                <p className="text-sm leading-[22px] text-[#595959]">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Turn key solution partners */}
      <section aria-labelledby="turnkey-heading" className="px-4 py-12 md:px-12 md:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <SectionHeader
            id="turnkey-heading"
            title={
              <>
                Looking for a <span className="text-[#efb000]">Turn Key Solution</span> Provider?
              </>
            }
            text="Our hardware partnerships make us an end-to-end solution provider for your factories, warehouses and shop floors."
          />
          <ul className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {partners.map((partner, index) => (
              <li
                key={partner.name}
                style={stagger(index % 6, 70)}
                className={`${revealZoom} group/card flex aspect-[13/8] items-center justify-center overflow-hidden rounded-xl bg-white shadow-[inset_0_0_0_1px_#ececec,0_6px_20px_-12px_rgba(0,0,0,0.25)] ${motion} hover:-translate-y-1 hover:shadow-[inset_0_0_0_1.5px_#f8bb18,0_14px_28px_-12px_rgba(0,0,0,0.25)] w-[calc(33.333%-0.5rem)] sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(25%-0.75rem)] xl:w-[calc(16.666%-0.834rem)]`}
              >
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className={`h-full w-full object-contain transition-[scale] duration-300 ${ease} group-hover/card:scale-105`}
                  sizes="(min-width: 1280px) 16vw, (min-width: 640px) 30vw, 45vw"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>



      {/* Dashboards */}
      <section aria-labelledby="dashboards-heading" className="bg-[#eef4fd] px-4 py-12 md:px-12 md:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <SectionHeader id="dashboards-heading" title="Take a glance on our dashboards" text="Reports and dashboards loved by management." />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {dashboards.map((dash, index) => (
              <figure
                key={dash.title}
                style={stagger(index)}
                className={`${revealUp} ${greyCard} ${liftGrey} overflow-hidden ${index === 0 ? "lg:col-span-2" : ""}`}
              >
                <figcaption className="flex items-center gap-2 border-b border-black/5 bg-[#f7f9fc] px-4 py-3 text-sm font-semibold text-[#1f1f1f]">
                  <span aria-hidden="true" className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#efb000]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#0fb880]" />
                  </span>
                  {dash.title}
                </figcaption>
                <div className="overflow-x-auto p-2 sm:p-3">
                  <Image
                    src={dash.image}
                    alt={dash.alt}
                    className={`h-auto w-full ${index === 0 ? "min-w-[800px] xl:min-w-0" : "min-w-[460px] md:min-w-0"}`}
                    sizes={index === 0 ? "(min-width: 1280px) 1200px, 100vw" : "(min-width: 1024px) 50vw, 100vw"}
                  />
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Features of Contract Labour Management System — on desktop the section
          pins under the header: the intro stays still while page scroll moves
          the cards up; after the last card the page scrolls on normally. */}
      <PinnedScrollSection ariaLabelledby="features-heading" className="bg-[#fcfcfc]" listClassName="gap-5"
        intro={
          <div className="flex flex-col gap-6">
            <SectionHeader
              id="features-heading"
              title={
                <>
                  Features of <span className="text-[#efb000]">Contract Labour Management System</span>
                </>
              }
              text="In today's fast-paced business environment, efficient management of labor resources is crucial for organizations to thrive. Emsphere Technologies, a leading provider of workforce management solutions, offers a Comprehensive Labour Management System (CLMS) tailored to meet the unique needs of modern businesses. Let's delve into the key features that make Emsphere's LMS stand out:"
              align="left"
            />
            <div className={`${revealUp} flex flex-wrap items-center gap-4 pt-1`}>
              <a href="#request-demo" className={`${primaryButton} text-sm`}>
                Book a Demo
                <ArrowCircleIcon className="h-4 w-4" />
              </a>
              <Link href="/contact-us" className={`${outlineButton} text-sm`}>
                Contact Sales
              </Link>
            </div>
          </div>
        }
      >
            {features.map((item, index) => (
              <li
                key={item.title}
                className={`${revealUp} ${greyCard} ${liftGrey} relative flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:p-6 transition-all duration-300 hover:border-[#0077c2]/30`}
              >
                <div className="flex items-center justify-between sm:block">
                  <IconTile
                    name={item.icon}
                    className="h-14 w-14 shrink-0 shadow-sm rounded-[10px]"
                    iconClassName="h-8 w-8"
                  />
                  <span className="text-xs font-bold tracking-wider text-black/30 sm:hidden">
                    0{index + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-[#1f1f1f] md:text-xl">{item.title}</h3>
                    <span className="hidden text-xs font-semibold tracking-wider text-black/35 sm:inline-block">
                      0{index + 1}
                    </span>
                  </div>
                  <p className={`mt-2 text-[15px] leading-[25px] ${mutedText}`}>{item.text}</p>
                </div>
              </li>
            ))}
      </PinnedScrollSection>

      {/* Why choose Emsphere */}
      <section aria-labelledby="why-heading" className="bg-[#fcfcfc] px-4 py-12 md:px-12 md:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <SectionHeader
            id="why-heading"
            title={
              <>
                Why Choose <span className="text-[#efb000]">Emsphere Technologies</span> for Your Contract Labour Management System?
              </>
            }
            text="In the competitive landscape of workforce management solutions, Emsphere Technologies emerges as a standout choice for businesses seeking excellence and efficiency. Here's why you should consider Emsphere for your Contract Labour Management System (CLMS) needs:"
            className="max-w-4xl"
          />
          <WhyChooseFlipCards reasons={reasons} />
        </div>
      </section>

      {/* FAQ */}
      <section
        aria-labelledby="faq-heading"
        className="bg-[#fdf6e6] bg-[radial-gradient(circle_at_10%_15%,rgba(248,187,24,0.3),transparent_25%),radial-gradient(circle_at_95%_75%,rgba(248,187,24,0.3),transparent_25%)] px-4 py-12 md:px-12 md:py-20"
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-8">
          <header className={`${revealUp} flex flex-col gap-2 text-center`}>
            <p className="text-3xl font-semibold md:text-[2.375rem] md:leading-[49px]">FAQ</p>
            <h2 id="faq-heading" className="text-xl font-semibold md:text-3xl">
              Answers to common questions on Contract Labour Management System
            </h2>
          </header>
          <ul className="flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <li key={faq.question} style={stagger(index % 5, 70)} className={`${revealUp} ${goldCard} ${liftGold} overflow-hidden`}>
                <details name="clms-faq" open={index === 0} className="hrms-faq group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-4 outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#0077c2] sm:px-5 md:px-7 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base font-semibold sm:text-lg md:text-xl">{faq.question}</h3>
                    <FaqToggleIcon />
                  </summary>
                  <div className="hrms-faq-answer flex flex-col gap-3 px-4 pb-5 text-[15px] leading-[23px] sm:px-5 sm:text-base md:px-7 md:text-lg md:leading-[27px]">
                    {faq.answer.map((paragraph) => (
                      <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                    ))}
                    {faq.list && (
                      <ol className="flex list-decimal flex-col gap-2 pl-6 marker:font-semibold marker:text-[#b07d00]">
                        {faq.list.map(([term, text]) => (
                          <li key={term}>
                            <span className="font-semibold text-[#1f1f1f]">{term}:</span> {text}
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Our Flagship Products */}
      <FlagshipProducts />


      {/* Contact CTA — same as the home / HRMS / payroll pages */}
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
      <BackToTop trigger="#clms-hero" />
    </main>
  );
}
