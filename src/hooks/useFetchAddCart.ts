import { useState } from 'react';
import { deleteItem, fetchCartItems, postAddItems } from '../api/products';

const useFetchAddCart = () => {
  const [cartIdSet, setCartIdSet] = useState<Set<number>>(new Set());

  const patchToAddCart = (id: number) => {
    postAddItems(id);
    const newCartIdSet = new Set(cartIdSet);
    newCartIdSet.add(id);
    setCartIdSet(newCartIdSet);
  };

  const patchToRemoveCart = (id: number) => {
    deleteItem(id);
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
    patchToAddCart,
    patchToRemoveCart,
    fetchCart,
  };
};

export default useFetchAddCart;
