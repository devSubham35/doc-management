import { PAGE_PATHS } from "./lib/routes/PageRoutes";
import { NextRequest, NextResponse } from "next/server";
import { constant } from "./lib/constant";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/sign-up", "/sign-in", "/"];

/// Check Public route
const isAuthPublicRoute = (pathname: string) => {
  return publicRoutes.some((route) => pathname === route);
};

/// Check Protected route
const isProtectedRoute = (pathname: string) => {
  return protectedRoutes.some((route) => pathname.startsWith(route));
};

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(constant.DOC_ACCESS_TOKEN)?.value;

  // 1. Not logged in, trying to access protected route → redirect to sign-in
  if (!token && isProtectedRoute(pathname)) {
    return NextResponse.redirect(
      new URL(PAGE_PATHS.auth.signIn, req.url)
    );
  }

  // 2. Logged in, trying to access auth/public route → redirect to dashboard
  if (token && isAuthPublicRoute(pathname)) {
    return NextResponse.redirect(
      new URL(PAGE_PATHS.clinician.dashboard.overview, req.url)
    );
  }

  // 3. Otherwise → continue
  return NextResponse.next();
}
