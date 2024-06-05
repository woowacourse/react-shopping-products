import { deleteCartItem, getCartItems, postCartItem } from "@/apis/cartItem";
import { END_POINT } from "@/config/endPoint";
import { ERROR_MESSAGES } from "@/constants/messages";
import useToast from "@/hooks/useToast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useCartItemsQuery = () => {
  const { onAddToast } = useToast();
  const query = useQuery({
    queryKey: [END_POINT.cartItems],
    queryFn: getCartItems,
    staleTime: 10000,
  });

  const { isError } = query;

  useEffect(() => {
    onAddToast(ERROR_MESSAGES.failGetCartItems);
  }, [isError]);

  return query;
};

export const useUpdateCartItemQuantityMutation = ({ productId, quantity }: { productId: number; quantity: number }) => {
  const queryClient = useQueryClient();
  const { onAddToast } = useToast();

  const mutation = useMutation({
    mutationFn: () => postCartItem({ productId, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [END_POINT.cartItems] });
    },
    onError: () => {
      onAddToast(ERROR_MESSAGES.failPostCartItem);
    },
  });

  return mutation;
};

export const useDeleteCartItemMutation = ({ productId }: { productId: number }) => {
  const queryClient = useQueryClient();
  const { onAddToast } = useToast();

  const mutation = useMutation({
    mutationFn: () => deleteCartItem({ productId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [END_POINT.cartItems] });
    },
    onError: () => {
      onAddToast(ERROR_MESSAGES.failDeleteCartItem);
    },
  });

  return mutation;
};
