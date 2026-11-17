import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { exec, queryOne } from "./db";

export type StaffRole = "admin" | "editor";

export type StaffUser = {
  id: string;
  email: string;
  fullName: string;
  role: StaffRole;
};

export const SESSION_COOKIE = "ws_admin_session";
const SESSION_DAYS = 7;

// Cookie only needs to reach /admin (pages and the server actions posted to
// them). httpOnly: JavaScript in the browser can never read it.
const COOKIE_OPTIONS = {
  path: "/admin",
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};

const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");

// Creates a session row and sets the cookie. Server actions only.
export async function createSession(userId: string, ip: string, userAgent: string) {
  const token = randomBytes(32).toString("base64url");
  const expires = new Date(Date.now() + SESSION_DAYS * 86_400_000);
  await exec("INSERT INTO sessions (id, user_id, expires_at, created_at, ip, user_agent) VALUES (?, ?, ?, ?, ?, ?)", [
    sha256(token),
    userId,
    expires,
    new Date(),
    ip.slice(0, 64),
    userAgent.slice(0, 255),
  ]);
  // Opportunistic cleanup of expired sessions.
  await exec("DELETE FROM sessions WHERE expires_at < ?", [new Date()]);
  (await cookies()).set(SESSION_COOKIE, token, { ...COOKIE_OPTIONS, expires });
}

// Deletes the current session row and the cookie. Server actions only.
export async function destroySession() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) await exec("DELETE FROM sessions WHERE id = ?", [sha256(token)]);
  store.set(SESSION_COOKIE, "", { ...COOKIE_OPTIONS, maxAge: 0 });
}

// Logs a user out everywhere (after a password change / reset).
export async function destroyAllSessions(userId: string, exceptCurrent = false) {
  if (exceptCurrent) {
    const token = (await cookies()).get(SESSION_COOKIE)?.value;
    if (token) {
      await exec("DELETE FROM sessions WHERE user_id = ? AND id <> ?", [userId, sha256(token)]);
      return;
    }
  }
  await exec("DELETE FROM sessions WHERE user_id = ?", [userId]);
}

// Looks the session up in the database on every call, so a deleted user or
// revoked session is locked out immediately. cache() dedupes it within one
// request (layout + page + action).
export const getCurrentStaff = cache(async (): Promise<StaffUser | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token || token.length > 100) return null;

  const row = await queryOne<{ id: string; email: string; full_name: string; role: StaffRole }>(
    `SELECT u.id, u.email, u.full_name, u.role
       FROM sessions s JOIN users u ON u.id = s.user_id
      WHERE s.id = ? AND s.expires_at > ?
      LIMIT 1`,
    [sha256(token), new Date()],
  );
  if (!row) return null;
  return { id: row.id, email: row.email, fullName: row.full_name, role: row.role };
});

// Every admin page and every server action calls one of these. The proxy
// redirect is only a convenience; this is the real gate.
export async function requireStaff(): Promise<StaffUser> {
  const staff = await getCurrentStaff();
  if (!staff) redirect("/admin/login/");
  return staff;
}

export async function requireAdmin(): Promise<StaffUser> {
  const staff = await requireStaff();
  if (staff.role !== "admin") redirect("/admin/");
  return staff;
}
