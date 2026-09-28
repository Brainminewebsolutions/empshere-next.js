"use client";

import { useEffect, useRef, useState } from "react";
import BackToTop from "@/components/BackToTop";

/* --------------------------------------------------------------------
   Images — every image the home page uses lives in app/images/homeimages
   and is imported here by name. To swap a picture, replace the file in
   that folder (keep the same name) or point the import at a new file.
   -------------------------------------------------------------------- */

// Hero
import heroSlide1 from "./images/homeimages/hero-hr-tech-reimagined-ai-hologram.png";
import heroSlide2 from "./images/homeimages/hero-connected-hr-team-collaboration.png";
import heroSlide3 from "./images/homeimages/hero-adaptive-integrated-industrial-workers.png";

// Trusted by leading organizations
import logoMahindra from "./images/homeimages/logo-mahindra.png";
import logoCapgemini from "./images/homeimages/logo-capgemini.png";
import logoMercedesBenz from "./images/homeimages/logo-mercedes-benz.png";
import logoHaier from "./images/homeimages/logo-haier.png";
import logoCastrol from "./images/homeimages/logo-castrol.png";
import logoApolloTyres from "./images/homeimages/logo-apollo-tyres.png";
import logoLtDefence from "./images/homeimages/logo-lt-defence.png";
import logoZf from "./images/homeimages/logo-zf.png";
import logoGarware from "./images/homeimages/logo-garware-polyester.png";
import logoVarroc from "./images/homeimages/logo-varroc-excellence.png";
import logoTataAutocomp from "./images/homeimages/logo-tata-autocomp.png";
import logoVishay from "./images/homeimages/logo-vishay.png";
import logoNayara from "./images/homeimages/logo-nayara-energy.png";
import logoKirloskar from "./images/homeimages/logo-kirloskar.png";
import logoKansaiNerolac from "./images/homeimages/logo-kansai-nerolac.png";
import logoAndhraPaper from "./images/homeimages/logo-andhra-paper-limited.png";
import logoDow from "./images/homeimages/logo-dow.png";

// Enhance Workforce and Labor Management
import workforceBuilding from "./images/homeimages/emsphere-corporate-office-building.png";
import workforceEngineers from "./images/homeimages/emsphere-site-engineers-reviewing-plans.png";
import iconExperienceBadge from "./images/homeimages/icon-15-years-experience-badge.png";
import iconInHouseProducts from "./images/homeimages/icon-in-house-developed-products.png";
import iconCustomerCentric from "./images/homeimages/icon-customer-centric-approach.png";
import iconIntelligent from "./images/homeimages/icon-intelligent-hr-solutions.png";
import iconInsightDriven from "./images/homeimages/icon-insight-driven-analytics.png";
import iconAutomation from "./images/homeimages/icon-hr-process-automation.png";
import iconAiDriven from "./images/homeimages/icon-ai-driven-technology.png";

// Shop floor / Corporate team
import shopFloorTeam from "./images/homeimages/shop-floor-workforce-management-team.png";
import corporateTeam from "./images/homeimages/corporate-hr-team-collaboration.jpg";

// emHRMS product showcase
import iconEmhrms from "./images/homeimages/icon-emhrms-module.png";
import emhrmsDashboard from "./images/homeimages/emhrms-dashboard-screenshot.png";

// Change from legacy system
import iconIntuitiveAi from "./images/homeimages/icon-intuitive-with-ai.png";
import iconDataOnCloud from "./images/homeimages/icon-data-on-cloud.png";
import iconErpIntegration from "./images/homeimages/icon-erp-integration.png";
import iconConsultative from "./images/homeimages/icon-consultative-implementation.png";
import iconIso from "./images/homeimages/icon-iso-iec-27001-certified.png";
import iconCompetitiveCosting from "./images/homeimages/icon-competitive-costing.png";
import iconHardwarePartnership from "./images/homeimages/icon-hardware-partnership.png";
import iconUserFeedback from "./images/homeimages/icon-developed-on-user-feedback.png";

// Testimonials
import logoVarrocTestimonial from "./images/homeimages/logo-varroc-excellence-testimonial.png";
import logoVishayTestimonial from "./images/homeimages/logo-vishay-testimonial.png";
import logoYashaswiTestimonial from "./images/homeimages/logo-yashaswi-testimonial.png";
import logoYazakiTestimonial from "./images/homeimages/logo-yazaki-testimonial.png";
import logoNerolacTestimonial from "./images/homeimages/logo-nerolac-testimonial.png";
import logoReliableAutoTestimonial from "./images/homeimages/logo-reliable-auto-testimonial.png";
import logoKoresTestimonial from "./images/homeimages/logo-kores-testimonial.png";
import logoMahindraMahindraTestimonial from "./images/homeimages/logo-mahindra-mahindra-testimonial.png";

// Latest Blogs
import blogContractLabour from "./images/homeimages/blog-contract-labour-management-guide.png";
import blogPayroll from "./images/homeimages/blog-payroll-management-automation.png";
import blogVisitorManagement from "./images/homeimages/blog-visitor-management-system-security.png";

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
    text: "A new page modern system, for an\nenterprise which is inclusive, engages\nemployees and seamlessly connect teams.",
    cta: "Request Demo",
  },
  {
    image: heroSlide3,
    title: "Adaptive & Integrated",
    text: "Our CLMS is an end to end, AI powered \nsystem covering all aspects of largescale \nlabour management",
    cta: "Request Demo",
  },
];

const HERO_STATS = [
  { value: "500+", target: 500, suffix: "+", label: "Happy Client" },
  { value: "8+", target: 8, suffix: "+", label: "Products" },
  { value: "2,000,000", target: 2000000, suffix: "", label: "Satisfied Users" },
  { value: "10+", target: 10, suffix: "+", label: "Industries" },
  { value: "855+", target: 855, suffix: "+", label: "Project Completed" },
];

const TRUSTED_LOGOS = [
  { src: logoMahindra, alt: "Mahindra" },
  { src: logoCapgemini, alt: "Capgemini" },
  { src: logoMercedesBenz, alt: "Mercedes-Benz" },
  { src: logoHaier, alt: "Haier" },
  { src: logoCastrol, alt: "Castrol" },
  { src: logoApolloTyres, alt: "Apollo Tyres" },
  { src: logoLtDefence, alt: "L&T Defence" },
  { src: logoZf, alt: "ZF" },
  { src: logoGarware, alt: "Garware Polyester Limited" },
  { src: logoVarroc, alt: "Varroc Excellence" },
  { src: logoTataAutocomp, alt: "Tata Autocomp" },
  { src: logoVishay, alt: "Vishay" },
  { src: logoVishay, alt: "Vishay" },
  { src: logoNayara, alt: "Nayara Energy" },
  { src: logoKirloskar, alt: "Kirloskar" },
  { src: logoKansaiNerolac, alt: "Kansai Nerolac Paints Limited" },
  { src: logoAndhraPaper, alt: "Andhra Paper Limited" },
  { src: logoDow, alt: "Dow" },
];

// 6 logos per slide. Pages are chunked once here; the slider then loops
// forever by repeating the first page after the last and the last page
// before the first, so it can animate seamlessly in either direction.
const TRUSTED_LOGOS_PER_SLIDE = 6;
const TRUSTED_PAGES = Array.from(
  { length: Math.ceil(TRUSTED_LOGOS.length / TRUSTED_LOGOS_PER_SLIDE) },
  (_, i) =>
    TRUSTED_LOGOS.slice(
      i * TRUSTED_LOGOS_PER_SLIDE,
      i * TRUSTED_LOGOS_PER_SLIDE + TRUSTED_LOGOS_PER_SLIDE
    )
);
const TRUSTED_SLIDES = [
  TRUSTED_PAGES[TRUSTED_PAGES.length - 1],
  ...TRUSTED_PAGES,
  TRUSTED_PAGES[0],
];
// Each slide's share of the track's own (much wider) box, e.g. 20% for 5 slides.
const TRUSTED_SLIDE_BASIS = 100 / TRUSTED_SLIDES.length;

const WORKFORCE_FEATURES = [
  { icon: iconInHouseProducts, label: "In-house developed\nproducts" },
  { icon: iconCustomerCentric, label: "Customer centric \napproach" },
  { icon: iconIntelligent, label: "Intelligent" },
  { icon: iconInsightDriven, label: "Insight Driven" },
  { icon: iconAutomation, label: "Automation" },
  { icon: iconAiDriven, label: "AI Driven" },
];

