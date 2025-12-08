import jwt, { JwtPayload } from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./lib/auth-utils";

// Read cookie helper
const getCookie = (request: NextRequest, name: string): string | null => {
  return request.cookies.get(name)?.value || null;
};

// Delete cookie helper
const deleteCookie = (response: NextResponse, name: string) => {
  response.cookies.set({
    name,
    value: "",
    path: "/",
    expires: new Date(0), // Expire immediately
  });
};
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = getCookie(request, "accessToken");
  let userRole: UserRole | null = null;
  if (accessToken) {
    try {
      const verifiedToken = jwt.verify(
        accessToken,
        process.env.JWT_SECRET!
      ) as JwtPayload & { role: UserRole };

      if (!verifiedToken || typeof verifiedToken === "string")
        throw new Error("Invalid token");
      userRole = verifiedToken.role;
    } catch (err) {
      console.log(err);
      const response = NextResponse.redirect(new URL("/login", request.url));
      deleteCookie(response, "accessToken");
      return response;
    }
  }

  const routeOwner = getRouteOwner(pathname);
  const isAuth = isAuthRoute(pathname);

  // Logged-in user trying to access login/register pages
  if (accessToken && isAuth) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole!), request.url)
    );
  }

  // Public route
  if (!routeOwner) return NextResponse.next();

  // Protected route but user not logged in
  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Common protected route
  if (routeOwner === "common") return NextResponse.next();

  // Role-protected route
  if (["admin", "host", "user"].includes(routeOwner)) {
    if (userRole !== routeOwner) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole!), request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
