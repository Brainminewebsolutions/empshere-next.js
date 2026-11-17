"use client";

import { useEffect, useRef, useState, Fragment } from "react";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import TrustedLogos from "@/components/TrustedLogos";
import { TESTIMONIALS } from "@/lib/testimonials";
import Image from "next/image";
import Link from "next/link";
import BackToTop from "@/components/BackToTop";
import StopwatchCounter from "@/components/StopwatchCounter";
import { Instrument_Sans, Inter } from "next/font/google";

// Self-hosted by next/font (no request to Google Fonts at runtime).
const instrumentSans = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument-sans" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fontVariables = `${instrumentSans.variable} ${inter.variable}`;

import {
  CheckCircle,
  Cpu,
  Factory,
  Fingerprint,
  Flag,
  Lightbulb,
  LinkedinLogo,
  Plant,
  RocketLaunch,
  SealCheck,
  ShieldCheck,
  Sparkle,
  Target,
  TrendUp,
  UsersThree,
} from "@phosphor-icons/react/ssr";

/* --------------------------------------------------------------------
   Images — Frame illustrations from live emSphere About Us page
   -------------------------------------------------------------------- */
import frame1 from "../images/aboutimages/frame-1-determined-to-solve.png";

/* --------------------------------------------------------------------
   Leadership Images
   -------------------------------------------------------------------- */
import leaderYogesh from "../images/aboutimages/leader-yogesh-ingale.webp";
import leaderRohit from "../images/aboutimages/leader-rohit-gupta.webp";

/* --------------------------------------------------------------------
   Content data — accurate 1-to-1 from https://www.emsphere.com/about-us/
   -------------------------------------------------------------------- */

const HERO_STATS = [
  { value: "500", suffix: "+", label: "Happy Clients" },
  { value: "15", suffix: "+", label: "Years of Experience" },
  { value: "20,00,000", suffix: "+", label: "Satisfied Users" },
  { value: "10", suffix: "+", label: "Industries" },
];

/* --------------------------------------------------------------------
   HONO-inspired Strategic Pillars: Purpose, Vision & Philosophy
   -------------------------------------------------------------------- */
const STRATEGIC_PILLARS = [
  {
    tag: "Our Purpose",
    title: "Born on the Shop Floor",
    description:
      "Great companies start with a determination to solve. We exist to eradicate manual gate registers, chaotic spreadsheet compliance audits, and fragmented HR silos across India’s industrial manufacturing backbone.",
    icon: RocketLaunch,
  },
  {
    tag: "Our Vision",
    title: "Unified Workforce Dignity",
    description:
      "To be India’s premier 360° employee & contract workforce platform, delivering effortless compliance, operational transparency, and enterprise agility to over 10 million frontline and corporate workers.",
    icon: Target,
  },
  {
    tag: "Our Philosophy",
    title: "Envisioned on User Feedback",
    description:
      "We listen before we build. Every workflow, biometric gate trigger, overtime formula, and contractor billing algorithm stems directly from real challenges faced daily by HR heads and plant directors.",
    icon: Lightbulb,
  },
];

/* --------------------------------------------------------------------
   We reached out, We asked And here is what we heard.
   -------------------------------------------------------------------- */
const WHAT_WE_HEARD = [
  { who: "CXO’s", want: "CXO’s want clear dashboards", answer: "…to see the devil early", icon: TrendUp },
  { who: "Department Heads", want: "Department Heads want detailed reports with analytics", answer: "…as real devil is always in the details", icon: Target },
  { who: "Team Managers", want: "Team Managers want a system that truly automates", answer: "…let them not fight the devil bare knuckles", icon: Cpu },
  { who: "HR", want: "HR wants a system with seamless connectivity", answer: "… different departments in sync make a cohesive team!", icon: UsersThree },
  { who: "Everyone", want: "Everyone wants freedom from legacy systems and excel sheets", answer: "change from legacy, embrace the modern with HR Tech re-imagined!", icon: RocketLaunch },
];

/* --------------------------------------------------------------------
   HONO-inspired Core Values
   -------------------------------------------------------------------- */
const CORE_VALUES = [
  {
    title: "Customer Empathy",
    desc: "Our story is from your story. We spend time on actual plant shop floors listening to real operational bottlenecks.",
    icon: UsersThree,
  },
  {
    title: "Single Point of Ownership",
    desc: "From facial biometric devices and turnstiles to software algorithms and contractor billing, we own the full stack.",
    icon: ShieldCheck,
  },
  {
    title: "Zero Compliance Compromise",
    desc: "Automated gate-level compliance blocking ensures that non-compliant workers never enter, keeping audits 100% spotless.",
    icon: SealCheck,
  },
  {
    title: "Enterprise Scale & Reliability",
    desc: "Engineered to effortlessly process 40,000+ workers across 28+ plant locations in high-concurrency environments.",
    icon: Cpu,
  },
];

/* --------------------------------------------------------------------
   HONO-inspired Inception & Milestones Timeline (2015 - 2026)
   -------------------------------------------------------------------- */
