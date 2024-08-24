import { COOKIES } from '@/features/auth/constants';
import { BACKEND_API_URL } from '@/features/common';
import { getCookies } from '@/utils';
import { Fetcher } from './fetcher';
import { getAccessTokenApi } from '@/features/auth/api';
import { createSession } from '@/features/auth/server-actions';
import { redirect } from 'next/navigation';

const fetchInstance = new Fetcher({
  baseUrl: BACKEND_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

fetchInstance.baseUrl = BACKEND_API_URL;

fetchInstance.interceptor.request = (options) => {
  const accessToken = getCookies(COOKIES.ACCESS_TOKEN);
  const userId = getCookies(COOKIES.USER_ID);

  options.headers = {
    ...options.headers,
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  options.body = {
    ...(userId ? { userId } : {}),
  } as BodyInit;

  return options;
};

fetchInstance.interceptor.response = async (response, request) => {
  console.log('response status: ', response.status);
  console.log('response url: ', response.url);
  // console.log('request:', request);

  if (response.status === 401) {
    try {
      const refreshToken = getCookies(COOKIES.REFRESH_TOKEN) as string;
      const accessTokenResponse: any = await getAccessTokenApi({ refreshToken });
      const accessTokenData: any = await accessTokenResponse.json();
      console.log(accessTokenData);
      createSession(accessTokenData?.data?.accessToken as string);
    } catch (error) {
      redirect('/sign-in');
    }
  }
  return response;
};

export { fetchInstance as fetch };
