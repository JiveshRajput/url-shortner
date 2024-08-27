import { DashboardLayout } from '@/features/dashboard';
import React, { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;
