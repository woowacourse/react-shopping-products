export const DEFAULT_SORT = "높은 가격순";
export const DEFAULT_FILTER = "전체";

export const CATEGORY = ["전체", "식료품", "패션잡화"] as const;
export const SORT = ["높은 가격순", "낮은 가격순"] as const;

export const ERROR_MESSAGE = {
  ADD_CART_ITEM: "장바구니에 추가하는 중 오류가 발생했습니다.",
  DELETE_CART_ITEM: "장바구니에서 삭제하는 중 오류가 발생했습니다.",
} as const;
