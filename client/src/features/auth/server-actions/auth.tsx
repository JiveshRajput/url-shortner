'use server';

import { redirect } from 'next/navigation';
import { signInApi, signUpApi } from '../api';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from '@/features/common';

export async function signInAction(formData: FormData) {
  try {
    const payload = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const result = await signInApi(payload);
    const data = await result.json();

    if (data.status === 'FAIL') {
      throw new Error(data.message);
    }

    const { accessToken, refreshToken } = data;
    const accessTokenExpiry = new Date(Date.now() + ACCESS_TOKEN_EXPIRY);

    cookies().set('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      expires: accessTokenExpiry,
      sameSite: 'lax',
      path: '/',
    });

    const refreshTokenExpiry = new Date(Date.now() + REFRESH_TOKEN_EXPIRY);
    cookies().set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      expires: refreshTokenExpiry,
      sameSite: 'lax',
      path: '/',
    });
    return {
      successMessage: data?.message,
    };
  } catch (error: any) {
    console.log(error);
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

    const result = await signUpApi(payload);
    const data = await result.json();

    if (data.status === 'FAIL') {
      throw new Error(data.message);
    }

    const { accessToken, refreshToken } = data;
    const accessTokenExpiry = new Date(Date.now() + ACCESS_TOKEN_EXPIRY);

    cookies().set('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      expires: accessTokenExpiry,
      sameSite: 'lax',
      path: '/',
    });

    const refreshTokenExpiry = new Date(Date.now() + REFRESH_TOKEN_EXPIRY);
    cookies().set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      expires: refreshTokenExpiry,
      sameSite: 'lax',
      path: '/',
    });

    return {
      successMessage: data?.message,
    };
  } catch (error: any) {
    console.log(error);
    return { errorMessage: String(error?.message) };
  }
}

export async function forgotPasswordAction(formData: FormData) {
  const payload = {
    email: formData.get('email'),
  };

  redirect('/reset-password');
}

export async function resetPasswordAction(formData: FormData) {
  const payload = {
    otp: formData.get('otp'),
    password: formData.get('password'),
  };

  redirect('/dashboard');
}
