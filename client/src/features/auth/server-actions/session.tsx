'use server';
import { ACCESS_TOKEN_EXPIRY } from '@/features/common';

import { cookies } from 'next/headers';
import { COOKIES } from '../constants';
import { deleteCookies, setCookies } from '@/utils';

export async function createSession(accessToken: string) {
  const accessTokenExpiry = new Date(Date.now() + ACCESS_TOKEN_EXPIRY);

  setCookies(COOKIES.ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    secure: true,
    expires: accessTokenExpiry,
    sameSite: 'lax',
    path: '/',
  });
}

export async function updateSession() {
  const accessToken = cookies().get(COOKIES.ACCESS_TOKEN)?.value;

  if (!accessToken) {
    return null;
  }

  const accessTokenExpiry = new Date(Date.now() + ACCESS_TOKEN_EXPIRY);

  setCookies(COOKIES.ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    secure: true,
    expires: accessTokenExpiry,
    sameSite: 'lax',
    path: '/',
  });
}

export async function deleteSession() {
  deleteCookies(COOKIES.ACCESS_TOKEN);
  deleteCookies(COOKIES.REFRESH_TOKEN);
  deleteCookies(COOKIES.USER_ID);
}
