import { getUserDetailsAction } from '@/features/common';
import { DashboardLayout } from '@/features/dashboard';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Dashboard | QuickURL',
};

export const dynamic = 'force-dynamic';

const Layout = async ({ children }: { children: ReactNode }) => {
  const result = await getUserDetailsAction();

  if (result.errorMessage && !result.data) {
    redirect('/sign-in');
  }

  return <DashboardLayout data={result.data}>{children}</DashboardLayout>;
};

export default Layout;