const DIVISIONS = [
  {
    image: shopFloorTeam,
    title: "Shop floor team",
    text: "Businesses with a large labour workforce across multiple locations and shop floors face unique challenges, often due to an unorganized structure.....",
    hoverText:
      "Businesses with a large labour workforce across multiple locations and shop floors face unique challenges, often due to an unorganized structure. A world-class organization uses automation to empower HR teams, Operations, and Management to effectively manage a large contract labour workforce while aligning everyone with production goals.",
  },
  {
    image: corporateTeam,
    title: "Corporate team",
    text: "Modern organization are employee centric, and an HRMS covering all aspects of a team member is a necessity in today’s hybrid environment......",
    hoverText:
      "Modern organization are employee centric, and an HRMS covering all aspects of a team member is a necessity in todays hybrid environment. Tasks and workflows to make it easy for HR teams. Analytics for data driven employee centric decisions!",
  },
];

const SHOWCASE_PRODUCTS = [
  {
    id: "emHRMS",
    name: "emHRMS",
    desc: "emHRMS can manage a life cycle of an employee and\nhelps to automate all the HR Process in the company.\nIt can reduce the day to day work effort by 40%.",
    ctaLink: "#know-more",
  },
  {
    id: "emCLMS",
    name: "emCLMS",
    desc: "emContract Labour management software is an end to end system covering all aspects of labour management.",
    ctaLink: "#know-more",
  },
  {
    id: "emPayroll",
    name: "emPayroll",
    desc: "emPayroll helps organizations to manage the complete payroll activities.",
    ctaLink: "#know-more",
  },
  {
    id: "emWorkForce",
    name: "emWorkForce",
    desc: "Manage your employee life cycle from onboarding \nto exit, publish letters and more.",
    ctaLink: "#know-more",
  },
  {
    id: "emVisit",
    name: "emVisit",
    desc: "emVisit is a fully automated and comprehensive cloud based visitor management system software.",
    ctaLink: "#know-more",
  },
  {
    id: "emMeal",
    name: "emMeal",
    desc: "emMeal help you orchestrate a quick and efficient operation to cover a large section of employees in a\nsystematic and hassle-free manner",
    ctaLink: "#know-more",
  },
];

const SHOWCASE_TABS = SHOWCASE_PRODUCTS.map((p) => p.name);

const REASONS = [
  { icon: iconIntuitiveAi, label: "Intutive With AI" },
  { icon: iconErpIntegration, label: "ERP Integration" },
  { icon: iconIso, label: "ISO/IEC 27001:2022" },
  { icon: iconHardwarePartnership, label: "Hardware Partnership" },
  { icon: iconDataOnCloud, label: "Data On Cloud" },
  { icon: iconConsultative, label: "Consultative \nImplementation" },
  { icon: iconCompetitiveCosting, label: "Competitive Costing" },
  { icon: iconUserFeedback, label: "Developed On \nUser Feedback" },
];

const TESTIMONIALS = [
  {
    company: "Yazaki",
    quote:
      "“The best part was that emSphere provided end to end solution from Face biometric devices to the contract labour management software which helped us to have a single point of ownership for the entire process across 12000+ employees at 7 Plant locations”",
    name: "Mahesh Jadhav",
    role: "Sr HR Manager",
    logo: logoYazakiTestimonial,
    rating: 5,
  },
  {
    company: "Yashaswi",
    quote:
      "“emSphere team has helped us streamline the entire Attendance & Payroll operations for all our 65K+employees across 500+ clients from diverse industry segments using their powerful adaptive configurations & streamlining the payroll across multiple pay cycles as per customer practices in a single centralized system”",
    name: "Vishwesh Kulkarni",
    role: "Chairman",
    logo: logoYashaswiTestimonial,
    rating: 5,
  },
  {
    company: "Varroc Excellence",
    quote:
      "“emSphere emContract Labour management system empowered us to digitize end to end system from 120+ Biometric attendance, Manpower planning to Contractor billing & labour Analytics associated with it for dynamic contract labour workforce at our 28+ locations 20,000+ contract employees”",
    name: "Shrikrishna Khalse",
    role: "Lead Employee Relations",
    logo: logoVarrocTestimonial,
    rating: 5,
  },
  {
    company: "Vishay",
    quote:
      "“We are using CLMS system for recording and monitoring of the statutory compliances for all service provider. It serves us the great help, not only for compliance monitoring but also in statutory audit, wherein we get the requisite information quickly on single button click. It reduced our manual work, automated the entire process and improved accuracy”",
    name: "Pramod Hore",
    role: "Manager HR-IR & Admin",
    logo: logoVishayTestimonial,
    rating: 5,
  },
  {
    company: "Nerolac",
    quote:
      "“Kansai Nerolac Paints has been satisfied with Emsphere Technologies Pvt. Ltd's software services. Their staff demonstrated a thorough understanding of our demands from the start, delivering a tailored solution that exactly met our specifications. The entire process, from initial consultation to deployment, was handled seamlessly and professionally. The quality of their work far beyond our expectations. The program is reliable, user-friendly, and has considerably increased our operational efficiency. We liked their proactive communication and willingness to go above and ensure everything was running smoothly. Their experience and commitment to excellence were visible throughout the project, and we are satisfied with the outcomes. Highly recommended!”",
    name: "Mr Vivek Bhatwadekar",
    role: "General Manager, Head - Employee Relations",
    logo: logoNerolacTestimonial,
    rating: 5,
  },
  {
    company: "Reliable Autotech",
    quote:
      "“Managing 1,200+ contract workers across Pune, Nashik & Dewas and PAN-India was complex. emSphere gave us a single, end-to-end system — from face-based turnstile access to attendance, contractor billing, and compliance. The biggest advantage is automatic compliance blocking at the device level, which removes manual checks and risk. The solution has made our shop-floor operations simpler, controlled, and audit-ready. We really appreciate the Solution and services provided by emSphere team and wishing them all the best.”",
    name: "Mr Sagar Bhavsar",
    role: "Head - Corporate IT / SAP & IT Security",
    logo: logoReliableAutoTestimonial,
    rating: 5,
  },
  {
    company: "Kores",
    quote:
      "“At Kores, we manage complex attendance and calculation rules across 1,200+ contract workers in 3+ foundry locations. emSphere understood our needs clearly and delivered the entire logic correctly in the first attempt. They also handle the full process end-to-end — from face device attendance capture to reporting — which gives us better control and support. Their CLMS now provides the commercial and cost insights we need to manage high attrition and the challenges of the foundry environment. emSphere has become a reliable partner who makes our tough processes much easier.”",
    name: "Mr Manish Kedia",
    role: "Vice President Commercial",
    logo: logoKoresTestimonial,
    rating: 5,
  },
  {
    company: "Mahindra & Mahindra",
    quote:
      "“Managing 40,000+ contract labourers across multiple locations requires absolute accuracy and strong legal compliance governance. emSphere supports us with a true end-to-end CLMS, starting from face-device–based attendance capture to real-time compliance blocking integrated with Face access systems. All contract labour onboarding across categories is fully digital, bringing consistency, tracking authorized entries and speed at enterprise scale. The platform delivers accurate attendance, OT calculations, compliance monitoring with CLRA statutory reports and contractor billing, and our billing process is strictly driven by the bills generated in emSphere. The system has brought standardization, control, and audit confidence across our contract labour operations. CLMS platform increased the digital footprint and improved visibility of CL operations across units. This resulted in more agile, cost-effective, and efficient workforce solutions, ultimately enhancing overall organizational performance. We intend to scale up this to entire organisation covering 30000+ manpower across divisions and legal entities”",
    name: "Mr Nilesh Tarange",
    role: "GM - Process Assurance | Auto Farm Sector",
    logo: logoMahindraMahindraTestimonial,
    rating: 5,
  },
];

