import React, { ReactNode } from 'react';

export const FilledButton = ({ children }: { children: ReactNode }) => {
  return <div className="rounded-md bg-sky-500 px-6 py-2 font-medium text-white">{children}</div>;
};
