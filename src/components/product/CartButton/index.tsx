import { AddCartIcon, RemoveCartIcon } from './Icons';
import * as S from './style';
import { cartMutations } from '../../../hooks/queries/cart';
import { CartButtonProvider } from '../../../context/cartButton/CartButtonProvider';
import { useCartButtonContext } from '../../../context/cartButton/useCartButtonContext';
import { useCartItemsContext } from '../../../context/cartItems/useCartItemsContext';

export interface CartButtonProps {
  productId: number;
}

export default function CartButton({ productId }: CartButtonProps) {
  return (
    <CartButtonProvider productId={productId}>
      <CartButton.Toggle />
    </CartButtonProvider>
  );
}

CartButton.Toggle = function Toggle() {
  const { isPushed } = useCartButtonContext();

  return isPushed ? <CartButton.Remove /> : <CartButton.Add />;
};

CartButton.Remove = function Remove() {
  const { productId, setIsPushed } = useCartButtonContext();
  const { cartItems } = useCartItemsContext();

  const cartItemId = cartItems.find(
    (cartItem) => cartItem.product.id === productId
  )?.id;

  const { mutate: removeCartItem } = cartMutations.useDeleteCartItem(
    {
      cartItemId,
    },
    () => setIsPushed(false)
  );

  const handleClick = () => {
    if (!cartItemId) return;
    removeCartItem();
  };

  return (
    <S.Button isPushed onClick={handleClick}>
      <RemoveCartIcon />
      <p>빼기</p>
    </S.Button>
  );
};

CartButton.Add = function Add() {
  const { productId, setIsPushed } = useCartButtonContext();

  const { mutate: addCartItem } = cartMutations.useAddCartItem(
    {
      productId,
    },
    () => setIsPushed(true)
  );

  const handleClick = () => {
    addCartItem();
  };

  return (
    <S.Button isPushed={false} onClick={handleClick}>
      <AddCartIcon />
      <p>담기</p>
    </S.Button>
  );
};
