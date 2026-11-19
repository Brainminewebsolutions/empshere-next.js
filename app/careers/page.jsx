import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { Instrument_Sans, Inter } from "next/font/google";
import BackToTop from "@/components/BackToTop";
import ScrollReveal from "@/components/ScrollReveal";
import CareersJobBoard from "@/components/careers/CareersJobBoard";
import { getOpenJobs } from "@/lib/jobs";
import teamPhoto from "@/app/images/homeimages/corporate-hr-team-collaboration.webp";
import {
  ArrowRight,
  Briefcase,
  ChartLineUp,
  ChatsCircle,
  Cpu,
  EnvelopeSimple,
  Factory,
  FileText,
  Handshake,
  Lightning,
  MapPin,
  ShieldCheck,
} from "@phosphor-icons/react/ssr";
import { DEFAULT_OG_IMAGE, TWITTER_SITE } from "@/lib/seo";
import { SITE_URL, careersPageJsonLd, jsonLdScript } from "@/lib/schema";

const PAGE_TITLE = "Careers | Emsphere Technologies - Join Our HR Tech Team";

export const metadata = {
  title: { absolute: PAGE_TITLE },
  description:
    "Build the future of HR technology with Emsphere. Explore open roles in engineering, implementation, support, sales and product across Pune, Delhi and Bengaluru.",
  alternates: {
    canonical: "https://www.emsphere.com/careers/",
  },
  openGraph: {
    title: PAGE_TITLE,
    description:
      "Build the future of HR technology with Emsphere. Explore open roles across Pune, Delhi and Bengaluru.",
    url: "https://www.emsphere.com/careers/",
    siteName: "Emsphere Technologies",
    locale: "en_US",
    images: [DEFAULT_OG_IMAGE],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_SITE,
    title: PAGE_TITLE,
    description:
      "Build the future of HR technology with Emsphere. Explore open roles across Pune, Delhi and Bengaluru.",
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
const stagger = (index, step = 90) => ({ transitionDelay: `${index * step}ms` });
const mutedText = "text-[rgba(0,0,0,0.64)]";

const HR_EMAIL = "hr@emsphere.com";
const HERO_IMAGE_ALT = "Team members joining hands over a desk with laptops and reports";

const jsonLd = careersPageJsonLd({
  url: `${SITE_URL}careers/`,
  name: "Careers at Emsphere Technologies",
  description:
    "Build the future of HR technology with Emsphere. Explore open roles in engineering, implementation, support, sales and product across Pune, Delhi and Bengaluru.",
  imageUrl: new URL(teamPhoto.src, SITE_URL).href,
  imageAlt: HERO_IMAGE_ALT,
});

const CV_HREF = `mailto:${HR_EMAIL}?subject=${encodeURIComponent("General application")}`;

const WHY_EMSPHERE = [
  {
    icon: ChartLineUp,
    title: "Positioned for Growth",
    text: "New labour codes and digital-first HR teams are pushing every Indian enterprise to modernise — and we sit right where that change is happening.",
  },
  {
    icon: Factory,
    title: "Built on Real Problems",
    text: "Our products were born on factory floors, not whiteboards. You’ll work on problems that HR heads and plant managers face every single day.",
  },
  {
    icon: ShieldCheck,
    title: "A Solid Foundation",
    text: "Over a decade in business, ISO/IEC 27001 certified, and trusted by 500+ enterprises — the stability to take bold bets with confidence.",
  },
  {
    icon: Cpu,
    title: "Software Meets Hardware",
    text: "From biometric terminals and turnstiles to payroll engines and AI dashboards, you’ll see the full stack come together in production.",
  },
];

const HIRING_STEPS = [
  { icon: FileText, title: "Apply", text: "Send your CV for an open role, or share it with us for future openings." },
  { icon: ChatsCircle, title: "Screening Call", text: "A short conversation with our HR team about your goals and the role." },
  { icon: Handshake, title: "Interviews", text: "Technical / functional rounds with the team you’ll be working with." },
  { icon: Lightning, title: "Offer & Onboarding", text: "A quick decision, a clear offer and a warm welcome on day one." },
];

function SectionHeader({ id, eyebrow, title, text, align = "center" }) {
  const centered = align === "center";
  return (
    <header
      className={`${revealUp} flex max-w-3xl flex-col gap-3 ${centered ? "mx-auto items-center text-center" : "items-start text-left"}`}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff5d9] px-3.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#b07d00]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#EFB000]" />
          {eyebrow}
        </span>
      )}
      <h2 id={id} className={`${fontInstrument} text-2xl font-bold leading-tight text-[#1f1f1f] md:text-3xl lg:text-4xl`}>
        {title}
      </h2>
      {text && <p className={`text-base leading-relaxed ${mutedText} md:text-lg`}>{text}</p>}
    </header>
  );
}

