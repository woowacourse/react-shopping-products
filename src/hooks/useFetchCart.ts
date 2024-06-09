import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import {
  deleteCartItem as fetchToDeleteCartItem,
  fetchCartItems,
  postAddItems,
} from '../api/products';
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
      console.log('invaldate됨');
    },
    throwOnError(error) {
      console.log('에러발생', error.message, error.name, error.stack);
      return false;
    },
  });

  const { mutate: patchToRemoveCart } = useMutation({
    mutationFn: fetchToDeleteCartItem,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  return {
    cartItems: cartData?.content,
    isError,
    isPending,
    addProductToCart,
    patchToRemoveCart,
  };
};

export default useFetchCart;
