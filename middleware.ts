// middleware.ts
import { Role } from "prisma/client";
import { jwtDecode } from "jwt-decode";
import { constant } from "@/lib/constant";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PAGE_PATHS } from "@/lib/routes/PageRoutes";

export function middleware(req: NextRequest) {
  const token = req.cookies.get(constant.DOC_ACCESS_TOKEN)?.value;
  const { pathname } = req.nextUrl;

  // --- Role → Dashboard mapping
  const roleRoutes: Record<Role, string> = {
    CLINICIAN: PAGE_PATHS.clinician.dashboard.overview,
    SUPERVISOR: PAGE_PATHS.supervisor.dashboard.overview,
    SCHOOL_PARTNER: PAGE_PATHS.partner.dashboard.overview,
    PAYROLL: PAGE_PATHS.payrole.dashboard.overview,
  };

  // --- If no token
  if (!token) {
    // allow access to auth pages without redirect loop
    if (
      pathname === PAGE_PATHS.auth.signIn ||
      pathname === PAGE_PATHS.auth.signUp
    ) {
      return NextResponse.next();
    }

    // otherwise → force login
    return NextResponse.redirect(new URL(PAGE_PATHS.auth.signIn, req.url));
  }

  // --- Decode token
  let userRole: Role | null = null;
  try {
    const decoded: { role: Role } = jwtDecode(token);
    userRole = decoded.role;
  } catch (e) {
    console.error("Invalid token", e);
    return NextResponse.redirect(new URL(PAGE_PATHS.auth.signIn, req.url));
  }

  // --- If logged in but visiting sign-in/sign-up → redirect to dashboard
  if (
    pathname === PAGE_PATHS.auth.signIn ||
    pathname === PAGE_PATHS.auth.signUp
  ) {
    return NextResponse.redirect(new URL(roleRoutes[userRole], req.url));
  }

  // --- Enforce role-based dashboard access
  if (pathname.startsWith("/dashboard/clinician") && userRole !== Role.CLINICIAN) {
    return NextResponse.redirect(new URL(roleRoutes[userRole], req.url));
  }
  if (pathname.startsWith("/dashboard/supervisor") && userRole !== Role.SUPERVISOR) {
    return NextResponse.redirect(new URL(roleRoutes[userRole], req.url));
  }
  if (pathname.startsWith("/dashboard/partner") && userRole !== Role.SCHOOL_PARTNER) {
    return NextResponse.redirect(new URL(roleRoutes[userRole], req.url));
  }
  if (pathname.startsWith("/dashboard/payrole") && userRole !== Role.PAYROLL) {
    return NextResponse.redirect(new URL(roleRoutes[userRole], req.url));
  }

  return NextResponse.next();
}

// --- Apply only to auth + dashboard routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/sign-in",
    "/sign-up",
  ],
};
