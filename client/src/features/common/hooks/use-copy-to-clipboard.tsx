'use client';

import { useState } from 'react';
import { toast } from 'sonner';

export const useCopyToClipboard = (initialValue: string = '') => {
  const [copiedText, setCopiedText] = useState<string>(initialValue);

  const copyToClipboard = async (text: string): Promise<void> => {
    if (!navigator?.clipboard) {
      toast.error('Clipboard not supported!!!');
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      toast.success(`Text copied successfully!!!`);
    } catch (error) {
      toast.error(`Failed copying the text ${text}`);
      console.error(`Failed copying the text`, error);
      setCopiedText('');
    }
  };

  const returnValue: [string, (text: string) => Promise<void>] = [copiedText, copyToClipboard];
  return returnValue;
};
