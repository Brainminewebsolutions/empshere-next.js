import ClmsModulePage, { buildModuleMetadata } from "@/components/ClmsModulePage";
import {
  ArrowsLeftRight,
  Bell,
  ClipboardText,
  Coins,
  Eye,
  FileMagnifyingGlass,
  FileText,
  FolderOpen,
  Gauge,
  Gavel,
  ListMagnifyingGlass,
  ShieldCheck,
  ShieldWarning,
  Sparkle,
  Stamp,
} from "@phosphor-icons/react/ssr";

/* --------------------------------------------------------------------
   Images — app/images/clms-compliances-statutory-reports
   TODO: temporary images from other product pages — replace with generated
   images for this module (Figma AI credit limit was reached).
   -------------------------------------------------------------------- */
import heroImg from "../images/contract-labour-management-system-software/compliance-automation-digital-checklist.webp";
import statutoryReportsImg from "../images/payroll-management-solution/salary-monthly-reconciliation-reports.webp";
import complianceChecksImg from "../images/contract-labour-management-system-software/dashboard-contractor-liability-document-status.webp";
import complianceDashboardImg from "../images/contract-labour-management-system-software/dashboard-contractor-wise-headcount-overtime.webp";

// Title and description are the page's Rank Math values on the current site.
// TODO: replace with the confirmed production domain before deploying (same as app/layout.js).
const PAGE_URL = "https://www.emsphere.com/clms-compliances-statutory-reports/";

export const metadata = buildModuleMetadata({
  title: "Compliance Management System & CLMS Statutory Reports",
  description:
    "Streamline compliance with Emsphere's Compliance Management System. Automate CLMS statutory reports effortlessly. Ensure accuracy and stay audit-ready.",
  url: PAGE_URL,
  image: heroImg.src,
});

const CONTENT = {
  pageUrl: PAGE_URL,
  breadcrumbName: "Compliances & Statutory Reports",
  eyebrow: "CLMS | COMPLIANCES & STATUTORY REPORTS",
  heading: "Labour Law Compliances & Statutory Reports Module",
  compactHeading: true,
  intro:
    "Use of AI that automates compliance processes, ensuring adherence to legal standards while reducing administrative overhead and mitigating risks",
  hero: {
    image: heroImg,
    fit: "contain",
    alt: "Digital compliance checklist with ticked items illustrating automated labour law compliance",
    statusCard: {
      label: "AI Validation",
      icon: Sparkle,
      items: [{ text: "UAN validated" }, { text: "ESIC no. matched" }, { text: "PF amount mismatch", pending: true }],
    },
    highlightCard: {
      label: "Statutory Reports",
      icon: FileText,
      tileIcon: Stamp,
      title: "CLRA & BOCW",
      subtitle: "State wise formats ready",
    },
  },
  benefits: {
    heading: "CLMS Compliances & Statutory Reports Module",
    items: [
      {
        title: "PF ESIC Auto Validation",
        text: "Validate the missing UAN, ESIC no. & amount mismatch automatically using AI",
        icon: Sparkle,
      },
      {
        title: "Reduced Risk",
        text: "Minimize the risk of legal penalties and fines with up-to-date compliance management.",
        icon: ShieldCheck,
      },
      {
        title: "Real-Time Alerts",
        text: "Receive instant notifications about compliance changes and required actions.",
        icon: Bell,
      },
      {
        title: "Centralized Documentation",
        text: "Store and manage all compliance-related documents in one secure location.",
        icon: FolderOpen,
      },
      {
        title: "Cost Savings",
        text: "Reduce the need for external legal consultations and compliance management services.",
        icon: Coins,
      },
      {
        title: "Improved Transparency",
        text: "Increase visibility into compliance status and history for better decision-making.",
        icon: Eye,
      },
    ],
  },
  features: {
    heading: "CLMS Compliance & Statutory Reports Module",
    showcases: [
      {
        title: "Automated Compliance Reports",
        text: "State wise legal statutory report formats are readily generated from the software including CLRA, BOCW etc",
        image: statutoryReportsImg,
        alt: "Monthly reconciliation reports and summary charts generated from the software",
        points: [
          { text: "State wise statutory formats", icon: Stamp },
          { text: "CLRA, BOCW & more", icon: Gavel },
        ],
      },
      {
        title: "Contractor Compliances Checks",
        text: "Automatically identify compliance violations using AI for PF, ESIC amount mismatches",
        image: complianceChecksImg,
        fit: "contain",
        alt: "Contractor dashboard showing liability and document status used to identify compliance gaps",
        points: [
          { text: "AI-based violation detection", icon: Sparkle },
          { text: "PF & ESIC amount mismatches", icon: ShieldWarning },
        ],
      },
      {
        title: "Compliance Dashboard",
        text: "Monitor contractor compliance status with a detailed dashboard with document wise & month wise compliance summary.",
        image: complianceDashboardImg,
        fit: "contain",
        alt: "Contractor-wise dashboard with headcount and overtime charts for monitoring compliance status",
        points: [
          { text: "Document wise summary", icon: FileMagnifyingGlass },
          { text: "Month wise summary", icon: Gauge },
        ],
      },
    ],
    cards: [
      {
        title: "Regulatory Updates",
        text: "Real-time updates on changes to labour laws and regulations to ensure ongoing compliance with the latest legal requirements.",
        icon: Gavel,
      },
      {
        title: "Audit Trails",
        text: "Comprehensive tracking of compliance activities and changes, providing a clear audit trail for regulatory reviews and inspections.",
        icon: ListMagnifyingGlass,
      },
      {
        title: "Synchronize Compliance data",
        text: "Seamless integration with HR management systems to synchronize compliance data and streamline processes.",
        icon: ArrowsLeftRight,
      },
    ],
  },
  workflow: {
    heading: "AI-driven compliance, end to end",
    steps: [
      { title: "Collect", text: "Contractor PF, ESIC and compliance documents gathered.", icon: FolderOpen },
      { title: "Validate", text: "AI flags missing UAN, ESIC no. and amount mismatches.", icon: Sparkle },
      { title: "Alert", text: "Instant notifications for violations and required actions.", icon: Bell },
      { title: "Generate", text: "State wise statutory reports including CLRA and BOCW.", icon: ClipboardText },
      { title: "Audit", text: "Clear audit trail for regulatory reviews and inspections.", icon: ListMagnifyingGlass },
    ],
  },
};

export default function ClmsCompliancesStatutoryReportsPage() {
  return <ClmsModulePage {...CONTENT} />;
}
