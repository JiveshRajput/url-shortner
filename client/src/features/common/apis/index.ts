import { fetch } from '@/lib/fetch';
import { API_ROUTE, CACHING_TAGS } from '../constants';

export const getUserDetailsApi = async (userId: string) => {
  return fetch.get(
    `${API_ROUTE.COMMON.GET_USER_BY_ID}/${userId}`,
    // {},
    // {
    //   next: { tags: [CACHING_TAGS.USER, userId] },
    //   cache: 'force-cache',
    // },
  );
};
