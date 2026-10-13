import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instrument_Sans, Inter } from "next/font/google";
import ScrollReveal from "@/components/ScrollReveal";
import BackToTop from "@/components/BackToTop";
import FlagshipProducts from "@/components/FlagshipProducts";
import FeatureCard from "@/components/FeatureCard";
import PayrollHeroVector from "@/components/PayrollHeroVector";
import TrustedLogos from "@/components/TrustedLogos";

/* --------------------------------------------------------------------
   Images — every image this page uses lives in
   app/images/payroll-management-solution and is imported by name.
   -------------------------------------------------------------------- */

// Hero
import heroIllustration from "../images/payroll-management-solution/hero-empayroll-salary-payslip-illustration.webp";

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
import { ArrowsClockwise, Bank, Briefcase, Certificate, ChartBar, ClockCounterClockwise, Files, FirstAidKit, Gift, HandCoins, Key, ListMagnifyingGlass, Percent, PiggyBank, Receipt, Scales, SlidersHorizontal, Target, TreeStructure, UsersThree, Wallet, ChartLineUp } from "@phosphor-icons/react/ssr";


// Title and description are the page's Rank Math values on the current site.
const PAGE_URL = "https://www.emsphere.com/empay-management-solution/";
const PAGE_TITLE = "emPay Management System, emPay Software India - Emsphere";
const PAGE_DESCRIPTION =
  "Efficient emPay Management System and Software in Pune, India. Simplify Salary Processes with emPay, Our Comprehensive emPay Software";
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
  "bg-white rounded-xl shadow-[inset_0_0_0_0.789px_#EFB000,0px_3px_12px_-4px_rgba(0,0,0,0.07)]";
const greyCard =
  "bg-white rounded-2xl shadow-[inset_0_0_0_0.814px_#e5e5e5,0px_3px_12px_-4px_rgba(0,0,0,0.06)]";
const softCard =
  "rounded-[11px] shadow-[inset_0_0_0_0.601px_#e5e5e5,0px_2px_8px_-2px_rgba(0,0,0,0.05)]";
const mutedText = "text-[rgba(0,0,0,0.64)]";

const ease = "ease-[cubic-bezier(0.16,1,0.3,1)]";
const motion = `transition-[translate,scale,box-shadow,background-color] duration-300 ${ease}`;
const revealUp = "reveal-on-scroll reveal-fade-up";
const revealFromLeft = "reveal-on-scroll reveal-fade-right";
const revealFromRight = "reveal-on-scroll reveal-fade-left";
const revealZoom = "reveal-on-scroll reveal-zoom-in";
const stagger = (index, step = 120) => ({ transitionDelay: `${index * step}ms` });

const liftGold = `group/card ${motion} hover:-translate-y-1 hover:shadow-[inset_0_0_0_1.5px_#EFB000,0px_8px_20px_-6px_rgba(239,176,0,0.2)]`;
const liftGrey = `group/card ${motion} hover:-translate-y-1.5 hover:shadow-[inset_0_0_0_0.814px_#dddddd,0px_10px_22px_-6px_rgba(0,0,0,0.1)]`;
const liftPanel = `group/panel ${motion} hover:-translate-y-1 hover:shadow-[inset_0_0_0_0.601px_#dddddd,0px_10px_22px_-6px_rgba(0,0,0,0.1)]`;
const iconPop = `transition-[scale] duration-300 ${ease} group-hover/card:scale-110`;
const panelImageZoom = `transition-[scale] duration-500 ${ease} group-hover/panel:scale-[1.04]`;
const arrowNudge = `transition-[translate] duration-200 ${ease} group-hover/btn:translate-x-[3px]`;

const primaryButton = `group/btn inline-flex items-center justify-center gap-2 rounded-[9px] bg-[#EFB000] px-6 py-3 ${fontInter} font-semibold text-white ${motion} hover:-translate-y-0.5 hover:bg-[#d99e00] hover:shadow-[0_8px_18px_-4px_rgba(239,176,0,0.45)]`;
const outlineButton = `group/btn inline-flex items-center justify-center gap-2 rounded-[9px] bg-white px-6 py-3 ${fontInter} font-semibold text-[#EFB000] shadow-[inset_0_0_0_1.5px_#EFB000] ${motion} hover:-translate-y-0.5 hover:bg-[#fffdf5]`;
const learnMoreButton = `group/btn flex items-center justify-center gap-2 rounded-[5px] bg-[#EFB000] min-h-11 py-3 text-xs font-medium tracking-wide text-white shadow-[inset_0_0_0_1px_#b3b3b3] ${motion} hover:-translate-y-0.5 hover:bg-[#d99e00] hover:shadow-[inset_0_0_0_1px_#b3b3b3,0_8px_18px_-4px_rgba(239,176,0,0.45)]`;

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

