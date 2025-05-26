import { fetchCartItems } from "../../api/cart";
import { useToast } from "../../hooks/useToast/useToast";
import { AddItemBody } from "../../types/request.types";
import request from "../../utils/request";
import { useData } from "../../provider/DataProvider";

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
  const { setData, fetchData } = useData();

  async function removeItemToCart({ cartId }: RemoveItemToCartProps) {
    try {
      await request({
        method: "DELETE",
        url: `/cart-items/${cartId}`,
      });
      setData((prev) => {
        return {
          ...prev,
          cart: prev.cart.filter((item) => item.id !== cartId),
        };
      });
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
      fetchData("cart", fetchCartItems);
    } catch {
      showToast("ADD");
    }
  }

  return { removeItemToCart, addItemToCart };
}
