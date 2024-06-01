import * as S from './style';

import { ButtonHTMLAttributes } from 'react';

import { CART } from '../../assets/images';
import useCart from '../../hooks/useCart';

interface CartButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
}

const CartButton = ({ onClick, ...props }: CartButtonProps) => {
  const { cartItems } = useCart();

  return (
    <S.CartButton {...props} onClick={onClick}>
      <img src={CART} alt="장바구니" />
      <S.NumberOfCartItems>{cartItems.length}</S.NumberOfCartItems>
    </S.CartButton>
  );
};

export default CartButton;
