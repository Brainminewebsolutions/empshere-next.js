// Plain constants/types for job openings, safe to import from client components.

export const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Contract", "Internship"] as const;
export const JOB_STATUSES = ["open", "closed"] as const;
export type JobStatus = (typeof JOB_STATUSES)[number];

export type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  experience: string;
  salary: string;
  summary: string;
  description: string;
  requirements: string;
  status: JobStatus;
  created_at: string;
  updated_at: string;
};

export const JOB_LIMITS = {
  title: 160,
  department: 100,
  location: 160,
  experience: 80,
  salary: 100,
  summary: 400,
  description: 8000,
  requirements: 5000,
} as const;
