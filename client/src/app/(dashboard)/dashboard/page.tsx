import { DashboardHomeScreen } from '@/features/dashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | Dashboard | QuickURL',
};

const DashboardHomePage = () => {
  return <DashboardHomeScreen />;
};

export default DashboardHomePage;
