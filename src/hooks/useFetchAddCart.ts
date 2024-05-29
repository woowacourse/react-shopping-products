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

  const patchToRemoveCart = async (id: number) => {
    const cartItems = await fetchCart();
    // 상품을 받고 -> cartItems.product.id를 필터링
    // 필터링한 값의 바깥 id를 가져옴
    const filteredCartItems = cartItems.find((item) => item.id === id);
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
    patchToAddCart,
    patchToRemoveCart,
    fetchCart,
  };
};

export default useFetchAddCart;
