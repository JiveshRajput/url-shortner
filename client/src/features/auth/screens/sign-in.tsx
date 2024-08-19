import { IMAGES } from '@/assets';
import { AuthLayout, SignInForm } from '../components';

export const SignInScreen = () => {
  return (
    <AuthLayout title="Sign in" imageSrc={IMAGES.SVG.AUTH_SIGN_IN}>
      <SignInForm />
    </AuthLayout>
  );
};
