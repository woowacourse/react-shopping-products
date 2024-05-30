import { useState, useEffect } from 'react';
import { CartItem } from '@appTypes/product';
import ShoppingCartFetcher from '@apis/ShoppingCartFetcher';
import { useToastContext } from '@components/common/Toast/provider/ToastProvider';
import HTTPError from '@errors/HTTPError';

const useCheckedIds = () => {
  const [checkedItemIds, setCheckedItemIds] = useState<number[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const { showToast } = useToastContext();

  useEffect(() => {
    const fetchCartItem = async () => {
      try {
        const cartItems = await ShoppingCartFetcher.getCartItems();

        setCartItems(cartItems);
        setCheckedItemIds(cartItems.map((item) => item.product.id));
      } catch (error) {
        if (error instanceof HTTPError) {
          showToast(error.message);
        }
      }
    };

    fetchCartItem();
  }, [showToast]);

  const addCheckId = async (id: number) => {
    try {
      setCheckedItemIds((prevCheckedItemIds) => [...prevCheckedItemIds, id]);
      await ShoppingCartFetcher.addProduct(id);

      const fetchedCartItems = await ShoppingCartFetcher.getCartItems();
      setCartItems(fetchedCartItems);
    } catch (error) {
      if (error instanceof HTTPError) {
        setCheckedItemIds((prevCheckedItemIds) =>
          prevCheckedItemIds.filter((itemId) => itemId !== id)
        );
        showToast(error.message);
      }
    }
  };

  const removeCheckId = async (id: number) => {
    try {
      const cartItem = cartItems.find((item) => item.product.id === id);

      if (!cartItem) return;

      setCheckedItemIds((prevCheckedItemIds) =>
        prevCheckedItemIds.filter((checkedId) => checkedId !== id)
      );

      await ShoppingCartFetcher.deleteCartItem(cartItem.id);

      const fetchedCartItems = await ShoppingCartFetcher.getCartItems();

      setCartItems(fetchedCartItems);
    } catch (error) {
      if (error instanceof HTTPError) {
        setCheckedItemIds((prevCheckedItemIds) =>
          prevCheckedItemIds.includes(id) ? [...prevCheckedItemIds, id] : [...prevCheckedItemIds]
        );
        showToast(error.message);
      }
    }
  };

  const toggleId = (id: number) => {
    const isCheckedId = getIsCheckedId(id);

    if (isCheckedId) {
      removeCheckId(id);
      return;
    }

    addCheckId(id);
  };

  const getIsCheckedId = (id: number) => checkedItemIds.includes(id);

  return { toggleId, getIsCheckedId, length: checkedItemIds.length };
};

export default useCheckedIds;
