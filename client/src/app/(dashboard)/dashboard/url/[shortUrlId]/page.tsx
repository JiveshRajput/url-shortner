import { DashboardShortUrlDetailsScreen, IUpdateShortUrlIdPage } from '@/features/dashboard';

const ShortUrlDetailsPage = (props: IUpdateShortUrlIdPage) => {
  const {
    params: { shortUrlId = '' },
  } = props;

  return <DashboardShortUrlDetailsScreen shortUrlId={shortUrlId} />;
};

export default ShortUrlDetailsPage;
