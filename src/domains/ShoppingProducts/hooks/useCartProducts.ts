import { useEffect } from "react";
import { getCartItems } from "../apis/cartItem";
import { ContextAction } from "../context/ShoppingContext";

export function useCartProducts(
  dispatch: React.Dispatch<ContextAction>,
  loadingCart: boolean
) {
  useEffect(() => {
    (async () => {
      try {
        const res = await getCartItems({ sortBy: "asc" });
        dispatch({ type: "success", queryKey: "cart", payload: res.content });
      } catch (err) {
        dispatch({
          type: "error",
          queryKey: "cart",
          payload: "장바구니 불러오기 실패",
        });
      }
    })();
  }, [loadingCart, dispatch]);
}
