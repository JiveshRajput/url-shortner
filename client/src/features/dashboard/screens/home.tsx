import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BsGraphUp } from 'react-icons/bs';
import { MdLink, MdLinkOff, MdOutlineLink } from 'react-icons/md';
import { ShortUrlListTable } from '../components';

export const DashboardHomeScreen = () => {
  const CARD_DETAILS = [
    {
      title: 'Total Links',
      value: 23,
      description: 'Total all links',
      Icon: MdOutlineLink,
    },
    {
      title: 'Total Impressions',
      value: 2350,
      description: 'Total impressions of all link',
      Icon: BsGraphUp,
    },
    {
      title: 'Active Links',
      value: 22,
      description: 'All active links',
      Icon: MdLink,
    },
    {
      title: 'Inactive Links',
      value: 1,
      description: 'All inactive links',
      Icon: MdLinkOff,
    },
  ];
  
  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold max-md:mb-4">Welcome to your dashboard!</h1>
      <div className="mb-6 grid gap-4 max-md:mb-4 md:grid-cols-2 lg:grid-cols-4">
        {CARD_DETAILS.map(({ description, title, value, Icon }) => (
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
      <ShortUrlListTable />
    </div>
  );
};
