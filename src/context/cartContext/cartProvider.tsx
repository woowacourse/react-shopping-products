import { useMemo } from 'react';
import useCart from '../../hook/useCart';
import CartContext from './cartContext';

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { cartData, addCart, removeCart, patchCart } = useCart();

  const value = useMemo(
    () => ({ cartData, addCart, removeCart, patchCart }),
    [cartData, addCart, removeCart, patchCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
