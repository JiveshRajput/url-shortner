import { IMAGES } from '@/assets';
import Image from 'next/image';
import { TranslucentButton } from './buttons';
import Link from 'next/link';

export const NotFoundSection = () => {
  return (
    <section id="not-found" className="h-full w-full p-4 py-10 md:py-16">
      <div className="mx-auto flex max-w-1200 flex-col items-center justify-center">
        <Image
          src={IMAGES.SVG.WEB_NOT_FOUND}
          alt="not found"
          className="mb-10 w-1/2 max-sm:w-[80%]"
        />
        <h1 className="mb-4 text-3xl font-semibold max-sm:text-xl">Nothing is here</h1>
        <Link href="/">
          <TranslucentButton>Go to Home</TranslucentButton>
        </Link>
      </div>
    </section>
  );
};
