import { http, HttpResponse } from "msw";
import MOCKING_CART_ITEMS_DATA from "../data/cartItems.json";

const getCartItems = http.get(`http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/cart-items`, () => {
  return HttpResponse.json(MOCKING_CART_ITEMS_DATA);
});

export default [getCartItems];
