import { createContext } from 'react';
import {
  useFetchAddCart,
  useFetchUpdateQuantity,
  useFetchDeleteCart,
  useFetchProductQuantity,
} from '../hooks/index';

interface CartContextType {
  addCartItem: ReturnType<typeof useFetchAddCart>['addCartItem'];
  deleteCartItem: ReturnType<typeof useFetchDeleteCart>['deleteCartItem'];
  updateCartItemQuantity: ReturnType<
    typeof useFetchUpdateQuantity
  >['updateCartItemQuantity'];
  getCartItemByProduct: ReturnType<
    typeof useFetchProductQuantity
  >['getCartItemByProduct'];
  // isAddSuccess: ReturnType<typeof useFetchAddCart>['isSuccess'];
  // isDeletePending: ReturnType<typeof useFetchDeleteCart>['isPending'];
  // isDeleteError: ReturnType<typeof useFetchDeleteCart>['isError'];
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);
