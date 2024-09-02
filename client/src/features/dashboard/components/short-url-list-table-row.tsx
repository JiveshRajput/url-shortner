'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TableCell, TableRow } from '@/components/ui/table';
import { EUrlStatus, IShortUrl, useCopyToClipboard, WEBSITE_URL } from '@/features/common';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { MutableRefObject, useRef } from 'react';
import { MdOutlineContentCopy, MdOutlineFileDownload, MdQrCode2 } from 'react-icons/md';
import { QRCode } from 'react-qrcode-logo';

export const ShortUrlListTableRow = ({ url }: { url: IShortUrl }) => {
  const qrCodeRef = useRef<QRCode>();
  const [copiedText, setCopyText] = useCopyToClipboard();

  const { shortUrl = '', fullUrl = '', clicks = 0, createdAt = '', isActive = false } = url;

  const shortUrlFullLink: string = `${WEBSITE_URL}/${shortUrl}`;

  const downloadShortUrlQrCode = () => qrCodeRef.current?.download('png', `${shortUrl}-short-link`);

  return (
    <TableRow key={shortUrl}>
      <TableCell>
        {shortUrl}
        <Button variant="ghost">
          <MdOutlineContentCopy onClick={() => setCopyText(shortUrlFullLink)} />
        </Button>
      </TableCell>
      <TableCell className="max-w-64">{fullUrl}</TableCell>
      <TableCell>
        <div className="flex gap-1">
          <Dialog>
            <DialogTrigger>
              <MdQrCode2 className="text-4xl" />
            </DialogTrigger>
            <DialogContent>
              <DialogDescription>
                <div className="flex flex-col items-center gap-2">
                  <DialogTitle>Scan this QR to go to link</DialogTitle>
                  <QRCode ref={qrCodeRef as MutableRefObject<QRCode>} value={shortUrlFullLink} />
                  <Link href={shortUrlFullLink} target="_blank">
                    {shortUrlFullLink}
                  </Link>
                  <Button variant="theme" onClick={() => downloadShortUrlQrCode()}>
                    <MdOutlineFileDownload />
                    Download
                  </Button>
                </div>
              </DialogDescription>
            </DialogContent>
          </Dialog>
          {/* <Button variant="ghost">
            <MdOutlineFileDownload onClick={() => downloadShortUrlQrCode()} />
          </Button> */}
        </div>
      </TableCell>
      <TableCell>{clicks}</TableCell>
      <TableCell>
        <Badge
          className={cn('text-xs', {
            'bg-green-600 text-white hover:bg-green-700': isActive,
            'bg-red-600 text-white hover:bg-red-700': !isActive,
          })}
        >
          {isActive ? EUrlStatus.ACTIVE : EUrlStatus.IN_ACTIVE}
        </Badge>
      </TableCell>
      <TableCell>{createdAt}</TableCell>
    </TableRow>
  );
};
