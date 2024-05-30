import CartIcon from '@/assets/cart.svg?react';
import styled from '@emotion/styled';
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
    background-color: white;
    color: black;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
  `,
};
