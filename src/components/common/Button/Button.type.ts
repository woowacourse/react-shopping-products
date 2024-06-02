import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  backgroundColor?: string;
  hasBorderRadius?: boolean;
  isGray?: boolean;
  children: ReactNode;
}
