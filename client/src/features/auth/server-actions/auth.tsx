'use server';

import { signIn } from '@/auth';
import { CredentialsSignin } from 'next-auth';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';

export async function signInAction(prevState: any, formData: FormData) {
  try {
    const payload = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    await signIn('credentials', {
      ...payload,
      redirect: true,
      redirectTo: '/dashboard',
    });
  } catch (error) {
    if (isRedirectError(error)) {
      console.log(error);
      redirect('/dashboard');
    }
    const err = error as CredentialsSignin;
    return { message: String(err.cause) };
  }
}

export async function signUpAction(formData: FormData) {
  const payload = {
    email: formData.get('email'),
    password: formData.get('password'),
    name: formData.get('name'),
  };

  redirect('/dashboard');
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
