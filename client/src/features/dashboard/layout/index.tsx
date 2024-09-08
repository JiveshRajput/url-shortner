'use client';

import { IUser } from '@/features/common';
import { ReactNode, useState } from 'react';
import { DashboardHeader } from './header';
import { DashboardSidebar } from './sidebar';

interface IDashboardLayout {
  children: ReactNode;
  data: IUser | undefined;
}

export const DashboardLayout = ({ children, data }: IDashboardLayout) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="relative flex h-[100dvh] bg-slate-50">
      {/* sidebar */}
      <DashboardSidebar sidebarOpen={sidebarOpen} />

      <div className="flex flex-1 flex-col overflow-y-auto">
        {/* header */}
        <DashboardHeader data={data} setSidebarOpen={setSidebarOpen} />
        {/* main */}
        <main className="h-[calc(100dvh-4rem)] overflow-auto p-4">{children}</main>
      </div>
    </main>
  );
};
