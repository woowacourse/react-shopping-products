import { PropsWithChildren } from 'react';
import { MAX_CART_ITEMS_FETCH_SIZE } from '../../constants/paginationRules';
import { cartQueries } from '../../hooks/queries/cart';
import { CartItemsContext } from './CartItemsContext';

export function CartItemsProvider({ children }: PropsWithChildren) {
  const {
    data: cartItems,
    isLoading,
    error,
  } = cartQueries.useGetCartItems({
    size: MAX_CART_ITEMS_FETCH_SIZE,
  });

  if (isLoading || error || !cartItems) return;

  return (
    <CartItemsContext.Provider value={{ cartItems: cartItems ?? [] }}>
      {children}
    </CartItemsContext.Provider>
  );
}
