import { MESSAGE } from '../../constants/message.ts';
import { CartTotalAmountProps } from './CartTotalAmount.type.ts';
import * as S from './CartTotalAmount.styled.ts';

function CartTotalAmount({ totalCartItemAmount }: CartTotalAmountProps) {
  return (
    <S.TotalAmountContainer>
      <S.Border />
      <S.TotalInfoBox>
        <S.TotalInfoLabel>{MESSAGE.TOTAL_AMOUNT_LABEL}</S.TotalInfoLabel>
        <S.TotalInfoAmount>
          {totalCartItemAmount.toLocaleString()}원
        </S.TotalInfoAmount>
      </S.TotalInfoBox>
    </S.TotalAmountContainer>
  );
}

export default CartTotalAmount;
