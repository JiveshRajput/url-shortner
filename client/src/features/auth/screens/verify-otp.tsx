import { IMAGES } from '@/assets';
import { AuthLayout, VerifyOtpForm } from '../components';

export const VerifyOtpScreen = () => {
  return (
    <AuthLayout title="Verify OTP" imageSrc={IMAGES.SVG.AUTH_RESET_PASSWORD}>
      <VerifyOtpForm />
    </AuthLayout>
  );
};
