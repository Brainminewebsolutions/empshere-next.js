import ClmsModulePage, { buildModuleMetadata } from "@/components/ClmsModulePage";
import {
  AddressBook,
  Bell,
  Buildings,
  ChartBar,
  ChatsCircle,
  Database,
  DeviceMobile,
  FolderOpen,
  IdentificationCard,
  Receipt,
  ShieldCheck,
  UserPlus,
  Users,
} from "@phosphor-icons/react/ssr";

/* --------------------------------------------------------------------
   Images — app/images/clms-contractor-portal
   -------------------------------------------------------------------- */
import heroImg from "../images/clms-contractor-portal/hero-contractor-portal-dashboard.webp";
import contractorDatabaseImg from "../images/clms-contractor-portal/centralized-contractor-database.webp";
import invoiceSummaryImg from "../images/clms-contractor-portal/contractor-invoice-summary-screen.webp";
import complianceTrackingImg from "../images/clms-contractor-portal/contractor-compliance-tracking-tablet.webp";

// Title and description are the page's Rank Math values on the current site.
// TODO: replace with the confirmed production domain before deploying (same as app/layout.js).
const PAGE_URL = "https://www.emsphere.com/clms-contractor-portal/";

export const metadata = buildModuleMetadata({
  title: "Contractor Portal Module | Contract Labor Onboarding",
  description:
    "Simplify contractor management with Emsphere's Contractor Portal Module. Streamline onboarding, compliance, and communication for enhanced efficiency.",
  url: PAGE_URL,
  image: heroImg.src,
});

const CONTENT = {
  pageUrl: PAGE_URL,
  breadcrumbName: "Contractor Portal",
  eyebrow: "CLMS | CONTRACTOR PORTAL",
  heading: (
    <>
      Contractor Portal<br className="hidden md:block" /> Module
    </>
  ),
  intro:
    "Helps contractor to manage their own contract labor onboarding, compliance, and performance tracking of their respective employees with self service access to applications & reports.",
  hero: {
    image: heroImg,
    alt: "Desktop monitor showing a contractor portal dashboard with active worker count, licence validity, WC policy status and a contract employee table",
    statusCard: {
      label: "Compliance",
      icon: ShieldCheck,
      items: [{ text: "Contractor licence valid" }, { text: "WC policy active" }, { text: "Licence renewal due", pending: true }],
    },
    highlightCard: {
      label: "Self Service",
      icon: Users,
      tileIcon: Receipt,
      title: "Invoice Summary",
      subtitle: "With attendance details",
    },
  },
  benefits: {
    heading: "CLMS Contractor Portal Module",
    items: [
      {
        title: "Contractor Registration",
        text: "Simplify the onboarding process for new contractors with standardized forms and verification procedures.",
        icon: UserPlus,
      },
      {
        title: "Contractor Management",
        text: "Centralized database for storing contractor profiles, agreements, and documentation.",
        icon: Buildings,
      },
      {
        title: "Compliance Tracking",
        text: "Monitor and manage contractor license, contractor WC policy, and other compliance requirements.",
        icon: ShieldCheck,
      },
      {
        title: "Centralized Information",
        text: "Provides a single source of truth for all contractor-related data, enhancing accessibility and reducing data duplication.",
        icon: Database,
      },
      {
        title: "Reporting and Analytics",
        text: "Detailed reports and analytics to provide insights into contractor activities and performance.",
        icon: ChartBar,
      },
      {
        title: "Improved Communication",
        text: "Facilitates better communication between contractors and internal teams through integrated user access, Reports and email alerts.",
        icon: ChatsCircle,
      },
    ],
  },
  features: {
    heading: "CLMS Contractor Portal Module",
    showcases: [
      {
        title: "Centralized Contractor Database",
        text: "Comprehensive repository for storing detailed contractor profiles, including contact information and history.",
        image: contractorDatabaseImg,
        alt: "Contractor in a site office browsing contractor profiles with contact details, agreement dates and work history on a laptop",
        points: [
          { text: "Detailed contractor profiles", icon: AddressBook },
          { text: "Contact information & history", icon: IdentificationCard },
        ],
      },
      {
        title: "Invoice Summary Generation",
        text: "Invoice summary for contractor services along with Attendance details",
        image: invoiceSummaryImg,
        alt: "Accountant reviewing an invoice summary screen with contractor billing month, attendance man-days and total amount, next to a printed invoice and calculator",
        points: [
          { text: "Contractor service invoices", icon: Receipt },
          { text: "Attendance details included", icon: Users },
        ],
      },
      {
        title: "Compliance Tracking",
        text: "Automated compliance checks to ensure contractors meet regulatory standards and internal policies, with alerts for expired certifications or licenses.",
        image: complianceTrackingImg,
        alt: "Compliance officer holding a tablet showing contractor licence, WC policy, PF and ESIC registrations as valid, with an expiry alert",
        points: [
          { text: "Automated compliance checks", icon: ShieldCheck },
          { text: "Expiry alerts for licenses", icon: Bell },
        ],
      },
    ],
    cards: [
      {
        title: "Document Management",
        text: "Secure storage for contracts, WC policy, Contractor License and other important records with easy retrieval and sharing options.",
        icon: FolderOpen,
      },
      {
        title: "Easy Accessibility",
        text: "User friendly interface allowing access to contractor information and Reports on the go.",
        icon: DeviceMobile,
      },
      {
        title: "Detailed Reporting",
        text: "Access reports for Attendance, payroll and billing reports for comprehensive financial oversight.",
        icon: ChartBar,
      },
    ],
  },
  workflow: {
    heading: "Contractor self service, end to end",
    steps: [
      { title: "Register", text: "Contractor registers with standardized forms.", icon: UserPlus },
      { title: "Upload Documents", text: "Contracts, WC policy and contractor license stored securely.", icon: FolderOpen },
      { title: "Onboard Workers", text: "Contract labour onboarding through self service access.", icon: Users },
      { title: "Track Compliance", text: "Automated checks with alerts for expiring licenses.", icon: ShieldCheck },
      { title: "Invoice & Report", text: "Invoice summary with attendance details and reports.", icon: Receipt },
    ],
  },
};

export default function ClmsContractorPortalPage() {
  return <ClmsModulePage {...CONTENT} />;
}
