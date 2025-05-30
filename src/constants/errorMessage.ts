import { MAX_BASKET_COUNT } from "./basket";

export const ERROR_MSG = {
  PRODUCT_FETCH_FAIL: "상품 목록을 불러오지 못했습니다.",
  BASKET_FETCH_FAIL: "장바구니 목록을 불러오지 못했습니다.",
  BASKET_LIMIT_EXCEEDED: `장바구니에는 최대 ${MAX_BASKET_COUNT}종류의 상품만 담을 수 있습니다.`,
  OUT_OF_STOCK: "재고 수량을 초과하여 담을 수 없습니다.",
  ADD_BASKET_FAIL: "장바구니에 상품을 담지 못했습니다.",
  DELETE_BASKET_FAIL: "장바구니에서 상품을 삭제하지 못했습니다.",
};
