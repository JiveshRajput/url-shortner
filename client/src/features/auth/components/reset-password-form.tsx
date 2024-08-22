'use client';

import { redirect, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { resetPasswordAction } from '../server-actions';

export const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  /**
   * This method is used to reset the password.
   * @param formData: Formdata includes otp and password.
   */
  const handleResetPassword = async (formData: FormData) => {
    const response = await resetPasswordAction(formData);
    if (response?.errorMessage) {
      toast.error(response.errorMessage);
    }

    if (response?.successMessage) {
      toast.success(response.successMessage);
      redirect('/sign-in');
    }
  };

  return (
    <div className="mx-auto max-w-xs">
      <form action={handleResetPassword}>
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
        <input
          className="mt-4 w-full rounded-lg border-2 border-gray-100 bg-gray-100 px-5 py-3 text-sm font-medium placeholder-gray-500 focus:border-gray-100 focus:bg-white focus:outline-none"
          type="email"
          name="email"
          placeholder="Email"
          hidden={true}
          defaultValue={email || ''}
          required
          readOnly
        />
        <button className="focus:shadow-outline mt-4 flex w-full items-center justify-center rounded-lg bg-sky-500 py-3 font-semibold tracking-wide text-white transition-all duration-300 ease-in-out hover:bg-sky-600 focus:bg-sky-600 focus:outline-none">
          Reset Password
        </button>
      </form>
    </div>
  );
};
