const getBaseUrl = () => {
  if (import.meta.env.VITE_USE_MOCK === "true") {
    return "https://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/";
  }
  return import.meta.env.VITE_API_BASE_URL;
};

export const SHOP_API = {
  baseUrl: getBaseUrl(),
  endpoint: {
    products: "products",
    cartItems: "cart-items",
  },
  headers: {
    default: {
      Authorization: `Basic ${import.meta.env.VITE_TOKEN}`,
    },
  },
};
