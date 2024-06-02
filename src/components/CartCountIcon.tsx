import CartIcon from '@/assets/cart.svg?react';
import styled from '@emotion/styled';
import { theme } from '@/style/theme.style';
import useCartListContext from '@/hooks/useCartListContext';

const CartCountIcon = () => {
  const { cartList } = useCartListContext();

  return (
    <S.Container>
      <CartIcon />
      {cartList.length !== 0 && <S.Circle>{cartList.length}</S.Circle>}
    </S.Container>
  );
};

export default CartCountIcon;

const S = {
  Container: styled.div`
    position: relative;
    display: inline-block;
    width: 30px;
  `,
  Circle: styled.div`
    position: absolute;
    top: 80%;
    right: 20%;
    transform: translate(50%, -50%);
    background-color: ${theme.color.white};
    color: ${theme.color.black};
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${theme.fontSize.xsmall};
    font-weight: ${theme.fontWeight.bold};
  `,
};
