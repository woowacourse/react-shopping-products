import { useCallback, useEffect, useState } from "react";
import { CartItem, CartProduct } from "./index.types";
import useFetch from "../useFetch/useFetch";

function useFetchCartProducts() {
  const [cartItemIds, setCartItemIds] = useState<
    Record<"productId" | "cartId", number>[]
  >([]);
  const { getData } = useFetch<CartProduct>();

  const fetchCartProducts = useCallback(async () => {
    const cartProducts = await getData({
      method: "GET",
      url: "/cart-items",
      errorType: "CART",
    });
    if (!cartProducts) return;
    setCartItemIds(
      cartProducts.content.map((data: CartItem) => {
        return { productId: data.product.id, cartId: data.id };
      })
    );
  }, [getData]);

  useEffect(() => {
    fetchCartProducts();
  }, [fetchCartProducts]);

  return { cartItemIds, setCartItemIds, fetchCartProducts };
}

export default useFetchCartProducts;
