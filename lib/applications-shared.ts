// Plain constants/types for job applications, safe to import from client components.

export const APPLICATION_STATUSES = ["new", "reviewed", "shortlisted", "rejected"] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  new: "New",
  reviewed: "Reviewed",
  shortlisted: "Shortlisted",
  rejected: "Rejected",
};

export type ApplicationRow = {
  id: string;
  job_id: string | null;
  job_title: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  current_company: string;
  current_ctc: string;
  expected_ctc: string;
  notice_period: string;
  linkedin: string;
  message: string | null;
  resume_name: string;
  resume_size: number;
  status: ApplicationStatus;
  created_at: string;
};
