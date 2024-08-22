import { IMAGES } from '@/assets';
import { AuthLayout, ForgotPasswordForm } from '../components';

export const ForgotPasswordScreen = () => {
  return (
    <AuthLayout title="Send OTP to email" imageSrc={IMAGES.SVG.AUTH_FORGOT_PASSWORD}>
      <ForgotPasswordForm />
    </AuthLayout>
  );
};
