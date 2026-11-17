import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instrument_Sans, Inter } from "next/font/google";
import {
  ArrowsDownUp,
  Buildings,
  CheckCircle,
  Database,
  DoorOpen,
  ForkKnife,
  IdentificationCard,
  Prohibit,
  Quotes,
  ScanSmiley,
  ShieldCheck,
  TreeStructure,
  UserCheck,
  UsersFour,
  Wallet,
} from "@phosphor-icons/react/ssr";
import ScrollReveal from "@/components/ScrollReveal";
import BackToTop from "@/components/BackToTop";
import FeatureCard from "@/components/FeatureCard";
import FlagshipProducts from "@/components/FlagshipProducts";
import LeadForm from "@/components/LeadForm";
import turnstileImg from "../images/clms-attendance-shift-overtime-management/real-time-attendance-face-biometric-punch.webp";
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
import { TWITTER_SITE } from "@/lib/seo";
import { jsonLdScript, productPageJsonLd } from "@/lib/schema";

const PAGE_URL = "https://www.emsphere.com/integrations/";
const PAGE_TITLE = "Integrations - Lift, Access Control, ERP & HRMS | Emsphere";
const PAGE_DESCRIPTION =
  "emSphere integrates with lifts, turnstiles, face biometric and access control devices, SAP / ERP and HRMS, so attendance, access and compliance run on a single connected system.";
const OG_IMAGE = turnstileImg.src;

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
   Hero visual — emSphere at the hub, connected systems around it.
   Pure markup + CSS; node positions are percentages on a circle.
   -------------------------------------------------------------------- */

const HUB_NODES = [
  { label: "Lift", icon: ArrowsDownUp, accent: true },
  { label: "Turnstile", icon: DoorOpen },
  { label: "Face Biometric", icon: ScanSmiley },
  { label: "Access Control", icon: ShieldCheck },
  { label: "SAP / ERP", icon: Database },
  { label: "HRMS", icon: UsersFour },
  { label: "Payroll", icon: Wallet },
  { label: "Canteen & Visitor", icon: ForkKnife },
];

const HUB_CSS = `
@keyframes intg-dash { to { stroke-dashoffset: -24; } }
@keyframes intg-pulse { 0%, 100% { transform: scale(1); opacity: .55; } 50% { transform: scale(1.12); opacity: .15; } }
.intg-line { stroke-dasharray: 3 5; animation: intg-dash 2.4s linear infinite; }
.intg-pulse { animation: intg-pulse 3.2s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) { .intg-line, .intg-pulse { animation: none; } }
`;

