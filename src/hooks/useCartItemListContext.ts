import { CartItemContext } from '@/context/CartItemContext';
import { useContext } from 'react';
import ERROR_MESSAGE from '@/constants/errorMessage';

const useCartItemListContext = () => {
  const context = useContext(CartItemContext);

  if (!context) {
    throw new Error(ERROR_MESSAGE.NOT_DEFINED_CONTEXT);
  }

  return context;
};

export default useCartItemListContext;
