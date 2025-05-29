import { useCallback, useContext, useMemo } from 'react';

import { useCart } from './useCart';
import { useProductList } from './useProductList';
import { APIContext } from '@/shared/context/APIContext';
import { Product } from '../types/Product';
import { CartItem } from '../types/Cart';

export const useShopping = () => {
  const { data } = useContext(APIContext);
  const product = Object.values(data['product'] ?? {}) as Product[];
  const cartData = Object.values(data['cartItem'] ?? {}) as CartItem[];
  const { addToCart, increaseQuantity, decreaseQuantity, deleteFromCart } = useCart();
  const { isLoading, categorySelect, priceSelect, handleCategorySelect, handlePriceSelect } =
    useProductList();

  const filteredData = useMemo(() => {
    return product.map((item) => {
      const isInCart = cartData
        .map((item) => item.product)
        .some((cartItem) => cartItem.id === item.id);
      return {
        ...item,
        isChecked: isInCart,
      };
    });
  }, [product, cartData]);

  const addCartItem = useCallback(
    async (id: number) => {
      await addToCart(id, 1);
    },
    [addToCart]
  );

  const updateCartQuantity = useCallback(
    async (cartItemId: number, delta: number, currentQuantity: number) => {
      const latestCartItem = cartData.find((item) => item.id === cartItemId);
      if (!latestCartItem) return;

      const newQuantity = currentQuantity + delta;

      if (newQuantity < 1) {
        await deleteFromCart(cartItemId);
      } else {
        if (delta > 0) {
          await increaseQuantity(cartItemId, latestCartItem.quantity);
        } else {
          await decreaseQuantity(cartItemId, latestCartItem.quantity);
        }
      }
    },
    [cartData, deleteFromCart, increaseQuantity, decreaseQuantity]
  );

  return {
    cartData,
    filteredData,
    isLoading,
    addCartItem,
    updateCartQuantity,
    deleteFromCart,
    categorySelect,
    priceSelect,
    handleCategorySelect,
    handlePriceSelect,
  };
};
