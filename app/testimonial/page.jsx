import Image from "next/image";
import Link from "next/link";
import { Instrument_Sans, Inter } from "next/font/google";
import BackToTop from "@/components/BackToTop";
import ScrollReveal from "@/components/ScrollReveal";
import FlagshipProducts from "@/components/FlagshipProducts";
import StopwatchCounter from "@/components/StopwatchCounter";
import PhosphorIconTile from "@/components/PhosphorIconTile";
import StarIcon from "@/components/StarIcon";
import {
  Buildings,
  CheckCircle,
  Clock,
  Quotes,
  SealCheck,
  ShieldCheck,
  TrendUp,
  UsersThree,
} from "@phosphor-icons/react/ssr";

// Client testimonial logos (tightly cropped so they size consistently)
import logoYazakiTestimonial from "../images/testimonials/logo-yazaki.png";
import logoYashaswiTestimonial from "../images/testimonials/logo-yashaswi-wide.png";
import logoYashaswiStacked from "../images/testimonials/logo-yashaswi.png";
import logoVarrocTestimonial from "../images/testimonials/logo-varroc-excellence.png";
import logoVishayTestimonial from "../images/testimonials/logo-vishay.png";
import logoNerolacTestimonial from "../images/testimonials/logo-kansai-nerolac.png";
import logoReliableAutoTestimonial from "../images/testimonials/logo-reliable-autotech.png";
import logoKoresTestimonial from "../images/testimonials/logo-kores.png";
import logoMahindraMahindraTestimonial from "../images/testimonials/logo-mahindra.png";
import logoJkCement from "../images/testimonials/logo-jk-cement-wide.png";
import { fitLogo } from "@/lib/clients";
import { DEFAULT_OG_IMAGE, TWITTER_SITE } from "@/lib/seo";

const PAGE_URL = "https://www.emsphere.com/testimonial/";
const PAGE_TITLE = "Clients Testimonials - Emsphere";
const PAGE_DESCRIPTION =
  "Client satisfaction is our ultimate goal. They have shared a few kind words to express their satisfaction with our HR Management System.";

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
const stagger = (index, step = 90) => ({ transitionDelay: `${index * step}ms` });

const goldCard =
  "bg-white rounded-xl shadow-[inset_0_0_0_0.789px_#EFB000,0px_3px_12px_-4px_rgba(0,0,0,0.07)]";
const greyCard =
  "bg-white rounded-2xl shadow-[inset_0_0_0_0.814px_#e5e5e5,0px_3px_12px_-4px_rgba(0,0,0,0.06)]";
const softCard =
  "rounded-[14px] shadow-[inset_0_0_0_0.744px_#e5e5e5,0px_4px_16px_-4px_rgba(0,0,0,0.06)]";
const mutedText = "text-[rgba(0,0,0,0.64)]";

const liftGold = `group/card ${motion} hover:-translate-y-1 hover:shadow-[inset_0_0_0_1.5px_#EFB000,0px_10px_24px_-6px_rgba(239,176,0,0.22)]`;
const liftGrey = `group/card ${motion} hover:-translate-y-1.5 hover:shadow-[inset_0_0_0_0.814px_#dddddd,0px_12px_26px_-6px_rgba(0,0,0,0.1)]`;
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

