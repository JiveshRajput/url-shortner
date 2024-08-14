import Image from 'next/image';
import React, { ReactNode } from 'react';

export interface IAuthLayout {
  children: ReactNode;
  title: string;
  imageSrc?: string;
}

export const AuthLayout = (props: IAuthLayout) => {
  const {
    title = '',
    imageSrc = 'https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg',
    children,
  } = props;

  return (
    <div className="flex min-h-screen justify-center bg-gray-100 text-gray-900">
      <div className="m-0 flex flex-1 justify-center bg-white shadow">
        <div className="flex flex-col items-center justify-center p-6 sm:p-10 lg:w-1/2 xl:w-5/12">
          <div>
            {/* TODO: Add logo there */}
            <p className="text-center">URL Shortener</p>
          </div>
          <div className="mt-4 flex flex-col items-center">
            <h1 className="text-center text-2xl font-extrabold xl:text-3xl">{title}</h1>
            <div className="mt-8 w-full flex-1">{children}</div>
          </div>
        </div>
        <div className="hidden w-full flex-1 justify-center bg-sky-50 p-12 text-center lg:flex xl:p-16">
          <Image
            alt={title}
            src={imageSrc}
            width={600}
            height={800}
            className="h-full bg-contain bg-center bg-no-repeat"
          />
        </div>
      </div>
    </div>
  );
};
