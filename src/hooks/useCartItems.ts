import { useState, useEffect } from 'react';
import { addCartItem, deleteCartItem, fetchCartItem } from '../api';
import { CartItemType } from '../types';
import { useToast } from './useToast';

export function useCartItems() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [idMap, setIdMap] = useState<Record<number, number>>({});
  const { showToast } = useToast();

  const getCartItems = async () => {
    const cartItems = await fetchCartItem(0, 100);
    setCartItems(cartItems);
  };

  useEffect(() => {
    const newIdMap: Record<number, number> = {};
    cartItems.forEach((cartItem) => {
      if (cartItem && cartItem.product) {
        newIdMap[cartItem.product.id] = cartItem.id;
      }
    });
    setIdMap(newIdMap);
  }, [cartItems]);

  const pushCartItem = async (itemId: number) => {
    try {
      await addCartItem(itemId);
      getCartItems();
      return true;
    } catch (error) {
      showToast('상품 담기에 실패했습니다.');
      return false;
    }
  };

  const popCartItem = async (itemId: number) => {
    try {
      await deleteCartItem(itemId);
      getCartItems();
      return true;
    } catch (error) {
      showToast('상품 빼기에 실패했습니다.');
      return false;
    }
  };

  return { cartItems, idMap, pushCartItem, popCartItem, getCartItems };
}
