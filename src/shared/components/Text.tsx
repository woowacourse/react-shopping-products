import { cva } from 'class-variance-authority';
import { cn } from '../utils/core';
import { ComponentProps } from 'react';

export type Typography = 'Heading' | 'Title' | 'Body' | 'caption';

const variantClasses = cva('whitespace-pre-line select-none', {
  variants: {
    type: {
      Heading: 'text-[24px] leading-[1.1]',
      Title: 'text-lg leading-[1.1]',
      Body: 'text-base leading-[1.1] ',
      caption: 'text-sm leading-[1.1] inline-block',
    },
    weight: {
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    weight: 'medium',
  },
});

type Props = {
  /**
   * The type of text to render
   */
  type: Typography;
  /**
   * The weight of the text
   * @default 'regular'
   */
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
} & ComponentProps<'p'>;

export function Text({ type, weight = 'regular', className, ...props }: Props) {
  return <p className={cn(variantClasses({ type, weight }), className)} {...props} />;
}
