import { DashboardAllLinksScreen } from '@/features/dashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All links | Dashboard | QuickURL',
};

const DashboardAllLinksPage = () => {
  return <DashboardAllLinksScreen />;
};

export default DashboardAllLinksPage;
