import * as S from './TotalAmount.styled';

function TotalAmount() {
  return (
    <S.TotalAmountContainer>
      <S.TotalAmountLabel>총 결제 금액</S.TotalAmountLabel>
      <S.TotalAmount>원</S.TotalAmount>
    </S.TotalAmountContainer>
  );
}

export default TotalAmount;
