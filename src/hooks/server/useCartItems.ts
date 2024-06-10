import { deleteCartItem, getCartItems, patchCartItem, postCartItem } from "@/apis/cartItem";
import { END_POINT } from "@/config/endPoint";
import { ERROR_MESSAGES } from "@/constants/messages";
import useToast from "@/hooks/useToast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useCommonMutationOptions = (errorMessage: string) => {
  const queryClient = useQueryClient();
  const { onAddToast } = useToast();

  return {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [END_POINT.cartItems] });
    },
    onError: () => {
      onAddToast(errorMessage);
    },
  };
};

export const useCartItemsQuery = () => {
  const { onAddToast } = useToast();

  const query = useQuery({
    queryKey: [END_POINT.cartItems],
    queryFn: async () => await getCartItems(),
    staleTime: 10000,
  });

  const { isError } = query;

  useEffect(() => {
    if (isError) {
      onAddToast(ERROR_MESSAGES.failGetCartItems);
    }
  }, [isError]);

  return query;
};

export const usePostAddCartItemMutation = ({ productId, quantity }: { productId: number; quantity: number }) => {
  const mutationOptions = useCommonMutationOptions(ERROR_MESSAGES.failPostCartItem);

  const mutation = useMutation({
    mutationFn: () => postCartItem({ productId, quantity }),
    ...mutationOptions,
  });

  return mutation;
};

export const useUpdateCartItemQuantityMutation = () => {
  const mutationOptions = useCommonMutationOptions(ERROR_MESSAGES.failPostCartItem);

  const mutation = useMutation({
    mutationFn: ({ cartId, quantity }: { cartId: number; quantity: number }) => patchCartItem({ cartId, quantity }),
    ...mutationOptions,
  });

  return mutation;
};

export const useDeleteCartItemMutation = ({ cartId }: { cartId: number }) => {
  const mutationOptions = useCommonMutationOptions(ERROR_MESSAGES.failPostCartItem);

  const mutation = useMutation({
    mutationFn: () => deleteCartItem({ cartId }),
    ...mutationOptions,
  });

  return mutation;
};
