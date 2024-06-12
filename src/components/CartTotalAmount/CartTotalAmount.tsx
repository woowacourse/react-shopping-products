import { MESSAGE } from '../../constants/message.ts';
import { CartTotalAmountProps } from './CartTotalAmount.type.ts';
import * as S from './CartTotalAmount.styled.ts';
import formatPriceToKoreanWon from '../../util/formatPriceToKoreanWon.ts';

function CartTotalAmount({ totalCartItemAmount }: CartTotalAmountProps) {
  return (
    <S.TotalAmountContainer>
      <S.Border />
      <S.TotalInfoBox>
        <S.TotalInfoLabel>{MESSAGE.TOTAL_AMOUNT_LABEL}</S.TotalInfoLabel>
        <S.TotalInfoAmount>
          {formatPriceToKoreanWon(totalCartItemAmount)}원
        </S.TotalInfoAmount>
      </S.TotalInfoBox>
    </S.TotalAmountContainer>
  );
}

export default CartTotalAmount;
