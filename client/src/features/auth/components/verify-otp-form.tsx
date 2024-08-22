'use client';

import { toast } from 'sonner';
import { verifyOtpAction } from '../server-actions';
import { redirect } from 'next/navigation';

const VerifyOtpForm = () => {
  /**
   * This method is used to verify otp.
   * @param formData: Formdata includes otp
   */
  const handleVerifyOtp = async (formData: FormData) => {
    const response = await verifyOtpAction(formData);
    if (response?.errorMessage) {
      toast.error(response.errorMessage);
    }

    if (response?.successMessage) {
      toast.success(response.successMessage);
      redirect('/dashboard');
    }
  };
  return (
    <div className="mx-auto max-w-xs">
      <form action={handleVerifyOtp}>
        <input
          className="w-full rounded-lg border-2 border-gray-100 bg-gray-100 px-5 py-3 text-sm font-medium placeholder-gray-500 focus:border-gray-100 focus:bg-white focus:outline-none"
          type="number"
          name="otp"
          placeholder="Enter OTP"
          maxLength={4}
          required
        />
        <button className="focus:shadow-outline mt-4 flex w-full items-center justify-center rounded-lg bg-sky-500 py-3 font-semibold tracking-wide text-white transition-all duration-300 ease-in-out hover:bg-sky-600 focus:bg-sky-600 focus:outline-none">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOtpForm;
