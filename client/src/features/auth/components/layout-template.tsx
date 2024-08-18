import { IMAGES } from '@/assets';
import { WEBSITE_NAME } from '@/features/common';
import Image from 'next/image';
import React, { ReactNode } from 'react';

export interface IAuthLayout {
  children: ReactNode;
  title: string;
  imageSrc?: string;
}

export const AuthLayout = (props: IAuthLayout) => {
  const { title = '', imageSrc = IMAGES.SVG.AUTH_SIGN_UP, children } = props;

  return (
    <main className="flex min-h-[100dvh] bg-gray-100 text-gray-900 max-lg:justify-center">
      <div className="m-0 flex flex-1 bg-white shadow lg:justify-center">
        {/* Left Side */}
        <div className="relative z-0 flex h-full w-full flex-col items-center justify-center p-4 sm:p-10 md:w-1/2 xl:w-5/12">
          <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e0e0e0_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div>
            {/* TODO: Add logo there */}
            <p className="text-center">{WEBSITE_NAME}</p>
          </div>
          <div className="mt-4 flex flex-col items-center">
            <h1 className="text-center text-2xl font-extrabold xl:text-3xl">{title}</h1>
            <div className="mt-8 w-full flex-1">{children}</div>
          </div>
        </div>
        <div className="hidden w-full flex-1 justify-center bg-sky-50 p-12 text-center md:flex xl:p-16">
          <Image alt={title} src={imageSrc} width={600} height={800} className="h-full" />
        </div>
      </div>
    </main>
  );
};
