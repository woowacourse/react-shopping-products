import { createContext, Dispatch, ReactNode, useReducer } from 'react';

import { CartItemAction, CartItemList } from '../types/type';
import useFetchCartItemList from '../hooks/useCartItemList';

import { cartItemListReducer } from './cartItemListReducer';

export interface CartItemListContextType {
  cartItemList: CartItemList;
  dispatch: Dispatch<CartItemAction>;
}
export const CartItemListContext = createContext<
  CartItemListContextType | undefined
>(undefined);

interface CartItemListProviderProps {
  children: ReactNode;
}

export const CartItemListProvider: React.FC<CartItemListProviderProps> = ({
  children,
}) => {
  const { data: initialCartItemListState } = useFetchCartItemList();
  const [cartItemList, dispatch] = useReducer(
    cartItemListReducer,
    initialCartItemListState,
  );

  return (
    <CartItemListContext.Provider value={{ cartItemList, dispatch }}>
      {children}
    </CartItemListContext.Provider>
  );
};
