import ClmsModulePage, { buildModuleMetadata } from "@/components/ClmsModulePage";
import {
  Bank,
  Calculator,
  CalendarBlank,
  ChartBar,
  CheckCircle,
  ClipboardText,
  Coins,
  CursorClick,
  CurrencyInr,
  HandCoins,
  Receipt,
  Scales,
  SlidersHorizontal,
  Wallet,
} from "@phosphor-icons/react/ssr";

/* --------------------------------------------------------------------
   Images — app/images/clms-wages-contractor-billing
   TODO: temporary images (the invoice image is shared with the contractor
   portal page) — replace with generated images for this module
   (Figma AI credit limit was reached).
   -------------------------------------------------------------------- */
import heroImg from "../images/payroll-management-solution/payslip-generation-dashboard.webp";
import payrollCalcImg from "../images/payroll-management-solution/salary-computation-calculator.webp";
import invoiceSummaryImg from "../images/clms-contractor-portal/contractor-invoice-summary-screen.webp";
import paymentSchedulingImg from "../images/payroll-management-solution/salary-calculation-team-review.webp";

// Title and description are the page's Rank Math values on the current site.
// TODO: replace with the confirmed production domain before deploying (same as app/layout.js).
const PAGE_URL = "https://www.emsphere.com/clms-wages-contractor-billing/";

export const metadata = buildModuleMetadata({
  title: "Wages and Contractor Billing Module | Emsphere Technologies",
  description:
    "Streamline payroll, wages and contractor billing with Emsphere's Wages Module. Efficient, accurate, and hassle-free management for your business needs.",
  url: PAGE_URL,
  image: heroImg.src,
});

const CONTENT = {
  pageUrl: PAGE_URL,
  breadcrumbName: "Wages & Contractor Billing",
  eyebrow: "CLMS | WAGES & CONTRACTOR BILLING",
  heading: "Wages and Contractor Billing Module",
  compactHeading: true,
  intro:
    "A comprehensive Wages and Contractor Billing Module that automates payroll and billing processes, ensuring accuracy and efficiency while reducing administrative costs.",
  hero: {
    image: heroImg,
    alt: "Payslip generation dashboard showing wage computation and salary breakdown",
    statusCard: {
      label: "Wage Run",
      icon: Calculator,
      items: [{ text: "Wages computed" }, { text: "Deductions applied" }, { text: "Arrears pending", pending: true }],
    },
    highlightCard: {
      label: "Contractor Billing",
      icon: Receipt,
      tileIcon: CurrencyInr,
      title: "Invoice Ready",
      subtitle: "Custom invoice template",
    },
  },
  benefits: {
    heading: "CLMS Wages & Contractor Billing Module",
    items: [
      {
        title: "Automated Payroll Processing",
        text: "Simplify payroll with automated calculations and disbursements.",
        icon: Wallet,
      },
      {
        title: "Accurate Billing",
        text: "Ensure precise billing for contractors and services with automated invoicing.",
        icon: Receipt,
      },
      {
        title: "Timely Payments",
        text: "Guarantee timely and accurate payments to employees and contractors.",
        icon: CalendarBlank,
      },
      {
        title: "Customizable Pay Structures",
        text: "Accommodate various pay structures and billing arrangements with ease.",
        icon: SlidersHorizontal,
      },
      {
        title: "Enhanced Reporting",
        text: "Generate detailed reports on payroll and billing activities for better financial management.",
        icon: ChartBar,
      },
      {
        title: "Compliance Assurance",
        text: "Ensure compliance with tax regulations and labor laws through automated updates.",
        icon: Scales,
      },
    ],
  },
  features: {
    heading: "CLMS Wages & Contractor Billing Module",
    showcases: [
      {
        title: "Automated Payroll Calculations",
        text: "Compute wages, deductions, and taxes automatically including arrear computations for min wages revisions & statutory bonus.",
        image: payrollCalcImg,
        alt: "Salary computation with a calculator and payroll figures",
        points: [
          { text: "Wages, deductions & taxes", icon: Calculator },
          { text: "Min wage arrears & statutory bonus", icon: Coins },
        ],
      },
      {
        title: "Invoice Summary Generation",
        text: "Send invoice summary for contractor services with customizable templates.",
        image: invoiceSummaryImg,
        alt: "Accountant reviewing an invoice summary screen with contractor billing month, attendance man-days and total amount, next to a printed invoice and calculator",
        points: [
          { text: "Contractor service invoices", icon: Receipt },
          { text: "Customizable templates", icon: ClipboardText },
        ],
      },
      {
        title: "Payment Scheduling",
        text: "Schedule payments and manage payment dates efficiently.",
        image: paymentSchedulingImg,
        alt: "Finance team reviewing salary calculations together before scheduling payments",
        points: [
          { text: "Scheduled payments", icon: CalendarBlank },
          { text: "Payment date management", icon: Bank },
        ],
      },
    ],
    cards: [
      {
        title: "Expense Tracking",
        text: "Track and manage expenses related to contractor services and labor costs.",
        icon: HandCoins,
      },
      {
        title: "Detailed Reporting",
        text: "Access detailed payroll and billing reports for comprehensive financial oversight.",
        icon: ChartBar,
      },
      {
        title: "User-Friendly Interface",
        text: "Navigate payroll and billing processes with an easy-to-use interface.",
        icon: CursorClick,
      },
    ],
  },
  workflow: {
    heading: "From attendance to invoice, end to end",
    steps: [
      { title: "Attendance", text: "Approved attendance and overtime pulled in.", icon: CheckCircle },
      { title: "Compute", text: "Wages, deductions, taxes and arrears calculated.", icon: Calculator },
      { title: "Invoice", text: "Contractor invoice summary with custom templates.", icon: Receipt },
      { title: "Schedule", text: "Payments scheduled on the right dates.", icon: CalendarBlank },
      { title: "Report", text: "Detailed payroll and billing reports.", icon: ChartBar },
    ],
  },
};

export default function ClmsWagesContractorBillingPage() {
  return <ClmsModulePage {...CONTENT} />;
}