const INCEPTION_MILESTONES = [
  {
    year: "2015",
    icon: Flag,
    title: "Inception in Pune",
    subtitle: "The Foundation of emSphere",
    description:
      "Established in Pune, Maharashtra. Born out of direct ground-level observations of the massive gap between manufacturing plant registers, contract labour management regulations, and legacy ERP systems.",
    highlight: "Incorporated with a mission to digitalize industrial workforces",
  },
  {
    year: "2017",
    icon: Fingerprint,
    title: "Hardware-Native Access",
    subtitle: "Turnstile & Biometric Integration",
    description:
      "Pioneered direct firmware integration with facial biometric terminals and tripod turnstiles, establishing real-time statutory compliance blocking at physical factory access points.",
    highlight: "Zero-latency shop-floor access control",
  },
  {
    year: "2019",
    icon: Factory,
    title: "Multi-Plant Expansion",
    subtitle: "Industrial Manufacturing Scale",
    description:
      "Scaled deployments across 50+ major industrial plants for manufacturing titans including Varroc Excellence (28+ plants) and Yazaki (7 plants, 12,000+ workers).",
    highlight: "End-to-end CLMS & biometric rollouts nationwide",
  },
  {
    year: "2021",
    icon: ShieldCheck,
    title: "ISO 27001 & Cloud Suite",
    subtitle: "Gold Standard Security & Cloud Scaling",
    description:
      "Achieved ISO/IEC 27001:2022 certification. Launched the high-availability multi-tenant cloud edition while preserving robust on-premise industrial gateways for remote manufacturing hubs.",
    highlight: "Bank-grade data security & high uptime SLA",
  },
  {
    year: "2023",
    icon: UsersThree,
    title: "40,000+ Workforce Scale",
    subtitle: "Enterprise Governance with Mahindra & Nerolac",
    description:
      "Selected by Mahindra & Mahindra (Auto & Farm Sector) to govern 40,000+ contract labourers across multiple locations. Streamlined Yashaswi’s 65,000+ employees across 500+ client sites.",
    highlight: "Massive scale industrial compliance governance",
  },
  {
    year: "2025–2026",
    icon: Sparkle,
    title: "AI-Native Workforce Suite",
    subtitle: "Surpassing 2,000,000+ Satisfied Users",
    description:
      "Introduced predictive headcount planning, AI anomaly detection, smart mobile self-service apps, and the unified emPay payroll engine, powering over 2 million daily workforce interactions.",
    highlight: "Next-gen intelligent workforce management platform",
  },
];

/* --------------------------------------------------------------------
   Leadership Team
   -------------------------------------------------------------------- */
const LEADERSHIP_TEAM = [
  {
    name: "Yogesh Ingale",
    role: "Founder & Director / CEO",
    image: leaderYogesh,
    bio: "Visionary entrepreneur with over 18 years of specialized expertise in enterprise HR technology, industrial automation, and shop-floor digitalization. Under his leadership, emSphere has evolved into a trusted workforce backbone for India’s largest conglomerates.",
    expertise: ["Enterprise HRMS & CLMS", "Industrial Automation", "Product Vision"],
    linkedin: "https://www.linkedin.com/company/emspheretechnologies",
  },
  {
    name: "Rohit Gupta",
    role: "Director & Co-Founder / Commercial Head",
    image: leaderRohit,
    bio: "Drives enterprise client partnerships, corporate strategy, and nationwide commercial expansion. With extensive market insight across automotive, manufacturing, and heavy engineering, he ensures client success at every stage of deployment.",
    expertise: ["Strategic Partnerships", "Pan-India Expansion", "Commercial Governance"],
    linkedin: "https://www.linkedin.com/company/emspheretechnologies",
  },
  {
    name: "Rucha Joshi",
    role: "Co-Founder & Technology Advisor",
    image: null,
    bio: "Spearheads emSphere’s technological architecture, deep-tech IoT biometric firmware integrations, and enterprise cloud scalability. Champions high-concurrency systems, rigorous data security, and next-generation AI workforce intelligence.",
    expertise: ["Cloud Enterprise Architecture", "IoT Biometrics", "AI Analytics"],
    linkedin: "https://www.linkedin.com/company/emspheretechnologies",
  },
];

/* --------------------------------------------------------------------
   Inline SVG icons
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
   Scoped Page CSS matching app/page.jsx design language with softened shadows
   -------------------------------------------------------------------- */
