import { PropsWithChildren } from 'react';
import { ButtonWrapper } from './Button.style';

const Button: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ButtonWrapper color="#fff" backgroundColor="#000" hasBorderRadius={true}>
      {children}
    </ButtonWrapper>
  );
};

export default Button;
