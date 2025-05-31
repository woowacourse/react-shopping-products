import { addCart, patchCart, removeCart } from '../api/fetchCart';
import { useToastContext } from '../context/ToastContext';
import { CartItem, ProductElement } from '../types/type';
import { useAPI } from './useAPI';
import { ERROR_MESSAGE } from '../constants/errorMessage';
import { fetchCartItem } from '../utils/getCartItem';

export const useCartActions = () => {
  const { addToast } = useToastContext();

  const { data: cartList, refetch } = useAPI<CartItem[]>({
    fetcher: fetchCartItem,
    name: 'cartItems',
  });

  const handleAddCart = async (product: ProductElement) => {
    try {
      if (!cartList) return;
      await addCart(product.id);
      refetch();
    } catch (error) {
      addToast((error as Error).message);
    }
  };

  const handleIncreaseQuantity = async (product: ProductElement) => {
    try {
      if (!cartList) return;
      const cartItem = cartList.find((item) => item.product.id === product.id);
      if (!cartItem) return;
      if (cartItem.quantity === cartItem.product.quantity)
        throw new Error(ERROR_MESSAGE.PRODUCT_MAX_QUANTITY);
      await patchCart(cartItem.id, cartItem.quantity + 1);
      await refetch();
    } catch (error) {
      addToast((error as Error).message);
    }
  };

  const handleDecreaseQuantity = async (product: ProductElement) => {
    try {
      if (!cartList) return;
      const cartItem = cartList.find((item) => item.product.id === product.id);
      if (!cartItem) return;
      await patchCart(cartItem.id, cartItem.quantity - 1);
      await refetch();
    } catch (error) {
      addToast((error as Error).message);
    }
  };

  const handleRemoveCart = async (product: ProductElement) => {
    try {
      if (!cartList) return;
      const cartItem = cartList.find((item) => item.product.id === product.id);
      if (!cartItem) return;
      await removeCart(cartItem.id);
      await refetch();
    } catch (error) {
      addToast((error as Error).message);
    }
  };

  return {
    handleAddCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleRemoveCart,
  };
};
