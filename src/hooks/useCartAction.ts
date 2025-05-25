import { addCart, patchCart, removeCart, getCartItem } from '../api/fetchCart';
import { MAX_CART_ITEM_COUNT } from '../constants/cartConfig';
import { ERROR_MESSAGE } from '../constants/errorMessage';
import { useToastContext } from '../context/ToastContext';
import { CartItem, ProductElement } from '../types/type';
import { useCallback } from 'react';
import { useAPI } from './useAPI';

export const useCartActions = () => {
  const { showToast } = useToastContext();

  const fetchCartItems = useCallback(async () => {
    return await getCartItem({ page: 0, size: 50, sortBy: 'desc' }).then(
      (res) => res.content
    );
  }, []);

  const { data: cartList, refetch } = useAPI<CartItem[]>({
    fetcher: fetchCartItems,
    name: 'cartItems',
  });

  const handleAddCart = async (product: ProductElement) => {
    if (!cartList) return;
    if (cartList.length >= MAX_CART_ITEM_COUNT) {
      showToast(ERROR_MESSAGE.MAX_CART_ITEM);
    }
    await addCart(product.id);
    refetch();
  };

  const handleIncreaseQuantity = async (product: ProductElement) => {
    if (!cartList) return;
    const cartItem = cartList.find((item) => item.product.id === product.id);
    if (!cartItem) return;
    if (cartItem.quantity >= cartItem.product.quantity) {
      return showToast(ERROR_MESSAGE.PRODUCT_MAX_QUANTITY);
    }
    await patchCart(cartItem.id, cartItem.quantity + 1);
    await refetch();
  };

  const handleDecreaseQuantity = async (product: ProductElement) => {
    if (!cartList) return;
    const cartItem = cartList.find((item) => item.product.id === product.id);
    if (!cartItem) return;
    await patchCart(cartItem.id, cartItem.quantity - 1);
    await refetch();
  };

  const handleRemoveCart = async (product: ProductElement) => {
    if (!cartList) return;
    const cartItem = cartList.find((item) => item.product.id === product.id);
    if (!cartItem) return;
    await removeCart(cartItem.id);
    await refetch();
  };

  return {
    handleAddCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleRemoveCart,
  };
};
