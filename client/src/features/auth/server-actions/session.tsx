'use server';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from '@/features/common';

export async function createSession(accessToken: string, refreshToken: string) {
  const accessTokenExpiry = new Date(Date.now() + ACCESS_TOKEN_EXPIRY);

  cookies().set('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    expires: accessTokenExpiry,
    sameSite: 'lax',
    path: '/',
  });

  const refreshTokenExpiry = new Date(Date.now() + REFRESH_TOKEN_EXPIRY);
  cookies().set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    expires: refreshTokenExpiry,
    sameSite: 'lax',
    path: '/',
  });
}
