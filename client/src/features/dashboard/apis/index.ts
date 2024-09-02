import { API_ROUTE } from '@/features/common';
import { fetch } from '@/lib/fetch';

export const getAllUrlsApi = async (userId: string) => {
  return fetch.get(`${API_ROUTE.SHORT_URL.GET_ALL_URL}/${userId}`);
};
