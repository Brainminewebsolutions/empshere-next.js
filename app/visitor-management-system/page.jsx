import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instrument_Sans, Inter } from "next/font/google";
import ScrollReveal from "@/components/ScrollReveal";
import BackToTop from "@/components/BackToTop";
import FlagshipProducts from "@/components/FlagshipProducts";
import FeatureCard from "@/components/FeatureCard";
import DemoRequestForm from "@/components/DemoRequestForm";
import CardCarousel from "@/components/CardCarousel";
import VisitorHeroVector from "@/components/VisitorHeroVector";
import VisitorSecurityVector from "@/components/VisitorSecurityVector";
import VisitorDigitalSolutionsVector from "@/components/VisitorDigitalSolutionsVector";

/* --------------------------------------------------------------------
   Images — every image this page uses lives in
   app/images/visitor-management-system and is imported by name.
   -------------------------------------------------------------------- */

import heroImg from "../images/visitor-management-system/hero-verified-visitor-check-in-devices.webp";
import mobileImg from "../images/visitor-management-system/visitor-analytics-mobile-app-dashboard.webp";
import securityImg from "../images/visitor-management-system/workplace-security-visitor-scheduling-illustration.webp";
import transformImg from "../images/visitor-management-system/visitor-qr-pass-scan-reception-kiosk.webp";
import { AddressBook, ArrowsOut, Bell, ChartLineDown, ChatsCircle, ClipboardText, Database, DoorOpen, Hourglass, IdentificationBadge, IdentificationCard, Lightning, Lock, Note, PersonSimpleRun, PiggyBank, PlugsConnected, QrCode, ShieldCheck, SignIn, Signature, Smiley, Warning } from "@phosphor-icons/react/ssr";


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
const stagger = (index, step = 120) => ({ transitionDelay: `${index * step}ms` });

const liftGold = `group/card ${motion} hover:-translate-y-1 hover:shadow-[inset_0_0_0_1.5px_#EFB000,0px_8px_20px_-6px_rgba(239,176,0,0.2)]`;
const liftGrey = `group/card ${motion} hover:-translate-y-1.5 hover:shadow-[inset_0_0_0_0.814px_#dddddd,0px_10px_22px_-6px_rgba(0,0,0,0.1)]`;
const iconPop = `transition-[scale] duration-300 ${ease} group-hover/card:scale-110`;
const arrowNudge = `transition-[translate] duration-200 ${ease} group-hover/btn:translate-x-[3px]`;

const primaryButton = `group/btn inline-flex items-center justify-center gap-2 rounded-[9px] bg-[#EFB000] px-6 py-3 ${fontInter} font-semibold text-white ${motion} hover:-translate-y-0.5 hover:bg-[#d99e00] hover:shadow-[0_8px_18px_-4px_rgba(239,176,0,0.45)]`;
const outlineButton = `group/btn inline-flex items-center justify-center gap-2 rounded-[9px] bg-white px-6 py-3 ${fontInter} font-semibold text-[#EFB000] shadow-[inset_0_0_0_1.5px_#EFB000] ${motion} hover:-translate-y-0.5 hover:bg-[#fffdf5]`;

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

