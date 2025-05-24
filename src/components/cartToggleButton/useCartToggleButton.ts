import useCart from "../../hooks/useCart/useCart";
import { useToast } from "../../hooks/useToast/useToast";
import { AddItemBody } from "../../types/request.types";
import request from "../../utils/request";

const MAX_CART_AMOUNT = 50;

interface AddItemToCartProps {
  productId: number;
  cartAmount: number;
}

interface RemoveItemToCartProps {
  cartId?: number;
}

export default function useCartToggleButton() {
  const { showToast } = useToast();
  const { setCartItems, setCartItemIds, refetchCartItems } = useCart();

  async function removeItemToCart({ cartId }: RemoveItemToCartProps) {
    try {
      await request({
        method: "DELETE",
        url: `/cart-items/${cartId}`,
      });
      setCartItemIds((prev) => prev.filter((ids) => ids.cartId !== cartId));
      setCartItems((prev) => prev!.filter((item) => item.id !== cartId));
    } catch {
      showToast("MINUS");
    }
  }

  async function addItemToCart({ cartAmount, productId }: AddItemToCartProps) {
    try {
      if (cartAmount >= MAX_CART_AMOUNT) {
        showToast("CART_MAX");
        return;
      }
      await request<AddItemBody>({
        method: "POST",
        url: "/cart-items",
        body: { productId, quantity: 1 },
      });
      refetchCartItems();
    } catch {
      showToast("ADD");
    }
  }

  return { removeItemToCart, addItemToCart };
}
