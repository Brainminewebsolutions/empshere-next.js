"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireStaff } from "@/lib/auth";
import { exec } from "@/lib/db";
import { EMPLOYMENT_TYPES, JOB_LIMITS, JOB_STATUSES, type JobStatus } from "@/lib/jobs-shared";
import { isUuid } from "./validation";

export type JobFormState = { error?: string } | undefined;

const text = (form: FormData, key: string, max: number) => {
  const value = form.get(key);
  return (typeof value === "string" ? value.replace(/\r\n/g, "\n").trim() : "").slice(0, max);
};

function refresh() {
  revalidatePath("/careers", "layout");
  revalidatePath("/admin/jobs", "layout");
  revalidatePath("/admin", "layout");
}

function readJob(form: FormData) {
  const title = text(form, "title", JOB_LIMITS.title);
  const employment = text(form, "employment_type", 40);
  const status = text(form, "status", 10) as JobStatus;
  if (!title) return { error: "Enter a job title." } as const;
  if (!JOB_STATUSES.includes(status)) return { error: "Choose a status." } as const;
  return {
    job: {
      title,
      department: text(form, "department", JOB_LIMITS.department),
      location: text(form, "location", JOB_LIMITS.location),
      employment_type: (EMPLOYMENT_TYPES as readonly string[]).includes(employment) ? employment : "Full-time",
      experience: text(form, "experience", JOB_LIMITS.experience),
      salary: text(form, "salary", JOB_LIMITS.salary),
      summary: text(form, "summary", JOB_LIMITS.summary),
      description: text(form, "description", JOB_LIMITS.description),
      requirements: text(form, "requirements", JOB_LIMITS.requirements),
      status,
    },
  } as const;
}

export async function createJob(_prev: JobFormState, form: FormData): Promise<JobFormState> {
  await requireStaff();
  const parsed = readJob(form);
  if ("error" in parsed) return { error: parsed.error };
  const j = parsed.job;
  try {
    await exec(
      `INSERT INTO jobs (id, title, department, location, employment_type, experience, salary, summary, description, requirements, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, UTC_TIMESTAMP(), UTC_TIMESTAMP())`,
      [randomUUID(), j.title, j.department, j.location, j.employment_type, j.experience, j.salary, j.summary, j.description, j.requirements, j.status],
    );
  } catch (err) {
    console.error("[admin createJob]", err);
    return { error: "Could not save the job. Please try again." };
  }
  refresh();
  redirect("/admin/jobs/?saved=1");
}

export async function updateJob(id: string, _prev: JobFormState, form: FormData): Promise<JobFormState> {
  await requireStaff();
  if (!isUuid(id)) return { error: "Invalid job." };
  const parsed = readJob(form);
  if ("error" in parsed) return { error: parsed.error };
  const j = parsed.job;
  try {
    await exec(
      `UPDATE jobs SET title = ?, department = ?, location = ?, employment_type = ?, experience = ?, salary = ?,
              summary = ?, description = ?, requirements = ?, status = ?, updated_at = UTC_TIMESTAMP()
        WHERE id = ?`,
      [j.title, j.department, j.location, j.employment_type, j.experience, j.salary, j.summary, j.description, j.requirements, j.status, id],
    );
  } catch (err) {
    console.error("[admin updateJob]", err);
    return { error: "Could not save the job. Please try again." };
  }
  refresh();
  redirect("/admin/jobs/?saved=1");
}

export async function setJobStatus(id: string, status: JobStatus): Promise<{ ok: boolean; error?: string }> {
  await requireStaff();
  if (!isUuid(id) || !JOB_STATUSES.includes(status)) return { ok: false, error: "Invalid request." };
  try {
    await exec("UPDATE jobs SET status = ?, updated_at = UTC_TIMESTAMP() WHERE id = ?", [status, id]);
  } catch (err) {
    console.error("[admin setJobStatus]", err);
    return { ok: false, error: "Could not update the job." };
  }
  refresh();
  return { ok: true };
}

export async function deleteJob(id: string): Promise<{ ok: boolean; error?: string }> {
  await requireStaff();
  if (!isUuid(id)) return { ok: false, error: "Invalid job." };
  try {
    await exec("DELETE FROM jobs WHERE id = ?", [id]);
  } catch (err) {
    console.error("[admin deleteJob]", err);
    return { ok: false, error: "Could not delete the job." };
  }
  refresh();
  return { ok: true };
}
