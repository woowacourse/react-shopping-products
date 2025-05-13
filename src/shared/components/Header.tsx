import { ReactNode } from 'react';

import { cn } from '../utils/core';

type HeaderProps = {
  left: ReactNode;
  right?: ReactNode;
};

export const Header = ({ left, right }: HeaderProps) => {
  return (
    <header
      className={cn('absolute top-0 flex min-h-16 w-full items-center bg-black p-4', {
        'justify-between': right,
        'flex-start': !right,
      })}
    >
      {left}
      {right}
    </header>
  );
};
