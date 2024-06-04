import * as S from './style';

interface SpinnerProps {
  isInCart: boolean;
}

const Spinner = ({ isInCart }: SpinnerProps) => {
  return (
    <S.SpinnerContainer>
      <S.SpinnerDot $isInCart={isInCart} />
      <S.SpinnerDot $isInCart={isInCart} />
      <S.SpinnerDot $isInCart={isInCart} />
      <S.SpinnerDot $isInCart={isInCart} />
      <S.SpinnerDot $isInCart={isInCart} />
      <S.SpinnerDot $isInCart={isInCart} />
      <S.SpinnerDot $isInCart={isInCart} />
      <S.SpinnerDot $isInCart={isInCart} />
    </S.SpinnerContainer>
  );
};

export default Spinner;
