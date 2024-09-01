import { fetch } from '@/lib/fetch';
import { API_ROUTE } from '../constants';

export const getUserDetailsApi = async (userId: string) => {
  return fetch.get(
    `${API_ROUTE.COMMON.GET_USER_BY_ID}/${userId}`,
    {},
    {
      next: { tags: ['user', userId] },
      cache: 'force-cache',
    },
  );
};
