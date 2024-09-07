import { AdvancedAllLinksTable } from '../components';
import { getAllUrlAction } from '../server-actions';

export const DashboardAllLinksScreen = async () => {
  const result = await getAllUrlAction();

  return (
    <div>
      <h1 className="mx-3 mb-6 text-3xl font-semibold max-md:mb-4 max-md:text-xl">All Link🔗</h1>
      <AdvancedAllLinksTable data={result.data || []} />
    </div>
  );
};
