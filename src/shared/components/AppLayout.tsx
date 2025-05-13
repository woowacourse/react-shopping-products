import { PropsWithChildren } from 'react';

export const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative mx-auto flex h-dvh w-full max-w-[400px] flex-col items-center justify-center border-x-[1px] border-gray-300">
      {children}
    </div>
  );
};
