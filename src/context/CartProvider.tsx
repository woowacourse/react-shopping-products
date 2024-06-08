import { ReactNode } from 'react';
import {
  useFetchAddCart,
  useFetchUpdateQuantity,
  useFetchDeleteCart,
  useFetchProductQuantity,
} from '../hooks/index';
import { CartContext } from './CartContext';

interface CartProviderProps {
  children: ReactNode;
}

const CartProvider = ({ children }: CartProviderProps) => {
  const fetchAddCart = useFetchAddCart();
  const fetchDeleteCart = useFetchDeleteCart();
  const fetchUpdateCartItemQuantity = useFetchUpdateQuantity();
  const fetchProductQuantity = useFetchProductQuantity();

  return (
    <CartContext.Provider
      value={{
        addCartItem: fetchAddCart.addCartItem,
        deleteCartItem: fetchDeleteCart.deleteCartItem,
        updateCartItemQuantity:
          fetchUpdateCartItemQuantity.updateCartItemQuantity,
        getCartItemByProduct: fetchProductQuantity.getCartItemByProduct,
        // isAddSuccess: fetchAddCart.isSuccess,
        // isDeletePending: fetchDeleteCart.isPending,
        // isDeleteError: fetchDeleteCart.isError,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
