import React, { ReactNode } from 'react';

export const FilledButton = ({ children }: { children: ReactNode }) => {
  return (
    <div className="rounded-lg bg-sky-500 px-6 py-2 text-center font-medium text-white focus:bg-sky-700">
      {children}
    </div>
  );
};

export const TranslucentButton = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-sky-50 px-5 py-2 text-center text-base font-medium text-sky-500 shadow-sm shadow-transparent transition-all duration-500 focus-within:bg-sky-200 focus-within:outline-0 hover:bg-sky-200">
      {children}
    </div>
  );
};
