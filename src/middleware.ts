import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Middleware function
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Allow static assets and API routes to bypass authentication
  if (url.pathname.startsWith("/_next") || url.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Redirect authenticated users away from auth pages
  if (token && (url.pathname === "/sign-in" || url.pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect unauthenticated users to sign-in for protected routes
  if (!token && url.pathname !== "/sign-in" && url.pathname !== "/sign-up") {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Allow request to proceed if no redirection is required
  return NextResponse.next();
}

// Matcher configuration
export const config = {
  matcher: ["/((?!_next|api).*)"], // Match all except static assets and API routes
};
