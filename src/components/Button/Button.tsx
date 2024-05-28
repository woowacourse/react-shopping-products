import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styles from './Button.module.css';

interface Props extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {}

const Button = ({ children, ...props }: Props) => {
  return (
    <button className={styles.buttonContent} {...props}>
      {children}
    </button>
  );
};

export default Button;
