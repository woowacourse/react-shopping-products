import { addCartItem, deleteCartItem } from "@src/apis/cartItems";
import { useCartItems } from "@src/contexts/cartItems/useCartItems";

interface UseCartActionsReturn {
  addToCart: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  isIncludedInCart: (productId: number) => boolean;
}

const MAX_CART_ITEM_COUNT = 20;

export const useCartActions = (): UseCartActionsReturn => {
  const { cartItems, refreshCartItems } = useCartItems();

  const addToCart = async (productId: number, quantity: number) => {
    if (cartItems.length >= MAX_CART_ITEM_COUNT) {
      throw Error("장바구니에 담을 수 있는 상품의 개수는 20개까지입니다.");
    }
    try {
      await addCartItem(productId, quantity);
      await refreshCartItems();
    } catch {
      throw Error(
        "상품을 장바구니에 담는 과정에서 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
      );
    }
  };

  const removeFromCart = async (productId: number) => {
    const targetCartItemId = cartItems.find((cartItem) => cartItem.product.id === productId)?.id;

    if (targetCartItemId !== 0 && !targetCartItemId) {
      throw new Error("해당 상품이 장바구니에 없습니다.");
    }
    try {
      await deleteCartItem(targetCartItemId);
      await refreshCartItems();
    } catch {
      throw new Error(
        "상품을 장바구니에서 빼는 과정에서 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
      );
    }
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
