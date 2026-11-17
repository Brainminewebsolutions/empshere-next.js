import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createSessionClient } from "./supabase/server";

export type StaffRole = "admin" | "editor";

export type StaffUser = {
  id: string;
  email: string;
  fullName: string;
  role: StaffRole;
};

// getUser() (not getSession()) on purpose: it re-validates the JWT with
// Supabase Auth on every call, so a deleted user or revoked session is
// locked out immediately instead of whenever the cookie expires.
// cache() dedupes it within one request (layout + page + action).
export const getCurrentStaff = cache(async (): Promise<StaffUser | null> => {
  const supabase = await createSessionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("email, full_name, role")
    .eq("id", user.id)
    .maybeSingle();

  // A valid Supabase login without a profile row is not staff.
  if (!profile) return null;

  return {
    id: user.id,
    email: profile.email,
    fullName: profile.full_name,
    role: profile.role as StaffRole,
  };
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
