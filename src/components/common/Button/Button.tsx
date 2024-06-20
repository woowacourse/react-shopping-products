import { ButtonHTMLAttributes, PropsWithChildren, ReactElement } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  startContent?: ReactElement;
  width?: 'fit' | 'full' | number;
  color?: 'default' | 'primary';
  size?: 's' | 'm' | 'l';
  isSquare?: boolean;
  radius?: 's' | 'm' | 'l';
}

export default function Button({
  startContent,
  children,
  color = 'primary',
  width = 'fit',
  style,
  size = 'm',
  isSquare = false,
  radius,
  ...props
}: PropsWithChildren<ButtonProps>) {
  const widthClass = () => {
    if (width === 'fit') return styles['width-fit'];
    if (width === 'full') return styles['width-full'];
  };

  const inlineStyle = typeof width === 'number' ? { width: `${width}px` } : {};

  const sizeClass = styles[`size-${size}`];
  const squareClass = isSquare ? styles['square'] : '';
  const radiusClass = radius ? styles[`radius-${radius}`] : '';

  return (
    <button
      className={`${styles.button} ${radiusClass} ${widthClass()} ${styles[color]} ${sizeClass} ${squareClass}`}
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
