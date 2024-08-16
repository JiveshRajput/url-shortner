import React, { ReactNode } from 'react';

export const FilledButton = ({ children }: { children: ReactNode }) => {
  return <div className="rounded-md bg-sky-500 px-6 py-2 font-medium text-white">{children}</div>;
};

export const TranslucentButton = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-sky-50 px-5 py-2 text-base font-medium text-sky-500 shadow-sm shadow-transparent transition-all duration-500 focus-within:bg-sky-200 focus-within:outline-0 hover:bg-sky-200">
      {children}
    </div>
  );
};
