"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin, type StaffRole } from "@/lib/auth";
import { createSecretClient } from "@/lib/supabase/server";
import { isEmail, isUuid, toLoginEmail, validatePassword } from "./validation";
import type { FormState } from "./auth";

function isRole(value: unknown): value is StaffRole {
  return value === "admin" || value === "editor";
}

async function adminCount() {
  const { count } = await createSecretClient()
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .eq("role", "admin");
  return count ?? 0;
}

export async function createUser(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const email = toLoginEmail(String(formData.get("email") ?? ""));
  const fullName = String(formData.get("full_name") ?? "").trim().slice(0, 100);
  const password = String(formData.get("password") ?? "");
  const role = formData.get("role");

  if (!isEmail(email)) return { error: "Enter a valid email address." };
  if (!isRole(role)) return { error: "Choose a role." };
  const problem = validatePassword(password);
  if (problem) return { error: problem };
  if (password !== String(formData.get("confirm") ?? "")) return { error: "The two passwords do not match." };

  const secret = createSecretClient();
  const { data, error } = await secret.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName },
  });
  if (error || !data.user) {
    return { error: error?.message ?? "Could not create the user." };
  }

  const { error: profileError } = await secret
    .from("profiles")
    .insert({ id: data.user.id, email, full_name: fullName, role });
  if (profileError) {
    // Don't leave a login behind with no profile.
    await secret.auth.admin.deleteUser(data.user.id);
    return { error: profileError.message };
  }

  revalidatePath("/admin/users");
  return { success: `Created ${email}. Share the password with them securely (not by plain email).` };
}

export async function deleteUser(userId: string): Promise<{ ok: boolean; error?: string }> {
  const me = await requireAdmin();
  if (!isUuid(userId)) return { ok: false, error: "Invalid user." };
  if (userId === me.id) return { ok: false, error: "You can't delete your own account." };

  const secret = createSecretClient();
  const { data: target } = await secret.from("profiles").select("role").eq("id", userId).maybeSingle();
  if (target?.role === "admin" && (await adminCount()) <= 1) {
    return { ok: false, error: "You can't delete the last admin." };
  }

  // Deleting the auth user cascades to the profile and kills their
  // sessions - getUser() in lib/auth.ts rejects them on the next request.
  const { error } = await secret.auth.admin.deleteUser(userId);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/users");
  return { ok: true };
}

export async function updateUserRole(userId: string, role: StaffRole): Promise<{ ok: boolean; error?: string }> {
  const me = await requireAdmin();
  if (!isUuid(userId) || !isRole(role)) return { ok: false, error: "Invalid request." };
  if (userId === me.id) return { ok: false, error: "You can't change your own role." };

  const { error } = await createSecretClient().from("profiles").update({ role }).eq("id", userId);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/users");
  return { ok: true };
}

export async function resetUserPassword(userId: string, password: string): Promise<{ ok: boolean; error?: string }> {
  await requireAdmin();
  if (!isUuid(userId)) return { ok: false, error: "Invalid user." };
  const problem = validatePassword(password);
  if (problem) return { ok: false, error: problem };

  const { error } = await createSecretClient().auth.admin.updateUserById(userId, { password });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
