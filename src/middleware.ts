import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const protectedRoutes = ['/dashboard'];

// Routes that require admin role
const adminRoutes = ['/admin'];

// Routes that should redirect to home if already authenticated
const authRoutes = ['/login', '/register'];

// Simple JWT decode function (without verification for middleware)
function decodeJWT(token: string) {
    try {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        return decoded;
    } catch {
        return null;
    }
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const token = request.cookies.get('paft_token')?.value;

    // Check admin routes
    if (adminRoutes.some((route) => pathname.startsWith(route))) {
        if (!token) {
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }

        // Decode token to check role
        const decoded = decodeJWT(token);
        if (!decoded || (decoded.role !== 'admin' && decoded.role !== 'super_admin')) {
            // Redirect non-admin users to home page
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    // Redirect unauthenticated users away from other protected routes
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        if (!token) {
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    // Note: We do NOT redirect authenticated users away from /login or /register
    // here because the cookie and localStorage can be out of sync,
    // causing redirect loops. The client-side AuthContext handles this instead.

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/admin/:path*', '/login', '/register'],
};
