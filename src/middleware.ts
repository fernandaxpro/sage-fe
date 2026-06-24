import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWTExtended } from "./types/Auth";
import { getToken } from "next-auth/jwt";
import environtment from "./config/environtment";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";
    if (isMaintenanceMode && pathname !== "/maintenance") {
        return NextResponse.redirect(new URL("/maintenance", request.url));
    }
    if (!isMaintenanceMode && pathname === "/maintenance") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    const token: JWTExtended | null = await getToken({
        req: request,
        secret: environtment.AUTH_SECRET
    });
    
    // const protectedRoutes = ["/user/profile", "/user/wishlist"];
    const protectedRoutes = ["/user"];
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    
    const authRoutes = ["/auth/login", "/auth/register"];
    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
    
    if (!token && isProtectedRoute) {
        const url = new URL('/auth/login', request.url);
        url.searchParams.set('callbackUrl', pathname); 
        return NextResponse.redirect(url);
    }
    
    if (token && isAuthRoute) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/auth/:path*",
        "/user/:path*",
        "/((?!_next/static|_next/image|favicon.ico|maintenance-bg.jpg|sage-logo.png).*)",
    ]
}