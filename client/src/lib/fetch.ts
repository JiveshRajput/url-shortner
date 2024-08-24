import { COOKIES } from '@/features/auth/constants';
import { createSession, getAccessTokenByRefreshToken } from '@/features/auth/server-actions';
import { BACKEND_API_URL } from '@/features/common';
import { getCookies } from '@/utils';
import { redirect } from 'next/navigation';
import { Fetcher } from './fetcher';

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

// TODO (bug): Save latest accessToken in cookies. Now it's giving an error
// only save cookies server actions or route api.

fetchInstance.interceptor.response = async (response, request) => {
  console.log('response status: ', response.status);
  console.log('response url: ', response.url);
  if (request.url !== `http://127.0.0.1:5050/app/v1/auth/authenticate`)
    console.log('request:', request);

  let accessToken = '';
  let isRetry = false; // TODO: Implment isRetry logic
  if (response.status === 401) {
    try {
      console.log('INSIDE RESPONSE INTERCEPTOR 401 ERROR');
      try {
        accessToken = await getAccessTokenByRefreshToken();
        console.log('ACCESS TOKEN:', accessToken);
      } catch (error) {
        console.log('GET ACCESS TOKEN ERROR', error);
        // TODO (bug): Shift it outside the catch block
        redirect('/sign-in');
      }
      await createSession(accessToken);
      console.log('accesstoken new request:', accessToken);

      const newRequest: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        ...(request.body ? { body: request.body } : {}),
        method: request.method,
      };

      const response = await fetch(request.url, newRequest);
      // const responseData = await response.json();
      // console.log('inteceptor responseData', responseData);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  return response;
};

export { fetchInstance as fetch };

