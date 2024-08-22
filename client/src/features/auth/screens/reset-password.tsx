import { IMAGES } from '@/assets';
import { AuthLayout, ResetPasswordForm } from '../components';

export const ResetPasswordScreen = () => {
  return (
    <AuthLayout title="Reset Password" imageSrc={IMAGES.SVG.AUTH_RESET_PASSWORD}>
      <ResetPasswordForm />
    </AuthLayout>
  );
};