const ABOUT_PAGE_CSS = `
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

.about-page {
  animation: pageEntranceFade 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  will-change: opacity, transform;
  --gold: #EFB000;
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
  background-color: #FFFFFA;
}

/* Scroll-triggered reveal animations */
.about-page .reveal-on-scroll {
  will-change: opacity, transform;
}

.about-page .reveal-fade-up {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.about-page .reveal-fade-down {
  opacity: 0;
  transform: translateY(-24px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.about-page .reveal-fade-left {
  opacity: 0;
  transform: translateX(36px);
  transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
}

.about-page .reveal-fade-right {
  opacity: 0;
  transform: translateX(-36px);
  transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
}

.about-page .reveal-zoom-in {
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
}

.about-page .reveal-on-scroll.reveal-visible {
  opacity: 1;
  transform: none;
}

.about-page img {
  max-width: 100%;
  display: block;
}

.about-page .container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
}

.about-page .section {
  padding: 80px 0;
}

.about-page .sectionHead {
  text-align: center;
  max-width: 820px;
  margin: 0 auto 48px;
}

.about-page .sectionTitle {
  font-size: 36px;
  font-weight: 700;
  line-height: 1.25;
  color: #111827;
  margin: 0 0 14px;
  letter-spacing: -0.015em;
}

.about-page .sectionSubtitle {
  font-size: 17px;
  line-height: 1.6;
  color: var(--text-64);
  margin: 0;
}

/* Button styles */
.about-page .goldButton,
.about-page .secondaryButton {
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

.about-page .goldButton {
  background: var(--gold);
}

.about-page .goldButton:hover {
  background: var(--gold-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px -4px rgba(239, 176, 0, 0.4);
}

.about-page .secondaryButton {
  background: #ffffff;
  color: var(--gold);
  border: 1.5px solid var(--gold);
}

.about-page .secondaryButton:hover {
  background: #fffdf5;
  border-color: var(--gold-dark);
  color: var(--gold-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 14px -4px rgba(239, 176, 0, 0.25);
}

.about-page .buttonIcon {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.about-page .goldButton:hover .buttonIcon,
.about-page .secondaryButton:hover .buttonIcon {
  transform: translateX(3px);
}

.about-page .pillBadge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(239, 176, 0, 0.12);
  border: 1px solid rgba(239, 176, 0, 0.35);
  color: #9c6c00;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.about-page .pillBadgeDot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--gold);
}

/* ==========================================================================
   Hero Section
   ========================================================================== */
.about-page .aboutHero {
  padding: 72px 0 64px;
  background: #FFFFFA;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid #f0f0dc;
}

.about-page .aboutHeroGrid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 56px;
  align-items: center;
}

.about-page .heroSubtitleTag {
  font-size: 17px;
  font-weight: 600;
  color: var(--gold);
  margin: 0 0 10px;
  display: block;
}

.about-page .heroTitle {
  font-size: 42px;
  font-weight: 700;
  line-height: 1.22;
  color: #111827;
  margin: 0 0 24px;
  letter-spacing: -0.015em;
}

.about-page .manifestoCard {
  background: linear-gradient(135deg, rgba(255, 252, 244, 0.95) 0%, #ffffff 100%);
  border: 1px solid rgba(239, 176, 0, 0.35);
  box-shadow: 0 6px 18px -4px rgba(239, 176, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 1);
  border-radius: 14px;
  padding: 24px 28px;
  margin-bottom: 30px;
  position: relative;
}

.about-page .manifestoCard::before {
  content: "";
  position: absolute;
  left: 0;
  top: 14px;
  bottom: 14px;
  width: 4px;
  background: var(--gold);
  border-radius: 2px;
}

.about-page .manifestoText {
  font-size: 18px;
  font-weight: 500;
  line-height: 1.6;
  color: #2b2b2b;
  margin: 0;
}

.about-page .manifestoText strong {
  color: #0b192c;
  font-weight: 700;
}

.about-page .manifestoText span.highlight {
  color: #b37e00;
  font-weight: 700;
}

.about-page .heroActions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.about-page .heroMediaCard {
  position: relative;
  background: #ffffff;
  border-radius: 18px;
  padding: 28px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 8px 24px -6px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.about-page .heroMediaImg {
  width: 100%;
  max-width: 420px;
  height: auto;
  object-fit: contain;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.about-page .heroMediaCard:hover .heroMediaImg {
  transform: scale(1.03);
}

.about-page .heroMediaBadge {
  position: absolute;
  bottom: -14px;
  background: var(--gold);
  color: #ffffff;
  font-family: var(--font-label);
  font-size: 13px;
  font-weight: 600;
  padding: 6px 18px;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(239, 176, 0, 0.35);
  display: flex;
  align-items: center;
  gap: 6px;
}

/* ==========================================================================
   Stats Bar (Stopwatch Counters)
   ========================================================================== */
.about-page .statsWrap {
  margin-top: 48px;
}

.about-page .statsBar {
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(239, 176, 0, 0.25);
  border-radius: 14px;
  box-shadow:
    0 8px 24px -8px rgba(239, 176, 0, 0.12),
    0 4px 12px -4px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 24px 28px;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
  overflow: hidden;
  position: relative;
}

.about-page .statsBar::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gold);
}

.about-page .statsBar:hover {
  transform: translateY(-3px);
  box-shadow:
    0 12px 30px -8px rgba(239, 176, 0, 0.18),
    0 6px 16px -4px rgba(0, 0, 0, 0.05);
}

.about-page .statDivider {
  width: 1px;
  height: 38px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.02) 100%);
  flex-shrink: 0;
}

.about-page .statItem {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4px 6px;
  min-width: 0;
}

.about-page .statValue {
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

.about-page .statLabel {
  display: block;
  font-family: var(--font-label);
  font-weight: 600;
  font-size: 13.5px;
  color: rgba(15, 23, 42, 0.65);
  line-height: 1.3;
  white-space: nowrap;
}

/* ==========================================================================
   HONO-inspired Section: Purpose, Vision & Philosophy
   ========================================================================== */
.about-page .pillarsSection {
  padding: 80px 0;
  background: #ffffff;
  border-bottom: 1px solid #f0f0dc;
}

.about-page .pillarsGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.about-page .pillarCard {
  background: #FFFFFA;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-top: 3px solid #EFB000;
  border-radius: 14px;
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 16px -4px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
}

.about-page .pillarCard:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 28px -6px rgba(0, 0, 0, 0.1);
  border-color: rgba(239, 176, 0, 0.4);
  border-top-color: #EFB000;
}

.about-page .pillarIconWrap {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background: rgba(239, 176, 0, 0.12);
  color: #a87600;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  margin-bottom: 20px;
}

.about-page .pillarTag {
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #a87600;
  margin-bottom: 8px;
}

.about-page .pillarTitle {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 12px;
  line-height: 1.3;
}

.about-page .pillarDesc {
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-64);
  margin: 0;
}

/* ==========================================================================
   HONO-inspired Inception & Milestones Timeline (2015-2026)
   ========================================================================== */
.about-page .inceptionSection {
  padding: 96px 0 104px;
  background:
    radial-gradient(circle at 12% 18%, rgba(239, 176, 0, 0.08) 0, transparent 38%),
    radial-gradient(circle at 88% 82%, rgba(239, 176, 0, 0.08) 0, transparent 40%),
    linear-gradient(180deg, #FFFFFA 0%, #FFF9E6 50%, #FFFFFA 100%);
  border-bottom: 1px solid #f0f0dc;
  position: relative;
  overflow: hidden;
}

/* Milestone tree: a gold trunk down the middle, a node per year, and the
   milestone cards branching off alternately to the left and right. */
.about-page .milestoneTree {
  --node-size: 58px;
  --branch-gap: 44px;
  position: relative;
  max-width: 1120px;
  margin: 56px auto 0;
  padding: 0;
  list-style: none;
}

.about-page .milestoneTrunk {
  position: absolute;
  top: 28px;
  bottom: 28px;
  left: 50%;
  width: 4px;
  margin-left: -2px;
  border-radius: 4px;
  background: rgba(239, 176, 0, 0.16);
  overflow: hidden;
}

.about-page .milestoneTrunkFill {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, #ffd34d 0%, #EFB000 55%, #d69e00 100%);
  transform: scaleY(0);
  transform-origin: top center;
  transition: transform 2.2s cubic-bezier(0.65, 0, 0.35, 1);
}

.about-page .milestoneTrunk.reveal-visible .milestoneTrunkFill {
  transform: scaleY(1);
}

.about-page .milestoneRoot,
.about-page .milestoneTip {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
}

.about-page .milestoneRoot {
  margin-bottom: 36px;
}

.about-page .milestoneTip {
  margin-top: 8px;
}

.about-page .milestoneCap {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 18px;
  border-radius: 999px;
  background: #EFB000;
  color: #ffffff;
  font-family: var(--font-label);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  box-shadow: 0 10px 24px -10px rgba(214, 158, 0, 0.7);
}

.about-page .milestoneTip .milestoneCap {
  background: #ffffff;
  color: #9c6c00;
  border: 1.5px solid rgba(239, 176, 0, 0.55);
  box-shadow: 0 8px 20px -12px rgba(214, 158, 0, 0.6);
}

.about-page .milestoneCap svg {
  font-size: 16px;
}

.about-page .milestoneBranch {
  position: relative;
  display: grid;
  grid-template-columns: 1fr calc(var(--node-size) + var(--branch-gap) * 2) 1fr;
  align-items: center;
  margin-bottom: 30px;
}

.about-page .milestoneBranch:last-of-type {
  margin-bottom: 36px;
}

.about-page .milestoneNode {
  grid-column: 2;
  grid-row: 1;
  justify-self: center;
  position: relative;
  z-index: 1;
  width: var(--node-size);
  height: var(--node-size);
  border-radius: 50%;
  background: #ffffff;
  border: 3px solid #EFB000;
  color: #d69e00;
  display: grid;
  place-items: center;
  font-size: 24px;
  box-shadow: 0 0 0 6px #FFF6D9, 0 10px 22px -8px rgba(214, 158, 0, 0.55);
  transition: background 0.35s ease, color 0.35s ease, transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Soft pulsing ring around each node. */
.about-page .milestoneNode::after {
  content: "";
  position: absolute;
  inset: -9px;
  border-radius: 50%;
  border: 2px solid rgba(239, 176, 0, 0.45);
  opacity: 0;
  animation: milestonePulse 2.8s ease-out infinite;
}

.about-page .milestoneBranch:nth-of-type(even) .milestoneNode::after {
  animation-delay: 1.4s;
}

@keyframes milestonePulse {
  0% {
    transform: scale(0.85);
    opacity: 0.9;
  }
  100% {
    transform: scale(1.45);
    opacity: 0;
  }
}

.about-page .milestoneCard {
  grid-row: 1;
  position: relative;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid rgba(239, 176, 0, 0.22);
  padding: 26px 26px 24px;
  box-shadow: 0 6px 22px -10px rgba(122, 92, 0, 0.18);
  display: flex;
  flex-direction: column;
  transition:
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.3s ease,
    opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1);
}

.about-page .milestoneBranchLeft .milestoneCard {
  grid-column: 1;
}

.about-page .milestoneBranchRight .milestoneCard {
  grid-column: 3;
}

/* Branch connector from the card to the trunk node. */
.about-page .milestoneCard::before {
  content: "";
  position: absolute;
  top: 50%;
  width: var(--branch-gap);
  height: 2px;
  margin-top: -1px;
  background: repeating-linear-gradient(90deg, #EFB000 0 6px, transparent 6px 11px);
}

.about-page .milestoneBranchLeft .milestoneCard::before {
  left: 100%;
}

.about-page .milestoneBranchRight .milestoneCard::before {
  right: 100%;
}

/* Gold accent bar that sweeps in along the top on hover. */
.about-page .milestoneCard::after {
  content: "";
  position: absolute;
  top: -1px;
  left: 18px;
  right: 18px;
  height: 3px;
  border-radius: 0 0 3px 3px;
  background: linear-gradient(90deg, #ffd34d, #EFB000);
  transform: scaleX(0.18);
  transform-origin: left center;
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}

.about-page .milestoneBranch:hover .milestoneCard {
  transform: translateY(-6px);
  border-color: rgba(239, 176, 0, 0.6);
  box-shadow: 0 22px 44px -18px rgba(122, 92, 0, 0.32);
}

.about-page .milestoneBranch:hover .milestoneCard::after {
  transform: scaleX(1);
}

.about-page .milestoneBranch:hover .milestoneNode {
  background: #EFB000;
  color: #ffffff;
  transform: scale(1.1) rotate(-6deg);
}

.about-page .milestoneHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.about-page .milestoneYear {
  font-family: var(--font-heading);
  font-size: 28px;
  font-weight: 800;
  color: #d69e00;
  line-height: 1;
  letter-spacing: -0.01em;
}

.about-page .milestoneBadge {
  background: #FFF4CC;
  color: #8f6200;
  font-family: var(--font-label);
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 999px;
  white-space: nowrap;
}

.about-page .milestoneTitle {
  font-size: 19px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px;
  line-height: 1.3;
}

.about-page .milestoneSubtitle {
  font-family: var(--font-label);
  font-size: 13.5px;
  font-weight: 600;
  color: #9c6c00;
  margin: 0 0 12px;
}

.about-page .milestoneDesc {
  font-size: 14.5px;
  line-height: 1.65;
  color: var(--text-64);
  margin: 0 0 16px;
}

.about-page .milestoneHighlight {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  background: #FFF9E6;
  border: 1px solid rgba(239, 176, 0, 0.25);
  padding: 10px 12px;
  border-radius: 10px;
  font-family: var(--font-label);
  font-size: 13px;
  font-weight: 600;
  line-height: 1.45;
  color: #7a5400;
}

.about-page .milestoneHighlight svg {
  flex-shrink: 0;
  margin-top: 1px;
  font-size: 16px;
  color: #EFB000;
}

/* Tablets and phones: trunk moves to the left edge, every card branches
   to the right of it. */
@media (max-width: 860px) {
  .about-page .milestoneTree {
    --node-size: 46px;
    --branch-gap: 18px;
  }

  .about-page .milestoneTrunk {
    left: calc(var(--node-size) / 2);
  }

  .about-page .milestoneRoot,
  .about-page .milestoneTip {
    justify-content: flex-start;
  }

  .about-page .milestoneBranch {
    grid-template-columns: calc(var(--node-size) + var(--branch-gap)) 1fr;
    align-items: start;
    margin-bottom: 22px;
  }

  .about-page .milestoneNode {
    grid-column: 1;
    justify-self: start;
    margin-top: 22px;
    font-size: 20px;
    box-shadow: 0 0 0 5px #FFF6D9, 0 8px 18px -8px rgba(214, 158, 0, 0.55);
  }

  .about-page .milestoneBranchLeft .milestoneCard,
  .about-page .milestoneBranchRight .milestoneCard {
    grid-column: 2;
  }

  .about-page .milestoneBranchLeft .milestoneCard::before,
  .about-page .milestoneBranchRight .milestoneCard::before {
    left: auto;
    right: 100%;
    top: calc(22px + var(--node-size) / 2);
  }

  /* Phones get the slide-up reveal instead of the sideways one. */
  .about-page .milestoneCard.reveal-fade-left,
  .about-page .milestoneCard.reveal-fade-right {
    transform: translateY(28px);
  }

  .about-page .milestoneCard.reveal-visible {
    transform: none;
  }
}

@media (max-width: 480px) {
  .about-page .milestoneCard {
    padding: 20px 18px 18px;
  }

  .about-page .milestoneYear {
    font-size: 24px;
  }

  .about-page .milestoneTitle {
    font-size: 17px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-page .milestoneTrunkFill {
    transform: none;
    transition: none;
  }

  .about-page .milestoneNode::after {
    animation: none;
  }
}

/* ==========================================================================
   Meet Leadership Section
   ========================================================================== */
.about-page .leadershipSection {
  padding: 92px 0;
  background: #ffffff;
  border-bottom: 1px solid #f0f0dc;
}

.about-page .leadershipGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.about-page .leaderCard {
  background: #FFFFFA;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-top: 3.5px solid #EFB000;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 18px -4px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease;
}

.about-page .leaderCard:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 32px -8px rgba(0, 0, 0, 0.12);
  border-color: rgba(239, 176, 0, 0.4);
  border-top-color: #EFB000;
}

.about-page .leaderPhotoWrap {
  width: 100%;
  height: 290px;
  background: linear-gradient(180deg, #f7f7f0 0%, #ebebe0 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.about-page .leaderPhoto {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}

.about-page .leaderCard:hover .leaderPhoto {
  transform: scale(1.04);
}

.about-page .leaderInitials {
  width: 132px;
  height: 132px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #ffd34d 0%, #EFB000 100%);
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: 46px;
  font-weight: 700;
  letter-spacing: 0.02em;
  box-shadow: 0 0 0 10px rgba(255, 255, 255, 0.7), 0 18px 36px -14px rgba(214, 158, 0, 0.6);
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}

.about-page .leaderCard:hover .leaderInitials {
  transform: scale(1.06);
}

.about-page .leaderInfo {
  padding: 24px 24px 28px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.about-page .leaderHeader {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 6px;
}

.about-page .leaderName {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin: 0;
  line-height: 1.25;
}

.about-page .leaderLinkedIn {
  color: #0a66c2;
  font-size: 22px;
  transition: transform 0.2s ease, color 0.2s ease;
  display: inline-flex;
}

.about-page .leaderLinkedIn:hover {
  transform: scale(1.15);
  color: #004182;
}

.about-page .leaderRole {
  font-size: 14px;
  font-weight: 600;
  color: #b37e00;
  margin: 0 0 14px;
}

.about-page .leaderBio {
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--text-64);
  margin: 0 0 18px;
  flex: 1;
}

.about-page .leaderExpertiseTags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.about-page .expertiseTag {
  background: #f4f4ec;
  color: #4b5563;
  font-size: 11.5px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 12px;
}

/* ==========================================================================
   Testimonials
   ========================================================================== */
.about-page .testimonials {
  background: #ffffff;
  padding: 88px 0;
  position: relative;
  overflow: hidden;
}

.about-page .testimonialsQuoteMark {
  position: absolute;
  font-family: Georgia, "Times New Roman", serif;
  font-weight: 700;
  font-size: 190px;
  line-height: 1;
  color: rgba(0, 0, 0, 0.04);
  pointer-events: none;
  user-select: none;
  z-index: 0;
}

.about-page .testimonialsQuoteLeft {
  left: 12px;
  top: 24px;
}

.about-page .testimonialsQuoteRight {
  right: 12px;
  bottom: 8px;
  transform: rotate(180deg);
}

.about-page .testimonialsViewport {
  --testimonial-visible: 3;
  overflow: hidden;
  max-width: 1240px;
  margin: 0 auto 32px;
}

.about-page .testimonialsMobileTrack {
  display: none;
}

.about-page .testimonialsTrack {
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
.about-page .testimonialsTrackInstant,
.about-page .testimonialsTrackInstant .testimonialCard,
.about-page .testimonialsTrackInstant .testimonialCard * {
  transition: none !important;
}

/* Highlight hand-off between cards fades instead of snapping. */
.about-page .testimonialCard .testimonialCompany,
.about-page .testimonialCard .testimonialQuote,
.about-page .testimonialCard .testimonialName,
.about-page .testimonialCard .testimonialRole,
.about-page .testimonialCard .testimonialReadMore {
  transition: color 0.6s ease;
}

@media (prefers-reduced-motion: reduce) {
  .about-page .testimonialsTrack {
    transition: none;
  }
}

.about-page .testimonialCard {
  flex: 0 0 var(--testimonial-item);
  min-width: 0;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 16px -4px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.6s ease, background-color 0.6s ease, border-color 0.6s ease, outline-color 0.6s ease;
}

.about-page .testimonialCard:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px -6px rgba(0, 0, 0, 0.1);
}

.about-page .testimonialFeatured {
  background: #ffffff;
  border: 1.5px solid #EFB000;
  box-shadow: 0 6px 20px -4px rgba(239, 176, 0, 0.15);
}

.about-page .testimonialBody {
  padding: 28px 28px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.about-page .testimonialCompany {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 14px;
}

.about-page .testimonialQuote {
  font-size: 15px;
  font-weight: 450;
  line-height: 1.5;
  color: var(--text-64);
  margin: 0 0 12px;
  white-space: pre-line;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  flex: 1;
}

.about-page .testimonialQuoteExpanded {
  -webkit-line-clamp: unset;
  overflow: visible;
}

.about-page .testimonialReadMore {
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  font-size: 15px;
  font-weight: 700;
  color: #8a6100;
  align-self: flex-start;
  margin-top: auto;
  transition: color 0.2s ease, transform 0.2s ease;
}

.about-page .testimonialReadMore:hover {
  transform: translateX(2px);
  color: #6b4b00;
}

.about-page .testimonialFooter {
  background: #fdfdf9;
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

.about-page .testimonialLogoWrap {
  --logo-scale: 1;
  width: 84px;
  height: 56px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  flex-shrink: 0;
  box-sizing: border-box;
}

.about-page .testimonialLogo {
  width: calc(var(--w) * var(--logo-scale));
  height: calc(var(--h) * var(--logo-scale));
  max-width: none;
  object-fit: contain;
}

.about-page .testimonialWho {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.about-page .testimonialName {
  display: block;
  font-size: 15px;
  font-weight: 700;
  color: #111827;
  line-height: 1.25;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.about-page .testimonialRole {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-64);
  line-height: 1.25;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.about-page .testimonialStars {
  display: flex;
  gap: 3px;
  margin-top: 4px;
  flex-shrink: 0;
}

.about-page .testimonialStars svg {
  width: 14px;
  height: 14px;
  fill: var(--amber-icon);
}

.about-page .testimonialsDots {
  display: flex;
  justify-content: center;
  gap: 15px; /* 10px dots: centres 25px apart (WCAG 2.5.8) */
}

.about-page .testimonialsDot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: #e2e2e2;
  padding: 0;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.about-page .testimonialsDotActive {
  background: #EFB000;
  transform: scale(1.25);
}

/* ==========================================================================
   Bottom CTA
   ========================================================================== */
.about-page .cta {
  padding: 88px 0;
  background: #FFFFFA;
  border-top: 1px solid #f0f0dc;
}

.about-page .ctaRow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px;
  max-width: 1100px;
  margin: 0 auto;
}

.about-page .ctaCol {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 24px;
  flex: 1;
}

.about-page .ctaTitle {
  font-size: 38px;
  font-weight: 700;
  color: #111827;
  margin: 0;
  white-space: nowrap;
  letter-spacing: -0.01em;
}

.about-page .ctaCol .goldButton {
  min-width: 155px;
  justify-content: center;
  text-align: center;
  padding: 13px 30px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 9px;
}

.about-page .ctaDivider {
  width: 2px;
  height: 120px;
  background: rgba(139, 138, 138, 0.3);
  flex-shrink: 0;
}

/* ==========================================================================
   Responsive Styles
   ========================================================================== */
@media (max-width: 1080px) {
  .about-page .aboutHeroGrid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .about-page .heroTitle {
    font-size: 36px;
  }

  .about-page .pillarsGrid,
  .about-page .leadershipGrid {
    grid-template-columns: repeat(2, 1fr);
  }

  .about-page .statsBar {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    padding: 20px;
  }

  .about-page .statDivider {
    display: none;
  }

  .about-page .testimonialsViewport {
    --testimonial-visible: 2;
  }

}

@media (max-width: 768px) {
  .about-page .pillarsGrid,
  .about-page .leadershipGrid {
    grid-template-columns: 1fr;
  }

  .about-page .heroTitle {
    font-size: 29px;
  }

  .about-page .sectionTitle {
    font-size: 26px;
  }

  .about-page .statsBar {
    grid-template-columns: repeat(2, 1fr);
  }

  .about-page .ctaRow {
    flex-direction: column;
    gap: 36px;
  }

  .about-page .ctaDivider {
    width: 80px;
    height: 1px;
  }

  /* Small dots, finger-sized tap area (invisible). */
  .about-page .testimonialsDot {
    position: relative;
  }

  .about-page .testimonialsDot::after {
    content: "";
    position: absolute;
    inset: -9px;
  }

  .about-page .testimonialsViewport {
    display: none;
  }

  .about-page .testimonialsMobileTrack {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    padding: 12px 24px 24px;
    scrollbar-width: none;
  }

  .about-page .testimonialsMobileTrack::-webkit-scrollbar {
    display: none;
  }

  .about-page .testimonialMobileCard {
    flex: 0 0 85%;
    scroll-snap-align: center;
  }
}

@media (max-width: 480px) {
  .about-page .statsBar {
    gap: 18px 12px;
    padding: 20px 14px;
  }

  .about-page .heroActions {
    flex-direction: column;
    align-items: stretch;
  }

  .about-page .heroActions .goldButton,
  .about-page .heroActions .secondaryButton {
    justify-content: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-page .reveal-fade-up,
  .about-page .reveal-fade-down,
  .about-page .reveal-fade-left,
  .about-page .reveal-fade-right,
  .about-page .reveal-zoom-in {
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
  }

}
`;

