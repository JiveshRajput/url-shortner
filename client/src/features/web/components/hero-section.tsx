import Link from 'next/link';
import { FaAngleRight } from 'react-icons/fa6';

export const HeroSection = () => {
  return (
    <div className="">
      <section
        id="home"
        className="relative mb-0 h-full w-full overflow-hidden p-4 pb-0 pt-12 md:pt-16"
      >
        <div className="absolute top-0 -z-10 h-full w-full bg-white">
          <div className="animate-glitter absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[50%] translate-y-[20%] rounded-full bg-sky-300/50 opacity-50 blur-[80px] delay-1000"></div>
          <div className="animate-glitter delay-1500 absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[5%] translate-y-[40%] rounded-full bg-amber-200/50 opacity-50 blur-[80px] max-md:hidden"></div>
          <div className="animate-glitter delay-2000 absolute bottom-auto left-0 right-auto top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-red-300/50 opacity-50 blur-[80px] max-md:hidden"></div>
          <div className="animate-glitter delay-2500 absolute bottom-auto left-0 right-auto top-0 h-[500px] w-[500px] translate-x-[60%] translate-y-[60%] rounded-full bg-green-300/50 opacity-50 blur-[80px]"></div>
        </div>
        <div className="mx-auto max-w-1200">
          <section className="lg:pt-10">
            <div className="relative mx-auto max-w-7xl text-center">
              <div className="flex justify-center">
                <div className="mx-auto mb-4 flex items-center justify-between gap-3 rounded-full border border-sky-500 p-1">
                  <span className="ml-3 font-inter text-xs font-medium">
                    Explore how to track with one link
                  </span>
                  <Link
                    href="/dashboard"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500"
                  >
                    👉
                  </Link>
                </div>
              </div>
              <h1 className="font-manrope mx-auto mb-5 text-center text-4xl font-bold leading-[50px] md:text-5xl">
                Make your every connection
                <span className="text-sky-500"> Count</span>
              </h1>
              <p className="mx-auto mb-9 max-w-[650px] text-center text-base font-normal leading-7 text-gray-700">
                Create Short links, QR Codes, share them anywhere. Track what is working, and what
                is not. All inside the <b>QuickURL Connections Platform</b>
              </p>
              <Link
                href="/sign-in"
                className="shadow-xs mb-14 inline-flex w-auto items-center justify-center gap-3 rounded-full bg-sky-500 px-7 py-3 text-center text-base font-semibold text-white transition-all duration-500 hover:bg-sky-600"
              >
                Create an account
                <FaAngleRight />
              </Link>
              <div className="flex justify-center">
                <img
                  src="https://pagedone.io/asset/uploads/1691054543.png"
                  alt="Dashboard image"
                  className="rounded-t-3xl"
                />
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};
