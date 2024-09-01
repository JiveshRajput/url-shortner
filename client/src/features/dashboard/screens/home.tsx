import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EUrlStatus, IShortUrl } from '@/features/common';
import { cn } from '@/lib/utils';
import { MdOutlineContentCopy, MdQrCode2, MdOutlineLink } from 'react-icons/md';

export const DASHBOARD_URL_SHORTENER_TABLE_HEADER = [
  {
    title: 'Short Link',
  },
  {
    title: 'Original Link',
  },
  {
    title: 'QR Code',
  },
  {
    title: 'Clicks',
  },
  {
    title: 'Status',
  },
  {
    title: 'Created At',
  },
];

export const ShortUrlData: IShortUrl[] = [
  {
    _id: '66b8b5e8658442f96d0ec2ae',
    fullUrl:
      'https://blog.stackademic.com/how-to-build-and-deploy-a-url-shortener-using-node-js-2dad693d586a',
    clicks: 21,
    shortUrl: 'IcENbpB-t',
    isActive: false,
    createdAt: '2024-08-11T13:00:24.508Z',
    updatedAt: '2024-08-25T10:27:37.454Z',
    __v: 0,
  },
  {
    _id: '66b8b5e8658442f96d0ec2ae',
    fullUrl:
      'https://blog.stackademic.com/how-to-build-and-deploy-a-url-shortener-using-node-js-2dad693d586a',
    clicks: 21,
    shortUrl: 'IcENbpB-t',
    isActive: true,
    createdAt: '2024-08-11T13:00:24.508Z',
    updatedAt: '2024-08-25T10:27:37.454Z',
    __v: 0,
  },
];

export const DashboardHomeScreen = () => {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold max-md:mb-4">Welcome to your dashboard!</h1>
      <div className="mb-6 grid gap-4 max-md:mb-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Links</CardTitle>
            <MdOutlineLink className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
            {/* <Users className="h-4 w-4 text-muted-foreground" /> */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            {/* <CreditCard className="h-4 w-4 text-muted-foreground" /> */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            {/* <Activity className="h-4 w-4 text-muted-foreground" /> */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+201 since last hour</p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <div>
        <Card>
          <CardHeader className="px-7">
            <CardTitle>Your Links 🔗</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  {DASHBOARD_URL_SHORTENER_TABLE_HEADER.map(({ title }) => (
                    <TableHead key={title}>{title}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {ShortUrlData.map((url) => {
                  const { shortUrl, fullUrl, clicks, createdAt, isActive } = url;
                  return (
                    <TableRow key={shortUrl}>
                      <TableCell>
                        {shortUrl}{' '}
                        <Button variant="ghost">
                          <MdOutlineContentCopy />
                        </Button>
                      </TableCell>
                      <TableCell className="max-w-64">{fullUrl}</TableCell>
                      <TableCell>
                        <MdQrCode2 className="text-4xl" />
                      </TableCell>
                      <TableCell>{clicks}</TableCell>
                      <TableCell>
                        <Badge
                          className={cn('text-xs', {
                            'bg-green-600 text-white': isActive,
                            'bg-red-600 text-white': !isActive,
                          })}
                          variant="secondary"
                        >
                          {isActive ? EUrlStatus.ACTIVE : EUrlStatus.IN_ACTIVE}
                        </Badge>
                      </TableCell>
                      <TableCell>{createdAt}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
