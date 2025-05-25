import { useEffect } from "react";

import { CategoryOption, FilterOption } from "../../../constants";
import { ContextAction } from "../context/ShoppingContext";
import { getProducts } from "../apis/product";

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
        dispatch({
          type: "success",
          queryKey: "product",
          payload: res.content,
        });
      } catch (err) {
        dispatch({
          type: "error",
          queryKey: "product",
          payload: "상품록록 불러오기 실패",
        });
      }
    })();
  }, [loadingProduct, category, filter, dispatch]);
}
