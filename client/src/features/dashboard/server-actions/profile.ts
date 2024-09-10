'use server';

import { COOKIES } from '@/features/auth/constants';
import { IStatus } from '@/types';
import { getCookies } from '@/utils';
import { updateProfileApi } from '../apis';
import { IUser } from '@/features/common';

export async function updateProfileAction(formData: IUser) {
  try {
    const userId = getCookies(COOKIES.USER_ID) as string;

    if (!userId) {
      throw new Error('User id not available');
    }
    console.log('formData', formData);
    const response: any = await updateProfileApi(userId, formData);
    const data = await response.json();

    if (data.status === IStatus.FAIL) {
      throw new Error(data?.message);
    }
    return {
      successMessage: data?.message,
      data: data?.data,
    };
  } catch (error: any) {
    console.error(error);
    return { errorMessage: String(error?.message) };
  }
}
