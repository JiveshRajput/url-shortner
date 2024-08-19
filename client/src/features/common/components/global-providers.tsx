'use client';

import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from '@/components/ui/sonner';

export const GlobalProviders = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
      <Toaster />
    </>
  );
};
