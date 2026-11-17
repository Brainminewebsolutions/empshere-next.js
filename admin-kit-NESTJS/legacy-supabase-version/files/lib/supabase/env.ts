import "server-only";

// Server-only on purpose (no NEXT_PUBLIC_ prefix): every Supabase call in
// this app runs on the server - the browser never talks to Supabase
// directly - so none of these values ever need to ship in client JS.
function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable ${name} - see .env.example`);
  }
  return value;
}

export function supabaseUrl() {
  return required("SUPABASE_URL");
}

// The "publishable" (formerly "anon") key. Safe-ish by design: RLS in
// supabase/schema.sql limits it to reading published posts.
export function supabasePublishableKey() {
  return required("SUPABASE_PUBLISHABLE_KEY");
}

// The "secret" (formerly "service_role") key. Bypasses RLS entirely - only
// used for user management and login throttling, never for anything a
// request can steer without an admin check first.
export function supabaseSecretKey() {
  return required("SUPABASE_SECRET_KEY");
}

// Session cookies only need to reach /admin (pages, server actions posted
// to those pages, and the proxy). Scoping them there keeps them off every
// public page request and out of any CDN cache key.
export const AUTH_COOKIE_OPTIONS = {
  path: "/admin",
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};
