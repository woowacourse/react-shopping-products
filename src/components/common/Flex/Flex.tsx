import styles from './Flex.module.css';
import { HTMLAttributes, PropsWithChildren } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  gap?: number;
  direction?: 'row' | 'column';
}

export default function Flex({
  children,
  gap,
  direction = 'column',
  ...rest
}: PropsWithChildren<Props>) {
  const getGap = () => {
    if (direction === 'column') return { rowGap: gap };
    if (direction === 'row') return { columnGap: gap };
  };

  return (
    <div
      className={styles.flex}
      style={{
        flexDirection: direction,
        ...getGap(),
        ...rest.style,
      }}
    >
      {children}
    </div>
  );
}
