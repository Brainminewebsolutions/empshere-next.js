import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instrument_Sans, Inter } from "next/font/google";
import ScrollReveal from "@/components/ScrollReveal";
import BackToTop from "@/components/BackToTop";
import FlagshipProducts from "@/components/FlagshipProducts";
import DemoRequestForm from "@/components/DemoRequestForm";
import StopwatchCounter from "@/components/StopwatchCounter";
import HeadcountHeroVector from "@/components/HeadcountHeroVector";

/* --------------------------------------------------------------------
   Images — every image this page uses lives in
   app/images/headcount-management-software and is imported by name.
   -------------------------------------------------------------------- */

import heroImg from "../images/headcount-management-software/hero-connected-employees-headcount-dashboard.webp";

import dashboardImg from "../images/headcount-management-software/feature-realtime-floor-zone-dashboard.webp";
import automationImg from "../images/headcount-management-software/feature-automated-evacuation-list.webp";
import alertsImg from "../images/headcount-management-software/feature-red-zone-sms-email-alerts.webp";


// Title and description are the page's Rank Math values on the current site.
const PAGE_URL = "https://www.emsphere.com/headcount-management-software/";
const PAGE_TITLE = "Headcount & Staffing Management Software - Emsphere";
const PAGE_DESCRIPTION =
  "Emsphere Headcount & Staffing Management Software offers a unique capability to display the total count of people inside company premises in real time.";
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

// Solid icons drawn for this page matching the HRMS vibrant solid-tile + white icon style.
const ICON_PATHS = {
  count: (
    <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.003.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.232.75.75 0 0 0 .364-.63v-.12a5.625 5.625 0 0 0-5.188-5.615Z" />
  ),
  rescue: (
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
  ),
  safety: (
    <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
  ),
};

function LineIcon({ name, className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      {ICON_PATHS[name]}
    </svg>
  );
}

function IconTile({ name, bg, className = "h-20 w-20 rounded-2xl", iconClassName = "h-10 w-10" }) {
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
      <h2 id={id} className={`text-2xl font-semibold md:text-[2.1rem] md:leading-[44px] ${dark ? "text-white" : ""}`}>
        {title}
      </h2>
      {text && <p className={`text-base leading-[25px] md:text-lg md:leading-[28px] ${dark ? "text-white/75" : mutedText}`}>{text}</p>}
    </header>
  );
}

/* --------------------------------------------------------------------
   Content — all copy from https://www.emsphere.com/headcount-management-software/
   -------------------------------------------------------------------- */

const benefits = [
  {
    title: "Know the count",
    text: "Know real time count of people inside the company premises.",
    icon: "count",
    alt: "Digital counter showing the number of people on premises",
    bg: "#0077c2",
  },
  {
    title: "Saves Lives and Time",
    text: "In case of emergency triggers during accidental fire, automated printed list of people inside by system, saving time and more importantly lives.",
    icon: "rescue",
    alt: "Hand holding a clock representing time saved during evacuation",
    bg: "#0fb880",
  },
  {
    title: "Prevents Accidents",
    text: "Get alerts on email and SMS as soon as someone enters a sensitive zone, preventing mishaps.",
    icon: "safety",
    alt: "Worker with a safety shield and check mark representing accident prevention",
    bg: "#f8bb18",
  },
];

const featureTabs = [
  {
    id: "dashboard",
    label: "Dashboard",
    title: "Dashboard",
    paragraphs: ["A real-time dashboard which can tell you Floor-wise, Zone-wise count of people within the premises on any given day."],
    image: dashboardImg,
    imageAlt: "emCount dashboard with activity charts and a numbers panel showing floor-wise headcount percentages",
  },
  {
    id: "automation",
    label: "Automation",
    title: "Automation",
    paragraphs: [
      "Every second matters during emergency evacuation from large factories and hazardous work environments. An automated printed list of people inside the premises can expedite evacuation and save lives.",
    ],
    image: automationImg,
    imageAlt: "Calendar board of automated schedule cards representing an auto-generated evacuation list",
  },
  {
    id: "alerts",
    label: "Alerts",
    title: "Alert in time is a timely alert!",
    paragraphs: [
      "System that alerts you when a person is entering a red or flagged zone. Alerts via two channels, SMS and email so that you don’t miss it.",
      "Monitor overcrowding with timely notification and manage capacity real time.",
    ],
    image: alertsImg,
    imageAlt: "Phone SMS and email inbox both showing a warning alert that a person is entering a red or flagged zone",
  },
];

