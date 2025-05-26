import { useToast } from "../useToast/useToast";
import { changeCartQuantity } from "../../api/cart";
import { useData } from "../../provider/DataProvider";
import { CartItem } from "../../types/response.types";

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
  const { data, setData } = useData();
  const { showToast } = useToast();

  const current = getCartQuantity(data.cart, cartId);

  async function increase() {
    if (cartId == null) return;

    if (quantity <= current) {
      showToast("CART_QUANTITY");
      return;
    }

    await changeCartQuantity({ cartId, quantity: current + 1 });

    setData((prev) => ({
      ...prev,
      cart: prev.cart.map((item) =>
        item.id === cartId ? { ...item, quantity: current + 1 } : item
      ),
    }));
  }

  function decrease() {
    if (cartId == null) return;

    if (current === 1) {
      removeItemToCart({ cartId });

      setData((prev) => ({
        ...prev,
        cart: prev.cart.filter((item) => item.id !== cartId),
      }));
      return;
    }

    changeCartQuantity({ cartId, quantity: current - 1 });

    setData((prev) => ({
      ...prev,
      cart: prev.cart.map((item) =>
        item.id === cartId ? { ...item, quantity: current - 1 } : item
      ),
    }));
  }

  return {
    cartQuantity: current,
    increase,
    decrease,
  };
}

function getCartQuantity(cartData: CartItem[], cartId: number | undefined) {
  return cartData.find((item) => item.id === cartId)?.quantity ?? 0;
}
