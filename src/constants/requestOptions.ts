import { commonOpts } from "./requestHeader";
import { URLS } from "./url";

export const productQueryOptions = {
  immediate: false,
};
export const cartQueryOptions = {
  url: URLS.CART_ITEMS,
  option: commonOpts,
  immediate: false,
};
