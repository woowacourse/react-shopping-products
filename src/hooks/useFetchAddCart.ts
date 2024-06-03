import { useEffect, useState } from 'react';

import { deleteItem, postAddItems } from '../api/products';
import { fetchCartItems } from '../api/cartItems';

const useFetchAddCart = () => {
  const [cartIdSet, setCartIdSet] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchInitialCartId = async () => {
      const cartItems = await fetchCart();
      const newCartIdSet = new Set(cartItems.map((item) => item.product.id));
      setCartIdSet(newCartIdSet);
    };
    fetchInitialCartId();
  }, []);

  const postToAddCart = async (id: number) => {
    await postAddItems(id);
    const newCartIdSet = new Set(cartIdSet);
    newCartIdSet.add(id);
    setCartIdSet(newCartIdSet);
  };

  const deleteToRemoveCart = async (id: number) => {
    const cartItems = await fetchCart();
    const cartItemToDelete = cartItems.find((item) => item.product.id === id);
    if (!cartItemToDelete) return;

    deleteItem(cartItemToDelete.id);
    const newCartIdSet = new Set(cartIdSet);
    newCartIdSet.delete(id);
    setCartIdSet(newCartIdSet);
  };

  const fetchCart = async () => {
    const data = await fetchCartItems();
    const cartItems = data.content;
    return cartItems;
  };

  return {
    cartIdSet,
    setCartIdSet,
    postToAddCart,
    deleteToRemoveCart,
    fetchCart,
  };
};

export default useFetchAddCart;
