import { useCallback } from 'react';
import { ProductElement } from '../types/product';
import { addCart, removeCart } from '../api/cart';
import { MAX_CART_ITEM_TYPE } from '../constants/productConfig';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import { useProductsWithCart } from './useProductsWithCart';
import { useToast } from "../context/ToastContext";

export function useCartActions(sortType: string, category: string = '전체') {
  const {
    transformedProducts,
    cart,
    isLoading,
    isError,
    fetchCart,
    resetErrors,
    fetchProduct
  } = useProductsWithCart(sortType, category);

  const { showToast } = useToast();

  const handleAddCart = useCallback(async (product: ProductElement) => {
    if (cart?.totalElements === MAX_CART_ITEM_TYPE) {
      showToast(ERROR_MESSAGES.maxCartItemType);
      console.error(ERROR_MESSAGES.maxCartItemType);
      resetErrors();
      return;
    }

    try {
      await addCart(product.product.id);
      await fetchCart();
    } catch {
      showToast(ERROR_MESSAGES.failedAddCart);
      console.error(ERROR_MESSAGES.failedAddCart);
      resetErrors();
    }
  }, [cart, fetchCart, resetErrors, showToast]);

  const handleRemoveCart = useCallback(async (product: ProductElement) => {
    if (!product.cartId) {
      showToast('error', ERROR_MESSAGES.invalidCartID);
      console.error(ERROR_MESSAGES.invalidCartID);
      resetErrors();
      return;
    }

    try {
      await removeCart(product.cartId);
      await fetchCart();
    } catch (error) {
      showToast(ERROR_MESSAGES.failedRemoveCart);
      console.error(ERROR_MESSAGES.failedRemoveCart, error);
      resetErrors();
    }
  }, [fetchCart, resetErrors, showToast]);

  return {
    transformedProducts,
    cart,
    isLoading,
    isError,
    handleAddCart,
    handleRemoveCart,
    resetErrors,
    fetchProduct
  };
}
