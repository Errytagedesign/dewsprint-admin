import { updateSession } from '@/services/session';
import { NextRequest, NextResponse } from 'next/server';

const excludedPaths = [
  '/signin',
  '/signup',
  '/verify-email',
  '/reset-password',
  '/forgot-password-request',
  '/forgot-password-code',
  '/password-success',
  '/signup-success',
  '/onboarding',
  '/ops',
];

export async function middleware(request: NextRequest) {
  if (excludedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  return await updateSession(request);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
