"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { destroyAllSessions, requireAdmin, type StaffRole } from "@/lib/auth";
import { count, exec, queryOne } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import { isEmail, isUuid, toLoginEmail, validatePassword } from "./validation";
import type { FormState } from "./auth";

function isRole(value: unknown): value is StaffRole {
  return value === "admin" || value === "editor";
}

const adminCount = () => count("SELECT COUNT(*) AS n FROM users WHERE role = 'admin'");

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

  if (await queryOne("SELECT id FROM users WHERE email = ?", [email])) {
    return { error: "A user with that email already exists." };
  }

  await exec(
    "INSERT INTO users (id, email, full_name, role, password_hash, created_at) VALUES (?, ?, ?, ?, ?, ?)",
    [randomUUID(), email, fullName, role, await hashPassword(password), new Date()],
  );

  revalidatePath("/admin/users");
  return { success: `Created ${email}. Share the password with them securely (not by plain email).` };
}

export async function deleteUser(userId: string): Promise<{ ok: boolean; error?: string }> {
  const me = await requireAdmin();
  if (!isUuid(userId)) return { ok: false, error: "Invalid user." };
  if (userId === me.id) return { ok: false, error: "You can't delete your own account." };

  const target = await queryOne<{ role: StaffRole }>("SELECT role FROM users WHERE id = ?", [userId]);
  if (!target) return { ok: false, error: "User not found." };
  if (target.role === "admin" && (await adminCount()) <= 1) {
    return { ok: false, error: "You can't delete the last admin." };
  }

  // Sessions are removed by the foreign key (ON DELETE CASCADE).
  await exec("DELETE FROM users WHERE id = ?", [userId]);
  revalidatePath("/admin/users");
  return { ok: true };
}

export async function updateUserRole(userId: string, role: StaffRole): Promise<{ ok: boolean; error?: string }> {
  const me = await requireAdmin();
  if (!isUuid(userId) || !isRole(role)) return { ok: false, error: "Invalid request." };
  if (userId === me.id) return { ok: false, error: "You can't change your own role." };

  await exec("UPDATE users SET role = ? WHERE id = ?", [role, userId]);
  revalidatePath("/admin/users");
  return { ok: true };
}

export async function resetUserPassword(userId: string, password: string): Promise<{ ok: boolean; error?: string }> {
  await requireAdmin();
  if (!isUuid(userId)) return { ok: false, error: "Invalid user." };
  const problem = validatePassword(password);
  if (problem) return { ok: false, error: problem };

  await exec("UPDATE users SET password_hash = ? WHERE id = ?", [await hashPassword(password), userId]);
  await destroyAllSessions(userId);
  return { ok: true };
}
