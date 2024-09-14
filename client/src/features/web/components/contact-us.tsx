'use client';

import { FilledButton } from '@/features/common';
import Link from 'next/link';
import { toast } from 'sonner';
import { submitEnquiryFormAction } from '../server-actions/submit-inquiry-form-action';

export const ContactUsSection = () => {
  /**
   * This method is used to submit contact us form.
   * @param formData: Formdata includes email and password
   */
  const handleSubmitEnquiry = async (formData: FormData) => {
    const response = await submitEnquiryFormAction(formData);

    if (response?.errorMessage) {
      toast.error(response.errorMessage);
    }

    if (response?.successMessage) {
      toast.success(response.successMessage);
    }
  };

  return (
    <section
      id="contact-us"
      className="relative z-0 h-full w-full overflow-hidden p-4 py-10 md:py-16"
    >
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e0e0e0_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="absolute bottom-0 left-0 -z-10 h-[300px] w-[300px] translate-x-[5%] translate-y-[10%] rounded-full bg-green-300/50 opacity-50 blur-[80px] max-md:hidden"></div>
      <div className="mx-auto max-w-1200">
        <div className="mx-auto grid grid-cols-1 gap-8 text-gray-900 md:grid-cols-2">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-bold leading-normal lg:text-5xl">
                Lets talk about everything👋!
              </h2>
              <div className="mt-8 text-gray-700">
                Hate forms? Send us an email instead{' '}
                <span className="text-sky-500 underline">
                  <Link target="_blank" href="mailto:jsoperatorz@gmail.com">
                    jsoperatorz@gmail.com
                  </Link>
                </span>
              </div>
            </div>
            <div className="mt-8 text-center">{/* IMAGE HERE */}</div>
          </div>
          <form action={handleSubmitEnquiry}>
            <div className="mb-6">
              <input
                className="w-full rounded-lg border-2 border-gray-100 bg-gray-100 px-5 py-3 text-sm font-medium placeholder-gray-500 focus:border-gray-100 focus:bg-white focus:outline-none"
                type="text"
                name="name"
                placeholder="Full Name *"
                required
              />
            </div>
            <div className="mb-6">
              <input
                className="w-full rounded-lg border-2 border-gray-100 bg-gray-100 px-5 py-3 text-sm font-medium placeholder-gray-500 focus:border-gray-100 focus:bg-white focus:outline-none"
                type="number"
                name="number"
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
          </form>
        </div>
      </div>
    </section>
  );
};
