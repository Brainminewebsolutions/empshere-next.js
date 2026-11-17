import Image from "next/image";
import Link from "next/link";
import { Instrument_Sans, Inter } from "next/font/google";
import BackToTop from "@/components/BackToTop";
import ScrollReveal from "@/components/ScrollReveal";
import FlagshipProducts from "@/components/FlagshipProducts";
import StopwatchCounter from "@/components/StopwatchCounter";
import PhosphorIconTile from "@/components/PhosphorIconTile";
import {
  Buildings,
  Car,
  CheckCircle,
  Cpu,
  Drop,
  Factory,
  Handshake,
  Pill,
  ShieldCheck,
  TrendUp,
  Truck,
  UsersThree,
} from "@phosphor-icons/react/ssr";

import { CLIENTS } from "@/lib/clients";
import { DEFAULT_OG_IMAGE, TWITTER_SITE } from "@/lib/seo";

const PAGE_URL = "https://www.emsphere.com/our-clients/";
const PAGE_TITLE = "Our Clients- Emsphere";
const PAGE_DESCRIPTION =
  "Emsphere successfully implemented HR, Payroll, visitor management and canteen management systems in manufacturing, FMCG, chemical, pharma & healthcare, IT, BPO industry.";

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
    images: [DEFAULT_OG_IMAGE],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_SITE,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fontInstrument = "font-[family-name:var(--font-instrument-sans)]";
const fontInter = "font-[family-name:var(--font-inter)]";

const ease = "ease-[cubic-bezier(0.16,1,0.3,1)]";
const motion = `transition-[translate,scale,box-shadow,background-color,border-color] duration-300 ${ease}`;
const revealUp = "reveal-on-scroll reveal-fade-up";
const revealFromLeft = "reveal-on-scroll reveal-fade-right";
const revealFromRight = "reveal-on-scroll reveal-fade-left";
const revealZoom = "reveal-on-scroll reveal-zoom-in";
const stagger = (index, step = 80) => ({ transitionDelay: `${index * step}ms` });

const goldCard =
  "bg-white rounded-xl shadow-[inset_0_0_0_0.789px_#EFB000,0px_3px_12px_-4px_rgba(0,0,0,0.07)]";
const greyCard =
  "bg-white rounded-2xl shadow-[inset_0_0_0_0.814px_#e5e5e5,0px_3px_12px_-4px_rgba(0,0,0,0.06)]";
const softCard =
  "rounded-[11px] shadow-[inset_0_0_0_0.601px_#e5e5e5,0px_2px_8px_-2px_rgba(0,0,0,0.05)]";
const mutedText = "text-[rgba(0,0,0,0.64)]";

const liftGold = `group/card ${motion} hover:-translate-y-1 hover:shadow-[inset_0_0_0_1.5px_#EFB000,0px_8px_20px_-6px_rgba(239,176,0,0.2)]`;
const liftGrey = `group/card ${motion} hover:-translate-y-1.5 hover:shadow-[inset_0_0_0_0.814px_#dddddd,0px_10px_22px_-6px_rgba(0,0,0,0.1)]`;
const arrowNudge = `transition-[translate] duration-200 ${ease} group-hover/btn:translate-x-[3px]`;

const primaryButton = `group/btn inline-flex items-center justify-center gap-2 rounded-[9px] bg-[#EFB000] px-6 py-3 ${fontInter} font-semibold text-white ${motion} hover:-translate-y-0.5 hover:bg-[#d99e00] hover:shadow-[0_8px_18px_-4px_rgba(239,176,0,0.45)]`;
const outlineButton = `group/btn inline-flex items-center justify-center gap-2 rounded-[9px] border border-[#d6d6d6] bg-white px-6 py-3 ${fontInter} font-semibold text-[#1f1f1f] ${motion} hover:-translate-y-0.5 hover:border-[#EFB000] hover:bg-[#fff5d9]/40 hover:text-[#b07d00] hover:shadow-[0_6px_16px_-4px_rgba(0,0,0,0.08)]`;

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

