import { http, HttpResponse } from "msw";
import MOCKING_PRODUCT_DATA from "../data/products.json";

const getProducts = http.get(`http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/products`, () => {
  return HttpResponse.json(MOCKING_PRODUCT_DATA);
});

export default [getProducts];
