'use client';

import React, { ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';

export const GlobalProviders = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <>{children}</>
      <Toaster />
    </>
  );
};
