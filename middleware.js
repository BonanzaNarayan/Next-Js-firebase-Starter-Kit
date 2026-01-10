import { NextResponse } from "next/server";

export function middleware(request) {
  // Simple middleware to protect routes. 
  // In a real app, you would verify the session cookie here using firebase-admin.
  // For this boilerplate, we'll assume client-side protection for simplicity, 
  // or you can implement session cookie verification if needed.
  
  // Example: Redirect to login if accessing /dashboard without a session cookie
  // const session = request.cookies.get("session");
  // if (!session && request.nextUrl.pathname.startsWith("/dashboard")) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/protected/:path*"],
};
