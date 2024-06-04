import { AddCartIcon } from '@assets/index';
import React from 'react';

import style from './style.module.css';

interface CartAddButtonProps {
  onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

const CartAddButton = ({ onClick }: CartAddButtonProps) => {
  const className = `cart-action-button ${style.cartAddButton} `;

  return (
    <button onClick={onClick} className={className}>
      <img src={AddCartIcon} alt="상품 장바구니 담기" />
      <span className="button__text">담기</span>
    </button>
  );
};

export default CartAddButton;
