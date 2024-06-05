import React, { ReactNode } from 'react';
import { StyledButton } from './Button.style';

type ButtonVariant = 'primary' | 'secondary';

type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isDisabled?: boolean;
}

const Button = ({ children, variant = 'primary', size = 'large', isDisabled = false, ...rest }: ButtonProps) => {
  return (
    <StyledButton $variant={variant} $size={size} disabled={isDisabled} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
