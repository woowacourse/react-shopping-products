import { ButtonHTMLAttributes } from 'react';
import { buttonStyle } from './Button.styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'gray';
  icon?: React.ReactNode;
}

const Button = ({
  children,
  variant = 'default',
  icon,
  ...rest
}: ButtonProps) => {
  return (
    <button css={[buttonStyle[variant]]} {...rest}>
      {icon}
      {children}
    </button>
  );
};

export default Button;
