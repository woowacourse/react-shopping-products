const BASE_URL =
  import.meta.env.VITE_APP_USE_MSW === true
    ? "/api" // MSW가 활성화된 경우 상대 경로 사용
    : "http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com";

export const URLS = {
  CART_ITEMS: `${BASE_URL}/cart-items`,
  ORDERS: `${BASE_URL}/orders`,
  PRODUCTS: `${BASE_URL}/products`,
};
