import React from 'react';

export const Loader = () => {
  return (
    <div className="absolute left-0 top-0 !z-[1000] flex h-[100dvh] w-screen items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-500 to-sky-600 text-3xl text-white">
      <span className="loader"></span>
    </div>
  );
};
