import { API_ROUTE, CACHING_TAGS } from '@/features/common';
import { fetch } from '@/lib/fetch';
import { ICreateFullUrlApi, IUpdateFullUrlApi } from './types';

export const getFullUrlApi = async (id: string) => {
  return fetch.get(
    `${API_ROUTE.SHORT_URL.GET_URL}${id}`,
    {},
    { next: { tags: [CACHING_TAGS.URL, id] }, cache: 'force-cache' },
  );
};

export const createShortUrlApi = async (data: ICreateFullUrlApi) => {
  return fetch.post(API_ROUTE.SHORT_URL.CREATE_URL, data);
};

export const updateShortUrlApi = async (data: IUpdateFullUrlApi) => {
  return fetch.patch(API_ROUTE.SHORT_URL.UPDATE_URL, data);
};

export const deleteShortUrlApi = async (id: string) => {
  return fetch.delete(`${API_ROUTE.SHORT_URL.DELETE_URL}${id}`);
};
