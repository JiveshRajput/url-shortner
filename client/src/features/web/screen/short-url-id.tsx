import { getFullUrlAction } from '../server-actions';
import { IShortUrlIdScreen } from '../types';

export const ShortUrlIdScreen = async (props: IShortUrlIdScreen) => {
  const { shortUrlId } = props;

  await getFullUrlAction(shortUrlId);
  return <div>URL Not Found</div>;
};
