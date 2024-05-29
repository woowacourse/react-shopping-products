import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { ButtonWrapper } from './Button.style';

const Button: React.FC<
  PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>
> = ({ onClick, children }) => {
  return (
    <ButtonWrapper
      color="#fff"
      backgroundColor="#000"
      hasBorderRadius={true}
      onClick={onClick}
    >
      {children}
    </ButtonWrapper>
  );
};

export default Button;
