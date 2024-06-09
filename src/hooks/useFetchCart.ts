import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import {
  fetchToDeleteCartItem,
  fetchCartItems,
  postAddItems,
  patchCartQuantity,
} from '../api/carts';
import { CartItem } from '../types/fetch';

const useFetchCart = () => {
  const queryClient = useQueryClient();

  const {
    data: cartData,
    isError,
    isPending,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: fetchCartItems,
  });
  const { mutate: addProductToCart } = useMutation({
    mutationFn: postAddItems,
    onSettled: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const { mutate: deleteToRemoveCart } = useMutation({
    mutationFn: fetchToDeleteCartItem,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
  const { mutate: patchCartItemQuantity } = useMutation({
    mutationFn: patchCartQuantity,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  return {
    cartItems: cartData?.content,
    isError,
    isPending,
    addProductToCart,
    deleteToRemoveCart,
    patchCartItemQuantity,
  };
};

export default useFetchCart;
