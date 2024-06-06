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

  const getCartItemQuantity = (productId: number): number =>
    cartItems!.find((cartItem) => cartItem.product.id === productId)!.quantity;

  const addCartItem = (productId: number) => postCartItemMutate({ productId, quantity: 1 });

  const removeCartItem = (productId: number) => {
    const targetItem = cartItems!.find((cartItem) => cartItem.product.id === productId);

    deleteCartItemMutate({ itemId: targetItem!.id });
  };

  const updateCartItemQuantity = (productId: number, clickType: "plus" | "minus") => {
    const itemQuantity = getCartItemQuantity(productId);

    if (clickType === "minus" && itemQuantity === 1) {
      removeCartItem(productId);

      return;
    }

    const targetItem = cartItems!.find((cartItem) => cartItem.product.id === productId);
    const updatedQuantity = clickType === "plus" ? itemQuantity + 1 : itemQuantity - 1;
    patchCartItemMutate({ productId: targetItem!.id, quantity: updatedQuantity });
  };

  const isInCart = (productId: number) => {
    if (!cartItems) return false;

    return cartItems.some((item) => item.product.id === productId);
  };

  const totalAmount = () => {
    if (!cartItems) return 0;

    return cartItems.reduce((amount, cur) => {
      return amount + cur.quantity * cur.product.price;
    }, 0);
  };

  return { cartItems, getCartItemQuantity, addCartItem, removeCartItem, updateCartItemQuantity, isInCart, totalAmount };
};

export default useHandleCartItem;
