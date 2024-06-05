import { useCallback, useEffect, useState } from 'react';
import { deleteItem, fetchCartItems, postAddItems } from '../api/products';

const useFetchAddCart = () => {
  const [cartIdSet, setCartIdSet] = useState<Set<number>>(new Set());

  const addProductToCart = useCallback(
    async (id: number) => {
      postAddItems(id);
      setCartIdSet(new Set(cartIdSet).add(id));
    },
    [cartIdSet],
  );

  const fetchCart = useCallback(async () => {
    const data = await fetchCartItems();
    const cartItems = data.content;
    return cartItems;
  }, []);

  const patchToRemoveCart = useCallback(
    async (id: number) => {
      const cartItems = await fetchCart();
      const filteredCartItems = cartItems.find(
        (item) => item.product.id === id,
      );
      if (!filteredCartItems) return;

      deleteItem(filteredCartItems.id);
      const newCartIdSet = new Set(cartIdSet);
      newCartIdSet.delete(id);
      setCartIdSet(newCartIdSet);
    },
    [fetchCart, cartIdSet],
  );
  useEffect(() => {
    const fetchInitialCartId = async () => {
      const cartItems = await fetchCart();
      const newCartIdSet = new Set(cartItems.map((item) => item.product.id));
      setCartIdSet(newCartIdSet);
    };
    fetchInitialCartId();
  }, [fetchCart]);

  return {
    cartIdSet,
    setCartIdSet,
    addProductToCart: addProductToCart,
    patchToRemoveCart,
    fetchCart,
  };
};

export default useFetchAddCart;
