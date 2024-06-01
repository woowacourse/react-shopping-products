import { CartContext } from '@/contexts/CartContext';
import { useContext } from 'react';

const useCartListContext = () => {
  const state = useContext(CartContext);
  if (!state) throw new Error('CartProvider not found');

  const { cartList, fetchCartList } = state;
  return { cartList, fetchCartList };
};

export default useCartListContext;
