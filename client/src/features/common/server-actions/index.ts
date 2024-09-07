'use server';

import { COOKIES } from '@/features/auth/constants';
import { getCookies } from '@/utils';
import { redirect, RedirectType } from 'next/navigation';
import { getUserDetailsApi } from '../apis';
import { IStatus } from '@/types';
import { IUserDetailsApi } from '../apis/types';

export async function navigate(path: string, type: RedirectType = RedirectType.replace) {
  return redirect(path, type);
}

export async function getUserDetailsAction() {
  try {
    const userId = getCookies(COOKIES.USER_ID) as string;

    if (!userId) {
      throw new Error('User id not available');
    }

    const response = await getUserDetailsApi(userId);
    const data: IUserDetailsApi = await response.json();

    if (data.status === IStatus.FAIL) {
      throw new Error(data?.message);
    }

    return {
      successMessage: data?.message,
      data: data.data,
    };
  } catch (error: any) {
    console.error('inside error');
    console.error(error);
    return { errorMessage: String(error?.message) };
  }
}
