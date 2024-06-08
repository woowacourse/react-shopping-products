import { Carts } from '../../types/fetch';
import totalAmountCalculator from '../../utils/totalAmountCalculator';

import * as S from './TotalAmount.styled';

interface TotalAmountProps {
  cartItems: Carts[];
}

function TotalAmount({ cartItems }: TotalAmountProps) {
  return (
    <S.TotalAmountContainer>
      <S.TotalAmountLabel>총 결제 금액</S.TotalAmountLabel>
      <S.TotalAmount>{totalAmountCalculator(cartItems)}원</S.TotalAmount>
    </S.TotalAmountContainer>
  );
}

export default TotalAmount;
