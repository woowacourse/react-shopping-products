import { createContext } from 'react';
import { useFetchAddCart, useFetchDeleteCart } from '../hooks/index';

interface CartContextType {
  addCartItem: ReturnType<typeof useFetchAddCart>['addCartItem'];
  deleteCartItem: ReturnType<typeof useFetchDeleteCart>['deleteCartItem'];
  // isAddSuccess: ReturnType<typeof useFetchAddCart>['isSuccess'];
  // isDeletePending: ReturnType<typeof useFetchDeleteCart>['isPending'];
  // isDeleteError: ReturnType<typeof useFetchDeleteCart>['isError'];
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);
