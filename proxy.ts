import { NextResponse, type NextRequest } from "next/server";

// Next 16 "proxy" (formerly middleware). Runs only on /admin.
// Convenience only: bounces visitors with no session cookie to the login
// page early. It is NOT the security boundary - every admin page and server
// action re-validates the session against the database (lib/auth.ts).
export function proxy(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname.replace(/\/$/, "") === "/admin/login";
  const hasCookie = request.cookies.has("ws_admin_session");

  if (!hasCookie && !isLoginPage) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login/";
    loginUrl.search = "";
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
