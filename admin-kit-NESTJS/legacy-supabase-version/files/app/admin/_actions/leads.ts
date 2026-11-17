"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createSecretClient } from "@/lib/supabase/server";
import { isUuid } from "./validation";

const MAX_BULK = 100;

// Leads are only ever written by the server, so there's no delete policy in
// RLS - the admin check here is the gate, then the secret key deletes.
export async function deleteLeads(ids: string[]): Promise<{ ok: boolean; error?: string }> {
  await requireAdmin();
  if (!Array.isArray(ids) || ids.length === 0) return { ok: false, error: "Select at least one lead." };
  if (ids.length > MAX_BULK) return { ok: false, error: `You can delete up to ${MAX_BULK} leads at a time.` };
  if (!ids.every(isUuid)) return { ok: false, error: "Invalid lead id." };

  const { error } = await createSecretClient().from("leads").delete().in("id", ids);
  if (error) return { ok: false, error: "Could not delete the leads. Please try again." };

  revalidatePath("/admin/leads", "layout");
  return { ok: true };
}

export async function deleteLead(id: string): Promise<{ ok: boolean; error?: string }> {
  return deleteLeads([id]);
}
