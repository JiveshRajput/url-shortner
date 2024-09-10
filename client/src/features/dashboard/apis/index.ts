export * from './profile';

import { API_ROUTE, CACHING_TAGS } from '@/features/common';
import { fetch } from '@/lib/fetch';
import { ICreateShortUrlApiPayload } from './types';

export const getAllUrlsApi = async (userId: string) => {
  return fetch.get(
    `${API_ROUTE.SHORT_URL.GET_ALL_URL}/${userId}`,
    {},
    { next: { tags: [CACHING_TAGS.USER_ALL_URL] } },
  );
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

export const updateShortUrlsApi = async (
  shortUrlId: string,
  payload: ICreateShortUrlApiPayload,
) => {
  return fetch.patch(`${API_ROUTE.SHORT_URL.UPDATE_URL}/${shortUrlId}`, payload);
};

export const getShortUrlApi = async (shortUrlId: string) => {
  return fetch.get(`${API_ROUTE.SHORT_URL.GET_URL}/${shortUrlId}`);
};

export const deleteShortUrlApi = async (shortUrlId: string) => {
  return fetch.delete(`${API_ROUTE.SHORT_URL.DELETE_URL}/${shortUrlId}`);
};