function IntegrationHub() {
  const radius = 39;
  const nodes = HUB_NODES.map((node, i) => {
    const angle = (i / HUB_NODES.length) * Math.PI * 2 - Math.PI / 2;
    return { ...node, x: 50 + radius * Math.cos(angle), y: 50 + radius * Math.sin(angle) };
  });

  return (
    <div
      role="img"
      aria-label="emSphere at the centre connected to lifts, turnstiles, face biometric devices, access control, SAP and ERP, HRMS, payroll, canteen and visitor systems"
      className="relative mx-auto aspect-square w-full max-w-[520px] lg:max-w-[min(560px,calc(100svh-210px))]"
    >
      <style>{HUB_CSS}</style>
      <span aria-hidden="true" className="absolute inset-[11%] rounded-full border border-dashed border-[#EFB000]/40" />
      <span aria-hidden="true" className="absolute inset-[27%] rounded-full bg-[#EFB000]/10" />
      <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {nodes.map((node) => (
          <line
            key={node.label}
            x1="50"
            y1="50"
            x2={node.x}
            y2={node.y}
            className="intg-line"
            stroke={node.accent ? "#EFB000" : "#c9b98a"}
            strokeWidth={node.accent ? 0.7 : 0.45}
          />
        ))}
      </svg>

      {/* Hub */}
      <div className="absolute left-1/2 top-1/2 flex h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <span aria-hidden="true" className="intg-pulse absolute inset-0 rounded-full bg-[#EFB000]/40" />
        <div className="relative flex h-full w-full flex-col items-center justify-center rounded-full bg-gradient-to-br from-[#efb000] to-[#d69e00] text-white shadow-[0_24px_50px_-20px_rgba(176,125,0,0.8)] ring-4 ring-white">
          <TreeStructure weight="fill" aria-hidden="true" className="h-[28%] w-[28%] text-white" />
          <span className={`${fontInter} mt-1 text-[clamp(11px,2.4vw,17px)] font-bold`}>emSphere</span>
        </div>
      </div>

      {/* Nodes */}
      {nodes.map((node) => (
        <div
          key={node.label}
          className="absolute flex w-[23%] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-center"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <span
            className={`flex aspect-square w-[58%] items-center justify-center rounded-2xl shadow-[0_14px_30px_-14px_rgba(0,0,0,0.35)] ${
              node.accent ? "bg-[#EFB000] text-white ring-4 ring-[#EFB000]/25" : "bg-white text-[#b07d00] ring-1 ring-black/5"
            }`}
          >
            <node.icon weight="fill" aria-hidden="true" className="h-1/2 w-1/2" />
          </span>
          <span className={`${fontInter} text-[clamp(10px,1.9vw,13px)] font-semibold leading-tight text-[#1f1f1f]`}>{node.label}</span>
        </div>
      ))}
    </div>
  );
}

/* --------------------------------------------------------------------
   Content — built from capabilities described across emsphere.com
   (CLMS, LMS, emCount, emMeal and emVisit pages and client testimonials).
   -------------------------------------------------------------------- */

const heroPoints = ["Face biometric & turnstile access", "Device-level compliance blocking", "SAP, ERP & HRMS ready"];

const liftFeatures = [
  {
    title: "Floor-wise access",
    text: "Only enrolled and authorised employees, contract workers and visitors can call a lift to the floors they are cleared for.",
    icon: Buildings,
  },
  {
    title: "Compliance blocking",
    text: "Access is blocked automatically for compliance violations like contract license expiry, work order expiry, continuous working or Overtime limit.",
    icon: Prohibit,
  },
  {
    title: "Face-based identity",
    text: "The same face biometric enrolment used at turnstiles and attendance terminals identifies people at the lift — no extra cards to manage.",
    icon: ScanSmiley,
  },
  {
    title: "Live floor headcount",
    text: "Real-time floor-wise and zone-wise count of people inside the premises, ready for evacuation lists in an emergency.",
    icon: UsersFour,
  },
];

const catalogue = [
  {
    title: "Lift Integration",
    text: "Extend emSphere access rules and compliance checks to your lifts for controlled, floor-wise movement.",
    icon: ArrowsDownUp,
    href: "#lift-integration",
  },
  {
    title: "Turnstile & Face Access",
    text: "From face-based turnstile access to attendance, contractor billing and compliance — one end-to-end system.",
    icon: DoorOpen,
    href: "/contract-labour-management-system-software/",
  },
  {
    title: "Biometric Devices",
    text: "Integrate with fingerprint attendance, fingerprint readers, access control systems, touchless face recognition systems, and more.",
    icon: ScanSmiley,
    href: "/labour-management-system-software/",
  },
  {
    title: "SAP & ERP",
    text: "End-to-end integrations between SAP, ERP & client’s existing biometric devices with data fetch and update functionality.",
    icon: Database,
    href: "/contract-labour-management-system-software/",
  },
  {
    title: "HRMS Integration",
    text: "We provide effective integration of technologies to simplify our customer’s workflow and boost efficiency.",
    icon: UsersFour,
    href: "/human-resource-management-system/",
  },
  {
    title: "Payroll & Finance",
    text: "Attendance, overtime and contractor billing flow straight into payroll, with HR and finance data exchanged seamlessly.",
    icon: Wallet,
    href: "/payroll-management-solution/",
  },
  {
    title: "Canteen",
    text: "Integrate with other systems to add employee enrolled for OT. Make placing a meal during OT easy.",
    icon: ForkKnife,
    href: "/canteen-management-system/",
  },
  {
    title: "Visitor Management",
    text: "Contract labour compliance workflows integrate with the Visitor Management System for one view of everyone on site.",
    icon: IdentificationCard,
    href: "/visitor-management-system/",
  },
];

const steps = [
  {
    title: "Enrol",
    text: "Employee and contract employee masters are created once — with documents, approvals and gate pass.",
    icon: UserCheck,
  },
  {
    title: "Sync",
    text: "The employee code and name are synchronized with the respective biometric reader location for enrollment purposes.",
    icon: TreeStructure,
  },
  {
    title: "Validate",
    text: "Every punch is checked against compliance rules, and custom messaging on devices prevents incorrect punches.",
    icon: ShieldCheck,
  },
  {
    title: "Allow or block",
    text: "Turnstiles, doors and lifts open only for compliant people — with live dashboards and mail notifications for the rest.",
    icon: CheckCircle,
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

const jsonLd = productPageJsonLd({
  url: PAGE_URL,
  name: "emSphere Integrations",
  description: PAGE_DESCRIPTION,
  subCategory: "Lift, Access Control, ERP and HRMS Integration",
  pageName: "Integrations",
  breadcrumbName: "Integrations",
});

/* --------------------------------------------------------------------
   Page
   -------------------------------------------------------------------- */

export default function IntegrationsPage() {
  return (
    <main className={`${instrumentSans.variable} ${inter.variable} hrms-page payroll-page intg-page w-full overflow-x-clip bg-[#FFFFFA] font-sans text-[#4c4c4c]`}>
      <ScrollReveal root=".intg-page" />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />

      {/* Hero — fills the viewport below the 88px header on desktop */}
      <section
        aria-labelledby="intg-hero-heading"
        className="relative isolate flex items-center overflow-hidden bg-[#FFFFFA] px-4 py-10 md:px-12 lg:h-[calc(100svh-88px)] lg:min-h-[600px] lg:max-h-[880px] lg:py-6"
      >
        <span aria-hidden="true" className="absolute -right-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-[#EFB000]/10 blur-3xl" />
        <span aria-hidden="true" className="absolute -bottom-48 -left-32 -z-10 h-[420px] w-[420px] rounded-full bg-[#1e7efe]/[0.05] blur-3xl" />
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
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
                  Integrations
                </li>
              </ol>
            </nav>
            <Eyebrow>Lift Integration &amp; more</Eyebrow>
            <h1 id="intg-hero-heading" className="text-[2rem] font-semibold leading-[1.15] text-[#1f1f1f] sm:text-[2.5rem] xl:text-[3rem]">
              Integrations that connect <span className="text-[#f8bb18]">lifts, turnstiles &amp; systems</span> to emSphere
            </h1>
            <p className={`max-w-xl text-base leading-[27px] md:text-lg md:leading-[30px] ${mutedText}`}>
              From face biometric devices and turnstiles to lifts, SAP / ERP and HRMS — emSphere works with the hardware and software you already run,
              giving you a single point of ownership for attendance, access and compliance.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="/contact-us/" data-request-demo className={`${primaryButton} text-[15px]`}>
                Request a demo
                <ArrowCircleIcon />
              </a>
              <a href="#lift-integration" className={`${outlineButton} text-[15px]`}>
                Explore Lift Integration
              </a>
            </div>
            <ul className="mt-1 flex flex-wrap gap-x-5 gap-y-2">
              {heroPoints.map((point) => (
                <li key={point} className="flex items-center gap-1.5 text-[13px] font-medium text-black/65">
                  <CheckCircle weight="fill" aria-hidden="true" className="h-4 w-4 text-[#EFB000]" />
                  {point}
                </li>
              ))}
            </ul>
          </header>

          <div className={`${revealZoom} w-full`}>
            <IntegrationHub />
          </div>
        </div>
      </section>

      {/* Lift Integration spotlight */}
      <section id="lift-integration" aria-labelledby="lift-heading" className="scroll-mt-24 px-4 py-12 md:px-12 md:py-16">
        <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[#FDF6E6] px-6 py-12 shadow-[inset_0_0_0_1px_#f0deba] md:px-12 md:py-16">
          <span aria-hidden="true" className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[#EFB000]/20 blur-3xl" />
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
            <div className="flex flex-col gap-6">
              <SectionHeader
                id="lift-heading"
                eyebrow="Lift Integration"
                title={
                  <>
                    Take your access rules <span className="text-[#efb000]">all the way to the lift</span>
                  </>
                }
                text="Integrated with your lift access control, emSphere decides who can travel where — using the same enrolment, compliance status and live headcount that already run your gates and attendance."
                align="left"
              />
              <div className={`${revealUp} relative overflow-hidden rounded-2xl ring-1 ring-[#f0deba]`}>
                <Image
                  src={turnstileImg}
                  alt="Contract worker verified on a face recognition terminal at a factory turnstile"
                  className="h-[240px] w-full object-cover sm:h-[300px]"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
                <span className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#1f1f1f] shadow">
                  <CheckCircle weight="fill" aria-hidden="true" className="h-4 w-4 text-[#0fb880]" />
                  Verified once — gates, turnstiles &amp; lifts
                </span>
              </div>
            </div>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {liftFeatures.map((item, index) => (
                <FeatureCard
                  key={item.title}
                  index={index}
                  className={revealUp}
                  style={stagger(index, 90)}
                  icon={<item.icon weight="fill" />}
                  title={item.title}
                  text={item.text}
                />
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Integration catalogue */}
      <section aria-labelledby="catalogue-heading" className="bg-[#FFFFFA] px-4 py-12 md:px-12 md:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <SectionHeader
            id="catalogue-heading"
            eyebrow="Integrations"
            title={
              <>
                One platform, <span className="text-[#efb000]">connected everywhere</span>
              </>
            }
            text="Every integration feeds the same employee and contract employee masters, so data is captured once and trusted everywhere."
          />
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {catalogue.map((item, index) => (
              /* Same hover card as FeatureCard (.em-card in globals.css), as a link. */
              <li key={item.title} style={stagger(index % 4, 90)} className={`${revealUp} em-card-item`}>
                <Link href={item.href} className="em-card group/card">
                  <span className="em-card-num" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="em-card-icon" aria-hidden="true">
                    <item.icon weight="fill" />
                  </span>
                  <h3 className="em-card-title">{item.title}</h3>
                  <p className="em-card-text">{item.text}</p>
                  <span className="mt-auto flex flex-col items-center gap-3 pt-1">
                    <span className={`${fontInter} inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#EFB000]`}>
                      Know More
                      <span aria-hidden="true" className="transition-[translate] duration-200 group-hover/card:translate-x-1">→</span>
                    </span>
                    <span className="em-card-bar" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section aria-labelledby="steps-heading" className="bg-[#FFFFFA] px-4 py-12 md:px-12 md:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <SectionHeader
            id="steps-heading"
            eyebrow="How it works"
            title={
              <>
                From enrolment to <span className="text-[#efb000]">access decision</span> in four steps
              </>
            }
          />
          <ol className="relative grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            <span aria-hidden="true" className="absolute left-[12%] right-[12%] top-[34px] hidden h-0.5 bg-gradient-to-r from-[#EFB000]/20 via-[#EFB000] to-[#EFB000]/20 lg:block" />
            {steps.map((step, index) => (
              <li key={step.title} style={stagger(index, 110)} className={`${revealUp} em-step relative flex flex-col items-center gap-4 text-center`}>
                <span className="em-step-icon relative flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#FDF6E6] text-[#EFB000] shadow-[inset_0_0_0_1.5px_#EFB000] ring-8 ring-[#FFFFFA]">
                  <step.icon weight="fill" aria-hidden="true" className="h-8 w-8" />
                  <span className={`${fontInter} absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#EFB000] text-[11px] font-bold text-white`}>
                    {index + 1}
                  </span>
                </span>
                <div className={`${goldCard} em-step-card flex w-full flex-1 flex-col items-center gap-2 p-5`}>
                  <h3 className="text-lg font-semibold text-[#1f1f1f]">{step.title}</h3>
                  <p className={`text-[14.5px] leading-[23px] ${mutedText}`}>{step.text}</p>
                  <span className="em-card-bar mt-2" aria-hidden="true" />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Hardware partners */}
      <section aria-labelledby="partners-heading" className="bg-[#FFFFFA] px-4 py-12 md:px-12 md:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <SectionHeader
            id="partners-heading"
            eyebrow="Hardware partnerships"
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
                className={`${revealZoom} group/card flex aspect-[13/8] w-[calc(33.333%-0.5rem)] items-center justify-center overflow-hidden rounded-xl bg-white shadow-[inset_0_0_0_1px_#ececec,0_6px_20px_-12px_rgba(0,0,0,0.25)] ${motion} hover:-translate-y-1 hover:shadow-[inset_0_0_0_1.5px_#f8bb18,0_14px_28px_-12px_rgba(0,0,0,0.25)] sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(25%-0.75rem)] xl:w-[calc(16.666%-0.834rem)]`}
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

      {/* Single point of ownership — client quote */}
      <section aria-labelledby="ownership-heading" className="bg-[#FFFFFA] px-4 py-12 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 rounded-[32px] bg-[#fdf6e6] p-6 shadow-[inset_0_0_0_1px_#f0deba] md:p-10 lg:grid-cols-[1fr_1fr] lg:gap-14 lg:p-14">
          <div className="flex flex-col gap-5">
            <SectionHeader
              id="ownership-heading"
              eyebrow="Complete ownership"
              title={
                <>
                  Complete Ownership Of <span className="text-[#efb000]">Hardware &amp; Software</span>
                </>
              }
              text="Companies often struggle when managing separate vendors for software and hardware. We offer a unique solution as a one-stop destination for both software and hardware, taking complete ownership of both aspects, ensuring smooth functionality."
              align="left"
            />
            <p className={`${revealUp} text-[15px] leading-[26px] ${mutedText}`}>
              Read how it works for contract labour in our{" "}
              <Link href="/labour-management-system-software/" className={inlineLink}>
                Labour Management System Software
              </Link>{" "}
              and{" "}
              <Link href="/contract-labour-management-system-software/" className={inlineLink}>
                Contract Labour Management System
              </Link>
              .
            </p>
          </div>
          <figure className={`${revealFromRight} relative flex flex-col gap-5 rounded-3xl bg-white p-7 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.35)] md:p-9`}>
            <Quotes weight="fill" aria-hidden="true" className="h-10 w-10 text-[#EFB000]" />
            <blockquote className="text-lg font-medium leading-[30px] text-[#1f1f1f] md:text-xl md:leading-[32px]">
              The best part was that emSphere provided end to end solution from Face biometric devices to the contract labour management software which
              helped us to have a single point of ownership for the entire process across 12000+ employees at 7 Plant locations.
            </blockquote>
            <figcaption className="border-t border-black/10 pt-4">
              <p className="font-semibold text-[#1f1f1f]">Mahesh Jadhav</p>
              <p className={`text-sm ${mutedText}`}>Sr HR Manager · Yazaki</p>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Request a demo */}
      <section aria-labelledby="demo-heading" className="bg-[#FFFFFA] px-4 py-12 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div className="flex flex-col gap-6">
            <SectionHeader
              id="demo-heading"
              eyebrow="Talk to an expert"
              title={
                <>
                  Plan your <span className="text-[#efb000]">integration</span> with our team
                </>
              }
              text="Tell us about your lifts, turnstiles, devices and ERP — our consultants will map the integration and show it working in a demo."
              align="left"
            />
            <ul className="flex flex-col gap-3">
              {[
                "After submitting the form, your enquiry is immediately allocated to the appropriate team",
                "We schedule a call at the earliest to evaluate your needs and choose the best course of action",
                "Our experts reach out to you within 60 mins",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-[23px] text-[#1f1f1f]">
                  <CheckCircle weight="fill" aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#EFB000]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${revealZoom} mx-auto w-full max-w-md`}>
            <LeadForm compact product="emSphere integrations" title="Request a demo" subtitle="Our team will reach out to schedule your walkthrough." />
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
