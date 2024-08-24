import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { authenticateUserApi } from './features/auth/api';

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*', '/verify-otp'],
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest, event: NextFetchEvent) {
  try {
    console.log('middleware called');
    // console.log(request.nextUrl.pathname);

    const response = await authenticateUserApi();
    const data = await response.json();

    if (data.statusCode !== 200) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }
}
