import { IUpdateShortUrlIdPage } from '@/features/dashboard';
import { DashboardUpdateUrlScreen } from '@/features/dashboard/screens/update-url';
import { ShortUrlIdScreen } from '@/features/web';

const UpdateShortUrlPage = (props: IUpdateShortUrlIdPage) => {
  const {
    params: { shortUrlId = '' },
  } = props;

  return <DashboardUpdateUrlScreen shortUrlId={shortUrlId} />;
};

export default UpdateShortUrlPage;