// Section icons from Phosphor (https://phosphoricons.com), white on the #EFB000 tile.
const ICONS = {
  checkin: SignIn,
  record: AddressBook,
  chat: ChatsCircle,
  note: Note,
  bell: Bell,
  signature: Signature,
  badge: IdentificationBadge,
  qr: QrCode,
  idcard: IdentificationCard,
  integration: PlugsConnected,
  lock: Lock,
  shield: ShieldCheck,
  bolt: Lightning,
  savings: PiggyBank,
  smile: Smiley,
  audit: ClipboardText,
  hourglass: Hourglass,
  warning: Warning,
  chartOff: ChartLineDown,
  scale: ArrowsOut,
  gate: DoorOpen,
  evacuation: PersonSimpleRun,
  database: Database,
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
  { bg: "#0077c2", color: "#ffffff" },
  { bg: "#0fb880", color: "#ffffff" },
  { bg: "#f8bb18", color: "#ffffff" },
  { bg: "#ef4444", color: "#ffffff" },
  { bg: "#5b5bd6", color: "#ffffff" },
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
    <main className={`${instrumentSans.variable} ${inter.variable} hrms-page payroll-page vms-page w-full overflow-x-clip bg-[#FFFFFA] font-sans text-[#4c4c4c]`}>
      <ScrollReveal root=".vms-page" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      {/* Hero */}
      <section
        aria-labelledby="vms-hero-heading"
        className="relative flex flex-col justify-center bg-[#FFFFFA] px-4 py-8 md:px-12 lg:min-h-[calc(100vh-88px)] lg:py-6"
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12 xl:gap-14">
          <header className={`${revealFromLeft} flex flex-col gap-4 lg:gap-5 lg:max-w-xl`}>
            <nav aria-label="Breadcrumb" className={`${fontInter} text-[13px] font-medium text-black/55`}>
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link href="/" className="transition-colors hover:text-[#f8bb18]">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-black/35">›</li>
                <li aria-current="page" className="text-black/80">
                  Visitor Management System
                </li>
              </ol>
            </nav>
            <h1 id="vms-hero-heading" className="text-3xl font-semibold leading-tight text-[#1f1f1f] md:text-4xl lg:text-[2.6rem] md:leading-[1.2]">
              Smart <span className="text-[#f8bb18]">Visitor Management System</span> by Emsphere Technologies
            </h1>
            <p className={`text-base leading-[26px] md:text-[17px] md:leading-[28px] ${mutedText}`}>
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
          </header>

          <div className={`${revealFromRight} relative w-full max-w-lg lg:w-[48%] lg:max-w-none`}>
            <VisitorHeroVector />
          </div>
        </div>
      </section>

      {/* Why your business needs a VMS */}
      <section aria-labelledby="needs-heading" className="bg-[#FFFFFA] px-4 py-14 md:px-12 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row-reverse lg:gap-16">
          <div className={`${revealFromRight} relative mx-auto w-full max-w-[26rem] lg:w-[38%]`}>
            <Image
              src={mobileImg}
              alt="Smartphone running the Emsphere visitor app with visitor counts and analytics charts"
              className="relative h-auto w-full"
              sizes="(min-width: 1024px) 26rem, 90vw"
            />
          </div>
          <div className={`${revealFromLeft} flex w-full flex-col gap-5 lg:w-[62%]`}>
            <h2 id="needs-heading" className="text-2xl font-semibold md:text-[2.1rem] md:leading-[44px]">
              Why Your Business Needs a <span className="text-[#f8bb18]">Visitor Management System</span>
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
      <section id="vms-features" aria-labelledby="features-heading" className="scroll-mt-24 bg-[#FFFFFA] px-4 py-12 md:px-12 md:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <SectionHeader
            id="features-heading"
            title={
              <>
                Features of Emsphere&apos;s <span className="text-[#f8bb18]">Visitor Management System</span>
              </>
            }
            text="A comprehensive solution to managing visitor movements, our visitor management system offers the following features."
          />
          <div className={revealUp}>
            <CardCarousel label="Visitor management features" interval={1700} dotLabels={features.map((f, i) => `Show feature ${i + 1}: ${f.title}`)}>
              {features.map((item, index) => (
                <article key={item.title} className={`${goldCard} ${liftGold} relative flex w-full flex-col items-center gap-3 p-6 text-center`}>
                  <span className={`${fontInter} absolute right-5 top-5 text-sm font-bold text-black/15`}>{String(index + 1).padStart(2, "0")}</span>
                  <IconTile name={item.icon} />
                  <h3 className="px-6 text-lg font-semibold leading-snug text-[#1f1f1f]">{item.title}</h3>
                  <p className={`text-[15px] leading-[23px] ${mutedText}`}>{item.text}</p>
                </article>
              ))}
            </CardCarousel>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section aria-labelledby="benefits-heading" className="bg-[#FFFFFA] px-4 py-12 md:px-12 md:py-20">
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
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {benefits.map((item, index) => (
              <FeatureCard
                key={item.title}
                index={index}
                className={revealUp}
                style={stagger(index % 3, 110)}
                icon={<LineIcon name={item.icon} />}
                title={item.title}
                text={item.text}
              />
            ))}
          </ul>
        </div>
      </section>

      {/* How Emsphere enhances workplace security — checklist */}
      <section aria-labelledby="enhances-heading" className="bg-[#FFFFFA] px-4 py-14 md:px-12 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:gap-16">
          <div className={`${revealFromLeft} relative mx-auto w-full max-w-lg lg:w-[45%]`}>
            <VisitorSecurityVector />
          </div>
          <div className="flex w-full flex-col gap-6 lg:w-[55%]">
            <SectionHeader
              id="enhances-heading"
              align="left"
              title={
                <>
                  How Emsphere Enhances Workplace Security with <span className="text-[#f8bb18]">Visitor Management Software</span>
                </>
              }
              text="At Emsphere, we strive to improve workplace security with our comprehensive and thoughtfully designed visitor management software. Here’s how we contribute."
            />
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {securityPoints.map((point, index) => (
                <li
                  key={point}
                  style={stagger(index, 70)}
                  className={`${revealUp} group/card relative flex items-center gap-3.5 overflow-hidden rounded-xl bg-white py-3.5 pl-4 pr-10 text-[15px] font-semibold leading-snug text-[#1f1f1f] shadow-[inset_0_0_0_1px_#ececec,0_4px_14px_-10px_rgba(0,0,0,0.12)] sm:last:odd:col-span-2 ${motion} hover:-translate-y-0.5 hover:shadow-[inset_0_0_0_1.5px_#EFB000,0_14px_26px_-14px_rgba(239,176,0,0.45)]`}
                >
                  {/* Warm wash slides in from the left on hover */}
                  <span aria-hidden="true" className={`pointer-events-none absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[#FDF6E6] to-transparent transition-[scale] duration-500 ${ease} group-hover/card:scale-x-100`} />
                  <span className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fff5d9] text-[#d99e00] shadow-[inset_0_0_0_1px_rgba(239,176,0,0.3)] transition-[background-color,color,scale] duration-300 ${ease} group-hover/card:scale-110 group-hover/card:bg-[#EFB000] group-hover/card:text-white`}>
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <span className="relative">{point}</span>
                  <span aria-hidden="true" className={`absolute right-4 top-1/2 -translate-y-1/2 text-[#EFB000] opacity-0 transition-[opacity,translate] duration-300 ${ease} group-hover/card:translate-x-1 group-hover/card:opacity-100`}>
                    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7.5 4.5l5.5 5.5-5.5 5.5" />
                    </svg>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Challenges with traditional visitor management */}
      <section
        aria-labelledby="challenges-heading"
        className="relative overflow-hidden bg-[#FFFFFA] px-4 py-14 text-[#1f1f1f] md:px-12 md:py-20"
      >
        <div className="relative mx-auto flex max-w-7xl flex-col gap-12">
          <header className={`${revealUp} mx-auto flex max-w-3xl flex-col items-center gap-3 text-center`}>
            <p className="text-sm font-bold uppercase tracking-wider text-[#b45309]">Why Your Business Needs a Visitor Management System</p>
            <h2 id="challenges-heading" className="text-2xl font-semibold text-[#1f1f1f] md:text-[2.1rem] md:leading-[44px]">
              Challenges with Traditional Visitor Management
            </h2>
            <p className={`text-base leading-[25px] md:text-lg ${mutedText}`}>
              Some common challenges associated with traditional visitor management include,
            </p>
          </header>
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {challenges.map((item, index) => (
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

          <div className={`${revealUp} group/panel relative grid grid-cols-1 items-center gap-10 overflow-hidden rounded-3xl bg-white p-6 shadow-[inset_0_0_0_1px_#f0deba,0px_16px_40px_-18px_rgba(176,125,0,0.25)] md:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14`}>
            {/* Ambient warm glows */}
            <span aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(248,187,24,0.14),transparent_70%)]" />
            <span aria-hidden="true" className="pointer-events-none absolute -bottom-28 right-[20%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(248,187,24,0.10),transparent_70%)]" />
            {/* Gold rule down the left edge */}
            <span aria-hidden="true" className="absolute inset-y-8 left-0 w-1 rounded-r-full bg-gradient-to-b from-[#f8bb18] to-[#d99e00]" />

            <div className={`${revealFromLeft} relative flex flex-col gap-5`}>
              <p className={`${fontInter} inline-flex w-fit items-center gap-2 rounded-full bg-[#fff5d9] px-3.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#b07d00]`}>
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#EFB000]" />
                Paper to Digital
              </p>
              <h3 className="text-2xl font-semibold leading-tight text-[#1f1f1f] md:text-[2rem] md:leading-[1.25]">
                The Shift to <span className="text-[#f8bb18]">Digital Solutions</span> for Visitor Management
              </h3>
              <p className={`text-base leading-[27px] ${mutedText}`}>
                Upgrading to digital solutions refers to a futuristic move. While streamlining visitor movements is one aspect, what matters the most is
                enhancing security. Secure premises foster a fearless environment that fuels productivity, and efficiency.
              </p>
              <p className={`border-l-2 border-[#f1e2b8] pl-4 text-base leading-[27px] ${mutedText}`}>
                Although these are indirect impacts, they matter in the long run. Emsphere’s visitor management principle is based on delivering tangible
                value to enterprises. The system is designed with modern security needs in mind and supports companies in various tactical and strategic
                ways, helping them strengthen security and improve the overall visitor experience.
              </p>
            </div>
            <div className={`${revealFromRight} relative mx-auto w-full max-w-md`}>
              <div className={`relative rounded-2xl bg-gradient-to-br from-[#FDF6E6] via-white to-[#fff5d9] p-5 shadow-[inset_0_0_0_1px_#f0deba,0_18px_40px_-20px_rgba(176,125,0,0.35)] transition-[scale] duration-500 ${ease} group-hover/panel:scale-[1.02]`}>
                <div className="animate-[payroll-float_7s_ease-in-out_infinite]">
                  <VisitorDigitalSolutionsVector />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Emsphere enhances workplace security — 3 pillars */}
      <section aria-labelledby="pillars-heading" className="bg-[#FFFFFA] px-4 py-12 md:px-12 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <SectionHeader
            id="pillars-heading"
            title={
              <>
                How Emsphere Enhances <span className="text-[#f8bb18]">Workplace Security</span>
              </>
            }
          />
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {enhancements.map((item, index) => (
              <FeatureCard
                key={item.title}
                index={index}
                className={revealUp}
                style={stagger(index)}
                icon={<LineIcon name={item.icon} />}
                title={item.title}
                text={item.text}
              />
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section
        aria-labelledby="faq-heading"
        className="bg-[#FFFFFA] px-4 py-12 md:px-12 md:py-20"
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
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-4 outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#EFB000] sm:px-5 md:px-7 [&::-webkit-details-marker]:hidden">
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
      <section
        aria-labelledby="transform-heading"
        className="relative overflow-hidden bg-[#FFFFFA] px-4 py-14 text-[#1f1f1f] md:px-12 md:py-20"
      >
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 lg:flex-row lg:items-stretch lg:justify-between lg:gap-14">
          <div className={`${revealFromLeft} flex w-full flex-col gap-6 lg:flex-1`}>
            <SectionHeader
              id="transform-heading"
              align="left"
              title={
                <>
                  Ready to Transform Your Visitor Management? <span className="text-[#f8bb18]">Contact Emsphere Today!</span>
                </>
              }
              text="Yes. Upgrade to a smarter and safer workplace with Emsphere. Our customizable visitor management software is prepared to serve you. Connect with us via email ID and embark on your journey to improving visitor management and strengthening workplace security."
            />
            <figure className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl shadow-[0px_18px_40px_-16px_rgba(15,23,42,0.35)] ring-1 ring-[#f0deba] lg:aspect-auto lg:min-h-[240px] lg:flex-1">
              <Image
                src={transformImg}
                alt="Visitor scanning a digital QR pass from their phone at a reception check-in kiosk"
                fill
                placeholder="blur"
                className="object-cover object-[center_30%]"
                sizes="(min-width: 1024px) 36rem, 92vw"
              />
              <figcaption className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-[#1f1f1f] shadow-md backdrop-blur">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#22c55e]" />
                Touchless QR check-in
              </figcaption>
            </figure>
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
