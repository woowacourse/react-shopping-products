import { useEffect, useRef } from "react";

import { getProducts } from "../apis/product";
import { ContextAction } from "../context/ShoppingContext";
export function useFetchProductItems(
  dispatch: React.Dispatch<ContextAction>,
  loadingProduct: boolean
) {
  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    (async () => {
      try {
        const res = await getProducts({
          category: "전체",
          sortBy: "price,asc",
        });

        if (isMounted.current)
          dispatch({
            type: "success",
            queryKey: "product",
            payload: res.content,
          });
      } catch (err) {
        if (isMounted.current)
          dispatch({
            type: "error",
            queryKey: "product",
            payload: "상품 목록 불러오기 실패",
          });
      }
    })();

    return () => {
      isMounted.current = false;
    };
  }, [loadingProduct, dispatch]);
}