export default function AboutUsPage() {

  // Scroll reveal observer
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".about-page .reveal-on-scroll").forEach((el) => {
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

    const elements = document.querySelectorAll(".about-page .reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`about-page ${fontVariables}`}>
      <style>{ABOUT_PAGE_CSS}</style>

      {/* Hero Section: Envisioned on feedback */}
      <section className="aboutHero">
        <div className="container">
          <div className="aboutHeroGrid">
            {/* Left Column: Heading + 360 Suite Statement */}
            <div className="reveal-on-scroll reveal-fade-right">
              <span className="heroSubtitleTag">
                Great companies start with a determination to solve……
              </span>

              <h1 className="heroTitle">
                We are all about Digitalizing processes and helping HR Teams evolve!
              </h1>

              <div className="manifestoCard">
                <p className="manifestoText">
                  <strong>‘em’sphere…. </strong> stands for{" "}
                  <span className="highlight">360 degree solutions</span> of employee
                  management and is by design, a holistic{" "}
                  <span className="highlight">HR Suite envisioned on feedback</span>
                </p>
              </div>

              <div className="heroActions">
                <Link className="goldButton" href="/contact-us/" data-request-demo>
                  REQUEST DEMO
                  <ArrowRightIcon className="buttonIcon" />
                </Link>
                <a className="secondaryButton" href="#leadership">
                  MEET LEADERSHIP
                  <ArrowRightIcon className="buttonIcon" />
                </a>
              </div>
            </div>

            {/* Right Column: Frame 1 Illustration */}
            <div className="reveal-on-scroll reveal-fade-left">
              <div className="heroMediaCard">
                <img
                  className="heroMediaImg"
                  src={frame1.src}
                  alt="Frame 1 DETERMINED to solve"
                  width={frame1.width}
                  height={frame1.height}
                  loading="eager"
                />
                <span className="heroMediaBadge">
                  <CheckCircle size={16} weight="fill" />
                  Determined to Solve
                </span>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="statsWrap reveal-on-scroll reveal-fade-up">
            <div className="statsBar">
              {HERO_STATS.map((stat, index) => (
                <Fragment key={stat.label}>
                  {index > 0 && <span className="statDivider" aria-hidden="true" />}
                  <div className="statItem">
                    <span className="statValue">
                      <StopwatchCounter
                        value={stat.value}
                        suffix={stat.suffix}
                        delay={index * 90}
                      />
                    </span>
                    <span className="statLabel">{stat.label}</span>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by leading organizations */}
      <TrustedLogos id="clients" />

      {/* HONO-inspired Strategic Pillars: Purpose, Vision & Philosophy */}
      <section className="pillarsSection" id="purpose">
        <div className="container">
          <div className="sectionHead reveal-on-scroll reveal-fade-up">
            <div className="pillBadge">
              <span className="pillBadgeDot" />
              Strategic Foundation
            </div>
            <h2 className="sectionTitle">Fuelled by Empathy, Driven by Technology</h2>
            <p className="sectionSubtitle">
              We empower Indian manufacturing and enterprise operations with unified HRMS, CLMS, and biometric access ecosystems built for scale and compliance.
            </p>
          </div>

          <div className="pillarsGrid">
            {STRATEGIC_PILLARS.map((pillar, index) => (
              <div
                key={pillar.tag}
                className="pillarCard reveal-on-scroll reveal-fade-up"
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <div className="pillarIconWrap" aria-hidden="true">
                  <pillar.icon weight="fill" />
                </div>
                <span className="pillarTag">{pillar.tag}</span>
                <h3 className="pillarTitle">{pillar.title}</h3>
                <p className="pillarDesc">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our story… is from your story! / We reached out, We asked */}
      <section className="pillarsSection" id="our-story">
        <div className="container">
          <div className="sectionHead reveal-on-scroll reveal-fade-up">
            <div className="pillBadge">
              <span className="pillBadgeDot" />
              Our story… is from your story!
            </div>
            <h2 className="sectionTitle">We reached out, We asked And here is what we heard.</h2>
            <p className="sectionSubtitle">
              A story of what you have, what you miss, And what more you would like, Modern HR problems are nothing less than devils which can cascade and
              put the business in trouble.
            </p>
          </div>

          <div className="pillarsGrid">
            {WHAT_WE_HEARD.map((item, index) => (
              <div
                key={item.who}
                className="pillarCard reveal-on-scroll reveal-fade-up"
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <div className="pillarIconWrap" aria-hidden="true">
                  <item.icon weight="fill" />
                </div>
                <span className="pillarTag">{item.who}</span>
                <h3 className="pillarTitle">{item.want}</h3>
                <p className="pillarDesc">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HONO-inspired Inception & Milestones Timeline (Insertion Section) */}
      <section className="inceptionSection" id="inception">
        <div className="container">
          <div className="sectionHead reveal-on-scroll reveal-fade-up">
            <div className="pillBadge">
              <span className="pillBadgeDot" />
              Our Inception & Milestones
            </div>
            <h2 className="sectionTitle">From Inception to a Nationwide Footprint</h2>
            <p className="sectionSubtitle">
              Over a decade of continuous innovation, scaling from shop-floor problem solving in Pune to governing millions of workforce punches across India.
            </p>
          </div>

          <ol className="milestoneTree">
            <span className="milestoneTrunk reveal-on-scroll" aria-hidden="true">
              <span className="milestoneTrunkFill" />
            </span>

            <li className="milestoneRoot reveal-on-scroll reveal-zoom-in" aria-hidden="true">
              <span className="milestoneCap">
                <Plant weight="fill" />
                Where it began
              </span>
            </li>

            {INCEPTION_MILESTONES.map((milestone, index) => {
              const side = index % 2 === 0 ? "Left" : "Right";
              return (
                <li key={milestone.year} className={`milestoneBranch milestoneBranch${side}`}>
                  <span
                    className="milestoneNode reveal-on-scroll reveal-zoom-in"
                    style={{ transitionDelay: "120ms" }}
                    aria-hidden="true"
                  >
                    <milestone.icon weight="duotone" />
                  </span>
                  <article
                    className={`milestoneCard reveal-on-scroll ${
                      side === "Left" ? "reveal-fade-right" : "reveal-fade-left"
                    }`}
                  >
                    <div className="milestoneHeader">
                      <span className="milestoneYear">{milestone.year}</span>
                      <span className="milestoneBadge">Milestone</span>
                    </div>
                    <h3 className="milestoneTitle">{milestone.title}</h3>
                    <span className="milestoneSubtitle">{milestone.subtitle}</span>
                    <p className="milestoneDesc">{milestone.description}</p>
                    <div className="milestoneHighlight">
                      <CheckCircle weight="fill" aria-hidden="true" />
                      {milestone.highlight}
                    </div>
                  </article>
                </li>
              );
            })}

            <li className="milestoneTip reveal-on-scroll reveal-zoom-in" aria-hidden="true">
              <span className="milestoneCap">
                <TrendUp weight="bold" />
                And still growing
              </span>
            </li>
          </ol>
        </div>
      </section>

      {/* HONO-inspired Meet Leadership Section */}
      <section className="leadershipSection" id="leadership">
        <div className="container">
          <div className="sectionHead reveal-on-scroll reveal-fade-up">
            <div className="pillBadge">
              <span className="pillBadgeDot" />
              Executive Leadership
            </div>
            <h2 className="sectionTitle">Meet the Leadership Team</h2>
            <p className="sectionSubtitle">
              Guided by deep manufacturing industry insight, enterprise software architecture, and a relentless commitment to customer success.
            </p>
          </div>

          <div className="leadershipGrid">
            {LEADERSHIP_TEAM.map((leader, index) => (
              <div
                key={leader.name}
                className="leaderCard reveal-on-scroll reveal-fade-up"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="leaderPhotoWrap">
                  {leader.image ? (
                    <Image
                      className="leaderPhoto"
                      src={leader.image}
                      alt={leader.name}
                      width={400}
                      height={380}
                      priority={false}
                    />
                  ) : (
                    <span className="leaderInitials" aria-hidden="true">
                      {leader.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </span>
                  )}
                </div>
                <div className="leaderInfo">
                  <div className="leaderHeader">
                    <h3 className="leaderName">{leader.name}</h3>
                    <a
                      href={leader.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="leaderLinkedIn"
                      aria-label={`${leader.name} LinkedIn Profile`}
                    >
                      <LinkedinLogo weight="fill" />
                    </a>
                  </div>
                  <span className="leaderRole">{leader.role}</span>
                  <p className="leaderBio">{leader.bio}</p>
                  <div className="leaderExpertiseTags">
                    {leader.expertise.map((tag) => (
                      <span key={tag} className="expertiseTag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
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

      {/* Ready to talk? / Want to know more? CTA */}
      <section className="cta">
        <div className="container">
          <div className="ctaRow">
            <div className="ctaCol reveal-on-scroll reveal-fade-right">
              <h2 className="ctaTitle">Ready to talk?</h2>
              <Link className="goldButton" href="/contact-us/" data-request-demo>
                Talk to Sales
              </Link>
            </div>
            <span className="ctaDivider" />
            <div className="ctaCol reveal-on-scroll reveal-fade-left">
              <h2 className="ctaTitle">Want to know more?</h2>
              <Link className="goldButton" href="/contact-us/" data-request-demo>
                Book Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Back to top button */}
      <BackToTop trigger=".about-page > .aboutHero" />
    </div>
  );
}
