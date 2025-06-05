import { useToast } from "../provider/ToastProvider";
import { AddItemBody } from "../types/request.types";
import request from "../utils/request";
import { ERROR_MESSAGE } from "../constants/errorMessage";
import { useCartQuery } from "./useData";

const MAX_CART_AMOUNT = 50;

interface AddItemToCartProps {
  productId: number;
  cartAmount: number;
}

interface RemoveItemToCartProps {
  cartId?: number;
}

export default function useCartAddRemove() {
  const { showToast } = useToast();
  const { refetch: refetchCartItems } = useCartQuery();

  async function removeItemToCart({ cartId }: RemoveItemToCartProps) {
    try {
      await request({
        method: "DELETE",
        url: `/cart-items/${cartId}`,
      });
      await refetchCartItems();
    } catch {
      showToast(ERROR_MESSAGE.MINUS);
    }
  }

  async function addItemToCart({ cartAmount, productId }: AddItemToCartProps) {
    try {
      if (cartAmount >= MAX_CART_AMOUNT) {
        showToast(ERROR_MESSAGE.CART_MAX);
        return;
      }
      await request<AddItemBody>({
        method: "POST",
        url: "/cart-items",
        body: { productId, quantity: 1 },
      });
      await refetchCartItems();
    } catch {
      showToast(ERROR_MESSAGE.ADD);
    }
  }

  return { removeItemToCart, addItemToCart };
}
