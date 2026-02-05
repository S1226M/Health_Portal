import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_PATHS = ["/login", "/register"];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // ✅ Allow public pages
    if (PUBLIC_PATHS.includes(pathname)) {
        return NextResponse.next();
    }

    // ✅ Ignore Next.js internals & static files
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/static") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    // ✅ Get token from cookie
    const token = request.cookies.get("auth_token")?.value;

    // ❌ No token → block everything
    if (!token) {
        return redirectToLogin(request);
    }

    try {
        // ✅ Verify token
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jwtVerify(token, secret);

        // ✅ Token valid → allow request
        return NextResponse.next();
    } catch {
        // ❌ Invalid / expired token
        return redirectToLogin(request);
    }
}

// 🔁 Common redirect function
function redirectToLogin(request: NextRequest) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
