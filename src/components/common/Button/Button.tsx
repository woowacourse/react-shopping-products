import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { ButtonWrapper } from './Button.style';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isGray?: boolean;
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  onClick,
  children,
  isGray = false,
}) => {
  return (
    <ButtonWrapper
      color="#fff"
      backgroundColor="#000"
      hasBorderRadius={true}
      onClick={onClick}
      isGray={isGray}
    >
      {children}
    </ButtonWrapper>
  );
};

export default Button;
