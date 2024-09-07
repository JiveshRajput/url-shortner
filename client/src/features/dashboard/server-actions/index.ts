'use server';

import { COOKIES } from '@/features/auth/constants';
import { IStatus } from '@/types';
import { getCookies } from '@/utils';
import { createShortUrlsApi, deleteShortUrlApi, getAllUrlsApi, getUrlStatsApi } from '../apis';
import {
  ICreateShortUrlApi,
  ICreateShortUrlApiPayload,
  IGetAllUrlsApi,
  IGetUrlStatsApi,
} from '../apis/types';
import { revalidateTag } from 'next/cache';
import { CACHING_TAGS } from '@/features/common';

export async function getUrlStatsAction() {
  try {
    const userId = getCookies(COOKIES.USER_ID) as string;

    if (!userId) {
      throw new Error('User id not available');
    }

    const response: any = await getUrlStatsApi(userId);
    const data: IGetUrlStatsApi = await response.json();

    if (data.status === IStatus.FAIL) {
      throw new Error(data?.message);
    }
    return {
      successMessage: data?.message,
      data: data.data,
    };
  } catch (error: any) {
    console.error(error);
    return { errorMessage: String(error?.message) };
  }
}

export async function getAllUrlAction() {
  try {
    const userId = getCookies(COOKIES.USER_ID) as string;

    if (!userId) {
      throw new Error('User id not available');
    }

    const response: any = await getAllUrlsApi(userId);
    const data: IGetAllUrlsApi = await response.json();

    if (data.status === IStatus.FAIL) {
      throw new Error(data?.message);
    }
    return {
      successMessage: data?.message,
      data: data.data,
    };
  } catch (error: any) {
    console.error(error);
    return { errorMessage: String(error?.message) };
  }
}

export async function createShortUrlAction(formData: FormData) {
  try {
    const isActive = (formData.get('isActive') as string) === 'on' ? true : false;
    const shortUrl: string = formData.get('shortUrl') as string;

    const payload: ICreateShortUrlApiPayload = {
      fullUrl: formData.get('fullUrl') as string,
      isActive,
    };

    if (shortUrl) {
      payload.shortUrl = shortUrl;
    }

    const response: any = await createShortUrlsApi(payload);
    const data: ICreateShortUrlApi = await response.json();
    console.log('data', data);

    if (data.status === IStatus.FAIL) {
      throw new Error(data?.message);
    }

    return {
      successMessage: data?.message,
      data: data.data,
    };
  } catch (error: any) {
    console.error(error);
    return { errorMessage: String(error?.message) };
  }
}

export async function deleteShortUrlAction(shortUrlId: string) {
  try {
    const response: any = await deleteShortUrlApi(shortUrlId);
    const data = await response.json();

    if (data.status === IStatus.FAIL) {
      throw new Error(data?.message);
    }

    revalidateTag(CACHING_TAGS.USER_ALL_URL);

    return {
      successMessage: data?.message,
    };
  } catch (error: any) {
    console.error(error);
    return { errorMessage: String(error?.message) };
  }
}
