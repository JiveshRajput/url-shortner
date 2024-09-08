import { DashboardAllLinksScreen } from '@/features/dashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All links | Dashboard',
};

const DashboardAllLinksPage = () => {
  return <DashboardAllLinksScreen />;
};

export default DashboardAllLinksPage;
