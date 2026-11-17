"use client";

import { useEffect, useRef, useState, Fragment } from "react";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import TrustedLogos from "@/components/TrustedLogos";
import { homePageJsonLd, jsonLdScript } from "@/lib/schema";
import { TESTIMONIALS } from "@/lib/testimonials";
import BackToTop from "@/components/BackToTop";
import StopwatchCounter from "@/components/StopwatchCounter";
import FlagshipProducts from "@/components/FlagshipProducts";
import { Brain, ChartLineUp, ChatsCircle, CloudCheck, Code, Cpu, CurrencyInr, GearSix, Handshake, MagicWand, Medal, PlugsConnected, SealCheck, Sparkle, ThumbsUp } from "@phosphor-icons/react/ssr";

/* --------------------------------------------------------------------
   Images — every image the home page uses lives in app/images/homeimages
   and is imported here by name. To swap a picture, replace the file in
   that folder (keep the same name) or point the import at a new file.
   -------------------------------------------------------------------- */

// Hero
import heroSlide1 from "@/app/images/homeimages/hero-hr-tech-reimagined-ai-hologram.webp";
import heroSlide2 from "@/app/images/homeimages/hero-connected-hr-team-collaboration.webp";
import heroSlide3 from "@/app/images/homeimages/hero-adaptive-integrated-industrial-workers.webp";

// Enhance Workforce and Labor Management
import workforceBuilding from "@/app/images/homeimages/emsphere-corporate-office-building.webp";
import workforceEngineers from "@/app/images/homeimages/emsphere-site-engineers-reviewing-plans.webp";

// Shop floor / Corporate team
import shopFloorTeam from "@/app/images/homeimages/shop-floor-workforce-management-team.webp";
import corporateTeam from "@/app/images/homeimages/corporate-hr-team-collaboration.webp";

// Change from legacy system

// Latest Blogs
import blogContractLabour from "@/app/images/homeimages/blog-contract-labour-management-guide.webp";
import blogPayroll from "@/app/images/homeimages/blog-payroll-management-automation.webp";
import blogVisitorManagement from "@/app/images/homeimages/blog-visitor-management-system-security.webp";
import { Instrument_Sans, Inter } from "next/font/google";

// Self-hosted by next/font (no request to Google Fonts at runtime).
const instrumentSans = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument-sans" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fontVariables = `${instrumentSans.variable} ${inter.variable}`;


/* --------------------------------------------------------------------
   Content data — edit copy, numbers, and labels here.
   -------------------------------------------------------------------- */

const HERO_SLIDES = [
  {
    image: heroSlide1,
    title: "HR Tech Re-imagined",
    text: "A holistic suite of HR Tech products \nto systematically Acquire, Manage, \nDevelop and Engage Your Employees.",
    cta: "Request Demo",
  },
  {
    image: heroSlide2,
    title: "Connected HR",
    text: "A new age modern system, for an\nenterprise which is inclusive, engages\nemployees and seamlessly connect teams.",
    cta: "Request Demo",
  },
  {
    image: heroSlide3,
    title: "Adaptive & Integrated",
    text: "Our CLMS is an end to end, AI powered \nsystem covering all aspects of large scale \nlabour management.",
    cta: "Request Demo",
  },
];

const HERO_STATS = [
  { value: "500", suffix: "+", label: "Happy Client" },
  { value: "15", suffix: "+", label: "Years of Experience" },
  { value: "10,00,000", suffix: "+", label: "Users" },
  { value: "10", suffix: "+", label: "Industries" },
];

const WORKFORCE_FEATURES = [
  { icon: Code, label: "In-house developed\nproducts" },
  { icon: Handshake, label: "Customer centric \napproach" },
  { icon: Brain, label: "Intelligent" },
  { icon: ChartLineUp, label: "Insight Driven" },
  { icon: GearSix, label: "Automation" },
  { icon: Sparkle, label: "AI Driven" },
];

const DIVISIONS = [
  {
    image: shopFloorTeam,
    title: "Shop floor team",
    text: "Businesses with a large labour workforce in multiple locations and shop floors face a different bunch of challenges, mostly due to unorganized structure.",
    hoverText:
      "Businesses with a large labour workforce in multiple locations and shop floors face a different bunch of challenges, mostly due to unorganized structure. A world-class organization would use automation to empower large contract labour workforce HR teams, Operations and Management, aligning them with the production goals.",
  },
  {
    image: corporateTeam,
    title: "Corporate team",
    text: "Modern organization are employee centric, and an HRMS covering all aspects of a team member is a necessity in today’s hybrid environment.",
    hoverText:
      "Modern organization are employee centric, and an HRMS covering all aspects of a team member is a necessity in today’s hybrid environment. Tasks and workflows to make it easy for HR teams. Analytics for data driven employee centric decisions!",
  },
];

const REASONS = [
  { icon: MagicWand, label: "Intuitive With AI" },
  { icon: PlugsConnected, label: "ERP Integration" },
  { icon: SealCheck, label: "ISO/IEC 27001:2022" },
  { icon: Cpu, label: "Hardware Partnership" },
  { icon: CloudCheck, label: "Data On Cloud" },
  { icon: ChatsCircle, label: "Consultative \nImplementation" },
  { icon: CurrencyInr, label: "Competitive Costing" },
  { icon: ThumbsUp, label: "Developed On \nUser Feedback" },
];

const FALLBACK_BLOGS = [
  {
    slug: "contract-labour-management-indian-principal-employers",
    title: "Contract And Labor Management",
    excerpt:
      "One System, Zero Compliance Gaps: The Complete Guide to Contract Labour Management for Indian Principal Employers",
    featuredImage: {
      src: blogContractLabour.src,
      width: blogContractLabour.width,
      height: blogContractLabour.height,
      alt: "Contract And Labor Management",
    },
  },
  {
    slug: "payroll-management-system-compliance-india",
    title: "In Payroll Management",
    excerpt:
      "Payroll Without the Pain: How Emsphere’s Payroll Management System Automates Compliance for Indian Enterprises",
    featuredImage: {
      src: blogPayroll.src,
      width: blogPayroll.width,
      height: blogPayroll.height,
      alt: "In Payroll Management",
    },
  },
  {
    slug: "visitor-management-system-business-security-investment",
    title: "Visitor Management System",
    excerpt:
      "Why a Visitor Management System Is Now a Business-Critical Security Investment",
    featuredImage: {
      src: blogVisitorManagement.src,
      width: blogVisitorManagement.width,
      height: blogVisitorManagement.height,
      alt: "Visitor Management System",
    },
  },
];

/* --------------------------------------------------------------------
   Small inline icons (kept local so this page has zero UI-kit deps)
   -------------------------------------------------------------------- */

function ArrowRightIcon(props) {
  return (
    <svg viewBox="0 0 15 12" fill="none" aria-hidden="true" {...props}>
      <path
        d="M14.86 6.315c.09-.087.14-.204.14-.327c0-.122-.05-.239-.14-.326L9.115.124a.5.5 0 0 0-.69.724L13.02 5.53H.5a.5.5 0 0 0 0 1h12.52l-4.595 4.68a.5.5 0 0 0 .69.723z"
        fill="currentColor"
      />
    </svg>
  );
}

/* --------------------------------------------------------------------
   Page CSS — plain hand-written CSS (no Tailwind), kept in this same
   file as a single template string and rendered via <style> below.
   Every rule is scoped under ".home-page" so it can never leak out to
   or clash with the rest of the site (header/footer/global styles).
   Colors and fonts are declared as custom properties on .home-page so
   the whole thing can be re-themed from one place.
   -------------------------------------------------------------------- */

