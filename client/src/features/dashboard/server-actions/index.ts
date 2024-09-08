'use server';

import { COOKIES } from '@/features/auth/constants';
import { IStatus } from '@/types';
import { getCookies } from '@/utils';
import {
  createShortUrlsApi,
  deleteShortUrlApi,
  getAllUrlsApi,
  getShortUrlApi,
  getUrlStatsApi,
  updateShortUrlsApi,
} from '../apis';
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

export async function createShortUrlAction(formData: ICreateShortUrlApiPayload) {
  try {
    const shortUrl: string | undefined = formData.shortUrl;

    const payload: ICreateShortUrlApiPayload = {
      fullUrl: formData.fullUrl,
      isActive: formData.isActive,
    };

    if (shortUrl) {
      payload.shortUrl = shortUrl;
    }

    const response: any = await createShortUrlsApi(payload);
    const data: ICreateShortUrlApi = await response.json();

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

export async function updateShortUrlAction(
  shortUrlId: string,
  formData: ICreateShortUrlApiPayload,
) {
  try {
    const payload: ICreateShortUrlApiPayload = {} as ICreateShortUrlApiPayload;
    if (formData.fullUrl) {
      payload.fullUrl = formData.fullUrl;
    }

    if (formData.isActive) {
      payload.isActive = formData.isActive;
    }

    if (formData.shortUrl) {
      payload.shortUrl = formData.shortUrl;
    }

    const response: any = await updateShortUrlsApi(shortUrlId, payload);
    const data: ICreateShortUrlApi = await response.json();

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

export async function getShortUrlAction(shortUrlId: string) {
  try {
    const response: any = await getShortUrlApi(shortUrlId);
    const data: ICreateShortUrlApi = await response.json();

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
