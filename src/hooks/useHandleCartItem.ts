import { deleteCartItem, getCartItems, postCartItem } from "@/apis/cartItem";
import { ERROR_MESSAGES } from "@/constants/messages";
import QUERY_KEY from "@/constants/queryKey";
import TIMER from "@/constants/timer";
import useToast from "@/hooks/useToast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useHandleCartItem = () => {
  const queryClient = useQueryClient();
  const { onAddToast } = useToast();

  const { data: cartItems } = useQuery({
    queryKey: [QUERY_KEY.getCartItems],
    queryFn: getCartItems,
    gcTime: TIMER.hour,
    staleTime: TIMER.hour,
  });

  const { mutate: postCartItemMutate } = useMutation({
    mutationKey: [QUERY_KEY.postNewCartItem],
    mutationFn: postCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.getCartItems] });
    },
    onError: () => {
      onAddToast(ERROR_MESSAGES.failPostCartItem);
    },
  });

  const { mutate: deleteCartItemMutate } = useMutation({
    mutationKey: [QUERY_KEY.deleteCartItem],
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.getCartItems] });
    },
    onError: () => {
      onAddToast(ERROR_MESSAGES.failDeleteCartItem);
    },
  });

  const isInCart = (id: number) => {
    if (!cartItems) return false;
    return cartItems.some((item) => item.product.id === id);
  };

  const onClickCartItem = (id: number) => {
    if (!cartItems) return;

    if (isInCart(id)) {
      const targetItem = cartItems.find((cartItem) => cartItem.product.id === id);
      deleteCartItemMutate({ itemId: targetItem!.id });
      return;
    }

    postCartItemMutate({ productId: id, quantity: 1 });
  };

  return { onClickCartItem, isInCart };
};

export default useHandleCartItem;
