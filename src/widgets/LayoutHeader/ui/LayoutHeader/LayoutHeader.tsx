import { ReactNode } from 'react';

import css from './LayoutHeader.module.css';

interface LayoutHeaderProps {
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
}

export const LayoutHeader = ({ leftSlot, rightSlot }: LayoutHeaderProps) => {
  return (
    <div className={css.layoutHeaderContainer}>
      <div className={css.leftSlot}>{leftSlot}</div>
      <div className={css.rightSlot}>{rightSlot}</div>
    </div>
  );
};
