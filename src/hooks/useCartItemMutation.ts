import {
  deleteProductInCart,
  postProductInCart,
  updateCartItemQuantity,
} from "../api";
import useMutationWithErrorHandler from "./useMutationWithErrorHandler";

const useCartItemMutation = () => {
  const appendCartItemMutation = useAppendCartItemMutation();
  const updateQuantityMutation = useUpdateQuantityMutation();
  const removeItemMutation = useRemoveItemMutation();

  const appendProductInCart = async (productId: number) => {
    appendCartItemMutation.mutate({ productId });
  };

  const handleDecreaseQuantityButtonClick = (cartItem: CartItem) => {
    if (cartItem.quantity < 2) {
      return;
    }
    updateQuantityMutation.mutate({
      cartItemId: cartItem.id,
      quantity: cartItem.quantity - 1,
    });
  };

  const handleIncreaseQuantityButtonClick = (cartItem: CartItem) => {
    updateQuantityMutation.mutate({
      cartItemId: cartItem.id,
      quantity: cartItem.quantity + 1,
    });
  };

  const handleRemoveItemButtonClick = (cartItem: CartItem) => {
    removeItemMutation.mutate({ cartItemId: cartItem.id });
  };

  return {
    appendProductInCart,
    handleDecreaseQuantityButtonClick,
    handleIncreaseQuantityButtonClick,
    handleRemoveItemButtonClick,
  };
};

export default useCartItemMutation;

const useAppendCartItemMutation = () =>
  useMutationWithErrorHandler(
    ({ productId }: { productId: number }) => postProductInCart({ productId }),
    "postProductInCart"
  );

const useUpdateQuantityMutation = () =>
  useMutationWithErrorHandler(
    ({ cartItemId, quantity }: { cartItemId: number; quantity: number }) =>
      updateCartItemQuantity({ cartItemId, quantity }),
    "updateCartItemQuantity"
  );

const useRemoveItemMutation = () =>
  useMutationWithErrorHandler(
    ({ cartItemId }: { cartItemId: number }) =>
      deleteProductInCart({ cartItemId }),
    "deleteProductInCart"
  );
