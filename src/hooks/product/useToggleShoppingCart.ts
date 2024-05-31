import { useEffect, useState } from 'react';

import { CartItem } from '@appTypes/product';
import HTTPError from '@errors/HTTPError';

import { useToastContext } from '@components/common/Toast/provider/ToastProvider';
import { addProduct, deleteCartItem, getCartItems } from '@apis/shoppingCart';

const useToggleShoppingCart = () => {
  const [checkedItemIds, setCheckedItemIds] = useState<number[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const { showToast } = useToastContext();

  useEffect(() => {
    const fetchCartItem = async () => {
      try {
        const cartItems = await getCartItems();

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
      await addProduct(id);

      const fetchedCartItems = await getCartItems();

      setCheckedItemIds((prevCheckedItemIds) => [...prevCheckedItemIds, id]);

      setCartItems(fetchedCartItems);
    } catch (error) {
      if (error instanceof HTTPError) {
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

      await deleteCartItem(cartItem.id);

      const fetchedCartItems = await getCartItems();

      setCartItems(fetchedCartItems);
    } catch (error) {
      if (error instanceof HTTPError) {
        setCheckedItemIds((prevCheckedItemIds) => [...prevCheckedItemIds, id]);

        showToast(error.message);
      }
    }
  };

  const onToggleCart = async (id: number) => {
    const isCheckedId = isAddedCart(id);

    if (isCheckedId) {
      await removeCheckId(id);
      return;
    }

    await addCheckId(id);
  };

  const isAddedCart = (id: number) => checkedItemIds.includes(id);

  return { onToggleCart, isAddedCart, addedShoppingCartLength: checkedItemIds.length };
};

export default useToggleShoppingCart;
