import { useCartItems } from "@server/useCartItems";
import { useDeleteCartItemMutation } from "@server/useDeleteCartItemMutation";
import { useCreateCartItemMutation } from "@server/useCreateCartItemMutation";
import { useUpdateCartItemMutation } from "@server/useUpdateCartItemMutation";
import { CartItem } from "@src/apis/cartItems";

interface UseCartItemQuantityControlReturn {
  cartItems: CartItem[];
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
}

type OnError = (error: Error) => void;
interface UseCartItemQuantityControlProps {
  productId: number;
  onError?: OnError;
}

const MAX_CART_ITEM_COUNT = 20;

export const useCartItemQuantityControl = ({
  productId,
  onError = console.error,
}: UseCartItemQuantityControlProps): UseCartItemQuantityControlReturn => {
  const { data: cartItems } = useCartItems();

  const { createCartItemMutation } = useCreateCartItemMutation(onError);
  const { updateCartItemMutation } = useUpdateCartItemMutation(onError);
  const { deleteCartItemMutation } = useDeleteCartItemMutation(onError);

  const getTargetCartItem = () => {
    return cartItems.find((cartItem) => cartItem.product.id === productId);
  };

  const increaseQuantity = () => {
    const targetCartItem = getTargetCartItem();

    const isInCart = targetCartItem !== undefined;
    if (!isInCart && cartItems.length >= MAX_CART_ITEM_COUNT) {
      onError(new Error("장바구니에 담을 수 있는 상품의 개수는 20개까지입니다."));
      return;
    }

    if (isInCart) {
      updateCartItemMutation({
        cartItemId: targetCartItem.id,
        quantity: targetCartItem.quantity + 1,
      });
    } else {
      createCartItemMutation({ productId });
    }
  };

  const decreaseQuantity = () => {
    const targetCartItem = getTargetCartItem();
    if (targetCartItem === undefined) {
      onError(new Error("해당 상품이 장바구니에 없습니다."));
      return;
    }

    const { id, quantity } = targetCartItem;
    if (quantity === 1) {
      deleteCartItemMutation(id);
    } else {
      updateCartItemMutation({
        cartItemId: id,
        quantity: quantity - 1,
      });
    }
  };

  return {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
  };
};
