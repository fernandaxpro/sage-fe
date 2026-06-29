import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWTExtended } from "./types/Auth";
import { getToken } from "next-auth/jwt";
import environtment from "./config/environtment";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";
    const maintenanceType = process.env.NEXT_PUBLIC_MAINTENANCE_TYPE || "default";
    const maintenancePage = maintenanceType === "promotion" ? "/maintenance-promotion" : "/maintenance";
    const maintenanceExcluded = ["/maintenance", "/maintenance-promotion"];

    if (isMaintenanceMode && !maintenanceExcluded.includes(pathname)) {
        return NextResponse.redirect(new URL(maintenancePage, request.url));
    }

    // Redirect away from maintenance pages when mode is off
    if (!isMaintenanceMode && maintenanceExcluded.includes(pathname)) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // When mode is on, redirect to the correct maintenance page if user lands on the wrong one
    if (isMaintenanceMode && maintenanceExcluded.includes(pathname) && pathname !== maintenancePage) {
        return NextResponse.redirect(new URL(maintenancePage, request.url));
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
        "/((?!_next/static|_next/image|favicon.ico|maintenance-bg\\.jpg|maintenance-bg\\.png|sage-logo\\.png|gta6-boxart\\.png|background/).*)",
    ]
}