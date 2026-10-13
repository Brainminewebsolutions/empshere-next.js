import Link from "next/link";
import { Instrument_Sans, Inter } from "next/font/google";
import BackToTop from "@/components/BackToTop";
import ContactForm from "@/components/ContactForm";
import ScrollReveal from "@/components/ScrollReveal";
import FlagshipProducts from "@/components/FlagshipProducts";
import StopwatchCounter from "@/components/StopwatchCounter";
import PhosphorIconTile from "@/components/PhosphorIconTile";
import OfficeFlipCards from "@/components/OfficeFlipCards";
import {
  ArrowRight,
  Buildings,
  CheckCircle,
  Clock,
  EnvelopeSimple,
  Headset,
  MapPin,
  Phone,
  ShieldCheck,
  UsersThree,
} from "@phosphor-icons/react/ssr";

export const metadata = {
  title: "Contact Us | Emsphere Technologies - HRMS & Workforce Management",
  description:
    "Get in touch with Emsphere Technologies. Schedule a product demo, request pricing, or speak with our workforce management consultants in Pune, Delhi, or Bangalore.",
  alternates: {
    canonical: "https://www.emsphere.com/contact-us/",
  },
  openGraph: {
    title: "Contact Us | Emsphere Technologies - HRMS & Workforce Management",
    description:
      "Get in touch with Emsphere Technologies. Schedule a product demo, request pricing, or speak with our workforce management consultants in Pune, Delhi, or Bangalore.",
    url: "https://www.emsphere.com/contact-us/",
    type: "website",
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

// Complete trust highlight numbers - 100% preserved
const HIGHLIGHTS = [
  {
    title: "15+ Years",
    rawNumber: "15+",
    desc: "Domain leadership across HR tech and labour operations",
    icon: ShieldCheck,
  },
  {
    title: "500+ Clients",
    rawNumber: "500+",
    desc: "Trusted by Fortune 500 and enterprise manufacturing brands",
    icon: Buildings,
  },
  {
    title: "10,00,000+ Users",
    rawNumber: "10,00,000+",
    desc: "Active workers and employees managed across India",
    icon: UsersThree,
  },
  {
    title: "ISO 27001",
    rawNumber: "ISO 27001",
    desc: "Certified data confidentiality and bank-grade security",
    icon: CheckCircle,
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & Needs Assessment",
    desc: "Our industry specialist connects with your team to understand plant locations, shift rules, and workforce size.",
  },
  {
    step: "02",
    title: "Live Interactive Walkthrough",
    desc: "See emSphere configured to your exact operations — from turnstiles to contractor billing and statutory compliance.",
  },
  {
    step: "03",
    title: "Rapid Enterprise Rollout",
    desc: "Complete implementation, device integration, and user training delivered within 6–10 weeks by in-house engineers.",
  },
];

export default function ContactUsPage() {
  return (
    <main
      className={`${instrumentSans.variable} ${inter.variable} animated-page w-full overflow-x-hidden bg-[#FFFFFA] font-sans text-[#4c4c4c]`}
    >
      <ScrollReveal root=".animated-page" />

      {/* Hero Section */}
      <section
        aria-labelledby="contact-hero-heading"
        className="relative isolate overflow-hidden px-4 pb-14 pt-8 md:px-12 md:pb-20 md:pt-12"
      >
        {/* Soft gold backdrop: warm gradient, dot grid and two blurred glows */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-[#FFF8E1] via-[#FFFCF0] to-[#FFFFFA]" />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(rgba(239,176,0,0.28)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(180deg,#000_0%,transparent_75%)]"
        />
        <div aria-hidden="true" className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[#EFB000]/20 blur-3xl" />
        <div aria-hidden="true" className="absolute -left-32 bottom-0 -z-10 h-72 w-72 rounded-full bg-[#f8bb18]/15 blur-3xl" />

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          {/* Left: breadcrumb, headline, CTAs */}
          <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <nav aria-label="Breadcrumb" className={`${fontInter} ${revealUp} text-[13px] font-medium text-black/55`}>
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link href="/" className="transition-colors hover:text-[#b07d00]">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-black/35">›</li>
                <li aria-current="page" className="font-semibold text-black/80">
                  Contact Us
                </li>
              </ol>
            </nav>

            <span
              className={`${revealUp} inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#b07d00] shadow-[inset_0_0_0_1px_rgba(239,176,0,0.35)]`}
              style={stagger(1, 80)}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#EFB000] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#EFB000]" />
              </span>
              We reply within 24 hours
            </span>

            <h1
              id="contact-hero-heading"
              className={`${fontInstrument} ${revealUp} max-w-2xl text-[2rem] font-bold leading-[1.15] tracking-[-0.01em] text-[#1f1f1f] sm:text-5xl lg:text-[3.25rem]`}
              style={stagger(2, 80)}
            >
              Connect With Our <span className="text-[#EFB000]">HR Tech &amp; Workforce</span> Specialists
            </h1>

            <p
              className={`${revealUp} max-w-xl text-base leading-relaxed ${mutedText} sm:text-lg`}
              style={stagger(3, 80)}
            >
              Have questions about our enterprise HRMS, CLMS, or payroll solutions? Schedule a consultation or reach out to our team at any of our offices across India.
            </p>

            <div
              className={`${revealUp} flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row lg:items-start`}
              style={stagger(4, 80)}
            >
              <a
                href="#contact-form"
                className={`group/btn inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#EFB000] px-7 py-3.5 ${fontInter} text-[15px] font-semibold text-white shadow-[0_10px_22px_-10px_rgba(239,176,0,0.8)] ${motion} hover:-translate-y-0.5 hover:bg-[#d99e00] sm:w-auto`}
              >
                Book a Free Demo
                <ArrowRight weight="bold" aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </a>
              <a
                href="#our-offices"
                className={`inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 ${fontInter} text-[15px] font-semibold text-[#1f1f1f] shadow-[inset_0_0_0_1px_#e5e5e5] ${motion} hover:-translate-y-0.5 hover:shadow-[inset_0_0_0_1.5px_#EFB000] sm:w-auto`}
              >
                <MapPin weight="fill" aria-hidden="true" className="h-4 w-4 text-[#EFB000]" />
                Find an Office
              </a>
            </div>

            <ul
              className={`${revealUp} flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] font-medium text-black/60 lg:justify-start`}
              style={stagger(5, 80)}
            >
              {["ISO/IEC 27001:2022 certified", "500+ enterprise clients", "Offices in Pune, Delhi & Bengaluru"].map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <CheckCircle weight="fill" aria-hidden="true" className="h-4 w-4 text-[#EFB000]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: direct contact panel */}
          <div className={`${revealFromRight} relative mx-auto w-full max-w-md lg:max-w-none`}>
            <div aria-hidden="true" className="absolute -inset-3 -z-10 rotate-2 rounded-[28px] bg-[#EFB000]/15" />
            <div className="overflow-hidden rounded-3xl bg-white shadow-[inset_0_0_0_1px_rgba(239,176,0,0.3),0_30px_60px_-30px_rgba(122,92,0,0.35)]">
              <div className="flex items-center gap-3 border-b border-[#f3ead0] bg-[#FFF8E1] px-6 py-5">
                <PhosphorIconTile icon={Headset} className="h-11 w-11 rounded-xl" iconClassName="h-6 w-6" />
                <div>
                  <p className={`${fontInstrument} text-lg font-bold text-[#1f1f1f]`}>Talk to us directly</p>
                  <p className={`text-[13px] ${mutedText}`}>Our consultants are one call away</p>
                </div>
              </div>
              <ul className="divide-y divide-[#f3f0e6]">
                {[
                  { icon: Phone, label: "Direct Call", value: "+91 7798981117", href: "tel:+917798981117" },
                  { icon: EnvelopeSimple, label: "Email Inquiries", value: "sales@emsphere.com", href: "mailto:sales@emsphere.com" },
                  { icon: Clock, label: "Working Hours", value: "Mon – Fri · 9 AM – 6 PM" },
                ].map((item, index) => {
                  const Row = item.href ? "a" : "div";
                  return (
                    <li key={item.label}>
                      <Row
                        {...(item.href ? { href: item.href } : {})}
                        className={`group/row flex items-center gap-4 px-6 py-5 ${item.href ? "transition-colors hover:bg-[#FFFBEF]" : ""}`}
                        style={stagger(index, 80)}
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff5d9] text-[#EFB000] transition-colors duration-300 group-hover/row:bg-[#EFB000] group-hover/row:text-white">
                          <item.icon weight="fill" aria-hidden="true" className="h-5 w-5" />
                        </span>
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#b07d00]">{item.label}</span>
                          <span className="truncate text-[15px] font-bold text-[#1f1f1f]">{item.value}</span>
                        </span>
                        {item.href && (
                          <ArrowRight
                            weight="bold"
                            aria-hidden="true"
                            className="h-4 w-4 shrink-0 text-black/30 transition-[translate,color] duration-200 group-hover/row:translate-x-1 group-hover/row:text-[#EFB000]"
                          />
                        )}
                      </Row>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* Main Interaction Section: Form + Contact Info */}
      <section
        id="contact-form"
        aria-labelledby="contact-form-heading"
        className="scroll-mt-24 bg-[#FFFFFA] py-10 md:py-16 px-4 md:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Contact Form */}
            <div className={`${revealFromLeft} lg:col-span-7`}>
              <ContactForm />
            </div>

            {/* Right: Direct Information & Offices */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Direct Inquiries & Support Card */}
              <div
                className={`${revealFromRight} ${goldCard} ${liftGold} flex flex-col gap-5 p-6 sm:p-7 transition-all`}
              >
                <div className="flex items-center justify-between border-b border-[#f0f0f0] pb-3.5">
                  <h3 className={`${fontInstrument} text-xl font-bold text-[#1f1f1f]`}>
                    Direct Inquiries &amp; Support
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#fff5d9] px-2.5 py-0.5 text-xs font-semibold text-[#b07d00]">
                    24h Response
                  </span>
                </div>

                <div className="space-y-4 text-sm">
                  {/* Sales Email */}
                  <div className="flex items-start gap-3.5">
                    <PhosphorIconTile icon={EnvelopeSimple} className="mt-0.5 h-10 w-10 rounded-xl" iconClassName="h-5 w-5" />
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-[#b07d00]">Sales &amp; Demos</div>
                      <a href="mailto:sales@emsphere.com" className="font-semibold text-[#1f1f1f] hover:text-[#0077c2] transition-colors">
                        sales@emsphere.com
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3.5">
                    <PhosphorIconTile icon={Phone} className="mt-0.5 h-10 w-10 rounded-xl" iconClassName="h-5 w-5" />
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-[#b07d00]">Contact Numbers</div>
                      <div className="flex flex-col gap-0.5 font-medium text-[#1f1f1f]">
                        <a href="tel:+917798981117" className="hover:text-[#0077c2] transition-colors font-semibold">
                          +91 7798981117
                        </a>
                        <a href="tel:+917798981534" className="hover:text-[#0077c2] transition-colors font-semibold">
                          +91 7798981534
                        </a>
                        <span className={`text-xs ${mutedText}`}>
                          Board: 020-27292732 / 33
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-3.5">
                    <PhosphorIconTile icon={Clock} className="mt-0.5 h-10 w-10 rounded-xl" iconClassName="h-5 w-5" />
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-[#b07d00]">Working Hours</div>
                      <div className="font-medium text-[#1f1f1f]">
                        Monday – Friday: 9:00 AM – 6:00 PM IST
                      </div>
                      <div className={`text-xs ${mutedText}`}>
                        Excluding National &amp; Public Holidays
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Our Offices: flip cards */}
      <section
        id="our-offices"
        aria-labelledby="offices-heading"
        className="scroll-mt-24 bg-[#FFFFFA] px-4 py-12 md:px-12 md:py-16"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-10">
          <SectionHeader
            id="offices-heading"
            eyebrow="Our Offices"
            title={
              <>
                Visit Us <span className="text-[#EFB000]">Across India</span>
              </>
            }
            text="Hover over a city to see the office address and phone numbers."
          />
          <OfficeFlipCards />
        </div>
      </section>

      {/* Trust Highlights Section */}
      <section
        aria-labelledby="highlights-heading"
        className="bg-[#FFFFFA] py-12 md:py-16 px-4 md:px-12 border-t border-[#f0f0f0]"
      >
        <div className="mx-auto max-w-7xl flex flex-col gap-10">
          <SectionHeader
            id="highlights-heading"
            eyebrow="Proven Enterprise Track Record"
            title={
              <>
                Engineered for <span className="text-[#EFB000]">Security, Scale &amp; Reliability</span>
              </>
            }
            text="Decades of relentless innovation delivering flawless workforce management for India's leading manufacturing and corporate enterprises."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {HIGHLIGHTS.map((item, index) => (
              <div
                key={item.title}
                style={stagger(index, 80)}
                className={`${revealUp} ${greyCard} ${liftGrey} flex flex-col items-center justify-center p-6 text-center gap-2`}
              >
                <PhosphorIconTile icon={item.icon} className="h-12 w-12 rounded-xl mb-1" iconClassName="h-6 w-6" />
                <div className={`${fontInstrument} text-2xl sm:text-3xl font-bold text-[#EFB000]`}>
                  {/\d/.test(item.rawNumber) && !item.rawNumber.startsWith("ISO") ? (
                    <StopwatchCounter value={item.rawNumber} delay={index * 140} />
                  ) : (
                    item.title
                  )}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#1f1f1f]">
                  {item.title}
                </div>
                <div className={`text-xs leading-normal ${mutedText} max-w-[200px]`}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Happens Next? Process Walkthrough */}
      <section
        aria-labelledby="process-heading"
        className="bg-[#FFFFFA] py-12 md:py-16 px-4 md:px-12"
      >
        <div className="mx-auto max-w-7xl flex flex-col gap-10">
          <SectionHeader
            id="process-heading"
            eyebrow="What to Expect"
            title={
              <>
                What Happens After You <span className="text-[#EFB000]">Reach Out?</span>
              </>
            }
            text="No generic sales pitches. You will be connected with experienced HR technology practitioners."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROCESS_STEPS.map((item, index) => (
              <div
                key={item.step}
                style={stagger(index, 90)}
                className={`${revealUp} ${goldCard} ${liftGold} flex flex-col gap-3 p-6 sm:p-7 relative`}
              >
                <span className={`${fontInstrument} text-3xl font-bold text-[#EFB000]/60`}>
                  {item.step}
                </span>
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
                <a
                  href="#contact-hero-heading"
                  className={`group/btn inline-flex w-full max-w-65 items-center justify-center rounded-lg bg-[#EFB000] px-6 py-[13px] ${fontInter} text-[15px] font-semibold tracking-[0.02em] text-white ${motion} hover:-translate-y-0.5 hover:bg-[#d99e00] hover:shadow-[0_8px_18px_-4px_rgba(239,176,0,0.45)] active:translate-y-0 min-[769px]:w-auto min-[769px]:max-w-none min-[769px]:min-w-[145px] min-[769px]:px-[30px]`}
                >
                  {col.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <BackToTop />
    </main>
  );
}
