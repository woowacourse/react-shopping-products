import { PropsWithChildren, useState } from 'react';
import { useCartItemsContext } from '../cartItems/useCartItemsContext';
import { CartButtonContext } from './CartButtonContext';
import { CartButtonProps } from '../../components/product/CartButton';

export function CartButtonProvider({
  productId,
  children,
}: PropsWithChildren<CartButtonProps>) {
  const { cartItems } = useCartItemsContext();
  const [isPushed, setPushed] = useState(() =>
    cartItems.some((cartItem) => cartItem.product.id === productId)
  );

  const setIsPushed = (newValue: boolean) => {
    setPushed(newValue);
  };

  return (
    <CartButtonContext.Provider value={{ productId, isPushed, setIsPushed }}>
      {children}
    </CartButtonContext.Provider>
  );
}
