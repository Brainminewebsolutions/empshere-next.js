"use client";

import { useState } from "react";
import {
  ArrowRight,
  Briefcase,
  CaretDown,
  Clock,
  MapPin,
  UserCircle,
} from "@phosphor-icons/react/ssr";

/* --------------------------------------------------------------------
   Open positions list for the careers page: department filter chips and
   expandable job cards with an "Apply Now" mailto link.
   NOTE: these are placeholder openings — replace with real roles.
   -------------------------------------------------------------------- */

const HR_EMAIL = "hr@emsphere.com";

export const JOBS = [
  {
    id: "senior-frontend-engineer",
    title: "Senior Frontend Engineer (React / Next.js)",
    department: "Engineering",
    location: "Pune",
    type: "Full-time",
    experience: "4–7 years",
    summary:
      "Build fast, accessible interfaces for emHRMS, emCLMS and emPay used by lakhs of employees every day.",
    responsibilities: [
      "Own features end to end across our Next.js product suite",
      "Build reusable UI components and dashboards with React and Tailwind",
      "Work with product and design to ship polished, responsive screens",
    ],
  },
  {
    id: "java-backend-engineer",
    title: "Backend Engineer (Java / Spring Boot)",
    department: "Engineering",
    location: "Pune",
    type: "Full-time",
    experience: "3–6 years",
    summary:
      "Design high-concurrency services for attendance, payroll and statutory compliance at enterprise scale.",
    responsibilities: [
      "Develop REST APIs and microservices on Spring Boot",
      "Optimise SQL queries and data models for millions of punches",
      "Integrate with ERP systems, biometric devices and turnstiles",
    ],
  },
  {
    id: "qa-automation-engineer",
    title: "QA Automation Engineer",
    department: "Engineering",
    location: "Pune",
    type: "Full-time",
    experience: "2–5 years",
    summary: "Keep every release rock solid with automated test suites across web and mobile.",
    responsibilities: [
      "Write and maintain automated UI and API tests",
      "Own regression suites for payroll and compliance modules",
      "Track quality metrics and drive bug triage with developers",
    ],
  },
  {
    id: "implementation-consultant",
    title: "Implementation Consultant – HRMS & Payroll",
    department: "Implementation",
    location: "Pune / Client sites",
    type: "Full-time",
    experience: "2–5 years",
    summary:
      "Lead customer rollouts — from requirement mapping to go-live — for India’s leading manufacturers.",
    responsibilities: [
      "Configure salary structures, shift rules and workflows",
      "Run UAT, data migration and user training sessions",
      "Be the trusted point of contact for client HR teams",
    ],
  },
  {
    id: "technical-support-engineer",
    title: "Technical Support Engineer (Biometrics & Devices)",
    department: "Support",
    location: "Delhi",
    type: "Full-time",
    experience: "1–3 years",
    summary: "Keep shop floors running by supporting biometric terminals, turnstiles and integrations.",
    responsibilities: [
      "Install and troubleshoot face / fingerprint devices on site",
      "Resolve L1/L2 tickets within SLA",
      "Document fixes and improve the support knowledge base",
    ],
  },
  {
    id: "enterprise-sales-manager",
    title: "Enterprise Sales Manager",
    department: "Sales",
    location: "Bengaluru",
    type: "Full-time",
    experience: "5–8 years",
    summary: "Grow emSphere across South India by partnering with CHROs and plant heads of large enterprises.",
    responsibilities: [
      "Own the full sales cycle from prospecting to closure",
      "Run product demos alongside our solution consultants",
      "Build long-term relationships with key accounts",
    ],
  },
  {
    id: "business-analyst",
    title: "Business Analyst – Workforce Solutions",
    department: "Product",
    location: "Pune",
    type: "Full-time",
    experience: "3–5 years",
    summary: "Turn on-ground HR and labour-law requirements into clear product specifications.",
    responsibilities: [
      "Gather requirements from customers and internal teams",
      "Write user stories, process flows and acceptance criteria",
      "Track statutory changes and plan product updates",
    ],
  },
  {
    id: "hr-executive",
    title: "HR Executive – Talent Acquisition",
    department: "People & Culture",
    location: "Pune",
    type: "Full-time",
    experience: "1–3 years",
    summary: "Help us find and welcome the next generation of emSphere team members.",
    responsibilities: [
      "Manage end-to-end hiring for tech and non-tech roles",
      "Coordinate interviews and candidate communication",
      "Run onboarding and employer-branding initiatives",
    ],
  },
];

const ALL = "All";
const DEPARTMENTS = [ALL, ...new Set(JOBS.map((job) => job.department))];

function applyHref(job) {
  const subject = `Application: ${job.title}`;
  const body = `Hi emSphere team,\n\nI would like to apply for the ${job.title} role (${job.location}).\n\nPlease find my CV attached.\n\nRegards,`;
  return `mailto:${HR_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function JobCard({ job, index }) {
  const [open, setOpen] = useState(false);
  const panelId = `job-${job.id}`;

  return (
    <li className="em-job" style={{ animationDelay: `${index * 70}ms` }}>
      <article className={`em-job-card ${open ? "em-job-card--open" : ""}`}>
        <div className="em-job-main">
          <div className="em-job-info">
            <span className="em-job-dept">{job.department}</span>
            <h3 className="em-job-title">{job.title}</h3>
            <ul className="em-job-meta">
              <li>
                <MapPin weight="fill" aria-hidden="true" />
                {job.location}
              </li>
              <li>
                <Clock weight="fill" aria-hidden="true" />
                {job.type}
              </li>
              <li>
                <UserCircle weight="fill" aria-hidden="true" />
                {job.experience}
              </li>
            </ul>
          </div>
          <div className="em-job-actions">
            <button
              type="button"
              className="em-job-toggle"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Hide details" : "View details"}
              <CaretDown weight="bold" aria-hidden="true" />
            </button>
            <a className="em-job-apply" href={applyHref(job)}>
              Apply Now
              <ArrowRight weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div id={panelId} className="em-job-panel" hidden={!open}>
          <p className="em-job-summary">{job.summary}</p>
          <p className="em-job-subhead">What you’ll do</p>
          <ul className="em-job-list">
            {job.responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </article>
    </li>
  );
}

export default function JobOpenings() {
  const [department, setDepartment] = useState(ALL);
  const visible = department === ALL ? JOBS : JOBS.filter((job) => job.department === department);

  return (
    <div className="em-jobs">
      <div className="em-jobs-filters" role="group" aria-label="Filter openings by department">
        {DEPARTMENTS.map((dept) => {
          const count = dept === ALL ? JOBS.length : JOBS.filter((job) => job.department === dept).length;
          return (
            <button
              key={dept}
              type="button"
              aria-pressed={dept === department}
              className={`em-jobs-chip ${dept === department ? "em-jobs-chip--active" : ""}`}
              onClick={() => setDepartment(dept)}
            >
              {dept}
              <span className="em-jobs-chip-count">{count}</span>
            </button>
          );
        })}
      </div>

      <p className="em-jobs-count" aria-live="polite">
        <Briefcase weight="fill" aria-hidden="true" />
        {visible.length} open {visible.length === 1 ? "position" : "positions"}
        {department !== ALL && ` in ${department}`}
      </p>

      {/* Re-key on filter change so the list replays its entrance animation. */}
      <ul className="em-jobs-list" key={department}>
        {visible.map((job, index) => (
          <JobCard key={job.id} job={job} index={index} />
        ))}
      </ul>
    </div>
  );
}
