"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { exec } from "@/lib/db";
import { isUuid } from "./validation";

const MAX_BULK = 100;

export async function deleteLeads(ids: string[]): Promise<{ ok: boolean; error?: string }> {
  await requireAdmin();
  if (!Array.isArray(ids) || ids.length === 0) return { ok: false, error: "Select at least one lead." };
  if (ids.length > MAX_BULK) return { ok: false, error: `You can delete up to ${MAX_BULK} leads at a time.` };
  if (!ids.every(isUuid)) return { ok: false, error: "Invalid lead id." };

  try {
    await exec("DELETE FROM leads WHERE id IN (?)", [ids]);
  } catch (err) {
    console.error("[admin deleteLeads]", err);
    return { ok: false, error: "Could not delete the leads. Please try again." };
  }

  revalidatePath("/admin/leads", "layout");
  return { ok: true };
}

export async function deleteLead(id: string): Promise<{ ok: boolean; error?: string }> {
  return deleteLeads([id]);
}
