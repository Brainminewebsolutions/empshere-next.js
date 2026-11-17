import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Next 16 "proxy" (formerly middleware). Runs only on /admin. Two jobs:
//  1. Refresh the Supabase session cookie before rendering, so Server
//     Components (which can't write cookies) always see a fresh token.
//  2. Bounce logged-out visitors to the login page early.
// This is NOT the security boundary - every admin page and server action
// re-checks the user itself via lib/auth.ts (requireStaff/requireAdmin).

const COOKIE_OPTIONS = {
  path: "/admin",
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    return new NextResponse("Admin is not configured (missing Supabase env vars).", {
      status: 503,
    });
  }

  const supabase = createServerClient(url, key, {
    cookieOptions: COOKIE_OPTIONS,
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, { ...options, ...COOKIE_OPTIONS });
        }
        for (const [headerName, headerValue] of Object.entries(headers ?? {})) {
          response.headers.set(headerName, headerValue);
        }
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoginPage = request.nextUrl.pathname.replace(/\/$/, "") === "/admin/login";

  if (!user && !isLoginPage) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login/";
    loginUrl.search = "";
    return NextResponse.redirect(loginUrl);
  }

  // Logged-in users on the login page are redirected by the page itself,
  // which can check they're actually staff (a Supabase user without a
  // profile row would otherwise loop between /admin and /admin/login).
  return response;
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
