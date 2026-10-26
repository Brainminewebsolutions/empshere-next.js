import Link from "next/link";
import { Instrument_Sans, Inter } from "next/font/google";
import BackToTop from "@/components/BackToTop";
import ScrollReveal from "@/components/ScrollReveal";
import StopwatchCounter from "@/components/StopwatchCounter";
import FeatureCard from "@/components/FeatureCard";
import JobOpenings from "@/components/JobOpenings";
import {
  ArrowRight,
  Briefcase,
  ChalkboardTeacher,
  ChatsCircle,
  EnvelopeSimple,
  FileText,
  Handshake,
  HeartStraight,
  House,
  Lightning,
  RocketLaunch,
  Trophy,
  UsersThree,
} from "@phosphor-icons/react/ssr";
import { DEFAULT_OG_IMAGE, TWITTER_SITE } from "@/lib/seo";

export const metadata = {
  title: "Careers | Emsphere Technologies - Join Our HR Tech Team",
  description:
    "Build the future of HR technology with Emsphere. Explore open roles in engineering, implementation, support, sales and product across Pune, Delhi and Bengaluru.",
  alternates: {
    canonical: "https://www.emsphere.com/careers/",
  },
  openGraph: {
    title: "Careers | Emsphere Technologies - Join Our HR Tech Team",
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
    title: "Careers | Emsphere Technologies - Join Our HR Tech Team",
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

const STATS = [
  { value: "15", suffix: "+", label: "Years of Experience" },
  { value: "10,00,000", suffix: "+", label: "Users" },
  { value: "500", suffix: "+", label: "Enterprise Clients" },
  { value: "3", suffix: "", label: "Offices in India" },
];

const PERKS = [
  {
    icon: RocketLaunch,
    title: "Meaningful Impact",
    text: "Your work runs the payroll, attendance and compliance of lakhs of employees at India’s leading enterprises.",
  },
  {
    icon: ChalkboardTeacher,
    title: "Learning & Growth",
    text: "Certifications, mentoring from industry veterans and clear career paths across product, tech and consulting.",
  },
  {
    icon: HeartStraight,
    title: "Health & Wellness",
    text: "Comprehensive medical insurance for you and your family, plus wellness days to recharge.",
  },
  {
    icon: House,
    title: "Flexible Work",
    text: "Hybrid working for eligible roles and flexible hours that respect life outside work.",
  },
  {
    icon: UsersThree,
    title: "Collaborative Culture",
    text: "Small, close-knit teams where ideas are heard and engineers talk directly to customers.",
  },
  {
    icon: Trophy,
    title: "Rewards & Recognition",
    text: "Performance bonuses, spot awards and annual celebrations for the people who make it happen.",
  },
];

const HIRING_STEPS = [
  { icon: FileText, title: "Apply", text: "Send your CV for an open role, or share it with us for future openings." },
  { icon: ChatsCircle, title: "Screening Call", text: "A short conversation with our HR team about your goals and the role." },
  { icon: Handshake, title: "Interviews", text: "Technical / functional rounds with the team you’ll be working with." },
  { icon: Lightning, title: "Offer & Onboarding", text: "A quick decision, a clear offer and a warm welcome on day one." },
];

function SectionHeader({ id, eyebrow, title, text }) {
  return (
    <header className={`${revealUp} mx-auto flex max-w-3xl flex-col items-center gap-3 text-center`}>
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

export default function CareersPage() {
  return (
    <main
      className={`${instrumentSans.variable} ${inter.variable} animated-page w-full overflow-x-hidden bg-[#FFFFFA] font-sans text-[#4c4c4c]`}
    >
      <ScrollReveal root=".animated-page" />

      {/* Hero */}
      <section
        aria-labelledby="careers-hero-heading"
        className="relative isolate overflow-hidden px-4 pb-14 pt-8 md:px-12 md:pb-20 md:pt-12"
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-[#FFF8E1] via-[#FFFCF0] to-[#FFFFFA]" />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(rgba(239,176,0,0.28)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(180deg,#000_0%,transparent_75%)]"
        />
        <div aria-hidden="true" className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[#EFB000]/20 blur-3xl" />
        <div aria-hidden="true" className="absolute -left-32 bottom-0 -z-10 h-72 w-72 rounded-full bg-[#f8bb18]/15 blur-3xl" />

        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
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
            className={`${fontInstrument} ${revealUp} max-w-3xl text-[2rem] font-bold leading-[1.15] tracking-[-0.01em] text-[#1f1f1f] sm:text-5xl lg:text-[3.4rem]`}
            style={stagger(2, 80)}
          >
            Build the Future of <span className="text-[#EFB000]">HR Tech</span> With Us
          </h1>

          <p className={`${revealUp} max-w-2xl text-base leading-relaxed ${mutedText} sm:text-lg`} style={stagger(3, 80)}>
            Join a team that has spent over a decade simplifying HR, payroll and contract-labour management for India’s
            leading enterprises. Solve real problems, learn fast and grow with us.
          </p>

          <div className={`${revealUp} flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row`} style={stagger(4, 80)}>
            <a
              href="#open-roles"
              className={`group/btn inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#EFB000] px-7 py-3.5 ${fontInter} text-[15px] font-semibold text-white shadow-[0_10px_22px_-10px_rgba(239,176,0,0.8)] ${motion} hover:-translate-y-0.5 hover:bg-[#d99e00] sm:w-auto`}
            >
              View Open Roles
              <ArrowRight weight="bold" aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
            </a>
            <a
              href={`mailto:${HR_EMAIL}?subject=${encodeURIComponent("General application")}`}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 ${fontInter} text-[15px] font-semibold text-[#1f1f1f] shadow-[inset_0_0_0_1px_#e5e5e5] ${motion} hover:-translate-y-0.5 hover:shadow-[inset_0_0_0_1.5px_#EFB000] sm:w-auto`}
            >
              <EnvelopeSimple weight="fill" aria-hidden="true" className="h-4 w-4 text-[#EFB000]" />
              Send Your CV
            </a>
          </div>

          {/* Stats */}
          <ul
            className={`${revealUp} mt-6 grid w-full max-w-4xl grid-cols-2 overflow-hidden rounded-2xl bg-white shadow-[inset_0_0_0_1px_rgba(239,176,0,0.25),0_18px_40px_-24px_rgba(122,92,0,0.35)] md:grid-cols-4`}
            style={stagger(5, 80)}
          >
            {STATS.map((stat, index) => (
              <li
                key={stat.label}
                className={`flex flex-col items-center gap-1 px-4 py-6 ${index % 2 === 1 ? "border-l border-[#f3ead0]" : ""} ${
                  index > 1 ? "border-t border-[#f3ead0] md:border-t-0" : ""
                } ${index === 2 ? "md:border-l" : ""}`}
              >
                <span className={`${fontInstrument} text-[28px] font-bold leading-tight text-[#1f1f1f] md:text-[32px]`}>
                  <StopwatchCounter value={stat.value} suffix={stat.suffix} delay={index * 120} />
                </span>
                <span className="text-[13px] font-semibold text-black/60">{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why join */}
      <section aria-labelledby="perks-heading" className="bg-[#FFFFFA] px-4 py-12 md:px-12 md:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-10">
          <SectionHeader
            id="perks-heading"
            eyebrow="Life at emSphere"
            title={
              <>
                Why You’ll Love <span className="text-[#EFB000]">Working Here</span>
              </>
            }
            text="We look after our people the way we help our customers look after theirs."
          />
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {PERKS.map((perk, index) => (
              <FeatureCard
                key={perk.title}
                index={index}
                className={revealUp}
                style={stagger(index % 3, 110)}
                icon={<perk.icon weight="fill" />}
                title={perk.title}
                text={perk.text}
              />
            ))}
          </ul>
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
            text="Explore current openings across our Pune, Delhi and Bengaluru offices."
          />
          <div className={revealUp}>
            <JobOpenings />
          </div>
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
            href={`mailto:${HR_EMAIL}?subject=${encodeURIComponent("General application")}`}
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
