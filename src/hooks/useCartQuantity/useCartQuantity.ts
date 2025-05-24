import { useState } from "react";
import { useToast } from "../useToast/useToast";
import { changeCartQuantity } from "../../api/cart";

interface UseCartQuantityProps {
  cartId?: number;
  productId: number;
  quantity: number;
  removeItemToCart: ({
    cartId,
    productId,
  }: {
    cartId: number;
    productId: number;
  }) => void;
}

export default function useCartQuantity({
  cartId,
  productId,
  quantity,
  removeItemToCart,
}: UseCartQuantityProps) {
  const [cartQuantity, setCartQuantity] = useState(1);

  const { showToast } = useToast();

  async function increase() {
    if (cartId === undefined || cartId === null) return;

    if (quantity <= cartQuantity) {
      showToast("CART_QUANTITY");
      return;
    }

    changeCartQuantity({ cartId, quantity: cartQuantity + 1 });
    setCartQuantity((prev) => prev + 1);
  }

  function decrease() {
    if (cartId === undefined || cartId === null) return;

    if (cartQuantity === 1) {
      setCartQuantity(1);
      removeItemToCart({ cartId, productId });
      return;
    }

    changeCartQuantity({ cartId, quantity: cartQuantity - 1 });
    setCartQuantity((prev) => prev - 1);
  }

  return { cartQuantity, increase, decrease };
}
