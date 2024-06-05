import { useCallback, useEffect, useState } from 'react';
import { deleteItem, fetchCartItems, postAddItems } from '../api/products';

const useFetchAddCart = () => {
  const [productIdSetInCart, setProductIdSetInCart] = useState<Set<number>>(
    new Set(),
  );

  const addProductToCart = useCallback(
    async (productId: number) => {
      postAddItems(productId);
      setProductIdSetInCart(new Set(productIdSetInCart).add(productId));
    },
    [productIdSetInCart],
  );

  const fetchCart = useCallback(async () => {
    const data = await fetchCartItems();
    const cartItems = data.content;
    return cartItems;
  }, []);

  const patchToRemoveCart = useCallback(
    async (productId: number) => {
      const cartItems = await fetchCart();
      const filteredCartItems = cartItems.find(
        (item) => item.product.id === productId,
      );
      if (!filteredCartItems) return;

      deleteItem(filteredCartItems.id);
      const newProductIdSetInCart = new Set(productIdSetInCart);
      newProductIdSetInCart.delete(productId);
      setProductIdSetInCart(newProductIdSetInCart);
    },
    [fetchCart, productIdSetInCart],
  );
  const updateCartIdFromServer = useCallback(async () => {
    const cartItems = await fetchCart();
    const newProductIdSetInCart = new Set(
      cartItems.map((item) => item.product.id),
    );
    setProductIdSetInCart(newProductIdSetInCart);
  }, [fetchCart]);

  useEffect(() => {
    updateCartIdFromServer();
  }, [updateCartIdFromServer]);

  return {
    productIdSetInCart,
    setProductIdSetInCart,
    addProductToCart,
    patchToRemoveCart,
    fetchCart,
  };
};

export default useFetchAddCart;
