import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import { CartItemAction, CartItemList } from '../types/type';
import { cartItemListReducer } from './CartItemListReducer';
import useFetchCartItemList from '../hooks/useFetchCartItemList';

interface CartItemListContextType {
  cartItemList: CartItemList;
  dispatch: Dispatch<CartItemAction>;
}
const CartItemListContext = createContext<CartItemListContextType | undefined>(
  undefined,
);

interface CartItemListProviderProps {
  children: ReactNode;
}

const { data: initialCartItemListState } = useFetchCartItemList();

export const CartItemListProvider: React.FC<CartItemListProviderProps> = ({
  children,
}) => {
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
