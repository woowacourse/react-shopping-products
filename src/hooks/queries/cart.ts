import { addCartItem, adjustCartItemQuantity, deleteCartItem, fetchCartItems } from '@/api/cart';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useInvalidateQueries from '../useInvalidateQueries';
import { useToast } from '../useToast';
import { CartItemInfo } from '@/types/cartItem';

const CART_ITEM_QUERY_KEY = ['fetchCartItems'];

export const cartQuery = {
  useGetCartItemList() {
    return useQuery<CartItemInfo[]>({
      initialData: [],
      queryKey: CART_ITEM_QUERY_KEY,
      queryFn: fetchCartItems,
    });
  },
};

export const cartMutations = {
  useAddCartItem() {
    const { invalidateQueries } = useInvalidateQueries(CART_ITEM_QUERY_KEY);
    return useMutation({
      mutationFn: (productId: number) => addCartItem({ productId, quantity: 1 }),
      onSuccess: () => {
        invalidateQueries();
      },
    });
  },

  useDeleteCartItem() {
    const { invalidateQueries } = useInvalidateQueries(CART_ITEM_QUERY_KEY);
    return useMutation({
      mutationFn: (cartId: number) => deleteCartItem(cartId),
      onSuccess: () => {
        invalidateQueries();
      },
    });
  },

  useAdjustCartItemQuantity() {
    const queryClient = useQueryClient();

    const { toastError } = useToast();

    const { invalidateQueries } = useInvalidateQueries(CART_ITEM_QUERY_KEY);

    return useMutation({
      mutationFn: ({ cartItemId, quantity }: { cartItemId: number; quantity: number }) =>
        adjustCartItemQuantity(cartItemId, quantity),
      onMutate: async ({ cartItemId, quantity }: { cartItemId: number; quantity: number }) => {
        await queryClient.cancelQueries({ queryKey: CART_ITEM_QUERY_KEY });
        const prevOption = queryClient.getQueryData(CART_ITEM_QUERY_KEY);
        queryClient.setQueryData(CART_ITEM_QUERY_KEY, (oldCartItems: CartItemInfo[]) => {
          return oldCartItems.map((item) =>
            item.id === cartItemId ? { ...item, quantity } : item,
          );
        });
        return { prevOption };
      },

      onError: (error, _, context) => {
        toastError(error.message);
        queryClient.setQueryData(CART_ITEM_QUERY_KEY, context?.prevOption);
      },
      onSuccess: () => {
        invalidateQueries();
      },
    });
  },
};
