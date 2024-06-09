import { FlexSpaceBetween } from '@/style/common.style';
import styled from '@emotion/styled';
import { theme } from '@/style/theme.style';
import useCartPrice from '@/hooks/cart/useCartPrice';

const CartPrice = () => {
  const totalPrice = useCartPrice();

  return (
    <S.FlexBox>
      <S.Title>총 결제 금액</S.Title>
      <S.Price>{totalPrice.toLocaleString('ko-Kr')}원</S.Price>
    </S.FlexBox>
  );
};

export default CartPrice;

const S = {
  FlexBox: styled.div`
    height: 40px;
    ${FlexSpaceBetween}
    align-items: center;
  `,
  Title: styled.div`
    font-size: ${theme.fontSize.large};
    font-weight: ${theme.fontWeight.bold};
  `,
  Price: styled.div`
    font-size: ${theme.fontSize.xlarge};
    font-weight: ${theme.fontWeight.bold};
  `,
};
