'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Hooks
import { usePathname } from 'next/navigation';

// Icons
import { IoClose } from 'react-icons/io5';
import { GiHamburgerMenu } from 'react-icons/gi';

// Constants
import { FilledButton, WEBSITE_NAME } from '@/features/common';
import { NAVIGATION_LINKS } from '../constants';

export const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const currentPath = usePathname();
  const [activeTab, setActiveTab] = useState('/');

  useEffect(() => {
    setActiveTab(`/${currentPath.split('/')[1]}`);
  }, [currentPath]);

  return (
    <header className="sticky left-0 top-0 z-[90] h-[65px] w-full bg-white px-4 py-2 shadow-md">
      {/* Black Transparent Screen */}
      <div
        className={`fixed left-0 top-0 z-[91] h-screen w-screen bg-black/10 md:hidden ${!showNav && 'max-md:hidden'}`}
      ></div>
      {/* PC & Laptop Screen */}
      <div
        className={`max-md:shadow-nav z-[92] mx-auto flex h-full max-w-1200 items-center justify-between gap-4 max-md:fixed max-md:right-0 max-md:top-0 max-md:h-screen max-md:w-[250px] max-md:flex-col max-md:items-start max-md:bg-white max-md:p-4 max-md:transition-all ${!showNav && 'max-md:right-[-300px]'}`}
      >
        {/* Logo */}
        <Link href="/" passHref className="max-md:hidden">
          {/* <Image src={IMAGES.LOGO_FULL} width={80} className="h-auto w-auto" alt="header_logo" /> */}
          {WEBSITE_NAME}
        </Link>

        {/* Navbar Close Button */}
        <div className="flex w-full justify-end md:hidden">
          <div className="rounded-full p-2 hover:bg-black/10" onClick={() => setShowNav(false)}>
            <IoClose className="text-primary-lighter text-lg" />
          </div>
        </div>

        {/* Navbar */}
        <nav className="h-full max-md:w-full md:flex">
          <ul className="flex items-center justify-center gap-2 max-md:w-full max-md:flex-col">
            {NAVIGATION_LINKS.map(({ link, name }, ind) => {
              return (
                <li key={ind} className="max-md:w-full">
                  <Link
                    className={`block rounded-lg p-2 px-4 font-medium text-black transition hover:bg-sky-50 hover:text-sky-500 focus:bg-sky-50 focus:text-sky-500 focus:outline-none ${activeTab == link && 'bg-sky-100 text-sky-500'}`}
                    onClick={() => {
                      setActiveTab(link);
                      setShowNav(false);
                    }}
                    href={link}
                  >
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Contact Us Button */}
        <Link href="/sign-in" passHref className="rounded-lg">
          <FilledButton>Sign in</FilledButton>
        </Link>
      </div>

      {/* Mobile Screen */}
      <div className="mx-auto flex h-full max-w-1200 items-center justify-between md:hidden">
        {/* Logo */}
        <Link href="/" passHref>
          {/* <Image src={IMAGES.LOGO_ICON} width={50} alt="logo" /> */}
          {WEBSITE_NAME}
        </Link>
        {/* Hamburger Icon */}
        <div className="md:hidden" onClick={() => setShowNav(true)}>
          <GiHamburgerMenu className="text-primary-lighter text-2xl" />
        </div>
      </div>
    </header>
  );
};
