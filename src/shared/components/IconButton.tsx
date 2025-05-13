import { ComponentProps, ReactNode } from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '../utils/core';

type IconButtonProps = {
  variant?: 'primary' | 'secondary';
  imgName?: string;
  children: ReactNode;
  className?: string;
} & ComponentProps<'button'>;

export const IconButton = ({ variant, imgName, children, className }: IconButtonProps) => {
  const variantClasses = cva(
    `border-none border-2 px-2 py-1 flex rounded-md items-center justify-center gap-1`,
    {
      variants: {
        variant: {
          primary: 'bg-black text-white hover:bg-gray-800',
          secondary: 'bg-gray-700 text-black hover:bg-gray-600',
        },
      },
      defaultVariants: {
        variant: 'primary',
      },
    }
  );

  return (
    <button className={cn(variantClasses({ variant }), className)}>
      <img src={`./${imgName}.png`} alt="icon" className="h-5 w-5" />
      {children}
    </button>
  );
};
