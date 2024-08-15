import { IMAGES } from '@/assets';
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
    <div className="flex min-h-screen bg-gray-100 text-gray-900 max-lg:justify-center">
      <div className="m-0 flex flex-1 bg-white shadow lg:justify-center">
        <div className="flex w-full flex-col items-center justify-center p-4 sm:p-10 md:w-1/2 xl:w-5/12">
          <div>
            {/* TODO: Add logo there */}
            <p className="text-center">Quick URL</p>
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
    </div>
  );
};
