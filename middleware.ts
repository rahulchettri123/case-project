import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from "@/auth";

// This middleware function will be used for authentication checks
export async function middleware(request: NextRequest) {
  // You can implement additional middleware logic here if needed
  
  // For now, we'll just proceed with all requests
  return NextResponse.next();
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    // Match all paths except static assets, API routes, and images
    '/((?!_next/static|_next/image|favicon.ico|api/auth).*)',
  ],
}; 