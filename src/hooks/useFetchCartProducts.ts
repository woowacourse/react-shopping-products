import { useCallback, useEffect, useState } from "react";
import { CartItem } from "../types/response.types";
import request from "../utils/request";
import { useToast } from "./useToast";

function useFetchCartProducts() {
  const [cartItemIds, setCartItemIds] = useState<
    Record<"productId" | "cartId", number>[]
  >([]);
  const { showToast } = useToast();

  const fetchCartProducts = useCallback(
    async function fetchCartItems() {
      try {
        const data = await request({
          method: "GET",
          url: "/cart-items",
          headers: {
            Authorization: import.meta.env.VITE_TOKEN,
            "Content-Type": "application/json",
          },
        });
        setCartItemIds(
          data.content.map((data: CartItem) => {
            return { productId: data.product.id, cartId: data.id };
          })
        );
      } catch {
        showToast("CART");
      }
    },
    [showToast]
  );

  useEffect(() => {
    fetchCartProducts();
  }, [fetchCartProducts]);

  return { cartItemIds, setCartItemIds, fetchCartProducts };
}
export default useFetchCartProducts;
