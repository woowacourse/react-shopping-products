import { useCallback, useEffect, useState } from "react";
import { CartItem } from "../types/response.types";
import request from "../utils/request";
import { ERROR_TYPE } from "./useError";

interface useFetchCartProductsProps {
  setErrorTrue: (type: ERROR_TYPE) => void;
}

function useFetchCartProducts({ setErrorTrue }: useFetchCartProductsProps) {
  const [cartItemIds, setCartItemIds] = useState<
    Record<"productId" | "cartId", number>[]
  >([]);

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
        setErrorTrue("CART");
      }
    },
    [setErrorTrue]
  );

  useEffect(() => {
    fetchCartProducts();
  }, [fetchCartProducts]);

  return { cartItemIds, setCartItemIds, fetchCartProducts };
}
export default useFetchCartProducts;
