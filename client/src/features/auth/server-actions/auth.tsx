'use server';

import { REFRESH_TOKEN_EXPIRY } from '@/features/common';
import { IStatus } from '@/types';
import { deleteCookies, getCookies, setCookies } from '@/utils';
import {
  authenticateUserApi,
  getAccessTokenApi,
  resetPasswordApi,
  sendOtpApi,
  sendOtpByMailApi,
  signInApi,
  signUpApi,
  verifyOtpApi,
} from '../api';
import { COOKIES } from '../constants';
import { createSession } from './session';
import { redirect } from 'next/navigation';

export async function signInAction(formData: FormData) {
  try {
    const payload = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    payload.email = payload.email.toLowerCase();

    const result = await signInApi(payload);
    const data = await result.json();

    if (data.status === IStatus.FAIL) {
      throw new Error(data?.message);
    }

    const { accessToken, refreshToken } = data;

    createSession(accessToken);

    const refreshTokenExpiry = new Date(Date.now() + REFRESH_TOKEN_EXPIRY);
    setCookies(COOKIES.REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      secure: true,
      expires: refreshTokenExpiry,
      sameSite: 'lax',
      path: '/',
    });

    // User id cookie
    setCookies(COOKIES.USER_ID, data.data._id, {
      secure: true,
      expires: refreshTokenExpiry,
      sameSite: 'lax',
      path: '/',
    });

    return {
      successMessage: data?.message,
    };
  } catch (error: any) {
    console.error(error);
    return { errorMessage: String(error?.message) };
  }
}

export async function signUpAction(formData: FormData) {
  try {
    const payload = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      name: formData.get('name') as string,
    };

    payload.email = payload.email.toLowerCase();

    const result = await signUpApi(payload);
    const data = await result.json();

    if (data.status === IStatus.FAIL) {
      throw new Error(data.message);
    }

    const { accessToken, refreshToken } = data;

    createSession(accessToken);

    const refreshTokenExpiry = new Date(Date.now() + REFRESH_TOKEN_EXPIRY);
    setCookies(COOKIES.REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      secure: true,
      expires: refreshTokenExpiry,
      sameSite: 'lax',
      path: '/',
    });

    // User id cookie
    setCookies(COOKIES.USER_ID, data.data._id, {
      secure: true,
      expires: refreshTokenExpiry,
      sameSite: 'lax',
      path: '/',
    });

    // Send OTP for verification
    const otpResponse = await sendOtpApi();
    const otpData = await otpResponse.json();

    return {
      successMessage: otpData?.message,
    };
  } catch (error: any) {
    console.error(error);
    return { errorMessage: String(error?.message) };
  }
}

export async function verifyOtpAction(formData: FormData) {
  try {
    const payload = {
      otp: formData.get('otp') as string,
    };

    const result = await verifyOtpApi(payload);
    const data = await result.json();

    if (data.status === IStatus.FAIL) {
      throw new Error(data?.message);
    }

    return {
      successMessage: data?.message,
    };
  } catch (error: any) {
    console.error(error);
    return { errorMessage: String(error?.message) };
  }
}

export async function forgotPasswordAction(formData: FormData) {
  try {
    const payload = {
      email: formData.get('email') as string,
    };

    payload.email = payload.email.toLowerCase();

    const response = await sendOtpByMailApi(payload);
    const data = await response.json();

    if (data.status === IStatus.FAIL) {
      throw new Error(data?.message);
    }

    return {
      successMessage: data?.message,
      email: payload.email,
    };
  } catch (error: any) {
    console.error(error);
    return { errorMessage: String(error?.message) };
  }
}

export async function resetPasswordAction(formData: FormData) {
  try {
    const payload = {
      otp: formData.get('otp') as string,
      password: formData.get('password') as string,
      email: formData.get('email') as string,
    };

    const response = await resetPasswordApi(payload);
    const data = await response.json();

    if (data.status === IStatus.FAIL) {
      throw new Error(data?.message);
    }

    return {
      successMessage: data?.message,
    };
  } catch (error: any) {
    console.error(error);
    return { errorMessage: String(error?.message) };
  }
}

export async function checkUserAlreadyLoggedInAction() {
  const refreshToken = getCookies(COOKIES.REFRESH_TOKEN) as string;
  const accessToken = getCookies(COOKIES.ACCESS_TOKEN) as string;
  const userId = getCookies(COOKIES.USER_ID) as string;

  if (!(refreshToken && accessToken && userId)) {
    return false;
  }

  const response = await authenticateUserApi();
  if (response.status !== 200) {
    return false;
  }

  return true;
}

export async function getAccessTokenByRefreshToken() {
  const refreshToken = (await getCookies(COOKIES.REFRESH_TOKEN)) as string;
  console.log('REFRESH TOKEN:', refreshToken);
  const accessTokenResponse: any = await getAccessTokenApi({ refreshToken });

  const accessTokenData: any = await accessTokenResponse.json();

  console.log('ACCESS TOKEN DATA:', accessTokenData);

  const accessToken: string = accessTokenData?.data?.accessToken as string;

  return accessToken;
}

export async function signOutAction() {
  // TODO: Implement logout api

  deleteCookies(COOKIES.REFRESH_TOKEN);
  deleteCookies(COOKIES.ACCESS_TOKEN);
  deleteCookies(COOKIES.USER_ID);
  redirect('/sign-in');
}
