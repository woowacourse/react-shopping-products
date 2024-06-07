import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { deleteItem, fetchCartItems, postAddItems } from '../api/products';
import { CartItem } from '../types/fetch';
const useFetchCart = () => {
  const { productIdSetInCart, setProductIdSetInCart } = useState<Set<number>>(
    new Set(),
  );

  const [cartItems, setCartItems] = useState<CartItem[]>();

  const { data } = useQuery({
    queryKey: ['cart'],
    queryFn: fetchCartItems,
  });

  const addIdSet = useCallback(
    (productId: number) => {
      setProductIdSetInCart(new Set(productIdSetInCart).add(productId));
    },
    [productIdSetInCart, setProductIdSetInCart],
  );

  const deleteIdSet = useCallback(
    (productId: number) => {
      deleteItem(productId);
      const set = new Set(productIdSetInCart);
      set.delete(productId);
      setProductIdSetInCart(set);
    },
    [productIdSetInCart, setProductIdSetInCart],
  );

  const {
    data: cartItems,
    isError,
    isPending,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: fetchCartItems,
  });

  const { mutate: addProductToCart } = useMutation({
    mutationFn: postAddItems,
    onSuccess: (data, productId) => {
      addIdSet(productId);
    },
  });

  const { mutate: patchToRemoveCart } = useMutation({
    mutationFn: deleteItem,

    onSuccess: (data, productId) => {
      deleteIdSet(productId);
    },
  });

  return {
    productIdSetInCart,
    setProductIdSetInCart,
    addProductToCart,
    patchToRemoveCart,
  };
};

export default useFetchCart;
