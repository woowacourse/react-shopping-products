import { useCartItems } from "@server/useCartItems";
import { useDeleteCartItemMutation } from "@server/useDeleteCartItemMutation";
import { useCreateCartItemMutation } from "@server/useCreateCartItemMutation";

interface UseCartActionsReturn {
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  isIncludedInCart: (productId: number) => boolean;
}

const MAX_CART_ITEM_COUNT = 20;

type OnError = (error: Error) => void;

export const useCartActions = (onError: OnError = console.error): UseCartActionsReturn => {
  const { data: cartItems } = useCartItems();

  const { createCartItemMutation } = useCreateCartItemMutation(onError);
  const { deleteCartItemMutation } = useDeleteCartItemMutation(onError);

  const addToCart = async (productId: number) => {
    if (cartItems.length >= MAX_CART_ITEM_COUNT) {
      onError(Error("장바구니에 담을 수 있는 상품의 개수는 20개까지입니다."));
      return;
    }

    createCartItemMutation({ productId, quantity: 1 });
  };

  const removeFromCart = async (productId: number) => {
    const targetCartItemId = cartItems.find((cartItem) => cartItem.product.id === productId)?.id;

    if (targetCartItemId === undefined) {
      onError(Error("해당 상품이 장바구니에 없습니다."));
      return;
    }

    deleteCartItemMutation(targetCartItemId);
  };

  const isIncludedInCart = (productId: number) => {
    return cartItems.some((cartItem) => cartItem.product.id === productId);
  };

  return {
    addToCart,
    removeFromCart,
    isIncludedInCart,
  };
};
