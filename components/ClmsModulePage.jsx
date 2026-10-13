import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instrument_Sans, Inter } from "next/font/google";
import ScrollReveal from "@/components/ScrollReveal";
import BackToTop from "@/components/BackToTop";
import FlagshipProducts from "@/components/FlagshipProducts";

/* --------------------------------------------------------------------
   Shared layout for the CLMS module pages (/clms-*). Each page passes its
   own content + images; the design (from the Onboarding & Gatepass page)
   lives here so every module page stays pixel-consistent.

   All icons are Phosphor components (https://phosphoricons.com) from
   "@phosphor-icons/react/ssr", styled like the HRMS page: white "fill"
   icons on the brand #EFB000 tile.
   -------------------------------------------------------------------- */

const instrumentSans = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument-sans" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fontInstrument = "font-[family-name:var(--font-instrument-sans)]";
const fontInter = "font-[family-name:var(--font-inter)]";

// Brand accent (replaces the design's blue everywhere on these pages).
export const ACCENT = "#EFB000";

const ease = "ease-[cubic-bezier(0.16,1,0.3,1)]";
const motion = `transition-[translate,scale,box-shadow,background-color] duration-300 ${ease}`;
const iconPop = `transition-[scale] duration-300 ${ease} group-hover/card:scale-110`;
const revealUp = "reveal-on-scroll reveal-fade-up";
const revealFromLeft = "reveal-on-scroll reveal-fade-right";
const revealFromRight = "reveal-on-scroll reveal-fade-left";
const stagger = (index, step = 120) => ({ transitionDelay: `${index * step}ms` });

/* Shared surfaces ---------------------------------------------------- */

const sectionPad = "px-4 py-12 md:px-12 md:py-16";
const container = "mx-auto w-full max-w-7xl 2xl:max-w-[1360px]";
const card = [
  "group/card relative flex overflow-hidden rounded-2xl bg-white p-6 md:p-7",
  "shadow-[inset_0_0_0_1px_#e6e6e6,0_4px_16px_-6px_rgba(0,0,0,0.08)]",
  "hover:-translate-y-1 hover:shadow-[inset_0_0_0_1px_rgba(239,176,0,0.55),0_8px_20px_-8px_rgba(239,176,0,0.25)]",
  `transition-[translate,box-shadow] duration-500 ${ease}`,
].join(" ");
const pill = [
  "flex items-center gap-4 rounded-xl bg-white px-4 py-3",
  "shadow-[inset_0_0_0_1px_rgba(239,176,0,0.4),0_2px_8px_-4px_rgba(0,0,0,0.06)]",
  `transition-[translate,box-shadow] duration-300 ${ease} hover:translate-x-1 hover:shadow-[inset_0_0_0_1px_#EFB000,0_6px_16px_-6px_rgba(239,176,0,0.2)]`,
].join(" ");
const mediaFrame =
  "overflow-hidden rounded-[20px] bg-[#e9e8e8] shadow-[0_12px_28px_-16px_rgba(0,0,0,0.12)] ring-1 ring-black/5";
const accentButton = "bg-[#EFB000] hover:bg-[#d99e00] hover:shadow-[0_8px_18px_-4px_rgba(239,176,0,0.5)]";
// Wide dashboard screenshots are shown whole on a white mat instead of being cropped.
const fitContain = "object-contain bg-white p-3 md:p-5";
const bodyText = `${fontInstrument} text-[#3d3d3d]`;

// Workflow step circles: light → dark shades of the #EFB000 accent.
export const WORKFLOW_COLORS = ["#f7c740", "#f3bb1e", "#EFB000", "#d69e00", "#b88700"];

/* --------------------------------------------------------------------
   Icon pieces
   -------------------------------------------------------------------- */

function CheckCircleIcon({ pending = false }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 shrink-0" fill="none" stroke={pending ? "#a3a3a3" : ACCENT} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function SmallIcon({ icon: Icon }) {
  return <Icon aria-hidden="true" weight="fill" color={ACCENT} className="h-4 w-4 shrink-0" />;
}

// Same as the HRMS page's section icon: white fill icon on the #EFB000 tile.
function IconTile({ icon: Icon, className = "h-[65px] w-[65px] rounded-xl", iconClassName = "h-9 w-9" }) {
  return (
    <span className={`flex shrink-0 items-center justify-center bg-[#EFB000] text-white shadow-sm ${iconPop} ${className}`}>
      <Icon weight="fill" aria-hidden="true" className={iconClassName} />
    </span>
  );
}

