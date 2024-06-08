import { ReactNode } from 'react';
import styles from './Layout.module.css';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.wrapper}>{children}</div>
    </div>
  );
};

export default Layout;
