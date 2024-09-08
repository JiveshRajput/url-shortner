import { DashboardUpdateUrlScreen, IUpdateShortUrlIdPage } from '@/features/dashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Update Link | Dashboard',
};

const UpdateShortUrlPage = (props: IUpdateShortUrlIdPage) => {
  const {
    params: { shortUrlId = '' },
  } = props;

  return <DashboardUpdateUrlScreen shortUrlId={shortUrlId} />;
};

export default UpdateShortUrlPage;
