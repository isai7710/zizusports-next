import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  /* --- MIDDLEWARE LOGIC --- */
  /* --- prevent users from accessing team-kit specific routes without valid team code session --- */
  if (req.nextUrl.pathname.startsWith("/shop/uniform-kits/team/")) {
    // Get the team session from the cookie
    const teamSession = req.cookies.get("team-session");

    // If there's no team session cookie, redirect to the /shop/uniform-kits/ route
    if (!teamSession) {
      return NextResponse.redirect(new URL("/shop/uniform-kits", req.url));
    }
  }

  // If the request passes the middleware check, allow it to proceed
  return NextResponse.next();
}

// Define the configuration for the middleware
export const config = {
  matcher: "/shop/uniform-kits/:path*",
};
