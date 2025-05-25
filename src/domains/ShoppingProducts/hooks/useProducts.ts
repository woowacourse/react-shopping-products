import { useEffect } from "react";

import { getProducts } from "../apis/product";
import { ContextAction } from "../context/ShoppingContext";
export function useProducts(
  dispatch: React.Dispatch<ContextAction>,
  loadingProduct: boolean
) {
  useEffect(() => {
    (async () => {
      try {
        const res = await getProducts({
          category: "전체", // ✅ 필터링 없이 전체 요청
          sortBy: "price,asc", // 기본 정렬 (무시될 수 있음)
        });

        dispatch({
          type: "success",
          queryKey: "product",
          payload: res.content, // 원본만 저장
        });
      } catch (err) {
        dispatch({
          type: "error",
          queryKey: "product",
          payload: "상품 목록 불러오기 실패",
        });
      }
    })();
  }, [loadingProduct, dispatch]); // ✅ filter, category 제거
}
