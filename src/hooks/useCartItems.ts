import { useState, useEffect, useContext } from 'react';
import { fetchCartItems, deleteCartItem, addCartItem } from '../api/cart';
import { CartItem } from '../types/CartItem.type';
import { ToastContext } from '../context/ToastProvider';

interface UseCartItemsResult {
  cartItems: CartItem[];
  counts: number;
  loading: boolean;
  error: unknown;
  handleAddCartItem: (productId: number) => Promise<void>;
  handleDeleteCartItem: (productId: number) => Promise<void>;
}

export default function useCartItems(): UseCartItemsResult {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const { showToast } = useContext(ToastContext);

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    try {
      const data = await fetchCartItems();
      setCartItems(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(true);
        showToast('장바구니 목록을 불러오는 과정에서 에러가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddCartItem = async (productId: number) => {
    try {
      await addCartItem(productId);
      getCartItems();
    } catch {
      setError(true);
      showToast('장바구니에 상품을 추가하는 과정에서 에러가 발생했습니다.');
    }
  };

  const handleDeleteCartItem = async (productId: number) => {
    const cartItem = cartItems.find((item) => item.product.id === productId);

    if (cartItem) {
      try {
        await deleteCartItem(cartItem.id);
        getCartItems();
      } catch (error) {
        setError(true);
        showToast('장바구니에 상품을 제거하는 과정에서 에러가 발생했습니다.');
      }
    }
  };

  return {
    cartItems,
    counts: cartItems.length,
    loading,
    error,
    handleAddCartItem,
    handleDeleteCartItem,
  };
}
