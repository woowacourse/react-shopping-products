import * as S from './Button.styles';
import type { ComponentProps } from 'react';
import type { SizeProps, ColorProps } from '../../../types/styleVariants';
interface ButtonProps
  extends Pick<ComponentProps<'button'>, 'type' | 'name' | 'id' | 'onClick' | 'disabled'> {
  children: React.ReactNode;
  size: SizeProps;
  color: ColorProps;
}

const Button = ({ children, size, color, ...buttonProps }: ButtonProps) => {
  return (
    <S.ButtonContainer
      type={buttonProps.type}
      name={buttonProps.name}
      id={buttonProps.id}
      onClick={buttonProps.onClick}
      $size={size}
      $color={color}
      disabled={buttonProps.disabled}
    >
      {children}
    </S.ButtonContainer>
  );
};

export default Button;
