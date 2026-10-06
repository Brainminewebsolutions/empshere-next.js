import ClmsModulePage, { buildModuleMetadata } from "@/components/ClmsModulePage";
import {
  ArrowsLeftRight,
  ChartBar,
  Checks,
  CursorClick,
  EnvelopeSimple,
  Eye,
  Fingerprint,
  FolderOpen,
  GearSix,
  IdentificationBadge,
  IdentificationCard,
  Layout,
  Leaf,
  PaperPlaneTilt,
  Printer,
  ScanSmiley,
  SealCheck,
  ShieldCheck,
  TreeStructure,
  UserCheck,
  UsersThree,
} from "@phosphor-icons/react/ssr";

/* --------------------------------------------------------------------
   Images — app/images/clms-onboarding-gatepass-management
   -------------------------------------------------------------------- */
import heroImg from "../images/clms-onboarding-gatepass-management/hero-onboarding-dashboard.webp";
import digitalGatepassImg from "../images/clms-onboarding-gatepass-management/digital-gatepass-id-card-preview.webp";
import automatedOnboardingImg from "../images/clms-onboarding-gatepass-management/automated-onboarding-approval-screen.webp";
import employeeVerificationImg from "../images/clms-onboarding-gatepass-management/employee-verification-aadhaar-screen.webp";

// Title and description are the page's Rank Math values on the current site.
// TODO: replace with the confirmed production domain before deploying (same as app/layout.js).
const PAGE_URL = "https://www.emsphere.com/clms-onboarding-gatepass-management/";

export const metadata = buildModuleMetadata({
  title: "Onboarding & Gatepass Module | Gate Pass Management System",
  description:
    "Onboarding & Gatepass Module Complete end to end digital onboarding process with configurable workflows, validations & integrations with face biometric system.",
  url: PAGE_URL,
  image: heroImg.src,
});

const CONTENT = {
  pageUrl: PAGE_URL,
  breadcrumbName: "Onboarding & Gatepass",
  eyebrow: "CLMS | ONBOARDING & GATEPASS",
  heading: (
    <>
      Onboarding &<br className="hidden md:block" /> Gatepass Module
    </>
  ),
  intro:
    "Complete end to end digital onboarding process with configurable workflows, validations & integrations with face biometric system.",
  hero: {
    image: heroImg,
    alt: "Desktop monitor showing the onboarding checklist and a gatepass request form, next to a turnstile with a green access check and an ID badge on the desk",
    statusCard: {
      label: "Verification",
      icon: ScanSmiley,
      items: [
        { text: "Documents uploaded" },
        { text: "Blacklist check" },
        { text: "Biometric enrolled", pending: true },
      ],
    },
    highlightCard: {
      label: "Digital Gatepass",
      icon: IdentificationCard,
      tileIcon: IdentificationBadge,
      title: "Gatepass Ready",
      subtitle: "Print-ready ID format",
    },
  },
  benefits: {
    heading: "CLMS Onboarding & Gatepass Module",
    items: [
      {
        title: "Completely Paperless",
        text: "No need to have manual paperwork or paper based form filling & signing with our fully digitized process",
        icon: Leaf,
      },
      {
        title: "Seamless Experience",
        text: "Contractor portal initiator requests to configurable approval workflows including send back or pull back options with real time status",
        icon: ArrowsLeftRight,
      },
      {
        title: "Document Management",
        text: "Ensures all mandatory documentations are uploaded & retained for easy information retrieval",
        icon: FolderOpen,
      },
      {
        title: "Validation Control",
        text: "Ensures blacklist check, age check and other compliance checks from the start of Onboarding initiator process",
        icon: SealCheck,
      },
      {
        title: "Improve Transparency",
        text: "With every stakeholder involved in digital approvals ensuring transparency in overall onboarding process",
        icon: Eye,
      },
      {
        title: "Compliance Assurance",
        text: "The end to end process built with strong validation & approval controls ensures safety & compliance",
        icon: ShieldCheck,
      },
    ],
  },
  features: {
    heading: "CLMS Onboarding & Gatepass Module",
    showcases: [
      {
        title: "Digital Gatepass",
        text: "Generate gatepass format which is ready to print ID cards as per the required gatepass formats.",
        image: digitalGatepassImg,
        alt: "Worker holding an access card up to a wall-mounted card reader with a display screen",
        points: [
          { text: "Print-ready ID card formats", icon: Printer },
          { text: "Configurable gatepass templates", icon: Layout },
        ],
      },
      {
        title: "Automated Onboarding",
        text: "With completely digitized process & approvals the overall onboarding process is automated & hassle free",
        image: automatedOnboardingImg,
        alt: "HR admin reviewing a contractor onboarding screen with contractor details, document checklist and 80% compliance status",
        points: [
          { text: "Configurable approval levels", icon: TreeStructure },
          { text: "Mail notification at each step", icon: EnvelopeSimple },
        ],
      },
      {
        title: "Employee Verification",
        text: "The employee information can be seamlessly checked with UIDAI server using Aadhaar number for authenticity",
        image: employeeVerificationImg,
        alt: "Contract worker in a hard hat and safety vest verified by a face recognition terminal at a turnstile entry",
        points: [
          { text: "Face biometric enrollment push", icon: ScanSmiley },
          { text: "Aadhaar based authenticity", icon: IdentificationCard },
        ],
      },
    ],
    cards: [
      {
        title: "Customizations",
        text: "The master data fields, validation control along with approvals, gatepass formats, integration requirements can be easily customized.",
        icon: GearSix,
      },
      {
        title: "Custom Workflows",
        text: "Easily define the workflow levels at each step of onboarding process as per business requirements",
        icon: TreeStructure,
      },
      {
        title: "Mail Notifications",
        text: "The mail notifications provided at each step of onboarding process ensuring users are actively notified",
        icon: EnvelopeSimple,
      },
      {
        title: "Face Biometric Integration",
        text: "The system seamlessly integrates with face biometric system to push generated Emp ID for enrollment purpose.",
        icon: Fingerprint,
      },
      {
        title: "Reports & Dashboards",
        text: "With strong audit control logs, reports & Dashboards throughout the entire process information is easy to access.",
        icon: ChartBar,
      },
      {
        title: "User-Friendly Interface",
        text: "The onboarding GUI is very easy to use & navigate even for contractor initiators which improves user adoption.",
        icon: CursorClick,
      },
    ],
  },
  workflow: {
    heading: "Configurable workflow, end to end",
    steps: [
      { title: "Initiate", text: "Contractor portal initiator raises the onboarding request.", icon: PaperPlaneTilt },
      { title: "Validate", text: "Blacklist check, age check and mandatory document validation.", icon: Checks },
      { title: "Approve", text: "Configurable approval levels with send back or pull back options.", icon: UsersThree },
      { title: "Verify", text: "Aadhaar based employee verification with the UIDAI server.", icon: UserCheck },
      { title: "Generate Gatepass", text: "Print-ready gatepass ID card in the required format.", icon: IdentificationBadge },
    ],
  },
};

export default function ClmsOnboardingGatepassManagementPage() {
  return <ClmsModulePage {...CONTENT} />;
}
