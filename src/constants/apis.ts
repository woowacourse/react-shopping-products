export const BASE_URL = import.meta.env.VITE_API_URL;

export const ENDPOINT = {
  PRODUCT: `${BASE_URL}/products`,
  CART_ITEMS: `${BASE_URL}/cart-items`,
  CART_ITEMS_COUNT: `${BASE_URL}/cart-items/count`,
  UPDATE_CART_ITEM: (cartItemId: number) => `${BASE_URL}/cart-items/${cartItemId}`,
  DELETE_CART_ITEM: (cartItemId: number) => `${BASE_URL}/cart-items/${cartItemId}`,
} as const;

export const ERROR_MESSAGE = {
  SERVER: {
    SERVER_ERROR: "서버에 일시적인 문제가 생겼습니다. 잠시 후에 다시 접속해 주세요.",
    AUTHENTICATION_FAILED: "API 인증에 실패했습니다. 관리자에게 문의해 주세요.",
    FETCHING_FAILED: "데이터를 불러오지 못했습니다. 잠시 후에 다시 시도해 주세요.",
    NETWORK_DISCONNECTED: "네트워크 에러가 발생했습니다. 인터넷 연결 상태를 확인해주세요.",
    UNKNOWN_ERROR: "알 수 없는 에러가 발생했습니다. 잠시 후에 다시 시도해주세요.",
  },
  CART_ITEMS: {
    FETCHING_FAILED: "장바구니 목록을 불러오지 못했습니다. 잠시 후에 다시 시도해 주세요.",
    ITEM_NOT_FOUND: "요청하신 장바구니 항목을 찾지 못했습니다. 새로고침 후에 다시 시도해 주세요.",
    ADD_TO_CART_FAILED: "장바구니에 상품을 추가하지 못했습니다. 새로고침 후에 다시 시도해 주세요.",
    REMOVE_FROM_CART_FAILED:
      "장바구니에서 상품을 제거하지 못했습니다. 새로고침 후에 다시 시도해 주세요.",
    UPDATE_QUANTITY_FAILED: "상품 수량을 변경하지 못했습니다. 새로고침 후에 다시 시도해 주세요.",
  },
  PRODUCTS: {
    FETCHING_FAILED: "상품 목록을 불러오지 못했습니다. 잠시 후에 다시 시도해 주세요.",
  },
} as const;
