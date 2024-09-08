'use server';

import { ICreateShortUrlApiPayload } from '../apis/types';
import { ShortUrlForm } from '../components';
import { getShortUrlAction, updateShortUrlAction } from '../server-actions';
import { IUpdateShortUrlIdScreen } from '../types';

export const DashboardUpdateUrlScreen = async (props: IUpdateShortUrlIdScreen) => {
  const { shortUrlId } = props;
  const result = await getShortUrlAction(shortUrlId);

  const initialFormData: ICreateShortUrlApiPayload = {
    fullUrl: result.data?.fullUrl || '',
    shortUrl: result.data?.shortUrl || '',
    isActive: result.data?.isActive || false,
  };

  const updateShortUrlExtendedAction = (form: ICreateShortUrlApiPayload) => {
    'use server';
    return updateShortUrlAction(shortUrlId, form);
  };

  return (
    <div>
      <h1 className="mx-3 mb-6 text-3xl font-semibold max-md:mb-4 max-md:text-xl">
        Add New Link✌🏻
      </h1>
      <ShortUrlForm serverAction={updateShortUrlExtendedAction} initialValue={initialFormData} />
    </div>
  );
};