const iloStats = [
  { value: "6,50,000", label: "deaths an year as per ILO due to hazardous substances" },
  { value: "4,000", label: "fatal accidents recorded at work" },
  { value: "9,00,000", label: "employees are injured annually" },
];


const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "emCount — Headcount Management Software",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: PAGE_DESCRIPTION,
      url: PAGE_URL,
      publisher: { "@type": "Organization", name: "Emsphere Technologies", url: "https://www.emsphere.com/" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.emsphere.com/" },
        { "@type": "ListItem", position: 2, name: "Headcount Management Software", item: PAGE_URL },
      ],
    },
  ],
};

/* --------------------------------------------------------------------
   Page
   -------------------------------------------------------------------- */

export default function HeadcountManagementSoftwarePage() {
  return (
    <main className={`${instrumentSans.variable} ${inter.variable} hrms-page payroll-page hc-page w-full overflow-x-clip bg-white font-sans text-[#4c4c4c]`}>
      <ScrollReveal root=".hc-page" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      {/* Hero */}
      <section
        aria-labelledby="hc-hero-heading"
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
                  Headcount Management Software
                </li>
              </ol>
            </nav>
            <h1 id="hc-hero-heading" className="text-3xl font-semibold leading-tight text-[#1f1f1f] md:text-[2.6rem] md:leading-[1.2]">
              Get <span className="text-[#f8bb18]">Total Count of People</span> Within Company Premises in ‘One Glance’
            </h1>
            <p className={`text-base leading-[26px] md:text-lg md:leading-[29px] ${mutedText}`}>
              A system to know who, where and how many, in large shop floors and factories, multi storied infrastructure for quick evacuation in case of
              emergencies.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="#request-demo" className={`${primaryButton} text-[15px]`}>
                Call For Demo
                <ArrowCircleIcon />
              </a>
              <a href="#hc-features" className={`${outlineButton} text-[15px]`}>
                Why emCount?
              </a>
            </div>
          </header>

          <div className={`${revealFromRight} relative w-full max-w-xl lg:w-[48%] lg:max-w-none`}>
            <HeadcountHeroVector />
          </div>
        </div>
      </section>

      {/* emCount Benefits */}
      <section aria-labelledby="benefits-heading" className="px-4 py-14 md:px-12 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <SectionHeader
            id="benefits-heading"
            title={
              <>
                em<span className="text-[#f8bb18]">Count</span> Benefits
              </>
            }
          />
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {benefits.map((item, index) => (
              <li key={item.title} style={stagger(index)} className={`${revealUp} ${goldCard} ${liftGold} flex flex-col items-center gap-4 px-6 pb-8 pt-8 text-center`}>
                <IconTile name={item.icon} bg={item.bg} className="h-20 w-20 rounded-2xl" iconClassName="h-10 w-10" />
                <h3 className="text-xl font-semibold text-[#1f1f1f]">{item.title}</h3>
                <p className={`text-[15px] leading-[24px] ${mutedText}`}>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 15,00,000 workers banner */}
      <section aria-labelledby="workers-heading" className="px-4 md:px-12">
        <div
          className={`${revealZoom} relative mx-auto flex max-w-7xl flex-col items-center gap-2 overflow-hidden rounded-2xl bg-[#efb000] px-6 py-10 text-center shadow-[0_24px_50px_-24px_rgba(239,176,0,0.8)] md:py-14`}
        >
          <div aria-hidden="true" className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/25 blur-2xl" />
          <div aria-hidden="true" className="absolute -bottom-12 -right-6 h-44 w-44 rounded-full bg-[#0077c2]/20 blur-2xl" />
          <h2 id="workers-heading" className="relative text-2xl font-semibold text-black md:text-[2.4rem] md:leading-[1.25]">
            Keeps <StopwatchCounter value="15,00,000" className="font-bold text-[#0f162a]" /> workers safe across India
          </h2>
        </div>
      </section>

      {/* Why emCount? — CSS-only tabs (hidden radios + .hrms-showcase rules in globals.css) */}
      <section id="hc-features" aria-labelledby="features-heading" className="scroll-mt-24 px-4 py-14 md:px-12 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <SectionHeader
            id="features-heading"
            title={
              <>
                Why em<span className="text-[#f8bb18]">Count</span>?
              </>
            }
            text="Powerful Advanced Features"
          />

          <div className={`${revealUp} hrms-showcase flex flex-col gap-6`}>
            <div
              role="radiogroup"
              aria-label="emCount features"
              className="mx-auto flex w-full max-w-md gap-1.5 rounded-full bg-[#f3f5f8] p-1.5 shadow-[inset_0_0_0_1px_#e6e9ee]"
            >
              {featureTabs.map((tab, i) => (
                <label
                  key={tab.id}
                  className={`flex min-h-11 flex-1 cursor-pointer items-center justify-center rounded-full px-3 text-sm font-semibold text-[#1f1f1f] transition-[background-color,color,box-shadow] duration-300 ${ease} hover:text-[#EFB000] has-[:checked]:bg-[#EFB000] has-[:checked]:text-white has-[:checked]:shadow-[0_8px_18px_-8px_rgba(239,176,0,0.8)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#EFB000] sm:text-[15px]`}
                >
                  <input type="radio" name="hc-feature-tab" value={tab.id} data-tab-index={i} defaultChecked={i === 0} className="sr-only" />
                  {tab.label}
                </label>
              ))}
            </div>

            {featureTabs.map((tab, i) => (
              <div key={tab.id} data-tab-item={i} className="hrms-tab-swap">
                <div className="flex flex-col gap-6 rounded-2xl bg-[#eef4fd] p-4 shadow-[inset_0_0_0_0.744px_#dddddd,0px_0px_14.874px_-6.693px_rgba(0,0,0,0.25)] md:p-8 lg:flex-row lg:items-center lg:gap-10">
                  <div className="overflow-hidden rounded-[14px] bg-white lg:w-[52%]">
                    <Image src={tab.image} alt={tab.imageAlt} className="h-auto w-full" sizes="(min-width: 1024px) 40vw, 100vw" />
                  </div>
                  <div className="flex flex-col gap-4 lg:w-[48%]">
                    <h3 className="text-2xl font-semibold text-[#1f1f1f] md:text-[1.75rem]">{tab.title}</h3>
                    {tab.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 24)} className={`text-base leading-[26px] md:text-[17px] ${mutedText}`}>
                        {paragraph}
                      </p>
                    ))}
                    <a href="#request-demo" className={`${primaryButton} self-start text-sm`}>
                      Know More
                      <ArrowCircleIcon className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why should you care? — ILO numbers + demo form */}
      <section
        aria-labelledby="care-heading"
        className="relative overflow-hidden bg-[#fdf6e6] bg-[radial-gradient(circle_at_10%_15%,rgba(248,187,24,0.3),transparent_28%),radial-gradient(circle_at_95%_75%,rgba(248,187,24,0.3),transparent_28%)] px-4 py-14 md:px-12 md:py-20"
      >
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#f8bb18]/20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#f8bb18]/15 blur-3xl" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
          <div className={`${revealFromLeft} flex w-full flex-col gap-8 lg:max-w-xl`}>
            <SectionHeader
              id="care-heading"
              align="left"
              title={
                <>
                  Why should you <span className="text-[#f8bb18]">care?</span>
                </>
              }
              text="Numbers, as per International Labour Organization for India, are alarming."
            />
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {iloStats.map((stat, index) => (
                <li
                  key={stat.label}
                  style={stagger(index, 100)}
                  className={`${revealUp} ${goldCard} ${liftGold} flex flex-col gap-2 p-5`}
                >
                  <StopwatchCounter
                    value={stat.value}
                    delay={index * 140}
                    className="text-2xl font-bold text-[#efb000] md:text-[1.9rem]"
                  />
                  <p className={`text-sm leading-[21px] ${mutedText}`}>{stat.label}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className={`${revealFromRight} relative w-full max-w-md lg:w-[42%] lg:max-w-[450px]`}>
            <div aria-hidden="true" className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#f8bb18]/30 via-[#fee6b1]/20 to-transparent blur-2xl -z-10" />
            <DemoRequestForm
              product="Headcount Management Software (emCount)"
              title="Start Now"
              subtitle="Request a demo of emCount — our team will reach out to schedule it."
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
