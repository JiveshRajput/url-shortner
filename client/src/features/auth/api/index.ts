import { BACKEND_API_URL } from '@/features/common';

export const signInApi = async (credentials: { email: string; password: string }) => {
  return fetch(`${BACKEND_API_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'content-type': 'application/json',
    },
  });
};
