'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  EUrlStatus,
  IShortUrl,
  navigateToUpdateUrl,
  useCopyToClipboard,
  WEBSITE_URL,
} from '@/features/common';
import { cn } from '@/lib/utils';
import { formatDateAndTime } from '@/utils/formatters';
import { MdOutlineContentCopy } from 'react-icons/md';

interface IShortUrlDetails {
  data: IShortUrl | undefined;
}

export const ShortUrlDetails = async (props: IShortUrlDetails) => {
  const { data } = props;
  const {
    clicks = 0,
    fullUrl = '',
    isActive = false,
    createdAt = '',
    shortUrl = '',
    updatedAt = '',
  } = data as IShortUrl;
  const [, setCopyText] = useCopyToClipboard();

  const shortUrlFullLink: string = `${window.location.origin || WEBSITE_URL}/${shortUrl}`;

  return (
    <div>
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex items-start gap-4 max-md:flex-col max-md:gap-1">
            <p className="flex-1 font-semibold max-md:text-sm">Short Link</p>
            <p className="max-md:hidden">:</p>
            <p className="flex-1">
              {shortUrl}
              <Button variant="ghost" size="icon">
                <MdOutlineContentCopy onClick={() => setCopyText(shortUrlFullLink)} />
              </Button>
            </p>
          </div>
          <div className="mb-4 flex items-start gap-4 max-md:flex-col max-md:gap-1">
            <p className="flex-1 font-semibold max-md:text-sm">Full Link</p>
            <p className="max-md:hidden">:</p>
            <div className="flex-1">
              <p>{fullUrl}</p>
            </div>
          </div>
          <div className="mb-4 flex items-start gap-4 max-md:flex-col max-md:gap-1">
            <p className="flex-1 font-semibold max-md:text-sm">Total Clicks</p>
            <p className="max-md:hidden">:</p>
            <p className="flex-1">{clicks}</p>
          </div>
          <div className="mb-4 flex items-start gap-4 max-md:flex-col max-md:gap-1">
            <p className="flex-1 font-semibold max-md:text-sm">Created On</p>
            <p className="max-md:hidden">:</p>
            <p className="flex-1">{formatDateAndTime(createdAt)}</p>
          </div>
          <div className="mb-4 flex items-start gap-4 max-md:flex-col max-md:gap-1">
            <p className="flex-1 font-semibold max-md:text-sm">Updated On</p>
            <p className="max-md:hidden">:</p>
            <p className="flex-1">{formatDateAndTime(updatedAt)}</p>
          </div>
          <div className="mb-4 flex items-start gap-4 max-md:flex-col max-md:gap-1">
            <p className="flex-1 font-semibold max-md:text-sm">Link Status</p>
            <p className="max-md:hidden">:</p>
            <div className="flex-1">
              <Badge
                className={cn('text-xs', {
                  'bg-green-600 text-white hover:bg-green-700': isActive,
                  'bg-red-600 text-white hover:bg-red-700': !isActive,
                })}
              >
                {isActive ? EUrlStatus.ACTIVE : EUrlStatus.IN_ACTIVE}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 flex w-full items-center justify-center gap-4">
        <Button onClick={() => navigateToUpdateUrl(shortUrl)}>Update Link Details</Button>
      </div>
    </div>
  );
};