const BLOG_POSTS = [
  {
    image: blogContractLabour,
    title: "Contract And Labor \nManagement",
    excerpt:
      "One System, Zero Compliance Gaps: The Complete Guide to Contract Labour Management for Indian Principal Employers",
  },
  {
    image: blogPayroll,
    title: "In Payroll \nManagement",
    excerpt:
      "Payroll Without the Pain: How Emsphere’s Payroll Management System Automates Compliance for Indian Enterprises",
  },
  {
    image: blogVisitorManagement,
    title: "Visitor \nManagement System",
    excerpt:
      "Why a Visitor Management System Is Now a Business-Critical Security Investment",
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

function ChevronIcon({ direction = "left", ...props }) {
  return (
    <svg
      viewBox="0 0 6 11"
      fill="none"
      aria-hidden="true"
      style={{ transform: direction === "right" ? "scaleX(-1)" : undefined }}
      {...props}
    >
      <path
        d="M5.5 10.3 1 5.5 5.5.7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon(props) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path d="M10 1.5l2.472 5.008 5.528.803-4 3.899.944 5.508L10 14.25l-4.944 2.468.944-5.508-4-3.899 5.528-.803L10 1.5z" />
    </svg>
  );
}

function AnimatedCounter({ target, suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const startAnimation = () => {
      const startTime = performance.now();

      const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // easeOutCubic: starts fast and decelerates smoothly to the final number
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(ease * target);

        setCount(current);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setCount(target);
        }
      };

      requestAnimationFrame(step);
    };

    if (typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            startAnimation();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    } else {
      startAnimation();
    }
  }, [target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
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
@import url("https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap");

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
  --font-heading: "Instrument Sans", system-ui, sans-serif;
  --font-label: "Inter", system-ui, sans-serif;

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
  background: var(--blue);
}

.home-page .blueButton:hover {
  background: var(--blue-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 18px -4px rgba(0, 119, 194, 0.45);
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
  color: var(--blue);
  text-decoration: none;
  transition: color 0.2s ease;
}

.home-page .learnMore svg {
  width: 15px;
  height: 12px;
  transition: transform 0.2s ease;
}

.home-page .learnMore:hover {
  color: var(--blue-dark);
}

.home-page .learnMore:hover svg {
  transform: translateX(3px);
}

/* ==========================================================================
   Hero
   ========================================================================== */

.home-page .hero {
  position: relative;
  height: 631px;
  background: #ffffff;
}

.home-page .heroSlides {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 631px;
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
  object-position: center;
}

.home-page .heroSlideContent {
  position: relative;
  z-index: 1;
  max-width: 1240px;
  height: 100%;
  margin: 0 auto;
  padding: 0 24px;
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
  font-size: 40px;
  font-weight: 600;
  line-height: 1.22;
  color: #000000;
  margin: 0 0 22px;
  max-width: 520px;
}

.home-page .heroText {
  font-size: 22px;
  font-weight: 600;
  line-height: 1.3;
  color: var(--text-64);
  margin: 0 0 34px;
  max-width: 480px;
  white-space: pre-line;
}

.home-page .heroCta {
  align-self: flex-start;
}

.home-page .heroStatsWrap {
  position: absolute;
  left: 39.58%;
  top: 513px;
  width: 55.7%;
  max-width: 802px;
  z-index: 2;
}

.home-page .heroStats {
  background: #ffffff;
  box-shadow: inset 0 0 0 1px #acacac, 0px 0px 24px -9px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  gap: 24px;
  width: 100%;
  padding: 38px 40px;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.home-page .heroStats:hover {
  transform: translateY(-4px);
  box-shadow: inset 0 0 0 1px #acacac, 0px 16px 36px -9px rgba(0, 0, 0, 0.22);
}

.home-page .heroStat {
  text-align: center;
  min-width: 90px;
  transition: transform 0.25s ease;
}

.home-page .heroStat:hover {
  transform: translateY(-2px);
}

.home-page .heroStatValue {
  display: block;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 25px;
  color: var(--text-64);
  margin-bottom: 4px;
  font-variant-numeric: tabular-nums;
}

.home-page .heroStatLabel {
  display: block;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 16px;
  color: var(--text-64);
}

.home-page .heroDots {
  position: absolute;
  left: 19.24%;
  top: 580px;
  display: flex;
  gap: 7px;
  z-index: 2;
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
  border-color: #0b78c2;
}

.home-page .heroDotActive {
  background: var(--blue-alt);
  border-color: var(--blue-alt);
  transform: scale(1.2);
}

/* ==========================================================================
   Trusted by leading organizations
   ========================================================================== */

.home-page .trusted {
  background: var(--bg-gray-3);
  box-shadow: inset 0 0 0 1px rgba(172, 172, 172, 0.1);
  padding: 80px 0;
}

.home-page .trustedTitle {
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: var(--heading-gray);
  margin: 0 0 44px;
}

/* Desktop: Normal static grid as shown in reference image */
.home-page .trustedDesktopGrid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 48px 32px;
  align-items: center;
  justify-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.home-page .trustedLogoWrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
}

/* Hide mobile slider on desktop */
.home-page .trustedMobileSlider {
  display: none;
}

/* Mobile slider styles (preserved for mobile view) */
.home-page .trustedSlider {
  overflow: hidden;
  touch-action: pan-y;
  user-select: none;
}

.home-page .trustedTrack {
  display: flex;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: grab;
}

.home-page .trustedTrackInstant {
  transition: none;
}

.home-page .trustedTrackDragging {
  transition: none;
  cursor: grabbing;
}

.home-page .trustedSlide {
  flex: 0 0 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 32px 24px;
  align-items: center;
  justify-items: center;
}

.home-page .trustedLogo {
  max-height: 52px;
  max-width: 136px;
  width: auto;
  height: auto;
  object-fit: contain;
  filter: grayscale(0%);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease;
  will-change: transform;
  -webkit-user-drag: none;
  user-drag: none;
}

.home-page .trustedLogo:hover {
  transform: translateY(-4px) scale(1.08);
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.09));
}

.home-page .trustedDots {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 32px;
}

.home-page .trustedDot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: none;
  background: var(--border-gray);
  padding: 0;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.home-page .trustedDot:hover {
  transform: scale(1.2);
}

.home-page .trustedDotActive {
  width: 22px;
  border-radius: 5px;
  background: var(--blue-alt);
}

/* ==========================================================================
   Enhance Workforce and Labor Management
   ========================================================================== */

.home-page .workforce {
  padding: 88px 0;
  background: #ffffff;
}

.home-page .workforceGrid {
  display: grid;
  grid-template-columns: 519px 1fr;
  gap: 72px;
  align-items: start;
}

.home-page .workforceMedia {
  position: relative;
}

.home-page .workforceMediaMain {
  width: 100%;
  height: 277px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0px 0px 35px -9px rgba(0, 0, 0, 0.25);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.home-page .workforceMediaMain:hover {
  transform: scale(1.02);
}

.home-page .workforceMediaOverlay {
  position: absolute;
  left: 222px;
  top: 250px;
  width: 320px;
  height: 305px;
  object-fit: cover;
  border-radius: 9px;
  border: 5px solid #ffffff;
  box-sizing: border-box;
  box-shadow: 0px 8px 35px -9px rgba(0, 0, 0, 0.35);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
  will-change: transform;
}

.home-page .workforceMediaOverlay:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0px 16px 42px -6px rgba(0, 0, 0, 0.42);
}

@keyframes badgePulseFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

.home-page .workforceBadge {
  position: absolute;
  left: 0;
  top: 315px;
  width: 160px;
  height: 223px;
  background: rgba(255, 220, 128, 0.5);
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 6px;
  padding: 12px;
  animation: badgePulseFloat 4s ease-in-out infinite;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  will-change: transform;
}

.home-page .workforceBadge:hover {
  animation-play-state: paused;
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 12px 28px -6px rgba(239, 176, 0, 0.45);
}

.home-page .workforceBadgeIcon {
  width: 40px;
  height: 40px;
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
  margin-bottom: 32px;
}

.home-page .workforceFeatureCard {
  display: flex;
  align-items: center;
  gap: 14px;
  background: #ffffff;
  box-shadow: inset 0 0 0 1px #acacac, 0px 0px 24px -9px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 12px 16px;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.home-page .workforceFeatureCard:hover {
  transform: translateY(-3px);
  box-shadow: inset 0 0 0 1.5px var(--gold), 0px 10px 24px -6px rgba(0, 0, 0, 0.18);
}

.home-page .workforceFeatureIconWrap {
  flex-shrink: 0;
  width: 47px;
  height: 47px;
  border-radius: 50%;
  background: rgba(239, 176, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.25s ease;
}

.home-page .workforceFeatureCard:hover .workforceFeatureIconWrap {
  transform: scale(1.1);
}

.home-page .workforceFeatureIcon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.home-page .workforceFeatureLabel {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--text);
}

/* ==========================================================================
   Serving the HR and Industrial Relations — Shop floor / Corporate team
   ========================================================================== */

