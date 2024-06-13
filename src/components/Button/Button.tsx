import { HTMLAttributes, ReactNode } from 'react';
import { Wrapper } from './Button.style';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  theme?: 'black' | 'white';
}

const Button = ({ children, theme = 'white', ...props }: ButtonProps) => {
  return (
    <Wrapper theme={theme} {...props}>
      {children}
    </Wrapper>
  );
};

export default Button;
