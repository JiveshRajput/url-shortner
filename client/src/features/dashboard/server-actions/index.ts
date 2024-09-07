'use server';

import { COOKIES } from '@/features/auth/constants';
import { IStatus } from '@/types';
import { getCookies } from '@/utils';
import { createShortUrlsApi, getUrlStatsApi } from '../apis';
import { ICreateShortUrlApi, ICreateShortUrlApiPayload, IGetUrlStatsApi } from '../apis/types';

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
