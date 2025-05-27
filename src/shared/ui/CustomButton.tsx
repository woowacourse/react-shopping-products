import * as S from './CustomButton.styles';

export default function CustomButton({ ...rest }) {
  return (
    <S.CustomButton data-testid='custom-button' {...rest}>
      <S.ButtonIcon src='./addCartIcon.svg' alt='button icon' />
      <S.ButtonTitle>담기</S.ButtonTitle>
    </S.CustomButton>
  );
}
