import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Encode the secret for jose
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

// Public routes that don't require authentication
const PUBLIC_ROUTES = ["/login", "/register", "/forgot-password"];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // ✅ Ignore Next.js internals & static files
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/static") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    // Skip middleware for public routes
    if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
        return NextResponse.next();
    }

    // Skip middleware for the root page - it handles its own redirect
    if (pathname === "/") {
        return NextResponse.next();
    }

    // Get the auth token from cookies
    const token = request.cookies.get("auth_token")?.value;

    // No token on protected routes → redirect to login
    if (!token) {
        return redirectToLogin(request, true);
    }

    // Verify the token
    try {
        const { payload } = await jwtVerify(token, SECRET);
        const role = payload.role as string | undefined;

        // Admin routes: only Admin role allowed
        if (pathname.startsWith("/admin")) {
            if (role !== "Admin") {
                return redirectToLogin(request, true);
            }
        }

        // User routes: Patient role allowed (and potentially Doctor, but let's restrict to Patient per requirements)
        if (pathname.startsWith("/user")) {
            if (role !== "Patient") {
                return redirectToLogin(request, true);
            }
        }

        // Token is valid and role matches — allow the request
        return NextResponse.next();
    } catch {
        // Invalid or expired token → redirect to login
        return redirectToLogin(request, true);
    }
}

export default middleware;

function redirectToLogin(request: NextRequest, unauthorized = false) {
    const url = request.nextUrl.clone();
    url.pathname = "/login"; // App uses /login, not /auth/login
    if (unauthorized) {
        url.searchParams.set("unauthorized", "true");
    }
    return NextResponse.redirect(url);
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
