/* --------------------------------------------------------------------
   The campaign landing pages. Each one is a self-contained static page in
   public/<slug>/, served at /<slug>/ (rewrite in next.config.mjs). Its
   forms post to /api/lp-lead/<slug>/.

   pageName     short name used in the email subject, Google Sheet and admin
   title        heading shown in the lead email
   sitesField   form field holding the contract workforce size
   sites        values that field accepts
   -------------------------------------------------------------------- */

const SITES = ["1,000 - 2,000 Contract workers", "2,000 - 4,000 Contract workers", "4,000 + Contract workers"];

const standard = { sitesField: "workforce_site", sites: SITES };

export const LANDING_PAGES = {
  "contract-labour-management-india": {
    ...standard,
    pageName: "Contract Labour",
    title: "Contract Labour Management India",
    sitesField: "workforce_site_count",
  },
  "contract-labour-management-india-lp": {
    pageName: "Contract Labour",
    title: "Contract Labour (campaign page)",
    sitesField: "contract_worker_strength",
    sites: ["1000-2000", "2000-4000", "4000+"],
    // This page asks for fewer details than the others.
    companyField: "company_name",
    optional: ["company", "city", "sites"],
  },
  "emsphere-clms-contractor-employee-master": {
    ...standard,
    pageName: "Employee Master",
    title: "Contractor & Employee Master Data Management",
  },
  "emsphere-clms-live-attendance": {
    ...standard,
    pageName: "Live Attendance",
    title: "Live Attendance & Statutory Compliance",
  },
  "emsphere-clms-manpower-planning-analytics": {
    ...standard,
    pageName: "Manpower Analytics",
    title: "Manpower Planning & Analytics",
  },
  "emsphere-clms-shift-overtime-management": {
    ...standard,
    pageName: "Shift Overtime",
    title: "Shift & Overtime Management",
  },
  "emsphere-clms-wages-contractor-billing": {
    ...standard,
    pageName: "Wages Billing",
    title: "Wages & Contractor Billing Management",
    sitesField: "workforce_site_count",
  },
};
