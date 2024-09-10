'use server';

import { getUserDetailsAction } from '@/features/common';
import { ProfileDetails } from '../components';
import { updateProfileAction } from '../server-actions/profile';

export const DashboardProfileScreen = async () => {
  const result = await getUserDetailsAction();

  return (
    <div>
      <ProfileDetails userInitialDetails={result.data} serverAction={updateProfileAction} />
    </div>
  );
};
