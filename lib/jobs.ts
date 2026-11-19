import "server-only";
import { query, queryOne } from "@/lib/db";
import type { Job } from "@/lib/jobs-shared";

const COLUMNS =
  "id, title, department, location, employment_type, experience, salary, summary, description, requirements, status, created_at, updated_at";

/** Open jobs for the public /careers page, newest first. Never throws:
 *  a database problem just shows the "No open positions" state. */
export async function getOpenJobs(): Promise<Job[]> {
  if (!process.env.DB_NAME && !process.env.DATABASE_URL) return [];
  try {
    return await query<Job>(`SELECT ${COLUMNS} FROM jobs WHERE status = 'open' ORDER BY created_at DESC, id ASC`);
  } catch (error) {
    console.error("[careers] could not load jobs:", (error as Error)?.message || error);
    return [];
  }
}

export function getJob(id: string): Promise<Job | null> {
  return queryOne<Job>(`SELECT ${COLUMNS} FROM jobs WHERE id = ?`, [id]);
}

export async function getOpenJobTitle(id: string): Promise<Job | null> {
  const job = await queryOne<Job>(`SELECT ${COLUMNS} FROM jobs WHERE id = ? AND status = 'open'`, [id]);
  return job;
}
