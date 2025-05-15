import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { DEV_ERROR_MESSAGE } from '../constants/errorMessages';

const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(DEV_ERROR_MESSAGE.INVALID_PROVIDER('CartContext'));
  }

  return context;
};

export default useCartContext;
