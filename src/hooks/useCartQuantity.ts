import { useToast } from "../provider/ToastProvider";
import { changeCartQuantity } from "../api/cart";
import { CartItemType } from "../types/response.types";
import { ERROR_MESSAGE } from "../constants/errorMessage";
import { useCartQuery } from "./useData";

const MIN_QUANTITY = 1;

interface UseCartQuantityProps {
  cartId?: number;
  quantity: number;
  removeItemToCart: ({ cartId }: { cartId: number }) => void;
}

export default function useCartQuantity({
  cartId,
  quantity,
  removeItemToCart,
}: UseCartQuantityProps) {
  const { data: cartItems, refetch: refetchCartItems } = useCartQuery();

  const { showToast } = useToast();
  const current = getCartQuantity(cartItems, cartId);

  async function increase() {
    if (cartId == null) return;

    if (quantity <= current) {
      showToast(ERROR_MESSAGE.CART_QUANTITY);
      return;
    }

    try {
      await changeCartQuantity({ cartId, quantity: current + 1 });

      await refetchCartItems();
    } catch (error) {
      showToast(ERROR_MESSAGE.CART);
    }
  }

  async function decrease() {
    if (cartId == null) return;

    if (current === MIN_QUANTITY) {
      removeItemToCart({ cartId });
      return;
    }

    try {
      await changeCartQuantity({ cartId, quantity: current - 1 });

      await refetchCartItems();
    } catch (error) {
      showToast(ERROR_MESSAGE.CART);
    }
  }

  return {
    cartQuantity: current,
    increase,
    decrease,
  };
}

function getCartQuantity(cartData: CartItemType[], cartId: number | undefined) {
  return cartData.find((item) => item.id === cartId)?.quantity ?? 0;
}
