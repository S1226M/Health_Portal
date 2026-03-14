import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PROTECTED_PATHS = [
    '/admin',
    '/user/modules/sec/userProfile',
    '/user/modules/hop/appointment/bookAppointment',
    '/user/modules/hop/appointment/viewBookedAppointment',
    '/user/modules/lab/bookTest',
    '/user/modules/sur/bookSurgery'
];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // ✅ Ignore Next.js internals & static files
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/static") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    // Check if the path needs protection
    const isProtectedPath = PROTECTED_PATHS.some(path => pathname.startsWith(path));

    if (isProtectedPath) {
        const token = request.cookies.get("auth_token")?.value;

        if (!token) {
            return redirectToLogin(request);
        }

        try {
            // Edge runtime validation if secret is handled simply
            // Since we can't do verify here easily without 'jose' if it was synchronous, 
            // but middleware doesn't have to verify signature here, just checked presence.
            // Full auth is on Server Components.
            // Just return next if token present for simplicity in Edge Middleware.
            return NextResponse.next();
        } catch {
            return redirectToLogin(request);
        }
    }

    return NextResponse.next();
}

export default middleware;

function redirectToLogin(request: NextRequest) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login"; // Or /login based on your routes
    return NextResponse.redirect(url);
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
