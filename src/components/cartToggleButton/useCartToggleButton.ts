import { useToast } from "../../hooks/useToast/useToast";
import request from "../../utils/request";

const MAX_CART_AMOUNT = 50;

interface AddItemToCartProps {
  productId: number;
  cartAmount: number;
}

interface RemoveItemToCartProps {
  cartId?: number;
  productId: number;
}

interface useCartToggleButtonProps {
  setCartItemIds: React.Dispatch<
    React.SetStateAction<Record<"productId" | "cartId", number>[]>
  >;
  fetchCartProducts: () => void;
}

export default function useCartToggleButton({
  setCartItemIds,
  fetchCartProducts,
}: useCartToggleButtonProps) {
  const { showToast } = useToast();

  async function removeItemToCart({
    cartId,
    productId,
  }: RemoveItemToCartProps) {
    try {
      await request({
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

  async function addItemToCart({ cartAmount, productId }: AddItemToCartProps) {
    try {
      if (cartAmount >= MAX_CART_AMOUNT) {
        showToast("CART_MAX");
        return;
      }
      await request({
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