// Complete testimonials data - 100% preserved
const TESTIMONIALS = [
  {
    company: "JK Cement",
    quote:
      "As a rapidly growing organisation, managing a diverse contract workforce of over 10,000 employees across 12+ plants creates complex operational challenges, such as inconsistent workforce practices, manual inefficiencies, compliance risks and a lack of real-time visibility. Implementing emSphere’s Contract Workforce Management System (CWMS) has been key to overcoming these hurdles and achieving operational excellence. Backed by a user-friendly interface and emSphere’s highly responsive support team, CWMS has proven to be a vital partner in our workforce management journey.",
    name: "Mr. Raja Pareekshit Tomar",
    role: "Asstt. Vice President - Management Services",
    logo: logoJkCement,
    rating: 5,
    highlight: "10,000+ contract workers across 12+ plants",
    badge: "Cement & Building Materials",
  },
  {
    company: "Yazaki",
    quote:
      "The best part was that emSphere provided end to end solution from Face biometric devices to the contract labour management software which helped us to have a single point of ownership for the entire process across 12000+ employees at 7 Plant locations.",
    name: "Mr. Mahesh Jadhav",
    role: "Sr HR Manager",
    logo: logoYazakiTestimonial,
    rating: 5,
    highlight: "12,000+ employees across 7 Plants",
    badge: "Automotive Wiring & Components",
  },
  {
    company: "Yashaswi",
    quote:
      "emSphere team has helped us streamline the entire Attendance & Payroll operations for all our 65K+employees across 500+ clients from diverse industry segments using their powerful adaptive configurations & streamlining the payroll across multiple pay cycles as per customer practices in a single centralized system.",
    name: "Mr. Vishwesh Kulkarni",
    role: "Chairman",
    logo: logoYashaswiTestimonial,
    featuredLogo: logoYashaswiStacked, // stacked form suits the square spotlight card
    rating: 5,
    highlight: "65,000+ employees across 500+ clients",
    badge: "Staffing & Skill Development",
  },
  {
    company: "Varroc Excellence",
    quote:
      "emSphere emContract Labour management system empowered us to digitize end to end system from 120+ Biometric attendance, Manpower planning to Contractor billing & labour Analytics associated with it for dynamic contract labour workforce at our 28+ locations 20,000+ contract employees.",
    name: "Mr. Shrikrishna Khalse",
    role: "Lead Employee Relations",
    logo: logoVarrocTestimonial,
    rating: 5,
    highlight: "20,000+ workers across 28+ locations",
    badge: "Global Automotive Components",
  },
  {
    company: "Vishay",
    quote:
      "We are using CLMS system for recording and monitoring of the statutory compliances for all service provider. It serves us the great help, not only for compliance monitoring but also in statutory audit, wherein we get the requisite information quickly on single button click. It reduced our manual work, automated the entire process and improved accuracy.",
    name: "Mr. Pramod Hore",
    role: "Manager HR-IR & Admin",
    logo: logoVishayTestimonial,
    rating: 5,
    highlight: "Single-click statutory audit readiness",
    badge: "Semiconductors & Electronic Components",
  },
  {
    company: "Nerolac",
    quote:
      "Kansai Nerolac Paints has been satisfied with Emsphere Technologies Pvt. Ltd's software services. Their staff demonstrated a thorough understanding of our demands from the start, delivering a tailored solution that exactly met our specifications. The program is reliable, user-friendly, and has considerably increased our operational efficiency.",
    name: "Mr. Vivek Bhatwadekar",
    role: "General Manager, Head - Employee Relations",
    logo: logoNerolacTestimonial,
    rating: 5,
    highlight: "Substantial operational efficiency gain",
    badge: "Paints & Industrial Coatings",
  },
  {
    company: "Reliable Autotech",
    quote:
      "Managing 1,800+ contract workers across Pune, Nashik, and PAN-India was complex. emSphere gave us a single end-to-end system covering face-based turnstile access, attendance, contractor billing and compliance. The biggest advantage is automatic compliance blocking at the device level, which removes manual checks and risk. The solution has made our shop-floor operations simpler, controlled, and audit-ready.",
    name: "Mr. Saagar Bhavsar",
    role: "Head Corporate IT & SAP",
    logo: logoReliableAutoTestimonial,
    rating: 5,
    highlight: "Automatic device-level compliance block",
    badge: "Auto Component Manufacturing",
  },
  {
    company: "Kores",
    quote:
      "At Kores, we manage complex attendance and calculation rules across 1,200+ contract workers in 3+ foundry locations. emSphere understood our needs clearly and delivered the entire logic correctly in the first attempt. Their CLMS now provides the commercial and cost insights we need to manage high attrition and the challenges of the foundry environment.",
    name: "Mr. Manish Kedia",
    role: "Vice President Commercial",
    logo: logoKoresTestimonial,
    rating: 5,
    highlight: "1,200+ workers across 3+ foundries",
    badge: "Foundry & Engineering",
  },
  {
    company: "Mahindra & Mahindra",
    quote:
      "Managing 40,000+ contract labourers across multiple locations requires absolute accuracy and strong legal compliance governance. emSphere supports us with a true end-to-end CLMS, starting from face-device based attendance capture to real-time compliance blocking integrated with Face access systems. The system has brought standardization, control, and audit confidence across our contract labour operations.",
    name: "Mr. Nilesh Tarange",
    role: "GM - Process Assurance | Auto Farm Sector",
    logo: logoMahindraMahindraTestimonial,
    rating: 5,
    highlight: "40,000+ contract labourers",
    badge: "Automotive & Farm Equipment",
  },
  {
    company: "Fundtech India Ltd.",
    quote:
      "We have been using eMpower time attendance for last 2.5 years. It’s very user friendly and tailor made software which takes care of most of our attendance related activities. We really appreciate the “after sales support” from emSphere team who are serving us since last 2.5 years…",
    name: "Fundtech India",
    role: "Head - Administration",
    rating: 5,
    highlight: "2.5+ years on eMpower time attendance",
    badge: "Financial Technology",
  },
  {
    company: "Itron India Pvt. Ltd.",
    quote:
      "Thanks for all the support and value add to our experience, being HR personnel it’s always great to see something taking off your manual loads and Empower software does the same for us. With this software now live at our workplace, we are now investing our time in other value adding activities. Not only saving time this software has helped us in bringing in more accuracy as well and made us a more professional organization. The best feature of this software is its user friendliness, those employee who miss the trainings also understand it very easily and start using with either zero or minimal support.",
    name: "Rajani",
    role: "HR",
    rating: 5,
    highlight: "Zero or minimal support needed",
    badge: "Energy & Metering",
  },
  {
    company: "DOW Agrosciences India Pvt. Ltd.",
    quote:
      "eMpower is a fully automated, 100% web-based solution to easily track and manage employees’ paid time-off, vacation, sick days or other custom time-off types. Also solution to support employees’ Muster roll input. Moreover, the support services offered/rendered by emSphere team is great. I usually do not have to wait to get a support analyst, and when I do, they are usually knowledgeable as they know exactly what my issue is and how to fix. I, sincerely appreciate the support and co-operation extended by emSphere team from time to time to our organization.",
    name: "S.V.Khetle",
    role: "HR",
    rating: 5,
    highlight: "100% web-based leave management",
    badge: "Agrochemicals",
  },
  {
    company: "Aquatech Systems(Asia) Pvt. Ltd.",
    quote:
      "We have been using eMpower time attendance since May 2011. It is a user friendly system and can be customized as per the organisations requirements. Employees can view their own attendance and even take the necessary reports from it. In true sense it empowers individual employees to take charge of their own attendance. We also would like to mention that we received good support from their office for streamlining the system to the requirements of our organization and within 2 months we had smooth operations. Specially to mention all the data was pulled in the experts from our access systems that we have installed at Aquatech including the list of employees and their reporting HOD. Empower definitely takes care of the time attendance and leave management of the organization.",
    name: "Vijaya Rumale",
    role: "Sr. Manager-HR",
    rating: 5,
    highlight: "Smooth operations within 2 months",
    badge: "Water Treatment",
  },
];

