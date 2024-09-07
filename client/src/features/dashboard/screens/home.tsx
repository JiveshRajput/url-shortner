'use server';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShortUrlListTable } from '../components';
import { getDashboardCardDetails } from '../constants';
import { getUrlStatsAction } from '../server-actions';

export const DashboardHomeScreen = async () => {
  const result = await getUrlStatsAction();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold max-md:mb-4 max-md:text-xl">
        Welcome to your dashboard!
      </h1>
      <div className="mb-6 grid gap-4 max-md:mb-4 md:grid-cols-2 lg:grid-cols-4">
        {getDashboardCardDetails(result.data).map(({ description, title, value, Icon }) => (
          <Card key={title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{value}</div>
              <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <ShortUrlListTable data={result.data?.recentLinks || []} title={'Recent Links 🔗'} />
    </div>
  );
};
