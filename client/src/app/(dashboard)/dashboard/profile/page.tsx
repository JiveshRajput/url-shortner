import { DashboardProfileScreen } from '@/features/dashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile | Dashboard',
};

const DashboardProfilePage = () => {
  return <DashboardProfileScreen />;
};

export default DashboardProfilePage;
