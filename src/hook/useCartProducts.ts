import { useEffect } from "react";
import { getCartItems } from "../api/cartItem";
import { ContextAction } from "./useContext/useShoppingContext";

export function useCartProducts(
  dispatch: React.Dispatch<ContextAction>,
  loadingCart: boolean
) {
  useEffect(() => {
    (async () => {
      try {
        const res = await getCartItems({ sortBy: "asc" });
        dispatch({ type: "fetchCartSuccess", payload: res.content });
      } catch (err) {
        dispatch({
          type: "fetchCartFailure",
          payload: "장바구니 불러오기 실패",
        });
      }
    })();
  }, [loadingCart, dispatch]);
}
