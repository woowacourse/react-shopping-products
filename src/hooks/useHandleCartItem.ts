import { deleteCartItem, getCartItems, patchCartItem, postCartItem } from "@/apis/cartItem";
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

  const { mutate: patchCartItemMutate } = useMutation({
    mutationKey: [QUERY_KEY.patchCartItem],
    mutationFn: patchCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.getCartItems] });
    },
    onError: () => {
      onAddToast(ERROR_MESSAGES.failPatchCartItem);
    },
  });

  const getCartItemQuantity = (id: number): number =>
    cartItems!.find((cartItem) => cartItem.product.id === id)!.quantity;

  const addCartItem = (id: number) => postCartItemMutate({ productId: id, quantity: 1 });

  const updateCartItemQuantity = (id: number, clickType: "plus" | "minus") => {
    const itemQuantity = getCartItemQuantity(id);
    const targetItem = cartItems!.find((cartItem) => cartItem.product.id === id);

    if (clickType === "minus" && itemQuantity === 1) {
      deleteCartItemMutate({ itemId: targetItem!.id });

      return;
    }

    const updatedQuantity = clickType === "plus" ? itemQuantity + 1 : itemQuantity - 1;
    patchCartItemMutate({ productId: targetItem!.id, quantity: updatedQuantity });
  };

  const isInCart = (id: number) => cartItems!.some((item) => item.product.id === id);

  return { getCartItemQuantity, addCartItem, updateCartItemQuantity, isInCart };
};

export default useHandleCartItem;
