import { BACKEND_API_URL } from '@/features/common';
// import { Fetcher } from './fetcher';

// const fetchs = new Fetcher({
//   baseUrl: BACKEND_API_URL,
//   headers: { 'Content-Type': 'application/json' },
// });

// fetchs.baseUrl = BACKEND_API_URL;

// fetchs.interceptor.request = (options) => {
//   return options;
// };

const fetcher = async (url: string, body: object = {}, options: RequestInit = {}) => {
  const fullUrl = `${BACKEND_API_URL}${url}`;

  if (!options) {
    return await fetch(fullUrl);
  }
  return await fetch(fullUrl, {
    headers: {
      'content-type': 'application/json',
      ...options.headers,
    },
    ...options,
    body: JSON.stringify(body),
    method: 'GET',
  });
};

fetcher.get = async (url: string, body: object = {}, options: RequestInit = {}) => {
  const fullUrl = `${BACKEND_API_URL}${url}`;

  if (!options) {
    return await fetch(fullUrl, { method: 'GET' });
  }

  return await fetch(fullUrl, {
    headers: {
      'content-type': 'application/json',
      ...options.headers,
    },
    ...options,
    body: JSON.stringify(body),
    method: 'GET',
  });
};

fetcher.post = async (url: string, body: object = {}, options: RequestInit = {}) => {
  const fullUrl = `${BACKEND_API_URL}${url}`;

  if (!options) {
    return await fetch(fullUrl, { method: 'POST' });
  }

  return await fetch(fullUrl, {
    headers: {
      'content-type': 'application/json',
      ...options.headers,
    },
    ...options,
    body: JSON.stringify(body),
    method: 'POST',
  });
};

export { fetcher as fetch };
