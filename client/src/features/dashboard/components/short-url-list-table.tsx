'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IShortUrl, IShortUrlTableHeader } from '@/features/common';
import dynamic from 'next/dynamic';
import { DASHBOARD_URL_SHORTENER_TABLE_HEADER } from '../constants';

const ShortUrlListTableRow = dynamic(
  () => import('./short-url-list-table-row').then((mod) => mod.ShortUrlListTableRow),
  { ssr: false },
);

export const ShortUrlListTable = ({
  data,
  title = '',
  header = DASHBOARD_URL_SHORTENER_TABLE_HEADER,
}: {
  data: IShortUrl[];
  title?: string;
  header?: IShortUrlTableHeader[];
}) => {
  return (
    <Card>
      {title ? (
        <CardHeader className="px-7">
          <CardTitle>{title}</CardTitle>{' '}
        </CardHeader>
      ) : null}
      <CardContent className={`${title ? '' : 'pt-6'}`}>
        <Table>
          <TableHeader>
            <TableRow>
              {header.map(({ title }) => (
                <TableHead key={title}>{title}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((url) => (
              <ShortUrlListTableRow url={url} key={url._id} />
            ))}
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-28 text-center">
                  No Links Available
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
