import { COOKIES } from '@/features/auth/constants';
import { BACKEND_API_URL } from '@/features/common';
import { getCookies } from '@/utils';
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

  if (userId) {
    options.body = (userId ? { userId } : {}) as BodyInit;
  }

  return options;
};

fetchInstance.interceptor.response = async (response) => {
  console.log('response status: ', response.status);
  console.log('response url: ', response.url);

  if (response.status === 401) {
  }
  return response;
};

export { fetchInstance as fetch };
