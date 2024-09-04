import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { authenticateUserApi } from './features/auth/api';
import { COOKIES } from './features/auth/constants';

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*', '/verify-otp'],
};



// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest, event: NextFetchEvent) {
  try {
    const response = await authenticateUserApi();
    const data = await response.json();
    console.log('middleware authenticate user', data);

    if (data.statusCode === 401) {
      const response = NextResponse.redirect(new URL('/sign-in', request.url));
      response.cookies.delete(COOKIES.ACCESS_TOKEN);
      response.cookies.delete(COOKIES.REFRESH_TOKEN);
      response.cookies.delete(COOKIES.USER_ID);
      return response;
    }

    return NextResponse.next();
  } catch (error) {
    const response = NextResponse.redirect(new URL('/sign-in', request.url));
    response.cookies.delete(COOKIES.ACCESS_TOKEN);
    response.cookies.delete(COOKIES.REFRESH_TOKEN);
    response.cookies.delete(COOKIES.USER_ID);
    return response;
  }
}
