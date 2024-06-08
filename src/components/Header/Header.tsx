import { PropsWithChildren, ReactElement } from 'react';
import styles from './Header.module.css';

type HeaderProps = {
  leftComponent?: ReactElement;
  rightComponent?: ReactElement;
};

export default function Header({ leftComponent, rightComponent }: PropsWithChildren<HeaderProps>) {
  return (
    <header className={styles.headerContainer}>
      {leftComponent || <p></p>}
      {rightComponent || <p></p>}
    </header>
  );
}
