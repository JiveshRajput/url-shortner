'use client';

import Link from 'next/link';
import React, { ReactNode, useState } from 'react';
import { DASHBOARD_NAVIGATION } from '../constants';
import { usePathname } from 'next/navigation';
import { HiOutlineLogout } from 'react-icons/hi';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { signOutAction } from '@/features/auth/server-actions';

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const path = usePathname();

  return (
    <main>
      <div className="relative flex h-[100dvh] bg-slate-50">
        <aside
          className={`flex h-[100dvh] w-64 flex-col bg-gradient-to-tr from-sky-600 to-sky-400 text-white transition-[left] max-md:absolute max-md:top-0 ${sidebarOpen ? 'max-md:left-0' : 'max-md:-left-64'}`}
        >
          {/* logo */}
          <div className="flex h-16 items-center justify-center">
            <Link href="/dashboard" className="text-xl font-bold">
              QuickURL
            </Link>
          </div>
          {/* nav */}
          <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 p-4 text-black">
              {DASHBOARD_NAVIGATION.map(({ Icon, link, title }) => (
                <Link
                  key={title}
                  href={link}
                  className={`mb-2 flex items-center rounded-lg px-4 py-3 transition hover:bg-white hover:text-sky-600 ${link === path ? 'bg-white text-sky-600' : 'text-white'}`}
                >
                  <div className="mr-2">
                    <Icon className="text-2xl" />
                  </div>
                  {title}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        <div className="flex flex-1 flex-col overflow-y-auto">
          {/* header */}
          <header className="flex h-16 items-center justify-between border-b bg-white p-2 px-4 shadow-md">
            <div className="flex items-center pr-4">
              <Link href="/dashboard" className="text-xl font-bold md:hidden">
                QuickURL
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Popover>
                <PopoverTrigger>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent align="end" className='w-auto'>
                  <div className="mb-1 flex items-center gap-2">
                    <div className="font-semibold">User : </div>
                    <div>{`{{NAME HERE}}`}</div>
                  </div>
                  <div className="mb-4 flex items-center gap-2">
                    <div className="font-semibold">Email : </div>
                    <div>{`{{EMAIL HERE}}`}</div>
                  </div>
                  <Button className='w-full' onClick={()=> signOutAction()}>Logout</Button>
                </PopoverContent>
              </Popover>

              <button
                onClick={() => setSidebarOpen((prev) => !prev)}
                className="hidden focus:outline-none max-md:block"
              >
                <RxHamburgerMenu className="text-2xl" />
              </button>
            </div>
          </header>
          {/* main */}
          <main className="p-4">{children}</main>
        </div>
      </div>
    </main>
  );
};
