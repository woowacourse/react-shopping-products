import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('CartProvider 안에서 사용해야 합니다.');
  }

  return context;
};

export default useCartContext;
