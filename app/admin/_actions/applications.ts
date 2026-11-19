"use server";

import { revalidatePath } from "next/cache";
import { requireStaff } from "@/lib/auth";
import { exec } from "@/lib/db";
import { APPLICATION_STATUSES, type ApplicationStatus } from "@/lib/applications-shared";
import { isUuid } from "./validation";

export async function setApplicationStatus(id: string, status: ApplicationStatus): Promise<{ ok: boolean; error?: string }> {
  await requireStaff();
  if (!isUuid(id) || !APPLICATION_STATUSES.includes(status)) return { ok: false, error: "Invalid request." };
  try {
    await exec("UPDATE job_applications SET status = ? WHERE id = ?", [status, id]);
  } catch (err) {
    console.error("[admin setApplicationStatus]", err);
    return { ok: false, error: "Could not update the status." };
  }
  revalidatePath("/admin/applications", "layout");
  return { ok: true };
}

export async function deleteApplication(id: string): Promise<{ ok: boolean; error?: string }> {
  await requireStaff();
  if (!isUuid(id)) return { ok: false, error: "Invalid application." };
  try {
    await exec("DELETE FROM job_applications WHERE id = ?", [id]);
  } catch (err) {
    console.error("[admin deleteApplication]", err);
    return { ok: false, error: "Could not delete the application." };
  }
  revalidatePath("/admin/applications", "layout");
  return { ok: true };
}
