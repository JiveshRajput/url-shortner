import { getUserDetailsAction } from '@/features/common';
import { DashboardLayout } from '@/features/dashboard';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';

const Layout = async ({ children }: { children: ReactNode }) => {
  const result = await getUserDetailsAction();

  if (result.errorMessage && !result.data) {
    redirect('/sign-in');
  }

  return <DashboardLayout data={result.data}>{children}</DashboardLayout>;
};

export default Layout;