const PAGE_CSS = `
@keyframes pageEntranceFade {
  0% {
    opacity: 0;
    transform: translateY(12px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.home-page {
  animation: pageEntranceFade 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  will-change: opacity, transform;
  --blue: #0077c2;
  --blue-dark: #0061af;
  --blue-alt: #0b78c2;
  --gold: #efb000;
  --gold-dark: #d69e00;
  --amber-icon: #f8bb18;
  --text: #000000;
  --text-64: rgba(0, 0, 0, 0.64);
  --text-50: rgba(0, 0, 0, 0.5);
  --text-15: rgba(0, 0, 0, 0.15);
  --heading-gray: #4c4c4c;
  --bg-gray-1: #f7f7f7;
  --bg-gray-2: #f0f0f0;
  --bg-gray-3: rgba(245, 245, 245, 0.5);
  --border-gray: #dcdcdc;
  --font-heading: var(--font-instrument-sans), "Instrument Sans", system-ui, sans-serif;
  --font-label: var(--font-inter), "Inter", system-ui, sans-serif;

  font-family: var(--font-heading);
  color: var(--text);
  overflow-x: hidden;
}

/* --------------------------------------------------------------------
   Scroll-Triggered Reveal Animations
   -------------------------------------------------------------------- */

.home-page .reveal-on-scroll {
  will-change: opacity, transform;
}

.home-page .reveal-fade-up {
  opacity: 0;
  transform: translateY(36px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.home-page .reveal-fade-down {
  opacity: 0;
  transform: translateY(-28px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.home-page .reveal-fade-left {
  opacity: 0;
  transform: translateX(44px);
  transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
}

.home-page .reveal-fade-right {
  opacity: 0;
  transform: translateX(-44px);
  transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
}

.home-page .reveal-zoom-in {
  opacity: 0;
  transform: scale(0.92);
  transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
}

.home-page .reveal-on-scroll.reveal-visible {
  opacity: 1;
  transform: none;
}

.home-page img {
  max-width: 100%;
  display: block;
}

.home-page .container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
}

.home-page .section {
  padding: 72px 0;
}

.home-page .sectionHead {
  text-align: center;
  max-width: 720px;
  margin: 0 auto 44px;
}

.home-page .sectionTitle {
  font-size: 32px;
  font-weight: 600;
  line-height: 1.25;
  color: var(--heading-gray);
  margin: 0 0 12px;
}

.home-page .sectionSubtitle {
  font-size: 17px;
  line-height: 1.55;
  color: var(--text-64);
  margin: 0;
}

.home-page .goldButton,
.home-page .blueButton {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: none;
  cursor: pointer;
  border-radius: 9px;
  padding: 13px 26px;
  font-family: var(--font-label);
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s ease;
  will-change: transform;
}

.home-page .goldButton {
  background: var(--gold);
}

.home-page .goldButton:hover {
  background: var(--gold-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 18px -4px rgba(239, 176, 0, 0.45);
}

.home-page .goldButton:active {
  transform: translateY(0);
}

.home-page .blueButton {
  background: var(--gold);
}

.home-page .blueButton:hover {
  background: var(--gold-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 18px -4px rgba(239, 176, 0, 0.45);
}

.home-page .blueButton:active {
  transform: translateY(0);
}

.home-page .buttonIcon {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.home-page .goldButton:hover .buttonIcon,
.home-page .blueButton:hover .buttonIcon {
  transform: translateX(3px);
}

.home-page .learnMore {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  font-family: var(--font-label);
  font-size: 15px;
  font-weight: 600;
  color: #b07d00;
  text-decoration: none;
  transition: color 0.2s ease;
}

.home-page .learnMore svg {
  width: 15px;
  height: 12px;
  transition: transform 0.2s ease;
}

.home-page .learnMore:hover {
  color: #8a6400;
}

.home-page .learnMore:hover svg {
  transform: translateX(3px);
}

/* ==========================================================================
   Hero
   ========================================================================== */

/* The hero fills the first screen below the sticky header (88px + 1px
   border, 84px under 768px, 80px under 640px), clamped so it never gets
   too squat or too tall. --hero-bar-space reserves room at the bottom for
   the stats bar so the slide copy is centred in what's left above it. */
.home-page .hero {
  --hero-header: 89px;
  --hero-gutter: 24px;
  --hero-bar-space: 172px;
  position: relative;
  height: calc(100vh - var(--hero-header));
  height: calc(100svh - var(--hero-header));
  min-height: 600px;
  max-height: 1000px;
  overflow: hidden;
  background: #ffffff;
}

.home-page .heroSlides {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.home-page .heroSlide {
  position: absolute;
  inset: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.6s ease;
}

.home-page .heroSlideActive {
  opacity: 1;
  visibility: visible;
}

.home-page .heroSlideBg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* The subject sits on the right of every slide; keep it in frame when
     the hero is narrower than the 1440x631 artwork. */
  object-position: 70% center;
}

/* Readability wash behind the copy, so text stays legible however much of
   the artwork's own white fade gets cropped away. */
.home-page .heroSlide::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0.7) 30%,
    rgba(255, 255, 255, 0) 56%
  );
}

.home-page .heroSlideContent {
  position: relative;
  z-index: 1;
  max-width: 1240px;
  height: 100%;
  margin: 0 auto;
  padding: 0 var(--hero-gutter) var(--hero-bar-space);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@keyframes heroSlideFadeUp {
  from {
    opacity: 0;
    transform: translateY(22px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.home-page .heroSlideActive .heroTitle {
  animation: heroSlideFadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.home-page .heroSlideActive .heroText {
  animation: heroSlideFadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.12s both;
}

.home-page .heroSlideActive .heroCta {
  animation: heroSlideFadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.24s both;
}

.home-page .heroTitle {
  font-size: clamp(32px, 2.8vw, 48px);
  font-weight: 600;
  line-height: 1.22;
  color: #000000;
  margin: 0 0 clamp(14px, 1.5vw, 22px);
  max-width: 580px;
}

.home-page .heroText {
  font-size: clamp(17px, 1.5vw, 22px);
  font-weight: 600;
  line-height: 1.35;
  color: var(--text-64);
  margin: 0 0 clamp(24px, 2.4vw, 34px);
  max-width: 520px;
  white-space: pre-line;
}

.home-page .heroCta {
  align-self: flex-start;
}

/* Bottom bar: slide dots on the left, stats card on the right, both
   aligned to the same 1240px column as the slide copy. */
.home-page .heroStatsWrap {
  position: absolute;
  left: 0;
  right: 0;
  bottom: clamp(24px, 4.5vh, 48px);
  z-index: 2;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 var(--hero-gutter);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  pointer-events: none;
}

.home-page .heroStatsWrap > * {
  pointer-events: auto;
}

.home-page .heroStats {
  position: relative;
  flex: 0 1 820px;
  min-width: 0;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(0, 119, 194, 0.14);
  border-radius: 14px;
  box-shadow:
    0 18px 40px -12px rgba(0, 48, 100, 0.12),
    0 6px 16px -4px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 28px;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease;
  will-change: transform;
  overflow: hidden;
}

.home-page .heroStats::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gold, #efb000);
}

.home-page .heroStats:hover {
  transform: translateY(-4px);
  border-color: rgba(239, 176, 0, 0.45);
  box-shadow:
    0 24px 48px -12px rgba(0, 80, 160, 0.18),
    0 10px 24px -6px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 1);
}

.home-page .heroStatDivider {
  width: 1px;
  height: 38px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.02) 100%);
  flex-shrink: 0;
}

.home-page .heroStat {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4px 6px;
  min-width: 0;
  transition: transform 0.25s ease;
}

.home-page .heroStat:hover {
  transform: translateY(-2px);
}

.home-page .heroStatValue {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 26px;
  color: #0b192c;
  margin-bottom: 4px;
  font-variant-numeric: tabular-nums;
  line-height: 1.15;
}

.home-page .heroStopwatchNumber {
  font-family: var(--font-heading) !important;
  font-weight: 800 !important;
  color: #0b192c;
  letter-spacing: -0.02em;
}

.home-page .heroStatLabel {
  display: block;
  font-family: var(--font-label);
  font-weight: 600;
  font-size: 13.5px;
  color: rgba(15, 23, 42, 0.65);
  line-height: 1.3;
  white-space: nowrap;
}

.home-page .heroDots {
  display: flex;
  gap: 11px; /* 14px dots: centres 25px apart (WCAG 2.5.8) */
  flex-shrink: 0;
}

.home-page .heroDot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid #d3d3d3;
  background: var(--border-gray);
  padding: 0;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.home-page .heroDot:hover {
  transform: scale(1.15);
  border-color: var(--gold, #efb000);
}

.home-page .heroDotActive {
  background: var(--gold, #efb000);
  border-color: var(--gold, #efb000);
  transform: scale(1.2);
}

/* Small laptops / landscape tablets */
@media (max-width: 1080px) {
  .home-page .hero {
    --hero-gutter: 20px;
    --hero-bar-space: 160px;
  }

  .home-page .heroSlide::after {
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.92) 0%,
      rgba(255, 255, 255, 0.78) 36%,
      rgba(255, 255, 255, 0) 66%
    );
  }

  .home-page .heroStatsWrap {
    gap: 24px;
  }

  .home-page .heroStats {
    padding: 20px 18px;
  }

  .home-page .heroStatValue {
    font-size: 23px;
  }

  .home-page .heroStatLabel {
    font-size: 12.5px;
  }
}

/* Portrait tablets and phones: centred copy over a full-width wash, stats
   card spanning the width with the dots underneath. */
@media (max-width: 900px), (max-width: 1080px) and (orientation: portrait) {
  .home-page .hero {
    --hero-bar-space: 150px;
    min-height: 560px;
    max-height: 1100px;
  }

  .home-page .heroSlideBg {
    object-position: 72% center;
  }

  .home-page .heroSlide::after {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.9) 0%,
      rgba(255, 255, 255, 0.82) 50%,
      rgba(255, 255, 255, 0.5) 100%
    );
  }

  .home-page .heroSlideContent {
    max-width: 640px;
    padding: 24px var(--hero-gutter) var(--hero-bar-space);
    align-items: center;
    text-align: center;
  }

  .home-page .heroTitle {
    font-size: clamp(26px, 5vw, 38px);
    font-weight: 700;
    margin: 0 auto 14px;
    max-width: 520px;
  }

  .home-page .heroText {
    font-size: clamp(15px, 2.4vw, 19px);
    font-weight: 500;
    line-height: 1.5;
    margin: 0 auto 24px;
    max-width: 480px;
    white-space: normal;
  }

  .home-page .heroCta {
    align-self: center;
  }

  .home-page .heroStatsWrap {
    flex-direction: column;
    gap: 14px;
    bottom: 18px;
  }

  .home-page .heroStats {
    flex: none;
    width: 100%;
    padding: 18px 12px;
    border-radius: 12px;
  }

  .home-page .heroStatValue {
    font-size: 22px;
    margin-bottom: 2px;
  }

  .home-page .heroStatLabel {
    white-space: normal;
  }

  .home-page .heroDots {
    order: 2;
    gap: 14px; /* 11px dots: centres 25px apart */
  }

  .home-page .heroDot {
    width: 11px;
    height: 11px;
  }

  .home-page .heroDotActive {
    transform: scale(1.25);
  }
}

@media (max-width: 767px) {
  .home-page .hero {
    --hero-header: 85px;
    --hero-gutter: 16px;
  }
}

/* Phones: stats wrap to a 2 x 2 grid. */
@media (max-width: 600px) {
  .home-page .hero {
    --hero-bar-space: 200px;
  }

  .home-page .heroStats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px 12px;
    padding: 18px 14px;
  }

  .home-page .heroStatDivider {
    display: none;
  }
}

@media (max-width: 639px) {
  .home-page .hero {
    --hero-header: 81px;
  }
}

@media (max-width: 380px) {
  .home-page .hero {
    --hero-gutter: 12px;
    --hero-bar-space: 190px;
    min-height: 520px;
  }

  .home-page .heroTitle {
    font-size: 24px;
  }

  .home-page .heroText {
    font-size: 14.5px;
    margin-bottom: 20px;
  }

  .home-page .heroStats {
    gap: 12px 10px;
    padding: 16px 12px;
  }

  .home-page .heroStatValue {
    font-size: 20px;
  }

  .home-page .heroStatLabel {
    font-size: 12px;
  }
}

/* Landscape phones: the screen is shorter than the copy + stats, so give
   the hero a compact fixed floor instead of a full-screen height. */
@media (max-height: 500px) and (orientation: landscape) {
  .home-page .hero {
    --hero-bar-space: 130px;
    min-height: 460px;
  }

  .home-page .heroTitle {
    font-size: 26px;
    margin-bottom: 10px;
  }

  .home-page .heroText {
    font-size: 15px;
    margin-bottom: 18px;
  }
}

/* ==========================================================================
   Enhance Workforce and Labor Management
   ========================================================================== */

.home-page .workforce {
  padding: 88px 0;
  background: #FFFFFA;
}

.home-page .workforceGrid {
  display: grid;
  grid-template-columns: 519px 1fr;
  gap: 72px;
  align-items: start;
}

.home-page .workforceMedia {
  position: relative;
  isolation: isolate;
}

/* Gold dot grid peeking out behind the main photo */
.home-page .workforceDots {
  position: absolute;
  top: -26px;
  left: -26px;
  width: 150px;
  height: 150px;
  z-index: -1;
  background-image: radial-gradient(rgba(239, 176, 0, 0.45) 1.6px, transparent 1.6px);
  background-size: 16px 16px;
  border-radius: 12px;
  animation: workforceDotsDrift 9s ease-in-out infinite;
}

.home-page .workforceMediaMainWrap {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0px 10px 30px -12px rgba(0, 0, 0, 0.22);
}

.home-page .workforceMediaMain {
  display: block;
  width: 100%;
  height: 277px;
  object-fit: cover;
  transition: scale 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}

.home-page .workforceMediaMainWrap:hover .workforceMediaMain {
  scale: 1.05;
}

.home-page .workforceMediaOverlayWrap {
  position: absolute;
  left: 222px;
  top: 250px;
  width: 320px;
  height: 305px;
  z-index: 2;
}

.home-page .workforceMediaOverlay {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  border: 5px solid #ffffff;
  box-sizing: border-box;
  box-shadow: 0px 18px 40px -14px rgba(0, 0, 0, 0.28);
  animation: workforceOverlayFloat 7s ease-in-out infinite;
  transition: scale 0.6s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.home-page .workforceMediaOverlay:hover {
  scale: 1.03;
  box-shadow: 0px 26px 50px -16px rgba(0, 0, 0, 0.32);
}

.home-page .workforceBadgeWrap {
  position: absolute;
  left: 0;
  top: 315px;
  width: 160px;
  height: 223px;
  z-index: 3;
}

.home-page .workforceBadge {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: linear-gradient(160deg, rgba(255, 226, 150, 0.75) 0%, rgba(255, 245, 217, 0.9) 100%);
  box-shadow: inset 0 0 0 1px rgba(239, 176, 0, 0.25), 0 14px 30px -14px rgba(176, 125, 0, 0.45);
  backdrop-filter: blur(6px);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 6px;
  padding: 12px;
  animation: badgePulseFloat 5s ease-in-out infinite;
  transition: box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1), scale 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

/* Periodic light sweep across the badge */
.home-page .workforceBadge::after {
  content: "";
  position: absolute;
  top: 0;
  left: -80%;
  width: 55%;
  height: 100%;
  background: linear-gradient(105deg, transparent, rgba(255, 255, 255, 0.7), transparent);
  transform: skewX(-18deg);
  animation: workforceBadgeShine 5s cubic-bezier(0.22, 1, 0.36, 1) 1.5s infinite;
}

.home-page .workforceBadge:hover {
  scale: 1.04;
  box-shadow: inset 0 0 0 1px rgba(239, 176, 0, 0.5), 0 22px 40px -16px rgba(176, 125, 0, 0.6);
}

.home-page .workforceBadgeIcon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--gold);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 8px 16px -6px rgba(239, 176, 0, 0.7);
}

.home-page .workforceBadgeNumber {
  font-size: 30px;
  font-weight: 700;
  color: var(--text);
  line-height: 1;
}

.home-page .workforceBadgeLabel {
  font-size: 15px;
  font-weight: 600;
  color: var(--text);
  line-height: 1.3;
}

@keyframes badgePulseFloat {
  0%, 100% { translate: 0 0; }
  50% { translate: 0 -8px; }
}

@keyframes workforceOverlayFloat {
  0%, 100% { translate: 0 0; }
  50% { translate: 0 6px; }
}

@keyframes workforceDotsDrift {
  0%, 100% { translate: 0 0; }
  50% { translate: 8px 8px; }
}

@keyframes workforceBadgeShine {
  0% { left: -80%; }
  40%, 100% { left: 140%; }
}

.home-page .workforceContent {
  padding-top: 6px;
  padding-left: 36px;
}

.home-page .workforceTitle {
  font-size: 30px;
  font-weight: 600;
  line-height: 1.25;
  color: var(--heading-gray);
  margin: 0 0 16px;
  white-space: pre-line;
}

.home-page .workforceText {
  font-size: 16px;
  line-height: 1.55;
  color: var(--text-64);
  margin: 0 0 28px;
  white-space: pre-line;
}

.home-page .workforceFeatures {
  display: grid;
  grid-template-columns: repeat(2, 264px);
  gap: 16px;
  margin: 0 0 32px;
  padding: 0;
  list-style: none;
}

.home-page .workforceFeatureItem {
  display: flex;
}

.home-page .workforceFeatureCard {
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  background: #ffffff;
  box-shadow: inset 0 0 0 1px #ececec, 0px 4px 14px -8px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  padding: 12px 16px;
  transition: transform 0.5s var(--ease-out), box-shadow 0.5s var(--ease-out), background-color 0.5s var(--ease-out);
}

/* Light sweep on hover */
.home-page .workforceFeatureCard::after {
  content: "";
  position: absolute;
  top: 0;
  left: -70%;
  width: 45%;
  height: 100%;
  pointer-events: none;
  background: linear-gradient(105deg, transparent, rgba(255, 255, 255, 0.8), transparent);
  transform: skewX(-18deg);
  transition: left 0.9s var(--ease-out);
}

.home-page .workforceFeatureCard:hover {
  transform: translateY(-4px);
  background-color: #fffbf0;
  box-shadow: inset 0 0 0 1.5px var(--gold), 0px 18px 32px -16px rgba(176, 125, 0, 0.45);
}

.home-page .workforceFeatureCard:hover::after {
  left: 130%;
}

.home-page .workforceFeatureIconWrap {
  flex-shrink: 0;
  width: 47px;
  height: 47px;
  border-radius: 12px;
  background: var(--gold);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 16px -8px rgba(239, 176, 0, 0.75);
  transition: transform 0.6s var(--ease-out), box-shadow 0.5s var(--ease-out);
}

.home-page .workforceFeatureCard:hover .workforceFeatureIconWrap {
  transform: rotate(-8deg) scale(1.1);
  box-shadow: 0 12px 22px -8px rgba(239, 176, 0, 0.85);
}

.home-page .workforceFeatureIcon {
  width: 24px;
  height: 24px;
  transition: transform 0.6s var(--ease-out);
}

.home-page .workforceFeatureCard:hover .workforceFeatureIcon {
  transform: rotate(8deg);
}

.home-page .workforceFeatureLabel {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--text);
  transition: transform 0.5s var(--ease-out);
}

.home-page .workforceFeatureCard:hover .workforceFeatureLabel {
  transform: translateX(3px);
}

/* ==========================================================================
   Serving the HR and Industrial Relations — Shop floor / Corporate team
   ========================================================================== */

.home-page .divisions {
  padding: 88px 0;
  background: #FFFFFA;
  position: relative;
  overflow: hidden;
}

.home-page .divisionsGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  max-width: 980px;
  margin: 0 auto;
}

.home-page .divisionCard {
  position: relative;
  perspective: 1200px;
  -webkit-perspective: 1200px;
  background: transparent;
  cursor: pointer;
  outline: none;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.home-page .divisionCard:hover,
.home-page .divisionCard:focus-visible,
.home-page .divisionCard.divisionCardActive {
  transform: translateY(-5px);
}

.home-page .divisionCardInner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  will-change: transform;
}

.home-page .divisionCard:hover .divisionCardInner,
.home-page .divisionCard:focus-visible .divisionCardInner,
.home-page .divisionCard.divisionCardActive .divisionCardInner {
  transform: rotateY(180deg);
}

.home-page .divisionCardFront,
.home-page .divisionCardBack {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: inset 0 0 0 1px #e2e8f0, 0px 4px 16px -6px rgba(0, 0, 0, 0.08);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  transition: box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.home-page .divisionCard:hover .divisionCardFront,
.home-page .divisionCard:hover .divisionCardBack,
.home-page .divisionCard:focus-visible .divisionCardFront,
.home-page .divisionCard:focus-visible .divisionCardBack,
.home-page .divisionCard.divisionCardActive .divisionCardFront,
.home-page .divisionCard.divisionCardActive .divisionCardBack {
  box-shadow: inset 0 0 0 1.5px rgba(239, 176, 0, 0.7), 0px 12px 28px -6px rgba(0, 0, 0, 0.14);
}

.home-page .divisionCardFront {
  position: relative;
  background: rgba(255, 248, 228, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 28px 28px 32px;
  display: flex;
  flex-direction: column;
  transform: rotateY(0deg) translateZ(1px);
  z-index: 2;
}

.home-page .divisionImage {
  width: 100%;
  height: 204px;
  object-fit: cover;
  border-radius: 11px;
  box-shadow: 0px 4px 16px -6px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
  display: block;
}

.home-page .divisionTitle {
  font-size: 25px;
  font-weight: 600;
  color: var(--text);
  margin: 0 0 10px;
}

.home-page .divisionText {
  font-size: 14px;
  line-height: 1.55;
  color: var(--text-64);
  margin: 0;
}

.home-page .divisionCardBack {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 32px 30px;
  background: linear-gradient(145deg, rgba(255, 252, 244, 0.98) 0%, rgba(255, 247, 230, 0.98) 100%);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  transform: rotateY(180deg) translateZ(1px);
  z-index: 1;
}

.home-page .divisionHoverTitle {
  font-size: 25px;
  font-weight: 700;
  color: var(--text, #000000);
  margin: 0 0 10px;
  line-height: 1.25;
}

.home-page .divisionHoverDivider {
  width: 48px;
  height: 3px;
  background: var(--gold, #efb000);
  border-radius: 2px;
  margin-bottom: 18px;
  flex-shrink: 0;
}

.home-page .divisionHoverText {
  font-size: 14.5px;
  font-weight: 500;
  line-height: 1.65;
  color: rgba(0, 0, 0, 0.82);
  margin: 0;
  max-width: 420px;
  text-align: center;
}

/* ==========================================================================
   Change from legacy system — reasons grid
   ========================================================================== */

.home-page .reasons {
  padding: 88px 0;
  background: #FFFFFA;
}

.home-page .reasonsGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
  max-width: 1080px;
  margin: 0 auto;
  padding: 0;
  list-style: none;
}

/* The reveal animation lives on the <li> so its delay never slows the
   card's own hover transitions. */
.home-page .reasonItem {
  display: flex;
}

.home-page .reasonCard {
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  isolation: isolate;
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 18px;
  padding: 34px 18px 28px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: inset 0 0 0 1px #ececec, 0 4px 14px -8px rgba(0, 0, 0, 0.08);
  transition: transform 0.5s var(--ease-out), box-shadow 0.5s var(--ease-out);
}

/* Soft gold wash that rises from the bottom on hover */
.home-page .reasonCard::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(180deg, rgba(255, 245, 217, 0) 35%, rgba(255, 245, 217, 0.9) 100%);
  opacity: 0;
  transition: opacity 0.5s var(--ease-out);
}

/* Diagonal light sweep */
.home-page .reasonCard::after {
  content: "";
  position: absolute;
  top: 0;
  left: -75%;
  width: 50%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(105deg, transparent 0%, rgba(255, 255, 255, 0.75) 50%, transparent 100%);
  transform: skewX(-18deg);
  transition: left 0.9s var(--ease-out);
}

.home-page .reasonCard:hover {
  transform: translateY(-8px);
  box-shadow: inset 0 0 0 1px rgba(239, 176, 0, 0.55), 0 22px 40px -18px rgba(176, 125, 0, 0.35);
}

.home-page .reasonCard:hover::before {
  opacity: 1;
}

.home-page .reasonCard:hover::after {
  left: 130%;
}

.home-page .reasonNum {
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: #d9d9d9;
  transition: color 0.5s var(--ease-out);
}

.home-page .reasonCard:hover .reasonNum {
  color: var(--gold);
}

.home-page .reasonIcon {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: #fff5d9;
  color: var(--gold);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  transition: background-color 0.5s var(--ease-out), color 0.5s var(--ease-out),
    transform 0.6s var(--ease-out), box-shadow 0.5s var(--ease-out);
}

/* Pulsing ring around the icon on hover */
.home-page .reasonIcon::after {
  content: "";
  position: absolute;
  inset: -6px;
  border-radius: 20px;
  border: 1.5px solid rgba(239, 176, 0, 0.45);
  opacity: 0;
  transform: scale(0.85);
  transition: opacity 0.5s var(--ease-out), transform 0.5s var(--ease-out);
}

.home-page .reasonIcon svg {
  transition: transform 0.6s var(--ease-out);
}

.home-page .reasonCard:hover .reasonIcon {
  background: var(--gold);
  color: #ffffff;
  transform: translateY(-2px) rotate(-6deg);
  box-shadow: 0 12px 22px -8px rgba(239, 176, 0, 0.65);
}

.home-page .reasonCard:hover .reasonIcon::after {
  opacity: 1;
  transform: scale(1);
  animation: reasonRingPulse 1.8s var(--ease-out) 0.4s infinite;
}

.home-page .reasonCard:hover .reasonIcon svg {
  transform: rotate(6deg) scale(1.08);
}

.home-page .reasonLabel {
  font-size: 16px;
  font-weight: 600;
  color: #1f1f1f;
  line-height: 1.35;
  white-space: pre-line;
}

/* Underline that grows from the centre */
.home-page .reasonBar {
  width: 28px;
  height: 3px;
  border-radius: 3px;
  margin-top: auto;
  background: #f1e2b8;
  transition: width 0.55s var(--ease-out), background-color 0.55s var(--ease-out);
}

.home-page .reasonCard:hover .reasonBar {
  width: 64px;
  background: var(--gold);
}

@keyframes reasonRingPulse {
  0% { opacity: 1; transform: scale(1); }
  70%, 100% { opacity: 0; transform: scale(1.25); }
}

/* ==========================================================================
   Testimonials
   ========================================================================== */

.home-page .testimonials {
  background: #FFFFFA;
  padding: 88px 0;
  position: relative;
  overflow: hidden;
}

@keyframes homePageTestimonialQuotePulse {
  0%,
  100% {
    opacity: 0.35;
    transform: scale(1) rotate(var(--quote-rotate, 0deg));
  }
  50% {
    opacity: 0.7;
    transform: scale(1.08) rotate(var(--quote-rotate, 0deg));
  }
}

.home-page .testimonialsQuoteMark {
  position: absolute;
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 700;
  font-size: 190px;
  line-height: 1;
  color: rgba(0, 0, 0, 0.1);
  pointer-events: none;
  user-select: none;
  z-index: 0;
  animation: homePageTestimonialQuotePulse 3.6s ease-in-out infinite;
  animation-delay: 2.3s;
}

.home-page .testimonialsQuoteLeft {
  left: 12px;
  top: 24px;
}

.home-page .testimonialsQuoteRight {
  right: 12px;
  bottom: 8px;
  --quote-rotate: 180deg;
  transform: rotate(180deg);
}

.home-page .testimonialsViewport {
  --testimonial-visible: 3;
  overflow: hidden;
  max-width: 1240px;
  margin: 0 auto 32px;
}

/* Mobile-only swipeable slider — hidden on desktop, shown at <=768px */
.home-page .testimonialsMobileTrack {
  display: none;
}

.home-page .testimonialsTrack {
  --testimonial-gap: 24px;
  --testimonial-item: calc(
    (100% - (var(--testimonial-visible) - 1) * var(--testimonial-gap)) / var(--testimonial-visible)
  );
  display: flex;
  gap: var(--testimonial-gap);
  width: 100%;
  transform: translate3d(calc(var(--slide, 0) * -1 * (var(--testimonial-item) + var(--testimonial-gap))), 0, 0);
  transition: transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
  backface-visibility: hidden;
}

/* While snapping back from the clones nothing may animate, or the
   highlighted card would visibly fade. */
.home-page .testimonialsTrackInstant,
.home-page .testimonialsTrackInstant .testimonialCard,
.home-page .testimonialsTrackInstant .testimonialCard * {
  transition: none !important;
}

/* Highlight hand-off between cards fades instead of snapping. */
.home-page .testimonialCard .testimonialCompany,
.home-page .testimonialCard .testimonialQuote,
.home-page .testimonialCard .testimonialName,
.home-page .testimonialCard .testimonialRole,
.home-page .testimonialCard .testimonialReadMore {
  transition: color 0.6s ease;
}

@media (prefers-reduced-motion: reduce) {
  .home-page .testimonialsTrack {
    transition: none;
  }
}

.home-page .testimonialCard {
  flex: 0 0 var(--testimonial-item);
  min-width: 0;
  background: #fbfbfb;
  border-radius: 11px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.6s ease, background-color 0.6s ease, border-color 0.6s ease, outline-color 0.6s ease;
}

.home-page .testimonialCard:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 30px -6px rgba(0, 0, 0, 0.14);
}

.home-page .testimonialFeatured {
  background: #ffffff;
  box-shadow: 0px 10px 26px -10px rgba(239, 176, 0, 0.3);
  outline: 2px solid #efb000;
  outline-offset: -2px;
}

.home-page .testimonialBody {
  padding: 28px 28px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.home-page .testimonialCompany {
  font-size: 25px;
  font-weight: 700;
  color: var(--text-15);
  margin: 0 0 16px;
}

.home-page .testimonialFeatured .testimonialCompany {
  color: var(--text-64);
}

.home-page .testimonialQuote {
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
  color: var(--text-15);
  margin: 0 0 12px;
  white-space: pre-line;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  flex: 1;
}

.home-page .testimonialQuoteExpanded {
  -webkit-line-clamp: unset;
  overflow: visible;
}

.home-page .testimonialFeatured .testimonialQuote {
  color: var(--text-64);
  font-weight: 600;
}

.home-page .testimonialReadMore {
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  font-size: 16px;
  font-weight: 700;
  color: #8a6100;
  align-self: flex-start;
  margin-top: auto;
  transition: color 0.2s ease, transform 0.2s ease;
}

.home-page .testimonialReadMore:hover {
  transform: translateX(2px);
}

.home-page .testimonialFeatured .testimonialReadMore {
  color: #8a6100;
}

.home-page .testimonialFooter {
  background: #FFFFFA;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 14px;
  height: 96px;
  min-height: 96px;
  max-height: 96px;
  box-sizing: border-box;
  margin-top: 0;
  border-bottom: 1px solid #f3e6c4;
  order: -1;
}

.home-page .testimonialLogoWrap {
  --logo-scale: 1;
  width: 84px;
  height: 56px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  flex-shrink: 0;
  box-sizing: border-box;
  transition: transform 0.25s ease;
}

.home-page .testimonialCard:hover .testimonialLogoWrap {
  transform: scale(1.05);
}

.home-page .testimonialLogo {
  width: calc(var(--w) * var(--logo-scale));
  height: calc(var(--h) * var(--logo-scale));
  max-width: none;
  object-fit: contain;
  display: block;
}

.home-page .testimonialWho {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.home-page .testimonialName {
  display: block;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-15);
  line-height: 1.25;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.home-page .testimonialFeatured .testimonialName {
  color: var(--text-64);
}

.home-page .testimonialRole {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-15);
  line-height: 1.25;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.home-page .testimonialFeatured .testimonialRole {
  color: var(--text-64);
}

.home-page .testimonialStars {
  display: flex;
  gap: 3px;
  margin-top: 4px;
  flex-shrink: 0;
}

.home-page .testimonialStars svg {
  width: 14px;
  height: 14px;
  fill: var(--amber-icon);
}

.home-page .testimonialsDots {
  display: flex;
  justify-content: center;
  gap: 15px; /* 10px dots: centres 25px apart (WCAG 2.5.8) */
}

.home-page .testimonialsDot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: #e2e2e2;
  padding: 0;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.home-page .testimonialsDot:hover {
  transform: scale(1.2);
}

.home-page .testimonialsDotActive {
  background: #EFB000;
  transform: scale(1.25);
}

/* ==========================================================================
   Latest Blogs
   ========================================================================== */

.home-page .blogs {
  background: #FFFFFA;
  padding: 72px 0;
  overflow: hidden;
}

.home-page .blogsRow {
  display: grid;
  grid-template-columns: minmax(260px, 320px) 1fr;
  gap: 48px;
  align-items: start;
}

.home-page .blogsHeading {
  max-width: 340px;
  padding-top: 8px;
}

.home-page .blogsTitle {
  font-size: 42px;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 14px;
}

.home-page .blogsText {
  font-size: 15px;
  font-weight: 500;
  line-height: 1.5;
  color: var(--text);
  margin: 0 0 24px;
  white-space: pre-line;
}

.home-page .blogsHeading .goldButton,
.home-page .blogsHeading .blueButton {
  margin-bottom: 28px;
}

.home-page .blogsArrows {
  display: flex;
  align-items: center;
  gap: 16px;
}

.home-page .blogsArrowDivider {
  width: 1px;
  height: 36px;
  background: rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
}

.home-page .blogsArrow {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid #dcdcdc;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.home-page .blogsArrow:hover {
  background: #ffffff;
  transform: scale(1.08);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.home-page .blogsArrow:active {
  transform: scale(0.96);
}

.home-page .blogsArrow:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.home-page .blogsArrow svg {
  width: 7px;
  height: 12px;
}

.home-page .blogsGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.home-page .blogCard {
  background: #ffffff;
  box-shadow: inset 0 0 0 1px #efe6d0, 0px 4px 16px -4px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.home-page .blogCard:hover {
  transform: translateY(-6px);
  box-shadow: inset 0 0 0 1px var(--gold), 0px 18px 36px -8px rgba(176, 125, 0, 0.28);
}

.home-page .blogImageLink {
  display: block;
  overflow: hidden;
  text-decoration: none;
}

.home-page .blogImage {
  width: 100%;
  height: auto;
  aspect-ratio: 1.9 / 1;
  object-fit: contain;
  display: block;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.home-page .blogCard:hover .blogImage {
  transform: scale(1.04);
}

.home-page .blogBody {
  padding: 20px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.home-page .blogTitle {
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
  margin: 0;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.home-page .blogTitleLink {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

.home-page .blogCard:hover .blogTitleLink {
  color: #b07d00;
}

.home-page .blogExcerpt {
  font-size: 15px;
  font-weight: 500;
  line-height: 1.45;
  color: rgba(0, 0, 0, 0.55);
  margin: 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.home-page .blogCard:hover .learnMore {
  color: #8a6400;
}

.home-page .blogCard:hover .learnMore svg {
  transform: translateX(4px);
}

/* ==========================================================================
   Bottom CTA — Ready to talk? / Want to know more?
   ========================================================================== */

.home-page .cta {
  padding: 88px 0;
  background: #FFFFFA;
}

.home-page .ctaRow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px;
  max-width: 1100px;
  margin: 0 auto;
}

.home-page .ctaCol {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 24px;
  flex: 1;
}

.home-page .ctaTitle {
  font-size: 38px;
  font-weight: 600;
  color: var(--text);
  margin: 0;
  white-space: nowrap;
  text-align: center;
  letter-spacing: -0.01em;
}

.home-page .ctaCol .goldButton,
.home-page .ctaCol .blueButton {
  min-width: 145px;
  justify-content: center;
  text-align: center;
  padding: 13px 30px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 8px;
}

.home-page .ctaDivider {
  width: 2px;
  height: 120px;
  background: rgba(139, 138, 138, 0.4);
  flex-shrink: 0;
}

/* ==========================================================================
   Responsive Styles
   Desktop styles above remain 100% untouched.
   The rules below apply strictly on tablet & mobile screens.
   ========================================================================== */

@media (max-width: 1080px) {
  .home-page .container {
    padding: 0 20px;
  }

  .home-page .workforceGrid {
    grid-template-columns: 1fr;
  }

  .home-page .workforceContent {
    padding-top: 0;
    padding-left: 0;
  }

  .home-page .workforceMedia {
    max-width: 580px;
    margin: 0 auto 50px;
  }

  .home-page .divisionsGrid,
  .home-page .blogsGrid,
  .home-page .reasonsGrid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  .home-page .testimonialsViewport {
    --testimonial-visible: 2;
  }

  .home-page .ctaRow {
    flex-direction: column;
    gap: 36px;
  }

  .home-page .ctaDivider {
    display: none;
  }
}

@media (max-width: 768px) {
  .home-page .container {
    padding: 0 16px;
  }

  .home-page .section,
  .home-page .workforce,
  .home-page .divisions,
  .home-page .reasons,
  .home-page .testimonials,
  .home-page .blogs,
  .home-page .cta {
    padding: 48px 0;
  }

  .home-page .sectionHead {
    margin-bottom: 30px;
  }

  .home-page .sectionTitle {
    font-size: 24px;
    line-height: 1.3;
    margin-bottom: 8px;
  }

  .home-page .sectionSubtitle {
    font-size: 14.5px;
    line-height: 1.5;
  }

  /* Workforce */
  .home-page .workforceContent {
    text-align: center;
  }

  .home-page .workforceTitle {
    font-size: 23px;
    line-height: 1.28;
    margin-bottom: 12px;
    white-space: normal;
  }

  .home-page .workforceText {
    font-size: 14.5px;
    line-height: 1.55;
    margin-bottom: 22px;
    white-space: normal;
  }

  .home-page .workforceFeatures {
    grid-template-columns: 1fr;
    gap: 10px;
    margin-bottom: 24px;
  }

  .home-page .workforceFeatureCard {
    padding: 11px 14px;
    gap: 12px;
  }

  .home-page .workforceFeatureIconWrap {
    width: 40px;
    height: 40px;
  }

  .home-page .workforceFeatureIcon {
    width: 20px;
    height: 20px;
  }

  .home-page .workforceFeatureLabel {
    font-size: 14.5px;
  }

  .home-page .workforceMedia {
    position: relative;
    width: 100%;
    max-width: 480px;
    height: 290px;
    margin: 0 auto 30px;
  }

  .home-page .workforceMediaMainWrap {
    width: 82%;
    border-radius: 10px;
  }

  .home-page .workforceMediaMain {
    height: 190px;
  }

  .home-page .workforceDots {
    top: -14px;
    left: -14px;
    width: 100px;
    height: 100px;
  }

  .home-page .workforceMediaOverlayWrap {
    right: 0;
    bottom: 0;
    top: auto;
    left: auto;
    width: 62%;
    height: 175px;
  }

  .home-page .workforceMediaOverlay {
    border-radius: 8px;
    border-width: 4px;
  }

  .home-page .workforceBadgeWrap {
    left: 0;
    bottom: 8px;
    top: auto;
    width: 112px;
    height: auto;
  }

  .home-page .workforceBadge {
    height: auto;
    padding: 12px 8px;
    border-radius: 8px;
    gap: 4px;
  }

  .home-page .workforceBadgeIcon {
    width: 28px;
    height: 28px;
    font-size: 17px;
    border-radius: 7px;
  }

  .home-page .workforceBadgeNumber {
    font-size: 22px;
  }

  .home-page .workforceBadgeLabel {
    font-size: 11px;
    line-height: 1.2;
  }

  /* Divisions */
  .home-page .divisionsGrid {
    grid-template-columns: 1fr;
    gap: 20px;
    max-width: 480px;
  }

  .home-page .divisionCardFront {
    padding: 20px 18px 24px;
  }

  .home-page .divisionCardBack {
    padding: 24px 18px;
  }

  .home-page .divisionImage {
    height: 180px;
    margin-bottom: 14px;
  }

  .home-page .divisionTitle {
    font-size: 21px;
    margin-bottom: 8px;
  }

  .home-page .divisionText {
    font-size: 14px;
    line-height: 1.5;
  }

  .home-page .divisionHoverTitle {
    font-size: 20px;
    margin-bottom: 8px;
  }

  .home-page .divisionHoverDivider {
    margin-bottom: 12px;
  }

  .home-page .divisionHoverText {
    font-size: 13.5px;
    line-height: 1.55;
  }

  /* Reasons */
  .home-page .reasonsGrid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    max-width: 520px;
  }

  .home-page .reasonCard {
    padding: 26px 12px 18px;
    gap: 12px;
    border-radius: 14px;
  }

  .home-page .reasonNum {
    top: 9px;
    right: 12px;
    font-size: 11px;
  }

  .home-page .reasonIcon {
    width: 46px;
    height: 46px;
    font-size: 23px;
    border-radius: 12px;
  }

  .home-page .reasonIcon::after {
    border-radius: 16px;
  }

  .home-page .reasonLabel {
    font-size: 13.5px;
    line-height: 1.28;
    white-space: normal;
  }

  /* Testimonials — desktop sliding track is swapped for a real
     finger-swipeable native-scroll slider on mobile. */
  .home-page .testimonialsViewport {
    display: none;
  }

  .home-page .testimonialsMobileTrack {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    margin-bottom: 24px;
    padding-bottom: 4px;
  }

  .home-page .testimonialsMobileTrack::-webkit-scrollbar {
    display: none;
  }

  .home-page .testimonialMobileCard {
    flex: 0 0 100%;
    min-width: 0;
    scroll-snap-align: center;
    scroll-snap-stop: always;
  }

  .home-page .testimonialCard {
    min-width: 0;
  }

  .home-page .testimonialBody {
    padding: 20px 18px 16px;
  }

  .home-page .testimonialCompany {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .home-page .testimonialQuote {
    font-size: 14.5px;
    line-height: 1.5;
  }

  .home-page .testimonialFooter {
    padding: 12px 16px;
    height: 78px;
    min-height: 78px;
    max-height: 78px;
  }

  .home-page .testimonialLogoWrap {
    --logo-scale: 0.8;
    width: 70px;
    height: 48px;
    padding: 4px;
  }

  .home-page .testimonialName {
    font-size: 14px;
  }

  .home-page .testimonialRole {
    font-size: 12px;
  }

  .home-page .testimonialsQuoteMark {
    font-size: 100px;
    opacity: 0.12;
  }

  /* Small dots, finger-sized tap area (invisible). */
  .home-page .testimonialsDot,
  .home-page .heroDot {
    position: relative;
  }

  .home-page .testimonialsDot::after,
  .home-page .heroDot::after {
    content: "";
    position: absolute;
    inset: -9px;
  }

  /* Blogs */
  .home-page .blogsRow {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .home-page .blogsHeading {
    max-width: none;
    text-align: center;
  }

  .home-page .blogsTitle {
    font-size: 28px;
    margin-bottom: 8px;
  }

  .home-page .blogsText {
    font-size: 14.5px;
    line-height: 1.5;
    margin-bottom: 16px;
    white-space: normal;
  }

  .home-page .blogsArrows {
    display: none;
  }

  .home-page .blogsGrid {
    grid-template-columns: 1fr;
    gap: 20px;
    max-width: 480px;
    margin: 0 auto;
  }

  .home-page .blogBody {
    padding: 16px 18px 20px;
    gap: 8px;
  }

  .home-page .blogTitle {
    font-size: 17px;
  }

  .home-page .blogExcerpt {
    font-size: 14px;
  }

  /* CTA */
  .home-page .ctaTitle {
    font-size: 24px;
    white-space: normal;
  }

  .home-page .ctaCol .goldButton,
  .home-page .ctaCol .blueButton {
    width: 100%;
    max-width: 260px;
    justify-content: center;
    padding: 13px 24px;
  }
}

@media (max-width: 480px) {

  .home-page .reasonsGrid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .home-page .reasonLabel {
    font-size: 12.5px;
  }

  .home-page .reasonCard {
    padding: 24px 8px 14px;
  }

  .home-page .workforceMedia {
    height: 260px;
  }

  .home-page .workforceMediaMain {
    height: 170px;
  }

  .home-page .workforceMediaOverlayWrap {
    height: 155px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-page,
  .home-page * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
  .home-page .reveal-on-scroll {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
`;