// Section icons from Phosphor (https://phosphoricons.com), white on the #EFB000 tile.
const ICONS = {
  access: Key,
  controls: SlidersHorizontal,
  accuracy: Target,
  analytics: ChartBar,
  cycle: ArrowsClockwise,
  audit: ListMagnifyingGlass,
  group: UsersThree,
  rules: TreeStructure,
  arrears: ClockCounterClockwise,
  reimbursement: Receipt,
  loans: HandCoins,
  banking: Bank,
  pf: PiggyBank,
  esi: FirstAidKit,
  pt: Briefcase,
  tds: Percent,
  form16: Certificate,
  bonus: Gift,
  reports: Files,
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
   Content — all copy from https://www.emsphere.com/empay-management-solution/ (formerly /payroll-management-solution/)
   -------------------------------------------------------------------- */

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

const whyEmpay = [
  { title: "Accuracy", text: "100% accurate and on time salary processing with emPay.", icon: "accuracy", bg: "#EFB000", color: "#EFB000" },
  { title: "Analytics", text: "Slice and dice data and analyse department-wise.", icon: "analytics", bg: "#EFB000", color: "#EFB000" },
  {
    title: "End to End emPay",
    text: "From attendance, to leaves, salary, TDS, calculations & loan deductions, 24QR, Form 16, payslip generation to FNF.",
    icon: "cycle",
    bg: "#EFB000",
    color: "#EFB000",
  },
  {
    title: "Audit & Compliance",
    text: "Strong audit trails with tracking for each sensitive transaction or workflow modification. Encryption of sensitive information with GDPR Certification.",
    icon: "audit",
    bg: "#EFB000",
    color: "#EFB000",
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
    imageAlt: "emPay specialist computing employee salaries and statutory deductions on a digital tablet in modern office",
  },
  {
    id: "monthly-reconciliation",
    label: "Monthly Reconciliation",
    text: "User friendly flow which gives power back to the user to select own criteria and get accurate results.",
    image: reconciliationImg,
    imageAlt: "Finance team analyzing monthly emPay reconciliation and variance reports on a laptop in modern office",
  },
  {
    id: "pay-slip-generations",
    label: "Pay Slip Generations",
    text: "Generate payslip as per customized templates. emPay makes it instant and effortless.",
    image: payslipImg,
    imageAlt: "HR professional generating and downloading employee payslips from the emPay management dashboard",
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
    team: "emPay Teams",
    icon: Wallet,
    text: "gets monthly and annual reports for salary, bank wise transactions, mode of payment, reconciliation, OT, CTC paymaster, TDS, Arrears, Gratuity and last but not the least Compliance.",
  },
  {
    team: "Other HR Teams",
    icon: UsersThree,
    text: "get onboarding, employee information, Training related reports",
  },
  {
    team: "Finance Team",
    icon: ChartLineUp,
    text: "gets reports on audit trails, variance on last month, employee wise details on arrears, reimbursement and recovery, TDS, e Returns, Form 16.",
  },
  {
    team: "Compliance Team",
    icon: Scales,
    text: "will get all the reports on State & Central acts, Factory Acts, Shop and Establishment Act & labour Law etc. All the Register and Return format will be updated as per government guidelines and same gets updated at client end automatically.",
  },
];


const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "emPay Management System",
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
        { "@type": "ListItem", position: 2, name: "emPay Management System", item: PAGE_URL },
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
      name: "emPay Management System",
      item: PAGE_URL,
    },
  ],
};

/* --------------------------------------------------------------------
   Page
   -------------------------------------------------------------------- */

