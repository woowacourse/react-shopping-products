import { createContext, useContext } from 'react';
import { useCartList } from '../hooks/useCartList.ts';
import { CartItem, ErrorType, ProductElement } from '../types/type.ts';

interface CartListContextProps {
  children: React.ReactNode;
}

interface CartListContextType {
  cartList: CartItem[];
  isLoading: boolean;
  error: ErrorType;
  fetchData: () => Promise<void>;
  handleAddCart: (product: ProductElement) => Promise<void>;
  handleIncreaseQuantity: (product: ProductElement) => Promise<void>;
  handleDecreaseQuantity: (product: ProductElement) => Promise<void>;
  handleRemoveCart: (product: ProductElement) => Promise<void>;
}

export const CartListContext = createContext<CartListContextType | null>(null);

export const CartListProvider = ({ children }: CartListContextProps) => {
  const values = useCartList();

  return (
    <CartListContext.Provider value={values}>
      {children}
    </CartListContext.Provider>
  );
};

export const useCartListContext = () => {
  const context = useContext(CartListContext);
  if (context === null) {
    throw new Error('useCartList는 CartListProvider와 함께 사용되어야 합니다.');
  }
  return context;
};
