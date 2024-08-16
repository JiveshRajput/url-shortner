import { STEPS } from '@/features/common';

export const HowToUseSection = () => {
  return (
    <section id="how-to-use" className="h-full w-full bg-slate-800 p-4 py-10 md:py-16">
      <div className="mx-auto max-w-1200">
        <div className="mx-auto flex flex-col justify-between">
          <div className="text-center text-white">
            <p className="font-regular mb-4 text-sm leading-7">STEPS</p>
            <h3 className="text-3xl font-extrabold leading-normal tracking-tight sm:text-5xl">
              How it <span className="text-sky-500">Works?</span>
            </h3>
          </div>
          <div className="mt-10">
            <ul className="grid gap-2 md:grid-cols-5">
              {STEPS.map(({ description, title }, index) => (
                <li key={index} className="relative mt-10 rounded-lg bg-slate-700 p-5 text-center">
                  <div className="flex flex-col items-center">
                    <div className="-shrink-0 absolute top-0 -mt-10">
                      <div className="flex size-20 items-center justify-center rounded-full border-4 border-slate-800 bg-sky-500 text-2xl font-semibold text-white">
                        {index + 1}
                      </div>
                    </div>
                    <div className="mt-8 text-white">
                      <h4 className="text-lg font-semibold leading-6">{title}</h4>
                      <p className="mt-2 opacity-60 leading-6 max-md:text-sm">{description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
