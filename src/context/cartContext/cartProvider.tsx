import { useMemo } from 'react';
import useCart from '../../hook/useCart';
import CartContext from './cartContext';

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { cartData, addCart, removeCart } = useCart();

  const value = useMemo(
    () => ({ cartData, addCart, removeCart }),
    [cartData, addCart, removeCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