const SUCCESS_STATS = [
  { value: "65,000+", label: "Employees Streamlined", detail: "Single centralized payroll engine at Yashaswi" },
  { value: "20,000+", label: "Contract Workers Managed", detail: "Across 28+ Varroc plants in real time" },
  { value: "7", label: "Integrated Plants", detail: "Turnstile face-biometrics at Yazaki" },
  { value: "100%", label: "Audit Accuracy", detail: "Statutory compliance at Vishay" },
];

const VALUE_PILLARS = [
  {
    icon: ShieldCheck,
    title: "100% Statutory Compliance",
    desc: "Single-click audit reports for PF, ESIC, LWF, minimum wages, and contractor licensing.",
  },
  {
    icon: UsersThree,
    title: "Scales to Any Workforce Size",
    desc: "From 1,000 workers to 65,000+ employees across 500+ clients with adaptive configurations.",
  },
  {
    icon: Clock,
    title: "End-to-End Single Ownership",
    desc: "Hardware turnstiles, face biometrics, software, contractor billing, and live dashboards unified.",
  },
  {
    icon: TrendUp,
    title: "Measurable ROI & Efficiency",
    desc: "Over 40% reduction in manual validation hours and elimination of ghost worker fraud.",
  },
];

export default function TestimonialsPage() {
  const featuredTestimonial = TESTIMONIALS.find((t) => t.company === "Yashaswi"); // 65K+ enterprise spotlight
  const featuredLogo = featuredTestimonial.featuredLogo ?? featuredTestimonial.logo;

  return (
    <main
      className={`${instrumentSans.variable} ${inter.variable} animated-page w-full overflow-x-hidden bg-[#FFFFFA] font-sans text-[#4c4c4c]`}
    >
      <ScrollReveal root=".animated-page" />

      {/* Hero Section */}
      <section
        aria-labelledby="testimonials-hero-heading"
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
                  Client Testimonials
                </li>
              </ol>
            </nav>

            {/* Original page heading + tagline */}
            <p className={`${revealUp} ${fontInter} text-sm font-semibold uppercase tracking-[0.14em] text-[#b07d00]`}>
              Our Clients Vouch For Us · Great things and experiences clients share about us!
            </p>

            {/* Headline */}
            <h1
              id="testimonials-hero-heading"
              className={`${fontInstrument} ${revealUp} max-w-4xl text-3xl font-bold leading-tight text-[#1f1f1f] sm:text-4xl md:text-5xl lg:text-[3.35rem]`}
            >
              Real Stories from <span className="text-[#EFB000]">Enterprise Leaders</span>
            </h1>

            {/* Subtitle */}
            <p className={`${revealUp} max-w-2xl text-base leading-relaxed ${mutedText} sm:text-lg md:text-xl`}>
              Hear directly from HR directors, plant heads, and enterprise executives who digitized workforce governance, contractor compliance, and attendance operations with emSphere.
            </p>

            {/* Action Buttons */}
            <div className={`${revealUp} flex flex-wrap items-center justify-center gap-4 pt-2`}>
              <Link href="/contact-us/" data-request-demo className={`${primaryButton} text-[15px]`}>
                Schedule a Consultation
                <ArrowCircleIcon />
              </Link>
              <a href="#reviews-grid" className={`${outlineButton} text-[15px]`}>
                Explore All Reviews
              </a>
            </div>
          </div>

          {/* Quantified Impact Numbers */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-4 md:gap-5">
            {SUCCESS_STATS.map((stat, index) => (
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

      {/* Featured Executive Spotlight */}
      <section
        aria-labelledby="spotlight-heading"
        className="bg-[#FFFFFA] px-4 py-8 md:px-12 md:py-14"
      >
        <div className="mx-auto max-w-7xl">
          <div
            className={`${revealZoom} relative overflow-hidden rounded-2xl bg-[#fff5d9] p-6 border border-[#EFB000]/40 shadow-[0_16px_36px_-12px_rgba(239,176,0,0.22)] md:p-10 lg:p-12`}
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              {/* Left Quote & Meta */}
              <div className="flex flex-col gap-6 lg:max-w-3xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#b07d00] shadow-sm">
                    <SealCheck weight="fill" className="h-4 w-4 text-[#EFB000]" />
                    Featured Enterprise Spotlight
                  </span>
                  <div className="flex items-center gap-1 text-[#EFB000]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <Quotes
                    weight="fill"
                    className="absolute -left-3 -top-4 h-12 w-12 text-[#EFB000]/25 -z-0"
                  />
                  <blockquote className="relative z-10 text-lg font-medium leading-relaxed text-[#1f1f1f] sm:text-xl md:text-2xl italic">
                    &ldquo;{featuredTestimonial.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-[#EFB000]/30">
                  <div>
                    <h3 className="text-base font-bold text-[#1f1f1f] sm:text-lg">
                      {featuredTestimonial.name}
                    </h3>
                    <p className={`text-sm ${mutedText}`}>
                      {featuredTestimonial.role} &middot; <strong className="text-[#1f1f1f]">{featuredTestimonial.company}</strong>
                    </p>
                  </div>
                  <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#b07d00] shadow-sm">
                    {featuredTestimonial.highlight}
                  </span>
                </div>
              </div>

              {/* Right Logo Card */}
              <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-6 shadow-sm border border-[#e5e5e5] lg:w-[260px] lg:shrink-0">
                <Image
                  src={featuredLogo}
                  alt={`${featuredTestimonial.company} logo`}
                  className="object-contain"
                  style={fitLogo(featuredLogo, { maxWidth: 190, maxHeight: 84 })}
                  sizes="200px"
                />
                <p className="mt-3 text-xs font-semibold text-black/50 text-center">
                  {featuredTestimonial.badge}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Testimonials Grid */}
      <section
        id="reviews-grid"
        aria-labelledby="reviews-heading"
        className="scroll-mt-20 bg-[#FFFFFA] px-4 py-12 md:px-12 md:py-20"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-12">
          <SectionHeader
            id="reviews-heading"
            eyebrow="Proven Impact"
            title={
              <>
                Client Testimonials &amp; <span className="text-[#EFB000]">Success Stories</span>
              </>
            }
            text="Discover how India's top automotive, electronics, and manufacturing plants achieve seamless statutory compliance and daily workforce control with emSphere."
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((testimonial, index) => (
              <article
                key={testimonial.company}
                style={stagger(index, 70)}
                className={`${revealUp} ${goldCard} ${liftGold} flex flex-col justify-between p-6 sm:p-7 transition-all duration-300 hover:border-[#EFB000]`}
              >
                <div>
                  {/* Top Bar: Stars + Client Logo */}
                  <div className="flex items-center justify-between gap-3 border-b border-[#f0f0f0] pb-4">
                    <div className="flex items-center gap-1 text-[#EFB000]">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <StarIcon key={i} className="h-4 w-4 fill-current transition-transform duration-200 group-hover/card:scale-110" />
                      ))}
                    </div>
                    {testimonial.logo && (
                      <div className="flex h-12 w-28 items-center justify-end">
                        <Image
                          src={testimonial.logo}
                          alt={`${testimonial.company} logo`}
                          className="object-contain transition-transform duration-300 group-hover/card:scale-105"
                          style={fitLogo(testimonial.logo, { maxWidth: 112, maxHeight: 46 })}
                          sizes="112px"
                        />
                      </div>
                    )}
                  </div>

                  {/* Impact Highlight Pill */}
                  <div className="mt-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#fff5d9] px-2.5 py-0.5 text-xs font-semibold text-[#b07d00]">
                      {testimonial.highlight}
                    </span>
                  </div>

                  {/* Authentic Quote */}
                  <p className="mt-4 text-sm leading-relaxed text-[#2d2d2d] italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="mt-6 flex items-center justify-between gap-3 border-t border-[#f0f0f0] pt-4">
                  <div>
                    <h3 className="text-sm font-bold text-[#1f1f1f] group-hover/card:text-[#b07d00] transition-colors">
                      {testimonial.name}
                    </h3>
                    <p className={`text-xs ${mutedText}`}>
                      {testimonial.role} &middot; <span className="font-semibold text-black/75">{testimonial.company}</span>
                    </p>
                  </div>
                  <CheckCircle weight="fill" className="h-5 w-5 text-[#22c55e] shrink-0" aria-label="Verified Customer" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Enterprise Leaders Choose emSphere */}
      <section
        aria-labelledby="why-leaders-heading"
        className="bg-[#FFFFFA] px-4 py-12 md:px-12 md:py-16"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <SectionHeader
            id="why-leaders-heading"
            eyebrow="The emSphere Advantage"
            title={
              <>
                Why India&apos;s Foremost Brands <span className="text-[#EFB000]">Trust Us</span>
              </>
            }
            text="Engineered specifically to handle complex Indian statutory compliance and high-velocity factory shop floors."
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUE_PILLARS.map((item, index) => (
              <div
                key={item.title}
                style={stagger(index, 80)}
                className={`${revealUp} ${greyCard} ${liftGrey} flex flex-col gap-3 p-6 text-center items-center`}
              >
                <PhosphorIconTile icon={item.icon} className="h-12 w-12 rounded-xl" iconClassName="h-6 w-6" />
                <h3 className="text-lg font-bold text-[#1f1f1f]">
                  {item.title}
                </h3>
                <p className={`text-sm leading-relaxed ${mutedText}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
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
