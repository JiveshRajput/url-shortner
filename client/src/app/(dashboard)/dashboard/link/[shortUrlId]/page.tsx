import { DashboardShortUrlDetailsScreen, IUpdateShortUrlIdPage } from '@/features/dashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Link Details | Dashboard',
};

const ShortUrlDetailsPage = (props: IUpdateShortUrlIdPage) => {
  const {
    params: { shortUrlId = '' },
  } = props;

  return <DashboardShortUrlDetailsScreen shortUrlId={shortUrlId} />;
};

export default ShortUrlDetailsPage;
