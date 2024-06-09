import { useState } from 'react';
import { CartItemType, ProductType } from '../types';
import useCartItemQuery from './useCartItemQuery';

export function useCartItems() {
  const { cartItems } = useCartItemQuery();
  const [productToCartIdMap, setProductToCartIdMap] = useState<
    Record<ProductType['id'], CartItemType['id']>
  >({});

  const getProductToCartIdMap = async () => {
    if (!cartItems) return;

    setProductToCartIdMap((prev) => {
      const newProductToCartIdMap: Record<number, number> = { ...prev };
      cartItems?.forEach((cartItem) => {
        newProductToCartIdMap[cartItem.product.id] = cartItem.id;
      });
      return newProductToCartIdMap;
    });
  };

  return {
    cartItems,
    productToCartIdMap,
    getCartItems: getProductToCartIdMap,
  };
}
