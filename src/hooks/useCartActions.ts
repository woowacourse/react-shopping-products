import { useCallback } from 'react';
import { ProductElement } from '../types/product';
import { addCart, removeCart, updateCartQuantity } from '../api/cart';
import { MAX_CART_ITEM_TYPE } from '../constants/productConfig';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import { useProductsWithCart } from './useProductsWithCart';
import { useToast } from '../context/ToastContext';

export function useCartActions(sortType: string, category: string = '전체') {
  const { transformedProducts, cart, isLoading, isError, fetchCart, resetErrors, fetchProduct } =
    useProductsWithCart(sortType, category);

  const { showToast } = useToast();

  const handleAddCart = useCallback(
    async (product: ProductElement) => {
      if (cart?.totalElements === MAX_CART_ITEM_TYPE) {
        showToast(ERROR_MESSAGES.maxCartItemType);
        console.error(ERROR_MESSAGES.maxCartItemType);
        resetErrors();
        return;
      }

      try {
        await addCart(product.product.id);
        await fetchCart();
      } catch (error) {
        if (error instanceof Error && error.message?.includes('재고')) {
          showToast(error.message);
        } else {
          showToast(ERROR_MESSAGES.failedAddCart);
        }
        console.error('카트 추가 실패:', error);
        resetErrors();
      }
    },
    [cart, fetchCart, resetErrors, showToast],
  );

  const handleRemoveCart = useCallback(
    async (product: ProductElement) => {
      if (!product.cartId) {
        showToast(ERROR_MESSAGES.invalidCartID);
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
    },
    [fetchCart, resetErrors, showToast],
  );

  const handleUpdateQuantity = useCallback(
    async (cartItemId: number, quantity: number) => {
      try {
        await updateCartQuantity(cartItemId, quantity);
        await fetchCart();
      } catch (error) {
        if (error instanceof Error && error.message?.includes('재고')) {
          showToast(error.message);
        } else {
          showToast('수량 변경에 실패했습니다.');
        }
        console.error('수량 변경 실패:', error);
        resetErrors();
      }
    },
    [fetchCart, resetErrors, showToast],
  );

  return {
    transformedProducts,
    cart,
    isLoading,
    isError,
    handleAddCart,
    handleRemoveCart,
    handleUpdateQuantity,
    resetErrors,
    fetchProduct,
  };
}
