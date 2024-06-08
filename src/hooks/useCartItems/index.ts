import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchAddCartItem, fetchDeleteCartItem, fetchCartItems } from '../../api/cartItems';

import { MAX_CART_ITEMS_SIZE } from '../../constants/pagination';

const useCartItems = () => {
  const queryClient = useQueryClient();

  const getCartItems = useQuery({
    networkMode: 'always',
    queryKey: ['cartItems'],
    queryFn: fetchCartItems,
  });

  const addCartItem = useMutation({
    mutationFn: (productId: number) => fetchAddCartItem(productId),
    networkMode: 'always',
    onMutate: () => {
      if (getCartItems.data && getCartItems.data.length >= MAX_CART_ITEMS_SIZE)
        throw new Error('Cart items cannot exceed 99');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems'] });
    },
    onError: () => {
      setTimeout(() => {
        addCartItem.reset();
      }, 2000);
    },
  });

  const deleteCartItem = useMutation({
    mutationFn: (cartId: number) => fetchDeleteCartItem(cartId),
    networkMode: 'always',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems'] });
    },
    onError: () => {
      setTimeout(() => {
        deleteCartItem.reset();
      }, 2000);
    },
  });

  return {
    getCartItems,
    addCartItem,
    deleteCartItem,
  };
};

export default useCartItems;
