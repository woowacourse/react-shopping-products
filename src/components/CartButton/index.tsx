import * as S from './style';

import { ButtonHTMLAttributes } from 'react';

import { CART } from '../../assets/images';

interface CartButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  count: number;
  onOpen: () => void;
}

const CartButton = ({ count, onOpen, ...props }: CartButtonProps) => {
  return (
    <S.CartButton {...props} onClick={onOpen}>
      <img src={CART} alt="장바구니" />
      {count !== 0 && <S.NumberOfCartItems>{count >= 10 ? '9+' : count}</S.NumberOfCartItems>}
    </S.CartButton>
  );
};

export default CartButton;
