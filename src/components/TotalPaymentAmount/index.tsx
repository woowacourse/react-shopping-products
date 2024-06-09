import * as S from './style';

import Divider from '../Divider/Divider';
import { useContext } from 'react';
import { UseCartItemsContext } from '../../App';

const TotalPaymentAmount = () => {
  const { getCartItems } = useContext(UseCartItemsContext);

  const totalPaymentAmount = getCartItems.data
    ? getCartItems.data.reduce(
        (totalPaymentAmount, cartItem) =>
          totalPaymentAmount + cartItem.product.price * cartItem.quantity,
        0,
      )
    : 0;

  return (
    <S.TotalPaymentAmount>
      <Divider />
      <S.AmountInfo>
        <S.AmountText>총 결제 금액</S.AmountText>
        <S.Amount>{`${totalPaymentAmount.toLocaleString('ko-kr')}원`}</S.Amount>
      </S.AmountInfo>
    </S.TotalPaymentAmount>
  );
};

export default TotalPaymentAmount;