export default function EmPayPage() {
  return (
    <main className={`${instrumentSans.variable} ${inter.variable} hrms-page payroll-page w-full overflow-x-hidden bg-[#FFFFFA] font-sans text-[#4c4c4c]`}>
      <ScrollReveal root=".payroll-page" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }} />

      {/* Hero */}
      <section
        id="payroll-hero"
        aria-labelledby="payroll-hero-heading"
        className="relative bg-[#FFFFFA] px-4 pb-10 pt-8 md:px-12 md:pb-14 md:pt-12"
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
                  <span itemProp="name">emPay Management System</span>
                  <link itemProp="item" href={PAGE_URL} />
                  <meta itemProp="position" content="2" />
                </li>
              </ol>
            </nav>
            <h1 id="payroll-hero-heading" className="text-3xl font-semibold leading-tight text-[#1f1f1f] md:text-[2.6rem] md:leading-[1.2]">
              Simplify Your Salary Process With A <span className="text-[#f8bb18]">Powerful emPay Management System</span>
            </h1>
            <p className={`text-base leading-[26px] md:text-lg md:leading-[29px] ${mutedText}`}>
              emPay is a robust management system that takes care of everything right from employee information, salary calculation, and compliance
              management. Use emPay for timely, hassle-free, and accurate salary processing.
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
      </section>

      <TrustedLogos />

      {/* One Software, many Advantages */}
      <section aria-labelledby="advantages-heading" className="bg-[#FFFFFA] px-4 py-12 md:px-12 md:py-16">
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
              alt="emPay progress ring badge"
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
                  <IconTile name={item.icon} />
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

      {/* Why emPay? */}
      <section aria-labelledby="why-heading" className="bg-[#FFFFFA] px-4 py-12 md:px-12 md:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <SectionHeader id="why-heading" title={<>Why em<span className="text-[#EFB000]">Pay</span>?</>} />
          {/* Bento layout: short points sit beside the wide, detailed ones */}
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {whyEmpay.map((item, index) => (
              <FeatureCard
                key={item.title}
                index={index}
                className={revealUp}
                style={stagger(index, 110)}
                icon={<LineIcon name={item.icon} />}
                title={item.title}
                text={item.text}
              />
            ))}
          </ul>
        </div>
      </section>

      {/* Employee information + role based access */}
      <section aria-label="Employee information and role based access" className="bg-[#FFFFFA] px-4 py-12 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-10">
          <article className={`${revealFromLeft} ${softCard} ${liftPanel} flex flex-col gap-6 bg-[#F9F1E699] p-5 md:p-7 lg:flex-row lg:items-center`}>
            <div className="mx-auto w-44 shrink-0 overflow-hidden sm:w-52 lg:w-[42%]">
              <Image
                src={employeeInfoImg}
                alt="Hand holding a smartphone showing the emPay employee information screen"
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
                { title: "Rule Engine", text: "Define rules to access, view, edit, delete or modify any data.", icon: "rules", bg: "#f8bb18", surface: "#FFF5D9" },
              ].map((item) => (
                <div key={item.title} className={`group/card flex items-center gap-3 rounded-[8px] p-3.5 ${motion} hover:-translate-y-0.5 hover:shadow-[0px_8px_20px_-8px_rgba(0,0,0,0.2)]`} style={{ background: item.surface }}>
                  <IconTile name={item.icon} className="h-11 w-11 rounded-[8px]" iconClassName="h-6 w-6" />
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
      <section aria-label="Employee self service and exit" className="bg-[#FFFFFA] px-4 py-12 sm:px-6 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-6 md:gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Card 1: Employee Self Service */}
          <article className={`${revealFromLeft} group/card flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_16px_36px_-8px_rgba(0,0,0,0.12)] md:rounded-3xl`}>
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
              <Image
                src={empoweredImg}
                alt="Confident smiling male professional managing emPay and benefits on a digital tablet in a modern office"
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
                  className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#EFB000] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#d99e00] hover:shadow-[0_8px_18px_-4px_rgba(239,176,0,0.45)] sm:w-auto sm:self-start"
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
                <p className="text-xs font-bold uppercase tracking-wider text-[#F8BB18] sm:text-sm">Smooth Separation Process</p>
                <h2 className="text-xl font-bold leading-snug text-[#1f1f1f] sm:text-2xl md:text-[1.75rem]">
                  Parting ways made <span className="text-[#F8BB18]">frictionless</span>
                </h2>
                <p className="text-[14.5px] leading-relaxed text-[#595959] sm:text-base">
                  Lets you support your employee even when they have decided to move on, with quick exit reports and easy access to information on full and final settlement.
                </p>
              </div>
              <div className="mt-auto pt-2">
                <Link
                  href="/contact-us"
                  className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#EFB000] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#d99e00] hover:shadow-[0_8px_18px_-4px_rgba(239,176,0,0.45)] sm:w-auto sm:self-start"
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
      <section aria-labelledby="salary-heading" className="bg-[#FFFFFA] px-4 py-12 md:px-12 md:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <SectionHeader
            id="salary-heading"
            title={
              <>
                Salary Management <span className="text-[#F8BB18]">Money Matters!</span>
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
                  className={`group/tab flex shrink-0 cursor-pointer items-center gap-3.5 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#1f1f1f] shadow-[inset_0_0_0_1px_#e3e3e3] ${motion} hover:bg-[#fffaf0] hover:shadow-[inset_0_0_0_1.5px_#f8bb18,0_6px_16px_-4px_rgba(0,0,0,0.1)] has-[:checked]:bg-[#EFB000] has-[:checked]:text-white has-[:checked]:shadow-[0_12px_24px_-8px_rgba(239,176,0,0.5)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#f8bb18] lg:min-h-0 lg:flex-1 lg:rounded-2xl lg:px-5 lg:py-4 lg:text-base`}
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
      <section aria-labelledby="processing-heading" className="bg-[#FFFFFA] px-4 py-12 md:px-12 md:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.4fr] lg:items-center lg:gap-12">
            <div className={`${revealFromLeft} relative flex flex-col gap-6`}>
              <SectionHeader
                id="processing-heading"
                align="left"
                title={
                  <>
                    Salary Processing <span className="text-[#f8bb18]">On time, every time!</span>
                  </>
                }
                text="When it comes to salaries, people like to it credited early or on time. With emPay, a click is all that client need to process employee salaries. emPay helps you compute salaries for all Employees taking Statutory Deduction, Loan Deduction, Arrears, Revision all into consideration."
              />
              <p className={`${fontInter} inline-flex w-fit items-center gap-2.5 rounded-full bg-[#fff5d9] py-2 pl-2 pr-4 text-sm font-semibold text-[#7a5c00] shadow-[inset_0_0_0_1px_#f0deba]`}>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#efb000] text-white">
                  <CheckIcon className="h-4 w-4" />
                </span>
                One click salary processing
              </p>
            </div>

            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {salaryProcessing.map((item, index) => (
                <FeatureCard
                  key={item.title}
                  index={index}
                  className={revealUp}
                  style={stagger(index, 110)}
                  icon={<LineIcon name={item.icon} />}
                  title={item.title}
                  text={item.text}
                />
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Statutory Compliance + TDS */}
      <section aria-labelledby="compliance-heading" className="relative overflow-hidden bg-[#FFFFFA] px-4 py-14 text-[#1f1f1f] md:px-12 md:py-20">
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
                  <span className={`flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#EFB000] text-white shadow-sm ${iconPop}`}>
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
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-[#EFB000] text-white shadow-sm ${iconPop}`}>
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
      <section aria-labelledby="reports-heading" className="bg-[#FFFFFA] px-4 py-12 md:px-12 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
            <SectionHeader
              id="reports-heading"
              title="When it comes to reports we got all your teams covered!"
              text="In this data driven world it is important to have multiple type of reports with in a department to slice and dice information. Be analytics driven with emPay."
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
              <FeatureCard
                key={item.team}
                index={index}
                showNumber={false}
                className={revealUp}
                style={stagger(index, 110)}
                icon={<item.icon weight="fill" />}
                eyebrow={`Team ${String(index + 1).padStart(2, "0")}`}
                title={item.team}
                text={item.text.charAt(0).toUpperCase() + item.text.slice(1)}
              />
            ))}
          </ul>
        </div>
      </section>

      {/* Our Flagship Products */}
      <FlagshipProducts className="bg-[#FFFFFA]" />

      {/* Contact CTA — same as the home / HRMS pages */}
      <section aria-label="Contact emSphere" className="bg-[#FFFFFA] px-6 py-12 min-[769px]:py-[88px]">
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
                  className={`group/btn inline-flex w-full max-w-65 items-center justify-center rounded-lg bg-[#EFB000] px-6 py-[13px] ${fontInter} text-[15px] font-semibold tracking-[0.02em] text-white ${motion} hover:-translate-y-0.5 hover:bg-[#d99e00] hover:shadow-[0_8px_18px_-4px_rgba(239,176,0,0.45)] active:translate-y-0 min-[769px]:w-auto min-[769px]:max-w-none min-[769px]:min-w-[145px] min-[769px]:px-[30px]`}
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
