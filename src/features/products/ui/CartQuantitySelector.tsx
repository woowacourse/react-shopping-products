import styled from '@emotion/styled';
import { useTempCartContext } from '../../cart/contexts/useTempCartContext';
import { useEffect, useState } from 'react';

interface CartQuantitySelectorProps {
  productId: number;
  cartProductId: number;
}

export default function CartQuantitySelector({ productId, cartProductId }: CartQuantitySelectorProps) {
  const { tempCart, updateTempCart } = useTempCartContext();

  const productInCart = tempCart.find((item) => item.cartProductId === cartProductId);
  const initialQuantity = productInCart?.cartProductQuantity ?? 1;

  const [cartProductQuantity, setCartQuantity] = useState(initialQuantity);

  useEffect(() => {
    updateTempCart({ productId, cartProductId, cartProductQuantity });
  }, [cartProductQuantity]);

  const handleMinusClick = () => {
    const nextQuantity = cartProductQuantity > 1 ? cartProductQuantity - 1 : 1;
    setCartQuantity(nextQuantity);
  };

  const handlePlusClick = () => {
    setCartQuantity(cartProductQuantity + 1);
  };

  return (
    <CartQuantityContainer>
      <CartQuantitySelectorButton onClick={handleMinusClick}>-</CartQuantitySelectorButton>
      <CartQuantityNumber>{cartProductQuantity}</CartQuantityNumber>
      <CartQuantitySelectorButton onClick={handlePlusClick}>+</CartQuantitySelectorButton>
    </CartQuantityContainer>
  );
}

const CartQuantityContainer = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 8px;
  color: #000;
  gap: 12px;
`;

const CartQuantitySelectorButton = styled.button`
  width: 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: background-color 0.2s;
  :hover {
    background-color: #f0f0f0;
  }
`;

const CartQuantityNumber = styled.div`
  font-size: 12px;
  font-weight: 500;
`;
