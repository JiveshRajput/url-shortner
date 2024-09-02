import { DashboardAddUrlScreen } from '@/features/dashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add link | Dashboard | QuickURL',
};

const DashboardAddPage = () => {
  return <DashboardAddUrlScreen />;
};

export default DashboardAddPage;
