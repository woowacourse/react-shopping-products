import { useEffect } from "react";
import { getProducts } from "../api/product";
import { CategoryOption, FilterOption } from "../constants";
import { ContextAction } from "./useContext/useShoppingContext";

export function useProducts(
  dispatch: React.Dispatch<ContextAction>,
  loadingProduct: boolean,
  category: CategoryOption,
  filter: FilterOption
) {
  useEffect(() => {
    (async () => {
      try {
        const res = await getProducts({
          category: category,
          sortBy: filter === "높은 가격순" ? "price,desc" : "price,asc",
        });
        dispatch({ type: "fetchProductSuccess", payload: res.content });
      } catch (err) {
        dispatch({
          type: "fetchProductFailure",
          payload: "상품록록 불러오기 실패",
        });
      }
    })();
  }, [loadingProduct, category, dispatch]);
}
