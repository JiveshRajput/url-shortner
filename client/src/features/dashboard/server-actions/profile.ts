'use server';

import { COOKIES } from '@/features/auth/constants';
import { API_ROUTE, BACKEND_API_URL, IUser } from '@/features/common';
import { IStatus } from '@/types';
import { getCookies } from '@/utils';
import { updateProfileApi } from '../apis';

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

export async function updateProfilePicAction(formData: FormData) {
  try {
    const userId = getCookies(COOKIES.USER_ID) as string;
    const accessToken = getCookies(COOKIES.ACCESS_TOKEN);

    if (!userId) {
      throw new Error('User id not available');
    }

    const response: any = await fetch(`${BACKEND_API_URL}${API_ROUTE.PROFILE.UPDATE_PIC(userId)}`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
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
