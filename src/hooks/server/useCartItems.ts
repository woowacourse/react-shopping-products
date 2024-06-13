import { deleteCartItem, getCartItems, getCartItemQuantity, patchCartItem, postCartItem } from "@/apis/cartItem";
import { END_POINT } from "@/config/endPoint";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useCommonMutationOptions = () => {
  const queryClient = useQueryClient();

  return {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [END_POINT.cartItems] });
      queryClient.invalidateQueries({ queryKey: [END_POINT.cartItemsCount] });
    },
  };
};

export const useCartItemsQuery = () => {
  const query = useQuery({
    queryKey: [END_POINT.cartItems],
    queryFn: async () => await getCartItems(),
  });

  return query;
};

export const useCartItemQuantityQuery = () => {
  const query = useQuery({
    queryKey: [END_POINT.cartItemsCount],
    queryFn: async () => await getCartItemQuantity(),
  });

  return query;
};

export const usePostAddCartItemMutation = ({ productId, quantity }: { productId: number; quantity: number }) => {
  const mutationOptions = useCommonMutationOptions();

  const mutation = useMutation({
    mutationFn: () => postCartItem({ productId, quantity }),
    ...mutationOptions,
  });

  return mutation;
};

export const useUpdateCartItemQuantityMutation = () => {
  const mutationOptions = useCommonMutationOptions();

  const mutation = useMutation({
    mutationFn: ({ cartId, quantity }: { cartId: number; quantity: number }) => patchCartItem({ cartId, quantity }),
    ...mutationOptions,
  });

  return mutation;
};

export const useDeleteCartItemMutation = ({ cartId }: { cartId: number }) => {
  const mutationOptions = useCommonMutationOptions();

  const mutation = useMutation({
    mutationFn: () => deleteCartItem({ cartId }),
    ...mutationOptions,
  });

  return mutation;
};
