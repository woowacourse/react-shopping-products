import { useState, useEffect } from 'react';
import { addCartItem, deleteCartItem, fetchCartItem } from '../api';
import { CartItemType, ProductType } from '../types';
import { useToast } from './useToast';
import { ERROR } from '../constant/message';

export function useCartItems() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [productToCartIdMap, setProductToCartIdMap] = useState<
    Record<ProductType['id'], CartItemType['id']>
  >({});
  const { showToast } = useToast();

  const getCartItems = async () => {
    const cartItems = await fetchCartItem();
    setCartItems(cartItems);
  };

  useEffect(() => {
    const newProductToCartIdMap: Record<number, number> = {};
    cartItems.forEach((cartItem) => {
      newProductToCartIdMap[cartItem.product.id] = cartItem.id;
    });
    setProductToCartIdMap(newProductToCartIdMap);
  }, [cartItems]);

  const pushCartItem = async (itemId: number) => {
    try {
      await addCartItem(itemId);
      getCartItems();
      return true;
    } catch (error) {
      showToast({ message: ERROR.addProduct, duration: 3000 });
      return false;
    }
  };

  const popCartItem = async (itemId: number) => {
    try {
      await deleteCartItem(itemId);
      getCartItems();
      return true;
    } catch (error) {
      showToast({ message: ERROR.deleteProduct, duration: 3000 });
      return false;
    }
  };

  return { cartItems, productToCartIdMap, pushCartItem, popCartItem, getCartItems };
}
