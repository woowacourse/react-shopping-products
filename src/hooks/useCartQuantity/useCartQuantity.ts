import { useToast } from "../useToast/useToast";
import { changeCartQuantity } from "../../api/cart";
import useCart from "../useCart/useCart";

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
  const { setCartQuantity, getCartQuantity } = useCart();

  const { showToast } = useToast();

  async function increase() {
    if (cartId === undefined || cartId === null) return;

    const current = getCartQuantity({ cartId })!;
    if (quantity <= current!) {
      showToast("CART_QUANTITY");
      return;
    }

    changeCartQuantity({ cartId, quantity: current + 1 });
    setCartQuantity({ cartId, quantity: current + 1 });
  }

  function decrease() {
    if (cartId === undefined || cartId === null) return;

    const current = getCartQuantity({ cartId })!;
    if (current === 1) {
      setCartQuantity({ cartId, quantity: 1 });
      removeItemToCart({ cartId });
      return;
    }

    changeCartQuantity({ cartId, quantity: current - 1 });
    setCartQuantity({ cartId, quantity: current - 1 });
  }

  return {
    cartQuantity: getCartQuantity({ cartId: cartId! }),
    increase,
    decrease,
  };
}
