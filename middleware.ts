// Import the auth middleware
export { auth as middleware } from "@/auth"

// Configure middleware to only run on specific paths
export const config = {
  matcher: [
    // Match all paths that should maintain session state
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
} 