.home-page .divisions {
  padding: 88px 0;
  background: linear-gradient(180deg, #ffffff 0%, #fff8e4 100%);
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
  background: rgba(255, 248, 228, 0.4);
  box-shadow: inset 0 0 0 1px #acacac, 0px 0px 24px -9px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 10px;
  padding: 28px 28px 32px;
  cursor: pointer;
  overflow: hidden;
  transition: box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  outline: none;
  will-change: transform;
}

.home-page .divisionCard:hover,
.home-page .divisionCard:focus-visible,
.home-page .divisionCard.divisionCardActive {
  box-shadow: inset 0 0 0 1.5px rgba(239, 176, 0, 0.7), 0px 18px 38px -8px rgba(0, 0, 0, 0.22);
  transform: translateY(-5px);
}

.home-page .divisionCardDefault {
  transition: opacity 0.35s ease, filter 0.35s ease, transform 0.35s ease;
  will-change: opacity, filter;
}

.home-page .divisionCard:hover .divisionCardDefault,
.home-page .divisionCard:focus-visible .divisionCardDefault,
.home-page .divisionCard.divisionCardActive .divisionCardDefault {
  opacity: 0;
  filter: blur(4px);
  transform: scale(0.98);
  pointer-events: none;
}

.home-page .divisionImage {
  width: 100%;
  height: 204px;
  object-fit: cover;
  border-radius: 11px;
  box-shadow: 0px 0px 24px -9px rgba(0, 0, 0, 0.25);
  margin-bottom: 20px;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.home-page .divisionCard:hover .divisionImage {
  transform: scale(1.04);
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

.home-page .divisionHoverOverlay {
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
  border-radius: 10px;
  opacity: 0;
  pointer-events: none;
  transform: scale(0.96);
  transition: opacity 0.35s ease-in-out, transform 0.35s ease-out;
  will-change: opacity, transform;
}

.home-page .divisionCard:hover .divisionHoverOverlay,
.home-page .divisionCard:focus-visible .divisionHoverOverlay,
.home-page .divisionCard.divisionCardActive .divisionHoverOverlay {
  opacity: 1;
  pointer-events: auto;
  transform: scale(1);
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
   emHRMS product showcase
   ========================================================================== */

.home-page .showcase {
  background: #f0f0f0;
  padding: 88px 0;
  width: 100%;
}

.home-page .showcaseGrid {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 56px;
  align-items: start;
}

.home-page .showcaseLeft {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.home-page .showcaseTitle {
  font-size: 34px;
  font-weight: 600;
  line-height: 1.25;
  color: var(--text);
  margin: 0 0 54px;
  white-space: pre-line;
}

@keyframes homePageFadeInProduct {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.home-page .showcaseInfo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  animation: homePageFadeInProduct 0.25s ease-out;
}

.home-page .showcaseIcon {
  width: 65px;
  height: 65px;
  border-radius: 7px;
  background: var(--gold);
  display: flex;
  align-items: center;
  justify-content: center;
}

.home-page .showcaseIcon img {
  width: 38px;
  height: 41px;
  object-fit: contain;
}

.home-page .showcaseProductName {
  font-size: 34px;
  font-weight: 600;
  color: var(--text);
  margin: 0;
}

.home-page .showcaseDesc {
  font-size: 17px;
  line-height: 1.65;
  color: var(--text-64);
  margin: 0;
  white-space: pre-line;
  min-height: 84px;
}

.home-page .showcaseRight {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
}

.home-page .showcaseArrowsRow {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 14px;
}

.home-page .showcaseArrow {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid #c7c7c7;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.home-page .showcaseArrow:hover {
  background: #f7f7f7;
  border-color: #999999;
  transform: scale(1.04);
}

.home-page .showcaseArrow:active {
  transform: scale(0.96);
}

.home-page .showcaseArrow svg {
  width: 7px;
  height: 12px;
}

.home-page .showcaseTabs {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  width: 100%;
  margin-bottom: 24px;
}

.home-page .showcaseTab {
  border: none;
  cursor: pointer;
  border-radius: 7px;
  padding: 10px 4px;
  font-family: var(--font-heading);
  font-size: 15px;
  font-weight: 600;
  background: #e5e5e5;
  box-shadow: inset 0 0 0 1px #b4b4b4;
  color: var(--text);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  white-space: nowrap;
}

.home-page .showcaseTab:hover {
  background: #d8d8d8;
  transform: translateY(-2px);
}

.home-page .showcaseTabActive {
  background: #02183f;
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(2, 24, 63, 0.3);
  transform: translateY(-2px);
}

.home-page .showcaseTabActive:hover {
  background: #02183f;
}

.home-page .showcaseScreenshotWrap {
  background: #ffffff;
  box-shadow: inset 0 0 0 1px #bfbfbf, 0px 0px 24px -9px rgba(0, 0, 0, 0.25);
  border-radius: 11px;
  padding: 8px;
  width: 100%;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.home-page .showcaseScreenshotWrap:hover {
  transform: translateY(-4px);
  box-shadow: inset 0 0 0 1px #0077c2, 0px 18px 40px -9px rgba(0, 0, 0, 0.22);
}

.home-page .showcaseScreenshot {
  width: 100%;
  height: auto;
  border-radius: 6px;
  display: block;
}

/* ==========================================================================
   Change from legacy system — reasons grid
   ========================================================================== */

.home-page .reasons {
  padding: 88px 0;
  background: #ffffff;
}

.home-page .reasonsGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  max-width: 1060px;
  margin: 0 auto;
}

.home-page .reasonCard {
  background: #ffffff;
  box-shadow: inset 0 0 0 1px #dddddd, 0px 0px 16px -7px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  padding: 24px 16px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.home-page .reasonCard:hover {
  transform: translateY(-6px);
  box-shadow: inset 0 0 0 1px var(--gold), 0px 14px 28px -6px rgba(0, 0, 0, 0.18);
}

.home-page .reasonIcon {
  width: 56px;
  height: 56px;
  object-fit: contain;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.home-page .reasonCard:hover .reasonIcon {
  transform: scale(1.12);
}

.home-page .reasonLabel {
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
  line-height: 1.3;
  white-space: pre-line;
}

.home-page .reasonBar {
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: var(--amber-icon);
  margin-top: auto;
  transition: height 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
}

.home-page .reasonCard:hover .reasonBar {
  height: 5px;
  background: var(--gold-dark);
  box-shadow: 0 0 8px rgba(239, 176, 0, 0.6);
}

/* ==========================================================================
   Testimonials
   ========================================================================== */

.home-page .testimonials {
  background: var(--bg-gray-1);
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
    (100% - var(--testimonial-visible) * var(--testimonial-gap)) /
      (var(--testimonial-visible) + 1)
  );
  display: flex;
  gap: var(--testimonial-gap);
  width: calc((var(--testimonial-visible) + 1) / var(--testimonial-visible) * 100%);
  transform: translateX(0);
  transition: transform 0.55s cubic-bezier(0.65, 0, 0.35, 1);
  will-change: transform;
}

.home-page .testimonialsTrackShifted {
  transform: translateX(calc(-1 * (var(--testimonial-item) + var(--testimonial-gap))));
}

.home-page .testimonialsTrackInstant {
  transition: none;
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
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.home-page .testimonialCard:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 30px -6px rgba(0, 0, 0, 0.14);
}

.home-page .testimonialFeatured {
  background: #ffffff;
  box-shadow: inset 0 0 0 3px #a7ddff, 0px 0px 24px -9px rgba(0, 0, 0, 0.25);
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
  color: rgba(11, 120, 194, 0.35);
  align-self: flex-start;
  margin-top: auto;
  transition: color 0.2s ease, transform 0.2s ease;
}

.home-page .testimonialReadMore:hover {
  transform: translateX(2px);
}

.home-page .testimonialFeatured .testimonialReadMore {
  color: var(--blue-alt);
}

.home-page .testimonialFooter {
  background: #e4f4ff;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 14px;
  height: 96px;
  min-height: 96px;
  max-height: 96px;
  box-sizing: border-box;
  margin-top: auto;
  border-top: 1px solid #d9edf8;
}

.home-page .testimonialLogoWrap {
  width: 66px;
  height: 52px;
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
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
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
  gap: 10px;
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
  background: var(--blue);
  transform: scale(1.25);
}

/* ==========================================================================
   Latest Blogs
   ========================================================================== */

.home-page .blogs {
  background: var(--gold);
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
  border: none;
  background: #fbfdff;
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
  background: #eef8ff;
  box-shadow: inset 0 0 0 3px #a7ddff, 0px 0px 24px -9px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.home-page .blogCard:hover {
  transform: translateY(-6px);
  box-shadow: inset 0 0 0 3px #72c5ff, 0px 18px 36px -8px rgba(0, 0, 0, 0.22);
}

.home-page .blogImage {
  width: 100%;
  height: auto;
  aspect-ratio: 3 / 2;
  object-fit: cover;
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
  color: var(--blue-dark);
  margin: 0;
  white-space: pre-line;
  line-height: 1.3;
}

.home-page .blogExcerpt {
  font-size: 15px;
  font-weight: 600;
  line-height: 1.4;
  color: rgba(0, 0, 0, 0.5);
  margin: 0;
  flex: 1;
}

.home-page .blogCard:hover .learnMore {
  color: var(--blue-dark);
}

.home-page .blogCard:hover .learnMore svg {
  transform: translateX(4px);
}

/* ==========================================================================
   Bottom CTA — Ready to talk? / Want to know more?
   ========================================================================== */

.home-page .cta {
  padding: 88px 0;
  background: #ffffff;
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

  .home-page .hero {
    height: auto;
    position: relative;
    overflow: visible;
  }

  .home-page .heroSlides {
    position: relative;
    height: 560px;
    width: 100%;
    overflow: hidden;
  }

  .home-page .heroDots {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 22px;
    top: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    z-index: 10;
  }

  .home-page .heroStatsWrap {
    position: static;
    width: 100%;
    max-width: none;
    padding: 0 20px;
    margin-top: 28px;
  }

  .home-page .heroStats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 24px 20px;
    gap: 20px;
  }

  .home-page .workforceGrid,
  .home-page .showcaseGrid {
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

  .home-page .trustedSlide {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px 20px;
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
  .home-page .trusted,
  .home-page .workforce,
  .home-page .divisions,
  .home-page .showcase,
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

  /* Hero Mobile */
  .home-page .hero {
    height: auto;
    position: relative;
    overflow: visible;
    background: #ffffff;
  }

  .home-page .heroSlides {
    position: relative;
    width: 100%;
    height: calc(100vh - 80px);
    height: calc(100svh - 80px);
    height: calc(100dvh - 80px);
    min-height: 520px;
    max-height: 820px;
    overflow: hidden;
  }

  .home-page .heroSlide {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .home-page .heroSlideBg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }

  .home-page .heroSlideContent {
    position: relative;
    z-index: 2;
    padding: 20px 20px 310px;
    width: 100%;
    max-width: 560px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: radial-gradient(
      ellipse at center,
      rgba(255, 255, 255, 0.95) 0%,
      rgba(255, 255, 255, 0.88) 58%,
      rgba(255, 255, 255, 0.65) 100%
    );
  }

  .home-page .heroTitle {
    font-size: 30px;
    font-weight: 700;
    line-height: 1.22;
    color: #000000;
    text-align: center;
    margin: 0 auto 16px;
    max-width: 440px;
  }

  .home-page .heroText {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5;
    color: var(--text-64);
    text-align: center;
    margin: 0 auto 26px;
    max-width: 420px;
    white-space: normal;
  }

  .home-page .heroCta {
    align-self: center;
    margin: 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 13px 28px;
    font-size: 14.5px;
    font-weight: 600;
    letter-spacing: 0.02em;
    border-radius: 6px;
  }

  .home-page .heroDots {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 10px;
    top: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 9px;
    z-index: 10;
  }

  .home-page .heroDot {
    width: 11px;
    height: 11px;
  }

  .home-page .heroDotActive {
    transform: scale(1.25);
  }

  .home-page .heroStatsWrap {
    position: absolute;
    top: auto;
    left: 0;
    right: 0;
    bottom: 40px;
    width: 100%;
    max-width: 100%;
    padding: 0 16px;
    margin: 0;
    z-index: 3;
  }

  .home-page .heroStats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 22px 16px;
    gap: 16px 12px;
    border-radius: 12px;
    box-shadow: inset 0 0 0 1px #dcdcdc, 0px 8px 24px -6px rgba(0, 0, 0, 0.12);
  }

  .home-page .heroStat {
    min-width: 0;
    text-align: center;
  }

  .home-page .heroStat:nth-child(5) {
    grid-column: span 2;
  }

  .home-page .heroStatValue {
    font-size: 22px;
    margin-bottom: 2px;
  }

  .home-page .heroStatLabel {
    font-size: 13px;
  }

  /* Trusted */
  .home-page .trustedDesktopGrid {
    display: none;
  }

  .home-page .trustedMobileSlider {
    display: block;
  }

  .home-page .trustedTitle {
    font-size: 20px;
    margin-bottom: 24px;
  }

  .home-page .trustedSlide {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px 14px;
  }

  .home-page .trustedLogo {
    max-height: 38px;
    max-width: 96px;
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

  .home-page .workforceMediaMain {
    width: 82%;
    height: 190px;
    object-fit: cover;
    border-radius: 10px;
  }

  .home-page .workforceMediaOverlay {
    position: absolute;
    right: 0;
    bottom: 0;
    top: auto;
    left: auto;
    width: 62%;
    height: 175px;
    object-fit: cover;
    border-radius: 8px;
    border: 4px solid #ffffff;
    box-shadow: 0 10px 28px -6px rgba(0, 0, 0, 0.25);
  }

  .home-page .workforceBadge {
    position: absolute;
    left: 0;
    bottom: 8px;
    top: auto;
    width: 112px;
    height: auto;
    padding: 12px 8px;
    border-radius: 8px;
    gap: 4px;
    z-index: 3;
  }

  .home-page .workforceBadgeIcon {
    width: 28px;
    height: 28px;
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

  .home-page .divisionCard {
    padding: 20px 18px 24px;
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

  .home-page .divisionHoverOverlay {
    padding: 24px 18px;
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

  /* Showcase */
  .home-page .showcaseTitle {
    font-size: 24px;
    margin-bottom: 16px;
    white-space: normal;
    text-align: center;
  }

  .home-page .showcaseInfo {
    align-items: center;
    text-align: center;
    width: 100%;
  }

  .home-page .showcaseProductName {
    font-size: 24px;
  }

  .home-page .showcaseDesc {
    font-size: 14.5px;
    line-height: 1.55;
    min-height: auto;
  }

  .home-page .showcaseArrowsRow {
    margin-bottom: 10px;
    gap: 8px;
  }

  .home-page .showcaseArrow {
    width: 40px;
    height: 40px;
  }

  .home-page .showcaseTabs {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 8px;
    padding-bottom: 8px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .home-page .showcaseTabs::-webkit-scrollbar {
    display: none;
  }

  .home-page .showcaseTab {
    padding: 8px 14px;
    font-size: 13.5px;
    flex-shrink: 0;
    white-space: nowrap;
  }

  .home-page .showcaseScreenshotWrap {
    padding: 6px;
    border-radius: 8px;
  }

  /* Reasons */
  .home-page .reasonsGrid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    max-width: 520px;
  }

  .home-page .reasonCard {
    padding: 16px 12px 14px;
    gap: 12px;
  }

  .home-page .reasonIcon {
    width: 42px;
    height: 42px;
  }

  .home-page .reasonLabel {
    font-size: 13.5px;
    line-height: 1.28;
    white-space: normal;
  }

  .home-page .reasonBar {
    height: 3px;
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
    width: 52px;
    height: 40px;
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

  .home-page .ctaCol .blueButton {
    width: 100%;
    max-width: 260px;
    justify-content: center;
    padding: 13px 24px;
  }
}

@media (max-width: 480px) {
  .home-page .heroSlides {
    height: calc(100vh - 80px);
    height: calc(100svh - 80px);
    height: calc(100dvh - 80px);
    min-height: 480px;
  }

  .home-page .heroSlideContent {
    padding: 20px 16px 310px;
  }

  .home-page .heroTitle {
    font-size: 26px;
    line-height: 1.22;
    margin: 0 auto 14px;
    max-width: 320px;
  }

  .home-page .heroText {
    font-size: 14.5px;
    line-height: 1.48;
    margin: 0 auto 24px;
    max-width: 300px;
  }

  .home-page .heroCta {
    padding: 12px 24px;
    font-size: 14px;
  }

  .home-page .heroDots {
    bottom: 18px;
  }

  .home-page .heroStatsWrap {
    margin: 20px auto 0;
    padding: 0 12px;
  }

  .home-page .heroStats {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px 10px;
    padding: 16px 12px;
  }

  .home-page .heroStatValue {
    font-size: 20px;
  }

  .home-page .heroStatLabel {
    font-size: 12px;
  }

  .home-page .trustedSlide {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px 12px;
  }

  .home-page .reasonsGrid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .home-page .reasonLabel {
    font-size: 12.5px;
  }

  .home-page .reasonCard {
    padding: 14px 8px 12px;
  }

  .home-page .workforceMedia {
    height: 260px;
  }

  .home-page .workforceMediaMain {
    height: 170px;
  }

  .home-page .workforceMediaOverlay {
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

export default function LandingPage() {
  const [heroIndex, setHeroIndex] = useState(0);
  // Slides run [lastPageClone, ...realPages, firstPageClone]; index 1 is the
  // real first page, so the slider always starts there.
  const [trustedIndex, setTrustedIndex] = useState(1);
  const [trustedInstant, setTrustedInstant] = useState(false);
  const [trustedDragging, setTrustedDragging] = useState(false);
  const trustedTrackRef = useRef(null);
  const trustedInteractingRef = useRef(false);
  const trustedResumeTimeoutRef = useRef(null);
  const trustedDragRef = useRef({ active: false, startX: 0, deltaX: 0 });
  const [activeTab, setActiveTab] = useState(SHOWCASE_TABS[0]);
  const [activeDivision, setActiveDivision] = useState(null);
  const divisionCardRefs = useRef([]);
  const [testimonialStart, setTestimonialStart] = useState(0);
  const [expandedTestimonials, setExpandedTestimonials] = useState({});
  const [trackShifted, setTrackShifted] = useState(false);
  const [trackInstant, setTrackInstant] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const testimonialBusyRef = useRef(false);
  const mobileTrackRef = useRef(null);
  const mobileInteractingRef = useRef(false);
  const mobileResumeTimeoutRef = useRef(null);
  const mobileScrollDebounceRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // The track always renders 4 consecutive cards (3 visible + 1 waiting just
  // off-screen to the right) so advancing can slide the whole row left.
  const trackTestimonials = [0, 1, 2, 3].map((offset) => {
    const index = (testimonialStart + offset) % TESTIMONIALS.length;
    return { ...TESTIMONIALS[index], index };
  });

  const toggleTestimonial = (index) => {
    setExpandedTestimonials((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const slideOnce = (onDone) => {
    setTrackInstant(false);
    setTrackShifted(true);
    setTimeout(() => {
      setTrackInstant(true);
      setTestimonialStart((current) => (current + 1) % TESTIMONIALS.length);
      setTrackShifted(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTrackInstant(false));
      });
      onDone && onDone();
    }, 520);
  };

  const advanceTestimonials = (steps) => {
    if (steps <= 0 || testimonialBusyRef.current) return;
    testimonialBusyRef.current = true;
    let remaining = steps;
    const step = () => {
      remaining -= 1;
      slideOnce(() => {
        if (remaining > 0) {
          setTimeout(step, 40);
        } else {
          testimonialBusyRef.current = false;
        }
      });
    };
    step();
  };

  const goToTestimonial = (targetIndex) => {
    if (isMobile) {
      scrollMobileTestimonialTo(targetIndex);
      return;
    }
    const steps =
      (targetIndex - testimonialStart + TESTIMONIALS.length) % TESTIMONIALS.length;
    advanceTestimonials(steps);
  };

  // Desktop-only sliding-track auto-advance — untouched, just paused while
  // the mobile swipeable slider (below) is the one on screen.
  useEffect(() => {
    if (isMobile) return;
    const timer = setInterval(() => {
      advanceTestimonials(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [isMobile]);

  /* ----------------------------------------------------------------
     Mobile testimonials — a real, finger-swipeable horizontal slider
     (native overflow-x scroll + scroll-snap), completely separate from
     the desktop sliding-track above. Auto-advances every 2.4s and loops
     forever, but backs off the moment the visitor touches/drags it.
     ---------------------------------------------------------------- */
  const scrollMobileTestimonialTo = (index) => {
    const track = mobileTrackRef.current;
    const card = track && track.children[index];
    if (!track || !card) return;
    // Scroll only the horizontal track itself — never scrollIntoView, which
    // would also scroll the whole PAGE vertically to reveal an off-screen
    // card (e.g. jumping straight to this section right after page load).
    const targetLeft = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
    track.scrollTo({ left: targetLeft, behavior: "smooth" });
  };

  const pauseMobileAutoplay = () => {
    mobileInteractingRef.current = true;
    if (mobileResumeTimeoutRef.current) clearTimeout(mobileResumeTimeoutRef.current);
    mobileResumeTimeoutRef.current = setTimeout(() => {
      mobileInteractingRef.current = false;
    }, 2400);
  };

  const handleMobileTrackScroll = () => {
    mobileInteractingRef.current = true;
    if (mobileScrollDebounceRef.current) clearTimeout(mobileScrollDebounceRef.current);
    mobileScrollDebounceRef.current = setTimeout(() => {
      const track = mobileTrackRef.current;
      if (!track) return;
      const trackRect = track.getBoundingClientRect();
      const center = trackRect.left + trackRect.width / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;
      [...track.children].forEach((child, index) => {
        const rect = child.getBoundingClientRect();
        const distance = Math.abs(rect.left + rect.width / 2 - center);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      setTestimonialStart(closestIndex);
      pauseMobileAutoplay();
    }, 120);
  };

  useEffect(() => {
    if (!isMobile) return;
    const timer = setInterval(() => {
      if (mobileInteractingRef.current) return;
      setTestimonialStart((current) => {
        const next = (current + 1) % TESTIMONIALS.length;
        scrollMobileTestimonialTo(next);
        return next;
      });
    }, 2400);
    return () => clearInterval(timer);
  }, [isMobile]);

  const activeProduct =
    SHOWCASE_PRODUCTS.find((p) => p.name === activeTab) || SHOWCASE_PRODUCTS[0];

  const handlePrevProduct = () => {
    const currentIndex = SHOWCASE_TABS.indexOf(activeTab);
    const prevIndex = (currentIndex - 1 + SHOWCASE_TABS.length) % SHOWCASE_TABS.length;
    setActiveTab(SHOWCASE_TABS[prevIndex]);
  };

  const handleNextProduct = () => {
    const currentIndex = SHOWCASE_TABS.indexOf(activeTab);
    const nextIndex = (currentIndex + 1) % SHOWCASE_TABS.length;
    setActiveTab(SHOWCASE_TABS[nextIndex]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  /* ----------------------------------------------------------------
     Trusted-by logos slider — 6 logos per slide, auto-advances every
     2.4s, loops forever in both directions, and can also be dragged
     (mouse/touch) or jumped to directly via the dot indicators.
     ---------------------------------------------------------------- */
  const trustedPageCount = TRUSTED_PAGES.length;
  const trustedActivePage =
    ((trustedIndex - 1) % trustedPageCount + trustedPageCount) % trustedPageCount;

  const pauseTrustedAutoplay = () => {
    trustedInteractingRef.current = true;
    if (trustedResumeTimeoutRef.current) clearTimeout(trustedResumeTimeoutRef.current);
    trustedResumeTimeoutRef.current = setTimeout(() => {
      trustedInteractingRef.current = false;
    }, 2400);
  };

  const goToTrustedPage = (page) => {
    pauseTrustedAutoplay();
    setTrustedInstant(false);
    setTrustedIndex(page + 1);
  };

  const handleTrustedPointerDown = (event) => {
    pauseTrustedAutoplay();
    trustedDragRef.current = { active: true, startX: event.clientX, deltaX: 0 };
    setTrustedDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handleTrustedPointerMove = (event) => {
    const drag = trustedDragRef.current;
    const track = trustedTrackRef.current;
    if (!drag.active || !track) return;
    drag.deltaX = event.clientX - drag.startX;
    // Percent is relative to the track's OWN (much wider) box, so a full
    // visible-width drag must only cover one slide's basis share of it.
    const width = track.parentElement?.clientWidth || 1;
    const percent = (drag.deltaX / width) * TRUSTED_SLIDE_BASIS;
    track.style.transform = `translateX(calc(-${trustedIndex * TRUSTED_SLIDE_BASIS}% + ${percent}%))`;
  };

  const endTrustedDrag = () => {
    const drag = trustedDragRef.current;
    if (!drag.active) return;
    drag.active = false;
    setTrustedDragging(false);
    const track = trustedTrackRef.current;
    const width = track?.parentElement?.clientWidth || track?.clientWidth || 1;
    if (track) track.style.transform = "";
    const threshold = width * 0.12;
    setTrustedInstant(false);
    if (drag.deltaX <= -threshold) {
      setTrustedIndex((current) => current + 1);
    } else if (drag.deltaX >= threshold) {
      setTrustedIndex((current) => current - 1);
    }
    pauseTrustedAutoplay();
  };

  const handleTrustedPointerLeave = () => {
    if (trustedDragRef.current.active) endTrustedDrag();
  };

  useEffect(() => {
    if (!isMobile) return;
    const timer = setInterval(() => {
      if (trustedInteractingRef.current) return;
      setTrustedInstant(false);
      setTrustedIndex((current) => current + 1);
    }, 2400);
    return () => clearInterval(timer);
  }, [isMobile]);

  // Reached the cloned first/last page — snap back to the real one right
  // after the slide transition finishes, with no visible jump.
  useEffect(() => {
    if (trustedIndex === TRUSTED_SLIDES.length - 1) {
      const timer = setTimeout(() => {
        setTrustedInstant(true);
        setTrustedIndex(1);
      }, 620);
      return () => clearTimeout(timer);
    }
    if (trustedIndex === 0) {
      const timer = setTimeout(() => {
        setTrustedInstant(true);
        setTrustedIndex(trustedPageCount);
      }, 620);
      return () => clearTimeout(timer);
    }
  }, [trustedIndex, trustedPageCount]);

  useEffect(() => {
    if (!trustedInstant) return;
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setTrustedInstant(false));
    });
    return () => cancelAnimationFrame(raf);
  }, [trustedInstant]);

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
    <div className="home-page">
      <title>Workforce and Labor Management System - Emsphere</title>
      <meta
        name="description"
        content="Digitalize your HR Processes and Workflow for all environments with our modern HR suites using the latest technology, powered by Emsphere Pune."
      />
      <meta
        name="keywords"
        content="Workforce and Labor Management System, Labor Management System, Contract Labour Management System, CLMS Software, HRMS Software Pune, Payroll Management System, Emsphere Pune, Emsphere Technologies, Visitor Management System, Employee Lifecycle Management, HR Automation Suites, Industrial Relations Software"
      />
      <link rel="canonical" href="https://www.emsphere.com/" />
      <meta property="og:title" content="Workforce and Labor Management System - Emsphere" />
      <meta
        property="og:description"
        content="Digitalize your HR Processes and Workflow for all environments with our modern HR suites using the latest technology, powered by Emsphere Pune."
      />
      <meta property="og:url" content="https://www.emsphere.com/" />
      <meta property="og:site_name" content="Emsphere Technologies" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Workforce and Labor Management System - Emsphere" />
      <meta
        name="twitter:description"
        content="Digitalize your HR Processes and Workflow for all environments with our modern HR suites using the latest technology, powered by Emsphere Pune."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Workforce and Labor Management System - Emsphere",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Cloud, Web",
            url: "https://www.emsphere.com/",
            description:
              "Digitalize your HR Processes and Workflow for all environments with our modern HR suites using the latest technology, powered by Emsphere Pune.",
            provider: {
              "@type": "Organization",
              name: "Emsphere Technologies",
              url: "https://www.emsphere.com/",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Pune",
                addressCountry: "India",
              },
            },
          }),
        }}
      />
      <style>{PAGE_CSS}</style>

      {/* Hero */}
      <section className="hero">
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
              />
              <div className="heroSlideContent">
                <h1 className="heroTitle">{slide.title}</h1>
                <p className="heroText">{slide.text}</p>
                <a className="blueButton heroCta" href="#request-demo">
                  {slide.cta.toUpperCase()}
                  <ArrowRightIcon className="buttonIcon" />
                </a>
              </div>
            </div>
          ))}

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
        </div>

        <div className="heroStatsWrap">
          <div className="heroStats">
            {HERO_STATS.map((stat) => (
              <div className="heroStat" key={stat.label}>
                <span className="heroStatValue">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </span>
                <span className="heroStatLabel">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted by leading organizations */}
      <section className="trusted" id="clients">
        <div className="container">
          <h2 className="trustedTitle reveal-on-scroll reveal-fade-up">
            Trusted By Leading Organizations
          </h2>

          {/* Desktop: Normal static grid with all logos (no slider) as shown in image */}
          <div className="trustedDesktopGrid reveal-on-scroll reveal-fade-up">
            {TRUSTED_LOGOS.map((logo, index) => (
              <div
                key={`trusted-desktop-${logo.alt}-${index}`}
                className="trustedLogoWrap"
              >
                <img
                  className="trustedLogo"
                  src={logo.src.src}
                  alt={logo.alt}
                  width={logo.src.width}
                  height={logo.src.height}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Mobile: Preserved slider with touch/drag and pagination dots */}
          <div className="trustedMobileSlider">
            <div className="trustedSlider">
              <div
                ref={trustedTrackRef}
                className={`trustedTrack ${trustedInstant ? "trustedTrackInstant" : ""} ${
                  trustedDragging ? "trustedTrackDragging" : ""
                }`}
                style={{
                  width: `${TRUSTED_SLIDES.length * 100}%`,
                  transform: `translateX(-${trustedIndex * TRUSTED_SLIDE_BASIS}%)`,
                }}
                onPointerDown={handleTrustedPointerDown}
                onPointerMove={handleTrustedPointerMove}
                onPointerUp={endTrustedDrag}
                onPointerLeave={handleTrustedPointerLeave}
                onPointerCancel={handleTrustedPointerLeave}
              >
                {TRUSTED_SLIDES.map((page, slideIndex) => (
                  <div
                    className="trustedSlide"
                    key={`trusted-slide-${slideIndex}`}
                    style={{ flex: `0 0 ${TRUSTED_SLIDE_BASIS}%` }}
                  >
                    {page.map((logo, logoIndex) => (
                      <img
                        key={`${logo.alt}-${slideIndex}-${logoIndex}`}
                        className="trustedLogo"
                        src={logo.src.src}
                        alt={logo.alt}
                        width={logo.src.width}
                        height={logo.src.height}
                        loading="lazy"
                        draggable={false}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="trustedDots">
              {TRUSTED_PAGES.map((_, page) => (
                <button
                  key={`trusted-dot-${page}`}
                  type="button"
                  aria-label={`Show logos, page ${page + 1}`}
                  className={`trustedDot ${page === trustedActivePage ? "trustedDotActive" : ""}`}
                  onClick={() => goToTrustedPage(page)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhance Workforce and Labor Management */}
      <section className="workforce">
        <div className="container">
          <div className="workforceGrid">
            <div className="workforceMedia reveal-on-scroll reveal-fade-right">
              <img
                className="workforceMediaMain"
                src={workforceBuilding.src}
                alt="Emsphere Technologies corporate office building"
                width={workforceBuilding.width}
                height={workforceBuilding.height}
                loading="lazy"
              />
              <img
                className="workforceMediaOverlay"
                src={workforceEngineers.src}
                alt="Site engineers reviewing workforce management plans"
                width={workforceEngineers.width}
                height={workforceEngineers.height}
                loading="lazy"
              />
              <div className="workforceBadge">
                <img
                  className="workforceBadgeIcon"
                  src={iconExperienceBadge.src}
                  alt=""
                  aria-hidden="true"
                  width={iconExperienceBadge.width}
                  height={iconExperienceBadge.height}
                />
                <span className="workforceBadgeNumber">15+</span>
                <span className="workforceBadgeLabel">Years of Experience</span>
              </div>
            </div>

            <div className="workforceContent reveal-on-scroll reveal-fade-left">
              <h2 className="workforceTitle">
                {"Enhance Workforce and Labor\nManagement with Our Solutions"}
              </h2>
              <p className="workforceText">
                {
                  "Digitalize your HR Processes and Workflow for all environments \nwith our modern HR suites using the latest technology."
                }
              </p>

              <div className="workforceFeatures">
                {WORKFORCE_FEATURES.map((feature, index) => (
                  <div
                    className="workforceFeatureCard reveal-on-scroll reveal-fade-up"
                    style={{ transitionDelay: `${index * 80}ms` }}
                    key={feature.label}
                  >
                    <span className="workforceFeatureIconWrap">
                      <img
                        className="workforceFeatureIcon"
                        src={feature.icon.src}
                        alt=""
                        aria-hidden="true"
                        width={feature.icon.width}
                        height={feature.icon.height}
                      />
                    </span>
                    <span className="workforceFeatureLabel">{feature.label}</span>
                  </div>
                ))}
              </div>

              <a className="goldButton" href="#learn-more">
                LEARN MORE
                <ArrowRightIcon className="buttonIcon" />
              </a>
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
                <div className="divisionCardDefault">
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

                <div className="divisionHoverOverlay" aria-hidden="true">
                  <h3 className="divisionHoverTitle">{division.title}</h3>
                  <span className="divisionHoverDivider" />
                  <p className="divisionHoverText">{division.hoverText}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* emHRMS product showcase */}
      <section className="showcase">
        <div className="container">
          <div className="showcaseGrid">
            {/* Left Column: Heading + Active Product Info */}
            <div className="showcaseLeft reveal-on-scroll reveal-fade-right">
              <h2 className="showcaseTitle">{"Serving the HR and \nIndustrial Relations"}</h2>

              <div className="showcaseInfo" key={activeProduct.id}>
                <span className="showcaseIcon">
                  <img
                    src={iconEmhrms.src}
                    alt=""
                    aria-hidden="true"
                    width={iconEmhrms.width}
                    height={iconEmhrms.height}
                  />
                </span>
                <h3 className="showcaseProductName">{activeProduct.name}</h3>
                <p className="showcaseDesc">{activeProduct.desc}</p>
                <a className="goldButton" href={activeProduct.ctaLink}>
                  KNOW MORE
                  <ArrowRightIcon className="buttonIcon" />
                </a>
              </div>
            </div>

            {/* Right Column: Arrows + Product Tabs + Dashboard Screenshot */}
            <div className="showcaseRight reveal-on-scroll reveal-fade-left">
              <div className="showcaseArrowsRow">
                <button
                  type="button"
                  className="showcaseArrow"
                  aria-label="Previous product"
                  onClick={handlePrevProduct}
                >
                  <ChevronIcon direction="left" />
                </button>
                <button
                  type="button"
                  className="showcaseArrow"
                  aria-label="Next product"
                  onClick={handleNextProduct}
                >
                  <ChevronIcon direction="right" />
                </button>
              </div>

              <div className="showcaseTabs">
                {SHOWCASE_TABS.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    className={`showcaseTab ${tab === activeTab ? "showcaseTabActive" : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="showcaseScreenshotWrap">
                <img
                  className="showcaseScreenshot"
                  src={emhrmsDashboard.src}
                  alt="emHRMS dashboard showing employee lifecycle and HR process automation"
                  width={emhrmsDashboard.width}
                  height={emhrmsDashboard.height}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Change from legacy system */}
      <section className="reasons">
        <div className="container">
          <div className="sectionHead reveal-on-scroll reveal-fade-up">
            <h2 className="sectionTitle">Change From legacy system</h2>
            <p className="sectionSubtitle">Reasons why enterprises change to emSphere.</p>
          </div>
          <div className="reasonsGrid">
            {REASONS.map((reason, index) => (
              <div
                className="reasonCard reveal-on-scroll reveal-fade-up"
                style={{ transitionDelay: `${(index % 4) * 80}ms` }}
                key={reason.label}
              >
                <img
                  className="reasonIcon"
                  src={reason.icon.src}
                  alt=""
                  aria-hidden="true"
                  width={reason.icon.width}
                  height={reason.icon.height}
                />
                <span className="reasonLabel">{reason.label}</span>
                <span className="reasonBar" />
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

          <div
            className="testimonialsViewport reveal-on-scroll reveal-fade-up"
            style={{ transitionDelay: "120ms" }}
          >
            <div
              className={`testimonialsTrack ${trackShifted ? "testimonialsTrackShifted" : ""} ${
                trackInstant ? "testimonialsTrackInstant" : ""
              }`}
            >
              {trackTestimonials.map((testimonial, position) => {
                const isExpanded = !!expandedTestimonials[testimonial.index];
                return (
                  <article
                    key={`${testimonial.index}-${position}`}
                    className={`testimonialCard ${position === 1 ? "testimonialFeatured" : ""}`}
                  >
                    <div className="testimonialBody">
                      <h3 className="testimonialCompany">{testimonial.company}</h3>
                      <p
                        className={`testimonialQuote ${
                          isExpanded ? "testimonialQuoteExpanded" : ""
                        }`}
                      >
                        {testimonial.quote}
                      </p>
                      <button
                        type="button"
                        className="testimonialReadMore"
                        onClick={() => toggleTestimonial(testimonial.index)}
                      >
                        {isExpanded ? "Read Less" : "Read More..."}
                      </button>
                    </div>
                    <div className="testimonialFooter">
                      <div className="testimonialLogoWrap">
                        <img
                          className="testimonialLogo"
                          src={testimonial.logo.src}
                          alt={`${testimonial.company} logo`}
                          width={testimonial.logo.width}
                          height={testimonial.logo.height}
                          loading="lazy"
                        />
                      </div>
                      <div className="testimonialWho">
                        <span className="testimonialName">{testimonial.name}</span>
                        <span className="testimonialRole">{testimonial.role}</span>
                        <div className="testimonialStars">
                          {Array.from({ length: testimonial.rating || 5 }).map((_, index) => (
                            <StarIcon key={index} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Mobile-only: a real swipeable slider (native scroll + snap),
              separate from the desktop sliding track above. */}
          <div
            className="testimonialsMobileTrack"
            ref={mobileTrackRef}
            onScroll={handleMobileTrackScroll}
            onTouchStart={pauseMobileAutoplay}
            onMouseDown={pauseMobileAutoplay}
          >
            {TESTIMONIALS.map((testimonial, index) => {
              const isExpanded = !!expandedTestimonials[index];
              return (
                <article
                  key={testimonial.company}
                  className={`testimonialCard testimonialMobileCard ${
                    index === testimonialStart ? "testimonialFeatured" : ""
                  }`}
                >
                  <div className="testimonialBody">
                    <h3 className="testimonialCompany">{testimonial.company}</h3>
                    <p
                      className={`testimonialQuote ${
                        isExpanded ? "testimonialQuoteExpanded" : ""
                      }`}
                    >
                      {testimonial.quote}
                    </p>
                    <button
                      type="button"
                      className="testimonialReadMore"
                      onClick={() => toggleTestimonial(index)}
                    >
                      {isExpanded ? "Read Less" : "Read More..."}
                    </button>
                  </div>
                  <div className="testimonialFooter">
                    <div className="testimonialLogoWrap">
                      <img
                        className="testimonialLogo"
                        src={testimonial.logo.src}
                        alt={`${testimonial.company} logo`}
                        width={testimonial.logo.width}
                        height={testimonial.logo.height}
                        loading="lazy"
                      />
                    </div>
                    <div className="testimonialWho">
                      <span className="testimonialName">{testimonial.name}</span>
                      <span className="testimonialRole">{testimonial.role}</span>
                      <div className="testimonialStars">
                        {Array.from({ length: testimonial.rating || 5 }).map((_, starIndex) => (
                          <StarIcon key={starIndex} />
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="testimonialsDots">
            {TESTIMONIALS.map((testimonial, index) => (
              <button
                key={testimonial.company}
                type="button"
                aria-label={`Show testimonial from ${testimonial.company}`}
                className={`testimonialsDot ${
                  index === testimonialStart ? "testimonialsDotActive" : ""
                }`}
                onClick={() => goToTestimonial(index)}
              />
            ))}
          </div>
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
                  "HR Teams stay updated with the latest \nHRTech trends, insights, and \ninnovations through our expert blogs."
                }
              </p>
              <a className="blueButton" href="/blog/">
                DISCOVER MORE
                <ArrowRightIcon className="buttonIcon" />
              </a>
              <div className="blogsArrows">
                <button type="button" className="blogsArrow" aria-label="Previous blog post">
                  <ChevronIcon direction="left" />
                </button>
                <span className="blogsArrowDivider" />
                <button type="button" className="blogsArrow" aria-label="Next blog post">
                  <ChevronIcon direction="right" />
                </button>
              </div>
            </div>

            <div className="blogsGrid">
              {BLOG_POSTS.map((post, index) => (
                <article
                  className="blogCard reveal-on-scroll reveal-fade-up"
                  style={{ transitionDelay: `${index * 120}ms` }}
                  key={post.title}
                >
                  <img
                    className="blogImage"
                    src={post.image.src}
                    alt={post.title.replace("\n", " ")}
                    width={post.image.width}
                    height={post.image.height}
                    loading="lazy"
                  />
                  <div className="blogBody">
                    <h3 className="blogTitle">{post.title}</h3>
                    <p className="blogExcerpt">{post.excerpt}</p>
                    <span className="learnMore">
                      Learn More
                      <ArrowRightIcon />
                    </span>
                  </div>
                </article>
              ))}
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
              <a className="blueButton" href="#talk-to-sale">
                Talk to Sale
              </a>
            </div>
            <span className="ctaDivider" />
            <div className="ctaCol reveal-on-scroll reveal-fade-left">
              <h2 className="ctaTitle">Want to know more?</h2>
              <a className="blueButton" href="#book-demo">
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
