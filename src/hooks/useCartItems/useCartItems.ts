import { useState, useEffect } from 'react';
import useFetcher from '../useFetcher';
import { fetchCartItems, deleteCartItem, addCartItem } from '../../api/cart';
import { Cart } from '../../types/Cart.type';
import { SIZE } from '../../constants/api';

interface UseCartItemsResult {
  cartItems: Cart[];
  loading: boolean;
  error: unknown;
  handleAddCartItem: (productId: number) => void;
  handleDeleteCartItem: (productId: number) => void;
}

const useCartItems = (): UseCartItemsResult => {
  const [cartItems, setCartItems] = useState<Cart[]>([]);
  const { loading, error, fetcher } = useFetcher();

  useEffect(() => {
    fetcher(getCartItems);
  }, []);

  const getCartItems = async () => {
    const { data: initialData, totalElements } = await fetchCartItems(20);

    if (totalElements <= SIZE.DEFAULT) {
      setCartItems(initialData);
      return;
    }

    const { data: totalData } = await fetchCartItems(totalElements);
    setCartItems(totalData);
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
