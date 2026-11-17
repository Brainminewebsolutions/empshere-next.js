import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import {
  AUTH_COOKIE_OPTIONS,
  supabasePublishableKey,
  supabaseSecretKey,
  supabaseUrl,
} from "./env";

// Per-request client acting as the logged-in admin user. RLS applies, so
// even a bug in an action can't write anything the user's role forbids.
export async function createSessionClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl(), supabasePublishableKey(), {
    cookieOptions: AUTH_COOKIE_OPTIONS,
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, { ...options, ...AUTH_COOKIE_OPTIONS });
          }
        } catch {
          // Called from a Server Component, where cookies are read-only.
          // Safe to ignore: proxy.ts refreshes the session on every /admin
          // request before rendering starts.
        }
      },
    },
  });
}

// Anonymous, cookie-less client for the public blog pages. No cookies
// means the pages stay statically rendered / ISR-cached.
export function createPublicClient() {
  return createClient(supabaseUrl(), supabasePublishableKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// Bypasses RLS. Only call after requireAdmin() (or for login throttling).
export function createSecretClient() {
  return createClient(supabaseUrl(), supabaseSecretKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
