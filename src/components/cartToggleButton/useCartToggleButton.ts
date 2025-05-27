import { useToast } from "../../provider/ToastProvider";
import { AddItemBody } from "../../types/request.types";
import request from "../../utils/request";
import { useData } from "../../provider/DataProvider";
import { fetchCartItems } from "../../api/cart";

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
  const { refetch } = useData();

  async function removeItemToCart({ cartId }: RemoveItemToCartProps) {
    try {
      await request({
        method: "DELETE",
        url: `/cart-items/${cartId}`,
      });
      await refetch("cart", fetchCartItems);
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
      await refetch("cart", fetchCartItems);
    } catch {
      showToast("ADD");
    }
  }

  return { removeItemToCart, addItemToCart };
}
