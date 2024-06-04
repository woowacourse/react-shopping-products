import { PropsWithChildren, useEffect, useState } from 'react';
import { cartQueries } from '../../components/hooks/queries/cart';
import { CartItemsContext } from './CartItemsContext';
import { MAX_CART_ITEMS_FETCH_SIZE } from '../../constants/paginationRules';

export function CartItemsProvider({ children }: PropsWithChildren) {
  const [shouldRefresh, setShouldRefresh] = useState<boolean>(true);

  const {
    query: getCartItems,
    data: { content: cartItems },
  } = cartQueries.useGetCartItems({
    size: MAX_CART_ITEMS_FETCH_SIZE,
  });

  useEffect(() => {
    if (shouldRefresh) {
      getCartItems();
      setShouldRefresh(false);
    }
  }, [shouldRefresh]);

  const refreshCartItems = () => {
    setShouldRefresh(true);
  };

  return (
    <CartItemsContext.Provider
      value={{ cartItems: cartItems ?? {}, refreshCartItems }}
    >
      {children}
    </CartItemsContext.Provider>
  );
}
