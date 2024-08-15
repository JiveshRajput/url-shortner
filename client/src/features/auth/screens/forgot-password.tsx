import React from 'react';
import { AuthLayout } from '../components';
import { forgotPasswordAction } from '../server-actions';
import { IMAGES } from '@/assets';

export const ForgotPasswordScreen = () => {
  return (
    <AuthLayout title="Send OTP to email" imageSrc={IMAGES.SVG.AUTH_FORGOT_PASSWORD}>
      <div className="mx-auto max-w-xs">
        <form action={forgotPasswordAction}>
          <input
            className="w-full rounded-lg border-2 border-gray-100 bg-gray-100 px-5 py-3 text-sm font-medium placeholder-gray-500 focus:border-gray-100 focus:bg-white focus:outline-none"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <button className="focus:shadow-outline mt-4 flex w-full items-center justify-center rounded-lg bg-sky-500 py-3 font-semibold tracking-wide text-white transition-all duration-300 ease-in-out hover:bg-sky-600 focus:bg-sky-600 focus:outline-none">
            Send OTP
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};
