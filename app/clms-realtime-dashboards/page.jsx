import ClmsModulePage, { buildModuleMetadata } from "@/components/ClmsModulePage";
import {
  ArrowsCounterClockwise,
  BellRinging,
  Broadcast,
  ChartPieSlice,
  CheckCircle,
  Eye,
  Gauge,
  Layout,
  Lock,
  Pulse,
  Scales,
  ShieldWarning,
  SquaresFour,
  Target,
  UsersThree,
} from "@phosphor-icons/react/ssr";

/* --------------------------------------------------------------------
   Images — app/images/clms-realtime-dashboards
   TODO: temporary images from other product pages — replace with generated
   images for this module (Figma AI credit limit was reached).
   -------------------------------------------------------------------- */
import heroImg from "../images/headcount-management-software/hero-connected-employees-headcount-dashboard.webp";
import customizableImg from "../images/workforce-management-system/why-emworkforce-centralized-management-dashboard.webp";
import syncImg from "../images/headcount-management-software/feature-realtime-floor-zone-dashboard.webp";
import complianceMonitoringImg from "../images/headcount-management-software/feature-red-zone-sms-email-alerts.webp";

// Title and description are the page's Rank Math values on the current site.
// TODO: replace with the confirmed production domain before deploying (same as app/layout.js).
const PAGE_URL = "https://www.emsphere.com/clms-realtime-dashboards/";

export const metadata = buildModuleMetadata({
  title: "Real Time Dashboards Module | Emsphere Technologies",
  description:
    "Transform your data with Emsphere Technologies' Real-Time Dashboards Module. Get instant insights and drive decisions with live data updates.",
  url: PAGE_URL,
  image: heroImg.src,
});

const CONTENT = {
  pageUrl: PAGE_URL,
  breadcrumbName: "Real Time Dashboards",
  eyebrow: "CLMS | REAL TIME DASHBOARDS",
  heading: "Real Time Dashboards Module",
  compactHeading: true,
  intro:
    "Invaluable benefits for other companies by providing seamless, up-to-the-minute tracking of employee attendance and ensuring adherence to regulatory and internal policies.",
  hero: {
    image: heroImg,
    alt: "Connected employee headcount dashboard showing live attendance figures across locations",
    statusCard: {
      label: "Live Status",
      icon: Broadcast,
      items: [{ text: "Attendance synced" }, { text: "Compliance monitored" }, { text: "1 violation alert", pending: true }],
    },
    highlightCard: {
      label: "Dashboard",
      icon: Gauge,
      tileIcon: ChartPieSlice,
      title: "Up-to-the-minute",
      subtitle: "Attendance & compliance",
    },
  },
  benefits: {
    heading: "CLMS Real Time Dashboards Module",
    items: [
      {
        title: "Enhanced Accuracy",
        text: "Reduces manual errors by automating attendance tracking and compliance monitoring.",
        icon: Target,
      },
      {
        title: "Real-Time Monitoring",
        text: "Provides live updates on attendance and compliance status.",
        icon: Pulse,
      },
      {
        title: "Increased Transparency",
        text: "Offers clear visibility into attendance patterns and compliance status.",
        icon: Eye,
      },
      {
        title: "Efficient Compliance Management",
        text: "Monitors adherence to labor laws, safety regulations, and contract terms.",
        icon: Scales,
      },
      {
        title: "Reduced Administrative Burden",
        text: "Automates routine tasks related to attendance tracking and compliance management.",
        icon: CheckCircle,
      },
      {
        title: "Enhanced Security",
        text: "Secures attendance and compliance data with advanced security features.",
        icon: Lock,
      },
    ],
  },
  features: {
    heading: "CLMS Real Time Dashboards Module",
    showcases: [
      {
        title: "Customizable Dashboards",
        text: "Provides the ability to personalize dashboard views to focus on relevant metrics, reports, and data for different roles or departments. This customization allows users to streamline their workflow and access the information most pertinent to their needs.",
        image: customizableImg,
        alt: "Centralized workforce management dashboard with widgets for key metrics and reports",
        points: [
          { text: "Role & department views", icon: UsersThree },
          { text: "Personalized metrics & reports", icon: Layout },
        ],
      },
      {
        title: "Real-Time Data Synchronization",
        text: "Ensures that all attendance data is updated instantly across the dashboard and integrated systems. This real-time synchronization provides accurate and current information for effective decision-making and management",
        image: syncImg,
        alt: "Real-time floor and zone dashboard showing live employee counts by area",
        points: [
          { text: "Instant attendance updates", icon: ArrowsCounterClockwise },
          { text: "Integrated systems in sync", icon: SquaresFour },
        ],
      },
      {
        title: "Real time Compliance Dashboard and Monitoring",
        text: "This Module Provides Real time Compliance Summary for Attendance, Contractor violations Dashboard. The Module also provides real time email alerts if any compliance related violation triggers are observed.",
        image: complianceMonitoringImg,
        alt: "Alert dashboard sending SMS and email notifications when a violation is detected",
        points: [
          { text: "Contractor violations dashboard", icon: ShieldWarning },
          { text: "Real time email alerts", icon: BellRinging },
        ],
      },
    ],
  },
  workflow: {
    heading: "Live insight, end to end",
    steps: [
      { title: "Capture", text: "Attendance data captured from every location.", icon: UsersThree },
      { title: "Sync", text: "Data updated instantly across integrated systems.", icon: ArrowsCounterClockwise },
      { title: "Visualize", text: "Personalized dashboards for each role and department.", icon: Layout },
      { title: "Monitor", text: "Compliance summary for attendance and contractors.", icon: Gauge },
      { title: "Alert", text: "Real time email alerts on compliance violations.", icon: BellRinging },
    ],
  },
};

export default function ClmsRealtimeDashboardsPage() {
  return <ClmsModulePage {...CONTENT} />;
}
