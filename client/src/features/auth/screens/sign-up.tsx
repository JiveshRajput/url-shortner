import { IMAGES } from '@/assets';
import { AuthLayout, SignUpForm } from '../components';

export const SignUpScreen = () => {
  return (
    <AuthLayout title="Sign up" imageSrc={IMAGES.SVG.AUTH_SIGN_UP}>
      <SignUpForm />
    </AuthLayout>
  );
};
