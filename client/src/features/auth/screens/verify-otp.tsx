import React from 'react';
import { AuthLayout } from '../components';
import { resetPasswordAction } from '../server-actions';
import { IMAGES } from '@/assets';
import VerifyOtpForm from '../components/verify-otp-form';

export const VerifyOtpScreen = () => {
  return (
    <AuthLayout title="Verify OTP" imageSrc={IMAGES.SVG.AUTH_RESET_PASSWORD}>
      <VerifyOtpForm />
    </AuthLayout>
  );
};
