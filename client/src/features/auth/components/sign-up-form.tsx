'use client';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { signUpAction } from '../server-actions';

export const SignUpForm = () => {
  /**
   * This method is used to sign up.
   * @param formData: Formdata includes name, email and password
   */
  const handleSignUp = async (formData: FormData) => {
    const response = await signUpAction(formData);
    if (response?.errorMessage) {
      toast.error(response.errorMessage);
    }

    if (response?.successMessage) {
      toast.success(response.successMessage);
      redirect('/dashboard');
    }
  };

  return (
    <div>
      {/* <div className="flex flex-col items-center">
        <button className="flex w-full max-w-xs items-center justify-center rounded-lg bg-sky-100 py-3 font-bold shadow-sm transition-all duration-300 ease-in-out hover:bg-sky-200 hover:shadow focus:bg-sky-200 focus:shadow-sm focus:outline-none">
          <div className="rounded-full bg-white p-2">
            <svg className="w-4" viewBox="0 0 533.5 544.3">
              <path
                d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                fill="#4285f4"
              />
              <path
                d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                fill="#34a853"
              />
              <path
                d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                fill="#fbbc04"
              />
              <path
                d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                fill="#ea4335"
              />
            </svg>
          </div>
          <span className="ml-4">Sign Up with Google</span>
        </button>
      </div> */}

      {/* <div className="mb-8 mt-4 border-b text-center">
        <div className="inline-block translate-y-1/2 transform bg-white px-2 text-sm font-medium leading-none tracking-wide">
          Or sign up with e-mail
        </div>
      </div> */}

      <div className="mx-auto max-w-xs">
        <form action={handleSignUp}>
          <input
            className="w-full rounded-lg border-2 border-gray-100 bg-gray-100 px-5 py-3 text-sm font-medium placeholder-gray-500 focus:border-gray-100 focus:bg-white focus:outline-none"
            type="text"
            name="name"
            placeholder="Name"
            required
          />
          <input
            className="mt-4 w-full rounded-lg border-2 border-gray-100 bg-gray-100 px-5 py-3 text-sm font-medium placeholder-gray-500 focus:border-gray-100 focus:bg-white focus:outline-none"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <input
            className="mt-4 w-full rounded-lg border-2 border-gray-100 bg-gray-100 px-5 py-3 text-sm font-medium placeholder-gray-500 focus:border-gray-100 focus:bg-white focus:outline-none"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <button className="focus:shadow-outline mt-4 flex w-full items-center justify-center rounded-lg bg-sky-500 py-3 font-semibold tracking-wide text-white transition-all duration-300 ease-in-out hover:bg-sky-600 focus:bg-sky-600 focus:outline-none">
            <svg
              className="-ml-2 h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <path d="M20 8v6M23 11h-6" />
            </svg>
            <span className="ml-3">Sign Up</span>
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-black">
          I agree to abide by{' '}
          <Link
            href="/terms-and-condition"
            className="border-b border-dotted border-sky-500 font-semibold text-sky-500 transition hover:border-sky-700 hover:text-sky-700 focus:border-sky-700 focus:text-sky-700 focus:outline-none"
          >
            Terms of Service
          </Link>{' '}
          and its{' '}
          <Link
            href="/privacy-policy"
            className="border-b border-dotted border-sky-500 font-semibold text-sky-500 transition hover:border-sky-700 hover:text-sky-700 focus:border-sky-700 focus:text-sky-700 focus:outline-none"
          >
            Privacy Policy
          </Link>
        </p>
        <p className="mt-4 text-center text-sm">
          <Link
            href="/sign-in"
            className="font-semibold text-sky-500 transition hover:text-sky-700 focus:text-sky-700 focus:outline-none"
          >
            Already an user? Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
