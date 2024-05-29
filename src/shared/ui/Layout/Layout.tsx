import { ReactNode } from 'react';

import css from './Layout.module.css';

interface Gap {
  top?: number;
  bottom?: number;
}

interface LayoutProps {
  headerSlot?: ReactNode;
  contentHeaderSlot?: ReactNode;
  contentBodySlot: ReactNode;
  contentFooterSlot?: ReactNode;
  footerSlot?: ReactNode;

  gap?: Gap;
  bgColor?: string;
}

export const Layout = ({
  headerSlot,
  contentHeaderSlot,
  contentBodySlot,
  contentFooterSlot,
  footerSlot,
  gap,
}: LayoutProps) => {
  return (
    <div className={css.layoutContainer}>
      {headerSlot && <header className={css.layoutHeader}>{headerSlot}</header>}
      <div className={css.contentWrapper}>
        {contentHeaderSlot && <header className={css.contentHeader}>{contentHeaderSlot}</header>}
        <div style={{ margin: `${gap?.top ?? 0}px 0 ${gap?.bottom ?? 0}px 0` }} className={css.contentBody}>
          {contentBodySlot}
        </div>
        {contentFooterSlot && <footer className={css.contentFooter}>{contentFooterSlot}</footer>}
      </div>
      {footerSlot && <footer className={css.layoutFooter}>{footerSlot}</footer>}
    </div>
  );
};
