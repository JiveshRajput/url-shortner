import { FilledButton } from '@/features/common';
import Link from 'next/link';

export const ContactUsSection = () => {
  return (
    <section id="contact-us" className="h-full w-full  p-4 py-10 md:py-16">
      <div className="mx-auto max-w-1200">
        <div className="mx-auto grid grid-cols-1 gap-8 text-gray-900 md:grid-cols-2">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-bold leading-tight lg:text-5xl">
                Lets talk about everything!
              </h2>
              <div className="mt-8 text-gray-700">
                Hate forms? Send us an email instead{' '}
                <span className="underline text-sky-500">
                  <Link target="_blank" href="mailto:jsoperatorz@gmail.com">
                    jsoperatorz@gmail.com
                  </Link>
                </span>
              </div>
            </div>
            <div className="mt-8 text-center">{/* IMAGE HERE */}</div>
          </div>
          <div>
            <div className="mb-6">
              <input
                className="w-full rounded-lg border-2 border-gray-100 bg-gray-100 px-5 py-3 text-sm font-medium placeholder-gray-500 focus:border-gray-100 focus:bg-white focus:outline-none"
                type="text"
                name="fullname"
                placeholder="Full Name *"
                required
              />
            </div>
            <div className="mb-6">
              <input
                className="w-full rounded-lg border-2 border-gray-100 bg-gray-100 px-5 py-3 text-sm font-medium placeholder-gray-500 focus:border-gray-100 focus:bg-white focus:outline-none"
                type="number"
                name="phone"
                placeholder="Phone Number *"
                required
              />
            </div>
            <div className="mb-6">
              <input
                className="w-full rounded-lg border-2 border-gray-100 bg-gray-100 px-5 py-3 text-sm font-medium placeholder-gray-500 focus:border-gray-100 focus:bg-white focus:outline-none"
                type="email"
                name="email"
                placeholder="Email *"
                required
              />
            </div>
            <div className="mb-6">
              <textarea
                placeholder="Message"
                rows={4}
                name="message"
                className="w-full resize-none rounded-lg border-2 border-gray-100 bg-gray-100 px-5 py-3 text-sm font-medium placeholder-gray-500 focus:border-gray-100 focus:bg-white focus:outline-none"
              ></textarea>
            </div>
            <button className="w-full rounded-lg">
              <FilledButton>Send Message</FilledButton>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
