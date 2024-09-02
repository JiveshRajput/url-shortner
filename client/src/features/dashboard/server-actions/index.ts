'use server';

import { COOKIES } from '@/features/auth/constants';
import { IStatus } from '@/types';
import { getCookies } from '@/utils';
import { getAllUrlsApi } from '../apis';
import { IGetAllUrlsApi } from '../apis/types';

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
