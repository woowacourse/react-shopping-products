import { useContext } from 'react';

import { CartItemsContext } from '@/context/cartItems';

const useCartItems = () => {
  const cartItems = useContext(CartItemsContext);

  if (!cartItems) {
    throw new Error('CartItemsContext를 찾을 수 없습니다.');
  }

  return cartItems;
};

export default useCartItems;
