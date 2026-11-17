"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  createSession,
  destroyAllSessions,
  destroySession,
  requireStaff,
} from "@/lib/auth";
import { count, describeDbError, exec, queryOne } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/password";
import { toLoginEmail, validatePassword } from "./validation";

export type FormState = { error?: string; success?: string } | undefined;

// Brute-force limits, enforced per account and per visitor IP.
const WINDOW_MINUTES = 15;
const MAX_FAILS_PER_EMAIL = 5;
const MAX_FAILS_PER_IP = 20;

// Hash of a throwaway password: verified against when the account does not
// exist, so "unknown user" and "wrong password" take the same time.
const DUMMY_HASH =
  "scrypt$16384$8$1$AAAAAAAAAAAAAAAAAAAAAA==$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==";

async function clientInfo() {
  const h = await headers();
  return {
    ip: h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown",
    userAgent: h.get("user-agent") ?? "",
  };
}

export async function login(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = toLoginEmail(String(formData.get("email") ?? ""));
  const password = String(formData.get("password") ?? "");

  if (!email || !password || email.length > 190 || password.length > 200) {
    return { error: "Enter your username (or email) and password." };
  }

  const { ip, userAgent } = await clientInfo();

  try {
    const since = new Date(Date.now() - WINDOW_MINUTES * 60_000);
    const [byEmail, byIp] = await Promise.all([
      count("SELECT COUNT(*) AS n FROM login_attempts WHERE email = ? AND succeeded = 0 AND created_at >= ?", [email, since]),
      count("SELECT COUNT(*) AS n FROM login_attempts WHERE ip = ? AND succeeded = 0 AND created_at >= ?", [ip, since]),
    ]);
    if (byEmail >= MAX_FAILS_PER_EMAIL || byIp >= MAX_FAILS_PER_IP) {
      return { error: `Too many failed attempts. Try again in ${WINDOW_MINUTES} minutes.` };
    }

    const user = await queryOne<{ id: string; password_hash: string }>(
      "SELECT id, password_hash FROM users WHERE email = ? LIMIT 1",
      [email],
    );
    const ok = await verifyPassword(password, user?.password_hash ?? DUMMY_HASH);
    const succeeded = Boolean(user) && ok;

    await exec("INSERT INTO login_attempts (email, ip, succeeded, created_at) VALUES (?, ?, ?, ?)", [
      email,
      ip.slice(0, 64),
      succeeded ? 1 : 0,
      new Date(),
    ]);
    // Keep the throttle table small.
    await exec("DELETE FROM login_attempts WHERE created_at < ?", [new Date(Date.now() - 7 * 86_400_000)]);

    // Same message for wrong password and unknown account, so the form
    // can't be used to discover which emails have accounts.
    if (!succeeded || !user) return { error: "Invalid email or password." };

    await createSession(user.id, ip, userAgent);
    await exec("UPDATE users SET last_login_at = ? WHERE id = ?", [new Date(), user.id]);
  } catch (err) {
    console.error("[admin login]", err);
    return { error: describeDbError(err) };
  }

  redirect("/admin/");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login/");
}

export async function changeOwnPassword(_prev: FormState, formData: FormData): Promise<FormState> {
  const staff = await requireStaff();
  const current = String(formData.get("current") ?? "");
  const next = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (next !== confirm) return { error: "The new passwords don't match." };
  const problem = validatePassword(next);
  if (problem) return { error: problem };
  if (next === current) return { error: "Choose a password different from the current one." };

  // Re-check the current password, so a session left open on a shared
  // computer can't be used to take over the account.
  const row = await queryOne<{ password_hash: string }>("SELECT password_hash FROM users WHERE id = ?", [staff.id]);
  if (!row || !(await verifyPassword(current, row.password_hash))) {
    return { error: "Your current password is incorrect." };
  }

  await exec("UPDATE users SET password_hash = ? WHERE id = ?", [await hashPassword(next), staff.id]);
  await destroyAllSessions(staff.id, true); // other devices must sign in again
  return { success: "Password updated." };
}
