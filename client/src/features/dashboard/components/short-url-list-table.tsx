'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { IShortUrl } from '@/features/common';
import { ShortUrlListTableRow } from './short-url-list-table-row';

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

export const ShortUrlListTable = () => {
  return (
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
            {ShortUrlData.map((url) => (
              <ShortUrlListTableRow url={url} key={url.shortUrl} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
