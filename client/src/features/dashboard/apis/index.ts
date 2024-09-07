import { API_ROUTE, CACHING_TAGS } from '@/features/common';
import { fetch } from '@/lib/fetch';
import { ICreateShortUrlApiPayload } from './types';

export const getAllUrlsApi = async (userId: string) => {
  return fetch.get(`${API_ROUTE.SHORT_URL.GET_ALL_URL}/${userId}`);
};

export const getUrlStatsApi = async (userId: string) => {
  return fetch.get(
    `${API_ROUTE.SHORT_URL.GET_URL_STATS}/${userId}`,
    {},
    { next: { tags: [CACHING_TAGS.URL_STATS] } },
  );
};

export const createShortUrlsApi = async (payload: ICreateShortUrlApiPayload) => {
  return fetch.post(API_ROUTE.SHORT_URL.CREATE_URL, payload);
};
