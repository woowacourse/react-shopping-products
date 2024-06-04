import { ButtonWrapper } from './Button.style';
import { ButtonProps } from './Button.type';

const Button = ({ onClick, children, isGray = false }: ButtonProps) => {
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
