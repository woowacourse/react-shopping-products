import { deleteProductFromCart, patchCartItemQuantity, postProductToCart } from "@/apis/cartItem";
import { ERROR_MESSAGES } from "@/constants/messages";
import QUERY_KEY from "@/constants/queryKey";
import useCartItems from "@/hooks/useCartItems";
import useToast from "@/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useHandleCartItem = () => {
  const queryClient = useQueryClient();
  const { onAddToast } = useToast();

  const { cartItems } = useCartItems();

  const { mutate: postProductToCartMutate } = useMutation({
    mutationKey: [QUERY_KEY.postProductToCart],
    mutationFn: postProductToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.getCartItems] });
    },
    onError: () => {
      onAddToast(ERROR_MESSAGES.failPostCartItem);
    },
  });

  const { mutate: deleteProductFromCartMutate } = useMutation({
    mutationKey: [QUERY_KEY.deleteProductFromCart],
    mutationFn: deleteProductFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.getCartItems] });
    },
    onError: () => {
      onAddToast(ERROR_MESSAGES.failDeleteCartItem);
    },
  });

  const { mutate: patchCartItemQuantityMutate } = useMutation({
    mutationKey: [QUERY_KEY.patchCartItemQuantity],
    mutationFn: patchCartItemQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.getCartItems] });
    },
    onError: () => {
      onAddToast(ERROR_MESSAGES.failPatchCartItem);
    },
  });

  const getCartItemQuantity = (productId: number): number => {
    if (!cartItems) return 0;
    const findedCartItem = cartItems.find((cartItem) => cartItem.product.id === productId);
    if (!findedCartItem) return 0;

    return findedCartItem.quantity;
  };

  const addCartItem = (productId: number) => postProductToCartMutate({ productId, quantity: 1 });

  const removeCartItem = (productId: number) => {
    const targetItem = cartItems!.find((cartItem) => cartItem.product.id === productId);
    if (!targetItem) return;

    deleteProductFromCartMutate({ itemId: targetItem.id });
  };

  const updateCartItemQuantity = (productId: number, clickType: "plus" | "minus") => {
    const itemQuantity = getCartItemQuantity(productId);

    if (clickType === "minus" && itemQuantity === 1) {
      removeCartItem(productId);

      return;
    }

    if (!cartItems) return;
    const targetItem = cartItems.find((cartItem) => cartItem.product.id === productId);
    if (!targetItem) return;

    const updatedQuantity = clickType === "plus" ? itemQuantity + 1 : itemQuantity - 1;
    patchCartItemQuantityMutate({ productId: targetItem.id, quantity: updatedQuantity });
  };

  return { cartItems, getCartItemQuantity, addCartItem, removeCartItem, updateCartItemQuantity };
};

export default useHandleCartItem;
