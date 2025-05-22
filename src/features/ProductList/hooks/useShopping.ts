import { useCallback, useMemo } from 'react';

import { useCart } from './useCart';
import { useProductList } from './useProductList';

export const useShopping = () => {
  const { cartData, addToCart, updateToCart, deleteFromCart } = useCart();
  const {
    isLoading: isProductLoading,
    product,
    categorySelect,
    priceSelect,
    handleCategorySelect,
    handlePriceSelect,
  } = useProductList();

  const data = useMemo(() => {
    return product.map((item) => {
      const cartItem = cartData.find((cartItem) => cartItem.product.id === item.id);
      return {
        ...item,
        isChecked: !!cartItem,
        cartQuantity: cartItem?.quantity || 0,
        cartId: cartItem?.id || 0,
      };
    });
  }, [cartData, product]);

  // TODO : cart 변수명 변경
  const updateCartItemQuantity = useCallback(
    async (cartId: number, newQuantity: number) => {
      const cart = cartData.find((item) => item.id === cartId);

      if (cart?.id) {
        await updateToCart(cart.id, newQuantity);
      }
    },
    [cartData, updateToCart]
  );

  const toggleCartItem = useCallback(
    async (id: number) => {
      const currentCheckedStatus = data.find((item) => item.id === id)?.isChecked;
      if (currentCheckedStatus) {
        const cartId = cartData.find((item) => item.product.id === id)?.id;
        return cartId && (await deleteFromCart(cartId));
      }
      await addToCart(id, 1);
    },
    [addToCart, cartData, deleteFromCart, data]
  );

  return {
    cartData,
    filteredData: data,
    isLoading: isProductLoading,
    toggleCartItem,
    categorySelect,
    priceSelect,
    updateCartItemQuantity,
    handleCategorySelect,
    handlePriceSelect,
  };
};
