import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addCartItem,
  deleteCartItem,
  getCartList,
  patchCartItem,
} from '@/api/cartItem';
import { useToast } from './useToast';
import QUERY_KEYS from '@/constants/queryKeys';
import { useState } from 'react';
import useCartListContext from './useCartListContext';

interface CartButtonProps {
  productId: number;
  initIsInCart: boolean;
}

const useCartItemHandler = ({ productId, initIsInCart }: CartButtonProps) => {
  const queryClient = useQueryClient();
  const { createToast } = useToast();
  const { updateCartListContext } = useCartListContext();

  const { data: cartList } = useQuery({
    queryKey: [QUERY_KEYS.CART],
    queryFn: getCartList,
  });

  const [isInCart, setIsInCart] = useState(initIsInCart);

  const addToCartMutation = useMutation({
    mutationFn: (productId: number) => addCartItem(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
      setIsInCart(true);
      updateCartListContext();
    },
    onError: () => {
      createToast('⛔️ 상품을 담는데 실패했습니다. 다시 시도해 주세요.');
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (cartItemId: number) => deleteCartItem(cartItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
      updateCartListContext();
      setIsInCart(false);
    },
    onError: () => {
      createToast('⛔️ 상품을 제거하는데 실패했습니다. 다시 시도해 주세요.');
    },
  });

  const handleAddCartItem = () => {
    addToCartMutation.mutate(productId);
  };

  const handleRemoveCartItem = () => {
    const cartItemId = cartList?.find(
      (cartItem) => cartItem.product.id === productId,
    )?.id;
    if (cartItemId) {
      removeFromCartMutation.mutate(cartItemId);
    }
  };

    }
  };

  return { isInCart, handleAddCartItem, handleRemoveCartItem, loading, error };
};

export default useCartItemHandler;
