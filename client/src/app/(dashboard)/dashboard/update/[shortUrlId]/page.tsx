import { DashboardUpdateUrlScreen, IUpdateShortUrlIdPage } from '@/features/dashboard';

const UpdateShortUrlPage = (props: IUpdateShortUrlIdPage) => {
  const {
    params: { shortUrlId = '' },
  } = props;

  return <DashboardUpdateUrlScreen shortUrlId={shortUrlId} />;
};

export default UpdateShortUrlPage;
