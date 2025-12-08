export type UserRole = "admin" | "host" | "user";

export type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

// Public/auth routes
export const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

// Common protected routes (all roles)
export const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "/settings", "/change-password"],
  patterns: [],
};

// Role-based protected routes
export const hostProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/host/], // e.g., /host/* routes
};

export const adminProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/admin/],
};

export const userProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/dashboard/], // e.g., /dashboard/* routes
};

// Utility functions
export const isAuthRoute = (pathname: string) => authRoutes.includes(pathname);

export const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
  if (routes.exact.includes(pathname)) return true;
  return routes.patterns.some((pattern) => pattern.test(pathname));
};

export const getRouteOwner = (pathname: string): "admin" | "host" | "user" | "common" | null => {
  if (isRouteMatches(pathname, adminProtectedRoutes)) return "admin";
  if (isRouteMatches(pathname, hostProtectedRoutes)) return "host";
  if (isRouteMatches(pathname, userProtectedRoutes)) return "user";
  if (isRouteMatches(pathname, commonProtectedRoutes)) return "common";
  return null;
};

export const getDefaultDashboardRoute = (role: UserRole): string => {
  switch (role) {
    case "admin": return "/admin/dashboard";
    case "host": return "/host/dashboard";
    case "user": return "/dashboard";
    default: return "/";
  }
};

export const isValidRedirectForRole = (redirectPath: string, role: UserRole): boolean => {
  const routeOwner = getRouteOwner(redirectPath);
  if (!routeOwner || routeOwner === "common") return true;
  return routeOwner === role;
};
