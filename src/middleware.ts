import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWTExtended } from "./types/Auth";
import { getToken } from "next-auth/jwt";
import environtment from "./config/environtment";

export async function middleware(request: NextRequest) {
    const token: JWTExtended | null = await getToken({
        req: request,
        secret: environtment.AUTH_SECRET
    });
    
    const { pathname } = request.nextUrl;
    
    const protectedRoutes = ["/user/profile", "/product/wishlist"];
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
        "/user/profile/:path*",
        "/product/wishlist/:path*",
    ]
}