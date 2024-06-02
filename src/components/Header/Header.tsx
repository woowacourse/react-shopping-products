import { PropsWithChildren, ReactElement } from 'react';
import styles from './Header.module.css';

type HeaderProps = {
  leftComponent?: ReactElement;
  rightComponent?: ReactElement;
};

// TODO: 뒤로가기, 로고 합성 컴포넌트를 구현하기
export default function Header({ leftComponent, rightComponent }: PropsWithChildren<HeaderProps>) {
  return (
    <header className={styles.headerContainer}>
      {leftComponent || <p></p>}
      {rightComponent || <p></p>}
    </header>
  );
}
