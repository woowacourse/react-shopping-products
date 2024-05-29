import * as S from './style';

import { ButtonHTMLAttributes } from 'react';

import { CART } from '../../assets/images';

interface CartButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
}

const CartButton = ({ onClick, ...props }: CartButtonProps) => {
  return (
    <S.CartButton {...props} onClick={onClick}>
      <img src={CART} alt="장바구니" />
    </S.CartButton>
  );
};

export default CartButton;
