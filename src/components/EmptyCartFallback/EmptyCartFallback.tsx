import * as S from './EmptyCartFallback.style';

const EmptyCartFallback = () => {
  return (
    <S.Container>
      <S.FallbackText>장바구니가 텅 비어있어요</S.FallbackText>
    </S.Container>
  );
};
export default EmptyCartFallback;
