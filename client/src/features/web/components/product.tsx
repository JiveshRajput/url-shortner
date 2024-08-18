import { IMAGES } from '@/assets';
import { FilledButton, SERVICES } from '@/features/common';
import Image from 'next/image';
import Link from 'next/link';

export const ProductSection = () => {
  return (
    <section id="product" className="relative h-full w-full p-4 py-10 md:py-16">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e0e0e0_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="mx-auto max-w-1000">
        <div className="rounded-lg bg-slate-100 p-8 max-md:p-4 max-md:py-8">
          <div className="text-center">
            <h1 className="mx-auto mb-2 text-center text-5xl font-semibold leading-tight max-md:text-3xl">
              Explore features
              <br />
              for more 🧩 efficiency
            </h1>
            <p className="mb-6">Use Quick URL to save your hours of work</p>
            <div className="mb-12 flex flex-wrap items-center justify-center gap-3 max-md:mb-10">
              {SERVICES.map(({ name, Icon, cardCss, iconCss }) => (
                <div
                  key={name}
                  className={`group flex cursor-pointer gap-1 rounded-full border p-1 pr-3 transition hover:text-white ${cardCss}`}
                >
                  <div className={`${iconCss} rounded-full p-1 text-white group-hover:bg-white`}>
                    <Icon />
                  </div>
                  <p className="font-semibold">{name}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 max-md:flex-col md:text-left">
              <div className="flex flex-[5] flex-col items-start max-md:items-center">
                <p className="mb-2 text-4xl font-bold max-md:text-2xl">
                  Create, Share <br />& Track
                </p>
                <div className="mb-6">Learn from your links and improve your presence</div>
                <Link href="/sign-up" className="rounded-lg">
                  <FilledButton>Start for Free</FilledButton>
                </Link>
              </div>
              <div className="flex-[5] p-2">
                <Image alt="analytics" src={IMAGES.SVG.WEB_ANALYTICS_STATS} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
