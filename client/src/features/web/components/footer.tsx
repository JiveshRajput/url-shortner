import { TranslucentButton, WEBSITE_NAME } from '@/features/common';
import Link from 'next/link';
import { NAVIGATION_LINKS } from '../constants';

export const Footer = () => {
  return (
    <footer className="w-full bg-slate-100">
      <section className="mx-auto max-w-1200 px-4 pb-7 pt-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-6 border-b border-slate-300 pb-8 lg:flex-row">
            <Link href="/" className="py-1.5">
              {WEBSITE_NAME}
            </Link>
            <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-12">
              <ul className="flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
                {NAVIGATION_LINKS.map(({ name, link }) => (
                  <li key={name}>
                    <Link
                      href={link}
                      className="transition-all duration-300 hover:text-sky-500 focus:text-sky-500 focus:outline-0"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/sign-up">
                <TranslucentButton>Sign Up</TranslucentButton>
              </Link>
            </div>
          </div>
          <div className="flex flex-col-reverse items-center justify-between gap-6 pt-6 min-[520px]:flex-row">
            <span className="text-sm font-normal focus:text-sky-500 focus:outline-0">
              &copy;{' '}
              <Link href="/" className="focus-within:text-sky-500 focus-within:outline-none">
                {WEBSITE_NAME}
              </Link>{' '}
              2023 | All rights reserved.
            </span>
            <ul className="flex items-center gap-9">
              <li>
                <Link
                  href="/terms-and-condition"
                  className="text-sm transition-all duration-300 focus-within:text-sky-500 focus-within:outline-none hover:text-sky-500"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm transition-all duration-300 focus-within:text-sky-500 focus-within:outline-none hover:text-sky-500"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </footer>
  );
};
