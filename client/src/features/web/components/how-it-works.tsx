import { STEPS } from '../constants';

export const HowItWorksSection = () => {
  return (
    <section id="how-to-use" className="h-full w-full bg-slate-100 p-4 py-10 md:py-16">
      <div className="mx-auto max-w-1200">
        <div className="mx-auto flex flex-col justify-between">
          <div className="text-center text-black">
            <p className="font-regular mb-4 text-sm leading-7">STEPS</p>
            <h3 className="text-3xl font-extrabold leading-normal tracking-tight sm:text-5xl">
              How it <span className="text-sky-500">Works?</span>
            </h3>
          </div>
          <div className="mt-10">
            <ul className="flex flex-wrap justify-center gap-4">
              {STEPS.map(({ description, title, bgColor, textColor }, index) => (
                <li
                  key={index}
                  className="relative mt-10 w-[300px] cursor-pointer rounded-lg bg-white p-5 text-center shadow-md max-sm:w-full"
                >
                  <div className="flex flex-col items-center">
                    <div className="-shrink-0 absolute top-0 -mt-10">
                      <div
                        className={`${bgColor} ${textColor} flex size-20 items-center justify-center rounded-full border-4 border-slate-100 text-2xl font-semibold shadow-md`}
                      >
                        {index + 1}
                      </div>
                    </div>
                    <div className="mt-8 text-black">
                      <h4 className="text-lg font-semibold leading-6">{title}</h4>
                      <p className="mt-2 text-sm leading-6 opacity-60">{description}</p>
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
