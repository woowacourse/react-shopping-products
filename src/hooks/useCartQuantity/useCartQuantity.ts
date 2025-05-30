import { useToast } from "../../provider/ToastProvider";
import { changeCartQuantity } from "../../api/cart";
import { useData } from "../../provider/DataProvider";
import { CartItemType } from "../../types/response.types";
import { fetchCartItems } from "../../api/cart";

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
  const { getData, refetch } = useData();
  const { showToast } = useToast();

  const cartItems = getData<CartItemType[]>("cart") ?? [];
  const current = getCartQuantity(cartItems, cartId);

  async function increase() {
    if (cartId == null) return;

    if (quantity <= current) {
      showToast("CART_QUANTITY");
      return;
    }

    try {
      await changeCartQuantity({ cartId, quantity: current + 1 });

      await refetch("cart", fetchCartItems);
    } catch (error) {
      showToast("CART");
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

      await refetch("cart", fetchCartItems);
    } catch (error) {
      showToast("CART");
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
