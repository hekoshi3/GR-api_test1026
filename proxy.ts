import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
    const cookieStore = await cookies()
    const token = cookieStore.has('auth_session')
    const { pathname } = request.nextUrl;

    const isProtectedRoute = pathname.startsWith("/");

    if (isProtectedRoute && !token) {
        const authPage = new URL('/auth', request.url)
        return NextResponse.redirect(authPage);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next|auth).*)",
    ],
};