import { clerkMiddleware } from "@clerk/nextjs/server";

// Run Clerk middleware for all routes so server components/actions can use
// `currentUser()` / `auth()` reliably. Route-level access control is enforced
// inside pages/actions via redirects, to avoid middleware 404 behavior on RSC
// requests.
export default clerkMiddleware();

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
