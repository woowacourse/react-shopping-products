import { ButtonHTMLAttributes, PropsWithChildren, ReactElement } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  startContent?: ReactElement;
  width?: 'fit' | 'full' | number;
  color?: 'default' | 'primary';
}

export default function Button({
  startContent,
  children,
  color = 'primary',
  width = 'fit',
  style,
  ...props
}: PropsWithChildren<ButtonProps>) {
  const widthClass = () => {
    if (width === 'fit') return styles['width-fit'];
    if (width === 'full') return styles['width-full'];
  };

  const inlineStyle = typeof width === 'number' ? { width: `${width}px` } : {};

  return (
    <button
      className={`${styles.button} ${widthClass()} ${styles[color]}`}
      {...props}
      style={{
        ...inlineStyle,
        ...style,
      }}
    >
      {startContent || <></>}
      {children}
    </button>
  );
}
