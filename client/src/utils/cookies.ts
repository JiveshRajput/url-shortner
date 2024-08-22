import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

export const setCookies = (key: string, value: string, cookie: Partial<ResponseCookie> = {}) => {
  cookies().set(key, value, cookie);
};

export const getCookies = (key: string) => {
  const cookieValue: string | undefined = cookies().get(key)?.value;

  if (!cookieValue) {
    return null;
  }

  return cookieValue;
};

export const deleteCookies = (key: string) => {
  cookies().delete(key);
};
