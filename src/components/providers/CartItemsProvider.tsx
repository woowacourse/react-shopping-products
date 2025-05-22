import { ReactNode } from 'react';
import useCartItems from '../../hooks/useCartItems';
import { CartItemsContext } from '../contexts/cartItemsContext';

const CartItemsProvider = ({ children }: { children: ReactNode }) => {
  const cartItemsValue = useCartItems();

  return (
    <CartItemsContext.Provider value={cartItemsValue}>
      {children}
    </CartItemsContext.Provider>
  );
};

export default CartItemsProvider;
