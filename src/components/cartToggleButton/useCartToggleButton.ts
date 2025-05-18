import { useToast } from "../../hooks/useToast";
import request from "../../utils/request";

interface AddItemToCartProps {
  productId: number;
  cartAmount: number;
  fetchCartProducts: () => void;
}

interface RemoveItemToCartProps {
  cartId?: number;
  productId: number;
  setCartItemIds: React.Dispatch<
    React.SetStateAction<Record<"productId" | "cartId", number>[]>
  >;
}

export default function useCartToggleButton() {
  const { showToast } = useToast();

  async function removeItemToCart({
    cartId,
    setCartItemIds,
    productId,
  }: RemoveItemToCartProps) {
    try {
      await request({
        headers: {
          Authorization: import.meta.env.VITE_TOKEN,
          "Content-Type": "application/json",
        },
        method: "DELETE",
        url: `/cart-items/${cartId}`,
      });
      setCartItemIds((prev) =>
        prev.filter((ids) => ids.productId !== productId)
      );
    } catch {
      showToast("MINUS");
    }
  }

  async function addItemToCart({
    cartAmount,
    productId,
    fetchCartProducts,
  }: AddItemToCartProps) {
    try {
      if (cartAmount >= 50) {
        showToast("CART_MAX");
        return;
      }
      await request({
        headers: {
          Authorization: import.meta.env.VITE_TOKEN,
          "Content-Type": "application/json",
        },
        method: "POST",
        url: "/cart-items",
        body: { productId, quantity: 1 },
      });
      fetchCartProducts();
    } catch {
      showToast("ADD");
    }
  }

  return { removeItemToCart, addItemToCart };
}
