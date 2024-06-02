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

  const postToAddCart = (id: number) => {
    postAddItems(id);
    const newCartIdSet = new Set(cartIdSet);
    newCartIdSet.add(id);
    setCartIdSet(newCartIdSet);
  };

  const deleteToRemoveCart = async (id: number) => {
    const cartItems = await fetchCart();
    const filteredCartItems = cartItems.find((item) => item.product.id === id);
    if (!filteredCartItems) return;

    deleteItem(filteredCartItems.id);
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
