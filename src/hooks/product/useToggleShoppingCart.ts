import { useEffect, useState } from 'react';

import HTTPError from '@errors/HTTPError';

import { useToastContext } from '@components/common/Toast/provider/ToastProvider';
import { addProduct, deleteCartItem, getCartItems } from '@apis/shoppingCart';

const useToggleShoppingCart = () => {
  const [checkedItemIds, setCheckedItemIds] = useState<Set<number>>(new Set());

  const showToast = useToastContext();

  useEffect(() => {
    const fetchCartItem = async () => {
      try {
        const cartItems = await getCartItems();

        setCheckedItemIds(new Set(cartItems.map((item) => item.product.id)));
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
      await addProduct(id);

      setCheckedItemIds((prev) => {
        const newSet = new Set(prev);
        newSet.add(id);
        return newSet;
      });
    } catch (error) {
      if (error instanceof HTTPError) {
        showToast(error.message);
      }
    }
  };

  const removeCheckId = async (id: number) => {
    try {
      const cartItems = await getCartItems();

      const targetCartItem = cartItems.find((item) => item.product.id === id);

      if (!targetCartItem) return;

      await deleteCartItem(targetCartItem.id);

      setCheckedItemIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    } catch (error) {
      if (error instanceof HTTPError) {
        showToast(error.message);
      }
    }
  };

  const onToggleCart = (id: number) => {
    const isCheckedId = isAddedCart(id);

    if (isCheckedId) {
      removeCheckId(id);
      return;
    }

    addCheckId(id);
  };

  const isAddedCart = (id: number) => checkedItemIds.has(id);

  return { onToggleCart, isAddedCart, addedShoppingCartLength: checkedItemIds.size };
};

export default useToggleShoppingCart;