function Watermark({ icon: Icon }) {
  return (
    <Icon
      aria-hidden="true"
      weight="fill"
      color="#000000"
      className="pointer-events-none absolute right-5 top-5 h-16 w-16 opacity-[0.04]"
    />
  );
}

function StepIcon({ icon: Icon }) {
  return <Icon aria-hidden="true" weight="fill" color="#ffffff" className="h-14 w-14" />;
}

function SectionHeader({ id, eyebrow, title, center = false }) {
  return (
    <header className={`${revealUp} flex flex-col gap-3 ${center ? "items-center text-center" : ""}`}>
      {eyebrow && (
        <p className={`${fontInstrument} inline-flex w-fit rounded-full bg-[rgba(239,176,0,0.14)] px-4 py-1 text-xs font-semibold uppercase leading-6 tracking-[0.14em] text-[#9a7400] md:text-sm`}>
          {eyebrow}
        </p>
      )}
      <h2 id={id} className={`${fontInstrument} text-2xl font-bold leading-[1.25] text-black md:text-[32px] md:leading-[40px]`}>
        {title}
      </h2>
    </header>
  );
}

/* --------------------------------------------------------------------
   Page template
   -------------------------------------------------------------------- */

export default function ClmsModulePage({
  pageUrl,
  breadcrumbName,
  eyebrow,
  heading,
  compactHeading = false,
  featuresFirst = false,
  intro,
  hero,
  benefits,
  features,
  workflow,
}) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.emsphere.com/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contract Labour Management System",
        item: "https://www.emsphere.com/contract-labour-management-system-software/",
      },
      { "@type": "ListItem", position: 3, name: breadcrumbName, item: pageUrl },
    ],
  };

  // Sections set to #FFFFFA
  const [firstBg, secondBg] = ["bg-[#FFFFFA]", "bg-[#FFFFFA]"];
  const benefitsBg = featuresFirst ? secondBg : firstBg;
  const featuresBg = featuresFirst ? firstBg : secondBg;

  // 4 benefits → balanced 2 × 2 with the icon beside the text; otherwise 3 equal columns.
  const twoByTwo = benefits.items.length === 4;
  const benefitGrid = twoByTwo ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";

  const cards = features.cards || [];
  const cardGrid =
    cards.length === 1
      ? "max-w-md"
      : cards.length === 2 || cards.length === 4
        ? "md:grid-cols-2"
        : "md:grid-cols-2 lg:grid-cols-3";
  const StatusIcon = hero.statusCard.icon;
  const HighlightIcon = hero.highlightCard.icon;

  const benefitsSection = (
    <section aria-labelledby="benefits-heading" className={`${benefitsBg} ${sectionPad}`}>
      <div className={`${container} flex flex-col gap-8 md:gap-10`}>
        <SectionHeader id="benefits-heading" eyebrow="BENEFITS" title={benefits.heading} />

        <ul className={`grid grid-cols-1 gap-5 md:gap-6 ${benefitGrid}`}>
          {benefits.items.map((item, index) => (
            <li
              key={item.title}
              style={stagger(index % 3)}
              className={`${revealUp} ${card} flex-col gap-4 ${twoByTwo ? "sm:flex-row sm:items-start sm:gap-5" : ""}`}
            >
              <Watermark icon={item.icon} />
              <IconTile icon={item.icon} />
              <div className="flex flex-col gap-2">
                <h3 className={`${fontInstrument} text-lg font-bold leading-[26px] text-black`}>{item.title}</h3>
                <p className={`${bodyText} text-[15px] leading-6`}>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );

  const featuresSection = (
    <section aria-labelledby="features-heading" className={`${featuresBg} ${sectionPad}`}>
      <div className={`${container} flex flex-col gap-12 md:gap-16`}>
        <div className="flex flex-col gap-8 md:gap-10">
          <SectionHeader id="features-heading" eyebrow="FEATURES" title={features.heading} />
          <div className="flex flex-col gap-12 md:gap-16">
            {features.showcases.map((item, index) => {
              const imageFirst = index % 2 === 1;
              return (
                <article key={item.title} className={`grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 lg:items-center`}>
                  <div className={`${imageFirst ? `${revealFromRight} lg:order-2` : revealFromLeft} flex flex-col gap-4`}>
                    <h3 className={`${fontInstrument} text-2xl font-bold leading-[1.25] text-black md:text-[28px] md:leading-[36px]`}>{item.title}</h3>
                    <p className={`${bodyText} text-base leading-7 md:text-lg`}>{item.text}</p>
                    <ul className="mt-2 flex flex-col gap-3">
                      {item.points.map((point) => (
                        <li key={point.text} className={pill}>
                          <IconTile icon={point.icon} className="h-11 w-11 rounded-lg" iconClassName="h-6 w-6" />
                          <span className={`${fontInstrument} text-base font-medium leading-6 text-black md:text-[17px]`}>{point.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`${imageFirst ? `${revealFromLeft} lg:order-1` : revealFromRight} ${mediaFrame} w-full`}>
                    <Image
                      src={item.image}
                      alt={item.alt}
                      sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
                      className={`aspect-[575/449] h-auto w-full ${item.fit === "contain" ? fitContain : "object-cover"}`}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {cards.length > 0 && (
          <ul className={`grid grid-cols-1 gap-5 md:gap-6 ${cardGrid}`}>
            {cards.map((item, index) => (
              <li key={item.title} style={stagger(index % 3)} className={`${revealUp} ${card} flex-col gap-4`}>
                <Watermark icon={item.icon} />
                <IconTile icon={item.icon} />
                <div className="flex flex-col gap-2">
                  <h3 className={`${fontInstrument} text-lg font-bold leading-[26px] text-black`}>{item.title}</h3>
                  <p className={`${bodyText} text-[15px] leading-6`}>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );

  return (
    <main className={`${instrumentSans.variable} ${inter.variable} hrms-page clms-module-page w-full overflow-x-clip bg-[#FFFFFA] font-sans text-black`}>
      <ScrollReveal root=".clms-module-page" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Hero — fills the first screen below the sticky header (88px + 1px border) */}
      <section
        id="module-hero"
        aria-labelledby="module-hero-heading"
        className="bg-[#FFFFFA] flex flex-col justify-center px-4 pb-14 pt-8 md:px-12 md:pb-20 md:pt-14 lg:min-h-[calc(100vh-89px)] lg:py-12"
      >
        <div className={`${container} grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16`}>
          <header className={`${revealFromLeft} flex flex-col items-start gap-5`}>
            <nav aria-label="Breadcrumb" className={`${fontInter} text-[13px] font-medium text-black/55`}>
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link href="/" className="transition-colors hover:text-[#EFB000]">Home</Link>
                </li>
                <li aria-hidden="true" className="text-black/35">›</li>
                <li>
                  <Link href="/contract-labour-management-system-software" className="transition-colors hover:text-[#EFB000]">
                    Contract Labour Management System
                  </Link>
                </li>
                <li aria-hidden="true" className="text-black/35">›</li>
                <li aria-current="page" className="text-black/80">{breadcrumbName}</li>
              </ol>
            </nav>

            <p className={`${fontInstrument} inline-flex w-fit items-center gap-2 rounded-full bg-[rgba(239,176,0,0.14)] px-4 py-1.5 text-sm font-semibold leading-6 tracking-[0.04em] text-[#1f1f1f] md:text-[15px]`}>
              <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-[#EFB000]" />
              {eyebrow}
            </p>

            <h1 id="module-hero-heading" className={`${fontInstrument} text-4xl font-bold leading-tight text-black ${compactHeading ? "md:text-[44px] md:leading-[54px] 2xl:text-[52px] 2xl:leading-[62px]" : "md:text-[56px] md:leading-[68px] 2xl:text-[64px] 2xl:leading-[76px]"}`}>
              {heading}
            </h1>

            <p className={`${bodyText} max-w-xl text-lg font-medium leading-[30px] 2xl:max-w-2xl 2xl:text-xl 2xl:leading-[34px]`}>{intro}</p>

            <Link
              href="/contact-us"
              className={`${fontInstrument} mt-1 inline-flex w-fit items-center justify-center rounded-lg px-8 py-2.5 text-lg font-semibold leading-8 text-white ${motion} ${accentButton} hover:-translate-y-0.5 md:text-xl`}
            >
              Call For Demo
            </Link>
          </header>

          <div className={`${revealFromRight} relative mx-auto w-full max-w-[600px] lg:mr-0 2xl:max-w-[700px]`}>
            <div className={mediaFrame}>
              <Image
                src={hero.image}
                alt={hero.alt}
                priority
                sizes="(min-width: 1536px) 700px, (min-width: 1024px) 600px, 100vw"
                className={`aspect-[3/2] h-auto w-full ${hero.fit === "contain" ? fitContain : "object-cover"}`}
              />
            </div>

            {/* Status cards — stacked below the image on mobile, floating over its corners from lg */}
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-0 lg:block">
              <div className="rounded-xl bg-white px-5 py-4 shadow-[0_8px_20px_-10px_rgba(0,0,0,0.1)] ring-1 ring-black/5 lg:absolute lg:-right-6 lg:-top-8 lg:w-[220px]">
                <p className={`${fontInstrument} flex items-center gap-2 text-xs font-bold uppercase leading-4 tracking-[0.6px]`}>
                  <SmallIcon icon={StatusIcon} />
                  {hero.statusCard.label}
                </p>
                <ul className={`${fontInstrument} mt-2.5 flex flex-col gap-2 text-xs font-semibold leading-[17px]`}>
                  {hero.statusCard.items.map((item) => (
                    <li key={item.text} className="flex items-center gap-2">
                      <CheckCircleIcon pending={item.pending} /> {item.text}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-white px-5 py-4 shadow-[0_8px_20px_-10px_rgba(0,0,0,0.1)] ring-1 ring-black/5 lg:absolute lg:-bottom-8 lg:-left-6 lg:w-[236px]">
                <p className={`${fontInstrument} flex items-center gap-2 text-xs font-bold uppercase leading-4 tracking-[0.6px]`}>
                  <SmallIcon icon={HighlightIcon} />
                  {hero.highlightCard.label}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <IconTile icon={hero.highlightCard.tileIcon} className="h-10 w-10 rounded-lg" iconClassName="h-6 w-6" />
                  <span className={`${fontInstrument} flex flex-col`}>
                    <span className="text-sm font-bold leading-5">{hero.highlightCard.title}</span>
                    <span className="text-xs leading-4 text-black/70">{hero.highlightCard.subtitle}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits + Features — order follows the live page */}
      {featuresFirst ? (
        <>
          {featuresSection}
          {benefitsSection}
        </>
      ) : (
        <>
          {benefitsSection}
          {featuresSection}
        </>
      )}

      {/* Workflow */}
      <section aria-labelledby="workflow-heading" className={`bg-[#FFFFFA] ${sectionPad}`}>
        <div className={`${container} flex flex-col gap-10 md:gap-12`}>
          <SectionHeader id="workflow-heading" title={workflow.heading} center />

          <ol className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6 lg:before:absolute lg:before:left-[10%] lg:before:right-[10%] lg:before:top-[60px] lg:before:border-t-2 lg:before:border-dashed lg:before:border-[rgba(239,176,0,0.55)]">
            {workflow.steps.map((step, index) => {
              const color = WORKFLOW_COLORS[index % WORKFLOW_COLORS.length];
              return (
                <li
                  key={step.title}
                  style={stagger(index)}
                  className={`${revealUp} relative z-10 flex flex-col items-center gap-3 text-center sm:[&:last-child:nth-child(odd)]:col-span-2 lg:[&:last-child:nth-child(odd)]:col-span-1`}
                >
                  <span
                    className="mb-2 flex h-[120px] w-[120px] items-center justify-center rounded-full border-4 border-white shadow-[0_0_0_6px_currentColor,0_16px_30px_-12px_rgba(0,0,0,0.35)]"
                    style={{ backgroundColor: color, color }}
                  >
                    <StepIcon icon={step.icon} />
                  </span>
                  <h3 className={`${fontInstrument} text-xl font-semibold leading-[28px] tracking-[-0.32px] text-black`}>{step.title}</h3>
                  <p className={`${bodyText} max-w-[230px] text-base leading-6`}>{step.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Our Flagship Products */}
      <FlagshipProducts accentColor={ACCENT} className="bg-[#FFFFFA]" />

      {/* Contact CTA — same as the CLMS / HRMS / payroll pages */}
      <section aria-label="Contact emSphere" className="bg-[#FFFFFA] px-6 py-12 min-[769px]:py-16">
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
                  className={`group/btn inline-flex w-full max-w-65 items-center justify-center rounded-lg px-6 py-[13px] ${fontInter} text-[15px] font-semibold tracking-[0.02em] text-white ${motion} ${accentButton} hover:-translate-y-0.5 active:translate-y-0 min-[769px]:w-auto min-[769px]:max-w-none min-[769px]:min-w-[145px] min-[769px]:px-[30px]`}
                >
                  {col.cta}
                </Link>
              </div>
            </Fragment>
          ))}
        </div>
      </section>
      <BackToTop trigger="#module-hero" />
    </main>
  );
}

/* Shared metadata builder so every module page has the same SEO shape. */
export function buildModuleMetadata({ title, description, url, image }) {
  return {
    title: { absolute: title },
    description,
    keywords: null,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: "Emsphere Technologies",
      locale: "en_US",
      images: [image],
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
