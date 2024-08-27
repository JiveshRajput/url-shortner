'use client';

import Link from 'next/link';
import React, { ReactNode, useState } from 'react';
import { DASHBOARD_NAVIGATION } from '../constants';
import { usePathname } from 'next/navigation';
import { HiOutlineLogout } from 'react-icons/hi';

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const path = usePathname();

  return (
    <main>
      <div className="relative flex h-[100dvh] bg-slate-50">
        <aside
          className={`flex h-[100dvh] w-64 flex-col bg-gradient-to-tr from-sky-600 to-sky-400 text-white transition max-md:absolute max-md:top-0 ${sidebarOpen ? 'max-md:left-0' : 'max-md:-left-64'}`}
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
                  className={`mb-2 flex items-center rounded-lg px-4 py-3 text-white transition hover:bg-white hover:text-sky-600 ${link === path ? 'bg-white text-sky-600' : ''}`}
                >
                  <div className="mr-2">
                    <Icon className="text-2xl" />
                  </div>
                  {title}
                </Link>
              ))}
            </nav>
          </div>
          {/* Logout  */}
          <div className="flex flex-col p-4 text-black">
            <Link
              href="/"
              className={`mb-2 flex items-center rounded-lg text-white px-4 py-3 hover:bg-white hover:text-sky-600 transition`}
            >
              <div className="mr-2">
                <HiOutlineLogout className="text-2xl" />
              </div>
              Logout
            </Link>
          </div>
        </aside>

        <div className="flex flex-1 flex-col overflow-y-auto">
          {/* header */}
          <header className="flex h-16 items-center justify-between border-b bg-white shadow-md">
            <div className="flex items-center pr-4"></div>
            <div className="flex items-center px-4">
              <button
                onClick={() => setSidebarOpen((prev) => !prev)}
                className="text-gray-500 focus:text-gray-700 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
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
