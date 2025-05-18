import * as S from './Button.styles';
import type { ComponentProps } from 'react';
import type { VariantsProps } from '../../types/styleVariants';

interface ButtonProps extends Pick<ComponentProps<'button'>, 'type' | 'name' | 'id' | 'onClick'> {
  children: React.ReactNode;
  variant: VariantsProps;
}

const Button = ({ children, variant, ...buttonProps }: ButtonProps) => {
  return (
    <S.ButtonContainer
      type={buttonProps.type}
      name={buttonProps.name}
      id={buttonProps.id}
      onClick={buttonProps.onClick}
      $variant={variant}
    >
      {children}
    </S.ButtonContainer>
  );
};

export default Button;
