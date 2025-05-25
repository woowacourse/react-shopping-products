import { ComponentProps } from 'react';
import { buttonStyle } from './Button.styles';
import { SerializedStyles } from '@emotion/react';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'default' | 'gray' | 'gray3';
  icon?: React.ReactNode;
  css?: SerializedStyles;
}

const Button = ({
  children,
  variant = 'default',
  icon,
  css,
  ...rest
}: ButtonProps) => {
  return (
    <button css={[buttonStyle[variant], css]} {...rest}>
      {icon}
      {children}
    </button>
  );
};

export default Button;
