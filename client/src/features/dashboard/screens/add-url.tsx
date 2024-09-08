'use client';

import { ShortUrlForm } from '../components';
import { createShortUrlAction } from '../server-actions';

export const DashboardAddUrlScreen = () => {
  return (
    <div>
      <h1 className="mx-3 mb-6 text-3xl font-semibold max-md:mb-4 max-md:text-xl">
        Add New Link✌🏻
      </h1>
      <ShortUrlForm serverAction={createShortUrlAction} />
    </div>
  );
};
