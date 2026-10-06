import ClmsModulePage, { buildModuleMetadata } from "@/components/ClmsModulePage";
import {
  BellRinging,
  ChartBar,
  ChartLineUp,
  FileText,
  FolderOpen,
  IdentificationCard,
  Lightning,
  Path,
  Prohibit,
  Star,
  UserCheck,
  UserCircleCheck,
  UserPlus,
} from "@phosphor-icons/react/ssr";

/* --------------------------------------------------------------------
   Images — app/images/clms-contractor-contract-employee-masters
   -------------------------------------------------------------------- */
import heroImg from "../images/clms-contractor-contract-employee-masters/hero-contract-employee-master-profile.webp";
import aadhaarBlacklistImg from "../images/clms-contractor-contract-employee-masters/aadhaar-blacklist-check-security-desk.webp";
// TODO: temporary images from other product pages — replace with generated images for this module.
import performanceImg from "../images/workforce-management-system/consulting-session-analytics-tablet-review.webp";
import trajectoryImg from "../images/contract-labour-management-system-software/dashboard-contractor-liability-document-status.webp";

// Title and description are the page's Rank Math values on the current site.
// NOTE: the live site serves this page at /clms-contract-employee-masters/ — add a redirect when migrating.
// TODO: replace with the confirmed production domain before deploying (same as app/layout.js).
const PAGE_URL = "https://www.emsphere.com/clms-contractor-contract-employee-masters/";

export const metadata = buildModuleMetadata({
  title: "Contractor & Contract Employee Master Module",
  description:
    "Contractor & Contract Employee Master Module centralizes and simplifies the management of contractor and contract employee information.",
  url: PAGE_URL,
  image: heroImg.src,
});

const CONTENT = {
  pageUrl: PAGE_URL,
  breadcrumbName: "Contractor & Contract Employee Masters",
  eyebrow: "CLMS | CONTRACTOR & CONTRACT EMPLOYEE MASTERS",
  heading: "Contractor & Contract Employee Master Module",
  compactHeading: true,
  intro:
    "This module centralizes and simplifies the management of contractor and contract employee information, ensuring efficient and compliant workforce administration.",
  hero: {
    image: heroImg,
    alt: "Desktop monitor showing a contract employee master profile with masked Aadhaar number, contractor and department details, a blacklist check clear badge and uploaded documents",
    statusCard: {
      label: "Employee Checks",
      icon: UserCheck,
      items: [{ text: "Aadhaar verified" }, { text: "Not blacklisted" }, { text: "Contract renewal due", pending: true }],
    },
    highlightCard: {
      label: "Employee Master",
      icon: IdentificationCard,
      tileIcon: Path,
      title: "Trajectory Linked",
      subtitle: "Via Aadhaar binding",
    },
  },
  benefits: {
    heading: "CLMS Contractor & Contract Emp Master Module",
    items: [
      {
        title: "Efficient Onboarding",
        text: "Speed up the onboarding process with automated workflows, reducing manual effort and errors.",
        icon: UserPlus,
      },
      {
        title: "Efficient Document Handling",
        text: "Simplify document management and retrieval, ensuring compliance and easy access to important information.",
        icon: FileText,
      },
      {
        title: "Proactive Management",
        text: "Stay ahead of contract renewals and compliance deadlines with automated alerts, reducing the risk of missed obligations.",
        icon: Lightning,
      },
      {
        title: "Tailored Insights",
        text: "Obtain customized reports that provide valuable insights into contractor and employee management, supporting strategic decisions.",
        icon: ChartLineUp,
      },
    ],
  },
  features: {
    heading: "CLMS Contractor & Contract Emp Master Module",
    showcases: [
      {
        // Copy as on the live site ("Adhaar").
        title: "Adhaar & blacklisting checks",
        text: "Ensure no blacklisted employees are onboarded. Maintain complete employee trajectory information, disciplinary records, medical & Background verification records",
        image: aadhaarBlacklistImg,
        alt: "Security officer at a factory gate desk verifying a new contract worker, with a screen showing Aadhaar verified, not blacklisted and background verification complete",
        points: [
          { text: "Blacklist screening at onboarding", icon: Prohibit },
          { text: "Medical & background verification records", icon: UserCircleCheck },
        ],
      },
      {
        title: "Contractor Performance Tracking",
        text: "Monitor and evaluate contractor performance through integrated feedback and assessment tools.",
        image: performanceImg,
        alt: "Team reviewing workforce analytics charts on a tablet during a performance review",
        points: [
          { text: "Integrated feedback", icon: Star },
          { text: "Assessment tools", icon: ChartBar },
        ],
      },
      {
        title: "Employee Trajectory",
        text: "Maintain multiple rejoin scenarios Emp Information trajectory centrally using adhaar number binding",
        image: trajectoryImg,
        fit: "contain",
        alt: "Contractor dashboard showing contractor liability and document status for contract employees",
        points: [
          { text: "Multiple rejoin scenarios", icon: Path },
          { text: "Aadhaar number binding", icon: IdentificationCard },
        ],
      },
    ],
    cards: [
      {
        title: "Document Management",
        text: "Store and manage all related documents, such as contracts, compliance certificates, and identification, in a secure, centralized location.",
        icon: FolderOpen,
      },
      {
        title: "Automated Alerts",
        text: "Receive automated notifications for upcoming contract renewals, compliance deadlines, and other key milestones.",
        icon: BellRinging,
      },
      {
        title: "Custom Reporting",
        text: "Generate custom reports tailored to specific needs, such as compliance audits, and contract summaries.",
        icon: ChartBar,
      },
    ],
  },
  workflow: {
    heading: "One master record, end to end",
    steps: [
      { title: "Capture", text: "Contractor and contract employee details in one master.", icon: UserPlus },
      { title: "Verify", text: "Aadhaar and blacklisting checks before onboarding.", icon: UserCheck },
      { title: "Store", text: "Contracts, certificates and identification stored centrally.", icon: FolderOpen },
      { title: "Alert", text: "Automated alerts for renewals and compliance deadlines.", icon: BellRinging },
      { title: "Report", text: "Custom reports for audits and contract summaries.", icon: ChartBar },
    ],
  },
};

export default function ClmsContractorContractEmployeeMastersPage() {
  return <ClmsModulePage {...CONTENT} />;
}
