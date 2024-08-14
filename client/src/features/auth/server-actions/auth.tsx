'use server';

import { redirect } from 'next/navigation';

export async function signInAction(formData: FormData) {
  const payload = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  redirect('/forgot-password');
}

export async function signUpAction(formData: FormData) {
  const payload = {
    email: formData.get('email'),
    password: formData.get('password'),
    name: formData.get('name'),
  };

  redirect('/sign-in');
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
