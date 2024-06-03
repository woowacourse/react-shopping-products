import { useContext, useState } from 'react';
import { CartItemsContext } from '../../../context/CartItemsProvider';
import { AddCartIcon, RemoveCartIcon } from './Icons';
import * as S from './style';
import { addCartItem, removeCartItem } from '../../../api/cart';

interface CartButtonProps {
  productId: number;
}

export default function CartButton({ productId }: CartButtonProps) {
  const { cartItems } = useContext(CartItemsContext);
  const [isPushed, setPushed] = useState(() =>
    cartItems.some((cartItem) => cartItem.product.id === productId)
  );

  const setIsPushed = (newValue: boolean) => {
    setPushed(newValue);
  };

  return isPushed ? (
    <RemoveCartButton setIsPushed={setIsPushed} productId={productId} />
  ) : (
    <AddCartButton setIsPushed={setIsPushed} productId={productId} />
  );
}

interface CartToggleButtonProps extends CartButtonProps {
  setIsPushed: (newValue: boolean) => void;
}

export function RemoveCartButton({
  setIsPushed,
  productId,
}: CartToggleButtonProps) {
  const { cartItems, refreshCartItems } = useContext(CartItemsContext);
  const cartItemId = cartItems.find(
    (cartItem) => cartItem.product.id === productId
  )?.id;

  const handleClick = () => {
    if (!cartItemId) return;

    removeCartItem({ cartItemId }).then(() => {
      refreshCartItems();
      setIsPushed(false);
    });
  };

  return (
    <S.Button isPushed onClick={handleClick}>
      <RemoveCartIcon />
      <p>빼기</p>
    </S.Button>
  );
}

export function AddCartButton({
  setIsPushed,
  productId,
}: CartToggleButtonProps) {
  const { refreshCartItems } = useContext(CartItemsContext);

  const handleClick = () => {
    addCartItem({ productId }).then(() => {
      refreshCartItems();
      setIsPushed(true);
    });
  };

  return (
    <S.Button isPushed={false} onClick={handleClick}>
      <AddCartIcon />
      <p>담기</p>
    </S.Button>
  );
}
