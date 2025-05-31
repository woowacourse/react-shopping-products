import { useMemo } from 'react';
import useCart from '../../hook/cart/useCart';
import CartContext from './cartContext';

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { cartData, addCart, removeCart, increaseCart, decreaseCart } =
    useCart();

  const value = useMemo(
    () => ({ cartData, addCart, removeCart, increaseCart, decreaseCart }),
    [cartData, addCart, removeCart, increaseCart, decreaseCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
