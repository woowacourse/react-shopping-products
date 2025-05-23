import { SerializedStyles } from '@emotion/react';
import * as S from './CustomButton.styles';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  css?: SerializedStyles;
}

export default function CustomButton({ css: cssProp, ...rest }: CustomButtonProps) {
  return (
    <S.CustomButton css={cssProp} {...rest}>
      <S.ButtonIcon src='./addCartIcon.svg' alt='button icon' />
      <S.ButtonTitle>담기</S.ButtonTitle>
    </S.CustomButton>
  );
}
