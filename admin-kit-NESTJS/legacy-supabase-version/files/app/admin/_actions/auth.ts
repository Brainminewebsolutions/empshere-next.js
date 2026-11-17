"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { requireStaff } from "@/lib/auth";
import { createSecretClient, createSessionClient } from "@/lib/supabase/server";
import { supabasePublishableKey, supabaseUrl } from "@/lib/supabase/env";
import { toLoginEmail, validatePassword } from "./validation";

export type FormState = { error?: string; success?: string } | undefined;

// Supabase's own sign-in rate limit is per client IP - but sign-in runs on
// our server, so Supabase only ever sees the server's IP. These limits are
// enforced here instead, per real visitor IP and per account.
const WINDOW_MINUTES = 15;
const MAX_FAILS_PER_EMAIL = 5;
const MAX_FAILS_PER_IP = 20;

async function clientIp() {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

export async function login(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = toLoginEmail(String(formData.get("email") ?? ""));
  const password = String(formData.get("password") ?? "");

  if (!email || !password || email.length > 254 || password.length > 200) {
    return { error: "Enter your username (or email) and password." };
  }

  const ip = await clientIp();
  const secret = createSecretClient();
  const since = new Date(Date.now() - WINDOW_MINUTES * 60_000).toISOString();

  const [byEmail, byIp] = await Promise.all([
    secret
      .from("login_attempts")
      .select("id", { count: "exact", head: true })
      .eq("email", email)
      .eq("succeeded", false)
      .gte("created_at", since),
    secret
      .from("login_attempts")
      .select("id", { count: "exact", head: true })
      .eq("ip", ip)
      .eq("succeeded", false)
      .gte("created_at", since),
  ]);

  if ((byEmail.count ?? 0) >= MAX_FAILS_PER_EMAIL || (byIp.count ?? 0) >= MAX_FAILS_PER_IP) {
    return {
      error: `Too many failed attempts. Try again in ${WINDOW_MINUTES} minutes.`,
    };
  }

  const supabase = await createSessionClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  let isStaff = false;
  if (!error && data.user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", data.user.id)
      .maybeSingle();
    isStaff = Boolean(profile);
    if (!isStaff) await supabase.auth.signOut({ scope: "local" });
  }

  await secret.from("login_attempts").insert({ email, ip, succeeded: isStaff });

  if (!isStaff) {
    // Same message for wrong password, unknown email and non-staff user,
    // so the form can't be used to discover which emails have accounts.
    return { error: "Invalid email or password." };
  }

  redirect("/admin/");
}

export async function logout() {
  const supabase = await createSessionClient();
  await supabase.auth.signOut({ scope: "local" });
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

  // Re-check the current password with a throwaway client, so a session
  // left open on a shared computer can't be used to take over the account.
  const verifier = createClient(supabaseUrl(), supabasePublishableKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { error: verifyError } = await verifier.auth.signInWithPassword({
    email: staff.email,
    password: current,
  });
  if (verifyError) return { error: "Your current password is incorrect." };
  await verifier.auth.signOut({ scope: "local" });

  const supabase = await createSessionClient();
  const { error } = await supabase.auth.updateUser({ password: next });
  if (error) return { error: error.message };

  return { success: "Password updated." };
}
