import ClmsModulePage, { buildModuleMetadata } from "@/components/ClmsModulePage";
import {
  Buildings,
  ChartBar,
  ChartLineUp,
  ClipboardText,
  Coins,
  Fingerprint,
  Lightning,
  PresentationChart,
  Strategy,
  Target,
  TreeStructure,
  TrendUp,
  UsersThree,
} from "@phosphor-icons/react/ssr";

/* --------------------------------------------------------------------
   Images — app/images/clms-manpower-planning
   TODO: temporary images from other product pages — replace with generated
   images for this module (Figma AI credit limit was reached).
   -------------------------------------------------------------------- */
import heroImg from "../images/workforce-management-system/hero-workforce-global-enterprise-interface.webp";
import dataInsightsImg from "../images/workforce-management-system/consulting-session-sme-workforce-analytics.webp";
import requisitionImg from "../images/contract-labour-management-system-software/dashboard-department-wise-headcount-overtime.webp";

// Title and description are the page's Rank Math values on the current site.
// TODO: replace with the confirmed production domain before deploying (same as app/layout.js).
const PAGE_URL = "https://www.emsphere.com/clms-manpower-planning/";

export const metadata = buildModuleMetadata({
  title: "Manpower Planning & Analytics Module | Emsphere Technology",
  description:
    "Optimize workforce management with Emsphere's Manpower Planning & Analytics Module. Enhance efficiency and strategic planning for your business.",
  url: PAGE_URL,
  image: heroImg.src,
});

const CONTENT = {
  pageUrl: PAGE_URL,
  breadcrumbName: "Manpower Planning",
  eyebrow: "CLMS | MANPOWER PLANNING & ANALYTICS",
  heading: "Manpower Planning & Analytics Module",
  compactHeading: true,
  // The live page lists Features before Benefits.
  featuresFirst: true,
  intro:
    "This module empowers businesses to strategically plan, budget and analyze workforce requirements, ensuring optimal labor allocation, productivity, and cost efficiency.",
  hero: {
    image: heroImg,
    alt: "Enterprise workforce interface with analytics panels for planning manpower across locations",
    statusCard: {
      label: "Manpower Plan",
      icon: Strategy,
      items: [{ text: "Requisition raised" }, { text: "Approval complete" }, { text: "Allocation in progress", pending: true }],
    },
    highlightCard: {
      label: "Analytics",
      icon: ChartLineUp,
      tileIcon: UsersThree,
      title: "Labour Count & Cost",
      subtitle: "Contractor & department wise",
    },
  },
  benefits: {
    heading: "CLMS Manpower Planning Module",
    items: [
      {
        title: "Increased Efficiency",
        text: "Streamline planning and scheduling processes, reducing downtime and maximizing productivity.",
        icon: Lightning,
      },
      {
        title: "Cost Savings",
        text: "Accurately forecast labor needs to optimize costs, reduce overtime, and avoid unnecessary hiring.",
        icon: Coins,
      },
      {
        title: "Enhanced Decision-Making",
        text: "Utilize insightful, data-driven decisions that perfectly align with your business objectives and maximize labor utilization for optimal results.",
        icon: Target,
      },
      {
        title: "Enhanced Productivity",
        text: "Optimize resource allocation and identify the best use of your workforce to boost overall productivity.",
        icon: TrendUp,
      },
    ],
  },
  features: {
    heading: "CLMS Manpower Planning Module",
    showcases: [
      {
        title: "Real-time Data Insights",
        text: "Access up-to-the-minute data on labor deployment, attendance, and productivity via interactive dashboards.",
        image: dataInsightsImg,
        alt: "Workforce analytics session reviewing labour deployment and productivity data",
        points: [
          { text: "Labor deployment & attendance", icon: UsersThree },
          { text: "Interactive dashboards", icon: PresentationChart },
        ],
      },
      {
        // Copy as on the live site — this card and the next one share the "Comprehensive Reporting" title.
        title: "Comprehensive Reporting",
        text: "Requisition, Approval & Allocation of the manpower contractor wise, department wise fulfilment requirements to track labour count & costs.",
        image: requisitionImg,
        fit: "contain",
        alt: "Department-wise headcount and overtime dashboard used to track labour count and costs",
        points: [
          { text: "Requisition, approval & allocation", icon: TreeStructure },
          { text: "Contractor & department wise", icon: Buildings },
        ],
      },
    ],
    cards: [
      {
        title: "Comprehensive Reporting",
        text: "Generate detailed reports on labor performance, compliance, and financial metrics, customizable to your business needs.",
        icon: ChartBar,
      },
      {
        title: "Biometric Integration",
        // TODO: live site repeats the reporting copy here — confirm the intended Biometric Integration text.
        text: "Generate detailed reports on labor performance, compliance, and financial metrics, customizable to your business needs.",
        icon: Fingerprint,
      },
    ],
  },
  workflow: {
    heading: "Plan, allocate and analyse, end to end",
    steps: [
      { title: "Plan", text: "Forecast labour needs and budget.", icon: Strategy },
      { title: "Requisition", text: "Raise manpower requirements contractor and department wise.", icon: ClipboardText },
      { title: "Approve", text: "Requisitions approved before allocation.", icon: Target },
      { title: "Allocate", text: "Manpower allocated to fulfil requirements.", icon: UsersThree },
      { title: "Analyse", text: "Track labour count and costs on live dashboards.", icon: ChartLineUp },
    ],
  },
};

export default function ClmsManpowerPlanningPage() {
  return <ClmsModulePage {...CONTENT} />;
}
