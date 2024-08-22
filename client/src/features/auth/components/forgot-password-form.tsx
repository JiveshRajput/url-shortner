'use client';

import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { forgotPasswordAction } from '../server-actions';

export const ForgotPasswordForm = () => {
  /**
   * This method is used to send otp to mail.
   * @param formData: Formdata includes email
   */
  const handleForgotPassword = async (formData: FormData) => {
    const response = await forgotPasswordAction(formData);
    if (response?.errorMessage) {
      toast.error(response.errorMessage);
    }

    if (response?.successMessage) {
      toast.success(response.successMessage);
      redirect(`/reset-password?email=${response.email}`);
    }
  };

  return (
    <div className="mx-auto max-w-xs">
      <form action={handleForgotPassword}>
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
  );
};
