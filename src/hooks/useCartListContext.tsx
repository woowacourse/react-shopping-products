import { CartContext } from '@/contexts/CartListContext';
import { useContext } from 'react';

const useCartListContext = () => {
  const state = useContext(CartContext);
  if (!state) throw new Error('CartProvider not found');

  const {
    cartList,
    updateCartListContext,
    cartListQuantity,
    setCartListQuantity,
    fetchCartListQuantity,
    error,
  } = state;
  return {
    cartList,
    updateCartListContext,
    cartListQuantity,
    setCartListQuantity,
    fetchCartListQuantity,
    error,
  };
};

export default useCartListContext;
