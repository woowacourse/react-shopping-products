import { PropsWithChildren } from 'react';
import { CartButtonProps } from '../../components/product/CartButton';
import { cartQueries } from '../../hooks/queries/cart';
import { CartButtonContext } from './CartButtonContext';

export function CartButtonProvider({
  productId,
  children,
}: PropsWithChildren<CartButtonProps>) {
  const { data: cartItems } = cartQueries.useGetCartItems();

  return (
    <CartButtonContext.Provider
      value={{
        productId,
        isPushed: cartItems.some(
          (cartItem) => cartItem.product.id === productId
        ),
      }}
    >
      {children}
    </CartButtonContext.Provider>
  );
}
