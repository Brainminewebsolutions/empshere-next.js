import ClmsModulePage, { buildModuleMetadata } from "@/components/ClmsModulePage";
import {
  ArrowsClockwise,
  Calculator,
  CalendarCheck,
  CalendarPlus,
  Clock,
  EnvelopeSimple,
  FileXls,
  Fingerprint,
  HourglassHigh,
  Moon,
  Scales,
  SlidersHorizontal,
  Timer,
  TrendUp,
  Wallet,
} from "@phosphor-icons/react/ssr";

/* --------------------------------------------------------------------
   Images — app/images/clms-attendance-shift-overtime-management
   -------------------------------------------------------------------- */
import heroImg from "../images/clms-attendance-shift-overtime-management/hero-attendance-shift-overtime-dashboard.webp";
import attendanceTrackingImg from "../images/clms-attendance-shift-overtime-management/real-time-attendance-face-biometric-punch.webp";
import overtimeImg from "../images/clms-attendance-shift-overtime-management/overtime-approval-requests-screen.webp";
import shiftRosterImg from "../images/clms-attendance-shift-overtime-management/shift-roster-rotation-planner.webp";

// Title and description are the page's Rank Math values on the current site.
// TODO: replace with the confirmed production domain before deploying (same as app/layout.js).
const PAGE_URL = "https://www.emsphere.com/clms-attendance-shift-overtime-management/";

export const metadata = buildModuleMetadata({
  title: "CLMS Attendance Shift and Overtime Management",
  description:
    "Streamline CLMS Attendance Shift and Overtime Management with Emsphere's CLMS. Boost efficiency, reduce errors, and ensure compliance effortlessly.",
  url: PAGE_URL,
  image: heroImg.src,
});

const CONTENT = {
  pageUrl: PAGE_URL,
  breadcrumbName: "Attendance, Shift & Overtime",
  eyebrow: "CLMS | ATTENDANCE, SHIFT & OVERTIME",
  heading: "Attendance - Shift & Overtime Management Module",
  compactHeading: true,
  intro:
    "Shift and Overtime Management Modules streamline scheduling, optimize productivity, ensure compliance with highly configurable policy settings.",
  hero: {
    image: heroImg,
    alt: "Desktop monitor showing a weekly attendance shift roster and an overtime hours chart, with a biometric attendance terminal on the wall and a warehouse team in the background",
    statusCard: {
      label: "Today's Attendance",
      icon: Fingerprint,
      items: [{ text: "Punches synced" }, { text: "Shifts auto-assigned" }, { text: "OT pending approval", pending: true }],
    },
    highlightCard: {
      label: "Overtime",
      icon: Clock,
      tileIcon: Timer,
      title: "OT Approved",
      subtitle: "Ready for payroll",
    },
  },
  benefits: {
    heading: "CLMS Attendance Shift & Overtime Management Module",
    items: [
      {
        title: "Enhanced Productivity",
        text: "A well-organized shift and overtime management system ensures optimal staffing levels, continuous workflow, and better employee allocation, maximizing productivity and achieving operational goals efficiently.",
        icon: TrendUp,
      },
      {
        title: "Compliance with Labor law",
        text: "Shift and overtime management systems ensure compliance with labor laws by tracking hours worked and minimizing legal risks and fines.",
        icon: Scales,
      },
      {
        title: "Accurate payroll processing",
        text: "Shift and overtime management systems integrate with payroll, ensuring accurate wage calculations and reducing errors, thus ensuring fair employee compensation.",
        icon: Calculator,
      },
      {
        title: "Highly Configurable",
        text: "The Module is fully configurable to incorporate any policies related to Shift & Overtime management in hassle free manner",
        icon: SlidersHorizontal,
      },
    ],
  },
  features: {
    heading: "CLMS Attendance Shift & Overtime Management Module",
    showcases: [
      {
        title: "Real Time Attendance Tracking",
        text: "Tracks employees' worked hours in real-time, including regular and overtime hours, ensuring accurate timekeeping and payroll processing.",
        image: attendanceTrackingImg,
        alt: "Contract worker in a hi-vis vest punching in on a face recognition terminal at a factory turnstile, with a live attendance dashboard on the wall",
        points: [
          { text: "Regular & overtime hours", icon: HourglassHigh },
          { text: "Accurate timekeeping", icon: Fingerprint },
        ],
      },
      {
        title: "Overtime Management",
        text: "Define OT calculation configurations, approval workflows, National & Festival holiday working, rounding rules",
        image: overtimeImg,
        alt: "HR manager reviewing an overtime requests table with approve and send back actions and a holiday calendar on a laptop",
        points: [
          { text: "OT approval workflows", icon: CalendarCheck },
          { text: "Holiday working & rounding rules", icon: CalendarPlus },
        ],
      },
      {
        title: "Manual Allocation & Shift Rotations",
        text: "System provides option to roster shift & weekly off scheduling to line managers using excel upload or by allocation shift rotation patterns",
        image: shiftRosterImg,
        alt: "Line manager in a supervisor cabin planning a colour-coded monthly shift roster with weekly offs on a large monitor overlooking the production floor",
        points: [
          { text: "Excel roster upload", icon: FileXls },
          { text: "Shift rotation patterns", icon: ArrowsClockwise },
        ],
      },
    ],
    cards: [
      {
        title: "Night & Break Shift Management",
        text: "Accurate calculations of attendance for night shift, break shift and Overtime scenarios",
        icon: Moon,
      },
      {
        title: "Auto Shift Management",
        text: "Manage Auto shift with flexibility to auto capture shift allocation by setting the tolerance timings",
        icon: ArrowsClockwise,
      },
      {
        title: "Reports & Mail Notifications",
        text: "System provides key reports for Shift, Attendance, Overtime as well as auto mail notifications",
        icon: EnvelopeSimple,
      },
    ],
  },
  workflow: {
    heading: "From punch to payroll, end to end",
    steps: [
      { title: "Punch", text: "Biometric punches captured in real time.", icon: Fingerprint },
      { title: "Assign Shift", text: "Auto shift or rostered shift with tolerance timings.", icon: CalendarCheck },
      { title: "Calculate", text: "Night, break shift and overtime hours computed.", icon: Calculator },
      { title: "Approve OT", text: "Configurable overtime approval workflows.", icon: Timer },
      { title: "Payroll", text: "Accurate hours flow into wage calculations.", icon: Wallet },
    ],
  },
};

export default function ClmsAttendanceShiftOvertimeManagementPage() {
  return <ClmsModulePage {...CONTENT} />;
}
