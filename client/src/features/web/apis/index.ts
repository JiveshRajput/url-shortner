import { API_ROUTE } from '@/features/common';
import { fetch } from '@/lib/fetch';

export const getFullUrlApi = async (id: string) => {
  return fetch.get(`${API_ROUTE.SHORT_URL.GET_CLICK_URL}/${id}`);
};
