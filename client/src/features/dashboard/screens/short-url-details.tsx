'use server';

import { notFound } from 'next/navigation';
import { getShortUrlAction } from '../server-actions';
import { IUpdateShortUrlIdScreen } from '../types';
// import { ShortUrlDetails } from '../components';
import dynamic from 'next/dynamic';

const ShortUrlDetails = dynamic(() => import('../components').then((m) => m.ShortUrlDetails), {
  ssr: false,
});

export const DashboardShortUrlDetailsScreen = async (props: IUpdateShortUrlIdScreen) => {
  const { shortUrlId } = props;
  const result = await getShortUrlAction(shortUrlId);

  if (result.errorMessage) {
    notFound();
  }

  return (
    <div>
      <h1 className="mx-3 mb-6 text-3xl font-semibold max-md:mb-4 max-md:text-xl">
        {result.data?.shortUrl} - Link Details 🎭
      </h1>
      <ShortUrlDetails data={result.data} />
    </div>
  );
};
