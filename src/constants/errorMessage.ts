import { MAX_CART_COUNT } from './magicNumber';

export const ERROR_MSG = {
  PRODUCT_FETCH_FAIL: '상품 목록을 불러오지 못했습니다.',
  CART_FETCH_FAIL: '장바구니 목록을 불러오지 못했습니다.',
  CART_LIMIT_EXCEEDED: `장바구니에는 최대 ${MAX_CART_COUNT}종류의 상품만 담을 수 있습니다.`,
  CART_ADD_FAIL: '장바구니에 상품을 추가하지 못했습니다.',
  CART_REMOVE_FAIL: '장바구니에서 상품을 제거하지 못했습니다.',
};
