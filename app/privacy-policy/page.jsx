import Link from "next/link";
import { Instrument_Sans, Inter } from "next/font/google";
import BackToTop from "@/components/BackToTop";
import { ArrowRight, CalendarBlank, EnvelopeSimple, Phone, ShieldCheck } from "@phosphor-icons/react/ssr";
import { DEFAULT_OG_IMAGE, TWITTER_SITE } from "@/lib/seo";

const PAGE_URL = "https://www.emsphere.com/privacy-policy/";
const PAGE_TITLE = "Privacy Policy - Emsphere";
const PAGE_DESCRIPTION =
  "Read the emSphere Privacy Policy to learn how we collect, use, share and protect your personal information when you use our platform and services.";

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

const EFFECTIVE_DATE = "July 1, 2025";

// Policy text as supplied in "Privacy Policy - Emsphere.pdf".
const SECTIONS = [
  {
    id: "introduction",
    title: "Introduction",
    paragraphs: [
      "emSphere is committed to safeguarding your privacy. This Privacy Policy describes how we collect, use, disclose, and secure your information when you use our platform or services. By accessing or using the platform, you agree to the data practices outlined in this policy.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    subsections: [
      {
        title: "Personal Information",
        text: "We may collect personally identifiable information such as your name, email address, phone number, and other contact details when you create an account or reach out to us for assistance.",
      },
      {
        title: "Usage Data",
        text: "We collect details about your interactions with the Service, including pages visited, timestamps of your visits, and other diagnostic information to help us understand system usage and performance.",
      },
    ],
  },
  {
    id: "use-of-information",
    title: "Use of Information",
    paragraphs: ["The information we collect is used for the following purposes:"],
    items: [
      {
        term: "To Provide and Maintain the Service",
        text: "Deliver the requested services, ensure platform functionality, and manage user accounts.",
      },
      {
        term: "To Improve the Service",
        text: "Analyze user interactions to enhance performance and overall experience.",
      },
      {
        term: "To Communicate with You",
        text: "Send updates, newsletters, or other relevant information that may interest you.",
      },
    ],
  },
  {
    id: "sharing-of-information",
    title: "Sharing of Information",
    paragraphs: [
      "We do not sell or share your personal information with third parties except under the following circumstances:",
    ],
    items: [
      {
        term: "Service Providers",
        text: "We may engage trusted third-party companies to support our services, operate the platform, or analyze usage. These entities have access to your personal data only to perform their assigned tasks on our behalf and are contractually bound to maintain confidentiality and not use the data for any other purpose.",
      },
      {
        term: "Legal Requirements",
        text: "We may disclose personal information if required to do so by law or in response to legitimate requests from public authorities.",
      },
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    paragraphs: [
      "We implement appropriate technical and organizational measures to safeguard your personal data against unauthorized access, alteration, disclosure, or destruction. However, please note that no electronic transmission or storage method is entirely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    id: "your-data-protection-rights",
    title: "Your Data Protection Rights",
    paragraphs: ["Depending on your location, you may have the following rights concerning your personal data:"],
    items: [
      { term: "Access", text: "You have the right to request copies of your personal data." },
      {
        term: "Rectification",
        text: "You have the right to request correction or completion of any inaccurate or incomplete information.",
      },
      { term: "Erasure", text: "You have the right to request deletion of your personal data under specific conditions." },
      {
        term: "Restriction of Processing",
        text: "You have the right to request that we restrict how your data is processed under certain conditions.",
      },
      {
        term: "Data Portability",
        text: "You have the right to request that your data be transferred to another organization or directly to you, where applicable.",
      },
    ],
  },
  {
    id: "changes-to-this-policy",
    title: "Changes to This Privacy Policy",
    paragraphs: [
      "emSphere may update this Privacy Policy from time to time. Any revisions will be posted on this page with an updated effective date. We encourage you to review this policy periodically to stay informed about how we protect your personal information.",
    ],
  },
  {
    id: "contact-us",
    title: "Contact Us",
    paragraphs: [
      "If you have any questions, concerns, or suggestions regarding this Privacy Policy, please contact us.",
    ],
  },
];

const CONTACTS = [
  { icon: EnvelopeSimple, label: "Email", value: "sales@emsphere.com", href: "mailto:sales@emsphere.com" },
  { icon: Phone, label: "Phone", value: "+91 7798981117", href: "tel:+917798981117" },
];

function PolicySection({ section, index }) {
  const number = String(index + 1).padStart(2, "0");
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className="scroll-mt-28 border-t border-[#f1ece0] py-9 first-of-type:border-t-0 first-of-type:pt-0 last-of-type:pb-0 md:py-10"
    >
      <h2
        id={`${section.id}-heading`}
        className={`${fontInstrument} flex items-baseline gap-3 text-xl font-bold leading-snug text-[#1f1f1f] md:text-2xl`}
      >
        <span className={`${fontInter} text-sm font-bold tracking-wider text-[#b07d00]`}>{number}</span>
        {section.title}
      </h2>

      <div className="mt-4 space-y-4 text-[15px] leading-[1.75] text-black/65 md:text-base">
        {section.paragraphs?.map((text) => (
          <p key={text}>{text}</p>
        ))}

        {section.subsections && (
          <div className="grid gap-4 sm:grid-cols-2">
            {section.subsections.map((sub) => (
              <div key={sub.title} className="rounded-xl bg-[#FFFCF2] p-5 shadow-[inset_0_0_0_1px_#f3ead0]">
                <h3 className={`${fontInstrument} text-base font-bold text-[#1f1f1f]`}>{sub.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed">{sub.text}</p>
              </div>
            ))}
          </div>
        )}

        {section.items && (
          <ul className="space-y-3">
            {section.items.map((item) => (
              <li key={item.term} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#EFB000]" />
                <p>
                  <strong className="font-semibold text-[#1f1f1f]">{item.term}:</strong> {item.text}
                </p>
              </li>
            ))}
          </ul>
        )}

        {section.id === "contact-us" && (
          <ul className="grid gap-3 pt-1 sm:grid-cols-2">
            {CONTACTS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`group/row flex items-center gap-4 rounded-xl bg-white px-5 py-4 shadow-[inset_0_0_0_1px_#e5e5e5] transition-[box-shadow,background-color] duration-300 ${ease} hover:bg-[#FFFBEF] hover:shadow-[inset_0_0_0_1px_#EFB000]`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fff5d9] text-[#EFB000] transition-colors duration-300 group-hover/row:bg-[#EFB000] group-hover/row:text-white">
                    <item.icon weight="fill" aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className={`${fontInter} text-xs font-bold uppercase tracking-wider text-[#b07d00]`}>{item.label}</span>
                    <span className="truncate text-[15px] font-semibold text-[#1f1f1f]">{item.value}</span>
                  </span>
                  <ArrowRight
                    weight="bold"
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-black/30 transition-[translate,color] duration-200 group-hover/row:translate-x-1 group-hover/row:text-[#EFB000]"
                  />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main
      className={`${instrumentSans.variable} ${inter.variable} relative isolate w-full overflow-x-clip bg-[#FFFFFA] font-sans text-[#4c4c4c]`}
    >
      {/* Faint dot grid behind the hero on the plain page background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] opacity-60 [background-image:radial-gradient(rgba(239,176,0,0.28)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(180deg,#000_0%,transparent_75%)]"
      />

      <section aria-labelledby="privacy-hero-heading" className="px-4 pb-14 pt-10 md:px-12 md:pb-20 md:pt-14">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <nav aria-label="Breadcrumb" className={`${fontInter} text-[13px] font-medium text-black/55`}>
            <ol className="flex flex-wrap items-center justify-center gap-1.5">
              <li>
                <Link href="/" className="transition-colors hover:text-[#b07d00]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-black/35">›</li>
              <li aria-current="page" className="font-semibold text-black/80">
                Privacy Policy
              </li>
            </ol>
          </nav>

          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#b07d00] shadow-[inset_0_0_0_1px_rgba(239,176,0,0.35)]">
            <ShieldCheck weight="fill" aria-hidden="true" className="h-4 w-4 text-[#EFB000]" />
            Legal
          </span>

          <h1
            id="privacy-hero-heading"
            className={`${fontInstrument} text-[2.25rem] font-bold leading-[1.1] tracking-[-0.01em] text-[#1f1f1f] sm:text-5xl`}
          >
            emSphere Privacy Policy
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-black/60 md:text-lg">
            How we collect, use, disclose and secure your information when you use the emSphere platform and services.
          </p>

          <p className={`${fontInter} inline-flex items-center gap-2 text-sm font-medium text-black/60`}>
            <CalendarBlank weight="bold" aria-hidden="true" className="h-4 w-4 text-[#b07d00]" />
            Effective date: <time dateTime="2025-07-01" className="font-semibold text-[#1f1f1f]">{EFFECTIVE_DATE}</time>
          </p>
        </div>
      </section>

      {/* Policy body with a sticky table of contents on large screens */}
      <div className="px-4 pb-20 md:px-12 md:pb-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[260px_1fr] lg:gap-12">
          <aside className="hidden md:block lg:sticky lg:top-28 lg:self-start">
            <nav
              aria-label="On this page"
              className="rounded-2xl bg-white p-5 shadow-[inset_0_0_0_1px_#e5e5e5,0px_3px_12px_-4px_rgba(0,0,0,0.06)]"
            >
              <p className={`${fontInter} text-xs font-bold uppercase tracking-[0.14em] text-[#b07d00]`}>On this page</p>
              <ol className="mt-3 grid gap-0.5 sm:grid-cols-2 lg:grid-cols-1">
                {SECTIONS.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex items-baseline gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-black/70 transition-colors hover:bg-[#FFF8E1] hover:text-[#1f1f1f]"
                    >
                      <span className={`${fontInter} text-xs font-semibold text-[#b07d00]`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="relative overflow-hidden rounded-2xl bg-white px-6 py-9 shadow-[inset_0_0_0_1px_#e5e5e5,0_12px_28px_-12px_rgba(0,0,0,0.1)] sm:px-10 md:py-12 lg:px-12">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-[#EFB000]" />
            {SECTIONS.map((section, index) => (
              <PolicySection key={section.id} section={section} index={index} />
            ))}
          </article>
        </div>
      </div>

      <BackToTop />
    </main>
  );
}
