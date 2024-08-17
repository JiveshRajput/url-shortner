import { IShortUrlIdPage, ShortUrlIdScreen } from '@/features/web';

const ShortUrlIdPage = (props: IShortUrlIdPage) => {
  const {
    params: { shortUrlId = '' },
  } = props;

  return <ShortUrlIdScreen shortUrlId={shortUrlId} />;
};

export default ShortUrlIdPage;
