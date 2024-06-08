import { PropsWithChildren } from 'react';
import { cartQueries } from '../../hooks/queries/cart';
import { CartItemsContext } from './CartItemsContext';

export function CartItemsProvider({ children }: PropsWithChildren) {
  const { data: cartItems } = cartQueries.useGetCartItems();

  return (
    <CartItemsContext.Provider value={{ cartItems }}>
      {children}
    </CartItemsContext.Provider>
  );
}
