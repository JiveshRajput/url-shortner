import { IShortUrlIdPage, ShortUrlIdScreen } from '@/features/url-shortener';

const ShortUrlIdPage = (props: IShortUrlIdPage) => {
  const {
    params: { shortUrlId = '' },
  } = props;

  return <ShortUrlIdScreen shortUrlId={shortUrlId} />;
};

export default ShortUrlIdPage;
