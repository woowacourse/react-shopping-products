import { PropsWithChildren } from 'react';
import styles from './Text.module.css';

export type TextProps = {
  size?: 's' | 'm' | 'l';
  weight?: 's' | 'm' | 'l';
};

const Text = ({ children, size = 'm', weight = 'm' }: PropsWithChildren<TextProps>) => {
  return (
    <p
      className={`${styles.container} ${size && styles[`size-${size}`]} ${weight && styles[`weight-${weight}`]}`}
    >
      {children}
    </p>
  );
};

export default Text;
