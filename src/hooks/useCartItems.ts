import { useState, useEffect } from 'react';
import { fetchCartItems, deleteCartItem, addCartItem } from '../api/cart';
import { CartItem } from '../types/CartItem.type';
import useFetcher from './useFetcher';

interface UseCartItemsResult {
  cartItems: CartItem[];
  loading: boolean;
  error: unknown;
  handleAddCartItem: (productId: number) => void;
  handleDeleteCartItem: (productId: number) => void;
}

const useCartItems = (): UseCartItemsResult => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { loading, error, fetcher } = useFetcher();

  useEffect(() => {
    fetcher(getCartItems);
  }, []);

  const getCartItems = async () => {
    const data = await fetchCartItems();
    setCartItems(data);
  };

  const handleAddCartItem = (productId: number) => {
    fetcher(async () => {
      await addCartItem(productId);
      await getCartItems();
    });
  };

  const handleDeleteCartItem = (productId: number) => {
    const cartItem = cartItems.find((item) => item.product.id === productId);

    if (cartItem) {
      fetcher(async () => {
        await deleteCartItem(cartItem.id);
        await getCartItems();
      });
    }
  };

  return {
    cartItems,
    loading,
    error,
    handleAddCartItem,
    handleDeleteCartItem,
  };
};

export default useCartItems;
