import React from 'react';
import { AuthLayout } from '../components';

export const ForgotPasswordScreen = () => {
  return (
    <AuthLayout title="Send OTP to email">
      <div className="mx-auto max-w-xs">
        <form>
          <input
            className="w-full rounded-lg border-2 border-gray-100 bg-gray-100 px-5 py-3 text-sm font-medium placeholder-gray-500 focus:border-gray-100 focus:bg-white focus:outline-none"
            type="email"
            placeholder="Email"
          />
          <button className="focus:shadow-outline mt-4 flex w-full items-center justify-center rounded-lg bg-sky-500 py-3 font-semibold tracking-wide text-white transition-all duration-300 ease-in-out hover:bg-sky-600 focus:bg-sky-600 focus:outline-none">
            Send OTP
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};