function SectionHeader({ id, eyebrow, title, text, align = "center", className = "" }) {
  const alignment = align === "center" ? "mx-auto text-center items-center" : "items-start";
  return (
    <header className={`${revealUp} flex max-w-3xl flex-col gap-3 ${alignment} ${className}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff5d9] px-3.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#b07d00]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#EFB000]" />
          {eyebrow}
        </span>
      )}
      <h2 id={id} className={`${fontInstrument} text-2xl font-bold text-[#1f1f1f] md:text-3xl lg:text-4xl leading-tight`}>
        {title}
      </h2>
      {text && (
        <p className={`text-base leading-relaxed ${mutedText} md:text-lg`}>
          {text}
        </p>
      )}
    </header>
  );
}

const STATS = [
  { value: "500+", label: "Enterprise Clients", detail: "Partnering across PAN-India manufacturing hubs" },
  { value: "20,00,000+", label: "Active Workers Managed", detail: "Automated daily through biometric & CLMS systems" },
  { value: "15+", label: "Years of HR Excellence", detail: "Domain-proven expertise in enterprise automation" },
  { value: "99.8%", label: "Statutory Compliance Rate", detail: "Zero non-compliance penalty track record" },
];

const INDUSTRY_DOMAINS = [
  {
    icon: Car,
    title: "Automotive & Mobility",
    desc: "Powering assembly lines, contractor fleets, and multi-tier supplier compliance for leaders like Mercedes-Benz, Mahindra, TVS Motor, Tata AutoComp, ZF, and Varroc.",
    brands: "Mercedes-Benz · Mahindra · TVS Motor · Tata AutoComp · ZF · Varroc · Gabriel · Maxion Wheels",
  },
  {
    icon: Factory,
    title: "Heavy Engineering, Metals & Defence",
    desc: "Rigorous site safety access, contractor gatepass, and shift management for mission-critical plants and foundries like L&T Defence, Cummins, Kirloskar, and Shyam Metalics.",
    brands: "L&T Defence · Cummins · Kirloskar · Shyam Metalics · Ratnamani · Skipper · Rashmi Group",
  },
  {
    icon: Drop,
    title: "Chemical, Energy & Building Materials",
    desc: "Strict adherence to hazardous work norms, gate security, and statutory labour laws across high-volume plants like BASF, Nayara, JK Cement, Castrol, and Nerolac.",
    brands: "BASF · Nayara Energy · JK Cement · Nuvoco · Castrol · Kansai Nerolac · Dow · Premier Energies",
  },
  {
    icon: Pill,
    title: "Pharma & Healthcare",
    desc: "GMP-ready contractor onboarding, attendance, and compliance for pharmaceutical plants, biotech facilities, and hospital networks.",
    brands: "Mylan · Centrient · Enzene · BDR Pharmaceuticals · Nipro · Medanta",
  },
  {
    icon: Cpu,
    title: "Technology & High-Tech Manufacturing",
    desc: "Integrated HRMS, attendance automation, and employee self-service for global IT, consulting, and electronics leaders including Wipro, Capgemini, Haier, and Vishay.",
    brands: "Wipro · Capgemini · Haier · Vishay · PARI",
  },
  {
    icon: Truck,
    title: "E-commerce, Logistics & Services",
    desc: "High-volume workforce scheduling, warehouse attendance, and contractor billing for fast-moving fulfilment and service operations.",
    brands: "Flipkart · DHL · Reliance Foundation · BPTP",
  },
];

export default function ClientsPage() {
  return (
    <main
      className={`${instrumentSans.variable} ${inter.variable} animated-page w-full overflow-x-hidden bg-[#FFFFFA] font-sans text-[#4c4c4c]`}
    >
      <ScrollReveal root=".animated-page" />

      {/* Hero Section */}
      <section
        aria-labelledby="clients-hero-heading"
        className="relative bg-[#FFFFFA] px-4 pb-12 pt-8 md:px-12 md:pb-16 md:pt-12"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <div className="flex flex-col items-center gap-6 text-center">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className={`${fontInter} text-[13px] font-medium text-black/55`}>
              <ol className="flex flex-wrap items-center justify-center gap-1.5">
                <li>
                  <Link href="/" className="transition-colors hover:text-[#0077c2]">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-black/35">›</li>
                <li aria-current="page" className="text-black/80 font-semibold">
                  Clients &amp; Partners
                </li>
              </ol>
            </nav>

            {/* Original page heading + tagline */}
            <p className={`${revealUp} ${fontInter} text-sm font-semibold uppercase tracking-[0.14em] text-[#b07d00]`}>
              Our Grand Slams · Everything starts with the customer
            </p>

            {/* Headline */}
            <h1
              id="clients-hero-heading"
              className={`${fontInstrument} ${revealUp} max-w-4xl text-3xl font-bold leading-tight text-[#1f1f1f] sm:text-4xl md:text-5xl lg:text-[3.35rem]`}
            >
              Trusted by <span className="text-[#EFB000]">500+ Enterprise Leaders</span> Across India
            </h1>

            {/* Subtitle */}
            <p className={`${revealUp} max-w-2xl text-base leading-relaxed ${mutedText} sm:text-lg md:text-xl`}>
              Proud to partner with 500+ leading enterprises across diverse industries, empowering their workforce and operations with reliable HR &amp; compliance technology.
            </p>

            {/* Action Buttons */}
            <div className={`${revealUp} flex flex-wrap items-center justify-center gap-4 pt-2`}>
              <Link href="/contact-us" className={`${primaryButton} text-[15px]`}>
                Partner With Us
                <ArrowCircleIcon />
              </Link>
              <a href="#clients-grid" className={`${outlineButton} text-[15px]`}>
                View All Clients
              </a>
            </div>
          </div>

          {/* Key Metrics Strip */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-4 md:gap-5">
            {STATS.map((stat, index) => (
              <div
                key={stat.label}
                style={stagger(index, 90)}
                className={`${revealUp} ${greyCard} ${liftGrey} flex flex-col items-center justify-center gap-1.5 p-5 text-center`}
              >
                <div className={`${fontInstrument} text-2xl font-bold text-[#EFB000] sm:text-3xl md:text-4xl`}>
                  <StopwatchCounter value={stat.value} delay={index * 150} />
                </div>
                <p className="text-sm font-semibold text-[#1f1f1f] sm:text-base">
                  {stat.label}
                </p>
                <p className={`text-xs leading-normal ${mutedText} hidden sm:block`}>
                  {stat.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Clients Grid Section */}
      <section
        id="clients-grid"
        aria-labelledby="clients-grid-heading"
        className="scroll-mt-20 bg-[#FFFFFA] px-4 py-12 md:px-12 md:py-20"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-12">
          <SectionHeader
            id="clients-grid-heading"
            eyebrow="Enterprise Portfolio"
            title={
              <>
                Our Clients &amp; <span className="text-[#EFB000]">Partners</span>
              </>
            }
            text="From world-class automobile manufacturing plants to heavy engineering and high-tech consulting hubs, explore the prominent brands scaling their workforce with emSphere."
          />

          {/* Client Cards Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 sm:gap-6">
            {CLIENTS.map((client, index) => (
              <article
                key={client.name}
                style={stagger(index % 8, 50)}
                className={`${revealUp} ${goldCard} ${liftGold} group/client flex flex-col items-center justify-between p-4 text-center transition-all duration-300 hover:border-[#EFB000] sm:p-6`}
              >
                {/* Logo Frame */}
                <div className="flex h-20 w-full items-center justify-center overflow-hidden rounded-lg bg-[#fafaf6] p-3 transition-colors duration-300 group-hover/client:bg-white sm:h-24">
                  <Image
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className="h-auto max-h-12 w-auto max-w-full object-contain transition-transform sm:max-h-16 sm:max-w-[170px] duration-300 group-hover/client:scale-105"
                    sizes="180px"
                  />
                </div>

                {/* Client Meta */}
                <div className="mt-4 flex flex-col items-center gap-1.5 w-full">
                  <h3 className="text-[15px] font-semibold text-[#1f1f1f] group-hover/client:text-[#b07d00] transition-colors leading-tight line-clamp-2 sm:text-base sm:line-clamp-1">
                    {client.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#fff5d9] px-2.5 py-0.5 text-[11px] font-semibold text-[#b07d00]">
                    {client.category}
                  </span>
                </div>

                {/* Verified Footer */}
                <div className="mt-4 flex w-full items-center justify-center gap-1.5 border-t border-[#f0f0f0] pt-3 text-[11px] font-medium text-black/50">
                  <CheckCircle weight="fill" className="h-3.5 w-3.5 text-[#22c55e]" />
                  <span>Enterprise Client</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Domains Showcase */}
      <section
        aria-labelledby="domains-heading"
        className="bg-[#FFFFFA] px-4 py-12 md:px-12 md:py-16"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <SectionHeader
            id="domains-heading"
            eyebrow="Sector Depth"
            title={
              <>
                Industry-Specific <span className="text-[#EFB000]">Workforce Solutions</span>
              </>
            }
            text="Every sector has its unique compliance laws, shift rotations, and contractor dynamics. emSphere is engineered to adapt."
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {INDUSTRY_DOMAINS.map((domain, index) => (
              <div
                key={domain.title}
                style={stagger(index, 100)}
                className={`${revealUp} ${greyCard} ${liftGrey} flex flex-col justify-between gap-5 p-6 sm:p-8`}
              >
                <div className="flex items-start gap-4">
                  <PhosphorIconTile
                    icon={domain.icon}
                    className="h-13 w-13 rounded-2xl shadow-sm"
                    iconClassName="h-7 w-7"
                  />
                  <div>
                    <h3 className={`${fontInstrument} text-xl font-bold text-[#1f1f1f] sm:text-2xl`}>
                      {domain.title}
                    </h3>
                    <p className={`mt-2 text-sm leading-relaxed sm:text-[15px] ${mutedText}`}>
                      {domain.desc}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-[#fff5d9]/60 px-4 py-3 border border-[#f8bb18]/30">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#b07d00]">
                    Featured Partnerships
                  </p>
                  <p className="mt-1 text-xs font-semibold text-[#1f1f1f]">
                    {domain.brands}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Callout Card */}
      <section className="bg-[#FFFFFA] px-4 py-10 md:px-12">
        <div
          className={`${revealZoom} relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 rounded-2xl bg-[#fff5d9] p-8 text-center border border-[#EFB000]/40 shadow-[0_12px_28px_-12px_rgba(239,176,0,0.25)] md:flex-row md:p-12 md:text-left`}
        >
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 self-center text-xs font-bold uppercase tracking-wider text-[#b07d00] md:self-start">
              <ShieldCheck weight="fill" className="h-4 w-4 text-[#EFB000]" />
              Enterprise Governance
            </span>
            <h2 className={`${fontInstrument} text-2xl font-bold text-[#1f1f1f] md:text-3xl`}>
              Join the growing network of industry leaders
            </h2>
            <p className={`text-base leading-relaxed ${mutedText}`}>
              Transform your workforce management, contractor governance, and statutory payroll operations with a single integrated platform.
            </p>
          </div>
          <Link
            href="/contact-us"
            className={`${primaryButton} shrink-0 text-sm md:text-base`}
          >
            Connect With Us
            <ArrowCircleIcon />
          </Link>
        </div>
      </section>

      {/* Flagship Products */}
      <FlagshipProducts className="bg-[#FFFFFA]" />

      {/* Signature 2-Column Contact CTA (Matching HRMS Page) */}
      <section aria-label="Contact emSphere" className="bg-[#FFFFFA] px-6 py-12 min-[769px]:py-[88px]">
        <div className="mx-auto flex max-w-275 flex-col items-center justify-center gap-9 text-black min-[1081px]:flex-row min-[1081px]:gap-20">
          {[
            { title: "Ready to talk?", cta: "Talk to Sales", reveal: revealFromLeft },
            { title: "Want to know more?", cta: "Book Demo", reveal: revealFromRight },
          ].map((col, index) => (
            <div key={col.title} className="contents">
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
                  data-request-demo=""
                  className={`group/btn inline-flex w-full max-w-65 items-center justify-center rounded-lg bg-[#EFB000] px-6 py-[13px] ${fontInter} text-[15px] font-semibold tracking-[0.02em] text-white ${motion} hover:-translate-y-0.5 hover:bg-[#d99e00] hover:shadow-[0_8px_18px_-4px_rgba(239,176,0,0.45)] active:translate-y-0 min-[769px]:w-auto min-[769px]:max-w-none min-[769px]:min-w-[145px] min-[769px]:px-[30px]`}
                >
                  {col.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <BackToTop />
    </main>
  );
}
