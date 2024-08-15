import React from 'react';
import { AuthLayout } from '../components';
import { resetPasswordAction } from '../server-actions';
import { IMAGES } from '@/assets';

export const ResetPasswordScreen = () => {
  return (
    <AuthLayout title="Reset Password" imageSrc={IMAGES.SVG.AUTH_RESET_PASSWORD}>
      <div className="mx-auto max-w-xs">
        <form action={resetPasswordAction}>
          <input
            className="w-full rounded-lg border-2 border-gray-100 bg-gray-100 px-5 py-3 text-sm font-medium placeholder-gray-500 focus:border-gray-100 focus:bg-white focus:outline-none"
            type="number"
            name="otp"
            placeholder="Enter OTP"
            maxLength={4}
            required
          />
          <input
            className="mt-4 w-full rounded-lg border-2 border-gray-100 bg-gray-100 px-5 py-3 text-sm font-medium placeholder-gray-500 focus:border-gray-100 focus:bg-white focus:outline-none"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <button className="focus:shadow-outline mt-4 flex w-full items-center justify-center rounded-lg bg-sky-500 py-3 font-semibold tracking-wide text-white transition-all duration-300 ease-in-out hover:bg-sky-600 focus:bg-sky-600 focus:outline-none">
            Reset Password
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};