export default async function CareersPage() {
  // Jobs come from the admin dashboard, so render on every request.
  await connection();
  const jobs = await getOpenJobs();

  return (
    <main
      className={`${instrumentSans.variable} ${inter.variable} animated-page w-full overflow-x-hidden bg-[#FFFFFA] font-sans text-[#4c4c4c]`}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />
      <ScrollReveal root=".animated-page" />

      {/* Hero */}
      <section
        aria-labelledby="careers-hero-heading"
        className="relative isolate flex items-center overflow-hidden px-4 pb-16 pt-12 md:px-12 md:pb-20 md:pt-16 lg:min-h-[clamp(600px,calc(100svh-89px),1000px)] lg:py-16"
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-[#FFF8E1] via-[#FFFCF0] to-[#FFFFFA]" />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(rgba(239,176,0,0.28)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(180deg,#000_0%,transparent_75%)]"
        />

        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
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
                  Careers
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
              We’re hiring
            </span>

            <h1
              id="careers-hero-heading"
              className={`${fontInstrument} ${revealUp} text-[2rem] font-bold leading-[1.15] tracking-[-0.01em] text-[#1f1f1f] sm:text-5xl lg:text-[3.4rem]`}
              style={stagger(2, 80)}
            >
              Unlock Your Potential With <span className="text-[#EFB000]">emSphere</span>
            </h1>

            <p className={`${revealUp} max-w-xl text-base leading-relaxed ${mutedText} sm:text-lg`} style={stagger(3, 80)}>
              Be part of a team that has spent over a decade simplifying HR, payroll and contract-labour management for
              India’s leading enterprises — and write your own success story along the way.
            </p>

            <div className={`${revealUp} flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row`} style={stagger(4, 80)}>
              <a
                href="#open-roles"
                className={`group/btn inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#EFB000] px-7 py-3.5 ${fontInter} text-[15px] font-semibold text-white shadow-[0_10px_22px_-10px_rgba(239,176,0,0.8)] ${motion} hover:-translate-y-0.5 hover:bg-[#d99e00] sm:w-auto`}
              >
                Join Us
                <ArrowRight weight="bold" aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </a>
              <a
                href={CV_HREF}
                className={`inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 ${fontInter} text-[15px] font-semibold text-[#1f1f1f] shadow-[inset_0_0_0_1px_#e5e5e5] ${motion} hover:-translate-y-0.5 hover:shadow-[inset_0_0_0_1.5px_#EFB000] sm:w-auto`}
              >
                <EnvelopeSimple weight="fill" aria-hidden="true" className="h-4 w-4 text-[#EFB000]" />
                Send Your CV
              </a>
            </div>
          </div>

          <figure className={`${revealFromLeft} relative mx-auto w-full max-w-xl lg:max-w-none`} style={stagger(2, 80)}>
            {/* Offset gold frame behind the photo */}
            <span
              aria-hidden="true"
              className="absolute -bottom-3 -right-3 left-6 top-6 -z-10 rounded-[22px] border-2 border-[#EFB000]/60 md:-bottom-4 md:-right-4"
            />
            <div className="relative aspect-[3/2] overflow-hidden rounded-[20px] shadow-[0_30px_60px_-30px_rgba(122,92,0,0.45)]">
              <Image
                src={teamPhoto}
                alt={HERO_IMAGE_ALT}
                fill
                priority
                placeholder="blur"
                sizes="(min-width: 1024px) 540px, (min-width: 640px) 80vw, 92vw"
                className="object-cover"
              />
            </div>
            <figcaption
              className={`${fontInter} absolute -bottom-5 left-4 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-[0_16px_32px_-16px_rgba(0,0,0,0.3),inset_0_0_0_1px_#f1e7c8] md:left-6`}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fff5d9] text-[#b07d00]">
                <MapPin weight="fill" aria-hidden="true" className="h-5 w-5" />
              </span>
              <span className="flex flex-col text-left leading-tight">
                <span className="text-[13px] font-semibold text-[#1f1f1f]">Life at emSphere</span>
                <span className="text-xs text-black/55">Pune · Delhi · Bengaluru</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Open roles */}
      <section id="open-roles" aria-labelledby="roles-heading" className="scroll-mt-24 bg-[#FFFFFA] px-4 py-12 md:px-12 md:py-16">
        <div className="mx-auto flex max-w-5xl flex-col gap-10">
          <SectionHeader
            id="roles-heading"
            eyebrow="Open Positions"
            title={
              <>
                Find Your <span className="text-[#EFB000]">Next Role</span>
              </>
            }
            text="Roles are published here the moment they open across our Pune, Delhi and Bengaluru offices."
          />
          {jobs.length > 0 ? (
            <CareersJobBoard jobs={jobs} />
          ) : (
          <div
            className={`${revealUp} relative isolate mx-auto flex w-full max-w-3xl flex-col items-center gap-4 overflow-hidden rounded-3xl bg-white px-6 py-12 text-center shadow-[inset_0_0_0_1px_#ececec,0_18px_40px_-28px_rgba(0,0,0,0.25)] md:px-14 md:py-14`}
          >
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#ffd34d] via-[#EFB000] to-[#ffd34d]" />
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff5d9] text-[#b07d00]">
              <Briefcase weight="fill" aria-hidden="true" className="h-7 w-7" />
            </span>
            <p className={`${fontInter} text-xs font-bold uppercase tracking-[0.22em] text-[#b07d00]`}>No open positions</p>
            <h3 className={`${fontInstrument} text-2xl font-bold leading-tight text-[#1f1f1f] md:text-3xl`}>
              No open positions at the moment.
            </h3>
            <p className={`max-w-xl text-base leading-relaxed ${mutedText} md:text-lg`}>
              We’re not hiring for a specific role right now, but we grow fast and that changes often. Send us your CV and
              we’ll reach out when there’s a match.
            </p>
            <a
              href={CV_HREF}
              className={`group/btn mt-2 inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3 ${fontInter} text-[15px] font-semibold text-[#1f1f1f] shadow-[inset_0_0_0_1px_#e5e5e5] ${motion} hover:-translate-y-0.5 hover:shadow-[inset_0_0_0_1.5px_#EFB000,0_12px_24px_-14px_rgba(176,125,0,0.5)]`}
            >
              <EnvelopeSimple weight="bold" aria-hidden="true" className="h-[18px] w-[18px] text-[#EFB000]" />
              {HR_EMAIL}
            </a>
          </div>
          )}
        </div>
      </section>

      {/* Why emSphere */}
      <section aria-labelledby="why-heading" className="bg-[#FFFFFA] px-4 py-12 md:px-12 md:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-10">
          <SectionHeader
            id="why-heading"
            eyebrow="Why emSphere"
            title={
              <>
                Why Choose emSphere for Your <span className="text-[#EFB000]">Career in HR Tech?</span>
              </>
            }
          />
          <ul className="grid grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-[inset_0_0_0_1px_#ececec,0_18px_40px_-28px_rgba(0,0,0,0.25)] sm:grid-cols-2 lg:grid-cols-4">
            {WHY_EMSPHERE.map((item, index) => (
              <li
                key={item.title}
                style={stagger(index, 110)}
                className={`${revealUp} group/why relative flex flex-col gap-4 p-7 md:p-8 ${
                  index > 0 ? "border-t border-[#f0f0f0] sm:border-t-0" : ""
                } ${index % 2 === 1 ? "sm:border-l sm:border-[#f0f0f0]" : ""} ${
                  index > 1 ? "sm:border-t sm:border-[#f0f0f0] lg:border-t-0" : ""
                } ${index === 2 ? "lg:border-l lg:border-[#f0f0f0]" : ""}`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[#EFB000] transition-transform duration-500 ${ease} group-hover/why:scale-x-100`}
                />
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff5d9] text-[#b07d00] transition-colors duration-300 group-hover/why:bg-[#EFB000] group-hover/why:text-white`}
                >
                  <item.icon weight="fill" aria-hidden="true" className="h-6 w-6" />
                </span>
                <h3 className="text-lg font-semibold text-[#1f1f1f]">{item.title}</h3>
                <p className={`text-[15px] leading-relaxed ${mutedText}`}>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Hiring process */}
      <section aria-labelledby="process-heading" className="bg-[#FFFFFA] px-4 py-12 md:px-12 md:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-12">
          <SectionHeader
            id="process-heading"
            eyebrow="How We Hire"
            title={
              <>
                A Simple, <span className="text-[#EFB000]">Transparent</span> Process
              </>
            }
            text="Most candidates hear back from us within a week."
          />
          <ol className="relative grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-6">
            {/* Connector line behind the step markers */}
            <span
              aria-hidden="true"
              className="absolute left-[27px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#ffd34d] to-[#EFB000] md:left-[12.5%] md:right-[12.5%] md:top-[27px] md:bottom-auto md:h-0.5 md:w-auto md:bg-gradient-to-r"
            />
            {HIRING_STEPS.map((step, index) => (
              <li
                key={step.title}
                style={stagger(index, 140)}
                className={`${revealUp} group/step relative flex items-start gap-5 md:flex-col md:items-center md:gap-4 md:text-center`}
              >
                <span
                  className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-[#EFB000] shadow-[inset_0_0_0_3px_#EFB000,0_0_0_6px_#FFF6D9] transition-[background-color,color,scale] duration-500 ${ease} group-hover/step:scale-110 group-hover/step:bg-[#EFB000] group-hover/step:text-white`}
                >
                  <step.icon weight="fill" aria-hidden="true" className="h-6 w-6" />
                </span>
                <div className="flex flex-col gap-1.5 pt-1 md:pt-0">
                  <span className={`${fontInter} text-xs font-bold uppercase tracking-[0.14em] text-[#b07d00]`}>
                    Step {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-semibold text-[#1f1f1f]">{step.title}</h3>
                  <p className={`text-[15px] leading-relaxed ${mutedText}`}>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section aria-labelledby="careers-cta-heading" className="bg-[#FFFFFA] px-4 pb-16 pt-4 md:px-12 md:pb-24">
        <div
          className={`${revealUp} relative isolate mx-auto flex max-w-5xl flex-col items-center gap-6 overflow-hidden rounded-3xl bg-gradient-to-br from-[#EFB000] to-[#d99e00] px-6 py-12 text-center text-white shadow-[0_30px_60px_-30px_rgba(176,125,0,0.7)] md:flex-row md:justify-between md:px-14 md:text-left`}
        >
          <div aria-hidden="true" className="absolute -right-16 -top-16 -z-10 h-56 w-56 rounded-full bg-white/15" />
          <div aria-hidden="true" className="absolute -bottom-20 left-10 -z-10 h-48 w-48 rounded-full bg-white/10" />
          <div className={`${revealFromLeft} flex flex-col gap-2`}>
            <Briefcase weight="fill" aria-hidden="true" className="mx-auto h-9 w-9 md:mx-0" />
            <h2 id="careers-cta-heading" className={`${fontInstrument} text-2xl font-bold md:text-3xl`}>
              Don’t see the right role?
            </h2>
            <p className="max-w-lg text-base text-white/90">
              We’re always happy to meet talented people. Send us your CV and we’ll reach out when a matching role opens.
            </p>
          </div>
          <a
            href={CV_HREF}
            className={`${revealFromRight} group/btn inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-7 py-3.5 ${fontInter} text-[15px] font-semibold text-[#8f6200] ${motion} hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-12px_rgba(0,0,0,0.35)]`}
          >
            <EnvelopeSimple weight="fill" aria-hidden="true" className="h-4 w-4" />
            {HR_EMAIL}
            <ArrowRight weight="bold" aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </a>
        </div>
      </section>

      <BackToTop />
    </main>
  );
}