/* --------------------------------------------------------------------
   Page
   -------------------------------------------------------------------- */

// latestBlogs: the newest published posts from the database (see app/page.jsx).
export default function LandingPage({ latestBlogs = [] }) {
  const [heroIndex, setHeroIndex] = useState(0);

  const [activeDivision, setActiveDivision] = useState(null);
  const divisionCardRefs = useRef([]);

  const blogsList = latestBlogs && latestBlogs.length > 0 ? latestBlogs : FALLBACK_BLOGS;
  const visibleBlogs = blogsList.slice(0, 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".home-page .reveal-on-scroll").forEach((el) => {
        el.classList.add("reveal-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    const elements = document.querySelectorAll(".home-page .reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Toggled imperatively (not via className) so re-rendering a division card
  // never overwrites the "reveal-visible" class the observer above added.
  useEffect(() => {
    divisionCardRefs.current.forEach((el, i) => {
      if (el) el.classList.toggle("divisionCardActive", activeDivision === i);
    });
  }, [activeDivision]);

  return (
    <div className={`home-page ${fontVariables}`}>
      {/* Title, description and canonical come from app/layout.js metadata. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(homePageJsonLd)} />
      <style>{PAGE_CSS}</style>

      {/* Hero */}
      <section className="hero">
        {/* The only H1 on the page; slide titles below are rotating taglines. */}
        <h1 className="sr-only">Workforce and Labor Management System - Emsphere Technologies</h1>
        <div className="heroSlides">
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={slide.title}
              className={`heroSlide ${index === heroIndex ? "heroSlideActive" : ""}`}
            >
              <img
                className="heroSlideBg"
                src={slide.image.src}
                alt={slide.title}
                width={slide.image.width}
                height={slide.image.height}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : undefined}
              />
              <div className="heroSlideContent">
                <p className="heroTitle">{slide.title}</p>
                <p className="heroText">{slide.text}</p>
                <a className="goldButton heroCta" href="/contact-us/" data-request-demo>
                  {slide.cta.toUpperCase()}
                  <ArrowRightIcon className="buttonIcon" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="heroStatsWrap">
          <div className="heroDots">
            {HERO_SLIDES.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                aria-label={`Show slide: ${slide.title}`}
                className={`heroDot ${index === heroIndex ? "heroDotActive" : ""}`}
                onClick={() => setHeroIndex(index)}
              />
            ))}
          </div>

          <div className="heroStats">
            {HERO_STATS.map((stat, index) => (
              <Fragment key={stat.label}>
                {index > 0 && <span className="heroStatDivider" aria-hidden="true" />}
                <div className="heroStat">
                  <span className="heroStatValue">
                    <StopwatchCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      delay={index * 90}
                      className="heroStopwatchNumber"
                    />
                  </span>
                  <span className="heroStatLabel">{stat.label}</span>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted by leading organizations */}
      <TrustedLogos id="clients" title="500+ Smiling Customers" subtitle="Join the 2 Million+ Business Users Worldwide." />

      {/* Enhance Workforce and Labor Management */}
      <section className="workforce">
        <div className="container">
          <div className="workforceGrid">
            {/* Each layer reveals on its own (wrapper) so the entrance never
                fights the hover / float transforms on the inner element. */}
            <div className="workforceMedia">
              <span className="workforceDots reveal-on-scroll reveal-zoom-in" aria-hidden="true" />
              <div className="workforceMediaMainWrap reveal-on-scroll reveal-fade-right">
                <img
                  className="workforceMediaMain"
                  src={workforceBuilding.src}
                  alt="Emsphere Technologies corporate office building"
                  width={workforceBuilding.width}
                  height={workforceBuilding.height}
                  loading="lazy"
                />
              </div>
              <div
                className="workforceMediaOverlayWrap reveal-on-scroll reveal-fade-up"
                style={{ transitionDelay: "180ms" }}
              >
                <img
                  className="workforceMediaOverlay"
                  src={workforceEngineers.src}
                  alt="Site engineers reviewing workforce management plans"
                  width={workforceEngineers.width}
                  height={workforceEngineers.height}
                  loading="lazy"
                />
              </div>
              <div
                className="workforceBadgeWrap reveal-on-scroll reveal-zoom-in"
                style={{ transitionDelay: "360ms" }}
              >
                <div className="workforceBadge">
                  <span className="workforceBadgeIcon" aria-hidden="true">
                    <Medal weight="fill" />
                  </span>
                  <span className="workforceBadgeNumber">15+</span>
                  <span className="workforceBadgeLabel">Years of Experience</span>
                </div>
              </div>
            </div>

            <div className="workforceContent">
              <h2 className="workforceTitle reveal-on-scroll reveal-fade-up">
                {"Enhance Workforce and Labor\nManagement with Our Solutions"}
              </h2>
              <p className="workforceText reveal-on-scroll reveal-fade-up" style={{ transitionDelay: "90ms" }}>
                {
                  "Digitalize your HR Processes and Workflow for all environments \nwith our modern HR suites using the latest technology."
                }
              </p>

              <ul className="workforceFeatures">
                {WORKFORCE_FEATURES.map((feature, index) => (
                  <li
                    className="workforceFeatureItem reveal-on-scroll reveal-fade-up"
                    style={{ transitionDelay: `${160 + index * 70}ms` }}
                    key={feature.label}
                  >
                    <div className="workforceFeatureCard">
                      <span className="workforceFeatureIconWrap">
                        <feature.icon className="workforceFeatureIcon" weight="fill" aria-hidden="true" />
                      </span>
                      <span className="workforceFeatureLabel">{feature.label}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="reveal-on-scroll reveal-fade-up" style={{ transitionDelay: "520ms" }}>
                <a className="goldButton" href="/contract-labour-management-system-software/">
                  LEARN MORE<span className="sr-only"> about our contract labour management system</span>
                  <ArrowRightIcon className="buttonIcon" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop floor / Corporate team */}
      <section className="divisions">
        <div className="container">
          <div className="sectionHead reveal-on-scroll reveal-fade-up">
            <h2 className="sectionTitle">Serving the HR and Industrial Relations</h2>
            <p className="sectionSubtitle">
              Get a 360-degree view of both your corporate as well as shop floor workforce with
              our path breaking HR Systems and solutions.
            </p>
          </div>
          <div className="divisionsGrid">
            {DIVISIONS.map((division, index) => (
              <article
                className="divisionCard reveal-on-scroll reveal-fade-up"
                style={{ transitionDelay: `${index * 150}ms` }}
                key={division.title}
                ref={(el) => {
                  divisionCardRefs.current[index] = el;
                }}
                onClick={() =>
                  setActiveDivision((prev) => (prev === index ? null : index))
                }
                tabIndex={0}
                role="region"
                aria-label={division.title}
              >
                <div className="divisionCardInner">
                  <div className="divisionCardFront">
                    <img
                      className="divisionImage"
                      src={division.image.src}
                      alt={division.title}
                      width={division.image.width}
                      height={division.image.height}
                      loading="lazy"
                    />
                    <h3 className="divisionTitle">{division.title}</h3>
                    <p className="divisionText">{division.text}</p>
                  </div>

                  <div className="divisionCardBack" aria-hidden="true">
                    <p className="divisionHoverTitle">{division.title}</p>
                    <span className="divisionHoverDivider" />
                    <p className="divisionHoverText">{division.hoverText}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Our Flagship Products */}
      <FlagshipProducts id="home-products-heading" />

      {/* Change from legacy system */}
      <section className="reasons">
        <div className="container">
          <div className="sectionHead reveal-on-scroll reveal-fade-up">
            <h2 className="sectionTitle">Change From legacy system</h2>
            <p className="sectionSubtitle">Reasons why enterprises change to emSphere.</p>
          </div>
          <ul className="reasonsGrid">
            {REASONS.map((reason, index) => (
              <li
                className="reasonItem reveal-on-scroll reveal-fade-up"
                style={{ transitionDelay: `${index * 70}ms` }}
                key={reason.label}
              >
                <div className="reasonCard">
                  <span className="reasonNum" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="reasonIcon" aria-hidden="true">
                    <reason.icon weight="fill" />
                  </span>
                  <span className="reasonLabel">{reason.label}</span>
                  <span className="reasonBar" aria-hidden="true" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What Our Clients Say */}
      <section className="testimonials" id="testimonials">
        <span className="testimonialsQuoteMark testimonialsQuoteLeft" aria-hidden="true">
          &ldquo;
        </span>
        <span className="testimonialsQuoteMark testimonialsQuoteRight" aria-hidden="true">
          &rdquo;
        </span>
        <div className="container">
          <div className="sectionHead reveal-on-scroll reveal-fade-up">
            <h2 className="sectionTitle">What Our Clients Say</h2>
            <p className="sectionSubtitle">
              We enjoyed each implementation and are fully vested in our relations forever.
            </p>
          </div>

          <TestimonialsSlider testimonials={TESTIMONIALS} />
        </div>
      </section>

      {/* Latest Blogs */}
      <section className="blogs">
        <div className="container">
          <div className="blogsRow">
            <div className="blogsHeading reveal-on-scroll reveal-fade-up">
              <h2 className="blogsTitle">Latest Blogs</h2>
              <p className="blogsText">
                {
                  "HR Teams learn the latest in the \nHRTech world through our blogs!"
                }
              </p>
              <a className="goldButton" href="/blog/">
                DISCOVER MORE
                <ArrowRightIcon className="buttonIcon" />
              </a>
            </div>

            <div className="blogsGrid">
              {visibleBlogs.map((post, index) => {
                const postHref = post.slug ? `/blog/${post.slug}/` : "/blog/";
                const imageSrc = post.featuredImage?.src || blogContractLabour.src;
                const imageAlt = post.featuredImage?.alt || post.title;
                const imageWidth = post.featuredImage?.width || 600;
                const imageHeight = post.featuredImage?.height || 400;

                return (
                  <article
                    className="blogCard reveal-on-scroll reveal-fade-up"
                    style={{ transitionDelay: `${index * 120}ms` }}
                    key={post.slug || post.title || index}
                  >
                    <a href={postHref} className="blogImageLink" aria-label={post.title}>
                      <img
                        className="blogImage"
                        src={imageSrc}
                        alt={imageAlt}
                        width={imageWidth}
                        height={imageHeight}
                        loading="lazy"
                      />
                    </a>
                    <div className="blogBody">
                      <h3 className="blogTitle">
                        <a href={postHref} className="blogTitleLink">
                          {post.title}
                        </a>
                      </h3>
                      <p className="blogExcerpt">{post.excerpt}</p>
                      <a href={postHref} className="learnMore">
                        Learn More<span className="sr-only">: {post.title}</span>
                        <ArrowRightIcon />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Ready to talk? / Want to know more? */}
      <section className="cta">
        <div className="container">
          <div className="ctaRow">
            <div className="ctaCol reveal-on-scroll reveal-fade-right">
              <h2 className="ctaTitle">Ready to talk?</h2>
              <a className="goldButton" href="/contact-us/" data-request-demo>
                Talk to Sale
              </a>
            </div>
            <span className="ctaDivider" />
            <div className="ctaCol reveal-on-scroll reveal-fade-left">
              <h2 className="ctaTitle">Want to know more?</h2>
              <a className="goldButton" href="/contact-us/" data-request-demo>
                Book Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* No <main> on this page, so point the button at the hero directly. */}
      <BackToTop trigger=".home-page > .hero" />
    </div>
  );
}
