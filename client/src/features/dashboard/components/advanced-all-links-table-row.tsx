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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import { EUrlStatus, IShortUrl, useCopyToClipboard, WEBSITE_URL } from '@/features/common';
import { cn } from '@/lib/utils';
import { formatDateAndTime } from '@/utils/formatters';
import Link from 'next/link';
import { MutableRefObject, useRef } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { MdOutlineContentCopy, MdOutlineFileDownload, MdQrCode2 } from 'react-icons/md';
import { QRCode } from 'react-qrcode-logo';
import { toast } from 'sonner';
import { deleteShortUrlAction } from '../server-actions';

export const AdvancedAllLinksTableRow = ({ url }: { url: IShortUrl }) => {
  const qrCodeRef = useRef<QRCode>();
  const [copiedText, setCopyText] = useCopyToClipboard();

  const { shortUrl = '', fullUrl = '', clicks = 0, createdAt = '', isActive = false } = url;

  const shortUrlFullLink: string = `${window.location.origin || WEBSITE_URL}/${shortUrl}`;

  const downloadShortUrlQrCode = () => qrCodeRef.current?.download('png', `${shortUrl}-short-link`);

  /**
   * This method is used to delete short url.
   * @param shortUrlId: short url id is id of link
   */
  const handleDeleteShortUrl = async (shortUrlId: string) => {
    const response = await deleteShortUrlAction(shortUrlId);

    if (response?.errorMessage) {
      toast.error(response.errorMessage);
    }

    if (response?.successMessage) {
      toast.success(response.successMessage);
    }
  };

  return (
    <TableRow>
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
      <TableCell>{formatDateAndTime(createdAt)}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon">
              <BsThreeDots />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Update</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDeleteShortUrl(shortUrl)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
