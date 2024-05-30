/**
### props -> product id 

### 기능 

1. 장바구니 담겨있는지 확인하는 메서드 (id)
    1. 장바구니 리스트 get (cartId, quantity, product {id})
    2. 리스트에서 id 찾기 
    3. 존재 유무 리턴 
2. 장바구니 담기 메서드 
    1. post cart-Item 호출 
    2. setSelected(true)
3. 장바구니 삭제 메서드
    1. delete cart-Item 호출 
    2. setSelected(true)

### 리턴 
1. 장바구니 담겨있는지 유무
2. 장바구니 담기 메서드 
3. 장바구니 삭제 메서드 
*/

import { deleteCartItem, postCartItem } from '@/api/cartItem';
import { useEffect, useState } from 'react';

import useCartItemFinder from './useCartItemFinder';
import useCartListContext from './useCartListContext';

const useProductSelector = (productId: number) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const { isInCart } = useCartItemFinder(productId);
  const [isSelected, setIsSelected] = useState(false);

  const { cartList, fetchCartList } = useCartListContext();

  useEffect(() => {
    setIsSelected(isInCart);
  }, [isInCart]);

  const addCartItem = async () => {
    try {
      setLoading(true);
      await postCartItem(productId);
      setIsSelected(true);
      fetchCartList();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const removeCartItem = async () => {
    try {
      setLoading(true);
      const index = cartList.find((item) => item.product.id === productId);
      await deleteCartItem(index?.id as number);
      setIsSelected(false);
      fetchCartList();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    isSelected,
    loading,
    error,
    addCartItem,
    removeCartItem,
  };
};

export default useProductSelector;
